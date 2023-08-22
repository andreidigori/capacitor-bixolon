import type { Plugin } from '@capacitor/core';

import type { BixolonDeviceBus } from './enums/bixolon-device-bus';
import type { BixolonDeviceCategory } from './enums/bixolon-device-category';

/* Internals */

// Java auto determined as java.lang.String | java.lang.Integer | java.lang.Float | java.lang.Boolean
type NativePrimitive = string | number | boolean | null;

type NativeArgument = NativePrimitive | HashNativeArgument | FixedClassNativeArgument | FixedClassNativeArrayArgument;

/* Types */

export type HashNativeArgument = {
  hashKey: string;
  classType?: string;
}

export type FixedClassNativeArgument = {
  value: NativePrimitive;
  classType?: string;
};

export type FixedClassNativeArrayArgument = {
  value: (NativePrimitive | HashNativeArgument | FixedClassNativeArgument)[] | null;
  componentClassType?: string;
  classType?: string;
};

export type CallControlArgument = NativeArgument | NativeArgument[];

/* Utils */

export interface WithLogicalName {
  logicalName: string;
}

export interface WithHashKey {
  hashKey: string;
}

/* Results */

export interface ValueResult<T> {
  value: T;
}

export interface BluetoothDevicesResult {
  devices: ({
    address: string;
    alias?: string;
    name: string;
    bondState: number;
    type: number;
    uuids: string[];
  })[];
}

export interface NetworkDevicesResult {
  devices: string[];
}

export interface UsbDevicesResult {
  devices: ({
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
  })[];
}

export interface GetAllEntriesResult {
  entries: (WithLogicalName & {
    properties: Record<string, any>;
  })[];
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

  /**
   * Get a list of bluetooth devices.
   * 
   * @remarks
   * 
   * Must have permissions for bluetooth.
   */
  getBluetoothDevices(): Promise<BluetoothDevicesResult>;

  /**
   * Get a list of network devices.
   * 
   * @param options - Passed options.
   * @param options.action - See BXLNetwork.SEARCH_WIFI_{...}
   * @param options.wifiSearchOption - Optional parameter, when passed itcalls BXLNetwork.setWifiSearchOption(...)
   */
  getNetworkDevices(options: GetNetworkDevicesOptions): Promise<NetworkDevicesResult>;

  /**
   * 
   * @param options - Passed options.
   * @param options.requestPermission - Passed to BXLUsbDevice.refreshUsbDevicesList(...)
   */
  getUsbDevices(options: GetUsbDevicesOptions): Promise<UsbDevicesResult>;

  /* Config loader */

  isInitialized(): Promise<ValueResult<boolean>>;
  initialize(): Promise<void>;
  addEntry(options: AddEntryOptions): Promise<void>;
  getAllEntries(): Promise<GetAllEntriesResult>;
  getEntry(options: WithLogicalName): Promise<GetEntryResult>;
  modifyEntry(options: ModifyEntryOptions): Promise<ValueResult<boolean>>;

  /**
   * Remove all entries from config file.
   * 
   * @remarks
   * 
   * For Android it does BXLConfigLoader.removeAllEntries();
   */
  removeAllEntries(): Promise<void>;

  /**
   * Remove an entry from config file by `logicalName`
   * @param options - Passed options.
   * @param options.logicalName - `logicalName`
   * 
   * @remarks
   * 
   * For Android it does BXLConfigLoader.removeEntry(logicalName);
   */
  removeEntry(options: WithLogicalName): Promise<ValueResult<boolean>>;

  /**
   * Save config file.
   * 
   * @remarks
   * 
   * For Android it does BXLConfigLoader.saveFile();
   */
  save(): Promise<void>;

  /* Controls */

  createControl(options: CreateControlOptions): Promise<ValueResult<string>>;
  disposeControl(options: WithHashKey): Promise<ValueResult<boolean>>;
  callControl<T = any>(options: CallControlOptions): Promise<ValueResult<T> | void>;
  addControlListener(options: AddControlListenerOptions): Promise<void>;
  removeControlListener(options: RemoveControlListenerOptions): Promise<void>;
}
