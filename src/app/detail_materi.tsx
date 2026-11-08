import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function DetailMateri() {
    const insets = useSafeAreaInsets();

    return (
        <SafeAreaView className="flex-1 bg-[#fcf8ff] flex-col" edges={['top']}>

            <View className="h-14 px-5 flex-row items-center gap-3 bg-white/80 border-b border-slate-100 shadow-sm z-10">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 items-center justify-center rounded-full bg-slate-100 active:bg-slate-200"
                >
                    <Text className="text-xl font-bold text-slate-700">←</Text>
                </TouchableOpacity>
                <Text className="text-lg font-bold text-slate-900">Detail Materi</Text>
            </View>

            <ScrollView
                contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                <View className="mb-5">
                    <Text className="text-xs font-bold text-[#5849c0] uppercase tracking-wider mb-1">
                        Saintek • Modul 4/12
                    </Text>
                    <Text className="text-2xl font-bold text-slate-900 leading-tight">
                        Matematika: Kalkulus Dasar
                    </Text>
                    <Text className="text-sm text-slate-500 mt-1">
                        Integral Tak Wajar & Aplikasi Luas Daerah
                    </Text>
                </View>

                <View className="bg-white rounded-xl p-4 shadow-sm mb-4 border border-slate-100">
                    <View className="flex-row items-center justify-between mb-2">
                        <Text className="text-sm font-semibold text-slate-900">Progres Modul</Text>
                        <Text className="text-sm font-bold text-[#5849c0]">33%</Text>
                    </View>
                    <View className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <View className="h-full bg-[#5849c0] rounded-full" style={{ width: '33.3%' }} />
                    </View>
                </View>

                <View className="bg-white rounded-xl p-4 shadow-sm mb-4 border border-slate-100">
                    <Text className="text-sm font-semibold text-slate-900 mb-1">Pendahuluan</Text>
                    <Text className="text-sm text-slate-500 leading-relaxed">
                        Modul ini membahas pengantar kalkulus dan konsep dasar limit hingga aplikasi integral secara bertahap dan mudah dipahami.
                    </Text>
                </View>

                <View className="bg-white rounded-xl p-4 shadow-sm mb-6 border border-slate-100">
                    <Text className="text-sm font-semibold text-slate-900 mb-3">Sub-Materi</Text>

                    <View className="flex-col gap-2">
                        <View className="flex-row items-center justify-between p-2 rounded-lg">
                            <View className="flex-row items-center gap-3 flex-1">
                                <View className="w-8 h-8 rounded-full bg-[#5849c0]/10 items-center justify-center">
                                    <Text className="text-[#5849c0] font-bold text-xs">✓</Text>
                                </View>
                                <View className="flex-1">
                                    <Text className="text-sm text-slate-900 truncate" numberOfLines={1}>1. Konsep Dasar Limit Tak Hingga</Text>
                                    <Text className="text-xs text-[#5849c0] font-medium">Selesai</Text>
                                </View>
                            </View>
                            <Text className="text-slate-300 text-lg">›</Text>
                        </View>
                        <View className="flex-row items-center justify-between p-2 rounded-lg bg-[#5849c0]/5 border border-[#5849c0]/10">
                            <View className="flex-row items-center gap-3 flex-1">
                                <View className="w-8 h-8 rounded-full bg-[#5849c0] items-center justify-center pl-0.5">
                                    <Text className="text-white text-xs">▶</Text>
                                </View>
                                <View className="flex-1">
                                    <Text className="text-sm font-bold text-slate-900 truncate" numberOfLines={1}>2. Integral Tak Wajar Tipe 1</Text>
                                    <Text className="text-xs text-[#5849c0] font-bold">Sedang Belajar</Text>
                                </View>
                            </View>
                            <Text className="text-[#5849c0] font-bold text-lg">→</Text>
                        </View>
                        <View className="flex-row items-center justify-between p-2 rounded-lg opacity-50">
                            <View className="flex-row items-center gap-3 flex-1">
                                <View className="w-8 h-8 rounded-full bg-slate-100 items-center justify-center">
                                    <Text className="text-slate-500 text-xs">🔒</Text>
                                </View>
                                <View className="flex-1">
                                    <Text className="text-sm text-slate-500 truncate" numberOfLines={1}>3. Menghitung Luas Bidang Datar</Text>
                                    <Text className="text-xs text-slate-400">Terkunci</Text>
                                </View>
                            </View>
                            <Text className="text-slate-300 text-xs">🔒</Text>
                        </View>

                    </View>
                </View>
            </ScrollView>

            <View
                className="absolute bottom-0 left-0 right-0 bg-white/95 border-t border-slate-200 pt-3 px-5 shadow-2xl"
                style={{ paddingBottom: insets.bottom > 0 ? insets.bottom : 24 }}
            >
                <TouchableOpacity
                    activeOpacity={0.7}
                    className="w-full h-12 bg-[#5849c0] rounded-full flex-row items-center justify-center gap-2 shadow-md"
                >
                    <Text className="text-white font-bold text-base">Lanjut Belajar</Text>
                    <Text className="text-white font-bold text-base">→</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}