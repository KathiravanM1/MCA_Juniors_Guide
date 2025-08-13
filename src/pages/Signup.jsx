import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import anime from "animejs/lib/anime.es.js";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import Particles from "@tsparticles/react";
import { FaUserAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

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

// Particles Background
function ParticlesBg() {
  const options = {
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
  return <Particles id="tsparticles" options={options} className="absolute inset-0 -z-10" />;
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

  const powers = ["Hacking", "Cloud", "AI/ML", "Full-Stack", "Design", "Systems"];

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-#DDF6D2 to-white font-sans relative"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <ParticlesBg />
      <div className="w-full max-w-5xl mx-6 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* LEFT: 3D Stage */}
          <div className="hidden md:flex flex-col items-center justify-center gap-6">
            <div className="w-150 h-100 rounded-3xloverflow-hidden flex items-center justify-center">
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
            className="signup-card bg-white rounded-3xl shadow-xl p-6 border border-gray-100"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: PALETTE.lightGreen }}>
                  <FaUserAlt className="text-white" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-800">Create Account</div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <MagicInput id="name" label="Full name" value={name} onChange={setName} placeholder="Your full name" />


              
              <MagicInput id="email" label="College email" type="email" value={email} onChange={setEmail} placeholder="you@college.edu" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                <div>
                  <MagicInput id="pw" label="Password" type="password" value={pw} onChange={setPw} placeholder="At least 8 characters" />
                </div>
                <div>
                 
                  <MagicInput id="confirm" label="Confirm password" type="password" value={confirm} onChange={setConfirm} placeholder="Repeat password" />
                </div>
              </div>

              {error && <div className="text-sm text-red-500">{error}</div>}

              <div className="flex items-center justify-end gap-3 mt-2">
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl font-semibold text-white"
                  style={{ background: PALETTE.lightGreen }}
                >Submit
                </button>
              </div>

              <div className="mt-4 text-center text-sm text-gray-500">
                or sign up with{" "}
                <button type="button" onClick={() => alert("Google placeholder")} className="inline-flex items-center gap-2 ml-1">
                  <FcGoogle /> Google
                </button>
              </div>

              <div className="mt-3 text-center text-xs text-gray-400">
                Already a hero? <a href="/login" className="text-[#8fdba1] font-semibold">Sign in</a>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
