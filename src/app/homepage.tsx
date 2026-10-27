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
                        <Text className="text-sm text-slate-500 mt-1">
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

                <View className="flex-col gap-4 mt-3">
                    {/* <div class="bg-surface-container-lowest rounded-2xl p-space-md shadow-[0_4px_16px_rgba(88,73,192,0.05)] flex flex-col gap-space-sm">
            <div class="flex items-start justify-between gap-space-sm">
            <div class="flex items-center gap-space-sm min-w-0">
            <div class="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-[24px]">functions</span>
            </div>

            <div class="min-w-0">
            <span class="font-label-sm text-label-sm font-semibold text-primary uppercase">Saintek • Modul 4/12</span>
            <h3 class="font-title-md text-title-md font-bold text-on-surface truncate">Matematika: Kalkulus Dasar</h3>
            <p class="font-body-md text-body-md text-on-surface-variant truncate">Integral Tak Wajar &amp; Aplikasi Luas Daerah</p>
            </div>
            </div>
            <span class="font-label-sm text-label-sm font-bold text-secondary bg-surface-container-high px-space-xs py-0.5 rounded-lg shrink-0">65%</span>
            </div> */}

                    <View className="bg-white rounded-2xl p-4 shadow-sm flex-col gap-3">
                        <View className="flex-row items-start justify-between gap-3">
                            <View className="flex-row items-center gap-3 flex-1">
                                <View className="w-12 h-12 rounded-xl bg-[#5849c0]/10 flex items-center justify-center shrink-0">
                                    <Text className="text-[#5849c0] font-bold text-lg">Σ</Text>
                                </View>
                                <View className="flex-1">
                                    <Text className="text-[10px] font-semibold text-[#5849c0] uppercase mb-0.5">Saintek • Modul 4/12</Text>
                                    <Text className="text-base font-bold text-slate-900 truncate">Kalkulus Dasar</Text>
                                    <Text className="text-xs text-slate-500 truncate">Integral Tak Wajar & Aplikasi Luas Daerah</Text>
                                </View>
                            </View>
                            <View className="bg-[#00696c]/10 px-2 py-1 rounded-lg shrink-0">
                                <Text className="text-xs font-bold text-[#00696c]">65%</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}   