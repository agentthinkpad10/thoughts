<script lang="ts" module>
  import type { DropdownMenu as DropdownMenuType } from "bits-ui";
  export type DropdownMenuSubProps = DropdownMenuType.SubProps;
</script>

<script lang="ts">
  import { DropdownMenu } from "bits-ui";

  let { children, ...rest }: DropdownMenuSubProps = $props();
</script>

<DropdownMenu.Sub {...rest}>
  {#if children}{@render children()}{/if}
</DropdownMenu.Sub>
