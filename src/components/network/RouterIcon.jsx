import React from 'react';
import { BsRouter } from 'react-icons/bs';

const RouterIcon = React.forwardRef((props, ref) => (
  <div ref={ref} className="flex flex-col items-center gap-1">
    <BsRouter className="text-3xl text-blue-400" />
    <span className="text-xs font-mono">{props.label}</span>
  </div>
));

export default RouterIcon;
