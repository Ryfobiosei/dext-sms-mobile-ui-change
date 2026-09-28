import {useCallback, useEffect, useRef, useState} from 'react';
import {AppState} from 'react-native';

import {
  getKioskStatus,
  isKioskAvailable,
  KioskMode,
  KioskStatus,
  startKiosk,
  stopKiosk,
} from '../native/Kiosk';

export function useKioskMode() {
  const [mode, setMode] = useState<KioskMode>('none');
  const [deviceOwner, setDeviceOwner] = useState(false);
  const [managedKioskEnabled, setManagedKioskEnabled] = useState(false);
  const [busy, setBusy] = useState(false);
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [available] = useState(isKioskAvailable);
  const pollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const applyStatus = useCallback((status: KioskStatus) => {
    setDeviceOwner(status.deviceOwner);
    setManagedKioskEnabled(status.managedKioskEnabled);
    setMode(status.mode);
    if (status.mode !== 'none') {
      setAwaitingConfirmation(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    if (!available) {
      return null;
    }
    try {
      const status = await getKioskStatus();
      applyStatus(status);
      return status;
    } catch {
      return null;
    }
  }, [applyStatus, available]);

  const pollForPinConfirmation = useCallback(
    (remainingChecks: number) => {
      if (remainingChecks <= 0) {
        setAwaitingConfirmation(false);
        return;
      }

      pollTimerRef.current = setTimeout(async () => {
        const status = await refresh();
        if (status?.mode === 'none') {
          pollForPinConfirmation(remainingChecks - 1);
        }
      }, 700);
    },
    [refresh],
  );

  useEffect(() => {
    void refresh();
    const subscription = AppState.addEventListener('change', state => {
      if (state === 'active') {
        void refresh();
      }
    });
    return () => {
      subscription.remove();
      if (pollTimerRef.current !== null) {
        clearTimeout(pollTimerRef.current);
      }
    };
  }, [refresh]);

  const enable = useCallback(async () => {
    setBusy(true);
    setError(null);
    setAwaitingConfirmation(false);
    if (pollTimerRef.current !== null) {
      clearTimeout(pollTimerRef.current);
      pollTimerRef.current = null;
    }

    try {
      await startKiosk();
      const status = await refresh();
      if (!status?.deviceOwner && status?.mode === 'none') {
        setAwaitingConfirmation(true);
        pollForPinConfirmation(12);
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not enable kiosk mode.');
    } finally {
      setBusy(false);
    }
  }, [pollForPinConfirmation, refresh]);

  const disable = useCallback(async () => {
    setBusy(true);
    setError(null);
    setAwaitingConfirmation(false);
    if (pollTimerRef.current !== null) {
      clearTimeout(pollTimerRef.current);
      pollTimerRef.current = null;
    }

    try {
      await stopKiosk();
      await refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not exit kiosk mode.');
    } finally {
      setBusy(false);
    }
  }, [refresh]);

  return {
    available,
    mode,
    deviceOwner,
    managedKioskEnabled,
    busy,
    awaitingConfirmation,
    error,
    enable,
    disable,
  };
}
