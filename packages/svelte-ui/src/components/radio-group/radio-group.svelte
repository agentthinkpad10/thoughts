<script lang="ts" module>
  import type { RadioGroup as RadioGroupType } from "bits-ui";
  export type RadioGroupProps = RadioGroupType.RootProps & { class?: string };
</script>

<script lang="ts">
  import { RadioGroup } from "bits-ui";
  import { cn } from "../../lib/utils";

  let { class: className, children, ...rest }: RadioGroupProps = $props();
</script>

<RadioGroup.Root class={cn("grid gap-2", className)} {...rest}>
  {#if children}{@render children()}{/if}
</RadioGroup.Root>
