import { useEffect, useRef, useState } from 'react';
import { Animated, Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ZigZagCaptcha from '../components/ZigZagCaptcha';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useRouter } from 'expo-router';
import Toast from '../components/Toast';
import { LinearGradient } from 'expo-linear-gradient';

const QUOTES = [
  { text: "Pendidikan adalah senjata paling ampuh yang bisa kamu gunakan untuk mengubah dunia.", author: "Nelson Mandela" },
  { text: "Hiduplah seolah engkau mati besok. Belajarlah seolah engkau hidup selamanya.", author: "Mahatma Gandhi" },
  { text: "Pendidikan bukan sekadar mengisi wadah, tapi menyalakan api.", author: "William Butler Yeats" },
  { text: "Tujuan pendidikan itu untuk mempertajam kecerdasan dan memperkukuh karakter.", author: "Tan Malaka" },
  { text: "Satu anak, satu guru, satu buku, dan satu pena dapat mengubah dunia.", author: "Malala Yousafzai" },
  { text: "Akar pendidikan itu pahit, tapi buahnya manis.", author: "Aristoteles" },
  { text: "Pendidikan adalah tiket ke masa depan. Hari esok dimiliki oleh orang-orang yang mempersiapkannya sejak hari ini.", author: "Malcolm X" },
  { text: "Anak-anak harus diajari bagaimana cara berpikir, bukan apa yang harus dipikirkan.", author: "Margaret Mead" },
  { text: "Ing ngarso sung tulodo, ing madyo mangun karso, tut wuri handayani.", author: "Ki Hajar Dewantara" },
  { text: "Pendidikan adalah kemampuan untuk mendengarkan hampir semua hal tanpa kehilangan ketenanganmu atau rasa percaya dirimu.", author: "Robert Frost" }
];

export default function LoginScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const isMd = width > 768;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isHumanVerified, setIsHumanVerified] = useState(false);
  const [time, setTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  
  const [toast, setToast] = useState<{message: string, type: 'error' | 'success' | 'info'} | null>(null);

  const showToast = (message: string, type: 'error' | 'success' | 'info' = 'error') => {
    setToast({ message, type });
  };
  
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
      });
    }, 10000);

    return () => clearInterval(quoteInterval);
  }, [fadeAnim]);

  useEffect(() => {
    let currentText = '';
    setDisplayedText('');
    const fullText = `"${QUOTES[quoteIndex].text}"`;
    let i = 0;

    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        currentText += fullText.charAt(i);
        setDisplayedText(currentText);
        i++;
      } else {
        clearInterval(typingInterval);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }).start();
      }
    }, 40);

    return () => {
      clearInterval(typingInterval);
      fadeAnim.setValue(0);
    };
  }, [quoteIndex, fadeAnim]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');

  const handleLogin = async () => {
    if (!isHumanVerified) {
      showToast("Please verify you are human first.", 'error');
      return;
    }
    if (!email || !password) {
      showToast("Please enter both email and password.", 'error');
      return;
    }
    
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in with:", userCredential.user.email);
      router.replace('/home');
    } catch (error: any) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        try {
          const newUserCredential = await createUserWithEmailAndPassword(auth, email, password);
          console.log("Signed up with:", newUserCredential.user.email);
          router.replace('/home');
        } catch (signUpError: any) {
          if (signUpError.code === 'auth/email-already-in-use') {
            showToast("Invalid credentials or email already in use. Please check your password or try signing in with Google.", 'info');
          } else {
            console.error("Sign up error:", signUpError);
            showToast("Sign up failed: " + signUpError.message, 'error');
          }
        }
      } else {
        console.error("Login error:", error);
        showToast("Login failed: " + error.message, 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (Platform.OS === 'web') {
      setIsLoading(true);
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        console.log("Google logged in with:", result.user.email);
        router.replace('/home');
      } catch (error: any) {
        if (error.code === 'auth/account-exists-with-different-credential' || error.code === 'auth/email-already-in-use') {
          showToast("An account already exists with this email using a password. Please log in with Email & Password in the section below.", 'info');
        } else if (error.code !== 'auth/popup-closed-by-user') {
          console.error("Google login error:", error);
          showToast("Google Login Failed: " + error.message, 'error');
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      showToast("Google login for mobile requires additional native setup.", 'error');
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      showToast("Please enter your email address in the Email field first to reset your password.", 'info');
      return;
    }
    
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      showToast("Password reset email sent! Check your inbox.", 'success');
    } catch (error: any) {
      console.error("Forgot password error:", error);
      showToast("Error sending password reset: " + error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient colors={['rgba(148, 127, 245, 0.15)', '#FFFFFF']} start={{ x: 1, y: 0 }} end={{ x: 0, y: 1 }} style={{ flex: 1 }}>
      <SafeAreaView className="flex-1">
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onHide={() => setToast(null)} 
        />
      )}
      <KeyboardAvoidingView 
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView 
          className="flex-1"
          contentContainerClassName="grow justify-center"
          contentContainerStyle={{ 
            paddingHorizontal: isMd ? '8%' : 20, 
            paddingVertical: isMd ? 60 : 20,
            minHeight: Platform.OS === 'web' ? height : '100%'
          }}
        >
          <View 
            className={`w-full self-center relative ${isMd ? 'flex-row items-center justify-between' : 'flex-col justify-center'}`}
            style={{ maxWidth: 1600, flex: 1 }}
          >
            
            {/* Logo */}
            <View className={`flex-row items-center z-10 ${isMd ? 'absolute top-0 left-0' : 'mb-6 self-start'}`}>
              <Image source={require('../../assets/images/AChanLogo.webp')} style={{ width: isMd ? 80 : 50, height: isMd ? 80 : 50, borderRadius: isMd ? 40 : 25, marginRight: 16 }} resizeMode="contain" />
              <View className="justify-center">
                <Text className={`text-black mb-1 ${isMd ? 'text-[32px]' : 'text-[24px]'}`} style={{ fontFamily: 'GoogleSansFlex-36pt-Regular' }}>A-Chan</Text>
                <View className="h-[2px] bg-black w-full mb-1" />
                <Text className={`text-black ${isMd ? 'text-[16px]' : 'text-[12px]'}`} style={{ fontFamily: 'GoogleSansFlex-36pt-Regular' }}>All In One Education Platform</Text>
              </View>
            </View>

          {/* Left Column */}
            <View 
              className={`${isMd ? 'flex-1' : 'w-full'} justify-center ${!isMd ? 'bg-white/40 rounded-2xl p-3 border-[1px] border-white/60 mb-5' : ''}`} 
              style={isMd ? { paddingRight: '5%' } : {}}
            >
              <View className={isMd ? 'flex-col' : 'flex-row items-center mb-1'}>
                <View className="flex-row items-baseline">
                    <Text className={`text-[#FF0000] ${isMd ? 'text-[90px]' : 'text-[36px]'}`} style={{ fontFamily: 'GoogleSansFlex-9pt-Medium' }}>{hours[0]}</Text>
                    <Text className={`text-black ${isMd ? 'text-[90px]' : 'text-[36px]'}`} style={{ fontFamily: 'GoogleSansFlex-9pt-Medium' }}>{hours[1]}</Text>
                    <Text className={`text-black ${isMd ? 'text-[90px]' : 'text-[36px]'}`} style={{ fontFamily: 'GoogleSansFlex-9pt-Medium' }}>:</Text>
                    <Text className={`text-[#9978FF] ${isMd ? 'text-[90px]' : 'text-[36px]'}`} style={{ fontFamily: 'GoogleSansFlex-9pt-Medium' }}>{minutes[0]}</Text>
                    <Text className={`text-black ${isMd ? 'text-[90px]' : 'text-[36px]'}`} style={{ fontFamily: 'GoogleSansFlex-9pt-Medium' }}>{minutes[1]}</Text>
                </View>
                <View className={`flex-row items-center ${isMd ? 'mt-[5px]' : 'ml-4 flex-1'}`} style={isMd ? { width: 250 } : {}}>
                    <View className="h-[3px] bg-[#9580FF] flex-1" />
                    <View className="w-[15px] h-[15px] border-t-[3px] border-r-[3px] border-[#9580FF] -ml-[3px] mr-1" style={{ transform: [{ rotate: '45deg' }] }} />
                </View>
              </View>
                
                <View className={isMd ? 'mt-[30px]' : 'mt-1'} style={{ maxWidth: 450, minHeight: isMd ? 150 : 60 }}>
                  <Text className={`text-black ${isMd ? 'text-[18px] leading-[26px] mb-[10px]' : 'text-[13px] leading-[18px]'}`} style={{ fontFamily: 'Gilmer-Regular' }}>{displayedText}</Text>
                  <Animated.View style={{ opacity: fadeAnim }}>
                    <Text className={`text-[#666] ${isMd ? 'text-[16px]' : 'text-[11px] font-semibold mt-0.5'}`} style={{ fontFamily: 'Gilmer-Regular' }}>~ {QUOTES[quoteIndex].author}</Text>
                  </Animated.View>
                </View>
            </View>

            {/* Right Column */}
            <View className={`justify-center ${isMd ? 'items-end mt-0' : 'items-stretch w-full'}`} style={{ flex: 1.1 }}>
              <View className={`w-full mb-4 ${isMd ? 'items-end' : ''}`} style={{ maxWidth: 650 }}>
                <TouchableOpacity 
                  className={`flex-row items-center bg-[#7D93FF] rounded-2xl py-3 px-4 ${!isMd ? 'w-full justify-between' : 'justify-between min-w-[320px]'} ${isLoading ? 'opacity-50' : ''}`}
                  onPress={handleGoogleLogin}
                  disabled={isLoading}
                >
                  <Text className={`text-white pl-1 tracking-wide ${isMd ? 'text-[18px]' : 'text-[15px]'}`} style={{ fontFamily: 'GoogleSansFlex-36pt-Regular' }}>
                    {isLoading ? 'Authenticating...' : 'Sign-up or Sign-in With Google'}
                  </Text>
                  <View className="bg-white rounded-full justify-center items-center ml-2" style={{ width: 32, height: 32 }}>
                    <Image source={require('../../assets/images/Google.webp')} style={{ width: 18, height: 18 }} resizeMode="contain" />
                  </View>
                </TouchableOpacity>
              </View>

              <View className="w-full bg-[#907CFF] rounded-[24px] p-6 md:p-10" style={{ maxWidth: 650 }}>
                <View className="flex-row justify-between items-center mb-10">
                  <Text className={`text-white ${isMd ? 'text-[24px]' : 'text-[20px]'}`} style={{ fontFamily: 'GoogleSansFlex-36pt-Regular' }}>Or With Email</Text>
                  <View className="flex-row gap-1.5">
                    <View className="w-[5px] h-[30px] bg-white rounded-[3px]" />
                    <View className="w-[5px] h-[30px] bg-white rounded-[3px]" />
                    <View className="w-[5px] h-[30px] bg-white rounded-[3px]" />
                  </View>
                </View>

                <Text className={`text-white mb-2 ${isMd ? 'text-[18px]' : 'text-[15px]'}`} style={{ fontFamily: 'GoogleSansFlex-36pt-Regular' }}>Email</Text>
                <TextInput
                  className={`border-b-[1px] border-white text-white pt-3 pb-1 mb-8 ${isMd ? 'text-[18px]' : 'text-[15px]'}`}
                  style={[{ fontFamily: 'GoogleSansFlex-36pt-Regular' }, Platform.OS === 'web' && { outlineStyle: 'none' }] as any}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <View className="flex-row justify-between items-end">
                  <Text className={`text-white mb-2 ${isMd ? 'text-[18px]' : 'text-[15px]'}`} style={{ fontFamily: 'GoogleSansFlex-36pt-Regular' }}>Password</Text>
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons 
                      name={showPassword ? "eye-outline" : "eye-off-outline"} 
                      size={28} 
                      color="#FFF" 
                      className="mb-2" 
                    />
                  </TouchableOpacity>
                </View>
                <TextInput
                  className={`border-b-[1px] border-white text-white pt-3 pb-1 mb-8 ${isMd ? 'text-[18px]' : 'text-[15px]'}`}
                  style={[{ fontFamily: 'GoogleSansFlex-36pt-Regular' }, Platform.OS === 'web' && { outlineStyle: 'none' }] as any}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />

                <TouchableOpacity onPress={handleForgotPassword} className="self-end mb-5 -mt-5">
                  <Text className="text-white text-[14px] underline" style={{ fontFamily: 'Gilmer-Regular' }}>Forgot Password?</Text>
                </TouchableOpacity>

                <View className={`mt-5 w-full ${!isMd ? 'flex-col gap-3' : 'flex-row justify-between items-center flex-wrap gap-4'}`}>
                  <View className={!isMd ? 'w-full' : ''}>
                    <ZigZagCaptcha onVerify={(success) => setIsHumanVerified(success)} />
                  </View>

                  <TouchableOpacity 
                    className={`bg-[#41CDDC] flex-row items-center justify-center py-4 px-6 rounded-xl ${!isMd ? 'w-full' : 'min-w-[200px]'} ${(!isHumanVerified || isLoading) ? 'opacity-50' : ''}`}
                    style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 3, elevation: 3 }}
                    onPress={handleLogin}
                    disabled={!isHumanVerified || isLoading}
                  >
                    <Text className={`text-white font-bold tracking-wide ${isMd ? 'text-[18px]' : 'text-[16px]'}`} style={{ fontFamily: 'GoogleSansFlex-36pt-Regular' }}>
                      {isLoading ? 'Authenticating...' : 'Authenticate'}
                    </Text>
                    {!isLoading && (
                      <Ionicons name="arrow-forward" size={18} color="#FFF" style={{ marginLeft: 8, marginTop: 2 }} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            </View>
        </ScrollView>
      </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}
