import React from 'react';
import { CgCreditCard } from 'react-icons/cg';

const NIC = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className="flex flex-col items-center gap-2 p-4 bg-gray-800 border-2 border-gray-600 rounded-lg">
      <CgCreditCard className="text-6xl text-green-400" />
      <span className="font-mono text-sm">Network Interface Card</span>
    </div>
  );
});

export default NIC;
