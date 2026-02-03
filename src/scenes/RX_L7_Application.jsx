import { useEffect, useRef, useState } from "react";
import { useUIState } from "../lib/state";
import { LAYERS } from "../data/layers";
import { makeTl } from "../lib/anim";
import InfoBox from "../components/transport/InfoBox";
import Button from "../components/Button";
import { AnimatePresence, motion } from "framer-motion";
import CharacterSprite from "../components/CharacterSprite";
import ComputerSprite from "../components/ComputerSprite";
import MessagingApp from "../components/MessagingApp";
import ChatBubble from "../components/ChatBubble"; // Import the new component

const layerData = LAYERS.find((l) => l.id === 7);
const l6Data = LAYERS.find((l) => l.id === 6);

export default function RX_L7_Application() {
  const { setCurrentStep, setCharacterState } = useUIState();
  const [showInfo, setShowInfo] = useState(false);

  const msgRef = useRef(null);

  useEffect(() => {
    if (!msgRef.current) return; // Guard against null ref on initial render

    const tl = makeTl();
    const chars = msgRef.current.querySelectorAll("span");

    // Animate characters appearing one by one
    tl.to(
      chars,
      {
        opacity: 1,
        stagger: 0.05,
        ease: "power2.out",
        onComplete: () => {
          setShowInfo(true);
          setCharacterState("right", "smile");
        },
      },
      "+=0.5" // Start after a short delay
    );

    return () => {
      setCharacterState("right", "idle");
    };
  }, [setCharacterState]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4 text-green-400 text-center">
        Layer 7: Application (Receiving)
      </h2>
      <p className="text-sm md:text-lg mb-4 md:mb-8 text-center">The message is delivered to the application.</p>

      <div className="flex-grow w-full flex flex-col md:flex-row items-center justify-around gap-4 md:gap-0 px-4 md:px-66">
        <div className="flex items-center gap-2 md:gap-4">
          <CharacterSprite side="left" />
          <ComputerSprite />
        </div>

        {/* Messaging App in the middle */}
        <div className="flex flex-col items-center w-full md:w-auto">
          <MessagingApp title="Receiver's Chat">
            <div className="p-2 md:p-4">
              <ChatBubble text={l6Data.sample.plain} ref={msgRef} isAnimated={true} />
            </div>
          </MessagingApp>
        </div>

        {/* Receiver Character */}
        <div className="flex items-center gap-2 md:gap-4">
          <ComputerSprite />
          <CharacterSprite side="right" />
        </div>
      </div>

      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-4 w-full max-w-4xl"
          >
            <InfoBox layer={layerData} />
            <div className="mt-4 text-center">
              <Button onClick={() => setCurrentStep("DELIVERED")}>
                Message Received!
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
