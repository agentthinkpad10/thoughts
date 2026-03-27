<script lang="ts" module>
  import type { Accordion as AccordionType } from "bits-ui";
  export type AccordionTriggerProps = AccordionType.TriggerProps & { class?: string };
</script>

<script lang="ts">
  import { Accordion } from "bits-ui";
  import ChevronDown from "lucide-svelte/icons/chevron-down";
  import { cn } from "../../lib/utils";

  let { class: className, children, ...rest }: AccordionTriggerProps = $props();
</script>

<Accordion.Header class="flex">
  <Accordion.Trigger
    class={cn(
      "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
      className
    )}
    {...rest}
  >
    {#if children}{@render children()}{/if}
    <ChevronDown class="h-4 w-4 shrink-0 transition-transform duration-200" />
  </Accordion.Trigger>
</Accordion.Header>
