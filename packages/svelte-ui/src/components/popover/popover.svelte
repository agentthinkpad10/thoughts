<script lang="ts" module>
  import type { Popover as PopoverType } from "bits-ui";
  export type PopoverProps = PopoverType.RootProps;
</script>

<script lang="ts">
  import { Popover } from "bits-ui";

  let { children, ...rest }: PopoverProps = $props();
</script>

<Popover.Root {...rest}>
  {#if children}{@render children()}{/if}
</Popover.Root>
