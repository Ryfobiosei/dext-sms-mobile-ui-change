export type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
};

export type Quiz = {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
};

export const quizzes: Quiz[] = [
  {
    id: 'exam-1',
    title: 'Sample Exam 1',
    description: 'General ICT Basics',
    questions: [
      {
        id: 1,
        question: 'What does CPU stand for?',
        options: [
          'Central Processing Unit',
          'Computer Processing Utility',
          'Central Program Unit',
          'Computer Primary Unit',
        ],
        correctAnswer: 0,
      },
      {
        id: 2,
        question: 'Which device is mainly used to enter text into a computer?',
        options: ['Monitor', 'Keyboard', 'Speaker', 'Printer'],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: 'Which of the following is an operating system?',
        options: ['Windows', 'Microsoft Word', 'Google Chrome', 'PowerPoint'],
        correctAnswer: 0,
      },
      {
        id: 4,
        question: 'Which component stores data permanently?',
        options: ['RAM', 'Cache', 'SSD', 'CPU'],
        correctAnswer: 2,
      },
      {
        id: 5,
        question: 'Which device displays visual output?',
        options: ['Mouse', 'Monitor', 'Keyboard', 'Microphone'],
        correctAnswer: 1,
      },
      {
        id: 6,
        question: 'What does RAM stand for?',
        options: [
          'Random Access Memory',
          'Read Access Module',
          'Rapid Application Memory',
          'Remote Access Memory',
        ],
        correctAnswer: 0,
      },
      {
        id: 7,
        question: 'Which of these is a web browser?',
        options: ['Excel', 'Chrome', 'Windows', 'Android'],
        correctAnswer: 1,
      },
      {
        id: 8,
        question: 'Which unit is commonly used to measure file size?',
        options: ['Volt', 'Byte', 'Meter', 'Second'],
        correctAnswer: 1,
      },
      {
        id: 9,
        question: 'Which device is used to print documents?',
        options: ['Scanner', 'Monitor', 'Printer', 'Router'],
        correctAnswer: 2,
      },
      {
        id: 10,
        question: 'Which key is commonly used to move to a new line?',
        options: ['Shift', 'Enter', 'Ctrl', 'Alt'],
        correctAnswer: 1,
      },
    ],
  },

  {
    id: 'exam-2',
    title: 'Sample Exam 2',
    description: 'Computer Hardware',
    questions: [
      {
        id: 1,
        question: 'Which component is known as the brain of the computer?',
        options: ['RAM', 'CPU', 'Hard Drive', 'Monitor'],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: 'Which of these is an input device?',
        options: ['Printer', 'Speaker', 'Mouse', 'Monitor'],
        correctAnswer: 2,
      },
      {
        id: 3,
        question: 'Which component provides temporary storage while programs run?',
        options: ['RAM', 'SSD', 'Keyboard', 'Power Supply'],
        correctAnswer: 0,
      },
      {
        id: 4,
        question: 'What connects components inside a computer?',
        options: ['Motherboard', 'Monitor', 'Mouse', 'Printer'],
        correctAnswer: 0,
      },
      {
        id: 5,
        question: 'Which component supplies electrical power to a computer?',
        options: ['CPU', 'PSU', 'RAM', 'SSD'],
        correctAnswer: 1,
      },
      {
        id: 6,
        question: 'Which device can be used to store files externally?',
        options: ['Flash Drive', 'Monitor', 'CPU Fan', 'Keyboard'],
        correctAnswer: 0,
      },
      {
        id: 7,
        question: 'What is a GPU mainly used for?',
        options: [
          'Graphics processing',
          'Typing documents',
          'Internet connection',
          'Printing',
        ],
        correctAnswer: 0,
      },
      {
        id: 8,
        question: 'Which component helps cool the processor?',
        options: ['Speaker', 'CPU Fan', 'SSD', 'Mouse'],
        correctAnswer: 1,
      },
      {
        id: 9,
        question: 'Which device converts paper documents into digital form?',
        options: ['Printer', 'Scanner', 'Router', 'Monitor'],
        correctAnswer: 1,
      },
      {
        id: 10,
        question: 'Which component stores the operating system and files?',
        options: ['RAM', 'Storage Drive', 'CPU Fan', 'Power Button'],
        correctAnswer: 1,
      },
    ],
  },

  {
    id: 'exam-3',
    title: 'Sample Exam 3',
    description: 'Internet and Networking',
    questions: [
      {
        id: 1,
        question: 'What does LAN stand for?',
        options: [
          'Local Area Network',
          'Large Access Network',
          'Local Access Node',
          'Linked Area Network',
        ],
        correctAnswer: 0,
      },
      {
        id: 2,
        question: 'Which device commonly connects devices to a network?',
        options: ['Router', 'Keyboard', 'Printer', 'Scanner'],
        correctAnswer: 0,
      },
      {
        id: 3,
        question: 'What does Wi-Fi allow devices to do?',
        options: [
          'Connect wirelessly to a network',
          'Print documents',
          'Increase storage',
          'Cool the processor',
        ],
        correctAnswer: 0,
      },
      {
        id: 4,
        question: 'Which protocol is commonly used to view websites?',
        options: ['HTTP', 'USB', 'HDMI', 'PDF'],
        correctAnswer: 0,
      },
      {
        id: 5,
        question: 'Which of these is an example of an IP address?',
        options: [
          '192.168.1.1',
          'www.example.com',
          'computer.exe',
          'folder/document',
        ],
        correctAnswer: 0,
      },
      {
        id: 6,
        question: 'What does DNS mainly do?',
        options: [
          'Translates domain names into IP addresses',
          'Stores computer files',
          'Controls screen brightness',
          'Prints web pages',
        ],
        correctAnswer: 0,
      },
      {
        id: 7,
        question: 'Which of these is a domain name?',
        options: ['google.com', '192.168.0.1', '255.255.255.0', '8080'],
        correctAnswer: 0,
      },
      {
        id: 8,
        question: 'Which device can provide internet access to several devices?',
        options: ['Router', 'Monitor', 'Keyboard', 'Scanner'],
        correctAnswer: 0,
      },
      {
        id: 9,
        question: 'Which term refers to downloading data from the internet?',
        options: [
          'Receiving data',
          'Deleting data',
          'Formatting storage',
          'Printing data',
        ],
        correctAnswer: 0,
      },
      {
        id: 10,
        question: 'Which of these is needed to access websites?',
        options: ['Web Browser', 'Calculator', 'File Explorer', 'Notepad'],
        correctAnswer: 0,
      },
    ],
  },
];