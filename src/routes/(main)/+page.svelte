<script lang="ts">
  const categories = [
    { title: 'Household', asset: 'household' },
    { title: 'Sport', asset: 'sport' },
    { title: 'Clothes & Accessories', asset: 'clothes-accessories' },
    { title: 'Traveling', asset: 'traveling' },
    { title: 'Electronic', asset: 'electronic' },
    { title: 'Vehicle', asset: 'vehicle' },
    { title: 'Games & Entertaiment', asset: 'games-entertaiment' },
    { title: 'Contruction', asset: 'contruction' },
  ];
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<header class="flex flex-col gap-6">
  <div class="flex justify-between items-center">
    <div>
      <div class="flex gap-1 text-sm">
        Location
        <img src="/ui_icon/location_on.svg" alt="" class="w-4">
      </div>
  
      <address class="not-italic font-bold">Surabaya</address>
    </div>
  
    <a href="/my-cart">
      <img src="/ui_icon/shop-cart.svg" alt="" class="h-7">
    </a>
  </div>

  <div class="w-full flex  outline-1 outline outline-zinc-200 rounded-2xl">
    <input
      type="text"
      placeholder="Search anything..."
      class="w-full px-5 outline-none text-sm"
    >

    <button class="bg-accent p-3 rounded-xl m-1.5">
      <img src="/ui_icon/Search_white.svg" alt="">
    </button>
  </div>
</header>

<main class="mt-6">
  <section>
    <div class="w-full h-[30lvh] outline outline-1 outline-zinc-300 rounded-3xl grid place-items-center text-zinc-300">
      Ini rencananya carousel
    </div>
  </section>

  <section class="mt-9">
    <ul class="grid grid-cols-4 grid-rows-2 gap-3">
      {#each categories as { title, asset }}
        <li class="flex flex-col items-center gap-2">
          <button class="bg-zinc-100 outline outline-1 outline-zinc-200 rounded-2xl p-3">
            <img src={`/category_icon/${asset}.svg`} alt="" class="h-8">
          </button>

          <span class="text-xs text-center">{title}</span>
        </li>
      {/each}
    </ul>
  </section>
</main>
