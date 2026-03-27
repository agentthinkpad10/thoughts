<script lang="ts" module>
  export type TableHeaderProps = {
    children?: import("svelte").Snippet;
  } & import("svelte/elements").HTMLAttributes<HTMLTableSectionElement>;
</script>

<script lang="ts">
  import { cn } from "../../lib/utils";

  let { class: className, children, ...rest }: TableHeaderProps = $props();
</script>

<thead class={cn("[&_tr]:border-b", className)} {...rest}>
  {#if children}{@render children()}{/if}
</thead>
