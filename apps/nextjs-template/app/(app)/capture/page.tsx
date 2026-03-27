"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "../../trpc";
import { ThoughtInput } from "./components/thought-input";
import { CategoryFilterBar } from "./components/category-filter-bar";
import { ThoughtList } from "./components/thought-list";
import { thoughtsQueryOptions, createThoughtMutationOptions, deleteThoughtMutationOptions } from "../../queries/thoughts";
import { categoriesQueryOptions, createCategoryMutationOptions } from "../../queries/categories";
import { Button } from "@repo/react-ui/components/button";
import { signOut } from "../../../auth";

interface Thought {
  id: string;
  text: string;
  createdAt: Date;
  thoughtCategories: Array<{ category: { id: string; name: string } }>;
  children: Array<{ id: string; text: string; createdAt: Date }>;
}

interface Category {
  id: string;
  name: string;
}

export default function CapturePage() {
  const queryClient = useQueryClient();
  const trpc = useTRPC();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>();
  const [replyingToId, setReplyingToId] = useState<string | undefined>();

  // Queries
  const { data: thoughtsData = [], isLoading: isLoadingThoughts } = useQuery(
    thoughtsQueryOptions(trpc, { parentThoughtId: replyingToId })
  );
  const thoughts = (thoughtsData || []) as Thought[];

  const { data: categoriesData = [], isLoading: isLoadingCategories } = useQuery(
    categoriesQueryOptions(trpc)
  );
  const categories = (categoriesData || []) as Category[];

  // Mutations
  const createMutation = useMutation({
    ...createThoughtMutationOptions(trpc),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: (trpc.thoughts.list as any).getQueryKey?.() });
      queryClient.invalidateQueries({ queryKey: (trpc.categories.list as any).getQueryKey?.() });
      setReplyingToId(undefined);
    },
  });

  const deleteMutation = useMutation({
    ...deleteThoughtMutationOptions(trpc),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: (trpc.thoughts.list as any).getQueryKey?.() });
    },
  });

  const createCategoryMutation = useMutation({
    ...createCategoryMutationOptions(trpc),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: (trpc.categories.list as any).getQueryKey?.() });
    },
  });

  // Handlers
  const handleCreateThought = (text: string) => {
    createMutation.mutate({
      text,
      parentThoughtId: replyingToId,
    });
  };

  const handleDeleteThought = (id: string) => {
    if (confirm("Delete this thought? This cannot be undone.")) {
      deleteMutation.mutate({ id });
    }
  };

  const handleReply = (parentId: string) => {
    setReplyingToId(parentId);
  };

  const handleCreateCategory = (name: string) => {
    createCategoryMutation.mutate({ name });
  };

  // Filter thoughts by category if selected
  const filteredThoughts = selectedCategoryId
    ? thoughts.filter((t: Thought) => t.thoughtCategories.some((tc) => tc.category.id === selectedCategoryId))
    : thoughts;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card sticky top-0 z-50">
        <div className="mx-auto max-w-2xl px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Thoughts</h1>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <Button variant="outline" size="sm" type="submit">
              Sign out
            </Button>
          </form>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-2xl px-4 py-8 space-y-8">
        {/* Capture input */}
        <div className="space-y-2">
          {replyingToId && (
            <div className="text-sm text-muted-foreground bg-muted p-2 rounded">
              Replying to: {thoughts.find((t) => t.id === replyingToId)?.text?.slice(0, 50)}...
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setReplyingToId(undefined)}
                className="ml-2"
              >
                Cancel
              </Button>
            </div>
          )}
          <ThoughtInput onSubmit={handleCreateThought} isLoading={createMutation.isPending} />
        </div>

        {/* Category filter */}
        <div>
          <h2 className="text-sm font-semibold text-foreground mb-3">Categories</h2>
          <CategoryFilterBar
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={setSelectedCategoryId}
            onCreateCategory={handleCreateCategory}
            isLoadingCategories={isLoadingCategories}
            isCreatingCategory={createCategoryMutation.isPending}
          />
        </div>

        {/* Thoughts list */}
        <div>
          <h2 className="text-sm font-semibold text-foreground mb-3">
            {replyingToId ? "Replies" : "Thoughts"}
          </h2>
          <ThoughtList
            thoughts={filteredThoughts}
            onDelete={handleDeleteThought}
            onReply={handleReply}
            isDeletingId={deleteMutation.variables?.id}
            isLoadingThoughts={isLoadingThoughts}
          />
        </div>
      </div>
    </div>
  );
}
