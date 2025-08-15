import { forwardRef } from "react";

const ChatBubble = forwardRef(({ text }, ref) => (
  <div
    ref={ref}
    className="bg-blue-600 p-4 rounded-lg rounded-bl-none max-w-md text-lg"
  >
    {text.split("").map((char, i) => (
      <span key={i} className="inline-block opacity-0">
        {char === " " ? "\u00A0" : char}
      </span>
    ))}
  </div>
));

ChatBubble.displayName = "ChatBubble";

export default ChatBubble;
