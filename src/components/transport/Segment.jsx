import React from 'react';

const Segment = React.forwardRef(({ segment, ports }, ref) => (
    <div ref={ref} className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 rounded-lg p-2">
        <div className="text-xs font-mono bg-gray-900 p-1 rounded mb-2 flex justify-between">
            <span className='mr-2'>Src Port: <span className="text-yellow-400">{ports.src}</span></span>
            <span className='mr-2'>Dst Port: <span className="text-yellow-400">{ports.dst}</span></span>
            <span>Seq: <span className="text-green-400">{segment.seq}</span></span>
        </div>
        <pre className="text-center text-sm text-purple-400">{segment.data}</pre>
    </div>
));

export default Segment;
