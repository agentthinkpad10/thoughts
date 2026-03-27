<script lang="ts" module>
  import type { Dialog as DialogType } from "bits-ui";
  export type DialogCloseProps = DialogType.CloseProps & { class?: string };
</script>

<script lang="ts">
  import { Dialog } from "bits-ui";

  let { children, ...rest }: DialogCloseProps = $props();
</script>

<Dialog.Close {...rest}>
  {#if children}{@render children()}{/if}
</Dialog.Close>
