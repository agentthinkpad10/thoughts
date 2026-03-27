<script lang="ts" module>
  import type { DropdownMenu as DropdownMenuType } from "bits-ui";
  export type DropdownMenuLabelProps = DropdownMenuType.GroupHeadingProps & { class?: string; inset?: boolean };
</script>

<script lang="ts">
  import { DropdownMenu } from "bits-ui";
  import { cn } from "../../lib/utils";

  let { inset, class: className, children, ...rest }: DropdownMenuLabelProps = $props();
</script>

<DropdownMenu.GroupHeading
  class={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
  {...rest}
>
  {#if children}{@render children()}{/if}
</DropdownMenu.GroupHeading>
