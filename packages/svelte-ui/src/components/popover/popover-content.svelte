<script lang="ts" module>
  import type { Popover as PopoverType } from "bits-ui";
  export type PopoverContentProps = PopoverType.ContentProps & { class?: string };
</script>

<script lang="ts">
  import { Popover } from "bits-ui";
  import { cn } from "../../lib/utils";

  let { class: className, children, ...rest }: PopoverContentProps = $props();
</script>

<Popover.Portal>
  <Popover.Content
    class={cn(
      "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...rest}
  >
    {#if children}{@render children()}{/if}
  </Popover.Content>
</Popover.Portal>
