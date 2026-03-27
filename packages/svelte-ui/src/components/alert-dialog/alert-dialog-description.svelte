<script lang="ts" module>
  import type { AlertDialog as AlertDialogType } from "bits-ui";
  export type AlertDialogDescriptionProps = AlertDialogType.DescriptionProps & { class?: string };
</script>

<script lang="ts">
  import { AlertDialog } from "bits-ui";
  import { cn } from "../../lib/utils";

  let { class: className, children, ...rest }: AlertDialogDescriptionProps = $props();
</script>

<AlertDialog.Description
  class={cn("text-sm text-muted-foreground", className)}
  {...rest}
>
  {#if children}{@render children()}{/if}
</AlertDialog.Description>
