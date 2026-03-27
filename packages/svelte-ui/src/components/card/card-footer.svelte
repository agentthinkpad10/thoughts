<script lang="ts" module>
  export type CardFooterProps = {
    children?: import("svelte").Snippet;
  } & import("svelte/elements").HTMLAttributes<HTMLDivElement>;
</script>

<script lang="ts">
  import { cn } from "../../lib/utils";

  let { class: className, children, ...rest }: CardFooterProps = $props();
</script>

<div class={cn("flex items-center p-6 pt-0", className)} {...rest}>
  {#if children}{@render children()}{/if}
</div>
