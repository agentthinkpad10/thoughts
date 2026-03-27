<script lang="ts" module>
  import type { DropdownMenu as DropdownMenuType } from "bits-ui";
  export type DropdownMenuItemProps = DropdownMenuType.ItemProps & { class?: string; inset?: boolean };
</script>

<script lang="ts">
  import { DropdownMenu } from "bits-ui";
  import { cn } from "../../lib/utils";

  let { inset, class: className, children, ...rest }: DropdownMenuItemProps = $props();
</script>

<DropdownMenu.Item
  class={cn(
    "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    inset && "pl-8",
    className
  )}
  {...rest}
>
  {#if children}{@render children()}{/if}
</DropdownMenu.Item>
