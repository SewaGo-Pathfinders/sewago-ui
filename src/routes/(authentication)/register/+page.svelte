<script lang="ts">
	import { goto } from '$app/navigation';
	import Input from '$lib/components/Input.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import Swal from '$lib/utils/Swal';
  
  let input = {
    fullname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  let isLoading = false;
  $: isPasswordNotSame = input.password !== input.confirmPassword;

  async function register() {
    isLoading = true;

    await fetch('http://localhost:3030/auth/sign-up', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ ...input }),
    }).then(async (response) => {
      const result = await response.json();
      isLoading = false;

      if (new RegExp('4[0-9][0-9]').test(response.status.toString())) {
        Swal.fire({
          icon: 'error',
          text: result.message,
        });
      } else {
        Swal.fire({
          icon: 'success',
          text: result.message,
          confirmButtonText: 'Login',
          showCancelButton: true,
          cancelButtonText: 'Later',
        }).then((result) => {
          if (result.isConfirmed)
            goto(`/login?email=${input.email}`);
          else if (result.isDismissed)
            for (const prop in input)
              input[prop as keyof typeof input] = '';
        });
      }
    });
  }

  function handler({ target }: any) {
    if (target)
      input = { ...input, [target.name]: target.value};
  }
</script>

<svelte:head>
  <title>Register</title>
</svelte:head>

<div class="h-full flex flex-col justify-between">
  <h1 class="text-primary font-urbanist font-bold text-[2rem] leading-10">Welcome! let’s get sterted with sewaGo</h1>

  <form class=" flex flex-col gap-3" on:submit={(e) => e.preventDefault()}>
    <Input
      type="text"
      name="username"
      placeholder="Username"
      value={input.username}
      disabled={isLoading}
      on:input={handler}
    />
    <Input
      type="email"
      name="email"
      placeholder="Email"
      value={input.email}
      disabled={isLoading}
      on:input={handler}
    />
    <Input
      type="password"
      name="password"
      placeholder="Password"
      value={input.password}
      disabled={isLoading}
      on:input={handler}
    />
    <Input
      type="password"
      name="confirmPassword"
      placeholder="Confirm password"
      value={input.confirmPassword}
      disabled={isLoading}
      on:input={handler}
    />
    {#if isPasswordNotSame}
      <p class="text-sm text-red-500">Password and confirm password don't same, please check again!</p>
    {/if}
  </form>
  
  <div class=" flex flex-col gap-5">
    <button class="bg-accent text-white font-semibold w-full py-4 rounded-lg grid place-items-center" on:click={register}>
      {#if isLoading}
        <Loading />
      {:else}
        Register
      {/if}
    </button>
  </div>

  <p class="text-sm text-center">
    Have an account?
    <a href="/login" class="text-accent font-semibold"> Login</a>
  </p>
</div>

