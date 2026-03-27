<script lang="ts" module>
  export type SheetHeaderProps = {
    children?: import("svelte").Snippet;
  } & import("svelte/elements").HTMLAttributes<HTMLDivElement>;
</script>

<script lang="ts">
  import { cn } from "../../lib/utils";

  let { class: className, children, ...rest }: SheetHeaderProps = $props();
</script>

<div
  class={cn("flex flex-col space-y-2 text-center sm:text-left", className)}
  {...rest}
>
  {#if children}{@render children()}{/if}
</div>
