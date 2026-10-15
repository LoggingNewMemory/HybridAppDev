import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-[#e4e8fb] flex-col justify-between px-5 pt-8 pb-6">

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
    </SafeAreaView>
  );
}
