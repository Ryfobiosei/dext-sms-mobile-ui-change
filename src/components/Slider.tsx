import React, {useRef, useCallback} from 'react';
import {
  View,
  Animated,
  GestureResponderEvent,
  LayoutChangeEvent,
  StyleSheet,
} from 'react-native';

type Props = {
  value: number;
  onValueChange: (value: number) => void;
  minimumTrackTintColor?: string;
  maximumTrackTintColor?: string;
};

const styles = StyleSheet.create({
  track: {
    height: 6,
    borderRadius: 9999,
  },
  thumb: {
    position: 'absolute',
    top: 3,
    width: 16,
    height: 16,
    borderRadius: 9999,
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
});

export function Slider({
  value,
  onValueChange,
  minimumTrackTintColor = '#2563eb',
  maximumTrackTintColor = '#e2e8f0',
}: Props) {
  const animatedValue = useRef(new Animated.Value(value)).current;
  const trackWidth = useRef(0);

  React.useEffect(() => {
    animatedValue.setValue(value);
  }, [animatedValue, value]);

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    trackWidth.current = event.nativeEvent.layout.width;
  }, []);

  const handleTouch = useCallback(
    (event: GestureResponderEvent) => {
      if (trackWidth.current <= 0) {
        return;
      }

      const ratio = Math.min(
        Math.max(event.nativeEvent.locationX / trackWidth.current, 0),
        1,
      );
      onValueChange(Math.round(ratio * 100));
    },
    [onValueChange],
  );

  return (
    <View
      className="h-6 w-full justify-center"
      onLayout={handleLayout}
      onStartShouldSetResponder={() => true}
      onMoveShouldSetResponder={() => true}
      onStartShouldSetResponderCapture={() => true}
      onMoveShouldSetResponderCapture={() => true}
      onResponderGrant={handleTouch}
      onResponderMove={handleTouch}
      onResponderRelease={handleTouch}
      onResponderTerminationRequest={() => false}
      accessible
      accessibilityRole="adjustable"
      accessibilityValue={{min: 0, max: 100, now: value}}
    >
      {/* Track background */}
      <View
        style={[styles.track, {backgroundColor: maximumTrackTintColor}]}
        pointerEvents="none"
      />
      {/* Filled track */}
      <View
        className="absolute left-0 top-[9px] h-1.5 rounded-full"
        style={{
          backgroundColor: minimumTrackTintColor,
          width: `${value}%`,
        }}
        pointerEvents="none"
      />
      {/* Thumb */}
      <Animated.View
        style={[
          styles.thumb,
          {
            left: `${value}%`,
            transform: [{translateX: -8}],
          },
        ]}
        pointerEvents="none"
      />
    </View>
  );
}
