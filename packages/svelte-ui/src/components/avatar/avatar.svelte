<script lang="ts" module>
  import type { Avatar as AvatarType } from "bits-ui";
  export type AvatarProps = AvatarType.RootProps & { class?: string };
</script>

<script lang="ts">
  import { Avatar } from "bits-ui";
  import { cn } from "../../lib/utils";

  let { class: className, children, ...rest }: AvatarProps = $props();
</script>

<Avatar.Root
  class={cn(
    "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
    className
  )}
  {...rest}
>
  {#if children}{@render children()}{/if}
</Avatar.Root>
