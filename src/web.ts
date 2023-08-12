import { WebPlugin } from '@capacitor/core';

import type { BixolonPlugin } from './definitions';

export class BixolonWeb extends WebPlugin implements BixolonPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
