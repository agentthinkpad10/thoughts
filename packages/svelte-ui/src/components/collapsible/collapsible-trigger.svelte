<script lang="ts" module>
  import type { Collapsible as CollapsibleType } from "bits-ui";
  export type CollapsibleTriggerProps = CollapsibleType.TriggerProps & { class?: string };
</script>

<script lang="ts">
  import { Collapsible } from "bits-ui";

  let { children, ...rest }: CollapsibleTriggerProps = $props();
</script>

<Collapsible.Trigger {...rest}>
  {#if children}{@render children()}{/if}
</Collapsible.Trigger>
