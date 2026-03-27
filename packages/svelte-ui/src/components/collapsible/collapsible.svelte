<script lang="ts" module>
  import type { Collapsible as CollapsibleType } from "bits-ui";
  export type CollapsibleProps = CollapsibleType.RootProps;
</script>

<script lang="ts">
  import { Collapsible } from "bits-ui";

  let { children, ...rest }: CollapsibleProps = $props();
</script>

<Collapsible.Root {...rest}>
  {#if children}{@render children()}{/if}
</Collapsible.Root>
