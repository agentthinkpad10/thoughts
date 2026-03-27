<script lang="ts" module>
  import { type VariantProps, cva } from "class-variance-authority";

  export const alertVariants = cva(
    "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
    {
      variants: {
        variant: {
          default: "bg-background text-foreground",
          destructive:
            "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        },
      },
      defaultVariants: {
        variant: "default",
      },
    }
  );

  export type AlertVariant = VariantProps<typeof alertVariants>["variant"];

  export type AlertProps = {
    variant?: AlertVariant;
    children?: import("svelte").Snippet;
  } & import("svelte/elements").HTMLAttributes<HTMLDivElement>;
</script>

<script lang="ts">
  import { cn } from "../../lib/utils";

  let { variant, class: className, children, ...rest }: AlertProps = $props();
</script>

<div role="alert" class={cn(alertVariants({ variant }), className)} {...rest}>
  {#if children}{@render children()}{/if}
</div>
