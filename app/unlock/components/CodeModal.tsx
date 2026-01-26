"use client";

import { useState, useRef, KeyboardEvent, useEffect } from "react";
import { X, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { IframeModal } from "@/app/components/iframe-modal";
import { useLenis } from "@/app/util/LenisProvider";
import gif from "@/public/specail/Approved.gif";
import Image from "next/image";

interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CodeModal = ({ isOpen, onClose }: CodeModalProps) => {
  const lenis = useLenis();
  const [step, setStep] = useState<"code" | "details" | "success" | "error">(
    "code"
  );
  const [code, setCode] = useState<string[]>(["", "", "", "", "", "", ""]);
  const [formData, setFormData] = useState({
    firstName: "",
    title: "",
    school: "",
    email: "",
    phone: "",
    code: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showIframeModal, setShowIframeModal] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Stop/start Lenis and hide body overflow when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      if (lenis) {
        lenis.stop();
      }
      document.body.style.overflow = "hidden";
    } else {
      if (lenis) {
        lenis.start();
      }
      document.body.style.overflow = "";
    }

    return () => {
      if (lenis) {
        lenis.start();
      }
      document.body.style.overflow = "";
    };
  }, [isOpen, lenis]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value.toUpperCase();
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
      // Validate the code
      if (enteredCode !== "ROOZ819") {
        setErrorMessage("Invalid code. Please check and try again.");
        setStep("error");
        return;
      }
      setFormData({ ...formData, code: enteredCode });
      setStep("details");
    }
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.emailSent) {
        setStep("success");
      } else {
        setErrorMessage(
          result.message || "Failed to submit claim. Please try again."
        );
        setStep("error");
      }
    } catch (error) {
      setErrorMessage(
        "An error occurred. Please check your connection and try again."
      );
      setStep("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRetry = () => {
    if (step === "error" && errorMessage.includes("Invalid code")) {
      setStep("code");
      setCode(["", "", "", "", "", "", ""]);
    } else {
      setStep("details");
    }
    setErrorMessage("");
  };

  const handleClose = () => {
    onClose();
  };

  const isFormValid =
    formData.firstName &&
    formData.title &&
    formData.school &&
    formData.email &&
    formData.code;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-xl p-4"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative w-full max-w-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gradient background with glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#252525] via-[#1A1A1A] to-[#252525] rounded-[45px] border border-[#4B33C2]/50 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 rounded-[45px]" />
              </div>

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-6 right-6 z-50 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Content */}
              <div className="relative z-10 p-8 md:p-12">
                <AnimatePresence mode="wait">
                  {/* Step 1: Code Entry */}
                  {step === "code" && (
                    <motion.div
                      key="code-step"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col items-center"
                    >
                      <h3 className="text-white text-2xl md:text-3xl font-medium mb-2">
                        Enter your code
                      </h3>
                      <p className="text-gray-400 text-sm md:text-base mb-10 md:mb-12">
                        Enter the 7-character code to continue
                      </p>

                      <div className="flex flex-wrap md:flex-nowrap justify-center gap-2 md:gap-3 mb-10 md:mb-12 w-full max-w-lg">
                        {code.map((digit, index) => (
                          <input
                            key={index}
                            ref={(el: any) => (inputRefs.current[index] = el)}
                            type="text"
                            inputMode="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) =>
                              handleChange(index, e.target.value)
                            }
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-[13%] aspect-square md:w-14 md:h-14 bg-[#3A3A3A] border border-[#4A4A4A] rounded-xl text-white text-center text-xl md:text-2xl font-semibold focus:outline-none focus:border-pink-500 focus:bg-[#2A2A2A] transition-all uppercase"
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
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col items-center w-full max-h-[70vh]  custom-scrollbar pr-2"
                    >
                      <h3 className="text-white text-2xl md:text-3xl font-medium mb-2">
                        Claim your gift
                      </h3>
                      <p className="text-gray-400 text-sm md:text-base mb-8">
                        Fill in your details to complete your claim
                      </p>

                      <div className="w-full space-y-4 mb-8">
                        {/* Name and Title Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="Name"
                            autoComplete="name"
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
                          autoComplete="email"
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
                              autoComplete="tel"
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
                              disabled
                              className="w-full px-6 py-4 bg-[#2A2A2A] border border-[#3A3A3A] rounded-2xl text-white/70 placeholder-gray-500 cursor-not-allowed"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-pink-500 text-sm italic font-medium">
                              ✓ verified
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <button
                        onClick={handleSubmit}
                        disabled={!isFormValid || isSubmitting}
                        className="bg-gradient-to-r from-pink-500 to-[#FF004C] px-12 md:px-16 py-3 md:py-4 rounded-full text-white text-base md:text-lg font-medium hover:from-pink-600 hover:to-pink-700 transition-all transform hover:scale-105 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        {isSubmitting ? "Submitting..." : "Claim gift"}
                      </button>
                    </motion.div>
                  )}

                  {/* Success State */}
                  {step === "success" && (
                    <motion.div
                      key="success-step"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="flex flex-col items-center text-center py-4"
                    >
                      <Image
                        src={gif}
                        alt="Success"
                        className="w-[10rem] h-fit mb-4"
                      />
                      <h3 className="text-white text-2xl md:text-3xl font-medium mb-4">
                        Got it!
                      </h3>
                      <p className="text-white/50 leading-[120%] text-balance text-base md:text-lg max-w-md mb-6">
                        We'll send your coffee card after your 10-minute
                        walkthrough
                      </p>
                      <button
                        onClick={() => {
                          setShowIframeModal(true);
                        }}
                        className="bg-gradient-to-r from-pink-500 to-[#FF004C] px-12 md:px-16 py-3 md:py-4 rounded-full text-white text-base md:text-lg font-medium hover:from-pink-600 hover:to-pink-700 transition-all transform hover:scale-105 cursor-pointer"
                      >
                        Book now
                      </button>
                    </motion.div>
                  )}

                  {/* Error State */}
                  {step === "error" && (
                    <motion.div
                      key="error-step"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="flex flex-col items-center text-center py-4"
                    >
                      <XCircle className="w-20 h-20 text-red-500 mb-6" />
                      <h3 className="text-white text-2xl md:text-3xl font-medium mb-4">
                        Oops!
                      </h3>
                      <p className="text-gray-300 text-base md:text-lg max-w-md mb-8">
                        {errorMessage}
                      </p>
                      <button
                        onClick={handleRetry}
                        className="bg-gradient-to-r cursor-pointer from-pink-500 to-[#FF004C] px-12 py-3 rounded-full text-white text-base font-medium hover:from-pink-600 hover:to-pink-700 transition-all transform hover:scale-105"
                      >
                        Try Again
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Iframe Modal - Opens after successful submission */}
      {showIframeModal && (
        <IframeModal onClose={() => setShowIframeModal(false)} />
      )}
    </>
  );
};

export default CodeModal;
