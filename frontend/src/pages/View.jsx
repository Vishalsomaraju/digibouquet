import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

/* PETALS */
import anemonePetal from "../assets/petals/anemone.png";
import carnationPetal from "../assets/petals/carnation.png";
import dahliaPetal from "../assets/petals/dahlia.png";
import daisyPetal from "../assets/petals/daisy.png";
import lilyPetal from "../assets/petals/lily.png";
import orchidPetal from "../assets/petals/orchid.png";
import peonyPetal from "../assets/petals/peony.png";
import ranunculusPetal from "../assets/petals/ranunculus.png";
import rosePetal from "../assets/petals/rose.png";
import sunflowerPetal from "../assets/petals/sunflower.png";
import tulipPetal from "../assets/petals/tulip.png";
import zinniaPetal from "../assets/petals/zinnia.png";

/* WRAPS */
import lavenderWrap from "../assets/wraps/lavender.png";
import pinkWrap from "../assets/wraps/pink.png";
import sageWrap from "../assets/wraps/green.png";
import greyWrap from "../assets/wraps/purple.png";
import creamWrap from "../assets/wraps/muddy.png";
import emeraldWrap from "../assets/wraps/emerald.png";

/* GREENERY */
import greeneryBase from "../assets/greenery/base.png";

const petalMap = {
  anemone: anemonePetal,
  carnation: carnationPetal,
  dahlia: dahliaPetal,
  daisy: daisyPetal,
  lily: lilyPetal,
  orchid: orchidPetal,
  peony: peonyPetal,
  ranunculus: ranunculusPetal,
  rose: rosePetal,
  sunflower: sunflowerPetal,
  tulip: tulipPetal,
  zinnia: zinniaPetal,
};

const wrapMap = {
  lavender: lavenderWrap,
  pink: pinkWrap,
  green: sageWrap,
  purple: greyWrap,
  muddy: creamWrap,
  emerald: emeraldWrap,
};

/* ORIGINAL ORIENTATION */
const layoutSlots = [
  { left: "50%", bottom: "0%", rotate: 0, scale: 0.95, z: 7 },
  { left: "38%", bottom: "8%", rotate: -12, scale: 0.92, z: 6 },
  { left: "62%", bottom: "8%", rotate: 12, scale: 0.92, z: 6 },
  { left: "28%", bottom: "22%", rotate: -20, scale: 0.88, z: 5 },
  { left: "72%", bottom: "22%", rotate: 20, scale: 0.88, z: 5 },
  { left: "42%", bottom: "32%", rotate: -8, scale: 0.82, z: 4 },
  { left: "58%", bottom: "32%", rotate: 8, scale: 0.82, z: 4 },
  { left: "50%", bottom: "20%", rotate: 0, scale: 0.88, z: 5 },
];

export default function View() {
  const { id } = useParams();
  const [bouquet, setBouquet] = useState(null);
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const check = () => setIsSmall(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/bouquet/${id}`)
      .then((res) => setBouquet(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!bouquet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const wrapImage = bouquet.wrap ? wrapMap[bouquet.wrap] : null;

  const hasMessage =
    bouquet.message &&
    (bouquet.message.to || bouquet.message.body || bouquet.message.from);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f5efe8] via-[#efe6dd] to-[#e6dbcf] overflow-hidden px-4">
      {/* 🌸 Ambient Floating Petals */}
      {[rosePetal, peonyPetal, tulipPetal].map((petal, i) => (
        <motion.img
          key={i}
          src={petal}
          className="absolute w-24 opacity-15 pointer-events-none hidden lg:block"
          style={{
            top: `${15 + i * 20}%`,
            left: `${10 + i * 25}%`,
          }}
          animate={{
            y: [0, -25, 0],
            rotate: [0, 8, -8, 0],
          }}
          transition={{
            duration: 12 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* 💐 Bouquet */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-[340px] sm:w-[420px] md:w-[480px] h-[520px] flex items-end justify-center"
      >
        {/* Wrap or Greenery */}
        {wrapImage ? (
          <img
            src={wrapImage}
            alt="wrap"
            className="absolute bottom-0 w-[105%]"
            style={{
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1,
            }}
          />
        ) : (
          <img
            src={greeneryBase}
            alt="greenery"
            className="absolute bottom-0 w-[100%]"
            style={{
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1,
            }}
          />
        )}

        {/* Flowers */}
        {bouquet.flowers.map((flower, index) => {
          const slot = layoutSlots[index];
          if (!slot) return null;

          return (
            <motion.img
              key={index}
              src={petalMap[flower.id]}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="absolute"
              style={{
                width: isSmall ? "100px" : "120px",
                left: `calc(${slot.left} - ${isSmall ? "15%" : "13%"})`,
                bottom: `calc(${slot.bottom} + ${isSmall ? "20%" : "34%"})`,
                transformOrigin: "bottom center",
                transform: `translateX(-50%) rotate(${slot.rotate}deg) scale(${slot.scale})`,
                zIndex: slot.z + 2,
              }}
            />
          );
        })}
      </motion.div>

      {/* 💌 MESSAGE CARD */}
      {hasMessage && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="relative -mt-24 z-10
      bg-[#f4eee8] w-[92%] sm:w-[420px]
      rounded-2xl
      shadow-[0_30px_80px_rgba(0,0,0,0.18)]
      px-8 py-8 font-serif"
        >
          {/* Paper Lines */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, rgba(90,150,255,0.06) 1px, transparent 1px)",
              backgroundSize: "100% 34px",
            }}
          />

          <div className="relative z-20 text-[#5c4b43]">
            {/* TO (Left) */}
            {bouquet.message.to && (
              <div className="text-left text-rose-900 text-lg mb-6">
                To my beloved, {bouquet.message.to}
              </div>
            )}

            {/* BODY (Center) */}
            {bouquet.message.body && (
              <div className="text-center text-lg leading-relaxed whitespace-pre-line mb-8">
                {bouquet.message.body}
              </div>
            )}

            {/* FROM (Right) */}
            {bouquet.message.from && (
              <div className="text-right text-rose-900 text-lg">
                ~ {bouquet.message.from}
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* View Counter */}
      <div className="mt-6 text-sm text-gray-500">
        Opened {bouquet.views || 0} times 💌
      </div>
    </div>
  );
}
