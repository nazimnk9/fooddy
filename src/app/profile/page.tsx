"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Clock, ChevronDown, Trash2, Loader2, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { getCookie, deleteCookie } from "@/utils/cookieUtils";
import { getUserProfile, updateUserProfile, deleteUserProfile, getUserOrders } from "@/services/authService";
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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAppDispatch } from "@/redux/hooks";
import { setProfile, logout } from "@/redux/features/auth/authSlice";

export default function ProfilePage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [userProfile, setUserProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Tab State
    const [activeTab, setActiveTab] = useState<'details' | 'orders'>('details');
    const [orders, setOrders] = useState<any[]>([]);
    const [loadingOrders, setLoadingOrders] = useState(false);

    // Alert State
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertTitle, setAlertTitle] = useState("");
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    // Form State
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [dobDay, setDobDay] = useState("");
    const [dobMonth, setDobMonth] = useState("");
    const [dobYear, setDobYear] = useState("");

    const fetchProfile = async () => {
        const token = getCookie("access_token");
        if (!token) {
            router.push("/");
            return;
        }
        try {
            const profile = await getUserProfile(token);
            setUserProfile(profile);
            setFirstName(profile.first_name || "");
            setLastName(profile.last_name || "");
            setEmail(profile.email || "");
            setPhone(profile.phone || "");
            // Clear password on fetch
            setPassword("");

            // Update Redux state
            dispatch(setProfile(profile));
        } catch (error) {
            console.error("Error fetching user profile:", error);
            toast.error("Failed to load profile details");
        } finally {
            setLoading(false);
        }
    };

    const fetchOrders = async () => {
        const token = getCookie("access_token");
        if (!token) return;

        setLoadingOrders(true);
        try {
            const data = await getUserOrders(token);
            setOrders(data.results || []);
        } catch (error) {
            console.error("Error fetching orders:", error);
            toast.error("Failed to load order history");
        } finally {
            setLoadingOrders(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [router]);

    useEffect(() => {
        if (activeTab === 'orders') {
            fetchOrders();
        }
    }, [activeTab]);

    const handleSave = async () => {
        const token = getCookie("access_token");
        if (!token) {
            setAlertTitle("Session Expired");
            setAlertMessage("Please login again.");
            setShowAlert(true);
            return;
        }

        // Partial Update: Only send fields that have changed
        const patchData: any = {};
        if (firstName !== (userProfile?.first_name || "")) patchData.first_name = firstName;
        if (lastName !== (userProfile?.last_name || "")) patchData.last_name = lastName;
        if (phone !== (userProfile?.phone || "")) patchData.phone = phone;
        if (password) patchData.password = password;

        if (Object.keys(patchData).length === 0) {
            setAlertTitle("No Changes");
            setAlertMessage("You haven't made any changes to save.");
            setShowAlert(true);
            return;
        }

        setSaving(true);
        try {
            const result = await updateUserProfile(token, patchData);

            setUserProfile(result);
            // Update Redux state
            dispatch(setProfile(result));

            setAlertTitle("Success");
            setAlertMessage("Profile updated successfully!");
            setShowAlert(true);
        } catch (error: any) {
            console.error("Error updating profile:", error);

            let errorMessage = "Failed to update profile";

            // Comprehensive error parsing
            if (error.data) {
                const data = error.data;
                if (typeof data === 'object') {
                    const messages: string[] = [];
                    Object.keys(data).forEach(key => {
                        const val = data[key];
                        if (Array.isArray(val)) {
                            messages.push(`${key}: ${val.join(' ')}`);
                        } else if (typeof val === 'string') {
                            messages.push(`${key}: ${val}`);
                        }
                    });
                    if (messages.length > 0) {
                        errorMessage = messages.join('\n');
                    } else if (data.message) {
                        errorMessage = data.message;
                    }
                } else if (typeof data === 'string') {
                    errorMessage = data;
                }
            } else if (error.message) {
                errorMessage = error.message;
            }

            setAlertTitle("Update Failed");
            setAlertMessage(errorMessage);
            setShowAlert(true);
        } finally {
            setSaving(false);
        }
    };

    const handleAlertOk = () => {
        setShowAlert(false);
        // Page showing updated data is already handled by state updates in handleSave
        // and fetchProfile being called again if necessary, but here state is already set.
        // If we want to be sure, we can re-fetch.
        fetchProfile();
    };

    const handleDeleteAccount = async () => {
        const token = getCookie("access_token");
        if (!token) return;

        setSaving(true);
        try {
            await deleteUserProfile(token);

            // Clear credentials
            deleteCookie("access_token");
            deleteCookie("refresh_token");

            // Clear Redux state
            dispatch(logout());

            // Redirect to home
            router.push("/");
            toast.success("Account deleted successfully");
        } catch (error: any) {
            console.error("Error deleting account:", error);
            const errorMessage = error.data?.message || error.message || "Failed to delete account";
            setAlertTitle("Delete Failed");
            setAlertMessage(errorMessage);
            setShowAlert(true);
        } finally {
            setSaving(false);
            setShowDeleteDialog(false);
        }
    };

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
                                <button
                                    onClick={() => setActiveTab('details')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'details' ? 'bg-[#f4f7fa] text-[#1a2b4b] font-semibold' : 'text-gray-500 hover:bg-gray-50'}`}
                                >
                                    <User className="w-5 h-5" />
                                    <span>Personal details</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('orders')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'orders' ? 'bg-[#f4f7fa] text-[#1a2b4b] font-semibold' : 'text-gray-500 hover:bg-gray-50'}`}
                                >
                                    <Clock className="w-5 h-5 text-gray-400" />
                                    <span>Order History</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        {activeTab === 'details' ? (
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

                                {/* Security Section */}
                                <section>
                                    <h3 className="text-[#1a2b4b] text-xl font-bold mb-8">Security</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2 relative">
                                            <Label className="absolute -top-2.5 left-4 bg-white px-2 text-xs text-gray-400 z-10">
                                                New Password
                                            </Label>
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    placeholder="Leave blank to keep current"
                                                    className="h-14 bg-white border-gray-200 rounded-xl focus:ring-1 focus:ring-primary/20 transition-all text-gray-700 pr-12"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                                >
                                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Action Buttons */}
                                <div className="pt-4 flex flex-col gap-6">
                                    <Button
                                        onClick={handleSave}
                                        disabled={saving}
                                        className="w-48 h-12 flex items-center justify-center gap-2"
                                        variant={"accent"}
                                    >
                                        {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                                        {saving ? "Saving..." : "Save"}
                                    </Button>
                                    <div className="pt-4 border-t border-gray-100">
                                        <button
                                            onClick={() => setShowDeleteDialog(true)}
                                            className="text-red-500 font-bold hover:text-red-600 cursor-pointer hover:underline transition-colors"
                                        >
                                            Delete Account
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                <h3 className="text-[#1a2b4b] text-xl font-bold">Order History</h3>

                                {loadingOrders ? (
                                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                                        <p className="text-gray-500 animate-pulse">Loading your orders...</p>
                                    </div>
                                ) : orders.length === 0 ? (
                                    <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100">
                                        <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                                            <Clock className="w-8 h-8 text-gray-300" />
                                        </div>
                                        <h4 className="text-gray-900 font-bold text-lg mb-1">No orders yet</h4>
                                        <p className="text-gray-500 max-w-xs mx-auto text-sm">
                                            When you place an order, it will appear here for you to track.
                                        </p>
                                        <Button
                                            variant="outline"
                                            className="mt-6 rounded-xl border-gray-200"
                                            onClick={() => router.push('/menu')}
                                        >
                                            Explore Menu
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto -mx-2">
                                        <table className="w-full text-left border-collapse min-w-[600px]">
                                            <thead>
                                                <tr className="border-b border-gray-100">
                                                    <th className="pb-4 px-4 text-xs font-bold uppercase tracking-wider text-gray-400">Order ID</th>
                                                    <th className="pb-4 px-4 text-xs font-bold uppercase tracking-wider text-gray-400">Date</th>
                                                    <th className="pb-4 px-4 text-xs font-bold uppercase tracking-wider text-gray-400">Total</th>
                                                    <th className="pb-4 px-4 text-xs font-bold uppercase tracking-wider text-gray-400">Status</th>
                                                    <th className="pb-4 px-4 text-xs font-bold uppercase tracking-wider text-gray-400 text-right">Payment</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-50">
                                                {orders.map((order) => (
                                                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                                                        <td className="py-5 px-4">
                                                            <span className="font-bold text-[#1a2b4b]">#{order.id}</span>
                                                        </td>
                                                        <td className="py-5 px-4">
                                                            <div className="text-sm text-gray-600">
                                                                {new Date(order.created_at).toLocaleDateString('en-US', {
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                    year: 'numeric'
                                                                })}
                                                            </div>
                                                        </td>
                                                        <td className="py-5 px-4 font-bold text-gray-900">
                                                            ${order.total_amount}
                                                        </td>
                                                        <td className="py-5 px-4">
                                                            <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide inline-flex items-center gap-1 ${order.status === 'completed'
                                                                ? 'bg-emerald-50 text-emerald-600'
                                                                : order.status === 'pending'
                                                                    ? 'bg-amber-50 text-amber-600'
                                                                    : 'bg-gray-50 text-gray-500'
                                                                }`}>
                                                                <span className={`w-1.5 h-1.5 rounded-full ${order.status === 'completed'
                                                                    ? 'bg-emerald-500'
                                                                    : order.status === 'pending'
                                                                        ? 'bg-amber-500'
                                                                        : 'bg-gray-400'
                                                                    }`} />
                                                                {order.status}
                                                            </span>
                                                        </td>
                                                        <td className="py-5 px-4 text-right">
                                                            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                                                                {order.payment_type}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Success/Error Alert Dialog */}
            <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
                <AlertDialogContent className="bg-white rounded-2xl border-none shadow-xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-[#1a2b4b] text-xl font-bold">
                            {alertTitle}
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-500">
                            {alertMessage}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction
                            onClick={handleAlertOk}
                            className="bg-[#1a2b4b] text-white hover:bg-[#1a2b4b]/90 rounded-xl h-11 px-8"
                        >
                            OK
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Delete Account Confirmation Dialog */}
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent className="bg-white rounded-2xl border-none shadow-xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-[#1a2b4b] text-xl font-bold">
                            Delete Account?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-500 text-base">
                            This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="gap-3">
                        <AlertDialogAction
                            onClick={() => setShowDeleteDialog(false)}
                            className="bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-xl h-11 px-6 border-none"
                        >
                            Cancel
                        </AlertDialogAction>
                        <AlertDialogAction
                            onClick={handleDeleteAccount}
                            className="bg-red-500 text-white hover:bg-red-600 rounded-xl h-11 px-8"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
