<script lang="ts" module>
  import type { DropdownMenu as DropdownMenuType } from "bits-ui";
  export type DropdownMenuGroupProps = DropdownMenuType.GroupProps;
</script>

<script lang="ts">
  import { DropdownMenu } from "bits-ui";

  let { children, ...rest }: DropdownMenuGroupProps = $props();
</script>

<DropdownMenu.Group {...rest}>
  {#if children}{@render children()}{/if}
</DropdownMenu.Group>
