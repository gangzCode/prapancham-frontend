import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

type SignupModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState("signin");

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


    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={handleClose}
            ></div>


            <div className="relative bg-white p-8  shadow-lg w-full max-w-lg z-50">
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 rounded-full p-2 border-2 border-black w-8 h-8 flex items-center justify-center"
                ><X className="w-8 h-8 text-black" strokeWidth={4} />

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
                        <form>
                            <div className="mb-4">
                                <label htmlFor="name" className="block ">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
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
                                    placeholder="Enter Password"
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
                                    className="w-full px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-teal-600"
                            >
                                Create Account
                            </button>
                        </form>
                        <p className="mt-4 text-center ">
                            Already have an account{" "}
                            <button
                                className="text-primary font-semibold underline"
                                onClick={() => setActiveTab("signin")}>

                                Sign In
                            </button>
                        </p>
                    </div>
                }
                {activeTab === "signin" &&
                    <div className="h-[26rem]">
                        <form >
                            <div className="mb-4">
                                <label htmlFor="email" className="block ">
                                    Email Id
                                </label>
                                <input
                                    type="email"
                                    id="email"
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
                                    placeholder="Enter Password"
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
                                    onClick={() => {
                                        setActiveTab("forgot-password");
                                    }}
                                >
                                    Forget password?
                                </button>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-teal-600"
                            // onClick={SignIn}
                            >
                                Sign In
                            </button>

                        </form>
                        <p className="mt-4 text-center ">
                            Don't have an account{" "}
                            <button
                                className="text-primary font-semibold underline"
                                onClick={() => setActiveTab("signup")}>
                                Sign Up
                            </button>
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
                        <form >
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
                                    className="w-full px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                />
                            </div>
                            <button
                                type="submit"
                                onClick={() => { setActiveTab("otp") }}
                                className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-teal-600"
                            >
                                Send Verification Code
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
                        <form >
                            <h6 className="text-center text-[1rem] font-bold mb-2 text-primary">
                                Forgot Password?
                            </h6>
                            <p className="text-center  text-[0.75rem] mb-4 text-gray-600">
                                We have sent the verification code to <span className="text-primary font-bold">example@gmail.com</span>
                            </p>
                            <div className="mb-4 mt-4">
                                <label htmlFor="otp" className="block text-xl mb-2">
                                    Verification Code
                                </label>
                                <div className="flex space-x-2 justify-center">
                                    <input type="text" maxLength={1} className="w-12 md:w-14 h-12 border border-primary rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    <input type="text" maxLength={1} className="w-12 md:w-14 h-12 border border-primary rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    <input type="text" maxLength={1} className="w-12 md:w-14 h-12 border border-primary rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    <input type="text" maxLength={1} className="w-12 md:w-14 h-12 border border-primary rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    <input type="text" maxLength={1} className="w-12 md:w-14 h-12 border border-primary rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    <input type="text" maxLength={1} className="w-12 md:w-14 h-12 border border-primary rounded-lg text-center text-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                </div>

                            </div>
                            <button
                                type="submit"
                                onClick={() => { setActiveTab("reset-password") }}
                                className="w-full bg-primary text-white text-xl py-2 rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-teal-600"
                            >
                                Verify
                            </button>
                            <p className="mt-4 text-center ">
                                Didn't receive the code yet? {" "}
                                <button
                                    className="text-primary font-semibold underline"
                                // onClick={() => setActiveTab("signin")}
                                >
                                    Re-Send
                                </button>
                            </p>
                        </form>
                    </div>
                }
                {activeTab === "reset-password" &&
                    <div className="h--4">
                        <form >
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
                                    className="w-full px-3 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-teal-600"
                            >
                                Submit
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
