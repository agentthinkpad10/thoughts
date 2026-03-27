<script lang="ts" module>
  export type CardDescriptionProps = {
    children?: import("svelte").Snippet;
  } & import("svelte/elements").HTMLAttributes<HTMLDivElement>;
</script>

<script lang="ts">
  import { cn } from "../../lib/utils";

  let { class: className, children, ...rest }: CardDescriptionProps = $props();
</script>

<div class={cn("text-sm text-muted-foreground", className)} {...rest}>
  {#if children}{@render children()}{/if}
</div>
