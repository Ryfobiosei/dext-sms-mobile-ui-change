import React from 'react';
import {Text, View} from 'react-native';

const optionStyles: Record<
  string,
  {bg: string; text: string; darkBg: string; darkText: string}
> = {
  A: {
    bg: 'bg-blue-600',
    text: 'text-white',
    darkBg: 'dark:bg-blue-600',
    darkText: 'dark:text-white',
  },
  B: {
    bg: 'bg-green-600',
    text: 'text-white',
    darkBg: 'dark:bg-green-600',
    darkText: 'dark:text-white',
  },
  C: {
    bg: 'bg-amber-600',
    text: 'text-white',
    darkBg: 'dark:bg-amber-600',
    darkText: 'dark:text-white',
  },
  D: {
    bg: 'bg-purple-600',
    text: 'text-white',
    darkBg: 'dark:bg-purple-600',
    darkText: 'dark:text-white',
  },
};

type Props = {
  option: 'A' | 'B' | 'C' | 'D';
};

export function OptionBadge({option}: Props) {
  const style = optionStyles[option];

  return (
    <View
      className={`h-10 w-10 items-center justify-center rounded-xl ${style.bg} ${style.darkBg}`}>
      <Text
        className={`text-base font-bold ${style.text} ${style.darkText}`}>
        {option}
      </Text>
    </View>
  );
}
