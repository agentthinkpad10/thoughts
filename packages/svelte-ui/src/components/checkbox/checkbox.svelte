<script lang="ts" module>
  import type { Checkbox as CheckboxType } from "bits-ui";
  export type CheckboxProps = CheckboxType.RootProps & { class?: string };
</script>

<script lang="ts">
  import { Checkbox } from "bits-ui";
  import Check from "lucide-svelte/icons/check";
  import { cn } from "../../lib/utils";

  let { class: className, ...rest }: CheckboxProps = $props();
</script>

<Checkbox.Root
  class={cn(
    "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
    className
  )}
  {...rest}
>
  {#snippet children({ checked })}
    <div class="flex items-center justify-center text-current">
      {#if checked}
        <Check class="h-4 w-4" />
      {/if}
    </div>
  {/snippet}
</Checkbox.Root>
