<script lang="ts">
  import { setMode } from "mode-watcher";
  import { Sun, Moon } from "lucide-svelte";
  import { Button } from "@repo/svelte-ui/components/button";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@repo/svelte-ui/components/dropdown-menu";
</script>

<DropdownMenu>
  <DropdownMenuTrigger>
    {#snippet child({ props })}
      <Button variant="outline" size="icon" aria-label="Toggle theme" {...props}>
        <Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
    {/snippet}
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem onclick={() => setMode("light")}>
      Light
    </DropdownMenuItem>
    <DropdownMenuItem onclick={() => setMode("dark")}>
      Dark
    </DropdownMenuItem>
    <DropdownMenuItem onclick={() => setMode("system")}>
      System
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
