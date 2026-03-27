<script lang="ts" module>
  export type DialogHeaderProps = {
    children?: import("svelte").Snippet;
  } & import("svelte/elements").HTMLAttributes<HTMLDivElement>;
</script>

<script lang="ts">
  import { cn } from "../../lib/utils";

  let { class: className, children, ...rest }: DialogHeaderProps = $props();
</script>

<div
  class={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
  {...rest}
>
  {#if children}{@render children()}{/if}
</div>
