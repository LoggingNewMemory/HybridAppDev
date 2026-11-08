import { router } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function Profil() {
    const insets = useSafeAreaInsets();

    return (
        <SafeAreaView className="flex-1 bg-[#fcf8ff] flex-col" edges={['top']}>
            <View className="h-16 px-5 flex-row items-center justify-between bg-white/80 border-b border-slate-100 shadow-sm z-10">
                <Text className="text-xl font-bold text-slate-900 tracking-tight">Profil</Text>
            </View>

            <ScrollView
                contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                <View className="bg-white rounded-3xl p-6 shadow-sm mb-6 items-center flex-col border border-slate-100">
                    <View className="w-24 h-24 rounded-full overflow-hidden bg-slate-100 mb-4 border-2 border-white shadow-sm">
                        <Image
                            source={require('../../Designs/Kanata.png')}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                    </View>
                    <Text className="text-2xl font-bold text-slate-900 mb-0.5">Amane Kanata</Text>
                    <Text className="text-sm text-slate-500">amane.kanata@hololive.prod</Text>
                </View>

                <View className="flex-col gap-3 mb-8">

                    <View className="bg-white rounded-2xl p-4 shadow-sm flex-row items-center justify-between border border-slate-50">
                        <Text className="text-sm font-medium text-slate-500">Jenjang Pendidikan</Text>
                        <Text className="text-sm font-bold text-slate-900">Mahasiswa Semester 5</Text>
                    </View>

                    <View className="bg-white rounded-2xl p-4 shadow-sm flex-row items-center justify-between border border-slate-50">
                        <Text className="text-sm font-medium text-slate-500">Peminatan / Jurusan</Text>
                        <Text className="text-sm font-bold text-slate-900">Computer Science</Text>
                    </View>

                    <View className="bg-white rounded-2xl p-4 shadow-sm flex-row items-center justify-between border border-slate-50">
                        <Text className="text-sm font-medium text-slate-500">Target Akademik</Text>
                        <Text className="text-sm font-bold text-[#5849c0]">Lecturer of CompSci</Text>
                    </View>

                    <View className="bg-white rounded-2xl p-4 shadow-sm flex-row items-center justify-between border border-slate-50">
                        <Text className="text-sm font-medium text-slate-500">Tahun Ajaran</Text>
                        <Text className="text-sm font-bold text-slate-900">2026 / 2027</Text>
                    </View>

                </View>

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => router.push('/')}
                    className="w-full py-4 rounded-2xl bg-[#ffdad6]/60 flex-row items-center justify-center gap-2 mb-4"
                >
                    <Text className="text-lg">🚪</Text>
                    <Text className="text-base font-bold text-[#93000a]">Keluar Akun</Text>
                </TouchableOpacity>

            </ScrollView>

            <View
                className="absolute bottom-0 left-0 right-0 bg-white/95 border-t border-slate-200 pt-2 px-4 shadow-xl"
                style={{ paddingBottom: insets.bottom > 0 ? insets.bottom : 24 }}
            >
                <View className="flex-row justify-around items-center h-14">
                    <TouchableOpacity activeOpacity={0.7} className="flex-col items-center justify-center gap-1 min-w-[56px]"
                        onPress={() => router.push('/homepage')}
                    >
                        <Text className="text-xl opacity-60">🏠</Text>
                        <Text className="text-[10px] font-medium text-slate-500">Beranda</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.7} className="flex-col items-center justify-center gap-1 min-w-[56px]"
                        onPress={() => router.push('/belajar')}
                    >
                        <Text className="text-xl opacity-60">📖</Text>
                        <Text className="text-[10px] font-medium text-slate-500">Belajar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.7} className="flex-col items-center justify-center gap-1 min-w-[56px]">
                        <Text className="text-xl opacity-60">📝</Text>
                        <Text className="text-[10px] font-medium text-slate-500">Tugas</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.7} className="flex-col items-center justify-center gap-1 min-w-[56px]">
                        <Text className="text-xl">👤</Text>
                        <Text className="text-[10px] font-bold text-[#5849c0]">Profil</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    )
}