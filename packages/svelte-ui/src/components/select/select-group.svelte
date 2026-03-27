<script lang="ts" module>
  import type { Select as SelectType } from "bits-ui";
  export type SelectGroupProps = SelectType.GroupProps;
</script>

<script lang="ts">
  import { Select } from "bits-ui";

  let { children, ...rest }: SelectGroupProps = $props();
</script>

<Select.Group {...rest}>
  {#if children}{@render children()}{/if}
</Select.Group>
