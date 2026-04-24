import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendOtp, verifyOtp, changePassword } from "@/redux/features/userThunks";
import { toast } from "sonner";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 1 = email, 2 = otp, 3 = reset password
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  // 📩 SEND OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await dispatch(
        sendOtp(formData.email)
      ).unwrap();

      toast.success(res || "OTP sent successfully");
      setStep(2);
    } catch (err) {
      toast.error(err?.payload || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // 🔐 VERIFY OTP
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
      toast.error(err?.payload || err?.message || err?.eror || err || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // 🔑 RESET PASSWORD
  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await dispatch(
        changePassword({
          email: formData.email,
          password: formData.confirmPassword
        })
      ).unwrap();

      toast.success(res || "Password changed successfully");
      navigate("/login");

    } catch (err) {
      toast.error(err?.payload || err?.message || err?.error || err || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">

      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-md">

        <h2 className="text-xl font-bold text-center mb-4">
          Forgot Password
        </h2>

        {/* STEP 1: EMAIL */}
        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <input
              id="email"
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />

            <button
              className="w-full bg-green-600 text-white p-2 rounded"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        )}

        {/* STEP 2: OTP */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <input
              id="otp"
              type="text"
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />

            <button
              className="w-full bg-green-600 text-white p-2 rounded"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}

        {/* STEP 3: RESET PASSWORD */}
        {step === 3 && (
          <form onSubmit={handleChangePassword} className="space-y-4">

            <input
              id="newPassword"
              type="password"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />

            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />

            <button
              className="w-full bg-green-600 text-white p-2 rounded"
              disabled={loading}
            >
              {loading ? "Updating..." : "Reset Password"}
            </button>

          </form>
        )}

      </div>
    </div>
  );
};

export default ForgetPassword;