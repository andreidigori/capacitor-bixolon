import { BixolonDeviceCategory } from '../enums/bixolon-device-category';

import { BasePosControl } from './base-pos-control';

export class MSR extends BasePosControl {
  constructor() {
    super(BixolonDeviceCategory.CashDrawer);
  }
  /* From Android SDK */
  async getCapTransmitSentinels(): Promise<boolean> {
    /* Not implemented on iOS */
    return await this.call<boolean>('getCapTransmitSentinels');
  }
  // ios: async getTrack1Data(): Promise<string>
  async getTrack1Data(): Promise<number[]> {
    return await this.call<number[]>('getTrack1Data');
  }
  // ios: async getTrack2Data(): Promise<string>
  async getTrack2Data(): Promise<number[]> {
    return await this.call<number[]>('getTrack2Data');
  }
  // ios: async getTrack3Data(): Promise<string>
  async getTrack3Data(): Promise<number[]> {
    return await this.call<number[]>('getTrack3Data');
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
