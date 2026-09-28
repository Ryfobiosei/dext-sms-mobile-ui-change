# DEXT SMS Mobile

React Native mobile application for the DEXT School Management System.

This project uses:

- React Native
- Expo SDK 57
- Expo Development Builds
- TypeScript
- Native Android/Kotlin code
- Custom kiosk/device-owner functionality

The project is **not intended to run with Expo Go** because it contains custom native Android code.

---

# Requirements

Before running the project, install:

- Node.js
- npm
- Android Studio
- Android SDK
- JDK 17
- Git

Recommended:

- Physical Android device for testing
- USB debugging enabled on the device

---

# Clone the Repository

```bash
git clone https://github.com/dext-tech/dext-sms-mobile.git



# enter the Project
cd dext-sms-mobile

# Install dependencies
npm install

# Android builds for this project should use JDK 17

#If another Java version is active, temporarily set JDK 17 in PowerShell:
$env:JAVA_HOME="C:\Program Files\Java\jdk-17"
$env:Path="$env:JAVA_HOME\bin;$env:Path"


# You can also verify what Gradle is using:
cd android
.\gradlew.bat -version

#First-Time Android Setup
#Because this application contains custom Android/Kotlin code, it uses an Expo Development Build rather than Expo Go.
#Connect an Android device using USB and verify that ADB can see it:
adb devices


# Build and install the development client:
npx expo run:android


# Starting the Project
# After the development build has already been installed on the device, normal React Native development does not require rebuilding the Android app every time.
# Start the Expo development server:
npx expo start --dev-client
npx expo start --web
# To clear Metro cache when needed:
npx expo start --dev-client -c

# Make sure the computer and Android device are connected to the same network.
# The installed development client can then connect to the Metro server.



Important Project Structure
dext-sms-mobile/
│
├── android/
│   └── Native Android and Kotlin code
│
├── src/
│   ├── data/
│   ├── native/
│   └── screens/
│
├── App.tsx
├── index.js
├── babel.config.js
├── metro.config.js
├── package.json
└── package-lock.json
