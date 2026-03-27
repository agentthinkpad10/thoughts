<script lang="ts" module>
  export type CardContentProps = {
    children?: import("svelte").Snippet;
  } & import("svelte/elements").HTMLAttributes<HTMLDivElement>;
</script>

<script lang="ts">
  import { cn } from "../../lib/utils";

  let { class: className, children, ...rest }: CardContentProps = $props();
</script>

<div class={cn("p-6 pt-0", className)} {...rest}>
  {#if children}{@render children()}{/if}
</div>
