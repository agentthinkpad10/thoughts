<script lang="ts" module>
  import type { Popover as PopoverType } from "bits-ui";
  export type PopoverTriggerProps = PopoverType.TriggerProps & { class?: string };
</script>

<script lang="ts">
  import { Popover } from "bits-ui";

  let { children, ...rest }: PopoverTriggerProps = $props();
</script>

<Popover.Trigger {...rest}>
  {#if children}{@render children()}{/if}
</Popover.Trigger>
