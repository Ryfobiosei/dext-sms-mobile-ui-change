import './global.css';
import React, {useEffect, useState} from 'react';
import {StatusBar, View} from 'react-native';

import {SafeAreaProvider} from 'react-native-safe-area-context';

import {AppShell} from './src/components/AppShell';
import {SettingsDrawer} from './src/components/SettingsDrawer';
import {ThemeProvider, useTheme} from './src/theme/ThemeProvider';
import {useSystemSettings} from './src/hooks/useSystemSettings';
import {useKioskMode} from './src/hooks/useKioskMode';
import {useWifiSettings} from './src/hooks/useWifiSettings';
import {useNetworkStatus} from './src/hooks/useNetworkStatus';
import {LinkDeviceScreen} from './src/screens/LinkDeviceScreen';
import {WaitingScreen} from './src/screens/WaitingScreen';
import {QuizScreen} from './src/screens/QuizScreen';
import {ResultScreen} from './src/screens/ResultScreen';
import {NoNetworkScreen} from './src/screens/NoNetworkScreen';
import {quizzes} from './src/data/quizzes';
import {
  dummyDeviceId,
  dummySchool,
  dummyStudent,
} from './src/data/dummy';

function AppContent() {
  const {resolvedTheme} = useTheme();
  const {isConnected: networkConnected, recheck} = useNetworkStatus();
  const {
    brightness,
    brightnessPermissionGranted,
    volume,
    setBrightness,
    setVolume,
  } = useSystemSettings();
  const {
    available: kioskAvailable,
    mode: kioskMode,
    deviceOwner: kioskDeviceOwner,
    busy: kioskBusy,
    awaitingConfirmation: kioskAwaitingConfirmation,
    error: kioskError,
    enable: enableKiosk,
    disable: disableKiosk,
  } = useKioskMode();
  const {
    enabled: wifiEnabled,
    connected: wifiConnected,
    connectedSSID,
    locationPermissionGranted,
    locationServicesEnabled,
    networks,
    loading: wifiLoading,
    error: wifiError,
    refresh: refreshWifi,
    openWifiSettings,
    openLocationSettings,
  } = useWifiSettings();
  const isConnected = networkConnected;

  const [linked, setLinked] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [quizActive, setQuizActive] = useState(false);
  const [result, setResult] = useState<{score: number; total: number} | null>(null);
  const [timerSeconds, setTimerSeconds] = useState(60);

  const activeQuiz = quizzes[0];

  useEffect(() => {
    if (!quizActive || result) {
      return;
    }

    const timer = setInterval(() => {
      setTimerSeconds(seconds => (seconds > 0 ? seconds - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [quizActive, result]);

  const handleSync = () => {
    setIsSyncing(true);
    setSyncError(null);

    setTimeout(() => {
      setIsSyncing(false);
      setLinked(true);
    }, 1500);
  };

  const handleStartQuiz = () => {
    setResult(null);
    setTimerSeconds(60);
    setQuizActive(true);
  };

  const handleFinishQuiz = (score: number, total: number) => {
    setQuizActive(false);
    setResult({score, total});
  };

  const handleBackToDashboard = () => {
    setResult(null);
    setQuizActive(false);
  };

  const renderContent = () => {
    if (!isConnected) {
      return (
        <NoNetworkScreen
          onRetry={recheck}
          onOpenSettings={() => setSettingsOpen(true)}
        />
      );
    }

    if (!linked) {
      return (
        <LinkDeviceScreen
          deviceId={dummyDeviceId}
          isSyncing={isSyncing}
          error={syncError}
          onSync={handleSync}
        />
      );
    }

    if (result) {
      return (
        <ResultScreen
          score={result.score}
          total={result.total}
          onBackToDashboard={handleBackToDashboard}
        />
      );
    }

    if (quizActive) {
      return (
        <QuizScreen
          quiz={activeQuiz}
          onFinish={handleFinishQuiz}
        />
      );
    }

    return <WaitingScreen student={dummyStudent} onStartQuiz={handleStartQuiz} />;
  };

  return (
    <View className="flex-1 bg-background dark:bg-background-dark">
      <StatusBar
        barStyle={resolvedTheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      <AppShell
        student={linked ? dummyStudent : null}
        deviceId={dummyDeviceId}
        networkName={connectedSSID || 'Wi-Fi'}
        isConnected={isConnected}
        onOpenSettings={() => setSettingsOpen(true)}
        timerSeconds={timerSeconds}
        showTimer={quizActive && !result}
        schoolName={dummySchool.name}>
        {renderContent()}
      </AppShell>

      <SettingsDrawer
        visible={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        deviceId={dummyDeviceId}
        student={linked ? dummyStudent : null}
        volume={volume}
        onVolumeChange={setVolume}
        brightness={brightness}
        onBrightnessChange={setBrightness}
        brightnessPermissionGranted={brightnessPermissionGranted}
        wifiEnabled={wifiEnabled}
        wifiConnected={wifiConnected}
        connectedSSID={connectedSSID}
        locationPermissionGranted={locationPermissionGranted}
        locationServicesEnabled={locationServicesEnabled}
        networks={networks}
        kioskAvailable={kioskAvailable}
        kioskMode={kioskMode}
        kioskDeviceOwner={kioskDeviceOwner}
        kioskBusy={kioskBusy}
        kioskAwaitingConfirmation={kioskAwaitingConfirmation}
        kioskError={kioskError}
        onEnableKiosk={enableKiosk}
        onDisableKiosk={disableKiosk}
        wifiLoading={wifiLoading}
        wifiError={wifiError}
        onWifiRefresh={refreshWifi}
        onOpenWifiSettings={openWifiSettings}
        onOpenLocationSettings={openLocationSettings}
      />
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
