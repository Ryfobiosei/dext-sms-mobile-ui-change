import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

import {useTheme} from '../theme/ThemeProvider';
import {Slider} from './Slider';
import {
  XIcon,
  Volume2Icon,
  SunIcon,
  WifiIcon,
  LockIcon,
  MoonIcon,
  MonitorIcon,
} from './icons';

type Network = {
  ssid: string;
  connected: boolean;
  secured: boolean;
  signalLevel: number;
};

type Student = {
  fullName: string;
  className: string;
  initials: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  deviceId: string;
  student?: Student | null;
  volume: number;
  onVolumeChange: (value: number) => void;
  brightness: number;
  onBrightnessChange: (value: number) => void;
  brightnessPermissionGranted: boolean;
  wifiEnabled: boolean;
  wifiConnected: boolean;
  connectedSSID: string | null;
  locationPermissionGranted: boolean;
  locationServicesEnabled: boolean;
  wifiLoading: boolean;
  wifiError: string | null;
  networks: Network[];
  kioskAvailable: boolean;
  kioskMode: 'none' | 'pinned' | 'locked';
  kioskDeviceOwner: boolean;
  kioskBusy: boolean;
  kioskAwaitingConfirmation: boolean;
  kioskError: string | null;
  onEnableKiosk: () => void;
  onDisableKiosk: () => void;
  onWifiRefresh: () => void;
  onOpenWifiSettings: () => void;
  onOpenLocationSettings: () => void;
};

const DRAWER_WIDTH = 400;

const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    maxWidth: '100%',
    shadowColor: '#000000',
    shadowOffset: {width: -2, height: 0},
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },
  drawerLight: {
    backgroundColor: '#ffffff',
  },
  drawerDark: {
    backgroundColor: '#0d101c',
  },
});

function ThemeButton({
  label,
  active,
  onPress,
  icon,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
  icon: React.ReactNode;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-1 flex-row items-center justify-center gap-2 rounded-lg px-2 py-2 ${
        active
          ? 'bg-primary dark:bg-primary-dark'
          : 'bg-surface dark:bg-surface-dark'
      }`}>
      {icon}
      <Text
        className={`text-xs font-semibold ${
          active ? 'text-white' : 'text-text-secondary dark:text-text-secondary-dark'
        }`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export function SettingsDrawer({
  visible,
  onClose,
  deviceId,
  student,
  volume,
  onVolumeChange,
  brightness,
  onBrightnessChange,
  brightnessPermissionGranted,
  wifiEnabled,
  wifiConnected,
  connectedSSID,
  locationPermissionGranted,
  locationServicesEnabled,
  wifiLoading,
  wifiError,
  networks,
  kioskAvailable,
  kioskMode,
  kioskDeviceOwner,
  kioskBusy,
  kioskAwaitingConfirmation,
  kioskError,
  onEnableKiosk,
  onDisableKiosk,
  onWifiRefresh,
  onOpenWifiSettings,
  onOpenLocationSettings,
}: Props) {
  const {mode, resolvedTheme, setMode} = useTheme();
  const {width: windowWidth} = useWindowDimensions();
  const drawerWidth = Math.min(DRAWER_WIDTH, windowWidth);

  return (
    <View
      className={`absolute inset-0 z-50 ${visible ? 'flex' : 'hidden'}`}
      pointerEvents={visible ? 'auto' : 'none'}>
      {/* Backdrop */}
      <Pressable
        className="absolute inset-0 bg-black/50"
        style={{right: drawerWidth}}
        onPress={onClose}
        accessibilityLabel="Close settings"
        accessibilityRole="button"
      />

      {/* Drawer */}
      <View
        style={[
          styles.drawer,
          resolvedTheme === 'dark' ? styles.drawerDark : styles.drawerLight,
          {
            transform: [{translateX: visible ? 0 : drawerWidth}],
          },
        ]}>
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 py-5">
            <Text className="text-2xl font-bold text-text-primary dark:text-text-primary-dark">
              Settings
            </Text>
            <TouchableOpacity
              onPress={onClose}
              className="h-10 w-10 items-center justify-center rounded-full border border-border bg-surface active:opacity-70 dark:border-border-dark dark:bg-card-dark"
              accessibilityLabel="Close settings"
              accessibilityRole="button">
              <XIcon
                size={20}
                className="text-text-secondary dark:text-text-secondary-dark"
              />
            </TouchableOpacity>
          </View>

          <ScrollView
            className="flex-1 px-6"
            contentContainerStyle={{paddingBottom: 64}}
            showsVerticalScrollIndicator={false}>
            <View className="pb-4">
              {/* Device & student card */}
              <View className="rounded-2xl border border-border bg-card p-5 dark:border-border-dark dark:bg-card-dark">
                <Text className="text-xs font-semibold uppercase tracking-wider text-text-muted dark:text-text-muted-dark">
                  Device ID
                </Text>
                <Text className="mt-1 text-2xl font-bold text-text-primary dark:text-text-primary-dark">
                  {deviceId}
                </Text>

                {student && (
                  <View className="mt-4 flex-row border-t border-border pt-4 dark:border-border-dark">
                    <View className="flex-1">
                      <Text className="text-xs text-text-muted dark:text-text-muted-dark">
                        Student
                      </Text>
                      <Text className="mt-1 font-semibold text-text-primary dark:text-text-primary-dark">
                        {student.fullName}
                      </Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-xs text-text-muted dark:text-text-muted-dark">
                        Class
                      </Text>
                      <Text className="mt-1 font-semibold text-text-primary dark:text-text-primary-dark">
                        {student.className}
                      </Text>
                    </View>
                  </View>
                )}
              </View>

              {/* Volume */}
              <View className="mt-6">
                <View className="mb-3 flex-row items-center justify-between">
                  <View className="flex-row items-center gap-3">
                    <Volume2Icon
                      size={20}
                      className="text-text-secondary dark:text-text-secondary-dark"
                    />
                    <Text className="text-base font-semibold text-text-primary dark:text-text-primary-dark">
                      Volume
                    </Text>
                  </View>
                  <Text className="text-sm font-semibold text-text-secondary dark:text-text-secondary-dark">
                    {volume}%
                  </Text>
                </View>
                <Slider
                  value={volume}
                  onValueChange={onVolumeChange}
                  minimumTrackTintColor={resolvedTheme === 'dark' ? '#3b82f6' : '#2563eb'}
                  maximumTrackTintColor={
                    resolvedTheme === 'dark' ? '#1e2336' : '#e2e8f0'
                  }
                />
              </View>

              {/* Brightness */}
              <View className="mt-6">
                <View className="mb-3 flex-row items-center justify-between">
                  <View className="flex-row items-center gap-3">
                    <SunIcon
                      size={20}
                      className="text-text-secondary dark:text-text-secondary-dark"
                    />
                    <Text className="text-base font-semibold text-text-primary dark:text-text-primary-dark">
                      Brightness
                    </Text>
                  </View>
                  <Text className="text-sm font-semibold text-text-secondary dark:text-text-secondary-dark">
                    {brightness}%
                  </Text>
                </View>
                <Slider
                  value={brightness}
                  onValueChange={onBrightnessChange}
                  minimumTrackTintColor={resolvedTheme === 'dark' ? '#f59e0b' : '#d97706'}
                  maximumTrackTintColor={
                    resolvedTheme === 'dark' ? '#1e2336' : '#e2e8f0'
                  }
                />
                {!brightnessPermissionGranted && (
                  <Text className="mt-2 text-xs text-text-muted dark:text-text-muted-dark">
                    Android may ask to allow system brightness changes the first time you adjust this.
                  </Text>
                )}
              </View>

              {/* Wi-Fi */}
              <View className="mt-6">
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-3">
                    <WifiIcon
                      size={20}
                      className="text-text-secondary dark:text-text-secondary-dark"
                    />
                    <Text className="text-base font-semibold text-text-primary dark:text-text-primary-dark">
                      Wi-Fi
                    </Text>
                  </View>
                  <Text
                    className={`text-sm font-semibold ${
                      wifiEnabled
                        ? 'text-success dark:text-success-dark'
                        : 'text-warning dark:text-warning-dark'
                    }`}>
                    {wifiEnabled ? 'On' : 'Off'}
                  </Text>
                </View>

                {!wifiEnabled && (
                  <View className="mt-3 rounded-xl border border-warning/30 bg-warning/10 p-4 dark:border-warning-dark/30 dark:bg-warning-dark/10">
                    <Text className="text-sm text-warning dark:text-warning-dark">
                      Wi-Fi is off on this tablet. Turn it on in Android Wi-Fi settings to connect to a network.
                    </Text>
                  </View>
                )}

                <Text className="mt-2 text-xs text-text-muted dark:text-text-muted-dark">
                  {connectedSSID
                    ? `Connected to ${connectedSSID}`
                    : wifiConnected && !locationPermissionGranted
                      ? 'Connected to Wi-Fi — allow Location to show the network name'
                      : wifiConnected
                        ? 'Connected to Wi-Fi'
                    : wifiEnabled
                      ? 'Not connected to Wi-Fi'
                      : 'No Wi-Fi connection'}
                </Text>

                {wifiEnabled && !locationPermissionGranted && (
                  <View className="mt-3 rounded-xl border border-border bg-card p-4 dark:border-border-dark dark:bg-card-dark">
                    <Text className="text-sm text-text-secondary dark:text-text-secondary-dark">
                      Android requires location access to show nearby Wi-Fi names. The app uses this permission only to list networks for this tablet.
                    </Text>
                  </View>
                )}

                {wifiEnabled && locationPermissionGranted && !locationServicesEnabled && (
                  <View className="mt-3 rounded-xl border border-warning/30 bg-warning/10 p-4 dark:border-warning-dark/30 dark:bg-warning-dark/10">
                    <Text className="text-sm text-warning dark:text-warning-dark">
                      Turn on Location in Android settings to scan for nearby Wi-Fi networks.
                    </Text>
                  </View>
                )}

                {wifiEnabled && locationPermissionGranted && locationServicesEnabled && (
                  <View className="mt-3 rounded-xl border border-border bg-card dark:border-border-dark dark:bg-card-dark">
                    {networks.map((network, index) => (
                      <TouchableOpacity
                        key={network.ssid}
                        onPress={onOpenWifiSettings}
                        accessibilityRole="button"
                        accessibilityLabel={`Choose ${network.ssid} in Android Wi-Fi settings`}
                        className={`flex-row items-center justify-between px-4 py-3 active:opacity-70 ${
                          index !== networks.length - 1
                            ? 'border-b border-border dark:border-border-dark'
                            : ''
                        }`}>
                        <View className="flex-row items-center gap-3">
                          <WifiIcon
                            size={18}
                            className="text-text-secondary dark:text-text-secondary-dark"
                          />
                          <View>
                            <Text className="font-medium text-text-primary dark:text-text-primary-dark">
                              {network.ssid}
                            </Text>
                            <Text className="text-xs text-text-muted dark:text-text-muted-dark">
                              Signal {network.signalLevel + 1}/5
                            </Text>
                          </View>
                        </View>
                        {network.connected ? (
                          <Text className="text-sm font-semibold text-success dark:text-success-dark">
                            Connected
                          </Text>
                        ) : network.secured ? (
                          <View className="flex-row items-center gap-1">
                            <LockIcon
                              size={14}
                              className="text-text-muted dark:text-text-muted-dark"
                            />
                            <Text className="text-sm text-text-muted dark:text-text-muted-dark">
                              Secured
                            </Text>
                          </View>
                        ) : (
                          <Text className="text-sm text-text-muted dark:text-text-muted-dark">
                            Open
                          </Text>
                        )}
                      </TouchableOpacity>
                    ))}
                    {networks.length === 0 && (
                      <Text className="px-4 py-3 text-sm text-text-muted dark:text-text-muted-dark">
                        No nearby networks found.
                      </Text>
                    )}
                  </View>
                )}

                {wifiError && (
                  <Text className="mt-2 text-xs text-warning dark:text-warning-dark">
                    {wifiError}
                  </Text>
                )}

                <View className="mt-3 flex-row gap-2">
                  <TouchableOpacity
                    onPress={onWifiRefresh}
                    disabled={wifiLoading || !wifiEnabled}
                    className="flex-1 rounded-xl border border-border bg-card px-3 py-3 active:opacity-70 disabled:opacity-50 dark:border-border-dark dark:bg-card-dark"
                    accessibilityRole="button">
                    <Text className="text-center text-sm font-semibold text-text-primary dark:text-text-primary-dark">
                      {wifiLoading
                        ? 'Scanning…'
                        : locationPermissionGranted
                          ? 'Refresh networks'
                          : 'Allow and scan'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={onOpenWifiSettings}
                    className="flex-1 rounded-xl bg-primary px-3 py-3 active:opacity-70 dark:bg-primary-dark"
                    accessibilityRole="button">
                    <Text className="text-center text-sm font-semibold text-white">
                      Connect in Android
                    </Text>
                  </TouchableOpacity>
                </View>

                {locationPermissionGranted && !locationServicesEnabled && (
                  <TouchableOpacity
                    onPress={onOpenLocationSettings}
                    className="mt-2 rounded-xl border border-border bg-card px-4 py-3 active:opacity-70 dark:border-border-dark dark:bg-card-dark"
                    accessibilityRole="button">
                    <Text className="text-center text-sm font-semibold text-text-primary dark:text-text-primary-dark">
                      Open Location settings
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Theme */}
              <View className="mt-6">
                <Text className="mb-3 text-sm font-semibold text-text-primary dark:text-text-primary-dark">
                  Appearance
                </Text>
                <View className="flex-row gap-2">
                  <ThemeButton
                    label="Light"
                    active={mode === 'light'}
                    onPress={() => setMode('light')}
                    icon={
                      <SunIcon
                        size={14}
                        className={mode === 'light' ? 'text-white' : 'text-text-secondary dark:text-text-secondary-dark'}
                      />
                    }
                  />
                  <ThemeButton
                    label="Dark"
                    active={mode === 'dark'}
                    onPress={() => setMode('dark')}
                    icon={
                      <MoonIcon
                        size={14}
                        className={mode === 'dark' ? 'text-white' : 'text-text-secondary dark:text-text-secondary-dark'}
                      />
                    }
                  />
                  <ThemeButton
                    label="System"
                    active={mode === 'system'}
                    onPress={() => setMode('system')}
                    icon={
                      <MonitorIcon
                        size={14}
                        className={mode === 'system' ? 'text-white' : 'text-text-secondary dark:text-text-secondary-dark'}
                      />
                    }
                  />
                </View>
              </View>

              {/* Kiosk mode */}
              <View className="mt-6 rounded-2xl border border-border bg-card p-4 dark:border-border-dark dark:bg-card-dark">
                <View className="flex-row items-center gap-3">
                  <LockIcon
                    size={18}
                    className="text-text-secondary dark:text-text-secondary-dark"
                  />
                  <View className="flex-1">
                    <Text className="text-base font-semibold text-text-primary dark:text-text-primary-dark">
                      Kiosk mode
                    </Text>
                    <Text className="mt-1 text-sm font-medium text-text-secondary dark:text-text-secondary-dark">
                      {kioskAwaitingConfirmation
                        ? 'Waiting for Android confirmation'
                        : kioskMode === 'locked'
                          ? 'Managed kiosk is active'
                          : kioskMode === 'pinned'
                            ? 'Screen pinning is active'
                            : 'Off'}
                    </Text>
                  </View>
                </View>
                <Text className="mt-3 text-xs leading-5 text-text-muted dark:text-text-muted-dark">
                  {kioskAwaitingConfirmation
                    ? 'Confirm the Android screen-pinning prompt to keep this app on screen.'
                    : kioskMode === 'locked'
                      ? 'This tablet is running the app in managed lock-task mode.'
                      : kioskMode === 'pinned'
                        ? 'Android is keeping this app on screen. Use the device pinning controls to leave.'
                        : kioskDeviceOwner
                          ? 'Enable managed kiosk mode to keep this app in the foreground on this managed tablet.'
                          : 'Enable screen pinning to keep this app on screen. Android will ask you to confirm.'}
                </Text>
                {kioskError && (
                  <Text className="mt-2 text-xs text-warning dark:text-warning-dark">
                    {kioskError}
                  </Text>
                )}
                <TouchableOpacity
                  onPress={kioskMode === 'none' ? onEnableKiosk : onDisableKiosk}
                  disabled={!kioskAvailable || kioskBusy || kioskAwaitingConfirmation}
                  className="mt-3 rounded-xl bg-primary px-4 py-3 active:opacity-70 disabled:opacity-50 dark:bg-primary-dark"
                  accessibilityRole="button">
                  <Text className="text-center text-sm font-semibold text-white">
                    {!kioskAvailable
                      ? 'Android only'
                      : kioskBusy
                        ? 'Please wait…'
                        : kioskAwaitingConfirmation
                          ? 'Waiting for Android…'
                          : kioskMode === 'none'
                            ? kioskDeviceOwner
                              ? 'Enable kiosk mode'
                              : 'Enable screen pinning'
                            : 'Exit kiosk mode'}
                  </Text>
                </TouchableOpacity>
              </View>

            </View>
          </ScrollView>

        </View>
      </View>
    </View>
  );
}
