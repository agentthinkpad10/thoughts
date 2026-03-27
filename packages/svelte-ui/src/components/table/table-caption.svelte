<script lang="ts" module>
  export type TableCaptionProps = {
    children?: import("svelte").Snippet;
  } & import("svelte/elements").HTMLAttributes<HTMLElement>;
</script>

<script lang="ts">
  import { cn } from "../../lib/utils";

  let { class: className, children, ...rest }: TableCaptionProps = $props();
</script>

<caption class={cn("mt-4 text-sm text-muted-foreground", className)} {...rest}>
  {#if children}{@render children()}{/if}
</caption>
