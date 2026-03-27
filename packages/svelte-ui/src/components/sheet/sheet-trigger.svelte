<script lang="ts" module>
  import type { Dialog as DialogType } from "bits-ui";
  export type SheetTriggerProps = DialogType.TriggerProps & { class?: string };
</script>

<script lang="ts">
  import { Dialog } from "bits-ui";

  let { children, ...rest }: SheetTriggerProps = $props();
</script>

<Dialog.Trigger {...rest}>
  {#if children}{@render children()}{/if}
</Dialog.Trigger>
