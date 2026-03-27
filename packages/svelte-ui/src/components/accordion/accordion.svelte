<script lang="ts" module>
  import type { Accordion as AccordionType } from "bits-ui";
  export type AccordionProps = AccordionType.RootProps & { class?: string };
</script>

<script lang="ts">
  import { Accordion } from "bits-ui";
  import { cn } from "../../lib/utils";

  let { class: className, children, ...rest }: AccordionProps = $props();
</script>

<Accordion.Root class={cn(className)} {...rest}>
  {#if children}{@render children()}{/if}
</Accordion.Root>
