"use client";

import { useState, useEffect } from "react";
import { X, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gif from "@/public/specail/Approved.gif";
import Image from "next/image";
import { useLenis } from "@/app/util/LenisProvider";

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RequestModal = ({ isOpen, onClose }: RequestModalProps) => {
  const lenis = useLenis();
  const [step, setStep] = useState<"form" | "success" | "error">("form");
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    school: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  const handleFormChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/request", {
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
          result.message || "Failed to submit request. Please try again."
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
    setStep("form");
    setErrorMessage("");
  };

  const handleClose = () => {
    // Reset form when closing
    setStep("form");
    setFormData({
      name: "",
      title: "",
      school: "",
      email: "",
      phone: "",
    });
    setErrorMessage("");
    onClose();
  };

  const isFormValid =
    formData.name && formData.title && formData.school && formData.email;

  return (
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
          <Image
            src={gif}
            alt="Success"
            className="w-0 h-auto absolute top-0 left-0"
          />
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
                {/* Form Step */}
                {step === "form" && (
                  <motion.div
                    key="form-step"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center w-full"
                  >
                    <h3 className="text-white text-2xl md:text-3xl font-medium mb-2">
                      Request a live unlock
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base mb-8">
                      Fill in your details and we'll get back to you
                    </p>

                    <div className="w-full space-y-4 mb-8">
                      {/* Name and Title Row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Name"
                          autoComplete="name"
                          value={formData.name}
                          onChange={(e) =>
                            handleFormChange("name", e.target.value)
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

                      {/* Phone Number */}
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
                    </div>

                    {/* Submit Button */}
                    <button
                      onClick={handleSubmit}
                      disabled={!isFormValid || isSubmitting}
                      className="bg-gradient-to-r from-pink-500 to-[#FF004C] px-12 md:px-16 py-3 md:py-4 rounded-full text-white text-base md:text-lg font-medium hover:from-pink-600 hover:to-pink-700 transition-all transform hover:scale-105 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {isSubmitting ? "Submitting..." : "Submit request"}
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
                    className="flex flex-col items-center text-center py-8"
                  >
                    <Image
                      src={gif}
                      alt="Success"
                      className="w-[10rem] h-fit mb-6"
                    />
                    <h3 className="text-white text-2xl md:text-3xl font-medium mb-4">
                      Request received!
                    </h3>
                    <p className="text-white/50 leading-[120%] text-balance text-base md:text-lg max-w-md">
                      We'll get back to you soon to schedule your live unlock
                      demonstration
                    </p>
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
                    className="flex flex-col items-center text-center py-8"
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
  );
};

export default RequestModal;
