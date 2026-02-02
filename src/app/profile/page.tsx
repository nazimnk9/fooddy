"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Clock, ChevronDown, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { getCookie } from "@/utils/cookieUtils";
import { getUserProfile } from "@/services/authService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function ProfilePage() {
    const router = useRouter();
    const [userProfile, setUserProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // Form State
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [dobDay, setDobDay] = useState("");
    const [dobMonth, setDobMonth] = useState("");
    const [dobYear, setDobYear] = useState("");

    useEffect(() => {
        const token = getCookie("access_token");
        if (!token) {
            router.push("/");
            return;
        }

        const fetchProfile = async () => {
            try {
                const profile = await getUserProfile(token);
                setUserProfile(profile);
                setFirstName(profile.first_name || "");
                setLastName(profile.last_name || "");
                setEmail(profile.email || "");
                setPhone(profile.phone || "");
            } catch (error) {
                console.error("Error fetching user profile:", error);
                toast.error("Failed to load profile details");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] pt-24 pb-12">
            <div className="container-fooddy max-w-6xl">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="w-full lg:w-80 flex-shrink-0">
                        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                            {/* Sidebar Header */}
                            <div className="bg-[#1a2b4b] p-8 text-center">
                                <h2 className="text-white text-xl font-bold mb-1">
                                    {firstName} {lastName}
                                </h2>
                                <p className="text-white/60 text-sm">Account</p>
                            </div>

                            {/* Sidebar Menu */}
                            <div className="p-4 space-y-1">
                                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#f4f7fa] text-[#1a2b4b] font-semibold transition-colors">
                                    <User className="w-5 h-5" />
                                    <span>Personal details</span>
                                </button>
                                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50 transition-colors">
                                    <Clock className="w-5 h-5 text-gray-400" />
                                    <span>Booking History</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <div className="space-y-12">
                            {/* Profile Details */}
                            <section>
                                <h3 className="text-[#1a2b4b] text-xl font-bold mb-8">Profile Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2 relative">
                                        <Label className="absolute -top-2.5 left-4 bg-white px-2 text-xs text-gray-400 z-10">
                                            First Name
                                        </Label>
                                        <Input
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            className="h-14 bg-white border-gray-200 rounded-xl focus:ring-1 focus:ring-primary/20 transition-all text-gray-700"
                                        />
                                    </div>
                                    <div className="space-y-2 relative">
                                        <Label className="absolute -top-2.5 left-4 bg-white px-2 text-xs text-gray-400 z-10">
                                            Last Name
                                        </Label>
                                        <Input
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            className="h-14 bg-white border-gray-200 rounded-xl focus:ring-1 focus:ring-primary/20 transition-all text-gray-700"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Contact Details */}
                            <section>
                                <h3 className="text-[#1a2b4b] text-xl font-bold mb-8">Contact Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2 relative">
                                        <Label className="absolute -top-2.5 left-4 bg-white px-2 text-xs text-gray-400 z-10 font-normal">
                                            Email
                                        </Label>
                                        <Input
                                            value={email}
                                            disabled
                                            className="h-14 bg-[#f8fafc] border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                                        />
                                    </div>
                                    <div className="space-y-2 relative">
                                        <Label className="absolute -top-2.5 left-4 bg-white px-2 text-xs text-gray-400 z-10">
                                            Mobile Phone
                                        </Label>
                                        <Input
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="h-14 bg-white border-gray-200 rounded-xl focus:ring-1 focus:ring-primary/20 transition-all text-gray-700"
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Date of birth */}
                            <section>
                                <h3 className="text-[#1a2b4b] text-xl font-bold mb-8">Date of birth</h3>
                                <div className="grid grid-cols-3 gap-4">
                                    <Select value={dobDay} onValueChange={setDobDay}>
                                        <SelectTrigger className="h-14 border-gray-200 rounded-xl text-gray-500 focus:ring-primary/20">
                                            <SelectValue placeholder="Day" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-gray-100 rounded-xl">
                                            {Array.from({ length: 31 }, (_, i) => (
                                                <SelectItem key={i + 1} value={(i + 1).toString()} className="hover:bg-gray-50 cursor-pointer">
                                                    {i + 1}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <Select value={dobMonth} onValueChange={setDobMonth}>
                                        <SelectTrigger className="h-14 border-gray-200 rounded-xl text-gray-500 focus:ring-primary/20">
                                            <SelectValue placeholder="Month" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-gray-100 rounded-xl">
                                            {[
                                                "January", "February", "March", "April", "May", "June",
                                                "July", "August", "September", "October", "November", "December"
                                            ].map((month) => (
                                                <SelectItem key={month} value={month.toLowerCase()} className="hover:bg-gray-50 cursor-pointer">
                                                    {month}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <Select value={dobYear} onValueChange={setDobYear}>
                                        <SelectTrigger className="h-14 border-gray-200 rounded-xl text-gray-500 focus:ring-primary/20">
                                            <SelectValue placeholder="Year" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-gray-100 rounded-xl max-h-60 overflow-y-auto">
                                            {Array.from({ length: 100 }, (_, i) => (
                                                <SelectItem key={2024 - i} value={(2024 - i).toString()} className="hover:bg-gray-50 cursor-pointer">
                                                    {2024 - i}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </section>

                            {/* Action Buttons */}
                            <div className="pt-4 flex flex-col gap-6">
                                <Button
                                    onClick={() => toast.success("Profile saved successfully!")}
                                    className="w-48 h-12"
                                    variant={"accent"}
                                >
                                    Save
                                </Button>
                                <div className="pt-4 border-t border-gray-100">
                                    <button className="text-red-500 font-bold hover:text-red-600 transition-colors">
                                        Delete Account
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
