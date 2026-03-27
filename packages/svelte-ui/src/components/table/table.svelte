<script lang="ts" module>
  export type TableProps = {
    children?: import("svelte").Snippet;
  } & import("svelte/elements").HTMLTableAttributes;
</script>

<script lang="ts">
  import { cn } from "../../lib/utils";

  let { class: className, children, ...rest }: TableProps = $props();
</script>

<div class="relative w-full overflow-auto">
  <table class={cn("w-full caption-bottom text-sm", className)} {...rest}>
    {#if children}{@render children()}{/if}
  </table>
</div>
