<script lang="ts" module>
  export type TableHeadProps = {
    children?: import("svelte").Snippet;
  } & import("svelte/elements").HTMLAttributes<HTMLTableCellElement>;
</script>

<script lang="ts">
  import { cn } from "../../lib/utils";

  let { class: className, children, ...rest }: TableHeadProps = $props();
</script>

<th
  class={cn(
    "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
    className
  )}
  {...rest}
>
  {#if children}{@render children()}{/if}
</th>
