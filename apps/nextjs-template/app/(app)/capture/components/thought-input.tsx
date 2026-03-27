"use client";

import { useRef } from "react";
import { Button } from "@repo/react-ui/components/button";
import { Textarea } from "@repo/react-ui/components/textarea";

interface ThoughtInputProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

export function ThoughtInput({ onSubmit, isLoading }: ThoughtInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    const text = textareaRef.current?.value.trim();
    if (text) {
      onSubmit(text);
      if (textareaRef.current) {
        textareaRef.current.value = "";
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleSubmit();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 400) + "px";
  };

  return (
    <div className="space-y-4">
      <Textarea
        ref={textareaRef}
        placeholder="What's on your mind?"
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        className="min-h-[120px] resize-none"
      />
      <Button
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? "Processing..." : "Capture"}
      </Button>
    </div>
  );
}
