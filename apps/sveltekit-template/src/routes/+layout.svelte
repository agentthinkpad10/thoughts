<script lang="ts">
  import { QueryClientProvider } from "@tanstack/svelte-query";
  import { createQueryClient } from "@repo/svelte-query";
  import { ModeWatcher } from "mode-watcher";
  import "../app.css";

  let { children } = $props();
  const queryClient = createQueryClient();
</script>

<ModeWatcher />
<QueryClientProvider client={queryClient}>
  {@render children()}
</QueryClientProvider>
