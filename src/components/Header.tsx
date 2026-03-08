import React from "react";
import { motion } from "motion/react";
import { GraduationCap } from "lucide-react";

export const Header = () => (
  <header className="bg-edu-blue text-white py-12 px-4 shadow-2xl relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
      <div className="absolute top-[-50%] left-[-10%] w-[120%] h-[200%] rotate-12 bg-gradient-to-br from-gold via-transparent to-transparent" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[100%] rounded-full bg-gold/10 blur-3xl" />
    </div>
    <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="mb-6 bg-white/10 p-5 rounded-3xl backdrop-blur-md border border-white/20 shadow-inner"
      >
        <GraduationCap className="w-16 h-16 text-gold drop-shadow-lg" />
      </motion.div>
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl md:text-5xl font-black mb-4 tracking-tight drop-shadow-md"
      >
        مديرية التربية والتعليم بكفر الشيخ
      </motion.h1>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100px" }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="h-1 bg-gold rounded-full mb-6"
      />
      <motion.h2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-xl md:text-3xl font-bold mb-3 text-gold-light tracking-wide"
      >
        إدارة غرب كفر الشيخ التعليمية
      </motion.h2>
      <motion.h3 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-lg md:text-2xl font-medium text-white/90"
      >
        نظام تسجيل الطلاب المبتكرين والموهوبين
      </motion.h3>
    </div>
  </header>
);
