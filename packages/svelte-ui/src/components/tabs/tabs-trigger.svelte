<script lang="ts" module>
  import type { Tabs as TabsType } from "bits-ui";
  export type TabsTriggerProps = TabsType.TriggerProps & { class?: string };
</script>

<script lang="ts">
  import { Tabs } from "bits-ui";
  import { cn } from "../../lib/utils";

  let { class: className, children, ...rest }: TabsTriggerProps = $props();
</script>

<Tabs.Trigger
  class={cn(
    "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
    className
  )}
  {...rest}
>
  {#if children}{@render children()}{/if}
</Tabs.Trigger>
