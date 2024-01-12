<script lang="ts">
  import type { AuthError } from 'firebase/auth';
  import type { PageData } from './$types';

  import { goto } from '$app/navigation';
  import {
  	GoogleAuthProvider,
  	getAuth,
  	sendPasswordResetEmail,
  	signInWithEmailAndPassword,
  	signInWithPopup,
  } from 'firebase/auth';

	import Input from '$lib/components/Input.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import Swal from '$lib/utils/Swal';

	import { LOCAL_STORAGE_KEY } from '$lib/utils/format';

  export let data: PageData;
  
  const auth = getAuth();
  let isLoading = false;
  let input = {
    email: data.email,
    password: '',
  };
  
  async function signIn(event: any) {
    let user;
    isLoading = true;

    try {
      if (event.target.name === 'google')
        user = (await signInWithPopup(auth, new GoogleAuthProvider())).user;
      else
        user = (await signInWithEmailAndPassword(auth, input.email, input.password)).user;

      const token = await user.getIdToken();
      const response = await fetch(`http://localhost:3030/auth/sign-in?token=${token}`, { credentials: 'include' });
      const userData = await response.json();

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userData));

      goto('/');
    } catch (error: any) {
      const { code }: AuthError = error; 
      const message = code.split('auth/').join(' ').split('-').join(' ');

      Swal.fire({
        icon: 'error',
        text: `${message.charAt(0).toUpperCase()}${message.slice(1)}`,
      });
    }

    isLoading = false;
  }

  async function forgotPassword() {
    Swal.fire({
      icon: 'question',
      title: 'Forgot your password?',
      text: 'We will send you an email to reset your password!',
      confirmButtonText: 'Send',
      showCancelButton: true,
      cancelButtonText: 'Later',
      input: 'email',
      inputPlaceholder: 'Email',
      inputAutoFocus: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        sendPasswordResetEmail(auth, result.value)
          .then(() => {
            Swal.fire({ icon: 'success', title: 'The email has been sent' });
          }).catch(() => {
            Swal.fire({ icon: 'error', title: 'Email not sent', confirmButtonText: 'Try again later'});
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
  <title>Login</title>
</svelte:head>

<div class="h-full flex flex-col justify-between">
  <h1 class="text-primary font-urbanist font-bold text-[2rem] leading-10">Welcome back! Glad to see you, Again!</h1>

  <form class=" flex flex-col gap-3" on:submit={(e) => e.preventDefault()}>
    <Input
      type="email"
      placeholder="Enter your email"
      value={input.email}
      disabled={isLoading}
      name="email"
      autocomplete="email"
      on:input={handler}
    />
    <Input
      type="password"
      placeholder="Enter your password"
      value={input.password}
      disabled={isLoading}
      name="password"
      on:input={handler}
    />
    <button on:click={forgotPassword} class="font-medium text-accent text-sm ml-auto" disabled={isLoading}>
      Forgot password?
    </button>
  </form>
  
  <div class=" flex flex-col gap-5">
    <button class="bg-accent text-white font-semibold w-full py-4 rounded-lg grid place-items-center" name="native" disabled={isLoading} on:click={signIn}>
      {#if isLoading}
        <Loading />
      {:else}
        Login
      {/if}
    </button>

    <div class="flex w-full justify-between items-center gap-4">
      <span class="bg-zinc-200 h-[1px] w-full"></span>
      <p class="text-sm font-medium min-w-fit opacity-50">Or login with</p>
      <span class="bg-zinc-200 h-[1px] w-full"></span>
    </div>

    <button class="p-4 w-full flex justify-center items-center gap-3 rounded-lg border-[1px] border-zinc-200" name="google" disabled={isLoading} on:click={signIn}>
      {#if isLoading}
        <Loading color="bg-accent" />
      {:else}
        <img src="/logo/google.svg" alt="google logo" class="w-7">
        <span class="font-medium">Google</span>
      {/if}
    </button>
  </div>

  <p class="text-sm text-center">
    Don't have an account?
    <a href="/register" class="text-accent font-semibold"> Register Now</a>
  </p>
</div>
