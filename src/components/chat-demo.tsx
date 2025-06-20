/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
"use client"

import { useState } from "react"
import { useChat, type UseChatOptions } from "@ai-sdk/react"

import { Chat } from "./ui/chat"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

const MODELS = [
  { id: "gemini-1.5-flash", name: "Gemini 1.5 Flash" },
  { id: "deepseek-r1-distill-llama-70b", name: "Deepseek R1 70B" },
]

type ChatDemoProps = {
  initialMessages?: UseChatOptions["initialMessages"]
  transcribeAudio?: (blob: Blob) => Promise<string>
}

export function ChatDemo(props: ChatDemoProps) {
  const [selectedModel, setSelectedModel] = useState(MODELS[0]?.id ?? "llama-3.3-70b-versatile")
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    stop,
    status,
    setMessages,
  } = useChat({
    ...props,
    api: "/api/chat",
    body: {
      model: selectedModel,
    },
  })

  const isLoading = status === "submitted" || status === "streaming"

  return (
    <div className="w-full h-full flex">
      <div className="w-full max-w-9xl mx-52 h-full flex flex-col">
        {/* Header with model selector */}
        <div className="w-full flex items-center justify-between bg-background/50 py-6 px-8">
          <div className="min-w-0 flex-1 mr-4">
            <h1 className="text-2xl font-bold text-foreground truncate">Intello AI</h1>
            <p className="text-sm text-muted-foreground mt-1 truncate">Your intelligent assistant</p>
          </div>
          <div className="flex-shrink-0">
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Model" />
              </SelectTrigger>
              <SelectContent>
                {MODELS.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    {model.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col w-full overflow-y-auto">
          <div className="w-full h-full px-8">
            <Chat
              className="flex-1 flex flex-col w-full min-h-0"
              messages={messages}
              handleSubmit={handleSubmit}
              input={input}
              handleInputChange={handleInputChange}
              isGenerating={isLoading}
              stop={stop}
              append={append}
              setMessages={setMessages}
              transcribeAudio={props.transcribeAudio}
              suggestions={[
                "Who is the GOAT, Messi or Ronaldo?",
                "Explain step-by-step how to solve this math problem: If x² + 6x + 9 = 25, what is x?",
                "Design a simple algorithm to find the longest palindrome in a string.",
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}