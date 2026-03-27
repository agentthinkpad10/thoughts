import type { TRPCOptionsProxy } from "@trpc/tanstack-react-query";
import type { AppRouter } from "../server/router";

export function categoriesQueryOptions(trpc: TRPCOptionsProxy<AppRouter>) {
  return trpc.categories.list.queryOptions();
}

export function createCategoryMutationOptions(
  trpc: TRPCOptionsProxy<AppRouter>,
  opts?: any
) {
  return trpc.categories.create.mutationOptions(opts);
}
