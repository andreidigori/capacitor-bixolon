import type { PluginListenerHandle } from '@capacitor/core';
import { Capacitor } from '@capacitor/core';

import type { CallControlArgument, ControlEventResult } from '../definitions';
import type { BixolonDeviceCategory } from '../enums/bixolon-device-category';
import { BixolonError } from '../errors/bixolon-error';
import { Bixolon } from '../plugin';

export abstract class BixolonControl {
  protected static isIos = Capacitor.getPlatform() === 'ios';
  protected static isAndroid = Capacitor.getPlatform() === 'android';

  protected internalHashKey: string | undefined;

  private listeners: Record<string, Map<(...args: any[]) => void, PluginListenerHandle>> = {};

  constructor(
    protected deviceCategory: BixolonDeviceCategory,
  ) {}
  
  async link(): Promise<void> {
    if (this.internalHashKey) {
      // Prevent recreating new control in native hash map
      return;
    }

    const { value } = await Bixolon.createControl({
      deviceCategory: this.deviceCategory,
    });
    this.internalHashKey = value;
  }
  
  async dispose(): Promise<void> {
    if (!this.internalHashKey) {
      throw new Error('Control not linked to native');
    }

    const { value } = await Bixolon.disposeControl({
      hashKey: this.internalHashKey,
    });

    if (!value) {
      throw new Error('Control cannot be disposed');
    }

    this.internalHashKey = undefined;
  }

  protected call(methodName: string, ...args: CallControlArgument[]): Promise<void>;
  protected call<R>(methodName: string, ...args: CallControlArgument[]): Promise<R>;
  protected async call<R>(methodName: string, ...args: CallControlArgument[]): Promise<R | void> {
    if (!this.internalHashKey) {
      throw new Error('Control not linked to native');
    }

    try {
      const result = await Bixolon.callControl<R>({
        hashKey: this.internalHashKey,
        methodName,
        args,
      });

      if (result === undefined) {
        return;
      }

      return result.value;
    } catch (e: any) {
      throw this.throwParsedError(e);
    }
  }

  protected async addListener(eventName: string, eventProperties: string[], callback: (...args: any[]) => void): Promise<void> {
    if (!this.internalHashKey) {
      throw new Error('Control not linked to native');
    }

    if (!(eventName in this.listeners)) {
      try {
        await Bixolon.addControlListener({
          hashKey: this.internalHashKey,
          eventName,
          eventProperties,
        });
      } catch (e) {
        throw this.throwParsedError(e);
      }
      this.listeners[eventName] = new Map();
    }

    if (this.listeners[eventName].has(callback)) {
      // Prevent re-adding the same callback
      return;
    }

    const listenerHandle = await Bixolon.addListener(`control${eventName}`, (data: ControlEventResult) => {
      if (data.hashKey === this.internalHashKey) {
        callback(...data.values);
      }
    });
    this.listeners[eventName].set(callback, listenerHandle);
  }

  protected async removeListener(eventName: string, callback: (...args: any[]) => void): Promise<void> {
    if (!this.internalHashKey) {
      throw new Error('Control not linked to native');
    }

    if (!(eventName in this.listeners)) {
      return;
    }

    const listenerHandle = this.listeners[eventName].get(callback);
    if (!listenerHandle) {
      return;
    }

    await listenerHandle.remove();
    this.listeners[eventName].delete(callback);

    if (this.listeners[eventName].size) {
      return;
    }

    try {
      await Bixolon.removeControlListener({
        hashKey: this.internalHashKey,
        eventName,
      });
    } catch (e) {
      throw this.throwParsedError(e);
    }
    
    delete this.listeners[eventName];
  }

  private throwParsedError(e: any) {
    if (!('code' in e)) {
      throw e;
    }

    switch (e.code) {
      case 'jpos.JposException': {
        throw new BixolonError(e.message, e.data.code, e.data.extendedCode);
      }
    }

    throw new Error(e.message);
  }
}
