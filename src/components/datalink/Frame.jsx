import React from 'react';
const Frame = React.forwardRef(({ frameHeader, children, headerRef, headerInfoRef }, ref) => {
  return (
    <div ref={ref} className="relative p-2 border-2 border-purple-500 rounded-lg bg-purple-500/10">
      <div ref={headerRef} className="absolute -top-5 left-1/2 -translate-x-1/2 bg-purple-500 text-white px-2 py-0.5 rounded-md text-xs font-mono whitespace-nowrap">
        <p>MAC HDR</p>
      </div>
      <div ref={headerInfoRef} className="absolute top-full mt-1 left-0 w-full text-center text-xs font-mono text-purple-300 bg-black/50 p-1 rounded">
unded">
        <p>SRC: {frameHeader.src}</p>
        <p>DST: {frameHeader.dst}</p>
      </div>
      {children}
    </div>
  );
});

export default Frame;
