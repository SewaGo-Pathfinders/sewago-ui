<script lang="ts">
  export let data: {
    id: string,
    img: string ,
    title: string,
    rating: number,
    price: number,
    store: {
      img: string | null,
      title: string,
    },
  };

  let starUrl: string;
  
  if (data.rating <= 1.6)
    starUrl = 'star_outline';
  else if (data.rating >= 3.2)
    starUrl = 'star';
  else
    starUrl = 'star_falf';
</script>

<li class="rounded-xl overflow-hidden shadow-md">
  <img src={data.img} alt={data.title} class="h-32 object-cover w-full">

  <div class="p-2.5 flex flex-col gap-2.5">
    <h3 class="w-full h-10 overflow-hidden text-sm font-semibold relative after:content-[''] after:bg-gradient-to-l after:from-white after:to-transparent after:w-1/2 after:absolute after:bottom-0 after:right-0 after:h-5">{data.title}</h3>

    <div class="flex items-center gap-2.5">
      <div class="flex gap-1 items-center w-fit rounded-md">
        <img src={`/rating/${starUrl}.svg`} alt="" class="size-5">
        <p class="text-[10px] font-medium">{data.rating}</p>
      </div>

      {#if data.rating >= 4.5}
        <p class="text-[10px] bg-yellow-400 font-medium py-0.5 px-1.5 rounded-sm">
          Star Store
        </p>
      {/if}
    </div>

    <div class="flex items-center gap-2">
      {#if data.store.img}
        <img src={data.store.img} alt={data.store.title} class="size-4 rounded-full">
      {:else}
        <img src="/ui_icon/Shop.svg" alt="" class="size-4 rounded-full">
      {/if}

      <p class="truncate text-[10px]">{data.store.title}</p>
    </div>

    <div>
      <p class="text-sm font-semibold">Rp. {data.price.toLocaleString('id')} <span class="text-[9px]">/ hari</span></p>
    </div>
  </div>
</li>