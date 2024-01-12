<script lang="ts">
  export let type: string = 'text';

  let isHide = true;
  $: specialType = isHide ? 'password' : 'text';

  function changeState() {
    isHide = !isHide;
  }
</script>

<div class="w-full rounded-lg border-[1px] border-zinc-200 flex">
  <input type={type === 'password' ? specialType : type} on:input class="bg-transparent p-4 w-full outline-none" {...$$restProps}>

  {#if type === 'password'}
    <button class="p-4 opacity-50" on:click={changeState}>
      {#if isHide}
        <img src="/ui_icon/View_unhide.svg" alt="">
      {:else}
        <img src="/ui_icon/View_hide.svg" alt="">
      {/if}
    </button>
  {/if}
</div>
