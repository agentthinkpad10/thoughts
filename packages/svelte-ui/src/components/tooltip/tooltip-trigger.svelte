<script lang="ts" module>
  import type { Tooltip as TooltipType } from "bits-ui";
  export type TooltipTriggerProps = TooltipType.TriggerProps & { class?: string };
</script>

<script lang="ts">
  import { Tooltip } from "bits-ui";

  let { children, ...rest }: TooltipTriggerProps = $props();
</script>

<Tooltip.Trigger {...rest}>
  {#if children}{@render children()}{/if}
</Tooltip.Trigger>
