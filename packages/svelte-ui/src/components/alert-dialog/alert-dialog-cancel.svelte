<script lang="ts" module>
  import type { AlertDialog as AlertDialogType } from "bits-ui";
  export type AlertDialogCancelProps = AlertDialogType.CancelProps & { class?: string };
</script>

<script lang="ts">
  import { AlertDialog } from "bits-ui";
  import { buttonVariants } from "../button/index";
  import { cn } from "../../lib/utils";

  let { class: className, children, ...rest }: AlertDialogCancelProps = $props();
</script>

<AlertDialog.Cancel
  class={cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className)}
  {...rest}
>
  {#if children}{@render children()}{/if}
</AlertDialog.Cancel>
