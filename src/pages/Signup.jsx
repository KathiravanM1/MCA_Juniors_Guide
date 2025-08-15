import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import anime from "animejs/lib/anime.es.js";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import Particles from "@tsparticles/react";
import { FaUserAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const PALETTE = {
  lightGreen: "#a8e6a3",
  midGreen: "#8fdba1",
  white: "#ffffff",
  grayDark: "#2f2f2f",
  grayMuted: "#6b7280",
};

// MagicInput Component
function MagicInput({ id, label, type = "text", value, onChange, placeholder }) {
  return (
    <div className="relative">
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || ""}
        className="peer w-full bg-white/5 text-gray-900 placeholder-transparent rounded-xl px-4 py-3 border border-gray-200 focus:outline-none"
        style={{ background: PALETTE.white + "0A" }}
        aria-label={label}
      />
      <label
        htmlFor={id}
        className="absolute left-4 -top-2 px-1 text-xs pointer-events-none transition-all duration-200"
        style={{ color: PALETTE.grayDark }}
      >
        {label}
      </label>
      <div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{ boxShadow: "0 6px 18px rgba(168,230,163,0.06)" }}
      />
    </div>
  );
}

// 3D Emblem
function Emblem3D({ color = PALETTE.lightGreen }) {
  const group = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) group.current.rotation.y = t * 0.18;
    const s = 1 + Math.sin(t * 0.9) * 0.01;
    if (group.current) group.current.scale.setScalar(s);
  });
  return (
    <group ref={group} position={[0, 0, 0]}>
      <Text
        fontSize={1.5}
        fontWeight={700}
        color={color}
        anchorX="center"
        anchorY="middle"
        bevelEnabled
        bevelSize={0.02}
        bevelThickness={0.02}
      >
        MCA
      </Text>
    </group>
  );
}

// Particles Background Configuration
const PARTICLES_OPTIONS = {
  fpsLimit: 60,
  particles: {
    number: { value: 45, density: { enable: true, area: 800 } },
    color: { value: [PALETTE.lightGreen, PALETTE.white, PALETTE.grayMuted] },
    shape: { type: "circle" },
    opacity: { value: { min: 0.2, max: 0.9 } },
    size: { value: { min: 0.8, max: 3 } },
    move: { enable: true, speed: 0.8, outModes: "out" },
    links: { enable: false },
  },
  interactivity: {
    events: { onHover: { enable: true, mode: "repulse" } },
    modes: { repulse: { distance: 120 } },
  },
  detectRetina: true,
  background: { color: "transparent" },
};

function ParticlesBg() {
  return <Particles id="tsparticles" options={PARTICLES_OPTIONS} className="absolute inset-0 -z-10" />;
}

// Main Single Page Signup
export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [alias, setAlias] = useState("");
  const [power, setPower] = useState("Hacking");
  const [accept, setAccept] = useState(true);
  const [busy, setBusy] = useState(true );
  const [error, setError] = useState("");
  const headingRef = useRef();

  useEffect(() => {
    if (!headingRef.current) return;
    const chars = headingRef.current.querySelectorAll(".char");
    anime.remove(chars);
    anime({
      targets: chars,
      translateY: [18, 0],
      opacity: [0, 1],
      easing: "cubicBezier(.22,.9,.29,1)",
      duration: 600,
      delay: anime.stagger(30),
    });
  }, []);

  function validateForm() {
    if (!name.trim() || !email.includes("@")) {
      setError("Please enter a valid name and college email.");
      return false;
    }
    if (pw.length < 8) {
      setError("Password must be at least 8 characters.");
      return false;
    }
    if (pw !== confirm) {
      setError("Passwords do not match.");
      return false;
    }
    if (!accept) {
      setError("Please accept the academy code of conduct.");
      return false;
    }
    setError("");
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;
    setBusy(true);
    try {
      await new Promise((r) => setTimeout(r, 900));
      // Ensure no user input is passed to anime or any code execution functions
      anime({
        targets: ".signup-card",
        scale: [1, 1.02, 1],
        duration: 600,
        easing: "easeInOutQuad",
      });
      alert("Simulated signup success — hook backend to complete flow.");
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setBusy(false);
    }
  }


  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-#DDF6D2 to-white font-sans relative"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <ParticlesBg />
      <div className="w-full max-w-6xl mx-4 sm:mx-6 p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          {/* LEFT: 3D Stage */}
          <div className="hidden lg:flex flex-col items-center justify-center gap-6">
            <div className="w-96 h-80 rounded-3xl overflow-hidden flex items-center justify-center">
              <Canvas camera={{ position: [0, 0, 4.2], fov: 50 }} style={{ height: "150%", width: "150%" }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 5, 5]} intensity={0.8} />
                <Emblem3D color={PALETTE.lightGreen} />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
              </Canvas>
            </div>
          </div>

          {/* RIGHT: Signup Card */}
          <motion.div
            className="signup-card bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 border border-gray-100 w-full max-w-md mx-auto lg:max-w-none"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-4 sm:mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center" style={{ background: PALETTE.lightGreen }}>
                  <FaUserAlt className="text-white" />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-semibold text-gray-800" aria-label="Create Account">Create Account</div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <MagicInput id="name" label="Full name" value={name} onChange={setName} placeholder="Your full name" />


              
              <MagicInput id="email" label="College email" type="email" value={email} onChange={setEmail} placeholder="you@college.edu" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                <div>
                  <MagicInput id="pw" label="Password" type="password" value={pw} onChange={setPw} placeholder="At least 8 characters" />
                </div>
                <div>
                 
                  <MagicInput id="confirm" label="Confirm password" type="password" value={confirm} onChange={setConfirm} placeholder="Repeat password" />
                </div>
              </div>

              {error && <div className="text-sm text-red-500">{error}</div>}

              <div className="flex items-center justify-end gap-3 mt-4 sm:mt-6">
                <button
                  type="submit"
                  className="px-4 py-2 sm:px-5 sm:py-3 rounded-xl font-semibold text-white text-sm sm:text-base w-full sm:w-auto"
                  style={{ background: PALETTE.lightGreen }}
                  aria-label="Submit"
                >Submit
                </button>
              </div>
{/* 
              <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-500">
                or sign up with{" "}
                <button type="button" onClick={() => alert("Google placeholder")} className="inline-flex items-center gap-2 ml-1">
                  <FcGoogle /> Google
                </button>
              </div> */}

              <div className="mt-3 sm:mt-4 text-center text-xs sm:text-sm text-gray-400" aria-label="Sign in link">
                <span aria-label="Already a hero?">Already a hero?</span> <Link to={"/login"} className="text-[#8fdba1] font-semibold" aria-label="Sign in">Sign in</Link>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
