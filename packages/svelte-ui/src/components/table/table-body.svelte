<script lang="ts" module>
  export type TableBodyProps = {
    children?: import("svelte").Snippet;
  } & import("svelte/elements").HTMLAttributes<HTMLTableSectionElement>;
</script>

<script lang="ts">
  import { cn } from "../../lib/utils";

  let { class: className, children, ...rest }: TableBodyProps = $props();
</script>

<tbody class={cn("[&_tr:last-child]:border-0", className)} {...rest}>
  {#if children}{@render children()}{/if}
</tbody>
