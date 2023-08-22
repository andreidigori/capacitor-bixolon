import type { HashNativeArgument } from '../definitions';
import { BixolonDeviceCategory } from '../enums/bixolon-device-category';

import { BasePosControl } from './base-pos-control';

export enum ImageCompression {
  None = 0,
  RLE = 1,
  LZMA = 2,
}

export interface ImagePrintOptions {
  station: number;
  brightness: number;
  compressType: ImageCompression;
  dithering: boolean;
}

export class POSPrinter extends BasePosControl {
  constructor() {
    super(BixolonDeviceCategory.POSPrinter);
  }
  /* From Android SDK */
  async getCapRecPapercut(): Promise<boolean> {
    return await this.call<boolean>('getCapRecPapercut');
  }
  async getRecLineWidth(): Promise<number> {
    return await this.call<number>('getRecLineWidth');
  }
  async getRecLineChars(): Promise<number> {
    return await this.call<number>('getRecLineChars');
  }
  async setRecLineChars(recLineChars: number): Promise<void> {
    await this.call('setRecLineChars', recLineChars);
  }
  async getRecLineCharsList(): Promise<string> {
    return await this.call<string>('getRecLineCharsList');
  }
  async getAsyncMode(): Promise<boolean> {
    return await this.call<boolean>('getAsyncMode');
  }
  async setAsyncMode(asyncMode: boolean): Promise<void> {
    await this.call('setAsyncMode', asyncMode);
  }
  async getCharacterSet(): Promise<number> {
    /* Not implemented on iOS */
    return await this.call<number>('getCharacterSet');
  }
  async setCharacterSet(characterSet: number): Promise<void> {
    await this.call('setCharacterSet', characterSet);
  }
  async getCharacterEncoding(): Promise<number> {
    /* Not implemented on iOS */
    return await this.call<number>('getCharacterEncoding');
  }
  async setCharacterEncoding(characterEncoding: number): Promise<void> {
    /* Not implemented on iOS */
    await this.call('setCharacterEncoding', characterEncoding);
  }
  async getPageModeHorizontalPosition(): Promise<number> {
    /* Not implemented on iOS */
    return await this.call<number>('getPageModeHorizontalPosition');
  }
  async setPageModeHorizontalPosition(position: number): Promise<void> {
    await this.call(POSPrinter.isIos ? 'setLeftPosition' : 'setPageModeHorizontalPosition', position);
  }
  async getPageModePrintArea(): Promise<string> {
    /* Not implemented on iOS */
    return await this.call<string>('getPageModePrintArea');
  }
  // android: async setPageModePrintArea(area: string): Promise<void>
  async setPageModePrintArea(startX: number, startY: number, width: number, height: number): Promise<void> {
    const args = POSPrinter.isIos ? [startX, startY, width, height] : [`${startX}, ${startY}, ${width}, ${height}`];
    await this.call(POSPrinter.isIos ? 'setPageArea' : 'setPageModePrintArea', ...args);
  }
  async getPageModePrintDirection(): Promise<number> {
    /* Not implemented on iOS */
    return await this.call<number>('getPageModePrintDirection');
  }
  async setPageModePrintDirection(direction: number): Promise<void> {
    await this.call(POSPrinter.isIos ? 'setPageModeDirection' : 'setPageModePrintDirection', direction);
  }
  async getPageModeVerticalPosition(): Promise<number> {
    /* Not implemented on iOS */
    return await this.call<number>('getPageModeVerticalPosition');
  }
  async setPageModeVerticalPosition(position: number): Promise<void> {
    await this.call(POSPrinter.isIos ? 'setVerticalPosition' : 'setPageModeVerticalPosition', position);
  }
  async getPrinterStatus(): Promise<number> {
    return await this.call<number>('getPrinterStatus');
  }
  // ios: async cutPaper(percentage: number, feedCut: boolean): Promise<void>
  async cutPaper(percentage: number): Promise<void> {
    await this.call('cutPaper', percentage);
  }
  async ejectPaper(mode: number): Promise<void> {
    /* Not implemented on iOS */
    await this.call('ejectPaper', mode);
  }
  async getPresenterStatus(): Promise<number> {
    /* Not implemented on iOS */
    return await this.call<number>('getPresenterStatus');
  }
  async printBarCode(station: number, data: string, symbology: number, height: number, width: number, alignment: number, textPosition: number): Promise<void> {
    await this.call(POSPrinter.isIos ? 'printBarcode' : 'printBarCode', station, data, symbology, height, width, alignment, textPosition);
  }
  async printBitmap(options: ImagePrintOptions, fileName: string, width: number, alignment: number): Promise<void>;
  async printBitmap(options: ImagePrintOptions, bitmap: HashNativeArgument, width: number, alignment: number): Promise<void>;
  async printBitmap(options: ImagePrintOptions, uiImage: HashNativeArgument, width: number, alignment: number): Promise<void>;
  async printBitmap(options: ImagePrintOptions, fileNameOrObject: string | HashNativeArgument, width: number, alignment: number): Promise<void> {
    if (POSPrinter.isIos) {
      await this.call('printBitmap', options.station, fileNameOrObject, width, alignment, options.brightness, options.compressType, options.dithering);
      return;
    }

    const station = this.stationFromOptions(options);
    await this.call('printBitmap', station, fileNameOrObject, width, alignment);
  }

  async printPDF(options: ImagePrintOptions, fileName: string, width: number, alignment: number, page: number): Promise<void>;
  async printPDF(options: ImagePrintOptions, uri: HashNativeArgument, width: number, alignment: number, page: number): Promise<void>;
  /**
   * Works only for Android
   * @param options 
   * @param fileNameOrUri 
   * @param width 
   * @param alignment 
   * @param startPage 
   * @param endPage 
   */
  async printPDF(options: ImagePrintOptions, uri: HashNativeArgument, width: number, alignment: number, startPage: number, endPage: number): Promise<void>;
  async printPDF(options: ImagePrintOptions, fileNameOrUri: string | HashNativeArgument, width: number, alignment: number, startPageOrPage: number, endPage?: number): Promise<void> {
    if (POSPrinter.isIos) {
      if (typeof fileNameOrUri !== 'string') {
        throw new Error('fileName must be string');
      }
      await this.call('printPDF', options.station, fileNameOrUri, width, alignment, startPageOrPage, options.brightness, options.compressType, options.dithering);
      return;
    }

    if (typeof fileNameOrUri === 'string') {
      throw new Error('uri must be android.net.Uri');
    }

    const station = this.stationFromOptions(options);
    const pagesArgs = [startPageOrPage];

    if (typeof endPage === 'number') {
      pagesArgs.push(endPage);
    }

    await this.call('printPDFFile', station, fileNameOrUri, width, alignment, ...pagesArgs);
  }

  async getCountPDFPages(uri: HashNativeArgument): Promise<number> {
    /* Not implemented on iOS */
    return await this.call<number>('getCountPDFPages', uri);
  }
  async printSvg(options: ImagePrintOptions, fileName: string, width: number, alignment: number, rotate: number): Promise<void> {
    /* Not implemented on iOS */
    const station = this.stationFromOptions(options);
    await this.call('printSvg', station, fileName, width, alignment, rotate);
  }
  async printNormal(station: number, data: string): Promise<void> {
    await this.call('printNormal', station, data);
  }
  async printRawData(data: string): Promise<void> {
    await this.call('printRawData', data);
  }
  async transactionPrint(station: number, control: number): Promise<void> {
    await this.call('transactionPrint', station, control);
  }
  async setAlarm(count: number): Promise<void> {
    await this.call('setAlarm', count);
  }
  async markFeed(): Promise<void> {
    await this.call('markFeed', 0);
  }
  async clearPrintArea(): Promise<void> {
    /* Not implemented on iOS */
    await this.call('clearPrintArea');
  }
  async pageModePrint(control: number): Promise<void> {
    /* Not implemented on iOS */
    await this.call('pageModePrint', control);
  }
  async displayString(data: string): Promise<void> {
    await this.call('displayString', data);
  }
  async displayStringAtLine(line: number, data: string): Promise<void> {
    await this.call('displayStringAtLine', line, data);
  }
  async clearScreen(): Promise<void> {
    await this.call('clearScreen');
  }
  async setTextEncoding(textEncoding: number): Promise<void> {
    await this.call('setTextEncoding', textEncoding);
  }
  async setDisplayCharacterset(characterset: number): Promise<void> {
    await this.call('setDisplayCharacterset', characterset);
  }
  async setDisplayInternationalCharacterset(internationalCharset: number): Promise<void> {
    await this.call(POSPrinter.isIos ? 'setInternationalCharacterset' : 'setDisplayInternationalCharacterset', internationalCharset);
  }
  async printLine(startX: number, startY: number, stopX: number, stopY: number, thickness: number): Promise<void> {
    await this.call(POSPrinter.isIos ? 'drawLineInPageMode' : 'printLine', startX, startY, stopX, stopY, thickness);
  }
  async printBox(startX: number, startY: number, stopX: number, stopY: number, thickness: number): Promise<void> {
    await this.call(POSPrinter.isIos ? 'drawBoxInPageMode' : 'printBox', startX, startY, stopX, stopY, thickness);
  }
  async setPrinterLock(): Promise<void> {
    /* Not implemented on iOS */
    await this.call('setPrinterLock');
  }
  async setPrinterUnlock(): Promise<void> {
    /* Not implemented on iOS */
    await this.call('setPrinterUnlock');
  }
  async storeImage(dataOrImage: HashNativeArgument, width: number, height: number, imageNumber: number): Promise<void> {
    await this.call('storeImage', dataOrImage, width, height, imageNumber);
  }
  async storeImageFile(fileName: string, width: number, height: number, imageNumber: number): Promise<void> {
    await this.call('storeImageFile', fileName, width, height, imageNumber);
  }
  async displayImage(imageNumber: number, xPos: number, yPos: number): Promise<void> {
    await this.call('displayImage', imageNumber, xPos, yPos);
  }
  async clearImage(isAll: boolean, imageNumber: number): Promise<void> {
    await this.call('clearImage', isAll, imageNumber);
  }
  /* From iOS SDK */
  async getBatteryState(): Promise<number> {
    /* Not implemented on Android */
    return await this.call<number>('getBatteryState');
  }
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
  /* Utils */
  private stationFromOptions(options: ImagePrintOptions) {
    return (options.station << 24) | (options.brightness << 16) | (options.compressType << 8) | (options.dithering ? 1 : 0);
  }
}
