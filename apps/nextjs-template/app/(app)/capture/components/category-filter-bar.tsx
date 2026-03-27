"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Badge } from "@repo/react-ui/components/badge";
import { Button } from "@repo/react-ui/components/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@repo/react-ui/components/dialog";
import { Input } from "@repo/react-ui/components/input";

interface CategoryFilterBarProps {
  categories: { id: string; name: string }[];
  selectedCategoryId: string | undefined;
  onSelectCategory: (categoryId: string | undefined) => void;
  onCreateCategory: (name: string) => void;
  isLoadingCategories: boolean;
  isCreatingCategory: boolean;
}

export function CategoryFilterBar({
  categories,
  selectedCategoryId,
  onSelectCategory,
  onCreateCategory,
  isLoadingCategories,
  isCreatingCategory,
}: CategoryFilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleCreate = async () => {
    if (newCategoryName.trim()) {
      onCreateCategory(newCategoryName);
      setNewCategoryName("");
      setIsOpen(false);
    }
  };

  if (isLoadingCategories) {
    return <div className="text-sm text-muted-foreground">Loading categories...</div>;
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge
        variant={selectedCategoryId ? "outline" : "default"}
        className="cursor-pointer"
        onClick={() => onSelectCategory(undefined)}
      >
        All
      </Badge>

      {categories.map((cat) => (
        <Badge
          key={cat.id}
          variant={selectedCategoryId === cat.id ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => onSelectCategory(cat.id)}
        >
          {cat.name}
        </Badge>
      ))}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Category name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            />
            <Button onClick={handleCreate} disabled={isCreatingCategory} className="w-full">
              {isCreatingCategory ? "Creating..." : "Create"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
