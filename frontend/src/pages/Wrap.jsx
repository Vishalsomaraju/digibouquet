import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Toaster } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";

/* ---------- PETALS ONLY ---------- */
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

/* ---------- WRAPS ---------- */
import lavenderWrap from "../assets/wraps/lavender.png";
import pinkWrap from "../assets/wraps/pink.png";
import sageWrap from "../assets/wraps/green.png";
import greyWrap from "../assets/wraps/purple.png";
import creamWrap from "../assets/wraps/muddy.png";
import emeraldWrap from "../assets/wraps/emerald.png";

/* ---------- GREENERY ---------- */
import greeneryBase from "../assets/greenery/base.png";

/* ---------- SAME ORIENTATION (UNCHANGED) ---------- */
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

const wrapOptions = [
  { key: "lavender", img: lavenderWrap },
  { key: "pink", img: pinkWrap },
  { key: "green", img: sageWrap },
  { key: "purple", img: greyWrap },
  { key: "muddy", img: creamWrap },
  { key: "emerald", img: emeraldWrap },
];

export default function Wrap() {
  const location = useLocation();
  const navigate = useNavigate();

  const [flowers, setFlowers] = useState([]);
  const [selectedWrap, setSelectedWrap] = useState(null);
  const [isSmall, setIsSmall] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  /* ---------- SAFE LOCAL STORAGE ---------- */
  const safeParse = (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  };

  /* ---------- RESPONSIVE CHECK ---------- */
  useEffect(() => {
    const checkSize = () => setIsSmall(window.innerWidth < 640);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  /* ---------- LOAD FLOWERS ---------- */
  useEffect(() => {
    if (location.state?.flowers) {
      setFlowers(location.state.flowers);
    } else {
      const saved = safeParse("bouquet");
      if (saved) setFlowers(saved);
    }
  }, [location.state]);

  /* ---------- WRAP TOGGLE ---------- */
  const toggleWrap = (wrapKey) => {
    setSelectedWrap((prev) => (prev === wrapKey ? null : wrapKey));
  };

  /* ---------- CONTINUE ---------- */
  const handleContinue = () => {
    if (isExiting) return;

    setIsExiting(true);

    localStorage.setItem(
      "bouquetWrap",
      JSON.stringify({
        flowers,
        wrap: selectedWrap,
      }),
    );

    setTimeout(() => {
      navigate("/message", {
        state: { flowers, wrap: selectedWrap },
      });
    }, 600);
  };

  return (
    <>
      <Toaster position="top-center" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={isExiting ? { opacity: 0, scale: 0.98 } : { opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="min-h-screen bg-gradient-to-br from-[#f5f3ef] via-[#f2eee9] to-[#ece6df] px-4 sm:px-6 py-10"
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-14 items-center">
          {/* LEFT: WRAP OPTIONS */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl sm:text-4xl font-serif text-rose-900 mb-10 text-center lg:text-left">
              Choose Your Wrap
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 justify-items-center">
              {wrapOptions.map((wrap) => {
                const isSelected = selectedWrap === wrap.key;

                return (
                  <button
                    key={wrap.key}
                    onClick={() => toggleWrap(wrap.key)}
                    className="relative transition-all duration-300 ease-out cursor-pointer"
                  >
                    <img
                      src={wrap.img}
                      alt=""
                      className={`w-36 sm:w-40 md:w-44 object-contain
                        transition-all duration-300
                        hover:-translate-y-3 hover:scale-110
                        ${
                          isSelected
                            ? "scale-110 drop-shadow-[0_12px_25px_rgba(0,0,0,0.25)]"
                            : "drop-shadow-md"
                        }`}
                    />

                    {isSelected && (
                      <div className="absolute -top-2 -right-2 bg-rose-700 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-md">
                        ✓
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: PREVIEW (ORIENTATION UNTOUCHED) */}
          <div className="w-full relative lg:w-1/2 flex flex-col items-center">
            <div
              className="relative mx-auto
              w-[300px] sm:w-[340px] md:w-[380px] lg:w-[420px]
              h-[380px] sm:h-[420px] md:h-[480px] lg:h-[520px]
              flex items-end justify-center mt-8 lg:mt-0"
              style={{ transform: "translateX(-45px)" }}
            >
              {/* WRAP */}
              {selectedWrap && (
                <img
                  src={wrapOptions.find((w) => w.key === selectedWrap)?.img}
                  className="absolute w-[115%] sm:w-[110%] md:w-[105%] lg:w-[100%]"
                  style={{
                    bottom: "-20px",
                    left: "68%",
                    transform: "translateX(-50%) scale(1.15)",
                    transformOrigin: "bottom center",
                    zIndex: 1,
                  }}
                />
              )}

              {/* GREENERY */}
              {!selectedWrap && (
                <img
                  src={greeneryBase}
                  alt="greenery"
                  className="absolute w-[105%] sm:w-[100%] md:w-[95%]"
                  style={{
                    bottom: "24px",
                    left: "68%",
                    transform: "translateX(-50%) scale(1.15)",
                    transformOrigin: "bottom center",
                    zIndex: 1,
                  }}
                />
              )}

              {/* PETALS (UNCHANGED POSITIONING) */}
              {flowers.map((flower, index) => {
                const slot = layoutSlots[index];
                if (!slot) return null;

                return (
                  <motion.img
                    key={index}
                    src={petalMap[flower.id]}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="absolute"
                    style={{
                      width: isSmall ? "95px" : "110px",
                      left: `calc(${slot.left} + 5%)`,
                      bottom: `calc(${slot.bottom} + 30%)`,
                      transformOrigin: "bottom center",
                      transform: `translateX(-50%) rotate(${slot.rotate}deg) scale(${slot.scale})`,
                      zIndex: slot.z + 2,
                    }}
                  />
                );
              })}
            </div>

            {/* BUTTON */}
            <div className="w-full flex justify-center mt-10">
              <button
                onClick={handleContinue}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#d66b8a] to-[#c94f7c] text-white text-lg font-medium shadow-xl hover:scale-105 hover:shadow-[0_0_40px_rgba(201,79,124,0.4)] transition-all duration-300 cursor-pointer"
              >
                Continue to Message →
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
