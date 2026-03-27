<script lang="ts" module>
  export type CardHeaderProps = {
    children?: import("svelte").Snippet;
  } & import("svelte/elements").HTMLAttributes<HTMLDivElement>;
</script>

<script lang="ts">
  import { cn } from "../../lib/utils";

  let { class: className, children, ...rest }: CardHeaderProps = $props();
</script>

<div class={cn("flex flex-col space-y-1.5 p-6", className)} {...rest}>
  {#if children}{@render children()}{/if}
</div>
