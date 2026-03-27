<script lang="ts" module>
  export type CardTitleProps = {
    children?: import("svelte").Snippet;
  } & import("svelte/elements").HTMLAttributes<HTMLDivElement>;
</script>

<script lang="ts">
  import { cn } from "../../lib/utils";

  let { class: className, children, ...rest }: CardTitleProps = $props();
</script>

<div class={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...rest}>
  {#if children}{@render children()}{/if}
</div>
