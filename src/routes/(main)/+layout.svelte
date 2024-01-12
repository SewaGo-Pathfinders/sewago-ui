<script>  
  import '../../app.css';
  import '$lib/firebase';

  import { page } from '$app/stores';

  const urls = [
    { href: '/', title: 'Home' },
    { href: '/liked', title: 'Liked' },
    { href: '/chat', title: 'Chat'},
    { href: '/history', title: 'History'},
    { href: '/profile', title: 'Profile'},
  ];
</script>

<div class="p-6">
  <slot />
  <nav class="w-full fixed bottom-0 left-0 py-5 flex gap-8 justify-center items-center" data-sveltekit-preload-data>
    {#each urls as { href, title }}
      <a {href} class="flex flex-col items-center gap-1">
        {#if $page.url.pathname === href}
          <img src={`/ui_icon/${title}_active.svg`} alt="" class="h-8">
          <span class="text-sm text-accent font-medium">{title}</span>
        {:else}
          <img src={`/ui_icon/${title}.svg`} alt="" class="h-7">
        {/if}
      </a>
    {/each}
  </nav>
</div>

