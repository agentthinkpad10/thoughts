<script lang="ts" module>
  import type { Avatar as AvatarType } from "bits-ui";
  export type AvatarImageProps = AvatarType.ImageProps & { class?: string };
</script>

<script lang="ts">
  import { Avatar } from "bits-ui";
  import { cn } from "../../lib/utils";

  let { class: className, ...rest }: AvatarImageProps = $props();
</script>

<Avatar.Image
  class={cn("aspect-square h-full w-full", className)}
  {...rest}
/>
