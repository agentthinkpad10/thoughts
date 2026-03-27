<script lang="ts" module>
  import type { DropdownMenu as DropdownMenuType } from "bits-ui";
  import type { Snippet } from "svelte";
  export type DropdownMenuRadioItemProps = Omit<DropdownMenuType.RadioItemProps, "children"> & { class?: string; children?: Snippet };
</script>

<script lang="ts">
  import { DropdownMenu } from "bits-ui";
  import Circle from "lucide-svelte/icons/circle";
  import { cn } from "../../lib/utils";

  let { class: className, children: userChildren, ...rest }: DropdownMenuRadioItemProps = $props();
</script>

<DropdownMenu.RadioItem
  class={cn(
    "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    className
  )}
  {...rest}
>
  {#snippet children()}
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <Circle class="h-2 w-2 fill-current" />
    </span>
    {#if userChildren}{@render userChildren()}{/if}
  {/snippet}
</DropdownMenu.RadioItem>
