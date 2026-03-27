<script lang="ts" module>
  import type { AlertDialog as AlertDialogType } from "bits-ui";
  export type AlertDialogTriggerProps = AlertDialogType.TriggerProps & { class?: string };
</script>

<script lang="ts">
  import { AlertDialog } from "bits-ui";

  let { children, ...rest }: AlertDialogTriggerProps = $props();
</script>

<AlertDialog.Trigger {...rest}>
  {#if children}{@render children()}{/if}
</AlertDialog.Trigger>
