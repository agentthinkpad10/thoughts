<script lang="ts" module>
  import type { RadioGroup as RadioGroupType } from "bits-ui";
  export type RadioGroupItemProps = RadioGroupType.ItemProps & { class?: string };
</script>

<script lang="ts">
  import { RadioGroup } from "bits-ui";
  import Circle from "lucide-svelte/icons/circle";
  import { cn } from "../../lib/utils";

  let { class: className, ...rest }: RadioGroupItemProps = $props();
</script>

<RadioGroup.Item
  class={cn(
    "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
    className
  )}
  {...rest}
>
  {#snippet children({ checked })}
    {#if checked}
      <div class="flex items-center justify-center">
        <Circle class="h-2.5 w-2.5 fill-current text-current" />
      </div>
    {/if}
  {/snippet}
</RadioGroup.Item>
