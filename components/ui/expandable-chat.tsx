"use client";

import React, { useRef, useState } from "react";
import { X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type ChatPosition = "bottom-right" | "bottom-left";
export type ChatSize = "sm" | "md" | "lg" | "xl" | "full";

const chatConfig = {
  dimensions: {
    sm: "sm:max-w-sm sm:max-h-[500px]",
    md: "sm:max-w-md sm:max-h-[600px]",
    lg: "sm:max-w-lg sm:max-h-[700px]",
    xl: "sm:max-w-xl sm:max-h-[800px]",
    full: "sm:w-full sm:h-full",
  },
  positions: {
    "bottom-right": "bottom-5 right-5",
    "bottom-left": "bottom-5 left-5",
  },
  chatPositions: {
    "bottom-right": "sm:bottom-[calc(100%+10px)] sm:right-0",
    "bottom-left": "sm:bottom-[calc(100%+10px)] sm:left-0",
  },
  states: {
    open: "pointer-events-auto opacity-100 visible scale-100 translate-y-0",
    closed:
      "pointer-events-none opacity-0 invisible scale-100 sm:translate-y-5",
  },
};

interface ExpandableChatProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: ChatPosition;
  size?: ChatSize;
  icon?: React.ReactNode;
  onOpenChange?: (isOpen: boolean) => void;
}

const ExpandableChat: React.FC<ExpandableChatProps> = ({
  className,
  position = "bottom-right",
  size = "md",
  icon,
  children,
  onOpenChange,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onOpenChange?.(newState);
  };

  return (
    <div
      className={cn(`fixed ${chatConfig.positions[position]} z-50`, className)}
      {...props}
    >
      <div
        ref={chatRef}
        className={cn(
          "flex flex-col bg-background border sm:rounded-lg shadow-md overflow-hidden transition-all duration-250 ease-out sm:absolute sm:w-[90vw] sm:h-[80vh] fixed inset-0 w-full h-full sm:inset-auto",
          chatConfig.chatPositions[position],
          chatConfig.dimensions[size],
          isOpen ? chatConfig.states.open : chatConfig.states.closed,
          className,
        )}
      >
        {children}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 sm:hidden"
          onClick={toggleChat}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <ExpandableChatToggle
        icon={icon}
        isOpen={isOpen}
        toggleChat={toggleChat}
      />
    </div>
  );
};

ExpandableChat.displayName = "ExpandableChat";

const ExpandableChatHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={cn("flex items-center justify-between p-4 border-b", className)}
    {...props}
  />
);

ExpandableChatHeader.displayName = "ExpandableChatHeader";

const ExpandableChatBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={cn("flex-grow overflow-y-auto", className)} {...props} />;

ExpandableChatBody.displayName = "ExpandableChatBody";

const ExpandableChatFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={cn("border-t p-4", className)} {...props} />;

ExpandableChatFooter.displayName = "ExpandableChatFooter";

interface ExpandableChatToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  isOpen: boolean;
  toggleChat: () => void;
}

const ExpandableChatToggle: React.FC<ExpandableChatToggleProps> = ({
  className,
  icon,
  isOpen,
  toggleChat,
  ...props
}) => (
  <div
    onClick={toggleChat}
    className={cn(
      "cursor-pointer focus:outline-none",
      className,
    )}
    style={{ outline: 'none' }}
    {...props}
  >
    {isOpen ? (
      <svg className="w-12 h-12 rounded-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ outline: 'none' }}>
        <defs>
          <linearGradient id="close-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: '#f59e0b', stopOpacity: 1}} />
            <stop offset="33%" style={{stopColor: '#ef4444', stopOpacity: 1}} />
            <stop offset="66%" style={{stopColor: '#ec4899', stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: '#a855f7', stopOpacity: 1}} />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="38" stroke="url(#close-gradient)" strokeWidth="8" fill="none" />
        <line x1="35" y1="35" x2="65" y2="65" stroke="url(#close-gradient)" strokeWidth="6" strokeLinecap="round" />
        <line x1="65" y1="35" x2="35" y2="65" stroke="url(#close-gradient)" strokeWidth="6" strokeLinecap="round" />
      </svg>
    ) : (
      icon || <MessageCircle className="h-6 w-6" />
    )}
  </div>
);

ExpandableChatToggle.displayName = "ExpandableChatToggle";

export {
  ExpandableChat,
  ExpandableChatHeader,
  ExpandableChatBody,
  ExpandableChatFooter,
};
