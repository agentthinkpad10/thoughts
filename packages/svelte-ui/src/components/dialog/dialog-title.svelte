<script lang="ts" module>
  import type { Dialog as DialogType } from "bits-ui";
  export type DialogTitleProps = DialogType.TitleProps & { class?: string };
</script>

<script lang="ts">
  import { Dialog } from "bits-ui";
  import { cn } from "../../lib/utils";

  let { class: className, children, ...rest }: DialogTitleProps = $props();
</script>

<Dialog.Title
  class={cn("text-lg font-semibold leading-none tracking-tight", className)}
  {...rest}
>
  {#if children}{@render children()}{/if}
</Dialog.Title>
