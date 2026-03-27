<script lang="ts" module>
  import type { AlertDialog as AlertDialogType } from "bits-ui";
  export type AlertDialogProps = AlertDialogType.RootProps;
</script>

<script lang="ts">
  import { AlertDialog } from "bits-ui";

  let { children, ...rest }: AlertDialogProps = $props();
</script>

<AlertDialog.Root {...rest}>
  {#if children}{@render children()}{/if}
</AlertDialog.Root>
