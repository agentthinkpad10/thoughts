<script lang="ts" module>
  import type { Slider as SliderType } from "bits-ui";
  export type SliderProps = SliderType.RootProps & { class?: string };
</script>

<script lang="ts">
  import { Slider } from "bits-ui";
  import { cn } from "../../lib/utils";

  let { class: className, ...rest }: SliderProps = $props();
</script>

<Slider.Root
  class={cn(
    "relative flex w-full touch-none select-none items-center",
    className
  )}
  {...rest}
>
  {#snippet children({ thumbs })}
    <Slider.Range class="absolute h-full bg-primary" />
    {#each thumbs as _, i}
      <Slider.Thumb
        index={i}
        class="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      />
    {/each}
  {/snippet}
</Slider.Root>
