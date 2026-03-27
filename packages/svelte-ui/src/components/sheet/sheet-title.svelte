<script lang="ts" module>
  import type { Dialog as DialogType } from "bits-ui";
  export type SheetTitleProps = DialogType.TitleProps & { class?: string };
</script>

<script lang="ts">
  import { Dialog } from "bits-ui";
  import { cn } from "../../lib/utils";

  let { class: className, children, ...rest }: SheetTitleProps = $props();
</script>

<Dialog.Title
  class={cn("text-lg font-semibold text-foreground", className)}
  {...rest}
>
  {#if children}{@render children()}{/if}
</Dialog.Title>
