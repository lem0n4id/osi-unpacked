import { useEffect, useRef } from "react";
import { useUIState } from "../lib/state";
import { LAYERS } from "../data/layers";
import { makeTl } from "../lib/anim";
import Button from "../components/Button";
import LayerSummaryCard from "../components/summary/LayerSummaryCard";

export default function Summary() {
  const { setCurrentStep, setDirection } = useUIState();
  const containerRef = useRef(null);

  useEffect(() => {
    const cards = containerRef.current.children;
    const tl = makeTl();
    tl.fromTo(
      cards,
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.1,
        ease: "power2.out",
      }
    );
  }, []);

  const handleReplay = () => {
    setDirection("forward");
    setCurrentStep("IDLE");
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <div className="transition-transform duration-300 ease-in-out scale-[0.90] lg-custom:scale-100">
        <h1 className="text-4xl font-bold text-green-400 mt-4 mb-2 text-center">
          OSI Model: The Full Journey
        </h1>
        <div
          ref={containerRef}
          className="w-full max-w-4xl grid grid-cols-2 grid-rows-4 grid-flow-col gap-4 mb-8"
        >
          {LAYERS.map((layer, i) => (
            <LayerSummaryCard key={layer.id} layer={layer} delay={i} />
          ))}
          <div className="flex items-center justify-center">
            <Button onClick={handleReplay}>Replay Story</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
