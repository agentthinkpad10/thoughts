<script lang="ts" module>
  import type { DropdownMenu as DropdownMenuType } from "bits-ui";
  import type { Snippet } from "svelte";
  export type DropdownMenuCheckboxItemProps = Omit<DropdownMenuType.CheckboxItemProps, "children"> & { class?: string; children?: Snippet };
</script>

<script lang="ts">
  import { DropdownMenu } from "bits-ui";
  import Check from "lucide-svelte/icons/check";
  import { cn } from "../../lib/utils";

  let {
    class: className,
    children: userChildren,
    ...rest
  }: DropdownMenuCheckboxItemProps = $props();
</script>

<DropdownMenu.CheckboxItem
  class={cn(
    "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    className
  )}
  {...rest}
>
  {#snippet children({ checked })}
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      {#if checked}
        <Check class="h-4 w-4" />
      {/if}
    </span>
    {#if userChildren}{@render userChildren()}{/if}
  {/snippet}
</DropdownMenu.CheckboxItem>
