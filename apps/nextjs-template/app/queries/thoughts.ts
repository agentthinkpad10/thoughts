import type { TRPCOptionsProxy } from "@trpc/tanstack-react-query";
import type { AppRouter } from "../server/router";

export function thoughtsQueryOptions(
  trpc: TRPCOptionsProxy<AppRouter>,
  input?: { categoryId?: string; parentThoughtId?: string }
) {
  return trpc.thoughts.list.queryOptions(input ?? {});
}

export function thoughtByIdQueryOptions(
  trpc: TRPCOptionsProxy<AppRouter>,
  input: { id: string }
) {
  return trpc.thoughts.byId.queryOptions(input);
}

export function createThoughtMutationOptions(
  trpc: TRPCOptionsProxy<AppRouter>,
  opts?: any
) {
  return trpc.thoughts.create.mutationOptions(opts);
}

export function deleteThoughtMutationOptions(
  trpc: TRPCOptionsProxy<AppRouter>,
  opts?: any
) {
  return trpc.thoughts.delete.mutationOptions(opts);
}
