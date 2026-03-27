<script lang="ts" module>
  export type LabelProps = {
    children?: import("svelte").Snippet;
  } & import("svelte/elements").HTMLLabelAttributes;
</script>

<script lang="ts">
  import { cn } from "../../lib/utils";

  let { class: className, children, ...rest }: LabelProps = $props();
</script>

<label
  class={cn(
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    className
  )}
  {...rest}
>
  {#if children}{@render children()}{/if}
</label>
