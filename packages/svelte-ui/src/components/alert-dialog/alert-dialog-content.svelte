<script lang="ts" module>
  import type { AlertDialog as AlertDialogType } from "bits-ui";
  export type AlertDialogContentProps = AlertDialogType.ContentProps & { class?: string };
</script>

<script lang="ts">
  import { AlertDialog } from "bits-ui";
  import { cn } from "../../lib/utils";

  let { class: className, children, ...rest }: AlertDialogContentProps = $props();
</script>

<AlertDialog.Portal>
  <AlertDialog.Overlay
    class="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
  />
  <AlertDialog.Content
    class={cn(
      "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
      className
    )}
    {...rest}
  >
    {#if children}{@render children()}{/if}
  </AlertDialog.Content>
</AlertDialog.Portal>
