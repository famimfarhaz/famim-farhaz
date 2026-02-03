"use client"

import { useState, FormEvent, useEffect } from "react"
import { Send, Bot, Paperclip, Mic, CornerDownLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import ReactMarkdown from "react-markdown"
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat-bubble"
import { ChatInput } from "@/components/ui/chat-input"
import {
  ExpandableChat,
  ExpandableChatHeader,
  ExpandableChatBody,
  ExpandableChatFooter,
} from "@/components/ui/expandable-chat"
import { ChatMessageList } from "@/components/ui/chat-message-list"

export function ExpandableChatDemo() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Hello! I'm Famim's AI assistant. Feel free to ask anything about his services, projects, or book a free demo!",
      sender: "ai",
    },
  ])

  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input
    const newUserMessage = {
      id: messages.length + 1,
      content: userMessage,
      sender: "user",
    }

    setMessages((prev) => [...prev, newUserMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: messages,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            content: data.message,
            sender: "ai",
          },
        ])
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            content: "Sorry, I couldn't process your request. Please try again.",
            sender: "ai",
          },
        ])
      }
    } catch (error) {
      console.error('Chat error:', error)
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          content: "Sorry, something went wrong. Please try again later.",
          sender: "ai",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleAttachFile = () => {
    //
  }

  const handleMicrophoneClick = () => {
    //
  }

  useEffect(() => {
    // Show tooltip after 3.5 seconds
    const tooltipTimer = setTimeout(() => {
      setShowTooltip(true)
    }, 3500)

    // Hide tooltip after 8 seconds total (3.5s delay + 4.5s display)
    const hideTimer = setTimeout(() => {
      setShowTooltip(false)
    }, 8000)

    return () => {
      clearTimeout(tooltipTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  // Show tooltip on hover (only when chat is closed)
  useEffect(() => {
    if (isHovering && !isChatOpen) {
      setShowTooltip(true)
    } else {
      // Add a small delay before hiding on mouse leave
      const hideTimer = setTimeout(() => {
        setShowTooltip(false)
      }, 300)
      return () => clearTimeout(hideTimer)
    }
  }, [isHovering, isChatOpen])

  // Hide tooltip when chat opens
  useEffect(() => {
    if (isChatOpen) {
      setShowTooltip(false)
    }
  }, [isChatOpen])

  return (
    <div className="relative">
      <div 
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <ExpandableChat
          size="lg"
          position="bottom-right"
          onOpenChange={setIsChatOpen}
          icon={
            <svg className="w-12 h-12 rounded-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ outline: 'none' }}>
              <defs>
                <linearGradient id="chat-icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: '#f59e0b', stopOpacity: 1}} />
                  <stop offset="33%" style={{stopColor: '#ef4444', stopOpacity: 1}} />
                  <stop offset="66%" style={{stopColor: '#ec4899', stopOpacity: 1}} />
                  <stop offset="100%" style={{stopColor: '#a855f7', stopOpacity: 1}} />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="38" stroke="url(#chat-icon-gradient)" strokeWidth="8" fill="none" />
            </svg>
          }
        >
      <ExpandableChatHeader className="flex-col text-center justify-center">
        <h1 className="text-xl font-semibold">Chat with AI ✨</h1>
        <p className="text-sm text-muted-foreground">
          Ask me anything about Famim's services
        </p>
      </ExpandableChatHeader>

      <ExpandableChatBody>
        <ChatMessageList>
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              variant={message.sender === "user" ? "sent" : "received"}
            >
              {message.sender === "user" ? (
                <div className="h-8 w-8 shrink-0 rounded-full bg-white border border-black/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="4" fill="currentColor" />
                    <circle cx="12" cy="4" r="2" fill="currentColor" />
                    <circle cx="12" cy="20" r="2" fill="currentColor" />
                    <circle cx="4" cy="12" r="2" fill="currentColor" />
                    <circle cx="20" cy="12" r="2" fill="currentColor" />
                  </svg>
                </div>
              ) : (
                <div className="h-8 w-8 shrink-0 rounded-full bg-black flex items-center justify-center">
                  <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor: '#f59e0b', stopOpacity: 1}} />
                        <stop offset="33%" style={{stopColor: '#ef4444', stopOpacity: 1}} />
                        <stop offset="66%" style={{stopColor: '#ec4899', stopOpacity: 1}} />
                        <stop offset="100%" style={{stopColor: '#a855f7', stopOpacity: 1}} />
                      </linearGradient>
                    </defs>
                    <circle cx="50" cy="50" r="35" stroke="url(#gradient)" strokeWidth="10" fill="none" />
                  </svg>
                </div>
              )}
              <ChatBubbleMessage
                variant={message.sender === "user" ? "sent" : "received"}
              >
                {message.sender === "ai" ? (
                  <div className="text-sm">
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                        strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                        em: ({ children }) => <em className="italic">{children}</em>,
                        ul: ({ children }) => <ul className="list-disc ml-4 mb-2 space-y-1">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal ml-4 mb-2 space-y-1">{children}</ol>,
                        li: ({ children }) => <li className="text-sm">{children}</li>,
                        a: ({ children, href }) => (
                          <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                            {children}
                          </a>
                        ),
                        h1: ({ children }) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-base font-bold mb-2">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-sm font-bold mb-1">{children}</h3>,
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  message.content
                )}
              </ChatBubbleMessage>
            </ChatBubble>
          ))}

          {isLoading && (
            <ChatBubble variant="received">
              <div className="h-8 w-8 shrink-0 rounded-full bg-black flex items-center justify-center animate-pulse">
                <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="gradient-loading" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#f59e0b', stopOpacity: 1}} />
                      <stop offset="33%" style={{stopColor: '#ef4444', stopOpacity: 1}} />
                      <stop offset="66%" style={{stopColor: '#ec4899', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: '#a855f7', stopOpacity: 1}} />
                    </linearGradient>
                  </defs>
                  <circle cx="50" cy="50" r="35" stroke="url(#gradient-loading)" strokeWidth="10" fill="none" />
                </svg>
              </div>
              <ChatBubbleMessage isLoading />
            </ChatBubble>
          )}
        </ChatMessageList>
      </ExpandableChatBody>

      <ExpandableChatFooter>
        <form
          onSubmit={handleSubmit}
          className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1"
        >
          <ChatInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
          />
          <div className="flex items-center p-3 pt-0 justify-between">
            <div className="flex">
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={handleAttachFile}
              >
                <Paperclip className="size-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={handleMicrophoneClick}
              >
                <Mic className="size-4" />
              </Button>
            </div>
            <Button type="submit" size="sm" className="ml-auto gap-1.5">
              Send Message
              <CornerDownLeft className="size-3.5" />
            </Button>
          </div>
        </form>
      </ExpandableChatFooter>
        </ExpandableChat>
      </div>
    
    {/* Tooltip */}
    {showTooltip && (
      <div className="fixed bottom-24 right-5 z-50 animate-in fade-in slide-in-from-bottom-2 duration-300">
        <div className="relative">
          <div className="bg-black px-4 py-2.5 rounded-lg shadow-lg text-sm font-medium whitespace-nowrap relative overflow-hidden" style={{ padding: '2px' }}>
            <div className="absolute inset-0 rounded-lg" style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 33%, #ec4899 66%, #a855f7 100%)',
            }}></div>
            <div className="relative bg-black px-3 py-2 rounded-[6px] text-white">
              Chat with my AI
            </div>
          </div>
          {/* Arrow pointing down */}
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 rotate-45" style={{
            background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 33%, #ec4899 66%, #a855f7 100%)',
          }}></div>
        </div>
      </div>
    )}
    </div>
  )
}
