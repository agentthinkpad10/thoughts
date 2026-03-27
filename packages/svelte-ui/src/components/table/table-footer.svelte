<script lang="ts" module>
  export type TableFooterProps = {
    children?: import("svelte").Snippet;
  } & import("svelte/elements").HTMLAttributes<HTMLTableSectionElement>;
</script>

<script lang="ts">
  import { cn } from "../../lib/utils";

  let { class: className, children, ...rest }: TableFooterProps = $props();
</script>

<tfoot
  class={cn(
    "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
    className
  )}
  {...rest}
>
  {#if children}{@render children()}{/if}
</tfoot>
