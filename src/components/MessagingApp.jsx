import React from 'react';

const MessagingApp = React.forwardRef(({ children, title }, ref) => {
  return (
    <div
      ref={ref}
      className="w-full max-w-[450px] h-[200px] md:h-[250px] bg-gray-800/80 border-2 border-gray-600 rounded-lg shadow-lg flex flex-col"
    >
      <div className="bg-gray-700 text-white p-2 rounded-t-lg text-center font-bold text-sm md:text-base">
        {title}
      </div>
      <div className="flex-grow p-2 md:p-4 overflow-y-auto flex flex-col justify-end">
        {children}
      </div>
    </div>
  );
});

MessagingApp.displayName = 'MessagingApp';
export default MessagingApp;
