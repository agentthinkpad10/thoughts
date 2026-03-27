<script lang="ts" module>
  import type { DropdownMenu as DropdownMenuType } from "bits-ui";
  export type DropdownMenuSubTriggerProps = DropdownMenuType.SubTriggerProps & { class?: string; inset?: boolean };
</script>

<script lang="ts">
  import { DropdownMenu } from "bits-ui";
  import ChevronRight from "lucide-svelte/icons/chevron-right";
  import { cn } from "../../lib/utils";

  let { inset, class: className, children, ...rest }: DropdownMenuSubTriggerProps = $props();
</script>

<DropdownMenu.SubTrigger
  class={cn(
    "flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    inset && "pl-8",
    className
  )}
  {...rest}
>
  {#if children}{@render children()}{/if}
  <ChevronRight class="ml-auto" />
</DropdownMenu.SubTrigger>
