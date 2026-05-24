import React, { useRef } from 'react';
import CharacterSprite from '../components/CharacterSprite';
import ComputerSprite from '../components/ComputerSprite';
import Cable from '../components/Cable';
import { useUIState } from '../lib/state.jsx';
import { makeTl } from '../lib/anim';

const IdleScene = () => {
  const { setCurrentStep, setCurrentLayer } = useUIState();
  const monitorRef = useRef(null);

  const handleSend = () => {
    const tl = makeTl();
    const monitor = monitorRef.current;
    
    // Find the main scene container, which is the nearest ancestor with class 'relative'
    const scene = monitor.closest('.relative');
    if (!scene) return;

    // Get coordinates relative to the viewport
    const sceneRect = scene.getBoundingClientRect();
    const monitorRect = monitor.getBoundingClientRect();

    // Calculate the distance to move the monitor to be centered within the scene
    const targetX = (sceneRect.left + sceneRect.width / 2) - (monitorRect.left + monitorRect.width / 2);
    const targetY = (sceneRect.top + sceneRect.height / 2) - (monitorRect.top + monitorRect.height / 2);

    tl.to(monitor, {
      x: targetX,
      y: targetY,
      duration: 1,
      ease: 'power2.inOut',
    }).to(monitor, {
      scale: 4.5, // Zoom in after moving
      duration: 1,
      ease: 'expo.inOut',
      onComplete: () => {
        setCurrentStep('L7');
        setCurrentLayer(7);
      },
    });
  };

  return (
    <div className="relative w-full h-full flex flex-col md:flex-row justify-between items-end p-4 md:p-10 gap-4">
      {/* Left side */}
      <div className="flex items-end space-x-2 md:space-x-4">
        <CharacterSprite state="idle" />
        <ComputerSprite ref={monitorRef} />
        <button
          onClick={handleSend}
          className="self-center mt-12 md:mt-20 bg-green-600 hover:bg-green-700 text-white font-bold py-1.5 md:py-2 px-3 md:px-4 rounded transition-colors duration-300 text-sm md:text-base"
        >
          Send Message
        </button>
      </div>

      <div className="hidden md:block">
        <Cable />
      </div>

      {/* Right side */}
      <div className="flex items-end space-x-2 md:space-x-4">
        <ComputerSprite />
        <CharacterSprite state="idle" />
      </div>
    </div>
  );
};

export default IdleScene;
