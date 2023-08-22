import { BixolonControl } from './bixolon-control';

export abstract class BasePosControl extends BixolonControl {
  async getClaimed(): Promise<boolean> {
    return await this.call<boolean>('getClaimed');
  }
  async getDeviceControlDescription(): Promise<string> {
    return await this.call<string>('getDeviceControlDescription');
  }
  async getDeviceControlVersion(): Promise<number> {
    return await this.call<number>('getDeviceControlVersion');
  }
  async getDeviceEnabled(): Promise<boolean> {
    return await this.call<boolean>('getDeviceEnabled');
  }
  async setDeviceEnabled(deviceEnabled: boolean): Promise<void> {
    await this.call('setDeviceEnabled', deviceEnabled);
  }
  async claim(timeout: number): Promise<void> {
    await this.call('claim', timeout);
  }
  async close(): Promise<void> {
    await this.call('close');
  }
  // ios: async directIO(command: number, data: Data)
  async directIO(command: number, data: number[] | null, object: any): Promise<void> {
    await this.call('directIO', command, { value: data, componentClassType: 'java.lang.Integer', classType: '[I' }, { value: object, componentClassType: 'java.lang.Byte', classType: 'java.lang.Object' });
  }
  async open(logicalName: string): Promise<void> {
    await this.call('open', logicalName);
  }
  async release(): Promise<void> {
    await this.call('release');
  }
}
