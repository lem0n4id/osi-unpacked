import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Packet = React.forwardRef(({ children, ipHeader, animateIn = false }, ref) => {
  const ipHeaderRef = useRef(null);
  const selfRef = useRef(null);
  const ipLabelRef = useRef(null);

  useEffect(() => {
    if (!animateIn) return;

    const tl = gsap.timeline();
    if (selfRef.current && ipHeaderRef.current && ipLabelRef.current) {
      // Use fromTo for more reliable animations
      // Use fromTo for more reliable animations
      tl.fromTo(selfRef.current, 
          { autoAlpha: 0, scale: 0.9 },
          { autoAlpha: 1, scale: 1, duration: 1.5, ease: 'power2.out' }
        )
        .fromTo([ipHeaderRef.current, ipLabelRef.current], 
          { y: (i) => i === 0 ? -20 : 10, autoAlpha: 0 }, // ipHeader y:-20, ipLabel y:10
          { y: 0, autoAlpha: 1, duration: 1.5, ease: 'power2.out', stagger: 0.1 }, 
          "-=0.5"
        );
    }
    return () => tl.kill();
  }, [animateIn]);

  return (
    <div ref={ref} className="relative mt-4">
      <div ref={ipLabelRef} className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-2 bg-blue-500 text-white text-xs font-bold rounded ip-label">IP</div>
      <div ref={selfRef} className="p-2 border-2 border-blue-500 bg-gray-800 rounded-lg flex flex-col gap-2">
        {/* IP Header is now part of the main component body */}
        <div ref={ipHeaderRef} className="text-xs font-mono bg-gray-900 p-1 rounded flex justify-between ip-header">
            <span>Src: <span className="text-yellow-400">{ipHeader.src}</span></span>
            <span>Dst: <span className="text-yellow-400">{ipHeader.dst}</span></span>
        </div>
        {/* Children are rendered below the header */}
        {children}
      </div>
    </div>
  );
});

export default Packet;
