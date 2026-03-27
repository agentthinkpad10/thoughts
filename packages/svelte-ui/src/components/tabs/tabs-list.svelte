<script lang="ts" module>
  import type { Tabs as TabsType } from "bits-ui";
  export type TabsListProps = TabsType.ListProps & { class?: string };
</script>

<script lang="ts">
  import { Tabs } from "bits-ui";
  import { cn } from "../../lib/utils";

  let { class: className, children, ...rest }: TabsListProps = $props();
</script>

<Tabs.List
  class={cn(
    "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
    className
  )}
  {...rest}
>
  {#if children}{@render children()}{/if}
</Tabs.List>
