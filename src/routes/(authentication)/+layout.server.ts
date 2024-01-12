import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

import { COOKIES_KEY } from '$lib/utils/format';

export const load: LayoutServerLoad = ({ cookies }) => {
  if (cookies.get(COOKIES_KEY) === undefined)
    return {};

  return redirect(300, '/');
}
