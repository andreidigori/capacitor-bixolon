package com.getcapacitor.community.bixolon;

import android.content.Context;

import com.bxl.config.editor.BXLConfigLoader;

import jpos.BaseJposControl;
import jpos.CashDrawer;
import jpos.LocalSmartCardRW;
import jpos.MSR;
import jpos.POSPrinter;
import jpos.SmartCardRW;

public class BixolonJposUtils {
    public static BaseJposControl createJposControl(int deviceCategory, Context context) {
        switch (deviceCategory) {
            case BXLConfigLoader.DEVICE_CATEGORY_CASH_DRAWER: {
                return new CashDrawer();
            }
            case BXLConfigLoader.DEVICE_CATEGORY_MSR: {
                return new MSR();
            }
            case BXLConfigLoader.DEVICE_CATEGORY_POS_PRINTER: {
                return new POSPrinter(context);
            }
            case BXLConfigLoader.DEVICE_CATEGORY_SMART_CARD_RW: {
                return new SmartCardRW();
            }
            case BXLConfigLoader.DEVICE_CATEGORY_LOCAL_SMART_CARD_RW: {
                return new LocalSmartCardRW();
            }
        }

        return null;
    }
}
