import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
    return (
        <SafeAreaView className="flex-1 bg-[#e4e8fb] flex-col px-5 pt-3 pb-6">

            {/* <section class="flex flex-col gap-space-sm pt-space-xs">
        <div class="flex items-center justify-between">
        <div class="min-w-0">
        <div class="flex items-center gap-space-xs">
        <span class="font-headline-md text-headline-md font-bold text-on-surface truncate">Halo, Rian!</span> */}

            <View className="flex flex-col gap-3 pt-2">
                <View className="flex-row items-center justify-between">
                    <View className="min-w-0">
                        <View className="flex-row items-center gap-2">
                            <Text className="text-2xl font-bold text-slate-900 truncate">
                                Halo, Mas Kakang!
                            </Text>

                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}