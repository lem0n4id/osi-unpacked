import { useEffect } from "react";
import { motion } from 'framer-motion';
import { useUIState } from "../lib/state";
import { LAYERS } from "../data/layers";
import CharacterSprite from "../components/CharacterSprite";
import ComputerSprite from "../components/ComputerSprite";
import MessagingApp from "../components/MessagingApp";
import ChatBubble from "../components/ChatBubble";
import Button from "../components/Button";

const l6Data = LAYERS.find((l) => l.id === 6);

export default function Delivered() {
  const { setCurrentStep, setCharacterState } = useUIState();

  useEffect(() => {
    // Ensure the receiving character is smiling
    setCharacterState("right", "smile");
    return () => {
      // Reset on unmount if needed
      setCharacterState("right", "idle");
    };
  }, [setCharacterState]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex flex-col items-center justify-center p-8"
    >
      <h2 className="text-4xl font-bold mb-4 text-green-400">
        Message Delivered!
      </h2>
      <p className="text-xl mb-8">The data has completed its journey.</p>

      <div className="flex-grow w-full flex items-center justify-around px-66">
        {/* Sender Character */}
        <div className="flex items-center gap-4">
          <CharacterSprite side="left" />
          <ComputerSprite />
        </div>

        {/* Messaging App */}
        <div className="flex flex-col items-center">
          <MessagingApp title="Receiver's Chat">
            <div className="p-4">
              {/* We don't need a ref here since it's not being animated */}
              <ChatBubble text={l6Data.sample.plain} />
            </div>
          </MessagingApp>
        </div>

        {/* Receiver Character & Response */}
        <div className="flex flex-col items-end">
          <ChatBubble text="Got it!" align="right" className="mb-2" />

        <div className="flex items-center justify-end gap-2">
          <ComputerSprite />
          <CharacterSprite side="right" />
        </div>
        </div>
      </div>

      <div className="mt-8">
        <Button onClick={() => setCurrentStep("SUMMARY")}>View Summary</Button>
      </div>
    </motion.div>
  );
}
