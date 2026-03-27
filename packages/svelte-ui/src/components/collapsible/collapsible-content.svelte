<script lang="ts" module>
  import type { Collapsible as CollapsibleType } from "bits-ui";
  export type CollapsibleContentProps = CollapsibleType.ContentProps & { class?: string };
</script>

<script lang="ts">
  import { Collapsible } from "bits-ui";

  let { children, ...rest }: CollapsibleContentProps = $props();
</script>

<Collapsible.Content {...rest}>
  {#if children}{@render children()}{/if}
</Collapsible.Content>
