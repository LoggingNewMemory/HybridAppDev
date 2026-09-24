import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ZigZagCaptcha from '../components/ZigZagCaptcha';

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

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [time, setTime] = useState(new Date());
  
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current; // Start hidden

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
      });
    }, 10000); // 10 seconds

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

  const handleLogin = () => {
    // Handle login
    console.log("Login with", email, password);
  };

  const handleGoogleLogin = () => {
    // Handle Google login
    console.log("Google login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.mainLayout}>
            
            {/* Left Column */}
            <View style={styles.leftColumn}>
              <View style={styles.logoContainer}>
                <Image source={require('../../assets/images/AChanLogo.webp')} style={styles.logo} resizeMode="contain" />
                <View style={styles.logoTextContainer}>
                  <Text style={styles.brandName}>A-Chan</Text>
                  <View style={styles.divider} />
                  <Text style={styles.tagline}>All In One Education Platform</Text>
                </View>
              </View>

              <View style={styles.clockSection}>
                <View style={styles.clockContainer}>
                  <Text style={[styles.clockDigit, styles.clockRed]}>{hours[0]}</Text>
                  <Text style={styles.clockDigit}>{hours[1]}</Text>
                  <Text style={styles.clockDigit}>:</Text>
                  <Text style={[styles.clockDigit, styles.clockPurple]}>{minutes[0]}</Text>
                  <Text style={styles.clockDigit}>{minutes[1]}</Text>
                </View>
                <View style={styles.arrowContainer}>
                  <View style={styles.arrowLine} />
                  <View style={styles.arrowHead} />
                </View>
                
                <View style={styles.quoteContainer}>
                  <Text style={styles.quoteText}>{displayedText}</Text>
                  <Animated.View style={{ opacity: fadeAnim }}>
                    <Text style={styles.quoteAuthor}>~ {QUOTES[quoteIndex].author}</Text>
                  </Animated.View>
                </View>
              </View>
            </View>

            {/* Right Column */}
            <View style={styles.rightColumn}>
              <View style={styles.googleBtnWrapper}>
                <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
                  <Text style={styles.googleButtonText}>Sign-up or Sign-in With Google</Text>
                  <View style={styles.googleIconContainer}>
                    <Image source={require('../../assets/images/Google.webp')} style={styles.googleIcon} resizeMode="contain" />
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.loginCard}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>Or With Email</Text>
                  <View style={styles.hamburgerMenu}>
                    <View style={styles.hamburgerLine} />
                    <View style={styles.hamburgerLine} />
                    <View style={styles.hamburgerLine} />
                  </View>
                </View>

                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <View style={styles.passwordHeader}>
                  <Text style={styles.inputLabel}>Password</Text>
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons 
                      name={showPassword ? "eye-outline" : "eye-off-outline"} 
                      size={28} 
                      color="#FFF" 
                      style={styles.eyeIcon} 
                    />
                  </TouchableOpacity>
                </View>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />

                <View style={styles.bottomCardSection}>
                  <ZigZagCaptcha onVerify={(token) => console.log('Verified:', token)} />

                  <TouchableOpacity style={styles.authButton} onPress={handleLogin}>
                    <Text style={styles.authButtonText}>Authenticate</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E4FA', // Very light purple
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: width > 768 ? '8%' : 20,
    paddingVertical: width > 768 ? 60 : 20,
    justifyContent: 'center',
  },
  mainLayout: {
    flexDirection: width > 768 ? 'row' : 'column',
    justifyContent: 'space-between',
    flex: 1,
    width: '100%',
    maxWidth: 1600,
    alignSelf: 'center',
  },
  leftColumn: {
    flex: 1,
    justifyContent: 'space-between',
    paddingRight: width > 768 ? '5%' : 0,
    minHeight: width > 768 ? '100%' : 400,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  logoTextContainer: {
    justifyContent: 'center',
  },
  brandName: {
    fontFamily: 'GoogleSansFlex-36pt-Regular',
    fontSize: 32,
    color: '#000',
    marginBottom: 4,
  },
  divider: {
    height: 2,
    backgroundColor: '#000',
    width: '100%',
    marginBottom: 4,
  },
  tagline: {
    fontFamily: 'GoogleSansFlex-36pt-Regular',
    fontSize: 16,
    color: '#000',
  },
  clockSection: {
    justifyContent: 'center',
    flex: 1,
  },
  clockContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  clockDigit: {
    fontFamily: 'GoogleSansFlex-9pt-Medium',
    fontSize: 90,
    color: '#000',
  },
  clockRed: {
    color: '#FF0000',
  },
  clockPurple: {
    color: '#9978FF',
  },
  arrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    width: 250, // Matches width of clock approximately
  },
  arrowLine: {
    height: 3,
    backgroundColor: '#9580FF',
    flex: 1,
  },
  arrowHead: {
    width: 15,
    height: 15,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: '#9580FF',
    transform: [{ rotate: '45deg' }],
    marginLeft: -3,
  },
  quoteContainer: {
    marginTop: 30,
    maxWidth: 450,
    height: 150, // Fixed height prevents layout shifting while typing
  },
  quoteText: {
    fontFamily: 'Gilmer-Regular',
    fontSize: 18,
    color: '#000',
    lineHeight: 26,
    marginBottom: 10,
  },
  quoteAuthor: {
    fontFamily: 'Gilmer-Regular',
    fontSize: 16,
    color: '#666',
  },
  rightColumn: {
    flex: 1.4,
    justifyContent: 'center',
    alignItems: width > 768 ? 'flex-end' : 'stretch',
    marginTop: width > 768 ? 0 : 40,
  },
  googleBtnWrapper: {
    width: '100%',
    maxWidth: 650, // aligns with max width of card if added
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#9FBFFC', // Light blue matching design
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  googleButtonText: {
    fontFamily: 'GoogleSansFlex-36pt-Regular',
    color: '#FFF',
    fontSize: 18,
    marginRight: 16,
  },
  googleIconContainer: {
    backgroundColor: '#357AE8', // Darker blue for circle
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleIcon: {
    width: 24,
    height: 24,
  },
  loginCard: {
    width: '100%',
    maxWidth: 650,
    backgroundColor: '#907CFF', // Purple card
    borderRadius: 24,
    padding: 40,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  cardTitle: {
    fontFamily: 'GoogleSansFlex-36pt-Regular',
    color: '#FFF',
    fontSize: 24,
  },
  hamburgerMenu: {
    flexDirection: 'row',
    gap: 6,
  },
  hamburgerLine: {
    width: 5,
    height: 30,
    backgroundColor: '#FFF',
    borderRadius: 3,
  },
  inputLabel: {
    fontFamily: 'GoogleSansFlex-36pt-Regular',
    color: '#FFF',
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    fontFamily: 'GoogleSansFlex-36pt-Regular',
    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
    color: '#FFF',
    fontSize: 18,
    paddingTop: 12,
    paddingBottom: 4,
    marginBottom: 32,
    ...(Platform.OS === 'web' && { outlineStyle: 'none' }),
  } as any,
  passwordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  eyeIcon: {
    color: '#FFF',
    marginBottom: 8,
  },
  bottomCardSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    flexWrap: 'wrap',
    gap: 16,
  },
  captchaBox: {
    backgroundColor: '#FFF',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 4,
  },
  captchaText: {
    color: '#000',
    fontSize: 16,
  },
  authButton: {
    backgroundColor: '#4DD0E1', // Teal/Cyan
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 30,
  },
  authButtonText: {
    fontFamily: 'GoogleSansFlex-36pt-Regular',
    color: '#FFF',
    fontSize: 18,
  },
});
