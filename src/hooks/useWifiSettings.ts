import {useCallback, useEffect, useState} from 'react';
import {AppState, NativeModules, PermissionsAndroid, Platform} from 'react-native';

export type WifiNetwork = {
  ssid: string;
  connected: boolean;
  secured: boolean;
  signalLevel: number;
};

type WifiStatus = {
  enabled: boolean;
  connected: boolean;
  locationPermissionGranted: boolean;
  locationServicesEnabled: boolean;
  connectedSSID: string | null;
  networks: WifiNetwork[];
};

type SystemSettingsNativeModule = {
  getWifiStatus: () => Promise<WifiStatus>;
  scanWifiNetworks: () => Promise<WifiStatus>;
  openWifiSettings: () => Promise<boolean>;
  openLocationSettings: () => Promise<boolean>;
};

const SystemSettings = NativeModules.SystemSettings as
  | SystemSettingsNativeModule
  | undefined;

const emptyStatus: WifiStatus = {
  enabled: false,
  connected: false,
  locationPermissionGranted: false,
  locationServicesEnabled: false,
  connectedSSID: null,
  networks: [],
};

export function useWifiSettings() {
  const [status, setStatus] = useState(emptyStatus);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async (requestPermission = false) => {
    if (Platform.OS !== 'android' || !SystemSettings) {
      setStatus(emptyStatus);
      setError('Wi-Fi scanning is available on Android tablets.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let permissionGranted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (!permissionGranted && requestPermission) {
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Allow nearby Wi-Fi names',
            message:
              'Android requires location access to show nearby Wi-Fi network names. Kiosk Learning uses it only to list networks for this tablet.',
            buttonPositive: 'Allow',
            buttonNegative: 'Not now',
          },
        );
        permissionGranted = result === PermissionsAndroid.RESULTS.GRANTED;
      }

      let nextStatus = await SystemSettings.getWifiStatus();
      if (permissionGranted && nextStatus.enabled && nextStatus.locationServicesEnabled) {
        nextStatus = await SystemSettings.scanWifiNetworks();
      }

      setStatus({...nextStatus, locationPermissionGranted: permissionGranted});
      if (!permissionGranted && requestPermission) {
        setError('Allow location access to show nearby Wi-Fi networks.');
      } else if (permissionGranted && !nextStatus.locationServicesEnabled) {
        setError('Turn on Location in Android settings to scan nearby networks.');
      } else if (nextStatus.enabled && permissionGranted && nextStatus.networks.length === 0) {
        setError('No nearby networks found. Try scanning again.');
      }
    } catch (reason) {
      const message = reason instanceof Error ? reason.message : 'Could not read Wi-Fi networks.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();

    const subscription = AppState.addEventListener('change', state => {
      if (state === 'active') {
        void refresh();
      }
    });

    return () => subscription.remove();
  }, [refresh]);

  const scan = useCallback(() => refresh(true), [refresh]);

  const openWifiSettings = useCallback(async () => {
    if (SystemSettings) {
      try {
        await SystemSettings.openWifiSettings();
      } catch {
        setError('Android Wi-Fi settings could not be opened.');
      }
    }
  }, []);

  const openLocationSettings = useCallback(async () => {
    if (SystemSettings) {
      try {
        await SystemSettings.openLocationSettings();
      } catch {
        setError('Android Location settings could not be opened.');
      }
    }
  }, []);

  return {
    ...status,
    loading,
    error,
    refresh: scan,
    openWifiSettings,
    openLocationSettings,
  };
}
