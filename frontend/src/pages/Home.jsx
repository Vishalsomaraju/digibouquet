import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  const [isLeaving, setIsLeaving] = useState(false);
  const navigate = useNavigate();

  const fallingHearts = Array.from({ length: 22 }); // increased count

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center px-6">
      {/* 🌷 Romantic Gradient Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(135deg,#fff9fb,#f9dce6,#f3c7d5)",
            "linear-gradient(135deg,#fff6f9,#f6d1dc,#f2b9cc)",
            "linear-gradient(135deg,#fff9fb,#f9dce6,#f3c7d5)",
          ],
        }}
        transition={{ duration: 14, repeat: Infinity }}
      />

      {/* ☁ Soft Glow Patches */}
      <div className="absolute w-[520px] h-[520px] bg-white rounded-full blur-[130px] opacity-30 -top-40 -left-40" />
      <div className="absolute w-[420px] h-[420px] bg-pink-200 rounded-full blur-[120px] opacity-25 bottom-0 right-0" />
      <div className="absolute w-[350px] h-[350px] bg-rose-200 rounded-full blur-[100px] opacity-20 top-1/3 left-1/4" />

      {/* 💕 Falling Hearts */}
      {fallingHearts.map((_, i) => {
        const size = 14 + Math.random() * 16;
        return (
          <motion.div
            key={i}
            className="absolute pointer-events-none text-rose-400"
            style={{
              fontSize: `${size}px`,
              left: `${Math.random() * 100}%`,
            }}
            initial={{ y: -50, opacity: 0 }}
            animate={{
              y: "110vh",
              opacity: [0, 0.7, 0],
              rotate: [0, 20, -20, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "linear",
            }}
          >
            ❤
          </motion.div>
        );
      })}

      {/* ✨ Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isLeaving ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center max-w-2xl w-full"
      >
        <h1
          className="
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl
            font-serif font-semibold
            text-rose-800
            leading-tight
          "
        >
          Send Love,
          <br className="hidden sm:block" />
          Even From Afar 💌
        </h1>

        <p
          className="
            mt-6
            text-base sm:text-lg md:text-xl
            text-rose-700
            leading-relaxed
            max-w-lg
            mx-auto
          "
        >
          Create a bouquet that blooms gently in their heart, even when miles
          keep you apart.
        </p>

        <div className="mt-10">
          <button
            onClick={() => {
              setIsLeaving(true);
              setTimeout(() => navigate("/create"), 500);
            }}
            className="
              px-8 py-4
              rounded-full
              bg-gradient-to-r from-rose-400 to-pink-400
              text-white
              text-base sm:text-lg
              font-medium
              shadow-xl
              hover:scale-105
              hover:shadow-[0_0_40px_rgba(255,120,160,0.35)]
              transition-all duration-300 cursor-pointer
            "
          >
            Create Your Bouquet 💐
          </button>
        </div>
      </motion.div>

      {/* 🖤 GitHub */}
      <div className="absolute bottom-4 right-6 text-sm text-rose-700 opacity-70 hover:opacity-100 transition">
        <a
          href="https://github.com/Vishalsomaraju"
          target="_blank"
          rel="noopener noreferrer"
        >
          Built by Vishal
        </a>
      </div>
    </div>
  );
}
