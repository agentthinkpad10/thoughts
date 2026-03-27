<script lang="ts" module>
  import type { AlertDialog as AlertDialogType } from "bits-ui";
  export type AlertDialogTitleProps = AlertDialogType.TitleProps & { class?: string };
</script>

<script lang="ts">
  import { AlertDialog } from "bits-ui";
  import { cn } from "../../lib/utils";

  let { class: className, children, ...rest }: AlertDialogTitleProps = $props();
</script>

<AlertDialog.Title class={cn("text-lg font-semibold", className)} {...rest}>
  {#if children}{@render children()}{/if}
</AlertDialog.Title>
