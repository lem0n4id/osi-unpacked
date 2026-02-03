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
      className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-2 md:mb-4 text-green-400 text-center">
        Message Delivered!
      </h2>
      <p className="text-lg md:text-xl mb-4 md:mb-8 text-center">The data has completed its journey.</p>

      <div className="flex-grow w-full flex flex-col md:flex-row items-center justify-around gap-4 md:gap-0 px-4 md:px-66">
        {/* Sender Character */}
        <div className="flex items-center gap-2 md:gap-4">
          <CharacterSprite side="left" />
          <ComputerSprite />
        </div>

        {/* Messaging App */}
        <div className="flex flex-col items-center w-full md:w-auto">
          <MessagingApp title="Receiver's Chat">
            <div className="p-2 md:p-4">
              {/* We don't need a ref here since it's not being animated */}
              <ChatBubble text={l6Data.sample.plain} />
            </div>
          </MessagingApp>
        </div>

        {/* Receiver Character & Response */}
        <div className="flex flex-col items-center md:items-end">
          <ChatBubble text="Got it!" align="right" className="mb-2" />

        <div className="flex items-center justify-end gap-2">
          <ComputerSprite />
          <CharacterSprite side="right" />
        </div>
        </div>
      </div>

      <div className="mt-4 md:mt-8">
        <Button onClick={() => setCurrentStep("SUMMARY")}>View Summary</Button>
      </div>
    </motion.div>
  );
}
