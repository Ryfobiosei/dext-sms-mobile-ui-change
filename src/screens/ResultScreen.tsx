import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {RefreshCwIcon} from '../components/icons';

type Props = {
  score: number;
  total: number;
  onBackToDashboard: () => void;
};

export function ResultScreen({score, total, onBackToDashboard}: Props) {
  const percentage = Math.round((score / total) * 100);
  const incorrect = total - score;

  return (
    <View className="flex-1 items-center justify-center bg-background px-6 dark:bg-background-dark">
      <View className="w-full max-w-lg rounded-2xl border border-border bg-card p-8 dark:border-border-dark dark:bg-card-dark">
        <Text className="text-center text-lg text-text-secondary dark:text-text-secondary-dark">
          Quiz completed
        </Text>

        <Text className="mt-2 text-center text-5xl font-bold text-text-primary dark:text-text-primary-dark lg:text-6xl">
          {percentage}%
        </Text>

        <Text className="mt-2 text-center text-2xl font-semibold text-text-primary dark:text-text-primary-dark">
          {score} / {total}
        </Text>

        <View className="mt-8 flex-row gap-4">
          <View className="flex-1 rounded-xl bg-success/10 p-4 dark:bg-success-dark/10">
            <Text className="text-center text-3xl font-bold text-success dark:text-success-dark">
              {score}
            </Text>
            <Text className="mt-1 text-center text-sm text-text-secondary dark:text-text-secondary-dark">
              Correct
            </Text>
          </View>
          <View className="flex-1 rounded-xl bg-error/10 p-4 dark:bg-error-dark/10">
            <Text className="text-center text-3xl font-bold text-error dark:text-error-dark">
              {incorrect}
            </Text>
            <Text className="mt-1 text-center text-sm text-text-secondary dark:text-text-secondary-dark">
              Incorrect
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={onBackToDashboard}
          className="mt-8 flex-row items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 active:opacity-80 dark:bg-primary-dark">
          <RefreshCwIcon size={18} color="#ffffff" />
          <Text className="text-base font-semibold text-white">
            Back to waiting screen
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
