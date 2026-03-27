<script lang="ts" module>
  export type CardProps = {
    children?: import("svelte").Snippet;
  } & import("svelte/elements").HTMLAttributes<HTMLDivElement>;
</script>

<script lang="ts">
  import { cn } from "../../lib/utils";

  let { class: className, children, ...rest }: CardProps = $props();
</script>

<div
  class={cn(
    "rounded-lg border border-border bg-card text-card-foreground shadow-sm",
    className
  )}
  {...rest}
>
  {#if children}{@render children()}{/if}
</div>
