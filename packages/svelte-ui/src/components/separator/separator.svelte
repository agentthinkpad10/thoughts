<script lang="ts" module>
  import type { Separator as SeparatorType } from "bits-ui";
  export type SeparatorProps = SeparatorType.RootProps & { class?: string };
</script>

<script lang="ts">
  import { Separator as SeparatorPrimitive } from "bits-ui";
  import { cn } from "../../lib/utils";

  let { class: className, orientation, ...rest }: SeparatorProps = $props();
</script>

<SeparatorPrimitive.Root
  {orientation}
  class={cn(
    "shrink-0 bg-border",
    orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
    className
  )}
  {...rest}
/>
