import { router } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import CourseCard from "../components/CourseCard";
import { courseData } from "../data/courses";

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
                    {courseData.map((course) => (
                        <CourseCard 
                            key={course.id}
                            icon={course.icon}
                            category={course.category}
                            title={course.title}
                            description={course.description}
                            progress={course.progress}
                            remaining={course.remaining}
                        />
                    ))}
                </View>
            </ScrollView>
            <View className="flex-col gap-3 mt-5"></View>
            <View 
                className="absolute bottom-0 left-0 right-0 bg-white/95 border-t border-slate-200 pt-2 px-4 shadow-xl"
                style={{ paddingBottom: insets.bottom > 0 ? insets.bottom : 24 }}
            >
                <View className="flex-row justify-around items-center h-14">
                    <TouchableOpacity activeOpacity={0.7} className="flex-col items-center justify-center gap-1 min-w-[56px]"
                    onPress={() => router.push('/homepage')}
                    >
                        <Text className="text-xl">🏠</Text>
                        <Text className="text-[10px] font-bold text-[#5849c0]">Beranda</Text>
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

                    <TouchableOpacity activeOpacity={0.7} className="flex-col items-center justify-center gap-1 min-w-[56px]"
                    onPress={() => router.push('/profile')}>
                        <Text className="text-xl opacity-60">👤</Text>
                        <Text className="text-[10px] font-medium text-slate-500">Profil</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}   