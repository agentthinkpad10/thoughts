<script lang="ts" module>
  import type { Select as SelectType } from "bits-ui";
  export type SelectLabelProps = SelectType.GroupHeadingProps & { class?: string };
</script>

<script lang="ts">
  import { Select } from "bits-ui";
  import { cn } from "../../lib/utils";

  let { class: className, children, ...rest }: SelectLabelProps = $props();
</script>

<Select.GroupHeading
  class={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
  {...rest}
>
  {#if children}{@render children()}{/if}
</Select.GroupHeading>
