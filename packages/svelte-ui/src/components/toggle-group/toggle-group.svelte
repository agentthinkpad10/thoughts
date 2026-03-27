<script lang="ts" module>
  import type { ToggleGroup as ToggleGroupType } from "bits-ui";
  import type { ToggleVariant, ToggleSize } from "../toggle/index";

  export type ToggleGroupProps = ToggleGroupType.RootProps & {
    class?: string;
    variant?: ToggleVariant;
    size?: ToggleSize;
  };
</script>

<script lang="ts">
  import { ToggleGroup } from "bits-ui";
  import { cn } from "../../lib/utils";
  import { setContext } from "svelte";

  let {
    variant = "default",
    size = "default",
    class: className,
    children,
    ...rest
  }: ToggleGroupProps = $props();

  setContext("toggleGroup", { get variant() { return variant; }, get size() { return size; } });
</script>

<ToggleGroup.Root
  class={cn("flex items-center justify-center gap-1", className)}
  {...rest}
>
  {#if children}{@render children()}{/if}
</ToggleGroup.Root>
