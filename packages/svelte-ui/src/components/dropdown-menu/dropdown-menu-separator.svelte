<script lang="ts" module>
  import type { DropdownMenu as DropdownMenuType } from "bits-ui";
  export type DropdownMenuSeparatorProps = DropdownMenuType.SeparatorProps & { class?: string };
</script>

<script lang="ts">
  import { DropdownMenu } from "bits-ui";
  import { cn } from "../../lib/utils";

  let { class: className, ...rest }: DropdownMenuSeparatorProps = $props();
</script>

<DropdownMenu.Separator
  class={cn("-mx-1 my-1 h-px bg-muted", className)}
  {...rest}
/>
