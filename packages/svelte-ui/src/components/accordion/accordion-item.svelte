<script lang="ts" module>
  import type { Accordion as AccordionType } from "bits-ui";
  export type AccordionItemProps = AccordionType.ItemProps & { class?: string };
</script>

<script lang="ts">
  import { Accordion } from "bits-ui";
  import { cn } from "../../lib/utils";

  let { class: className, children, ...rest }: AccordionItemProps = $props();
</script>

<Accordion.Item class={cn("border-b", className)} {...rest}>
  {#if children}{@render children()}{/if}
</Accordion.Item>
