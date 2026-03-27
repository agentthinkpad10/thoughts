<script lang="ts" module>
  import type { Select as SelectType } from "bits-ui";
  export type SelectContentProps = SelectType.ContentProps & { class?: string };
</script>

<script lang="ts">
  import { Select } from "bits-ui";
  import { cn } from "../../lib/utils";

  let { class: className, children, ...rest }: SelectContentProps = $props();
</script>

<Select.Portal>
  <Select.Content
    class={cn(
      "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...rest}
  >
    <Select.Viewport class="p-1">
      {#if children}{@render children()}{/if}
    </Select.Viewport>
  </Select.Content>
</Select.Portal>
