<script lang="ts" module>
  import type { DropdownMenu as DropdownMenuType } from "bits-ui";
  export type DropdownMenuProps = DropdownMenuType.RootProps;
</script>

<script lang="ts">
  import { DropdownMenu } from "bits-ui";

  let { children, ...rest }: DropdownMenuProps = $props();
</script>

<DropdownMenu.Root {...rest}>
  {#if children}{@render children()}{/if}
</DropdownMenu.Root>
