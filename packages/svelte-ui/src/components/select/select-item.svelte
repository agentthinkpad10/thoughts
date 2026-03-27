<script lang="ts" module>
  import type { Select as SelectType } from "bits-ui";
  export type SelectItemProps = SelectType.ItemProps & { class?: string };
</script>

<script lang="ts">
  import { Select } from "bits-ui";
  import Check from "lucide-svelte/icons/check";
  import { cn } from "../../lib/utils";

  let { class: className, children, ...rest }: SelectItemProps = $props();
</script>

<Select.Item
  class={cn(
    "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    className
  )}
  {...rest}
>
  {#snippet children({ selected })}
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      {#if selected}
        <Check class="h-4 w-4" />
      {/if}
    </span>
    {rest.label ?? rest.value}
  {/snippet}
</Select.Item>
