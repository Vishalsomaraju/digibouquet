import { useParams, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { motion } from "framer-motion";

/* PETALS */
import rosePetal from "../assets/petals/rose.png";
import peonyPetal from "../assets/petals/peony.png";
import tulipPetal from "../assets/petals/tulip.png";
import lilyPetal from "../assets/petals/lily.png";
import daisyPetal from "../assets/petals/daisy.png";

export default function Shared() {
  const { id } = useParams();
  const navigate = useNavigate();

  const shareUrl = `${window.location.origin}/view/${id}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);

      toast.custom(() => (
        <div className="bg-white px-6 py-4 rounded-2xl shadow-xl border border-gray-200 text-center">
          <p className="text-lg font-serif text-gray-800">Link copied 💌</p>
          <p className="text-sm text-gray-500 mt-1">
            Now send it to someone special ✨
          </p>
        </div>
      ));
    } catch (err) {
      toast.custom(() => (
        <div className="bg-white px-6 py-4 rounded-2xl shadow-xl border border-gray-200 text-center">
          <p className="text-lg font-serif text-gray-800">
            Copied successfully 💌
          </p>
          <p className="text-sm text-gray-500 mt-1">Share the love ✨</p>
        </div>
      ));
    }
  };

  const floatingPetals = [
    rosePetal,
    peonyPetal,
    tulipPetal,
    lilyPetal,
    daisyPetal,
    rosePetal,
    peonyPetal,
  ];

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center px-6 bg-gradient-to-br from-[#f6e9f0] via-[#f3dbe6] to-[#efd0de]">
      <Toaster position="top-center" richColors />

      {/* 🌸 Floating Background Petals */}
      {floatingPetals.map((petal, i) => (
        <motion.img
          key={i}
          src={petal}
          className="absolute w-24 opacity-20 pointer-events-none"
          style={{
            top: `${10 + i * 10}%`,
            left: `${5 + i * 12}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 12 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* 💌 White Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 bg-white/95 backdrop-blur-md rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.12)] px-10 py-12 max-w-lg w-full text-center border border-white/40"
      >
        <h2 className="text-3xl font-serif mb-6 text-rose-800">
          Your Bouquet is Ready 💐
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <button
            onClick={copyLink}
            className="px-6 py-3 bg-rose-700 text-white rounded-full hover:scale-105 transition shadow-md cursor-pointer"
          >
            Copy Link 🔗
          </button>

          <button
            onClick={() => navigate(`/view/${id}`)}
            className="px-6 py-3 border border-rose-700 text-rose-700 rounded-full hover:bg-rose-50 transition cursor-pointer "
          >
            View as Recipient →
          </button>
        </div>

        <p className="text-sm text-gray-500 break-all">{shareUrl}</p>
      </motion.div>
    </div>
  );
}
