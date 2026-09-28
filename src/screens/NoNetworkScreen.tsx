import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {WifiOffIcon, RefreshCwIcon, WifiIcon} from '../components/icons';

type Props = {
  onRetry: () => void;
  onOpenSettings: () => void;
};

export function NoNetworkScreen({onRetry, onOpenSettings}: Props) {
  return (
    <View className="flex-1 items-center justify-center bg-background px-8 dark:bg-background-dark">
      <View className="h-24 w-24 items-center justify-center rounded-full bg-warning/10 dark:bg-warning-dark/10">
        <WifiOffIcon size={40} color="#f59e0b" />
      </View>

      <Text className="mt-8 text-center text-3xl font-bold text-text-primary dark:text-text-primary-dark lg:text-4xl">
        No network connection
      </Text>

      <Text className="mt-4 max-w-xl text-center text-base text-text-secondary dark:text-text-secondary-dark lg:text-lg">
        This tablet isn’t connected to Wi-Fi, so quizzes and student details
        can’t reach it. Connect to a network to continue.
      </Text>

      <View className="mt-8 flex-row gap-4">
        <TouchableOpacity
          onPress={onOpenSettings}
          className="flex-row items-center gap-2 rounded-xl bg-primary px-6 py-3.5 active:opacity-80 dark:bg-primary-dark">
          <WifiIcon size={18} color="#ffffff" />
          <Text className="text-base font-semibold text-white">
            Open Wi-Fi settings
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onRetry}
          className="flex-row items-center gap-2 rounded-xl border border-border bg-surface px-6 py-3.5 active:opacity-70 dark:border-border-dark dark:bg-surface-dark">
          <RefreshCwIcon
            size={18}
            className="text-text-primary dark:text-text-primary-dark"
          />
          <Text className="text-base font-semibold text-text-primary dark:text-text-primary-dark">
            Try again
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
