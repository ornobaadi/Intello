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
  { id: "llama-3.3-70b-versatile", name: "Llama 3.3 70B" },
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
    <div className="flex flex-col p-6 h-full min-w-0">
      {/* Header with model selector */}
      <div className="flex items-center justify-between bg-background/50 min-w-0">
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
      <div className="flex-1 min-h-0 min-w-0">
        <Chat
          className="h-auto min-h-96"
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
  )
}