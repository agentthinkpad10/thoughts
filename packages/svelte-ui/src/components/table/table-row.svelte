<script lang="ts" module>
  export type TableRowProps = {
    children?: import("svelte").Snippet;
  } & import("svelte/elements").HTMLAttributes<HTMLTableRowElement>;
</script>

<script lang="ts">
  import { cn } from "../../lib/utils";

  let { class: className, children, ...rest }: TableRowProps = $props();
</script>

<tr
  class={cn(
    "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
    className
  )}
  {...rest}
>
  {#if children}{@render children()}{/if}
</tr>
