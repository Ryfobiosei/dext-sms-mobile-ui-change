import {useCallback, useEffect, useRef, useState} from 'react';
import {AppState, NativeModules} from 'react-native';
import * as Brightness from 'expo-brightness';

type SystemSettingsNativeModule = {
  getMediaVolume: () => Promise<number>;
  setMediaVolume: (percent: number) => Promise<number>;
};

const SystemSettings = NativeModules.SystemSettings as
  | SystemSettingsNativeModule
  | undefined;

export function useSystemSettings() {
  const [brightness, setBrightnessState] = useState(80);
  const [volume, setVolumeState] = useState(60);
  const [brightnessPermissionGranted, setBrightnessPermissionGranted] =
    useState(false);
  const permissionGrantedRef = useRef(false);
  const permissionRequestRef = useRef<Promise<void> | null>(null);
  const pendingBrightnessRef = useRef<number | null>(null);
  const pendingSystemBrightnessRef = useRef<number | null>(null);
  const systemBrightnessWriteRef = useRef(false);
  const systemBrightnessTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const lastSystemBrightnessWriteRef = useRef(0);
  const pendingVolumeRef = useRef<number | null>(null);
  const volumeWriteRef = useRef(false);
  const volumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastVolumeWriteRef = useRef(0);

  const scheduleSystemBrightnessWrite = useCallback(() => {
    if (
      systemBrightnessTimerRef.current !== null ||
      systemBrightnessWriteRef.current ||
      pendingSystemBrightnessRef.current === null ||
      !permissionGrantedRef.current
    ) {
      return;
    }

    const interval = 45;
    const wait = Math.max(
      0,
      interval - (Date.now() - lastSystemBrightnessWriteRef.current),
    );
    systemBrightnessTimerRef.current = setTimeout(() => {
      systemBrightnessTimerRef.current = null;
      const value = pendingSystemBrightnessRef.current;
      if (value === null || !permissionGrantedRef.current) {
        return;
      }

      pendingSystemBrightnessRef.current = null;
      systemBrightnessWriteRef.current = true;
      lastSystemBrightnessWriteRef.current = Date.now();
      void Brightness.setSystemBrightnessAsync(value / 100)
        .catch(() => {
          // A permission can be revoked while the app is open.
          permissionGrantedRef.current = false;
          pendingSystemBrightnessRef.current = null;
          setBrightnessPermissionGranted(false);
        })
        .finally(() => {
          systemBrightnessWriteRef.current = false;
          if (pendingSystemBrightnessRef.current !== null) {
            scheduleSystemBrightnessWrite();
          }
        });
    }, wait);
  }, []);

  const scheduleVolumeWrite = useCallback(() => {
    if (
      volumeTimerRef.current !== null ||
      volumeWriteRef.current ||
      pendingVolumeRef.current === null ||
      !SystemSettings
    ) {
      return;
    }

    const interval = 45;
    const wait = Math.max(0, interval - (Date.now() - lastVolumeWriteRef.current));
    volumeTimerRef.current = setTimeout(() => {
      volumeTimerRef.current = null;
      const value = pendingVolumeRef.current;
      if (value === null || !SystemSettings) {
        return;
      }

      pendingVolumeRef.current = null;
      volumeWriteRef.current = true;
      lastVolumeWriteRef.current = Date.now();
      void SystemSettings.setMediaVolume(value)
        .then(appliedValue => {
          // Do not let an older native response move the thumb during a drag.
          if (pendingVolumeRef.current === null) {
            setVolumeState(appliedValue);
          }
        })
        .catch(() => {
          // Keep the displayed value if the native module is unavailable.
        })
        .finally(() => {
          volumeWriteRef.current = false;
          if (pendingVolumeRef.current !== null) {
            scheduleVolumeWrite();
          }
        });
    }, wait);
  }, []);

  useEffect(
    () => () => {
      if (systemBrightnessTimerRef.current !== null) {
        clearTimeout(systemBrightnessTimerRef.current);
      }
      if (volumeTimerRef.current !== null) {
        clearTimeout(volumeTimerRef.current);
      }
    },
    [],
  );

  const refreshSystemSettings = useCallback(async () => {
    try {
      const permission = await Brightness.getPermissionsAsync();
      permissionGrantedRef.current = permission.granted;
      setBrightnessPermissionGranted(permission.granted);

      const currentBrightness = permission.granted
        ? await Brightness.getSystemBrightnessAsync()
        : await Brightness.getBrightnessAsync();
      setBrightnessState(Math.round(currentBrightness * 100));
    } catch {
      // Keep the last known value when the device does not expose brightness.
    }

    if (SystemSettings) {
      try {
        setVolumeState(await SystemSettings.getMediaVolume());
      } catch {
        // Keep the last known value when system audio is unavailable.
      }
    }
  }, []);

  useEffect(() => {
    void refreshSystemSettings();

    const subscription = AppState.addEventListener('change', state => {
      if (state === 'active') {
        void refreshSystemSettings();
      }
    });

    return () => subscription.remove();
  }, [refreshSystemSettings]);

  const setBrightness = useCallback(async (value: number) => {
    const clamped = Math.min(100, Math.max(0, value));
    setBrightnessState(clamped);
    pendingBrightnessRef.current = clamped;

    if (permissionGrantedRef.current) {
      pendingSystemBrightnessRef.current = clamped;
      scheduleSystemBrightnessWrite();
      return;
    }

    if (permissionRequestRef.current) {
      return;
    }

    const request = (async () => {
      try {
        const currentPermission = await Brightness.getPermissionsAsync();
        const response = currentPermission.granted
          ? currentPermission
          : await Brightness.requestPermissionsAsync();

        permissionGrantedRef.current = response.granted;
        setBrightnessPermissionGranted(response.granted);

        if (response.granted) {
          pendingSystemBrightnessRef.current = pendingBrightnessRef.current ?? clamped;
          scheduleSystemBrightnessWrite();
        } else {
          const currentBrightness = await Brightness.getBrightnessAsync();
          setBrightnessState(Math.round(currentBrightness * 100));
        }
      } catch {
        permissionGrantedRef.current = false;
        setBrightnessPermissionGranted(false);
        try {
          const currentBrightness = await Brightness.getBrightnessAsync();
          setBrightnessState(Math.round(currentBrightness * 100));
        } catch {
          // Keep the last known value if the API is unavailable.
        }
      } finally {
        pendingBrightnessRef.current = null;
        permissionRequestRef.current = null;
      }
    })();

    permissionRequestRef.current = request;
    await request;
  }, [scheduleSystemBrightnessWrite]);

  const setVolume = useCallback(async (value: number) => {
    const clamped = Math.min(100, Math.max(0, value));
    setVolumeState(clamped);

    if (!SystemSettings) {
      return;
    }

    pendingVolumeRef.current = clamped;
    scheduleVolumeWrite();
  }, [scheduleVolumeWrite]);

  return {
    brightness,
    brightnessPermissionGranted,
    volume,
    setBrightness,
    setVolume,
  };
}
