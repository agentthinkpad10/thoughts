<script lang="ts" module>
  import type { Tabs as TabsType } from "bits-ui";
  export type TabsContentProps = TabsType.ContentProps & { class?: string };
</script>

<script lang="ts">
  import { Tabs } from "bits-ui";
  import { cn } from "../../lib/utils";

  let { class: className, children, ...rest }: TabsContentProps = $props();
</script>

<Tabs.Content
  class={cn(
    "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    className
  )}
  {...rest}
>
  {#if children}{@render children()}{/if}
</Tabs.Content>
