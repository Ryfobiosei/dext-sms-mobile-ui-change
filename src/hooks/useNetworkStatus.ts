import {useCallback, useEffect, useState} from 'react';
import * as Network from 'expo-network';

export function useNetworkStatus() {
  const [isConnected, setIsConnected] = useState(true);

  const check = useCallback(async () => {
    try {
      const state = await Network.getNetworkStateAsync();
      setIsConnected(Boolean(state.isConnected && state.isInternetReachable));
    } catch {
      setIsConnected(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    async function runCheck() {
      try {
        const state = await Network.getNetworkStateAsync();
        if (mounted) {
          setIsConnected(Boolean(state.isConnected && state.isInternetReachable));
        }
      } catch {
        if (mounted) {
          setIsConnected(false);
        }
      }
    }

    runCheck();

    const interval = setInterval(runCheck, 5000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return {
    isConnected,
    recheck: check,
  };
}
