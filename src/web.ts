import { WebPlugin } from '@capacitor/core';

import type { BixolonPlugin, ValueResult, CallControlOptions, AddEntryOptions, GetAllEntriesResult, GetEntryResult, WithLogicalName, ModifyEntryOptions, WithHashKey, CreateControlOptions, AddControlListenerOptions, RemoveControlListenerOptions, BluetoothDevicesResult, GetNetworkDevicesOptions, NetworkDevicesResult, GetUsbDevicesOptions, UsbDevicesResult } from './definitions';

export class BixolonWeb extends WebPlugin implements BixolonPlugin {
  /* Devices finder */

  async getBluetoothDevices(): Promise<BluetoothDevicesResult> {
    console.log('getBluetoothDevices');
    return { devices: [] };
  }

  async getNetworkDevices(options: GetNetworkDevicesOptions): Promise<NetworkDevicesResult> {
    console.log('getNetworkDevices', JSON.stringify(options));
    return { devices: [] };
  }
  
  async getUsbDevices(options: GetUsbDevicesOptions): Promise<UsbDevicesResult> {
    console.log('getUsbDevices', JSON.stringify(options));
    return { devices: [] };
  }

  /* Config loader */

  async isInitialized(): Promise<ValueResult<boolean>> {
    console.log('isInitialized');
    return { value: true };
  }

  async initialize(): Promise<void> {
    console.log('initialize');
  }

  async addEntry(options: AddEntryOptions): Promise<void> {
    console.log('addEntry', JSON.stringify(options));
  }

  async getAllEntries(): Promise<GetAllEntriesResult> {
    console.log('getAllEntries');
    return { entries: [] };
  }

  async getEntry(options: WithLogicalName): Promise<GetEntryResult> {
    console.log('getEntry', JSON.stringify(options));
    return {
      deviceCategory: 0,
      productName: '',
      deviceBus: 0,
      address: '',
    };
  }

  async modifyEntry(options: ModifyEntryOptions): Promise<ValueResult<boolean>> {
    console.log('modifyEntry', JSON.stringify(options));
    return { value: false };
  }

  async removeAllEntries(): Promise<void> {
    console.log('removeAllEntries');
  }

  async removeEntry(options: WithLogicalName): Promise<ValueResult<boolean>> {
    console.log('removeEntry', JSON.stringify(options));
    return { value: false };
  }

  async save(): Promise<void> {
    console.log('save');
  }

  /* Controls */

  async createControl(options: CreateControlOptions): Promise<ValueResult<string>> {
    console.log('createControl', JSON.stringify(options));
    return { value: '' };
  }

  async disposeControl(options: WithHashKey): Promise<ValueResult<boolean>> {
    console.log('disposeControl', JSON.stringify(options));
    return { value: false };
  }

  async callControl<T = any>(options: CallControlOptions): Promise<ValueResult<T> | void> {
    console.log('callControl', JSON.stringify(options));
  }

  async addControlListener(options: AddControlListenerOptions): Promise<void> {
    console.log('addControlListener', JSON.stringify(options));
  }

  async removeControlListener(options: RemoveControlListenerOptions): Promise<void> {
    console.log('removeControlListener', JSON.stringify(options));
  }
}
