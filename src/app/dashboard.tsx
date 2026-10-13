import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';

export default function DashboardScreen() {
  const router = useRouter();

  // Pomodoro Focus Timer State
  const [timerRunning, setTimerRunning] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(25 * 60);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            setTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning]);

  const toggleTimer = () => {
    if (secondsRemaining === 0) {
      setSecondsRemaining(25 * 60);
      setTimerRunning(true);
    } else {
      setTimerRunning((prev) => !prev);
    }
  };

  const timerMinutes = Math.floor(secondsRemaining / 60)
    .toString()
    .padStart(2, '0');
  const timerSeconds = (secondsRemaining % 60).toString().padStart(2, '0');

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const userDisplayName =
    auth.currentUser?.displayName ||
    (auth.currentUser?.email ? auth.currentUser.email.split('@')[0] : 'Rian');

  return (
    <SafeAreaView className="flex-1 bg-[#FCF8FF]">
      {/* ── Top Header Navigation Bar ────────────────────────────────────────── */}
      <View className="h-16 px-4 bg-[#FCF8FF]/95 border-b border-[#E3E0F8]/50 flex-row items-center justify-between z-20">
        <View className="flex-row items-center flex-1 mr-2">
          <Image
            source={require('../../assets/images/AChanLogo.webp')}
            style={{ width: 34, height: 34, borderRadius: 17 }}
            resizeMode="contain"
          />
          <View className="ml-2.5 justify-center flex-1">
            <View className="flex-row items-center">
              <Text
                className="text-[#5849C0] text-[17px] font-bold leading-tight"
                style={{ fontFamily: 'GoogleSansFlex-36pt-Regular' }}
              >
                A-Chan
              </Text>
              <Text className="text-[#474553] text-[11px] ml-1.5 font-medium">
                • Beranda
              </Text>
            </View>
            <Text className="text-[#787584] text-[10px] leading-tight mt-0.5">
              All In One Education Platform
            </Text>
          </View>
        </View>

        {/* Profile Avatar / Logout Trigger */}
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Sign Out',
              `Logged in as ${auth.currentUser?.email || userDisplayName}.\nDo you want to log out?`,
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Log Out', style: 'destructive', onPress: handleLogout },
              ]
            );
          }}
          className="flex-row items-center bg-[#E4DFFF] px-3 py-1.5 rounded-full"
        >
          <View className="w-6 h-6 rounded-full bg-[#5849C0] items-center justify-center mr-1.5">
            <Text className="text-white text-[11px] font-bold">
              {userDisplayName.charAt(0).toUpperCase()}
            </Text>
          </View>
          <Ionicons name="log-out-outline" size={16} color="#5849C0" />
        </TouchableOpacity>
      </View>

      {/* ── Main Scrollable Body ────────────────────────────────────────────── */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 90,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Student Greeting & Daily Motivation Card */}
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-1 mr-2">
            <View className="flex-row items-center">
              <Text
                className="text-[#1A1A2B] text-[22px] font-bold"
                style={{ fontFamily: 'GoogleSansFlex-36pt-Regular' }}
              >
                Halo, {userDisplayName}!
              </Text>
              <Text className="text-[20px] ml-1.5">👋</Text>
            </View>
            <Text
              className="text-[#474553] text-[13px] mt-0.5"
              style={{ fontFamily: 'Gilmer-Regular' }}
            >
              Yuk lanjutkan progres belajarmu hari ini!
            </Text>
          </View>

          {/* Streak Pill */}
          <View className="flex-row items-center bg-[#6EF6FB] px-3 py-1.5 rounded-full shadow-sm">
            <Text className="text-[14px] mr-1">🔥</Text>
            <Text
              className="text-[#002021] text-[13px] font-bold"
              style={{ fontFamily: 'GoogleSansFlex-36pt-Regular' }}
            >
              7 Hari
            </Text>
          </View>
        </View>

        {/* Motivation Banner Box with Mandela Quote & Mascot Cue */}
        <LinearGradient
          colors={['#5849C0', '#7163DB', '#594DB3']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="rounded-2xl p-5 mb-5 relative overflow-hidden shadow-lg"
          style={{ shadowColor: '#5849C0', shadowOpacity: 0.25, shadowRadius: 10, elevation: 6 }}
        >
          {/* Ambient Glow Circles */}
          <View
            className="absolute -right-8 -bottom-10 w-36 h-36 rounded-full bg-[#6EF6FB]/20 pointer-events-none"
            style={{ borderRadius: 72 }}
          />
          <View
            className="absolute right-4 top-2 w-14 h-14 rounded-full bg-white/10 pointer-events-none"
            style={{ borderRadius: 28 }}
          />

          <View className="z-10">
            {/* Header Pills Row */}
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center bg-white/20 px-2.5 py-1 rounded-full">
                <Ionicons name="sparkles" size={13} color="#6EF6FB" />
                <Text
                  className="text-white text-[10px] font-semibold tracking-wider uppercase ml-1.5"
                  style={{ fontFamily: 'GoogleSansFlex-36pt-Regular' }}
                >
                  Pesan Motivasi Hari Ini
                </Text>
              </View>

              <View className="flex-row items-center bg-white/15 px-2.5 py-1 rounded-full">
                <View className="w-1.5 h-1.5 rounded-full bg-[#6EF6FB] mr-1.5" />
                <Text className="text-white/90 text-[10px] font-medium">
                  Target 85% tercapai
                </Text>
              </View>
            </View>

            {/* Quote Body */}
            <Text
              className="text-white/95 text-[15px] italic font-medium leading-[22px] mb-3"
              style={{ fontFamily: 'Gilmer-Regular' }}
            >
              “Pendidikan adalah senjata paling ampuh yang bisa kamu gunakan untuk mengubah dunia.”
            </Text>

            {/* Meta Row: Author & Session Tag */}
            <View className="flex-row items-center justify-between pt-2.5 border-t border-white/20">
              <Text
                className="text-[#6EF6FB] text-[13px] font-bold tracking-wide"
                style={{ fontFamily: 'GoogleSansFlex-36pt-Regular' }}
              >
                ~ Nelson Mandela
              </Text>
              <View className="flex-row items-center bg-white/10 px-2.5 py-0.5 rounded-full">
                <Ionicons name="bulb-outline" size={13} color="#4BDADF" />
                <Text className="text-white/90 text-[11px] font-medium ml-1">
                  Fokus Pagi
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* 2. Study Timer & Live Activity Widget */}
        <View
          className="bg-white rounded-2xl p-4 mb-5 border border-[#E3E0F8]/60 shadow-sm"
          style={{ shadowColor: '#5849C0', shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 }}
        >
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center">
              <View className="w-9 h-9 rounded-xl bg-[#EFECFF] items-center justify-center mr-2.5">
                <Ionicons name="timer-outline" size={20} color="#5849C0" />
              </View>
              <View>
                <Text
                  className="text-[#1A1A2B] text-[15px] font-bold"
                  style={{ fontFamily: 'GoogleSansFlex-36pt-Regular' }}
                >
                  A-Chan Focus Timer
                </Text>
                <Text className="text-[#474553] text-[11px]">
                  Metode Pomodoro 25 Menit Belajar
                </Text>
              </View>
            </View>

            <View className="flex-row items-center bg-[#EFECFF] px-2.5 py-1 rounded-full">
              <View
                className={`w-2 h-2 rounded-full mr-1.5 ${
                  timerRunning ? 'bg-[#00696C]' : 'bg-[#787584]'
                }`}
              />
              <Text className="text-[#00696C] text-[11px] font-semibold">
                {timerRunning ? 'Aktif' : 'Standby'}
              </Text>
            </View>
          </View>

          {/* Live Digits Display */}
          <View className="flex-row items-center justify-center py-3 bg-[#F5F2FF] rounded-xl mb-3">
            <View className="flex-row items-baseline">
              <Text
                className="text-[#BA1A1A] text-[34px] font-extrabold"
                style={{ fontFamily: 'GoogleSansFlex-9pt-Medium' }}
              >
                {timerMinutes}
              </Text>
              <Text
                className="text-[#474553] text-[34px] font-extrabold mx-1"
                style={{ fontFamily: 'GoogleSansFlex-9pt-Medium' }}
              >
                :
              </Text>
              <Text
                className="text-[#5849C0] text-[34px] font-extrabold"
                style={{ fontFamily: 'GoogleSansFlex-9pt-Medium' }}
              >
                {timerSeconds}
              </Text>
            </View>

            <View className="ml-5 border-l border-[#E3E0F8] pl-4">
              <Text
                className="text-[#1A1A2B] text-[11px] font-bold uppercase tracking-wider"
                style={{ fontFamily: 'GoogleSansFlex-36pt-Regular' }}
              >
                Sesi #1
              </Text>
              <Text className="text-[#474553] text-[11px]">
                Saintek Kalkulus
              </Text>
            </View>
          </View>

          {/* Toggle Timer CTA */}
          <TouchableOpacity
            onPress={toggleTimer}
            className="w-full py-3 px-5 rounded-full bg-[#6EF6FB] flex-row items-center justify-center shadow-md active:opacity-90"
            style={{ shadowColor: '#42D3D8', shadowOpacity: 0.35, shadowRadius: 8, elevation: 4 }}
          >
            <Ionicons
              name={timerRunning ? 'pause' : 'play'}
              size={18}
              color="#002021"
            />
            <Text
              className="text-[#002021] text-[14px] font-bold ml-1.5"
              style={{ fontFamily: 'GoogleSansFlex-36pt-Regular' }}
            >
              {timerRunning
                ? 'Jeda Sesi'
                : secondsRemaining === 0
                ? 'Mulai Ulang Sesi'
                : 'Mulai Sesi Belajar'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* 3. Lanjutkan Belajar (In-Progress Courses) */}
        <View className="mb-4">
          <View className="flex-row items-center justify-between mb-3">
            <View>
              <Text
                className="text-[#1A1A2B] text-[17px] font-bold"
                style={{ fontFamily: 'GoogleSansFlex-36pt-Regular' }}
              >
                Lanjutkan Belajar
              </Text>
              <Text className="text-[#474553] text-[11px]">
                Selesaikan materi yang sedang berjalan
              </Text>
            </View>
            <TouchableOpacity>
              <Text
                className="text-[#5849C0] text-[12px] font-bold"
                style={{ fontFamily: 'GoogleSansFlex-36pt-Regular' }}
              >
                Lihat Silabus
              </Text>
            </TouchableOpacity>
          </View>

          {/* Course Card 1 */}
          <View
            className="bg-white rounded-2xl p-4 mb-3 border border-[#E3E0F8]/50 shadow-sm"
            style={{ shadowColor: '#5849C0', shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 }}
          >
            <View className="flex-row items-start justify-between mb-2.5">
              <View className="flex-row items-center flex-1 mr-2">
                <View className="w-11 h-11 rounded-xl bg-[#5849C0]/10 items-center justify-center mr-3">
                  <Ionicons name="calculator-outline" size={22} color="#5849C0" />
                </View>
                <View className="flex-1">
                  <Text className="text-[#5849C0] text-[10px] font-semibold uppercase tracking-wider">
                    Saintek • Modul 4/12
                  </Text>
                  <Text
                    className="text-[#1A1A2B] text-[14px] font-bold truncate mt-0.5"
                    style={{ fontFamily: 'GoogleSansFlex-36pt-Regular' }}
                  >
                    Matematika: Kalkulus Dasar
                  </Text>
                  <Text className="text-[#474553] text-[12px] truncate mt-0.5">
                    Integral Tak Wajar & Aplikasi Luas Daerah
                  </Text>
                </View>
              </View>

              <View className="bg-[#E8E6FE] px-2 py-0.5 rounded-lg">
                <Text className="text-[#00696C] text-[11px] font-bold">
                  65%
                </Text>
              </View>
            </View>

            {/* Custom Progress Track */}
            <View className="w-full bg-[#E3E0F8] h-2 rounded-full overflow-hidden mb-3">
              <View className="bg-[#6EF6FB] h-full rounded-full" style={{ width: '65%' }} />
            </View>

            <View className="flex-row items-center justify-between pt-1">
              <View className="flex-row items-center text-[#474553]">
                <Ionicons name="time-outline" size={14} color="#787584" />
                <Text className="text-[#787584] text-[11px] ml-1">
                  Sisa 18 menit materi
                </Text>
              </View>

              <TouchableOpacity
                className="bg-[#5849C0] px-3.5 py-1.5 rounded-full flex-row items-center shadow-sm"
              >
                <Text
                  className="text-white text-[12px] font-medium mr-1"
                  style={{ fontFamily: 'GoogleSansFlex-36pt-Regular' }}
                >
                  Lanjutkan
                </Text>
                <Ionicons name="arrow-forward" size={14} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Course Card 2 */}
          <View
            className="bg-white rounded-2xl p-4 border border-[#E3E0F8]/50 shadow-sm"
            style={{ shadowColor: '#5849C0', shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 }}
          >
            <View className="flex-row items-start justify-between mb-2.5">
              <View className="flex-row items-center flex-1 mr-2">
                <View className="w-11 h-11 rounded-xl bg-[#6AF3F8]/20 items-center justify-center mr-3">
                  <Ionicons name="headset-outline" size={22} color="#00696C" />
                </View>
                <View className="flex-1">
                  <Text className="text-[#00696C] text-[10px] font-semibold uppercase tracking-wider">
                    Bahasa • Sesi 2
                  </Text>
                  <Text
                    className="text-[#1A1A2B] text-[14px] font-bold truncate mt-0.5"
                    style={{ fontFamily: 'GoogleSansFlex-36pt-Regular' }}
                  >
                    TOEFL Prep: Listening
                  </Text>
                  <Text className="text-[#474553] text-[12px] truncate mt-0.5">
                    Part C: Academic Lecture Comprehension
                  </Text>
                </View>
              </View>

              <View className="bg-[#E8E6FE] px-2 py-0.5 rounded-lg">
                <Text className="text-[#5849C0] text-[11px] font-bold">
                  40%
                </Text>
              </View>
            </View>

            {/* Custom Progress Track */}
            <View className="w-full bg-[#E3E0F8] h-2 rounded-full overflow-hidden mb-3">
              <View className="bg-[#5849C0] h-full rounded-full" style={{ width: '40%' }} />
            </View>

            <View className="flex-row items-center justify-between pt-1">
              <View className="flex-row items-center text-[#474553]">
                <Ionicons name="mic-outline" size={14} color="#787584" />
                <Text className="text-[#787584] text-[11px] ml-1">
                  Audio Interaktif
                </Text>
              </View>

              <TouchableOpacity
                className="bg-[#EFECFF] px-3.5 py-1.5 rounded-full flex-row items-center"
              >
                <Text
                  className="text-[#5849C0] text-[12px] font-medium mr-1"
                  style={{ fontFamily: 'GoogleSansFlex-36pt-Regular' }}
                >
                  Lanjutkan
                </Text>
                <Ionicons name="arrow-forward" size={14} color="#5849C0" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* ── Fixed Bottom Navigation Bar ──────────────────────────────────────── */}
      <View className="absolute bottom-0 left-0 right-0 h-16 bg-white/95 border-t border-[#E3E0F8]/60 flex-row justify-around items-center px-2 z-30 shadow-lg">
        <TouchableOpacity className="items-center justify-center py-1">
          <Ionicons name="home" size={22} color="#5849C0" />
          <Text
            className="text-[#5849C0] text-[11px] font-bold mt-0.5"
            style={{ fontFamily: 'GoogleSansFlex-36pt-Regular' }}
          >
            Beranda
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center justify-center py-1">
          <Ionicons name="book-outline" size={22} color="#474553" />
          <Text className="text-[#474553] text-[11px] font-medium mt-0.5">
            Belajar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center justify-center py-1">
          <Ionicons name="document-text-outline" size={22} color="#474553" />
          <Text className="text-[#474553] text-[11px] font-medium mt-0.5">
            Tugas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Profil & Akun',
              `User Email: ${auth.currentUser?.email || 'N/A'}\nUser ID: ${auth.currentUser?.uid || 'N/A'}`,
              [
                { text: 'Close', style: 'cancel' },
                { text: 'Sign Out', style: 'destructive', onPress: handleLogout },
              ]
            );
          }}
          className="items-center justify-center py-1"
        >
          <Ionicons name="person-outline" size={22} color="#474553" />
          <Text className="text-[#474553] text-[11px] font-medium mt-0.5">
            Profil
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
