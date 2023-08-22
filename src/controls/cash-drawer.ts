import { BixolonDeviceCategory } from '../enums/bixolon-device-category';

import { BasePosControl } from './base-pos-control';

export class CashDrawer extends BasePosControl {
  constructor() {
    super(BixolonDeviceCategory.CashDrawer);
  }
  /* From Android SDK */
  async getDrawerOpened(): Promise<boolean> {
    return await this.call<boolean>('getDrawerOpened');
  }
  async openDrawer(): Promise<void> {
    await this.call(CashDrawer.isIos ? 'OpenDrawer' : 'openDrawer');
  }
  /* From iOS SDK */
  async getIsHighSignal(): Promise<boolean> {
    return await this.call<boolean>('getIsHighSignal');
  }
  /* Listeners */
  async addDirectIOListener(callback: (...args: any[]) => void): Promise<void> {
    await this.addListener('DirectIO', ['EventNumber', 'Data', 'Object'], callback);
  }
  async removeDirectIOListener(callback: () => void): Promise<void> {
    await this.removeListener('DirectIO', callback);
  }
  async addStatusUpdateListener(callback: (...args: any[]) => void): Promise<void> {
    await this.addListener('StatusUpdate', ['Status'], callback);
  }
  async removeStatusUpdateListener(callback: () => void): Promise<void> {
    await this.removeListener('StatusUpdate', callback);
  }
}
