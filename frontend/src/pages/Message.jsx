import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/* PETALS */
import rosePetal from "../assets/petals/rose.png";
import peonyPetal from "../assets/petals/peony.png";
import tulipPetal from "../assets/petals/tulip.png";
import lilyPetal from "../assets/petals/lily.png";
import daisyPetal from "../assets/petals/daisy.png";

export default function Message() {
  const navigate = useNavigate();

  const [to, setTo] = useState("");
  const [body, setBody] = useState("");
  const [from, setFrom] = useState("");
  const [loading, setLoading] = useState(false);

  const floatingPetals = [
    { src: rosePetal, top: "8%", left: "6%" },
    { src: peonyPetal, top: "18%", right: "8%" },
    { src: tulipPetal, bottom: "12%", left: "10%" },
    { src: lilyPetal, bottom: "10%", right: "12%" },
    { src: daisyPetal, top: "45%", left: "3%" },
    { src: rosePetal, top: "60%", right: "5%" },
    { src: peonyPetal, bottom: "30%", left: "4%" },
    { src: tulipPetal, top: "30%", right: "2%" },
  ];

  const safeParse = (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  };

  const handleSend = async () => {
    try {
      setLoading(true);

      const bouquetData = {
        flowers: JSON.parse(localStorage.getItem("bouquet")) || [],
        wrap: JSON.parse(localStorage.getItem("bouquetWrap"))?.wrap || null,
        message: to || body || from ? { to, body, from } : null,
      };

      const res = await axios.post(
        "http://localhost:5000/api/bouquet",
        bouquetData,
      );

      if (res.data?.id) {
        navigate(`/shared/${res.data.id}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f5eee8] via-[#f1e7de] to-[#e9ddd2] overflow-hidden px-4">
      {/* FLOATING PETALS */}
      {floatingPetals.map((petal, i) => (
        <motion.img
          key={i}
          src={petal.src}
          alt=""
          className="absolute w-24 opacity-40 brightness-110 saturate-110 pointer-events-none"
          style={{
            top: petal.top,
            bottom: petal.bottom,
            left: petal.left,
            right: petal.right,
          }}
          animate={{
            y: [0, -18, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 10 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* MESSAGE CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-[#f4eee8] w-full max-w-lg rounded-xl shadow-[0_25px_60px_rgba(0,0,0,0.15)] px-10 py-12"
      >
        {/* LEFT MARGIN LINE */}
        <div className="absolute left-6 top-0 bottom-0 w-[4px] bg-pink-400 rounded-full opacity-80" />

        {/* NOTEBOOK LINES */}
        <div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(90,150,255,0.08) 1px, transparent 1px)",
            backgroundSize: "100% 34px",
          }}
        />

        <div className="relative z-10 flex flex-col gap-6 font-['Dancing_Script'] text-[#5c4b43]">
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="To My Beloved,"
            className="bg-transparent outline-none text-2xl"
          />

          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Every petal carries a piece of my heart..."
            className="w-full h-52 bg-transparent resize-none outline-none text-[24px] leading-[34px]"
          />

          <input
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="Forever Yours,"
            className="bg-transparent outline-none text-2xl"
          />
        </div>
      </motion.div>

      {/* SEND BUTTON */}
      <button
        onClick={handleSend}
        disabled={loading}
        className="mt-12 px-12 py-4 rounded-full bg-gradient-to-r from-[#d66b8a] to-[#c94f7c] text-white text-lg shadow-xl hover:scale-105 hover:shadow-[0_0_40px_rgba(201,79,124,0.4)] transition-all duration-300 disabled:opacity-60 cursor-pointer"
      >
        {loading ? "Sending..." : "Send with Love 💌"}
      </button>
    </div>
  );
}
