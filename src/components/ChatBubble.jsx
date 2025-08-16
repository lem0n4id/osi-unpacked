import { forwardRef } from "react";

const ChatBubble = forwardRef(({ text, isAnimated = false, align = 'left', className = '' }, ref) => (
  <div
    ref={ref}
    className={`p-4 rounded-lg max-w-md text-lg ${
      align === 'left'
        ? 'bg-blue-600 rounded-bl-none'
        : 'bg-green-700 rounded-br-none'
    } ${className}`}
  >
    {text.split("").map((char, i) => (
      <span key={i} className={`inline-block ${isAnimated ? 'opacity-0' : ''}`}>
        {char === " " ? "\u00A0" : char}
      </span>
    ))}
  </div>
));

ChatBubble.displayName = "ChatBubble";

export default ChatBubble;
