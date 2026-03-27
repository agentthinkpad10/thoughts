<script lang="ts" module>
  import type { Separator as SeparatorType } from "bits-ui";
  export type SelectSeparatorProps = SeparatorType.RootProps & { class?: string };
</script>

<script lang="ts">
  import { Separator } from "bits-ui";
  import { cn } from "../../lib/utils";

  let { class: className, ...rest }: SelectSeparatorProps = $props();
</script>

<Separator.Root
  class={cn("-mx-1 my-1 h-px bg-muted", className)}
  {...rest}
/>
