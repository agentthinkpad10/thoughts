<script lang="ts" module>
  import type { Dialog as DialogType } from "bits-ui";
  export type DialogProps = DialogType.RootProps;
</script>

<script lang="ts">
  import { Dialog } from "bits-ui";

  let { children, ...rest }: DialogProps = $props();
</script>

<Dialog.Root {...rest}>
  {#if children}{@render children()}{/if}
</Dialog.Root>
