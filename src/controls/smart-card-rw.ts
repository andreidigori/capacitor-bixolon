import { BixolonDeviceCategory } from '../enums/bixolon-device-category';

import { BasePosControl } from './base-pos-control';

export class SmartCardRW extends BasePosControl {
  constructor() {
    super(BixolonDeviceCategory.SmartCardRW);
  }
  /* From Android SDK */
  async getIsoEmvMode(): Promise<number> {
    /* Not implemented on iOS */
    return await this.call<number>('getIsoEmvMode');
  }
  async setIsoEmvMode(isoEmvMode: number): Promise<void> {
    await this.call('setIsoEmvMode', isoEmvMode);
  }
  async getSCPresentSensor(): Promise<number> {
    /* Not implemented on iOS */
    return await this.call<number>('getSCPresentSensor');
  }
  async getSCSlot(): Promise<number> {
    /* Not implemented on iOS */
    return await this.call<number>('getSCSlot');
  }
  async setSCSlot(scSlot: number): Promise<void> {
    await this.call('setSCSlot', scSlot);
  }
  async beginInsertion(timeout: number): Promise<void> {
    await this.call('beginInsertion', timeout);
  }
  async beginRemoval(timeout: number): Promise<void> {
    await this.call('beginRemoval', timeout);
  }
  async endInsertion(): Promise<void> {
    await this.call('endInsertion');
  }
  async endRemoval(): Promise<void> {
    await this.call('endRemoval');
  }
  // ios: async readData(action: number, count: number[], data: Data)
  async readData(action: number, count: number[], data: string[]): Promise<void> {
    await this.call('readData', action, count, data);
  }
  /* From iOS SDK */
  /* Listeners */
  async addDirectIOListener(callback: (...args: any[]) => void): Promise<void> {
    await this.addListener('DirectIO', ['EventNumber', 'Data', 'Object'], callback);
  }
  async removeDirectIOListener(callback: (...args: any[]) => void): Promise<void> {
    await this.removeListener('DirectIO', callback);
  }
  async addErrorListener(callback: (...args: any[]) => void): Promise<void> {
    await this.addListener('Error', ['ErrorCode', 'ErrorCodeExtended', 'ErrorLocus', 'ErrorResponse'], callback);
  }
  async removeErrorListener(callback: (...args: any[]) => void): Promise<void> {
    await this.removeListener('Error', callback);
  }
  async addOutputCompleteListener(callback: (...args: any[]) => void): Promise<void> {
    await this.addListener('OutputComplete', ['OutputID'], callback);
  }
  async removeOutputCompleteListener(callback: (...args: any[]) => void): Promise<void> {
    await this.removeListener('OutputComplete', callback);
  }
  async addStatusUpdateListener(callback: (...args: any[]) => void): Promise<void> {
    await this.addListener('StatusUpdate', ['Status'], callback);
  }
  async removeStatusUpdateListener(callback: (...args: any[]) => void): Promise<void> {
    await this.removeListener('StatusUpdate', callback);
  }
}
