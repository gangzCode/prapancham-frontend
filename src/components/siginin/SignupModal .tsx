import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { useLanguage } from "@/components/ui/LanguageProvider";

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
    const { language } = useLanguage();

    type LanguageKey = 'en' | 'ta' | 'si';
    const translations: Record<LanguageKey, { [key: string]: string }> = {
        en: {
            signup: "Sign Up",
            signin: "Sign In",
            forgotPassword: "Forgot Password?",
            sendVerificationCode: "Send Verification Code",
            resendCode: "Re-Send",
            verify: "Verify",
            resetPassword: "Reset Password",
            createAccount: "Create Account",
            loginSuccessful: "Login successful!",
            accountCreated: "Account created successfully! Please sign in.",
            allFieldsRequired: "All fields are required.",
            passwordMismatch: "Passwords do not match.",
            passwordLengthError: "Password must be at least 6 characters.",
            emailAlreadyRegistered: "Email is already registered. Sign in to continue.",
            name: "Username",
            email: "Email Id",
            password: "Password",
            enterPassword: "Enter Password",
            confirmPassword: "Confirm Password",
            username: "Username",
            alreadyHaveAccount: "Already have an account?",
            dontHaveAccount: "Don't have an account?",
            or: "OR",
            continueWithGoogle: "Continue with Google",
            enterEmailToSendLink: "Enter your email address and we will send you a verification link",
            sending: "Sending...",
            goTo: "Go to",
            codeSentTo: "We have sent the verification code to",
            verificationCode: "Verification Code",
            didNotReceiveCode: "Didn't receive the code yet?",
            enterNewPassword: "Enter your new password here. Keep the password different from the old one.",
            newPassword: "New Password",
            submitting: "Submitting...",
            submit: "Submit",
            Resending: "Resending...",
            Verifying: "Verifying...",
            signup_failed: "Signup failed.",
            login_failed: "Login failed.",
            verificationCodeSent: "Verification code sent to your email.",
            failed_to_send_code: "Failed to send code.",
            verificationCoderesent: "Verification code resent!",
            failedToResendCode: "Failed to resend code.",
            codeVerifiedSetNewPassword: "Code verified! Set your new password.",
            invalidCode: "Invalid code.",
            bothFieldsRequired: "Both fields are required.",
            PasswordResetSuccessful: "Password reset successful! Please sign in.",
            failedToResetPassword: "Failed to reset password.",
            signingin: "Signing in...",
            signupVerification: "Enter OTP"

        },
        ta: {
            signup: "பதிவு செய்ய",
            signin: "உள்நுழைய",
            forgotPassword: "கடவுச்சொல்லை மறந்துவிட்டீர்களா?",
            sendVerificationCode: "சரிபார்ப்பு குறியீட்டை அனுப்பவும்",
            resendCode: "மீண்டும் அனுப்பவும்",
            verify: "சரிபார்க்கவும்",
            resetPassword: "கடவுச்சொல்லை மீட்டமைக்கவும்",
            createAccount: "கணக்கை உருவாக்கவும்",
            loginSuccessful: "உள்நுழைவு வெற்றிகரமாக!",
            accountCreated: "கணக்கு வெற்றிகரமாக உருவாக்கப்பட்டது! தயவுசெய்து உள்நுழைக.",
            allFieldsRequired: "அனைத்து புலங்களும் தேவை.",
            passwordMismatch: "கடவுச்சொற்கள் பொருந்தவில்லை.",
            passwordLengthError: "கடவுச்சொல் குறைந்தது 6 எழுத்துகள் இருக்க வேண்டும்.",
            emailAlreadyRegistered: "மின்னஞ்சல் ஏற்கனவே பதிவு செய்யப்பட்டுள்ளது. தொடர உள்நுழைக.", name: "பெயர்",
            email: "மின்னஞ்சல் ஐடி",
            password: "கடவுச்சொல்",
            enterPassword: "கடவுச்சொல்லை உள்ளிடவும்",
            confirmPassword: "கடவுச்சொல்லை உறுதிப்படுத்தவும்",
            username: "பயனர் பெயர்",
            alreadyHaveAccount: "ஏற்கனவே கணக்கு உள்ளதா?",
            dontHaveAccount: "கணக்கு இல்லையா?",
            or: "அல்லது",
            continueWithGoogle: "Google மூலம் தொடரவும்",
            enterEmailToSendLink: "தயவுசெய்து உங்கள் மின்னஞ்சல் முகவரியை உள்ளிடவும், உறுதிப்படுத்தும் இணைப்பு அனுப்பப்படும்",
            sending: "அனுப்புகிறது...",
            goTo: "செல்ல",
            codeSentTo: "உறுதிப்படுத்தும் குறியீடு அனுப்பப்பட்டுள்ளது",
            verificationCode: "உறுதிப்படுத்தல் குறியீடு",
            didNotReceiveCode: "குறியீட்டை இன்னும் பெறவில்லையா?",
            enterNewPassword: "உங்கள் புதிய கடவுச்சொல்லை இங்கே உள்ளிடவும். பழைய கடவுச்சொல்லை விட வேறுபட்டதாக இருக்க வேண்டும்.",
            newPassword: "புதிய கடவுச்சொல்",
            submitting: "சமர்ப்பிக்கிறது...",
            submit: "சமர்ப்பிக்கவும்",
            Resending: "மீண்டும் அனுப்புகிறது...",
            Verifying: "சரிபார்க்கிறது...",
            signup_failed: "பதிவு தோல்வியடைந்தது.",
            login_failed: "உள்நுழைவு தோல்வியடைந்தது.",
            verificationCodeSent: "உங்கள் மின்னஞ்சலுக்கு சரிபார்ப்பு குறியீடு அனுப்பப்பட்டது.",
            failed_to_send_code: "குறியீட்டை அனுப்புவதில் தோல்வி.",
            verificationCoderesent: "சரிபார்ப்பு குறியீடு மீண்டும் அனுப்பப்பட்டது!",
            failedToResendCode: "குறியீட்டை மீண்டும் அனுப்புவதில் தோல்வி.",
            codeVerifiedSetNewPassword: "குறியீடு சரிபார்க்கப்பட்டது! உங்கள் புதிய கடவுச்சொல்லை அமைக்கவும்.",
            invalidCode: "தவறான குறியீடு.",
            bothFieldsRequired: "இரு புலங்களும் தேவை.",
            PasswordResetSuccessful: "கடவுச்சொல் மீட்டமைப்பு வெற்றிகரமாக! தயவுசெய்து உள்நுழைக.",
            failedToResetPassword: "கடவுச்சொல்லை மீட்டமைப்பதில் தோல்வி.",
            signingin: "உள்நுழைகிறது...",
            signupVerification: "OTP ஐ உள்ளிடவும்"
        },
        si: {
            signup: "ලියාපදිංචි වන්න",
            signin: "පිවිසෙන්න",
            forgotPassword: "මුරපදය අමතක වුණාද?",
            sendVerificationCode: "සත්‍යාපන කේතය යවන්න",
            resendCode: "නැවත යවන්න",
            verify: "සත්‍යාපනය කරන්න",
            resetPassword: "මුරපදය නැවත සකසන්න",
            createAccount: "ගිණුම සාදන්න",
            loginSuccessful: "පිවිසීම සාර්ථකයි!",
            accountCreated: "ගිණුම සාර්ථකව සාදන ලදී! කරුණාකර පිවිසෙන්න.",
            allFieldsRequired: "සියලුම ක්ෂේත්‍ර අවශ්‍ය වේ.",
            passwordMismatch: "මුරපද නොගැලපේ.",
            passwordLengthError: "මුරපදය අවම වශයෙන් 6 අක්ෂර තිබිය යුතුය.",
            emailAlreadyRegistered: "ඊමේල් ලිපිනය දැනටමත් ලියාපදිංචි කර ඇත. දිගටම පිවිසෙන්න.", name: "නාමය",
            email: "ඊමේල් ලිපිනය",
            password: "මුරපදය",
            enterPassword: "මුරපදය ඇතුලත් කරන්න",
            confirmPassword: "මුරපදය තහවුරු කරන්න",
            username: "පරිශීලක නාමය",
            alreadyHaveAccount: "දැනටමත් ගිණුමක් තිබේද?",
            dontHaveAccount: "ගිණුමක් නැද්ද?",
            or: "හෝ",
            continueWithGoogle: "Google සමඟ ඉදිරියට යන්න",
            enterEmailToSendLink: "ඔබගේ විද්යුත් තැපෑල ඇතුළත් කරන්න, අපි සත්‍යාපන සබැඳියක් එවන්නෙමු",
            sending: "යවමින්...",
            goTo: "යන්න",
            codeSentTo: "අපි සත්‍යාපන කේතය එවූයේ",
            verificationCode: "සත්‍යාපන කේතය",
            didNotReceiveCode: "තවම කේතය ලැබී නැද්ද?",
            enterNewPassword: "ඔබේ නව මුරපදය මෙහි ඇතුළත් කරන්න. එය පැරණි එකට වෙනස් විය යුතුය.",
            newPassword: "නව මුරපදය",
            submitting: "ඉදිරිපත් කරමින්...",
            submit: "ඉදිරිපත් කරන්න",
            Resending: "නැවත යවමින්...",
            Verifying: "සත්‍යාපනය කරමින්...",
            signup_failed: "ලියාපදිංචි අසාර්ථක විය.",
            login_failed: "පිවිසීම අසාර්ථක විය.",
            verificationCodeSent: "ඔබගේ විද්යුත් තැපෑලට සත්‍යාපන කේතය යවා ඇත.",
            failed_to_send_code: "කේතය යැවීමට අසමත් විය.",
            verificationCoderesent: "සත්‍යාපන කේතය නැවත යවා ඇත!",
            failedToResendCode: "කේතය නැවත යැවීමට අසමත් විය.",
            codeVerifiedSetNewPassword: "කේතය සත්‍යාපනය කර ඇත! ඔබේ නව මුරපදය සකසන්න.",
            invalidCode: "අවලංගු කේතය.",
            bothFieldsRequired: "දෙකම ක්ෂේත්‍ර අවශ්‍ය වේ.",
            PasswordResetSuccessful: "මුරපදය නැවත සකස් කිරීම සාර්ථකයි! කරුණාකර පිවිසෙන්න.",
            failedToResetPassword: "මුරපදය නැවත සකස් කිරීමට අසමත් විය.",
            signingin: "පිවිසෙමින්...",
            signupVerification: "OTP ඇතුළු කරන්න"

        }
    };

    let langKey: LanguageKey;

    if (language === "tamil") langKey = "ta";
    else if (language === "sinhala") langKey = "si";
    else langKey = "en";

    const t = translations[langKey];

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
        const { name, value } = e.target;
        setSignupData({ ...signupData, [name]: value });

        if (name === "email") {
            setForgotEmail(value);
        }
    };


    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setSignupError("");
        setSignupSuccess("");
        if (!signupData.username || !signupData.email || !signupData.password || !signupData.confirmPassword) {
            setSignupError(t.allFieldsRequired);
            toast.error(t.allFieldsRequired);
            return;
        }
        if (signupData.password.length < 6) {
            setSignupError(t.passwordLengthError);
            toast.error(t.passwordLengthError);
            return;
        }
        if (signupData.password !== signupData.confirmPassword) {
            setSignupError(t.passwordMismatch);
            toast.error(t.passwordMismatch);
            return;
        }
        setSignupLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/start-registration`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: signupData.username,
                    email: signupData.email,
                    password: signupData.password
                })
            });
            if (res.ok) {
                toast.success(t.accountCreated);
                setSignupSuccess("");
                setSignupData({ username: "", email: "", password: "", confirmPassword: "" });
                setActiveTab("SignupOtp");
            } else {
                const data = await res.json();
                if (data?.code === 11000 || data?.errorResponse?.code === 11000) {
                    setSignupError(t.emailAlreadyRegistered);
                    toast.error(t.emailAlreadyRegistered);
                    setActiveTab("signin");
                } else {
                    setSignupError(data?.message || t.signup_failed);
                    toast.error(data?.message || t.signup_failed);
                }
            }
        } catch (err) {
            setSignupError(t.signup_failed);
            toast.error(t.signup_failed);
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
                toast.success(t.loginSuccessful);
                handleClose();
            } else {
                setLoginError(data?.message || t.login_failed);
                toast.error(data?.message || t.login_failed);
            }
        } catch (err) {
            setLoginError(t.login_failed);
            toast.error(t.login_failed);
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
                setOtpSuccess(t.verificationCodeSent);
                toast.success(t.verificationCodeSent);
                setActiveTab("otp");
            } else {
                const data = await res.json();
                setOtpError(data?.message || t.failed_to_send_code);
                toast.error(data?.message || t.failed_to_send_code);
            }
        } catch {
            setOtpError(t.failed_to_send_code);
            toast.error(t.failed_to_send_code);
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
                setOtpSuccess(t.verificationCoderesent);
                toast.success(t.verificationCoderesent);
            } else {
                const data = await res.json();
                setOtpError(data?.message || t.failedToResendCode);
                toast.error(data?.message || t.failedToResendCode);
            }
        } catch {
            setOtpError(t.failedToResendCode);
            toast.error(t.failedToResendCode);
        } finally {
            setOtpLoading(false);
        }
    };

    const handleSignupResendOtp = async () => {
        setOtpError("");
        setOtpSuccess("");
        setOtpLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/resend-code`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: forgotEmail })
            });
            if (res.ok) {
                setOtpSuccess(t.verificationCoderesent);
                toast.success(t.verificationCoderesent);
            } else {
                const data = await res.json();
                setOtpError(data?.message || t.failedToResendCode);
                toast.error(data?.message || t.failedToResendCode);
            }
        } catch {
            setOtpError(t.failedToResendCode);
            toast.error(t.failedToResendCode);
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
                setOtpSuccess(t.codeVerifiedSetNewPassword);
                toast.success(t.codeVerifiedSetNewPassword);
                setActiveTab("reset-password");
                setOtp(["", "", "", "", "", ""]);
            } else {
                const data = await res.json();
                setOtpError(data?.message || t.invalidCode);
                toast.error(data?.message || t.invalidCode);
            }
        } catch {
            setOtpError(t.invalidCode);
            toast.error(t.invalidCode);
        } finally {
            setOtpLoading(false);
        }
    };

    const handleSignupVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setOtpError("");
        setOtpSuccess("");
        setOtpLoading(true);
        const code = otp.join("");
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/verify-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: forgotEmail, otp: code })
            });
            if (res.ok) {
                setOtpSuccess(t.accountCreated);
                toast.success(t.accountCreated);
                setActiveTab("signin");
                setOtp(["", "", "", "", "", ""]);
            } else {
                const data = await res.json();
                setOtpError(data?.message || t.invalidCode);
                toast.error(data?.message || t.invalidCode);
            }
        } catch {
            setOtpError(t.invalidCode);
            toast.error(t.invalidCode);
        } finally {
            setOtpLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setResetError("");
        setResetSuccess("");
        if (!resetPassword || !resetConfirmPassword) {
            setResetError(t.bothFieldsRequired);
            toast.error(t.bothFieldsRequired);
            return;
        }
        if (resetPassword.length < 6) {
            setResetError(t.passwordLengthError);
            toast.error(t.passwordLengthError);
            return;
        }
        if (resetPassword !== resetConfirmPassword) {
            setResetError(t.passwordMismatch);
            toast.error(t.passwordMismatch);
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
                setResetSuccess(t.PasswordResetSuccessful);
                toast.success(t.PasswordResetSuccessful);
                setActiveTab("signin");
                setResetPassword("");
                setResetConfirmPassword("");
            } else {
                const data = await res.json();
                setResetError(data?.message || t.failedToResetPassword);
                toast.error(data?.message || t.failedToResetPassword);
            }
        } catch {
            setResetError(t.failedToResetPassword);
            toast.error(t.failedToResetPassword);
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
                                    : "border-transparent text-[#0D1322] hover:text-gray-900"
                                }`
                            }
                            onClick={() => setActiveTab("signup")}
                        >
                            {t.signup}
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
                            {t.signin}
                        </button>
                    </div>
                }
                {activeTab === "signup" &&
                    <div className="h-[26rem]">
                        <form onSubmit={handleSignup}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block ">
                                    {t.name}
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
                                    {t.email}
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
                                    {t.password}
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder={t.enterPassword}
                                    value={signupData.password}
                                    onChange={handleSignupChange}
                                    className="w-full px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="confirm-password" className="block ">
                                    {t.confirmPassword}
                                </label>
                                <input
                                    type="password"
                                    id="confirm-password"
                                    name="confirmPassword"
                                    placeholder={t.enterPassword}
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
                                {signupLoading ? "Creating..." : t.createAccount}
                            </button>
                        </form>
                        <p className="mt-4 text-center ">
                            {t.alreadyHaveAccount}{" "}
                            <button
                                className="text-primary font-semibold underline"
                                onClick={() => setActiveTab("signin")}> {t.signin}</button>
                        </p>
                    </div>
                }
                {activeTab === "SignupOtp" &&
                    <div className="h-64">
                        <form onSubmit={handleSignupVerifyOtp}>
                            <h6 className="text-center text-[1rem] font-bold mb-2 text-primary">
                                {t.signupVerification}
                            </h6>
                            <p className="text-center text-[0.75rem] mb-4 text-gray-600">
                                {t.codeSentTo} <span className="text-primary font-bold">{forgotEmail}</span>
                            </p>
                            <div className="mb-4 mt-4">
                                <label htmlFor="otp" className="block text-xl mb-2">
                                    {t.verificationCode} <span className="text-red-500">*</span>
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
                                {otpLoading ? t.verifying : t.verify}
                            </button>
                            <p className="mt-4 text-center ">
                                {t.didNotReceiveCode}{" "}
                                <button
                                    className="text-primary font-semibold underline"
                                    type="button"
                                    onClick={handleSignupResendOtp}
                                    disabled={otpLoading}
                                >
                                    {otpLoading ? t.resending : t.resendCode}
                                </button>
                            </p>
                        </form>
                    </div>

                }
                {activeTab === "signin" &&
                    <div className="h-[20rem]">
                        <form onSubmit={handleLogin}>
                            <div className="mb-4">
                                <label htmlFor="username" className="block ">
                                    {t.username}
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
                                    {t.password}
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder={t.enterPassword}
                                    value={loginData.password}
                                    onChange={handleLoginChange}
                                    className="w-full px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                />
                            </div>
                            <div className="flex items-center justify-between mt-4 mb-6">
                                <label className="flex items-center">
                                    {/* <input className="form-checkbox h-4 w-4 text-primary" type="checkbox" />
                                    <span className="ml-2 ">
                                        Remember me
                                    </span> */}
                                </label>
                                <button
                                    className="text-primary font-bold  underline"
                                    type="button"
                                    onClick={() => {
                                        setActiveTab("forgot-password");
                                    }}
                                >
                                    {t.forgotPassword}
                                </button>
                            </div>
                            {loginError && <div className="text-red-500 mb-2 text-center">{loginError}</div>}
                            <button
                                type="submit"
                                className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-teal-600"
                                disabled={loginLoading}
                            >
                                {loginLoading ? t.signingin : t.signin}
                            </button>
                        </form>
                        <p className="mt-4 text-center ">
                            {t.dontHaveAccount}{" "}
                            <button
                                className="text-primary font-semibold underline"
                                onClick={() => setActiveTab("signup")}>{t.signup}</button>
                        </p>
                        {/* <div className="flex items-center my-4">
                            <hr className="flex-grow ml-20 border-black" />
                            <span className="mx-2 ">
                                {t.or}
                            </span>
                            <hr className="flex-grow mr-20 border-black" />
                        </div> */}
                        {/* <button className="w-full py-2 flex items-center justify-center border border-primary rounded-lg">
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.23 9.22 3.25l6.9-6.9C35.67 2.28 30.18 0 24 0 14.64 0 6.61 5.7 2.68 13.92l8.14 6.32C12.69 13.03 17.9 9.5 24 9.5z" />
                                <path fill="#4285F4" d="M46.1 24.5c0-1.44-.12-2.83-.34-4.17H24v7.89h12.42c-.54 2.9-2.15 5.36-4.57 7.02v5.84h7.38C43.86 37.43 46.1 31.49 46.1 24.5z" />
                                <path fill="#FBBC05" d="M10.82 28.77a14.85 14.85 0 0 1 0-9.54v-6.3H2.68a24.01 24.01 0 0 0 0 22.15l8.14-6.31z" />
                                <path fill="#34A853" d="M24 48c6.18 0 11.36-2.03 15.13-5.52l-7.38-5.84c-2.06 1.38-4.71 2.18-7.75 2.18-6.1 0-11.31-3.53-13.18-8.65l-8.14 6.31C6.61 42.3 14.64 48 24 48z" />
                                <path fill="none" d="M0 0h48v48H0z" />
                            </svg>
                            <span className="text-primary">
                                {t.continueWithGoogle}
                            </span>
                        </button> */}
                    </div>
                }
                {activeTab === "forgot-password" &&
                    <div className=" h-64">
                        <form onSubmit={handleSendOtp}>
                            <h6 className="text-center text-[1rem] font-bold mb-2 text-primary">
                                {t.forgotPassword}
                            </h6>
                            <p className="text-center  text-[0.75rem] mb-4 text-gray-600">
                                {t.enterEmailToSendLink}
                            </p>
                            <div className="mb-4">
                                <label htmlFor="email" className="block ">
                                    {t.email} <span className="text-red-500">*</span>
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
                                {otpLoading ? t.sending : t.sendVerificationCode}
                            </button>
                        </form>
                        <p className="mt-4 text-center ">
                            {t.goTo} {" "}
                            <button
                                className="text-primary font-semibold underline"
                                onClick={() => setActiveTab("signin")}>
                                {t.signin}
                            </button>
                        </p>
                    </div>
                }
                {activeTab === "otp" &&
                    <div className="h-64">
                        <form onSubmit={handleVerifyOtp}>
                            <h6 className="text-center text-[1rem] font-bold mb-2 text-primary">
                                {t.forgotPassword}
                            </h6>
                            <p className="text-center  text-[0.75rem] mb-4 text-gray-600">
                                {t.codeSentTo} <span className="text-primary font-bold">{forgotEmail}</span>
                            </p>
                            <div className="mb-4 mt-4">
                                <label htmlFor="otp" className="block text-xl mb-2">
                                    {t.verificationCode} <span className="text-red-500">*</span>
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
                                {otpLoading ? t.Verifying : t.verify}
                            </button>
                            <p className="mt-4 text-center ">
                                {t.didNotReceiveCode} {" "}
                                <button
                                    className="text-primary font-semibold underline"
                                    type="button"
                                    onClick={handleResendOtp}
                                    disabled={otpLoading}
                                >
                                    {otpLoading ? t.Resending : t.resendCode}
                                </button>
                            </p>
                        </form>
                    </div>
                }
                {activeTab === "reset-password" &&
                    <div className="h--4">
                        <form onSubmit={handleResetPassword}>
                            <h6 className="text-center text-[1rem] font-bold mb-2 text-primary">
                                {t.forgotPassword}
                            </h6>
                            <p className="text-center  text-[0.75rem] mb-4 text-gray-600">
                                {t.enterNewPassword}
                            </p>
                            <div className="mb-4">
                                <label htmlFor="password" className="block ">
                                    {t.newPassword} <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder={t.enterPassword}
                                    value={resetPassword}
                                    onChange={e => setResetPassword(e.target.value)}
                                    className="w-full px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="confirm-password" className="block ">
                                    {t.confirmPassword} <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    id="confirm-password"
                                    placeholder={t.confirmPassword}
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
                                {resetLoading ? t.submitting : t.submit}
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
