<script lang="ts" module>
  export type SkeletonProps = import("svelte/elements").HTMLAttributes<HTMLDivElement>;
</script>

<script lang="ts">
  import { cn } from "../../lib/utils";

  let { class: className, ...rest }: SkeletonProps = $props();
</script>

<div class={cn("animate-pulse rounded-md bg-muted", className)} {...rest}></div>
