<script lang="ts" module>
  import type { Tabs as TabsType } from "bits-ui";
  export type TabsProps = TabsType.RootProps & { class?: string };
</script>

<script lang="ts">
  import { Tabs } from "bits-ui";

  let { class: className, children, ...rest }: TabsProps = $props();
</script>

<Tabs.Root class={className} {...rest}>
  {#if children}{@render children()}{/if}
</Tabs.Root>
