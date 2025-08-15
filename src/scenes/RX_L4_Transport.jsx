import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useUIState } from '../lib/state.jsx';
import { LAYERS } from '../data/layers.jsx';
import { scene, fadeIn } from '../lib/FramerMotion.jsx';
import Segment from '../components/transport/Segment.jsx';
import InfoBox from '../components/transport/InfoBox.jsx';
import Button from '../components/Button.jsx';
import { BsArrowUp } from 'react-icons/bs';

const RX_L4_Transport = () => {
    const { setCurrentStep } = useUIState();
    const layerData = LAYERS.find(l => l.id === 4);
    const segmentRefs = useRef([]);
    const dataBlockRef = useRef(null);
    const arrowRef = useRef(null);
    const [showInfo, setShowInfo] = useState(false);

    useEffect(() => {
        if (!layerData) return;

        const tl = gsap.timeline({
            onComplete: () => setShowInfo(true)
        });

        gsap.set(dataBlockRef.current, { autoAlpha: 0 });
        gsap.set(arrowRef.current, { autoAlpha: 0 });

        tl
            .to(segmentRefs.current, {
                y: -20,
                autoAlpha: 0,
                stagger: 0.2,
                duration: 0.8,
                ease: 'power2.in'
            }, "+=1.0")
            .to(arrowRef.current, { autoAlpha: 1, duration: 0.5 }, "-=0.5")
            .to(dataBlockRef.current, { autoAlpha: 1, duration: 0.8, ease: 'power2.out' })
            .to(arrowRef.current, { autoAlpha: 0, duration: 0.3 });

        return () => tl.kill();
    }, [layerData]);

    const handleNext = () => {
        setCurrentStep('L5_RECV');
    };

    if (!layerData) return null;

    return (
        <motion.div variants={scene} initial="hidden" animate="visible" exit="hidden" className="flex flex-col items-center justify-start h-full bg-gray-900 text-white p-8 pt-16">
            <h2 className="text-3xl font-bold mb-4 text-teal-400">Layer 4: Transport (Receiving)</h2>
            <p className="text-lg mb-8 max-w-2xl text-center">Segments are reordered by sequence number and reassembled into a single data stream.</p>
            <div className="flex-grow flex flex-col justify-center items-center gap-2 w-full">

                <div ref={dataBlockRef} className="w-full max-w-md p-4 bg-gray-900 rounded-lg border-2 border-purple-500">
                    <h3 className="text-center font-bold text-purple-400">Reassembled Data Stream</h3>
                </div>

                <div ref={arrowRef} className="my-2 opacity-0">
                    <BsArrowUp className="text-4xl text-green-400" />
                </div>

                <div className="flex justify-center items-start gap-4">
                    {layerData.sample.segments.map((seg, i) => (
                        <Segment
                            key={seg.seq}
                            segment={seg}
                            ports={layerData.sample.ports}
                            ref={el => segmentRefs.current[i] = el}
                        />
                    ))}
                </div>
            </div>

            {showInfo && (
                <motion.div variants={fadeIn} initial="hidden" animate="visible" exit="hidden" className="mt-8 w-full max-w-3xl absolute bottom-8">
                    <div className="mt-8">
                        <InfoBox layer={layerData} className="pb-12" />
                        <div className="absolute bottom-1 right-4">

                            <button
                                onClick={handleNext}
                                className="px-2 py-1 mb-2 mr-2 bg-green-500 text-black font-bold rounded hover:bg-green-400 transition-colors"
                            >
                                Next: Session Check
                            </button>
                        </div>

                    </div>

                </motion.div>
            )}
        </motion.div>
    );
};

export default RX_L4_Transport;
