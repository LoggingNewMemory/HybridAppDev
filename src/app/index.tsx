import { router } from "expo-router";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-[#e4e8fb] flex-col px-5 pt-3 pb-6">
      <View className="flex-row items-center justify-between mb-5">
        <View className="flex-row items-center gap-3.5">
          <View className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-sm ring-2 ring-brand-card/20 flex-shrink-0 bg-white">
            <Image
              source={{ uri: "https://avatars.githubusercontent.com/u/83739103?v=4" }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>

          <View>
            <View className="relative self-start">
              <Text className="text-2xl font-bold tracking-tight text-slate-900 leading-tight">
                A-Chan
              </Text>

              <View className="h-[2px] w-full bg-slate-900 rounded-full mt-0.5">
              </View>
              <Text className="text-[12px] font-medium text-slate-700 leading-none mt-1">
                All In One Education Platform
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View className="mb-5" data-purpose="clock-and-quote">
        <View className="bg-white/40 backdrop-blur-sm rounded-2xl p-4 border border-white/60">
          <View className="flex-row items-center space-x-3 mb-2">

            <Text className="font-bold tracking-tight text-3xl flex items-baseline">
              <Text className="text-[#ff2222]">1</Text>
              <Text className="text-slate-900">3</Text>
              <Text className="text-slate-900">:</Text>
              <Text className="text-[#9682f6]">2</Text>
              <Text className="text-slate-900">1</Text>
            </Text>

            <View className="flex-1 flex-row items-center pl-2">
              <View className="h-[2px] flex-1 bg-[#9682f6] rounded-full" />
            </View>
          </View>

          <Text className="text-[13px] text-slate-800 leading-snug font-normal">
            “Pendidikan adalah senjata paling ampuh yang bisa kamu gunakan untuk mengubah dunia”
          </Text>

          <Text className="text-xs font-semibold text-slate-600 mt-1">
            ~ Nelson Mandela
          </Text>
        </View>
      </View>
      
    <View className="w-full bg-[#8370ed] rounded-3xl shadow-xl relative overflow-hidden flex-1 flex-col justify-between mb-5 p-7">

        <View className="flex-row justify-between mb-6">
          <Text className="text-xl font-semibold tracking-tight text-white/95">
          Login / Register
          </Text>

          <View className="flex-row items-center gap-1.5 opacity-90">
            <View className="w-[5px] h-6 bg-white rounded-full" />
            <View className="w-[5px] h-6 bg-white rounded-full" />
            <View className="w-[5px] h-6 bg-white rounded-full" />
          </View>
        </View>

      <View className="gap-4 flex-1 flex-col mt-8">

        <View className="gap-2">
                    <Text className="text-white/90 text-xs font-semibold uppercase tracking-wider pl-0.5">
            Email Address
          </Text>
          <View className="relative">
                        <TextInput
              placeholder="nama@sekolah.sch.id"
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
              keyboardType="email-address"
              autoCapitalize="none"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-base text-white"
            />
          </View>
        </View>
        <View className="space-y-2 pt-1 gap-2">
                   <Text className="text-white/90 text-xs font-semibold uppercase tracking-wider pl-0.5">
          Password
        </Text>
        <View className="relative">
                    <TextInput
            placeholder="••••••••"
            placeholderTextColor="rgba(255, 255, 255, 0.4)"
            secureTextEntry={true}
            autoCapitalize="none"
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 pr-12 text-base text-white"
            />
        </View>
        </View>
        
        <View className="pt-2 gap-4"> 
        <TouchableOpacity 
          activeOpacity={0.7}
          className="w-full bg-[#41cddc] py-4 px-6 rounded-xl shadow-md flex-row items-center justify-center gap-2"
          onPress={() => router.push('/homepage')}
        >
          <Text className="text-white font-bold text-base tracking-wide">
            Authenticate
          </Text>
        </TouchableOpacity>
        </View>
      </View>

      </View>
        
    </SafeAreaView>
  );
}
