<script lang="ts" module>
  import type { Avatar as AvatarType } from "bits-ui";
  export type AvatarFallbackProps = AvatarType.FallbackProps & { class?: string };
</script>

<script lang="ts">
  import { Avatar } from "bits-ui";
  import { cn } from "../../lib/utils";

  let { class: className, children, ...rest }: AvatarFallbackProps = $props();
</script>

<Avatar.Fallback
  class={cn(
    "flex h-full w-full items-center justify-center rounded-full bg-muted",
    className
  )}
  {...rest}
>
  {#if children}{@render children()}{/if}
</Avatar.Fallback>
