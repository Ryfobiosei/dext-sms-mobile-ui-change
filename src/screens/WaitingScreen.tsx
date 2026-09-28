import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';


type Student = {
  fullName: string;
  className: string;
  initials: string;
  firstName: string;
};

type Props = {
  student: Student;
  onStartQuiz: () => void;
};

export function WaitingScreen({student, onStartQuiz}: Props) {
  return (
    <View className="flex-1 items-center justify-center bg-background px-6 dark:bg-background-dark">
      <View className="h-28 w-28 items-center justify-center rounded-full bg-primary/10 dark:bg-primary-dark/20">
        <View className="h-20 w-20 items-center justify-center rounded-full bg-primary dark:bg-primary-dark">
          <Text className="text-3xl font-bold text-white">
            {student.initials}
          </Text>
        </View>
      </View>

      <Text className="mt-8 text-center text-4xl font-bold text-text-primary dark:text-text-primary-dark lg:text-6xl">
        Hi, {student.firstName}
      </Text>

      <Text className="mt-3 text-center text-lg text-text-secondary dark:text-text-secondary-dark lg:text-xl">
        {student.fullName} · {student.className}
      </Text>

      <View className="mt-10 w-full max-w-xl rounded-2xl border border-border bg-card p-6 dark:border-border-dark dark:bg-card-dark">
        <View className="flex-row items-center gap-4">
          <View className="relative h-4 w-4">
            <View className="absolute inset-0 rounded-full bg-success/30 dark:bg-success-dark/30" />
            <View className="absolute inset-1 rounded-full bg-success dark:bg-success-dark" />
          </View>
          <View className="flex-1">
            <Text className="text-xl font-bold text-text-primary dark:text-text-primary-dark">
              Waiting for your teacher
            </Text>
            <Text className="mt-1 text-text-secondary dark:text-text-secondary-dark">
              Keep this screen open. The quiz will appear here as soon as it
              starts.
            </Text>
          </View>
        </View>
      </View>

      {/* Dev-only shortcut to simulate a teacher-pushed quiz */}
      <TouchableOpacity
        onPress={onStartQuiz}
        className="mt-8 rounded-xl border border-dashed border-border bg-surface px-5 py-3 active:opacity-70 dark:border-border-dark dark:bg-surface-dark">
        <Text className="text-sm font-medium text-text-muted dark:text-text-muted-dark">
          Dev shortcut: Start a sample quiz
        </Text>
      </TouchableOpacity>
    </View>
  );
}
