<script lang="ts">
  export let color: string = 'bg-white';
</script>

<div class='flex gap-1 p-2'>
  <div class={`h-2 w-2 ${color} rounded-full animate-bounce [animation-delay:-0.2s]`}></div>
  <div class={`h-2 w-2 ${color} rounded-full animate-bounce [animation-delay:-0.15s]`}></div>
  <div class={`h-2 w-2 ${color} rounded-full animate-bounce`}></div>
</div>