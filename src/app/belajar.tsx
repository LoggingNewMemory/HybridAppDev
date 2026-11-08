import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
    const insets = useSafeAreaInsets();
    return (
        <SafeAreaView className="flex-1 bg-[#e4e8fb] flex-col px-5 pt-3" edges={['top']}>
            <ScrollView 
                contentContainerStyle={{ paddingBottom: 100 }} 
                showsVerticalScrollIndicator={false}
                className="flex flex-col gap-3 pt-2"
            >
                <View className="flex-row items-center gap-3 min-w-0">
                    <View className="min-w-0">
                        <View className="flex-row items-center gap-2">
                            <Text className="text-2xl font-bold text-slate-900 truncate">
                                Materi Belajar
                            </Text>
                        </View>
                        <Text className="text-sm text-slate-500 mt-1">
                            Pilih mata pelajaran dan lanjutkan pembelajaranmu
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
                                onPress={() => router.push('/detail_materi')}
                                className="bg-[#5849c0] px-4 py-1.5 rounded-full flex-row items-center gap-1 shadow-sm">
                                <Text className="text-white text-xs font-semibold">Lanjutkan</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View className="flex-col gap-4 mt-3">
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
                                onPress={() => router.push('/detail_materi')}
                                className="bg-[#5849c0] px-4 py-1.5 rounded-full flex-row items-center gap-1 shadow-sm">
                                <Text className="text-white text-xs font-semibold">Lanjutkan</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View className="flex-col gap-4 mt-3">
                    <View className="bg-white rounded-2xl p-4 shadow-sm flex-col gap-3">
                        <View className="flex-row items-start justify-between gap-3">
                            <View className="flex-row items-center gap-3 flex-1">
                                <View className="w-12 h-12 rounded-xl bg-[#5849c0]/10 flex items-center justify-center shrink-0">
                                    <Text className="text-[#5849c0] font-bold text-lg">B</Text>
                                </View>
                                <View className="flex-1">
                                    <Text className="text-[10px] font-semibold text-[#5849c0] uppercase mb-0.5">SAINTEK • MODUL 4/10</Text>
                                    <Text className="text-base font-bold text-slate-900 truncate">Fisika: Mekanika Fluida</Text>
                                    <Text className="text-xs text-slate-500 truncate">Tekanan Hidrostatis & Hukum Bernoulli</Text>
                                </View>
                            </View>
                            <View className="bg-[#00696c]/10 px-2 py-1 rounded-lg shrink-0">
                                <Text className="text-xs font-bold text-[#00696c]">40%</Text>
                            </View>
                        </View>
                        <View className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-1">
                            <View className="bg-[#5849c0] h-full rounded-full" style={{ width: '60%' }} />
                        </View>
                        <View className="flex-row items-center justify-between pt-1">
                            <View className="flex-row items-center gap-1">
                                <Text className="text-xs font-semibold text-slate-500">Sisa 6 materi</Text>
                            </View>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => router.push('/detail_materi')}
                                className="bg-[#5849c0] px-4 py-1.5 rounded-full flex-row items-center gap-1 shadow-sm">
                                <Text className="text-white text-xs font-semibold">Lanjutkan</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View 
                            className="absolute bottom-0 left-0 right-0 bg-white/95 border-t border-slate-200 pt-2 px-4 shadow-xl"
                            style={{ paddingBottom: insets.bottom > 0 ? insets.bottom : 24 }}
                        >
                            <View className="flex-row justify-around items-center h-14">
                                <TouchableOpacity activeOpacity={0.7} className="flex-col items-center justify-center gap-1 min-w-[56px]"
                                onPress={() => router.push('/homepage')}
                                >
                                    <Text className="text-xl">🏠</Text>
                                    <Text className="text-[10px] font-medium text-slate-500">Beranda</Text>
                                </TouchableOpacity>
            
                                <TouchableOpacity activeOpacity={0.7} className="flex-col items-center justify-center gap-1 min-w-[56px]"
                                onPress={() => router.push('/belajar')}
                                >
                                    <Text className="text-xl opacity-60">📖</Text>
                                    <Text className="text-[10px] font-bold text-[#5849c0]">Belajar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.7} className="flex-col items-center justify-center gap-1 min-w-[56px]">
                                    <Text className="text-xl opacity-60">📝</Text>
                                    <Text className="text-[10px] font-medium text-slate-500">Tugas</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.7} className="flex-col items-center justify-center gap-1 min-w-[56px]">
                                    <Text className="text-xl opacity-60">👤</Text>
                                    <Text className="text-[10px] font-medium text-slate-500">Profil</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
        </SafeAreaView>
    )
}   