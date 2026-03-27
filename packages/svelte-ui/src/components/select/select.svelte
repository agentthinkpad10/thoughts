<script lang="ts" module>
  import type { Select as SelectType } from "bits-ui";
  export type SelectProps = SelectType.RootProps;
</script>

<script lang="ts">
  import { Select } from "bits-ui";

  let { children, ...rest }: SelectProps = $props();
</script>

<Select.Root {...rest}>
  {#if children}{@render children()}{/if}
</Select.Root>
