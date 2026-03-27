<script lang="ts" module>
  export type AlertDescriptionProps = {
    children?: import("svelte").Snippet;
  } & import("svelte/elements").HTMLAttributes<HTMLDivElement>;
</script>

<script lang="ts">
  import { cn } from "../../lib/utils";

  let { class: className, children, ...rest }: AlertDescriptionProps = $props();
</script>

<div class={cn("text-sm [&_p]:leading-relaxed", className)} {...rest}>
  {#if children}{@render children()}{/if}
</div>
