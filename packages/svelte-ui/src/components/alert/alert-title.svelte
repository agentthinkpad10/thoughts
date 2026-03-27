<script lang="ts" module>
  export type AlertTitleProps = {
    children?: import("svelte").Snippet;
  } & import("svelte/elements").HTMLAttributes<HTMLHeadingElement>;
</script>

<script lang="ts">
  import { cn } from "../../lib/utils";

  let { class: className, children, ...rest }: AlertTitleProps = $props();
</script>

<h5 class={cn("mb-1 font-medium leading-none tracking-tight", className)} {...rest}>
  {#if children}{@render children()}{/if}
</h5>
