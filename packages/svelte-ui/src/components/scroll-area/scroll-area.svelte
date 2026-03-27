<script lang="ts" module>
  import type { ScrollArea as ScrollAreaType } from "bits-ui";
  export type ScrollAreaProps = ScrollAreaType.RootProps & { class?: string };
</script>

<script lang="ts">
  import { ScrollArea } from "bits-ui";
  import { cn } from "../../lib/utils";

  let { class: className, children, ...rest }: ScrollAreaProps = $props();
</script>

<ScrollArea.Root class={cn("relative overflow-hidden", className)} {...rest}>
  <ScrollArea.Viewport class="h-full w-full rounded-[inherit]">
    {#if children}{@render children()}{/if}
  </ScrollArea.Viewport>
  <ScrollArea.Scrollbar
    orientation="vertical"
    class={cn(
      "flex touch-none select-none transition-colors",
      "h-full w-2.5 border-l border-l-transparent p-[1px]"
    )}
  >
    <ScrollArea.Thumb class="relative flex-1 rounded-full bg-border" />
  </ScrollArea.Scrollbar>
  <ScrollArea.Scrollbar
    orientation="horizontal"
    class={cn(
      "flex touch-none select-none transition-colors",
      "h-2.5 flex-col border-t border-t-transparent p-[1px]"
    )}
  >
    <ScrollArea.Thumb class="relative flex-1 rounded-full bg-border" />
  </ScrollArea.Scrollbar>
  <ScrollArea.Corner />
</ScrollArea.Root>
