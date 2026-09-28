import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {
  GraduationCapIcon,
  WifiIcon,
  WifiOffIcon,
  SettingsIcon,
  ClockIcon,
  UserXIcon,
} from './icons';

type Student = {
  fullName: string;
  className: string;
  initials: string;
};

type Props = {
  children: React.ReactNode;
  student?: Student | null;
  deviceId: string;
  networkName: string;
  isConnected: boolean;
  onOpenSettings: () => void;
  timerSeconds?: number;
  showTimer?: boolean;
  schoolName?: string;
};

function formatTimer(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function AppShell({
  children,
  student,
  deviceId,
  networkName,
  isConnected,
  onOpenSettings,
  timerSeconds = 0,
  showTimer = false,
  schoolName = '[SCHOOL NAME]',
}: Props) {
  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-background-dark">
      {/* Header */}
      <View className="flex-row items-center justify-between border-b border-border px-4 py-4 dark:border-border-dark lg:px-8">
        {/* Brand */}
        <View className="flex-row items-center gap-3">
          <View className="h-10 w-10 items-center justify-center rounded-xl bg-primary dark:bg-primary-dark">
            <GraduationCapIcon size={22} color="#ffffff" />
          </View>
          <Text className="text-lg font-bold text-text-primary dark:text-text-primary-dark">
            {schoolName}
          </Text>
        </View>

        {/* Student chip or unlinked indicator */}
        {student ? (
          <View className="flex-row items-center gap-3 rounded-full border border-border bg-surface px-3 py-2 dark:border-border-dark dark:bg-surface-dark">
            <View className="h-8 w-8 items-center justify-center rounded-full bg-primary dark:bg-primary-dark">
              <Text className="text-xs font-bold text-white">
                {student.initials}
              </Text>
            </View>
            <View>
              <Text className="text-sm font-semibold text-text-primary dark:text-text-primary-dark">
                {student.fullName}
              </Text>
              <Text className="text-xs text-text-secondary dark:text-text-secondary-dark">
                {student.className}
              </Text>
            </View>
          </View>
        ) : (
          <View className="flex-row items-center gap-2 rounded-full border border-warning/30 bg-warning/10 px-4 py-2">
            <UserXIcon size={16} color="#f59e0b" />
            <Text className="text-sm font-semibold text-warning dark:text-warning-dark">
              No student linked
            </Text>
          </View>
        )}

        {/* Right actions */}
        <View className="flex-row items-center gap-4">
          {showTimer && (
            <View className="flex-row items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 dark:border-border-dark dark:bg-surface-dark">
              <ClockIcon
                size={18}
                className="text-text-secondary dark:text-text-secondary-dark"
              />
              <Text className="text-base font-semibold text-text-primary dark:text-text-primary-dark">
                {formatTimer(timerSeconds)}
              </Text>
            </View>
          )}

          <View className="hidden flex-row items-center gap-2 md:flex">
            {isConnected ? (
              <WifiIcon size={20} color="#64748b" />
            ) : (
              <WifiOffIcon size={20} color="#f59e0b" />
            )}
            <Text className="text-sm text-text-secondary dark:text-text-secondary-dark">
              {isConnected ? networkName : 'Offline'}
            </Text>
          </View>

          <TouchableOpacity
            onPress={onOpenSettings}
            className="h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface active:opacity-70 dark:border-border-dark dark:bg-surface-dark"
            accessibilityLabel="Open settings"
            accessibilityRole="button">
            <SettingsIcon
              size={20}
              className="text-text-primary dark:text-text-primary-dark"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main content */}
      <View className="flex-1">{children}</View>

      {/* Footer */}
      <View className="flex-row items-center justify-between border-t border-border px-4 py-3 dark:border-border-dark lg:px-8">
        <View className="flex-row items-center gap-2">
          <Text className="text-xs text-text-muted dark:text-text-muted-dark">
            Device ID
          </Text>
          <Text className="text-xs font-semibold text-text-primary dark:text-text-primary-dark">
            {deviceId}
          </Text>
        </View>
        <View className="flex-row items-center gap-2">
          {isConnected ? (
            <>
              <WifiIcon size={14} color="#64748b" />
              <Text className="text-xs text-text-muted dark:text-text-muted-dark">
                Connected to {networkName}
              </Text>
            </>
          ) : (
            <>
              <WifiOffIcon size={14} color="#f59e0b" />
              <Text className="text-xs text-warning dark:text-warning-dark">
                Wi-Fi off — reconnect in Settings
              </Text>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
