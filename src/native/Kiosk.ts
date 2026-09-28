import {NativeModules, Platform} from 'react-native';

export type KioskMode = 'none' | 'pinned' | 'locked';

export type KioskStatus = {
  deviceOwner: boolean;
  managedKioskEnabled: boolean;
  mode: KioskMode;
};

type KioskNativeModule = {
  getKioskStatus: () => Promise<KioskStatus>;
  startKiosk: () => Promise<boolean>;
  stopKiosk: () => Promise<boolean>;
};

const KioskModule = NativeModules.KioskModule as KioskNativeModule | undefined;

export function isKioskAvailable(): boolean {
  return Platform.OS === 'android' && KioskModule !== undefined;
}

export async function getKioskStatus(): Promise<KioskStatus> {
  if (!isKioskAvailable() || !KioskModule) {
    return {deviceOwner: false, managedKioskEnabled: false, mode: 'none'};
  }
  return KioskModule.getKioskStatus();
}

export async function startKiosk(): Promise<void> {
  if (!isKioskAvailable() || !KioskModule) {
    throw new Error('Kiosk mode is available on Android only.');
  }
  await KioskModule.startKiosk();
}

export async function stopKiosk(): Promise<void> {
  if (!isKioskAvailable() || !KioskModule) {
    throw new Error('Kiosk mode is available on Android only.');
  }
  await KioskModule.stopKiosk();
}
