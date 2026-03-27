<script lang="ts" module>
  import type { DropdownMenu as DropdownMenuType } from "bits-ui";
  export type DropdownMenuTriggerProps = DropdownMenuType.TriggerProps & { class?: string };
</script>

<script lang="ts">
  import { DropdownMenu } from "bits-ui";

  let { children, ...rest }: DropdownMenuTriggerProps = $props();
</script>

<DropdownMenu.Trigger {...rest}>
  {#if children}{@render children()}{/if}
</DropdownMenu.Trigger>
