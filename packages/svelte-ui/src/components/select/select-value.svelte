<script lang="ts" module>
  export type SelectValueProps = {
    placeholder?: string;
  };
</script>

<script lang="ts">
  let { placeholder }: SelectValueProps = $props();
</script>

<span>{placeholder ?? ""}</span>
