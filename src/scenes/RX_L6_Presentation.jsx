import { useEffect, useRef, useState } from "react";
import { useUIState } from "../lib/state";
import { LAYERS } from "../data/layers";
import { makeTl } from "../lib/anim";
import InfoBox from '../components/transport/InfoBox';
import Button from "../components/Button";
import { VscLock, VscUnlock } from "react-icons/vsc";
import { AnimatePresence, motion } from "framer-motion";

const layerData = LAYERS.find((l) => l.id === 6);

export default function RX_L6_Presentation() {
  const { setCurrentStep } = useUIState();
  const [isDecrypted, setIsDecrypted] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const plainRef = useRef(null);
  const encodedRef = useRef(null);
  const lockRef = useRef(null);
  const unlockRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const tl = makeTl();
    const plainChars = plainRef.current.querySelectorAll("span");

    tl.fromTo(
      containerRef.current,
      { autoAlpha: 0, scale: 0.9 },
      { autoAlpha: 1, scale: 1, duration: 0.5 }
    )
      .addLabel("start")
      .to(lockRef.current, { opacity: 0, duration: 0.5 }, "start")
      .fromTo(
        unlockRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5 },
        "start"
      )
      .to(encodedRef.current, { opacity: 0, duration: 0.5 }, "start+=0.5")
      .fromTo(
        plainRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.1 },
        "start+=0.5"
      )
      .fromTo(
        plainChars,
        { autoAlpha: 0, y: -10 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.03,
          ease: "power2.inOut",
          onComplete: () => {
            setIsDecrypted(true);
            setShowInfo(true);
          },
        },
        "start+=0.6"
      );
  }, []);

  const PlainText = ({ text }) => {
    return (
      <div
        ref={plainRef}
        className="p-4 bg-black/50 rounded whitespace-pre-wrap font-mono text-lg"
      >
        {text.split("").map((char, i) => (
          <span key={i} className="inline-block">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-4 text-purple-400">Layer 6: Presentation (Receiving)</h2>
      <p className="text-lg mb-8">The encrypted data is now being decrypted.</p>
      <div
        ref={containerRef}
        className="w-3/4 max-w-4xl p-8 bg-gray-800/50 rounded-lg flex flex-col items-center gap-6 invisible"
      >
        <div className="relative w-full flex justify-center items-center">
          <div
            ref={encodedRef}
            className="p-4 bg-black/50 rounded whitespace-pre-wrap font-mono text-lg"
          >
            {layerData.sample.encoded}
          </div>
          <div className="absolute">
            <PlainText text={layerData.sample.plain} />
          </div>
        </div>

        <div className="relative">
          <div ref={lockRef}>
            <VscLock size={40} className="text-red-500" />
          </div>
          <div ref={unlockRef} className="absolute top-0 left-0 opacity-0">
            <VscUnlock size={40} className="text-green-500" />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-4 w-3/4 max-w-4xl"
          >
            <InfoBox layer={layerData} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isDecrypted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4"
          >
            <Button onClick={() => setCurrentStep("L7_RECV")}>
              Next: Deliver Message
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
