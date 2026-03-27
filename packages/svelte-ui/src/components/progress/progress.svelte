<script lang="ts" module>
  import type { Progress as ProgressType } from "bits-ui";
  export type ProgressProps = ProgressType.RootProps & { class?: string };
</script>

<script lang="ts">
  import { Progress } from "bits-ui";
  import { cn } from "../../lib/utils";

  let { class: className, value, ...rest }: ProgressProps = $props();
</script>

<Progress.Root
  {value}
  class={cn(
    "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
    className
  )}
  {...rest}
>
  <div
    class="h-full w-full flex-1 bg-primary transition-all"
    style="transform: translateX(-{100 - (value || 0)}%)"
  ></div>
</Progress.Root>
