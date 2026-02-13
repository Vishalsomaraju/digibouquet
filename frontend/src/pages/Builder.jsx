import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";

/* ---------------- FULL FLOWERS ---------------- */
import anemoneFull from "../assets/flowers/anemone.png";
import carnationFull from "../assets/flowers/carnation.png";
import dahliaFull from "../assets/flowers/dahlia.png";
import daisyFull from "../assets/flowers/daisy.png";
import lilyFull from "../assets/flowers/lily.png";
import orchidFull from "../assets/flowers/orchid.png";
import peonyFull from "../assets/flowers/peony.png";
import ranunculusFull from "../assets/flowers/ranunculus.png";
import roseFull from "../assets/flowers/rose.png";
import sunflowerFull from "../assets/flowers/sunflower.png";
import tulipFull from "../assets/flowers/tulip.png";
import zinniaFull from "../assets/flowers/zinnia.png";

/* ---------------- PETALS ---------------- */
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

/* ---------------- YOUR EXACT LAYOUT ---------------- */
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

const flowerOptions = [
  { id: "anemone", full: anemoneFull, petal: anemonePetal },
  { id: "carnation", full: carnationFull, petal: carnationPetal },
  { id: "dahlia", full: dahliaFull, petal: dahliaPetal },
  { id: "daisy", full: daisyFull, petal: daisyPetal },
  { id: "lily", full: lilyFull, petal: lilyPetal },
  { id: "orchid", full: orchidFull, petal: orchidPetal },
  { id: "peony", full: peonyFull, petal: peonyPetal },
  { id: "ranunculus", full: ranunculusFull, petal: ranunculusPetal },
  { id: "rose", full: roseFull, petal: rosePetal },
  { id: "sunflower", full: sunflowerFull, petal: sunflowerPetal },
  { id: "tulip", full: tulipFull, petal: tulipPetal },
  { id: "zinnia", full: zinniaFull, petal: zinniaPetal },
];

export default function Builder() {
  const navigate = useNavigate();
  const [flowers, setFlowers] = useState([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  /* Restore */
  useEffect(() => {
    const saved = localStorage.getItem("bouquet");
    if (saved) setFlowers(JSON.parse(saved));
  }, []);

  /* Save */
  useEffect(() => {
    localStorage.setItem("bouquet", JSON.stringify(flowers));
  }, [flowers]);

  const addFlower = (flower) => {
    if (flowers.length === 8) {
      toast.custom(() => (
        <div className="bg-white px-6 py-4 rounded-2xl shadow-xl border border-gray-200 text-center">
          {" "}
          <p className="text-lg font-serif text-gray-800">
            {" "}
            Your bouquet is complete 💐{" "}
          </p>{" "}
          <p className="text-sm text-gray-500 mt-1">
            {" "}
            Eight blooms make it perfect.{" "}
          </p>{" "}
        </div>
      ));
      return;
    }
    setFlowers([...flowers, flower]);
  };

  const removeFlower = (index) => {
    const updated = [...flowers];
    updated.splice(index, 1);
    setFlowers(updated);
  };

  const goNext = () => {
    if (flowers.length === 0) {
      toast.custom(() => (
        <div className="bg-white px-6 py-4 rounded-2xl shadow-xl border border-gray-200 text-center">
          {" "}
          <p className="text-lg font-serif text-gray-800">
            {" "}
            Add at least one flower 🌸{" "}
          </p>{" "}
        </div>
      ));
      return;
    }
    setIsTransitioning(true);
    setTimeout(() => {
      navigate("/wrap", { state: { flowers } });
    }, 700);
  };

  return (
    <>
      <Toaster position="top-center" />

      <div className="min-h-screen bg-gradient-to-br from-[#f5f3ef] via-[#f2eee9] to-[#ece6df] px-4 sm:px-6 py-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-14 items-center">
          {/* LEFT */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl sm:text-4xl font-serif text-rose-900 mb-8 text-center lg:text-left">
              Choose Your Flowers ({flowers.length}/8)
            </h2>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-y-12 gap-x-6 justify-items-center">
              {flowerOptions.map((flower) => {
                const count = flowers.filter((f) => f.id === flower.id).length;

                return (
                  <button
                    key={flower.id}
                    onClick={() => addFlower(flower)}
                    className="relative transition duration-300 hover:scale-110 hover:-translate-y-1 cursor-pointer"
                  >
                    <img
                      src={flower.petal}
                      alt=""
                      className="w-20 sm:w-24 md:w-28 object-contain"
                    />

                    {count > 0 && (
                      <div className="absolute -top-2 -right-2 bg-black text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                        {count}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT PREVIEW */}
          <div className="w-full relative lg:w-1/2 flex flex-col items-center">
            <div
              className="
                relative
                mx-auto
                w-[300px] sm:w-[340px] md:w-[380px] lg:w-[420px]
                h-[380px] sm:h-[420px] md:h-[480px] lg:h-[520px]
                flex items-end justify-center
                mt-8 lg:mt-0 cursor-pointer
              "
              style={{ transform: "translateX(-45px)" }} // your alignment preserved
            >
              {flowers.map((flower, index) => {
                const slot = layoutSlots[index];
                if (!slot) return null;

                return (
                  <motion.img
                    key={index}
                    src={flower.full}
                    onClick={() => removeFlower(index)}
                    initial={{ opacity: 0, y: 30 }}
                    animate={
                      isTransitioning
                        ? { rotate: 8, scale: 0.92, y: -20 }
                        : { opacity: 1, y: 0 }
                    }
                    transition={{
                      duration: 0.6,
                      delay: index * 0.05,
                    }}
                    className="absolute cursor-pointer"
                    style={{
                      width: "110px",
                      left: `calc(${slot.left} - 3%)`, // EXACTLY YOURS
                      bottom: slot.bottom,
                      transformOrigin: "bottom center",
                      transform: `translateX(-50%) rotate(${slot.rotate}deg) scale(${slot.scale})`,
                      zIndex: slot.z,
                    }}
                  />
                );
              })}
            </div>

            <button
              onClick={goNext}
              className="mt-12 px-6 py-4 rounded-full bg-gradient-to-r from-[#d66b8a] to-[#c94f7c] text-white text-lg font-medium shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              Continue to Wrap →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
