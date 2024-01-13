<script lang="ts">  
  import { page } from '$app/stores';
  import { goto } from '$app/navigation'
  import { ref, getDownloadURL } from 'firebase/storage';

  import Card from '$lib/components/Card.svelte';
  import { productImg } from '$lib/firebase';

  const img = ref(productImg, 'kompor.jpeg');
  let imgUrl: string;

  getDownloadURL(img)
    .then((url) => imgUrl = url);

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

  function setCategory(category: string, currentSearchParams: string | null) {
    if (category === currentSearchParams)
      goto('/');
    else
      goto(`?category=${category}`);
  }
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

<main class="mt-6 flex flex-col gap-8">
  <section>
    <ul class="grid grid-cols-4 grid-rows-2 gap-x-6 gap-y-1">
      {#each categories as { title, asset }}
        {@const currentSearchParams = $page.url.searchParams.get('category')}
      
        <li class="grid grid-rows-2 place-items-center">
          <button
            class={`outline outline-1  rounded-2xl p-3 ${currentSearchParams === asset ? 'outline-accent bg-accent/10' : 'outline-zinc-200 bg-zinc-100'}`}
            on:click={() => setCategory(asset, currentSearchParams)}
          >
            <img src={`/category_icon/${asset}.svg`} alt="" class="h-8">
          </button>
          <span class="text-xs text-center">{title}</span>
        </li>
      {/each}
    </ul>
  </section>

  <section>
    <h2 class="font-semibold text-xl">Nearest Store</h2>

    <ul class="grid grid-cols-2 auto-rows-auto gap-5 mt-6">
      {#each new Array(6) as i}
        <Card data={{
          id: 'test',
          img: imgUrl,
          price: 28400,
          rating: 4.7,
          title: 'Kompor Gas Portable 1 Tungku Camping Portabel',
          store: {
            img: null,
            title: 'Lorem ipsum dolor sit.'
          },
        }}/>
      {/each}
    </ul>
  </section>
</main>
