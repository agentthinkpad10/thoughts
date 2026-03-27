import { trpc } from "$lib/trpc";
import type { CreateQueryOptions, CreateMutationOptions } from "@tanstack/svelte-query";

export function helloQueryOptions(input: { name: string }): CreateQueryOptions {
  return {
    queryKey: ["hello", input],
    queryFn: () => trpc.hello.query(input),
  };
}

export function messagesQueryOptions(): CreateQueryOptions {
  return {
    queryKey: ["messages"],
    queryFn: () => trpc.messages.query(),
  };
}

export function echoMutationOptions(
  opts?: { onSuccess?: () => void },
): CreateMutationOptions<unknown, Error, { text: string }> {
  return {
    mutationFn: (input: { text: string }) => trpc.echo.mutate(input),
    ...opts,
  };
}
