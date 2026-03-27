<script lang="ts" module>
  import type { Accordion as AccordionType } from "bits-ui";
  export type AccordionContentProps = AccordionType.ContentProps & { class?: string };
</script>

<script lang="ts">
  import { Accordion } from "bits-ui";
  import { cn } from "../../lib/utils";

  let { class: className, children, ...rest }: AccordionContentProps = $props();
</script>

<Accordion.Content
  class="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
  {...rest}
>
  <div class={cn("pb-4 pt-0", className)}>
    {#if children}{@render children()}{/if}
  </div>
</Accordion.Content>
