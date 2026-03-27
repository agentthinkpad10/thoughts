<script lang="ts" module>
  export type AlertDialogFooterProps = {
    children?: import("svelte").Snippet;
  } & import("svelte/elements").HTMLAttributes<HTMLDivElement>;
</script>

<script lang="ts">
  import { cn } from "../../lib/utils";

  let { class: className, children, ...rest }: AlertDialogFooterProps = $props();
</script>

<div
  class={cn(
    "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
    className
  )}
  {...rest}
>
  {#if children}{@render children()}{/if}
</div>
