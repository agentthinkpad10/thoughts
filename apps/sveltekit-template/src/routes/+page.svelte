<script lang="ts">
  import { createQuery, createMutation, useQueryClient } from "@tanstack/svelte-query";
  import { Button } from "@repo/svelte-ui/components/button";
  import ModeToggle from "$lib/components/mode-toggle.svelte";
  import { helloQueryOptions, messagesQueryOptions, echoMutationOptions } from "$lib/queries/messages";

  let text = $state("");

  const queryClient = useQueryClient();

  const hello = createQuery(helloQueryOptions({ name: "World" }));

  const messages = createQuery(messagesQueryOptions());

  const echo = createMutation(echoMutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      text = "";
    },
  }));

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (text.trim()) $echo.mutate({ text });
  }
</script>

<div class="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
  <div class="fixed right-4 top-4 flex items-center gap-3">
    <span class="text-sm font-medium text-muted-foreground">SvelteKit</span>
    <ModeToggle />
  </div>
  <h1 class="text-4xl font-bold">
    {$hello.data?.greeting ?? "Loading..."}
  </h1>

  <form class="flex gap-2" onsubmit={handleSubmit}>
    <input
      type="text"
      bind:value={text}
      placeholder="Type something..."
      class="rounded-md border border-input bg-background px-3 py-2 text-sm"
    />
    <Button type="submit" disabled={$echo.isPending}>
      {$echo.isPending ? "Sending..." : "Send"}
    </Button>
  </form>

  {#if $echo.data}
    <p class="text-lg text-muted-foreground">{$echo.data.message}</p>
  {/if}

  {#if $messages.data && $messages.data.length > 0}
    <div class="w-full max-w-md space-y-2">
      <h2 class="text-sm font-medium text-muted-foreground">
        Messages from DB
      </h2>
      <ul class="space-y-1">
        {#each $messages.data as msg (msg.id)}
          <li class="rounded border border-border bg-muted/50 px-3 py-2 text-sm">
            {msg.text}
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</div>
