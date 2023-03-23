import { onMount } from 'svelte';
import { invalidate } from '$app/navigation';
import { browser } from '$app/environment';
import { HOUR } from '../constants';



export const poll = (namespace: string, pollInterval = HOUR) => {
  if (!browser) {
    return;
  }

  onMount(() => {
    const interval = setInterval(() => {
      console.log('invalidating')
      invalidate(namespace);
    }, pollInterval);

    return () => {
      clearInterval(interval);
    };
  });
}