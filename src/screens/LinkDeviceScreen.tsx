import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {RefreshCwIcon, AlertCircleIcon} from '../components/icons';

type Props = {
  deviceId: string;
  isSyncing: boolean;
  error: string | null;
  onSync: () => void;
};

export function LinkDeviceScreen({
  deviceId,
  isSyncing,
  error,
  onSync,
}: Props) {
  return (
    <View className="flex-1 flex-row items-center justify-center bg-background px-6 py-10 dark:bg-background-dark">
      <View className="max-w-xl flex-1">
        <View className="self-start rounded-lg border border-warning/30 bg-warning/10 px-3 py-1.5">
          <Text className="text-xs font-bold uppercase tracking-wider text-warning dark:text-warning-dark">
            Setup required
          </Text>
        </View>

        <Text className="mt-5 text-3xl font-bold leading-tight text-text-primary dark:text-text-primary-dark lg:text-5xl">
          Link this tablet to a student
        </Text>

        <Text className="mt-4 text-base text-text-secondary dark:text-text-secondary-dark lg:text-lg">
          Each tablet belongs to one student. Your teacher needs to link this
          tablet to you before you can use it.
        </Text>

        <View className="mt-8 gap-4">
          <Step number={1} text="Ask your teacher to connect this tablet to you." />
          <Step number={2} text="Show them the device ID on the right." />
          <Step
            number={3}
            text="When your teacher says it’s done, tap Sync student details."
          />
        </View>
      </View>

      <View className="max-w-md flex-1">
        <View className="rounded-2xl border border-border bg-card p-6 dark:border-border-dark dark:bg-card-dark">
          <Text className="text-xs font-semibold uppercase tracking-wider text-text-muted dark:text-text-muted-dark">
            Device ID
          </Text>
          <Text className="mt-1 text-3xl font-bold text-text-primary dark:text-text-primary-dark">
            {deviceId}
          </Text>

          <Text className="mt-2 text-text-secondary dark:text-text-secondary-dark">
            Show this ID to your teacher.
          </Text>

          <View className="my-5 h-px bg-border dark:bg-border-dark" />

          <View className="flex-row items-center gap-3">
            <View className="h-2.5 w-2.5 rounded-full bg-warning dark:bg-warning-dark" />
            <Text className="text-text-secondary dark:text-text-secondary-dark">
              Waiting for your teacher to link this tablet
            </Text>
          </View>

          <TouchableOpacity
            onPress={onSync}
            disabled={isSyncing}
            className="mt-5 flex-row items-center justify-center gap-2 rounded-xl bg-primary px-4 py-4 active:opacity-80 disabled:opacity-60 dark:bg-primary-dark">
            <RefreshCwIcon
              size={18}
              color="#ffffff"
              style={isSyncing ? {transform: [{rotate: '45deg'}]} : undefined}
            />
            <Text className="text-base font-semibold text-white">
              {isSyncing ? 'Syncing...' : 'Sync student details'}
            </Text>
          </TouchableOpacity>
        </View>

        {error && (
          <View className="mt-4 rounded-xl border border-error/30 bg-error/10 p-4">
            <View className="flex-row items-start gap-3">
              <AlertCircleIcon
                size={20}
                className="mt-0.5 text-error dark:text-error-dark"
              />
              <View className="flex-1">
                <Text className="font-semibold text-error dark:text-error-dark">
                  {error}
                </Text>
                <Text className="mt-1 text-sm text-text-secondary dark:text-text-secondary-dark">
                  No student details were found for device {deviceId}. Ask your
                  teacher to link this tablet to you, then sync again.
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

function Step({number, text}: {number: number; text: string}) {
  return (
    <View className="flex-row items-start gap-4">
      <View className="h-8 w-8 items-center justify-center rounded-lg bg-primary dark:bg-primary-dark">
        <Text className="font-bold text-white">{number}</Text>
      </View>
      <Text className="mt-1.5 flex-1 text-base leading-relaxed text-text-secondary dark:text-text-secondary-dark">
        {text}
      </Text>
    </View>
  );
}
