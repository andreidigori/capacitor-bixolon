import type { Plugin } from '@capacitor/core';

import type { BixolonDeviceBus } from './enums/bixolon-device-bus';
import type { BixolonDeviceCategory } from './enums/bixolon-device-category';

/* Internals */

/*
  Java auto determined as java.lang.String | java.lang.Integer | java.lang.Float | java.lang.Boolean
*/
type NativePrimitive = string | number | boolean | null;

type NativeArgument = NativePrimitive | HashNativeArgument | ComplexNativeArgument | ComplexNativeArrayArgument;

/* Types */

export type CallControlArgument = NativeArgument | NativeArgument[];

/* Utils */

export interface HashNativeArgument {
  hashKey: string;
  classType?: string;
}

export interface ComplexNativeArgument {
  value: NativePrimitive;
  classType?: string;
};

export interface ComplexNativeArrayArgument {
  value: (NativePrimitive | ComplexNativeArgument)[] | null;
  componentClassType?: string;
  classType?: string;
};

export interface WithLogicalName {
  logicalName: string;
}

export interface WithHashKey {
  hashKey: string;
}

export interface BluetoothDeviceEntry {
  address: string;
  alias?: string;
  name: string;
  bondState: number;
  type: number;
  uuids: string[];
}

export interface UsbDeviceEntry {
  deviceName: string;
  manufacturerName: string;
  productName: string;
  version?: string;
  serialNumber: string;
  deviceId: number;
  vendorId: number;
  productId: number;
  deviceClass: number;
  deviceSubclass: number;
  deviceProtocol: number;
}

/* Results */

export interface ValueResult<T> {
  value: T;
}

export interface BluetoothDevicesResult {
  devices: BluetoothDeviceEntry[];
}

export interface NetworkDevicesResult {
  devices: string[];
}

export interface UsbDevicesResult {
  devices: UsbDeviceEntry[];
}

export interface EntryWithProperties extends WithLogicalName {
  properties: Record<string, any>;
}

export interface GetAllEntriesResult {
  entries: EntryWithProperties[];
}

export interface GetEntryResult {
  deviceCategory: number;
  productName: string;
  address: string;
  deviceBus: number;
}

export interface ControlEventResult extends WithHashKey {
  values: any[];
}

/* Options */

export interface GetNetworkDevicesOptions {
  action: number;
  wifiSearchOption?: {
    lookupCount: number;
    interval: number;
    wire?: number;
  };
}

export interface GetUsbDevicesOptions {
  requestPermission: boolean;
}

export interface AddEntryOptions extends WithLogicalName {
  deviceCategory: BixolonDeviceCategory;
  productName: string;
  deviceBus: BixolonDeviceBus;
  address: string;
  secure?: boolean;
}

export interface ModifyEntryOptions extends WithLogicalName {
  deviceBus: BixolonDeviceBus;
  address: string;
  secure?: boolean;
}

export interface CreateControlOptions {
  deviceCategory: BixolonDeviceCategory;
}

export interface CallControlOptions extends WithHashKey {
  methodName: string;
  args: CallControlArgument[];
}

export interface AddControlListenerOptions extends WithHashKey {
  eventName: string;
  eventProperties: string[];
}

export interface RemoveControlListenerOptions extends WithHashKey {
  eventName: string;
}

export interface BixolonPlugin extends Plugin {
  /* Devices finder */
  getBluetoothDevices(): Promise<BluetoothDevicesResult>;
  getNetworkDevices(options: GetNetworkDevicesOptions): Promise<NetworkDevicesResult>;
  getUsbDevices(options: GetUsbDevicesOptions): Promise<UsbDevicesResult>;
  /* Config loader */
  isInitialized(): Promise<ValueResult<boolean>>;
  initialize(): Promise<void>;
  addEntry(options: AddEntryOptions): Promise<void>;
  getAllEntries(): Promise<GetAllEntriesResult>;
  getEntry(options: WithLogicalName): Promise<GetEntryResult>;
  modifyEntry(options: ModifyEntryOptions): Promise<ValueResult<boolean>>;
  removeAllEntries(): Promise<void>;
  removeEntry(options: WithLogicalName): Promise<ValueResult<boolean>>;
  save(): Promise<void>;
  /* Controls */
  createControl(options: CreateControlOptions): Promise<ValueResult<string>>;
  disposeControl(options: WithHashKey): Promise<ValueResult<boolean>>;
  callControl<T = any>(options: CallControlOptions): Promise<ValueResult<T> | void>;
  addControlListener(options: AddControlListenerOptions): Promise<void>;
  removeControlListener(options: RemoveControlListenerOptions): Promise<void>;
}
