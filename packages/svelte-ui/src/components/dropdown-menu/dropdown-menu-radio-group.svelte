<script lang="ts" module>
  import type { DropdownMenu as DropdownMenuType } from "bits-ui";
  export type DropdownMenuRadioGroupProps = DropdownMenuType.RadioGroupProps;
</script>

<script lang="ts">
  import { DropdownMenu } from "bits-ui";

  let { children, ...rest }: DropdownMenuRadioGroupProps = $props();
</script>

<DropdownMenu.RadioGroup {...rest}>
  {#if children}{@render children()}{/if}
</DropdownMenu.RadioGroup>
