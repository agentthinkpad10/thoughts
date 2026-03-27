<script lang="ts" module>
  import type { Tooltip as TooltipType } from "bits-ui";
  export type TooltipProps = TooltipType.RootProps;
</script>

<script lang="ts">
  import { Tooltip } from "bits-ui";

  let { children, ...rest }: TooltipProps = $props();
</script>

<Tooltip.Root {...rest}>
  {#if children}{@render children()}{/if}
</Tooltip.Root>
