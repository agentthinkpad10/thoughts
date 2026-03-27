"use client";

import { ThoughtCard } from "./thought-card";

interface Thought {
  id: string;
  text: string;
  createdAt: Date;
  thoughtCategories: Array<{ category: { id: string; name: string } }>;
  children: Array<{ id: string; text: string; createdAt: Date }>;
}

interface ThoughtListProps {
  thoughts: Thought[];
  onDelete: (id: string) => void;
  onReply: (parentId: string) => void;
  isDeletingId?: string;
  isLoadingThoughts: boolean;
}

export function ThoughtList({
  thoughts,
  onDelete,
  onReply,
  isDeletingId,
  isLoadingThoughts,
}: ThoughtListProps) {
  if (isLoadingThoughts) {
    return <div className="text-center text-sm text-muted-foreground">Loading thoughts...</div>;
  }

  if (thoughts.length === 0) {
    return (
      <div className="text-center py-12 text-sm text-muted-foreground">
        No thoughts yet. Start by capturing one above.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {thoughts.map((thought) => (
        <ThoughtCard
          key={thought.id}
          id={thought.id}
          text={thought.text}
          categories={thought.thoughtCategories.map((tc) => tc.category)}
          childrenCount={thought.children.length}
          createdAt={thought.createdAt}
          onDelete={onDelete}
          onReply={onReply}
          isDeletingId={isDeletingId}
        />
      ))}
    </div>
  );
}
