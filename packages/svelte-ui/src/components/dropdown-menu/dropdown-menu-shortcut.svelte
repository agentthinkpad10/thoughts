<script lang="ts" module>
  export type DropdownMenuShortcutProps = {
    children?: import("svelte").Snippet;
  } & import("svelte/elements").HTMLAttributes<HTMLSpanElement>;
</script>

<script lang="ts">
  import { cn } from "../../lib/utils";

  let { class: className, children, ...rest }: DropdownMenuShortcutProps = $props();
</script>

<span class={cn("ml-auto text-xs tracking-widest opacity-60", className)} {...rest}>
  {#if children}{@render children()}{/if}
</span>
