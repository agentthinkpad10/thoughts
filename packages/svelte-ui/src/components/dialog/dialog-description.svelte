<script lang="ts" module>
  import type { Dialog as DialogType } from "bits-ui";
  export type DialogDescriptionProps = DialogType.DescriptionProps & { class?: string };
</script>

<script lang="ts">
  import { Dialog } from "bits-ui";
  import { cn } from "../../lib/utils";

  let { class: className, children, ...rest }: DialogDescriptionProps = $props();
</script>

<Dialog.Description
  class={cn("text-sm text-muted-foreground", className)}
  {...rest}
>
  {#if children}{@render children()}{/if}
</Dialog.Description>
