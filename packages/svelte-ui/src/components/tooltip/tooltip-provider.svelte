<script lang="ts" module>
  import type { Tooltip as TooltipType } from "bits-ui";
  export type TooltipProviderProps = TooltipType.ProviderProps;
</script>

<script lang="ts">
  import { Tooltip } from "bits-ui";

  let { children, ...rest }: TooltipProviderProps = $props();
</script>

<Tooltip.Provider {...rest}>
  {#if children}{@render children()}{/if}
</Tooltip.Provider>
