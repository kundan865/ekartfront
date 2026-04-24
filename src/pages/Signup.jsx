import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sendOtp, verifyOtp, signup } from "@/redux/features/userThunks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        otp: "",
        firstName: "",
        lastName: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await dispatch(sendOtp(formData.email)).unwrap();
            toast.success(res || "OTP sent successfully");
            setStep(2);
        } catch (err) {
            toast.error(err?.payload || err?.message || "Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await dispatch(
                verifyOtp({
                    email: formData.email,
                    otp: formData.otp
                })
            ).unwrap();

            toast.success(res || "OTP verified");
            setStep(3);
        } catch (err) {
            toast.error(err?.payload || "Invalid OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await dispatch(
                signup({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password
                })
            ).unwrap();
            navigate("/login")
            toast.success(res || "Signup successfully..");
        } catch (err) {
            toast.error(err?.messae || err?.error || err || err?.payload || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">

            <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">

                <h2 className="text-xl font-bold text-center mb-4">
                    Signup
                </h2>

                {/* STEP 1: EMAIL */}
                {step === 1 && (
                    <form onSubmit={handleSendOtp} className="space-y-4">
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <Button className="w-full" disabled={loading}>
                            {loading ? "Sending..." : "Send OTP"}
                        </Button>

                        <div className="flex flex-col justify-center items-center">
                            <div className='flex gap-2 text-sm'>
                                <span>if you have an account?</span>
                                <Link to="/login" className="text-blue-600 hover:underline">
                                    Login
                                </Link>
                            </div>
                            <Link to={"/forgetPassword"} className="text-blue-600 hover:underline">
                                Forgot Password?
                            </Link>
                        </div>


                    </form>
                )}

                {/* STEP 2: OTP */}
                {step === 2 && (
                    <form onSubmit={handleVerifyOtp} className="space-y-4">
                        <Input
                            id="otp"
                            type="text"
                            placeholder="Enter OTP"
                            value={formData.otp}
                            onChange={handleChange}
                            required
                        />

                        <Button className="w-full" disabled={loading}>
                            {loading ? "Verifying..." : "Verify OTP"}
                        </Button>

                        <div className="flex flex-col justify-center items-center">

                        </div>

                        <div className='flex gap-2 text-sm'>
                            <span>if you have an account?</span>
                            <Link to="/login" className="text-blue-600 hover:underline">
                                Login
                            </Link>
                        </div>
                        <Link to={"/forgetPassword"} className="text-blue-600 hover:underline">
                            Forgot Password?
                        </Link>
                    </form>
                )}

                {/* STEP 3: SIGNUP FORM */}
                {step === 3 && (
                    <form onSubmit={handleSignup} className="space-y-4">

                        <Input
                            id="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            id="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        <Button className="w-full" disabled={loading}>
                            {loading ? "Creating..." : "Create Account"}
                        </Button>


                        <div className="flex flex-col justify-center items-center">
                            <div className='flex gap-2 text-sm'>
                                <span>if you have have an account?</span>
                                <Link to="/login" className="text-blue-600 hover:underline">
                                    Login
                                </Link>
                            </div>
                            <Link to={"/forgetPassword"} className="text-blue-600 hover:underline">
                                Forgot Password?
                            </Link>
                        </div>
                    </form>
                )}

            </div>
        </div>
    );
};

export default Signup;