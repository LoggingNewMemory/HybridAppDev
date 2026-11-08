import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

type CourseCardProps = {
    icon: string;
    category: string;
    title: string;
    description: string;
    progress: number;
    remaining: number;
};

export default function CourseCard({ icon, category, title, description, progress, remaining }: CourseCardProps) {
    return (
        <View className="bg-white rounded-2xl p-4 shadow-sm flex-col gap-3">
            <View className="flex-row items-start justify-between gap-3">
                <View className="flex-row items-center gap-3 flex-1">
                    <View className="w-12 h-12 rounded-xl bg-[#5849c0]/10 flex items-center justify-center shrink-0">
                        <Text className="text-[#5849c0] font-bold text-lg">{icon}</Text>
                    </View>
                    <View className="flex-1">
                        <Text className="text-[10px] font-semibold text-[#5849c0] uppercase mb-0.5">{category}</Text>
                        <Text className="text-base font-bold text-slate-900 truncate">{title}</Text>
                        <Text className="text-xs text-slate-500 truncate">{description}</Text>
                    </View>
                </View>
                <View className="bg-[#00696c]/10 px-2 py-1 rounded-lg shrink-0">
                    <Text className="text-xs font-bold text-[#00696c]">{progress}%</Text>
                </View>
            </View>
            
            <View className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-1">
                <View className="bg-[#5849c0] h-full rounded-full" style={{ width: `${progress}%` }} />
            </View>
            
            <View className="flex-row items-center justify-between pt-1">
                <View className="flex-row items-center gap-1">
                    <Text className="text-xs font-semibold text-slate-500">Sisa {remaining} materi</Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => router.push('/detail_materi')}
                    className="bg-[#5849c0] px-4 py-1.5 rounded-full flex-row items-center gap-1 shadow-sm">
                    <Text className="text-white text-xs font-semibold">Lanjutkan</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}