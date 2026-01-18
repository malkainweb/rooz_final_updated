"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CodeModal = ({ isOpen, onClose }: CodeModalProps) => {
  const [step, setStep] = useState<"code" | "details">("code");
  const [code, setCode] = useState<string[]>(["", "", "", "", "", "", ""]);
  const [formData, setFormData] = useState({
    firstName: "",
    title: "",
    school: "",
    email: "",
    phone: "",
    code: "",
  });

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 6) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleContinue = () => {
    const enteredCode = code.join("");
    if (enteredCode.length === 7) {
      setStep("details");
    }
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Handle form submission here
    onClose();
  };

  const isFormValid =
    formData.firstName &&
    formData.title &&
    formData.school &&
    formData.email &&
    formData.code;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[white]/30 backdrop-blur-md p-[3vh] lg:p-[5vh]"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full h-full flex items-center justify-center bg-black rounded-[40px] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all z-50"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            <AnimatePresence mode="wait">
              {/* Step 1: Code Entry */}
              {step === "code" && (
                <motion.div
                  key="code-step"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="flex flex-col items-center px-4"
                >
                  <h3 className="text-white text-xl md:text-2xl font-medium mb-2">
                    Enter code
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base mb-8 md:mb-12">
                    Enter 7 digits code to continue
                  </p>

                  <div className="flex gap-2 md:gap-3 mb-8 md:mb-12">
                    {code.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el: any) => (inputRefs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-12 h-12 md:w-16 md:h-16 bg-[#2A2A2A] border border-[#3A3A3A] rounded-xl text-white text-center text-xl md:text-2xl font-medium focus:outline-none focus:border-pink-500 transition-all"
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleContinue}
                    disabled={code.join("").length !== 7}
                    className="bg-gradient-to-r from-pink-500 to-[#FF004C] px-12 md:px-16 py-3 md:py-4 rounded-full text-white text-base md:text-lg font-medium hover:from-pink-600 hover:to-pink-700 transition-all transform hover:scale-105 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    Continue
                  </button>
                </motion.div>
              )}

              {/* Step 2: Details Form */}
              {step === "details" && (
                <motion.div
                  key="details-step"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 50, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="flex flex-col items-center w-full max-w-2xl px-4 py-8 overflow-y-auto"
                >
                  <h3 className="text-white text-xl md:text-2xl font-medium mb-2">
                    Fill in your details
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base mb-8">
                    Enter your details in detail
                  </p>

                  <div className="w-full space-y-4 mb-8">
                    {/* First Name and Title Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Fill"
                        value={formData.firstName}
                        onChange={(e) =>
                          handleFormChange("firstName", e.target.value)
                        }
                        className="w-full px-6 py-4 bg-[#3A3A3A] border border-[#4A4A4A] rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 transition-all"
                      />
                      <input
                        type="text"
                        placeholder="Title"
                        value={formData.title}
                        onChange={(e) =>
                          handleFormChange("title", e.target.value)
                        }
                        className="w-full px-6 py-4 bg-[#3A3A3A] border border-[#4A4A4A] rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 transition-all"
                      />
                    </div>

                    {/* School/District */}
                    <input
                      type="text"
                      placeholder="School/district"
                      value={formData.school}
                      onChange={(e) =>
                        handleFormChange("school", e.target.value)
                      }
                      className="w-full px-6 py-4 bg-[#3A3A3A] border border-[#4A4A4A] rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 transition-all"
                    />

                    {/* Email Address */}
                    <input
                      type="email"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={(e) =>
                        handleFormChange("email", e.target.value)
                      }
                      className="w-full px-6 py-4 bg-[#3A3A3A] border border-[#4A4A4A] rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 transition-all"
                    />

                    {/* Phone Number and Code Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative">
                        <input
                          type="tel"
                          placeholder="Phone number"
                          value={formData.phone}
                          onChange={(e) =>
                            handleFormChange("phone", e.target.value)
                          }
                          className="w-full px-6 py-4 bg-[#3A3A3A] border border-[#4A4A4A] rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 transition-all"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm italic">
                          *optional
                        </span>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Code"
                          value={formData.code}
                          onChange={(e) =>
                            handleFormChange("code", e.target.value)
                          }
                          className="w-full px-6 py-4 bg-[#3A3A3A] border border-[#4A4A4A] rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-500 transition-all"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm italic">
                          *required
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={!isFormValid}
                    className="bg-gradient-to-r from-pink-500 to-[#FF004C] px-12 md:px-16 py-3 md:py-4 rounded-full text-white text-base md:text-lg font-medium hover:from-pink-600 hover:to-pink-700 transition-all transform hover:scale-105 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    Claim gift
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CodeModal;
