import { registerPlugin } from '@capacitor/core';

import type { BixolonPlugin } from './definitions';

const Bixolon = registerPlugin<BixolonPlugin>('Bixolon', {
  web: () => import('./web').then(m => new m.BixolonWeb()),
});

export * from './definitions';
export { Bixolon };
