import React from 'react';

const SignalPulse = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className="absolute w-3 h-3 rounded-full bg-yellow-300" style={{ opacity: 0 }} />
  );
});

export default SignalPulse;
