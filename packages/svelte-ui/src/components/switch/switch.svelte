<script lang="ts" module>
  import type { Switch as SwitchType } from "bits-ui";
  export type SwitchProps = SwitchType.RootProps & { class?: string };
</script>

<script lang="ts">
  import { Switch } from "bits-ui";
  import { cn } from "../../lib/utils";

  let { class: className, ...rest }: SwitchProps = $props();
</script>

<Switch.Root
  class={cn(
    "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
    className
  )}
  {...rest}
>
  <Switch.Thumb
    class="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
  />
</Switch.Root>
