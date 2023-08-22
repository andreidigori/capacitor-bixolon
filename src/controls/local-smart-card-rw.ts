import { BixolonDeviceCategory } from '../enums/bixolon-device-category';

import { BasePosControl } from './base-pos-control';

export class LocalSmartCardRW extends BasePosControl {
  constructor() {
    if (LocalSmartCardRW.isIos) {
      throw new Error('Not implemented on iOS');
    }
    super(BixolonDeviceCategory.LocalSmartCardRW);
  }
  /* From Android SDK */
  async getInterfaceMode(): Promise<number> {
    /* Not implemented on iOS */
    return await this.call<number>('getInterfaceMode');
  }
  async setInterfaceMode(interfaceMode: number): Promise<void> {
    /* Not implemented on iOS */
    await this.call('setInterfaceMode', interfaceMode);
  }
  async getCardInfo(timeout: number): Promise<void> {
    /* Not implemented on iOS */
    await this.call('getCardInfo', timeout);
  }
  async getTrack2(): Promise<number[]> {
    /* Not implemented on iOS */
    return await this.call<number[]>('getTrack2');
  }
  async getCardNumber(): Promise<number[]> {
    /* Not implemented on iOS */
    return await this.call<number[]>('getCardNumber');
  }
  async getCardDueDate(): Promise<number[]> {
    /* Not implemented on iOS */
    return await this.call<number[]>('getCardDueDate');
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
