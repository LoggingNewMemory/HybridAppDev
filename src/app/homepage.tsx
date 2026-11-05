import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
    return (
        <SafeAreaView className="flex-1 bg-[#e4e8fb] flex-col px-5 pt-3 pb-6">
            <View className="flex flex-col gap-3 pt-2">
                <View className="flex-row items-center gap-3 min-w-0">
                    <Image 
                            source={require('../../Designs/Kanata.png')} 
                            className="w-14 h-14 rounded-full border-2 border-white shadow-sm"
                            resizeMode="cover"
                        />
                    <View className="min-w-0">
                        <View className="flex-row items-center gap-2">
                            <Text className="text-2xl font-bold text-slate-900 truncate">
                                Halo, Kanata-chan!
                            </Text>
                        </View>
                        <Text className="text-sm text-slate-500 mt-1">
                            Yuk lanjutkan progres belajarmu hari ini!
                        </Text>
                    </View>
                </View>
                <View className="relative overflow-hidden rounded-2xl p-5 shadow-lg bg-[#6c5ce7] mt-3">
                    <View className="relative z-10 flex-col gap-4">
                        <View className="relative">
                            <Text className="text-base italic font-medium leading-relaxed text-white/95">
                                “Pendidikan adalah senjata paling ampuh yang bisa kamu gunakan untuk mengubah dunia.”
                            </Text>
                        </View>
                        <View className="flex-row items-center justify-between pt-3 border-t border-white/15">
                            <Text className="text-sm font-bold text-[#41cddc] tracking-wide">
                                ~ Nelson Mandela
                            </Text>
                        </View>
                    </View>
                </View>
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
                        <View className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-1">
                            <View className="bg-[#5849c0] h-full rounded-full" style={{ width: '65%' }} />
                        </View>
                        <View className="flex-row items-center justify-between pt-1">
                            <View className="flex-row items-center gap-1">
                                <Text className="text-xs font-semibold text-slate-500">Sisa 7 materi</Text>
                            </View>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                className="bg-[#5849c0] px-4 py-1.5 rounded-full flex-row items-center gap-1 shadow-sm">
                                <Text className="text-white text-xs font-semibold">Lanjutkan</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View className="flex-col gap-4">
                    <View className="bg-white rounded-2xl p-4 shadow-sm flex-col gap-3">
                        <View className="flex-row items-start justify-between gap-3">
                            <View className="flex-row items-center gap-3 flex-1">
                                <View className="w-12 h-12 rounded-xl bg-[#5849c0]/10 flex items-center justify-center shrink-0">
                                    <Text className="text-[#5849c0] font-bold text-lg">B</Text>
                                </View>
                                <View className="flex-1">
                                    <Text className="text-[10px] font-semibold text-[#5849c0] uppercase mb-0.5">BAHASA • SESI 2/12</Text>
                                    <Text className="text-base font-bold text-slate-900 truncate">TOEFL Prep: Listening</Text>
                                    <Text className="text-xs text-slate-500 truncate">Part C: Academic Lecture Comprehension</Text>
                                </View>
                            </View>
                            <View className="bg-[#00696c]/10 px-2 py-1 rounded-lg shrink-0">
                                <Text className="text-xs font-bold text-[#00696c]">20%</Text>
                            </View>
                        </View>
                        <View className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-1">
                            <View className="bg-[#5849c0] h-full rounded-full" style={{ width: '20%' }} />
                        </View>
                        <View className="flex-row items-center justify-between pt-1">
                            <View className="flex-row items-center gap-1">
                                <Text className="text-xs font-semibold text-slate-500">Sisa 10 materi</Text>
                            </View>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                className="bg-[#5849c0] px-4 py-1.5 rounded-full flex-row items-center gap-1 shadow-sm">
                                <Text className="text-white text-xs font-semibold">Lanjutkan</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}   