<script lang="ts" module>
  import type { ToggleGroup as ToggleGroupType } from "bits-ui";
  import type { ToggleVariant, ToggleSize } from "../toggle/index";

  export type ToggleGroupItemProps = ToggleGroupType.ItemProps & {
    class?: string;
    variant?: ToggleVariant;
    size?: ToggleSize;
  };
</script>

<script lang="ts">
  import { ToggleGroup } from "bits-ui";
  import { toggleVariants } from "../toggle/index";
  import { cn } from "../../lib/utils";
  import { getContext } from "svelte";

  let { variant, size, class: className, ...rest }: ToggleGroupItemProps = $props();

  const context = getContext<{ variant: ToggleVariant; size: ToggleSize }>("toggleGroup");
</script>

<ToggleGroup.Item
  class={cn(
    toggleVariants({
      variant: context?.variant || variant,
      size: context?.size || size,
    }),
    className
  )}
  {...rest}
/>
