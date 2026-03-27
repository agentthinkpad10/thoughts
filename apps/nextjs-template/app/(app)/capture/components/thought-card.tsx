"use client";

import { formatDistanceToNow } from "date-fns";
import { Trash2 } from "lucide-react";
import { Badge } from "@repo/react-ui/components/badge";
import { Button } from "@repo/react-ui/components/button";
import { Card, CardContent, CardHeader } from "@repo/react-ui/components/card";
import { Separator } from "@repo/react-ui/components/separator";

interface ThoughtCardProps {
  id: string;
  text: string;
  categories: { id: string; name: string }[];
  childrenCount: number;
  createdAt: Date;
  onDelete: (id: string) => void;
  onReply: (parentId: string) => void;
  isDeletingId?: string;
}

export function ThoughtCard({
  id,
  text,
  categories,
  childrenCount,
  createdAt,
  onDelete,
  onReply,
  isDeletingId,
}: ThoughtCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <p className="text-sm text-foreground whitespace-pre-wrap break-words">{text}</p>
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {categories.map((cat) => (
                  <Badge key={cat.id} variant="secondary" className="text-xs">
                    {cat.name}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(id)}
            disabled={isDeletingId === id}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="pt-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</span>
          <div className="flex gap-2">
            {childrenCount > 0 && <span>{childrenCount} reply(ies)</span>}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onReply(id)}
              className="text-xs"
            >
              Reply
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
