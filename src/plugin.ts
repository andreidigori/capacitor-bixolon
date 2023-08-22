import { registerPlugin } from '@capacitor/core';

import type { BixolonPlugin } from './definitions';

export const Bixolon = registerPlugin<BixolonPlugin>('Bixolon', {
  web: () => import('./web').then(m => new m.BixolonWeb()),
});
