export const dummySchool = {
  name: '[SCHOOL NAME]',
} as const;

export const dummyDeviceId = 'TAB-7F3A-21C9' as const;

export const dummyStudent = {
  firstName: 'Aisha',
  lastName: 'Khan',
  fullName: 'Aisha Khan',
  className: 'Class 7B',
  initials: 'AK',
} as const;

export const dummyNetworks = [
  {ssid: 'School-Classroom', status: 'connected' as const},
  {ssid: 'School-Guest', status: 'secured' as const},
  {ssid: 'Library-5G', status: 'secured' as const},
];
