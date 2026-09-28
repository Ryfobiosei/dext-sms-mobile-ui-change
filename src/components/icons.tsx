import React from 'react';
import Svg, {
  Path,
  Circle,
  Line,
  Polyline,
  Rect,
  Polygon,
  type SvgProps,
} from 'react-native-svg';

type IconProps = SvgProps & {
  size?: number;
};

function IconBase({
  size = 24,
  children,
  ...props
}: IconProps & {children: React.ReactNode}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      {children}
    </Svg>
  );
}

export function GraduationCapIcon({size = 24, ...props}: IconProps) {
  return (
    <IconBase size={size} {...props}>
      <Path
        d="M22 10L12 5 2 10l10 5 10-5z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 12v5c3 3 9 3 12 0v-5"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

export function WifiIcon({size = 24, ...props}: IconProps) {
  return (
    <IconBase size={size} {...props}>
      <Path
        d="M5 12.55a11 11 0 0 1 14.08 0"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1.42 9a16 16 0 0 1 21.16 0"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.53 16.11a6 6 0 0 1 6.95 0"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={12} cy={20} r={1} fill="currentColor" />
    </IconBase>
  );
}

export function WifiOffIcon({size = 24, ...props}: IconProps) {
  return (
    <IconBase size={size} {...props}>
      <Line
        x1={1}
        y1={1}
        x2={23}
        y2={23}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.71 5.05A16 16 0 0 1 22.58 9"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.53 16.11a6 6 0 0 1 6.95 0"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx={12} cy={20} r={1} fill="currentColor" />
    </IconBase>
  );
}

export function SettingsIcon({size = 24, ...props}: IconProps) {
  return (
    <IconBase size={size} {...props}>
      <Circle
        cx={12}
        cy={12}
        r={3}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

export function Volume2Icon({size = 24, ...props}: IconProps) {
  return (
    <IconBase size={size} {...props}>
      <Polygon
        points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.54 8.46a5 5 0 0 1 0 7.07"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19.07 4.93a10 10 0 0 1 0 14.14"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

export function SunIcon({size = 24, ...props}: IconProps) {
  return (
    <IconBase size={size} {...props}>
      <Circle
        cx={12}
        cy={12}
        r={5}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Line
        x1={12}
        y1={1}
        x2={12}
        y2={3}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Line
        x1={12}
        y1={21}
        x2={12}
        y2={23}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Line
        x1={4.22}
        y1={4.22}
        x2={5.64}
        y2={5.64}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Line
        x1={18.36}
        y1={18.36}
        x2={19.78}
        y2={19.78}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Line
        x1={1}
        y1={12}
        x2={3}
        y2={12}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Line
        x1={21}
        y1={12}
        x2={23}
        y2={12}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Line
        x1={4.22}
        y1={19.78}
        x2={5.64}
        y2={18.36}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Line
        x1={18.36}
        y1={5.64}
        x2={19.78}
        y2={4.22}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

export function MoonIcon({size = 24, ...props}: IconProps) {
  return (
    <IconBase size={size} {...props}>
      <Path
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

export function MonitorIcon({size = 24, ...props}: IconProps) {
  return (
    <IconBase size={size} {...props}>
      <Rect
        x={2}
        y={3}
        width={20}
        height={14}
        rx={2}
        ry={2}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Line
        x1={8}
        y1={21}
        x2={16}
        y2={21}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Line
        x1={12}
        y1={17}
        x2={12}
        y2={21}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

export function CheckIcon({size = 24, ...props}: IconProps) {
  return (
    <IconBase size={size} {...props}>
      <Polyline
        points="20 6 9 17 4 12"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

export function ArrowRightIcon({size = 24, ...props}: IconProps) {
  return (
    <IconBase size={size} {...props}>
      <Line
        x1={5}
        y1={12}
        x2={19}
        y2={12}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Polyline
        points="12 5 19 12 12 19"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

export function ClockIcon({size = 24, ...props}: IconProps) {
  return (
    <IconBase size={size} {...props}>
      <Circle
        cx={12}
        cy={12}
        r={10}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Polyline
        points="12 6 12 12 16 14"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

export function RefreshCwIcon({size = 24, ...props}: IconProps) {
  return (
    <IconBase size={size} {...props}>
      <Polyline
        points="23 4 23 10 17 10"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Polyline
        points="1 20 1 14 7 14"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

export function AlertCircleIcon({size = 24, ...props}: IconProps) {
  return (
    <IconBase size={size} {...props}>
      <Circle
        cx={12}
        cy={12}
        r={10}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Line
        x1={12}
        y1={8}
        x2={12}
        y2={12}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Line
        x1={12}
        y1={16}
        x2={12.01}
        y2={16}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

export function UserXIcon({size = 24, ...props}: IconProps) {
  return (
    <IconBase size={size} {...props}>
      <Path
        d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle
        cx={8.5}
        cy={7}
        r={4}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Line
        x1={18}
        y1={8}
        x2={23}
        y2={13}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Line
        x1={23}
        y1={8}
        x2={18}
        y2={13}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

export function LockIcon({size = 24, ...props}: IconProps) {
  return (
    <IconBase size={size} {...props}>
      <Rect
        x={3}
        y={11}
        width={18}
        height={11}
        rx={2}
        ry={2}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7 11V7a5 5 0 0 1 10 0v4"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

export function ChevronRightIcon({size = 24, ...props}: IconProps) {
  return (
    <IconBase size={size} {...props}>
      <Polyline
        points="9 18 15 12 9 6"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

export function PowerIcon({size = 24, ...props}: IconProps) {
  return (
    <IconBase size={size} {...props}>
      <Path
        d="M18.36 6.64a9 9 0 1 1-12.73 0"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Line
        x1={12}
        y1={2}
        x2={12}
        y2={12}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

export function XIcon({size = 24, ...props}: IconProps) {
  return (
    <IconBase size={size} {...props}>
      <Line
        x1={18}
        y1={6}
        x2={6}
        y2={18}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Line
        x1={6}
        y1={6}
        x2={18}
        y2={18}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}
