<script lang="ts" module>
  import type { Select as SelectType } from "bits-ui";
  export type SelectTriggerProps = SelectType.TriggerProps & { class?: string };
</script>

<script lang="ts">
  import { Select } from "bits-ui";
  import ChevronDown from "lucide-svelte/icons/chevron-down";
  import { cn } from "../../lib/utils";

  let { class: className, children, ...rest }: SelectTriggerProps = $props();
</script>

<Select.Trigger
  class={cn(
    "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
    className
  )}
  {...rest}
>
  {#if children}{@render children()}{/if}
  <ChevronDown class="h-4 w-4 opacity-50" />
</Select.Trigger>
