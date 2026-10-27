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
                                Halo, Kanata-chan!
                            </Text>
                        </View>
                        {/* <p class="font-body-md text-body-md text-on-surface-variant">Yuk lanjutkan progres belajarmu hari ini!</p> */}
                        <Text className="font-body-md text-body-md text-on-surface-variant">
                            Yuk lanjutkan progres belajarmu hari ini!
                        </Text>
                    </View>
                </View>
                {/* <div class="relative overflow-hidden rounded-2xl p-space-lg text-on-primary shadow-[0_8px_24px_rgba(88,73,192,0.22)]" style="background-color: #6c5ce7;"> */}
                <View className="relative overflow-hidden rounded-2xl p-5 shadow-lg bg-[#6c5ce7] mt-3">
                    <View className="relative z-10 flex-col gap-4">
                        <View className="relative">
                            <Text className="text-base italic font-medium leading-relaxed text-white/95">
                                “Pendidikan adalah senjata paling ampuh yang bisa kamu gunakan untuk mengubah dunia.”
                            </Text>
                        </View>
                        {/* <div class="flex items-center justify-between pt-space-xs border-t border-white/15 text-white/90">
                        <span class="font-label-md text-label-md font-bold text-secondary-fixed tracking-wide">~ Nelson Mandela</span> */}
                        <View className="flex-row items-center justify-between pt-3 border-t border-white/15">
                        <Text className="text-sm font-bold text-[#41cddc] tracking-wide">
                           ~ Nelson Mandela
                        </Text>
                        </View>
                    </View>
                </View>
            {/* <section class="flex flex-col gap-space-sm">
            <div class="flex items-center justify-between">
            <div>
            <h2 class="font-title-md text-title-md font-bold text-on-surface">Lanjutkan Belajar</h2>
            <p class="font-label-sm text-label-sm text-on-surface-variant">Selesaikan materi yang sedang berjalan</p>
            </div> */}
            <View className="flex-col gap-4 mt-3">
                <View className="flex justify-between">
                <Text className="text-xl font-bold text-slate-900">
                Lanjutkan Belajar
                </Text>
                <Text className="text-sm text-slate-500 mt-0.5">
                Selesaikan materi yang sedang berjalan
                </Text>
                </View>
            </View>

            </View>
        </SafeAreaView>
    )
}