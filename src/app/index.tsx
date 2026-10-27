import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-[#e4e8fb] flex-col px-5 pt-3 pb-6">

      {/* <header class="flex items-center justify-between mb-5" data-purpose="brand-header"> */}
      <View className="flex-row items-center justify-between mb-5">

        {/* <div class="flex items-center space-x-3.5"> */}
        <View className="flex-row items-center gap-3.5">

          {/*<div class="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-sm ring-2 ring-brand-card/20 flex-shrink-0 bg-white"> */}
          <View className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-sm ring-2 ring-brand-card/20 flex-shrink-0 bg-white">

            {/*<img alt="A-Chan  Mascot" class="w-full h-full object-cover object-top scale-[2.2] translate-y-2 -translate-x-1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3A6Jqo6U0vOmNOHiWSa0f_wyQV7M6lOzE_8XRsbSBsMFlZGmEZaENR5irBXtTxyvYutlAXylxfddLAkF8zXQwsWWZr0tz_TUm3dIPFiGe2k6nCP9fFcH5rt5iGt9dyjO4RYQdk0NvgWNpYSpVtCLUt-9Ea8ycHGs3wl5SqwZOUIyDP-ZyjIrF9NeNeNfL3p_gqE_mu5xngO3ipIlgcmvN-DHO7-OOxplu6dl1IEvCNeskZ0CFVZh5M0NBmWosVdAc5Q">*/}
            <Image
              source={{ uri: "https://avatars.githubusercontent.com/u/83739103?v=4" }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>

          <View>
            {/*<div class="relative inline-block">*/}
            <View className="relative self-start">
              {/*<h1 class="text-2xl font-bold tracking-tight text-slate-900 leading-tight">A-Chan</h1>*/}
              <Text className="text-2xl font-bold tracking-tight text-slate-900 leading-tight">
                A-Chan
              </Text>

              {/*<div class="h-[2px] w-full bg-slate-900 rounded-full mt-0.5"></div> */}
              <View className="h-[2px] w-full bg-slate-900 rounded-full mt-0.5">
              </View>

              {/*<p class="text-[12px] font-medium text-slate-700 leading-none mt-1">All In One Education Platform</p> */}
              <Text className="text-[12px] font-medium text-slate-700 leading-none mt-1">
                All In One Education Platform
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* {/* Clock and Quote
      Original: 
      <div class="mb-5" data-purpose="clock-and-quote">
      <div class="bg-white/40 backdrop-blur-sm rounded-2xl p-4 border border-white/60">
      <div class="flex items-center space-x-3 mb-2">
      <div class="font-bold tracking-tight text-3xl flex items-baseline">
      <span class="text-[#ff2222]">1</span>
      <span class="text-slate-900">3</span>
      <span class="text-slate-900 mx-0.5">:
      </span><span class="text-[#9682f6]">2
      </span><span class="text-slate-900">1
      </span></div><div class="flex-1 flex items-center pl-2">
      <div class="h-[2px] w-full bg-[#9682f6] rounded-full">
      </div>
      <svg class="w-4 h-4 text-[#9682f6] -ml-1.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path clip-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" fill-rule="evenodd">
      </path>
      </svg>
      </div>
      </div>
      <blockquote class="text-[13px] text-slate-800 leading-snug font-normal">
      “Pendidikan adalah senjata paling ampuh yang bisa kamu gunakan untuk mengubah dunia”
      <cite class="block not-italic text-xs font-semibold text-slate-600 mt-1">
      ~ Nelson Mandela</cite></blockquote></div></div> */}

      {/* <div class="mb-5" data-purpose="clock-and-quote"> */}
      {/* <div class="bg-white/40 backdrop-blur-sm rounded-2xl p-4 border border-white/60"> */}
      {/* <div class="flex items-center space-x-3 mb-2"> */}

      <View className="mb-5" data-purpose="clock-and-quote">
        <View className="bg-white/40 backdrop-blur-sm rounded-2xl p-4 border border-white/60">
          <View className="flex-row items-center space-x-3 mb-2">

            {/*
      <div class="font-bold tracking-tight text-3xl flex items-baseline"> 
      <span class="text-[#ff2222]">1</span>
      <span class="text-slate-900">3</span>
      <span class="text-slate-900 mx-0.5">:
      </span><span class="text-[#9682f6]">2
      </span><span class="text-slate-900">1 
      */}
            <Text className="font-bold tracking-tight text-3xl flex items-baseline">
              <Text className="text-[#ff2222]">1</Text>
              <Text className="text-slate-900">3</Text>
              <Text className="text-slate-900">:</Text>
              <Text className="text-[#9682f6]">2</Text>
              <Text className="text-slate-900">1</Text>
            </Text>
            {/* </span></div><div class="flex-1 flex items-center pl-2">
      <div class="h-[2px] w-full bg-[#9682f6] rounded-full"></div> */}
            <View className="flex-1 flex-row items-center pl-2">
              <View className="h-[2px] flex-1 bg-[#9682f6] rounded-full" />
            </View>
          </View>

          {/* <blockquote class="text-[13px] text-slate-800 leading-snug font-normal">
      “Pendidikan adalah senjata paling ampuh yang bisa kamu gunakan untuk mengubah dunia” */}
          <Text className="text-[13px] text-slate-800 leading-snug font-normal">
            “Pendidikan adalah senjata paling ampuh yang bisa kamu gunakan untuk mengubah dunia”
          </Text>

          {/* cite class="block not-italic text-xs font-semibold text-slate-600 mt-1">
      ~ Nelson Mandela</cite></blockquote></div></div> */}

          <Text className="text-xs font-semibold text-slate-600 mt-1">
            ~ Nelson Mandela
          </Text>
        </View>
      </View>
      
    <View className="w-full bg-[#8370ed] rounded-3xl shadow-xl relative overflow-hidden flex-1 flex-col justify-between mb-5 p-7">

      {/* <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-semibold tracking-tight text-white/95">Or With Email</h2>
      <!-- Three Vertical Bars Accent -->
      <div aria-hidden="true" class="flex items-center space-x-1.5 opacity-90">
        <span class="w-[5px] h-6 bg-white rounded-full inline-block"></span>
        <span class="w-[5px] h-6 bg-white rounded-full inline-block"></span>
        <span class="w-[5px] h-6 bg-white rounded-full inline-block"></span>
      </div>
      </div> */}

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
        {/* <div class="space-y-2">
        <label class="block text-white/90 text-xs font-semibold uppercase tracking-wider pl-0.5" for="email">
          Email Address
        </label>
        <div class="relative">
          <input class="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-base text-white placeholder-white/40 focus:outline-none focus:border-white focus:bg-white/15 focus:ring-0 transition-all shadow-inner" id="email" name="email" placeholder="nama@sekolah.sch.id" required="" type="email">
          </div>
        </div> */}
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
          {/* <div class="space-y-2 pt-1">
        <label class="block text-white/90 text-xs font-semibold uppercase tracking-wider pl-0.5" for="password">
          Password
        </label>
        <div class="relative flex items-center">
          <input class="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 pr-12 text-base text-white placeholder-white/40 focus:outline-none focus:border-white focus:bg-white/15 focus:ring-0 transition-all shadow-inner" id="password" name="password" placeholder="••••••••" required="" type="password"></input> */}
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
        
        <View ClassName="pt-2 gap-4"> 
        {/* <button class="w-full bg-[#41cddc] hover:bg-[#34becd] active:scale-[0.98] text-white font-bold py-4 px-6 rounded-xl shadow-md transition-all duration-200 text-center text-base tracking-wide flex items-center justify-center space-x-2" type="submit">
        <span class="">Authenticate</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"></path>
        </svg>
      </button> */}
          {/* <button class="w-full bg-[#41cddc] hover:bg-[#34becd] active:scale-[0.98] text-white font-bold py-4 px-6 rounded-xl shadow-md transition-all duration-200 text-center text-base tracking-wide flex items-center justify-center space-x-2" type="submit"> */}
        <TouchableOpacity 
          activeOpacity={0.7}
          className="w-full bg-[#41cddc] py-4 px-6 rounded-xl shadow-md flex-row items-center justify-center gap-2"
        >
          <Text className="text-white font-bold text-base tracking-wide">
            Authenticate
          </Text>

        </View>
      </View>

      </View>
        
    </SafeAreaView>
  );
}
