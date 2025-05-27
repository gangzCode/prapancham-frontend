import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

type SignupModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState("signin");
    const [signupData, setSignupData] = useState({ username: "", email: "", password: "", confirmPassword: "" });
    const [signupLoading, setSignupLoading] = useState(false);
    const [signupError, setSignupError] = useState("");
    const [signupSuccess, setSignupSuccess] = useState("");
    const [loginData, setLoginData] = useState({ username: "", password: "" });
    const [loginLoading, setLoginLoading] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [forgotEmail, setForgotEmail] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [otpLoading, setOtpLoading] = useState(false);
    const [otpError, setOtpError] = useState("");
    const [otpSuccess, setOtpSuccess] = useState("");
    const [resetPassword, setResetPassword] = useState("");
    const [resetConfirmPassword, setResetConfirmPassword] = useState("");
    const [resetLoading, setResetLoading] = useState(false);
    const [resetError, setResetError] = useState("");
    const [resetSuccess, setResetSuccess] = useState("");

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [onClose]);

    const handleClose = () => {
        setActiveTab("signin");
        onClose();
    };

    const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignupData({ ...signupData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setSignupError("");
        setSignupSuccess("");
        if (!signupData.username || !signupData.email || !signupData.password || !signupData.confirmPassword) {
            setSignupError("All fields are required.");
            return;
        }
        if (signupData.password.length < 6) {
            setSignupError("Password must be at least 6 characters.");
            return;
        }
        if (signupData.password !== signupData.confirmPassword) {
            setSignupError("Passwords do not match.");
            return;
        }
        setSignupLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: signupData.username,
                    email: signupData.email,
                    password: signupData.password
                })
            });
            if (res.ok) {
                alert("Account created successfully! Please sign in.");
                setSignupSuccess("");
                setSignupData({ username: "", email: "", password: "", confirmPassword: "" });
                setActiveTab("signin");
            } else {
                const data = await res.json();
                // Check for duplicate email error (MongoDB code 11000)
                if (data?.code === 11000 || data?.errorResponse?.code === 11000) {
                    alert("Email is already registered. Sign in to continue.");
                    setActiveTab("signin");
                } else {
                    setSignupError(data?.message || "Signup failed.");
                }
            }
        } catch (err) {
            setSignupError("Signup failed.");
        } finally {
            setSignupLoading(false);
        }
    };

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError("");
        setLoginLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: loginData.username,
                    password: loginData.password
                })
            });
            const data = await res.json();
            if (res.ok && data.accessToken) {
                localStorage.setItem("accessToken", data.accessToken);
                const { accessToken, ...userData } = data;
                localStorage.setItem("user", JSON.stringify(userData));
                alert("Login successful!");
                handleClose();
                // window.location.href = "/profile";
            } else {
                setLoginError(data?.message || "Login failed.");
            }
        } catch (err) {
            setLoginError("Login failed.");
        } finally {
            setLoginLoading(false);
        }
    };

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setOtpError("");
        setOtpSuccess("");
        setOtpLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/forgot-password/send-code`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: forgotEmail })
            });
            if (res.ok) {
                setOtpSuccess("Verification code sent!");
                setActiveTab("otp");
            } else {
                const data = await res.json();
                setOtpError(data?.message || "Failed to send code.");
            }
        } catch {
            setOtpError("Failed to send code.");
        } finally {
            setOtpLoading(false);
        }
    };

    const handleResendOtp = async () => {
        setOtpError("");
        setOtpSuccess("");
        setOtpLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/forgot-password/resend-code`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: forgotEmail })
            });
            if (res.ok) {
                setOtpSuccess("Verification code resent!");
            } else {
                const data = await res.json();
                setOtpError(data?.message || "Failed to resend code.");
            }
        } catch {
            setOtpError("Failed to resend code.");
        } finally {
            setOtpLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setOtpError("");
        setOtpSuccess("");
        setOtpLoading(true);
        const code = otp.join("");
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/forgot-password/verify-code`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: forgotEmail, code })
            });
            if (res.ok) {
                setOtpSuccess("Code verified! Set your new password.");
                setActiveTab("reset-password");
                setOtp(["", "", "", "", "", ""]); // Clear OTP field after submit
            } else {
                const data = await res.json();
                setOtpError(data?.message || "Invalid code.");
            }
        } catch {
            setOtpError("Invalid code.");
        } finally {
            setOtpLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setResetError("");
        setResetSuccess("");
        if (!resetPassword || !resetConfirmPassword) {
            setResetError("Both fields are required.");
            return;
        }
        if (resetPassword.length < 6) {
            setResetError("Password must be at least 6 characters.");
            return;
        }
        if (resetPassword !== resetConfirmPassword) {
            setResetError("Passwords do not match.");
            return;
        }
        setResetLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/forgot-password/reset`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: forgotEmail,
                    newPassword: resetPassword,
                    confirmPassword: resetConfirmPassword
                })
            });
            if (res.ok) {
                setResetSuccess("Password reset successful! Please sign in.");
                setActiveTab("signin");
                setResetPassword("");
                setResetConfirmPassword("");
            } else {
                const data = await res.json();
                setResetError(data?.message || "Failed to reset password.");
            }
        } catch {
            setResetError("Failed to reset password.");
        } finally {
            setResetLoading(false);
        }
    };

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={handleClose}
            ></div>
            <div className="relative bg-white p-8 shadow-lg w-full max-w-lg z-50">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 rounded-full p-2 border-2 border-black w-8 h-8 flex items-center justify-center"
                >
                    <X className="w-8 h-8 text-black" strokeWidth={4} />
                </button>
                {(activeTab === "signup" || activeTab === "signin") &&
                    <div className="flex border border-primary p-2 rounded-lg mb-4 w-48 justify-center items-center mx-auto mt-8">
                        <button
                            className={
                                `py-2 w-full font-medium text-sm border-b-2 -mb-px ${activeTab === "signup"
                                    ? "bg-primary text-white font-bold rounded"
                                    : "border-transparent text-[#0B4157] hover:text-gray-900"
                                }`
                            }
                            onClick={() => setActiveTab("signup")}
                        >
                            Sign Up
                        </button>
                        <button
                            className={
                                `py-2 w-full font-medium text-sm border-b-2 -mb-px ${activeTab === "signin"
                                    ? "bg-primary text-white font-bold rounded"
                                    : "border-transparent text-gray-700 hover:text-gray-900"
                                }`
                            }
                            onClick={() => setActiveTab("signin")}
                        >
                            Sign In
                        </button>
                    </div>
                }
                {activeTab === "signup" &&
                    <div className="h-[26rem]">
                        <form onSubmit={handleSignup}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block ">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="username"
                                    value={signupData.username}
                                    onChange={handleSignupChange}
                                    className="w-full px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block ">
                                    Email Id
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={signupData.email}
                                    onChange={handleSignupChange}
                                    className="w-full px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block ">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Enter Password"
                                    value={signupData.password}
                                    onChange={handleSignupChange}
                                    className="w-full px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="confirm-password" className="block ">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="confirm-password"
                                    name="confirmPassword"
                                    placeholder="Enter Password"
                                    value={signupData.confirmPassword}
                                    onChange={handleSignupChange}
                                    className="w-full px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                />
                            </div>
                            {signupError && <div className="text-red-500 mb-2 text-center">{signupError}</div>}
                            <button
                                type="submit"
                                className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-teal-600"
                                disabled={signupLoading}
                            >
                                {signupLoading ? "Creating..." : "Create Account"}
                            </button>
                        </form>
                        <p className="mt-4 text-center ">
                            Already have an account{" "}
                            <button
                                className="text-primary font-semibold underline"
                                onClick={() => setActiveTab("signin")}>Sign In</button>
                        </p>
                    </div>
                }
                {activeTab === "signin" &&
                    <div className="h-[26rem]">
                        <form onSubmit={handleLogin}>
                            <div className="mb-4">
                                <label htmlFor="username" className="block ">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={loginData.username}
                                    onChange={handleLoginChange}
                                    className="w-full px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block ">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Enter Password"
                                    value={loginData.password}
                                    onChange={handleLoginChange}
                                    className="w-full px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                />
                            </div>
                            <div className="flex items-center justify-between mt-4 mb-6">
                                <label className="flex items-center">
                                    <input className="form-checkbox h-4 w-4 text-primary" type="checkbox" />
                                    <span className="ml-2 ">
                                        Remember me
                                    </span>
                                </label>
                                <button
                                    className="text-primary font-bold  underline"
                                    type="button"
                                    onClick={() => {
                                        setActiveTab("forgot-password");
                                    }}
                                >
                                    Forget password?
                                </button>
                            </div>
                            {loginError && <div className="text-red-500 mb-2 text-center">{loginError}</div>}
                            <button
                                type="submit"
                                className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-teal-600"
                                disabled={loginLoading}
                            >
                                {loginLoading ? "Signing in..." : "Sign In"}
                            </button>
                        </form>
                        <p className="mt-4 text-center ">
                            Don't have an account{" "}
                            <button
                                className="text-primary font-semibold underline"
                                onClick={() => setActiveTab("signup")}>Sign Up</button>
                        </p>
                        <div className="flex items-center my-4">
                            <hr className="flex-grow ml-20 border-black" />
                            <span className="mx-2 ">
                                OR
                            </span>
                            <hr className="flex-grow mr-20 border-black" />
                        </div>
                        <button className="w-full py-2 flex items-center justify-center border border-primary rounded-lg">
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.23 9.22 3.25l6.9-6.9C35.67 2.28 30.18 0 24 0 14.64 0 6.61 5.7 2.68 13.92l8.14 6.32C12.69 13.03 17.9 9.5 24 9.5z" />
                                <path fill="#4285F4" d="M46.1 24.5c0-1.44-.12-2.83-.34-4.17H24v7.89h12.42c-.54 2.9-2.15 5.36-4.57 7.02v5.84h7.38C43.86 37.43 46.1 31.49 46.1 24.5z" />
                                <path fill="#FBBC05" d="M10.82 28.77a14.85 14.85 0 0 1 0-9.54v-6.3H2.68a24.01 24.01 0 0 0 0 22.15l8.14-6.31z" />
                                <path fill="#34A853" d="M24 48c6.18 0 11.36-2.03 15.13-5.52l-7.38-5.84c-2.06 1.38-4.71 2.18-7.75 2.18-6.1 0-11.31-3.53-13.18-8.65l-8.14 6.31C6.61 42.3 14.64 48 24 48z" />
                                <path fill="none" d="M0 0h48v48H0z" />
                            </svg>
                            <span className="text-primary">
                                Continue with Google
                            </span>
                        </button>
                    </div>
                }
                {activeTab === "forgot-password" &&
                    <div className=" h-64">
                        <form onSubmit={handleSendOtp}>
                            <h6 className="text-center text-[1rem] font-bold mb-2 text-primary">
                                Forgot Password?
                            </h6>
                            <p className="text-center  text-[0.75rem] mb-4 text-gray-600">
                                Enter your email address and we will send you a verification link
                            </p>
                            <div className="mb-4">
                                <label htmlFor="email" className="block ">
                                    Email Id
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={forgotEmail}
                                    onChange={e => setForgotEmail(e.target.value)}
                                    className="w-full px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                />
                            </div>
                            {otpError && <div className="text-red-500 mb-2 text-center">{otpError}</div>}
                            {otpSuccess && <div className="text-green-500 mb-2 text-center">{otpSuccess}</div>}
                            <button
                                type="submit"
                                className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-teal-600"
                                disabled={otpLoading}
                            >
                                {otpLoading ? "Sending..." : "Send Verification Code"}
                            </button>
                        </form>
                        <p className="mt-4 text-center ">
                            Go to {" "}
                            <button
                                className="text-primary font-semibold underline"
                                onClick={() => setActiveTab("signin")}>
                                Sign In
                            </button>
                        </p>
                    </div>
                }
                {activeTab === "otp" &&
                    <div className="h-64">
                        <form onSubmit={handleVerifyOtp}>
                            <h6 className="text-center text-[1rem] font-bold mb-2 text-primary">
                                Forgot Password?
                            </h6>
                            <p className="text-center  text-[0.75rem] mb-4 text-gray-600">
                                We have sent the verification code to <span className="text-primary font-bold">{forgotEmail}</span>
                            </p>
                            <div className="mb-4 mt-4">
                                <label htmlFor="otp" className="block text-xl mb-2">
                                    Verification Code
                                </label>
                                <div className="flex space-x-2 justify-center">
                                    {otp.map((digit, idx) => (
                                        <input
                                            key={idx}
                                            type="text"
                                            maxLength={1}
                                            className="w-12 md:w-14 h-12 border border-primary rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={digit}
                                            onChange={e => {
                                                const val = e.target.value.replace(/[^0-9]/g, "");
                                                const newOtp = [...otp];
                                                newOtp[idx] = val;
                                                setOtp(newOtp);
                                                // Auto-focus next
                                                if (val && idx < 5) {
                                                    const next = document.querySelectorAll<HTMLInputElement>('input[type="text"][maxLength="1"]')[idx + 1];
                                                    next?.focus();
                                                }
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                            {otpError && <div className="text-red-500 mb-2 text-center">{otpError}</div>}
                            {otpSuccess && <div className="text-green-500 mb-2 text-center">{otpSuccess}</div>}
                            <button
                                type="submit"
                                className="w-full bg-primary text-white text-xl py-2 rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-teal-600"
                                disabled={otpLoading}
                            >
                                {otpLoading ? "Verifying..." : "Verify"}
                            </button>
                            <p className="mt-4 text-center ">
                                Didn't receive the code yet? {" "}
                                <button
                                    className="text-primary font-semibold underline"
                                    type="button"
                                    onClick={handleResendOtp}
                                    disabled={otpLoading}
                                >
                                    {otpLoading ? "Resending..." : "Re-Send"}
                                </button>
                            </p>
                        </form>
                    </div>
                }
                {activeTab === "reset-password" &&
                    <div className="h--4">
                        <form onSubmit={handleResetPassword}>
                            <h6 className="text-center text-[1rem] font-bold mb-2 text-primary">
                                Forgot Password?
                            </h6>
                            <p className="text-center  text-[0.75rem] mb-4 text-gray-600">
                                Enter your new password here. Keep the password different from the old one.
                            </p>
                            <div className="mb-4">
                                <label htmlFor="password" className="block ">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Enter Password"
                                    value={resetPassword}
                                    onChange={e => setResetPassword(e.target.value)}
                                    className="w-full px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="confirm-password" className="block ">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="confirm-password"
                                    placeholder="Enter Password"
                                    value={resetConfirmPassword}
                                    onChange={e => setResetConfirmPassword(e.target.value)}
                                    className="w-full px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                />
                            </div>
                            {resetError && <div className="text-red-500 mb-2 text-center">{resetError}</div>}
                            {resetSuccess && <div className="text-green-500 mb-2 text-center">{resetSuccess}</div>}
                            <button
                                type="submit"
                                className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-teal-600"
                                disabled={resetLoading}
                            >
                                {resetLoading ? "Submitting..." : "Submit"}
                            </button>
                        </form>
                    </div>
                }
            </div>
        </div>,
        document.body
    );
};

export default SignupModal;
