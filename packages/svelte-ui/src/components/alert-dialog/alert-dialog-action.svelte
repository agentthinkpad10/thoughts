<script lang="ts" module>
  import type { AlertDialog as AlertDialogType } from "bits-ui";
  export type AlertDialogActionProps = AlertDialogType.ActionProps & { class?: string };
</script>

<script lang="ts">
  import { AlertDialog } from "bits-ui";
  import { buttonVariants } from "../button/index";
  import { cn } from "../../lib/utils";

  let { class: className, children, ...rest }: AlertDialogActionProps = $props();
</script>

<AlertDialog.Action class={cn(buttonVariants(), className)} {...rest}>
  {#if children}{@render children()}{/if}
</AlertDialog.Action>
