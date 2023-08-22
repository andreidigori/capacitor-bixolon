# capacitor-bixolon

Plugin for working natively with Bixolon POS controls.

## Install

```bash
npm install capacitor-bixolon
npx cap sync
```

## API

<docgen-index>

* [`getBluetoothDevices()`](#getbluetoothdevices)
* [`getNetworkDevices(...)`](#getnetworkdevices)
* [`getUsbDevices(...)`](#getusbdevices)
* [`isInitialized()`](#isinitialized)
* [`initialize()`](#initialize)
* [`addEntry(...)`](#addentry)
* [`getAllEntries()`](#getallentries)
* [`getEntry(...)`](#getentry)
* [`modifyEntry(...)`](#modifyentry)
* [`removeAllEntries()`](#removeallentries)
* [`removeEntry(...)`](#removeentry)
* [`save()`](#save)
* [`createControl(...)`](#createcontrol)
* [`disposeControl(...)`](#disposecontrol)
* [`callControl(...)`](#callcontrol)
* [`addControlListener(...)`](#addcontrollistener)
* [`removeControlListener(...)`](#removecontrollistener)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)
* [Enums](#enums)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### getBluetoothDevices()

```typescript
getBluetoothDevices() => Promise<BluetoothDevicesResult>
```

**Returns:** <code>Promise&lt;<a href="#bluetoothdevicesresult">BluetoothDevicesResult</a>&gt;</code>

--------------------


### getNetworkDevices(...)

```typescript
getNetworkDevices(options: GetNetworkDevicesOptions) => Promise<NetworkDevicesResult>
```

| Param         | Type                                                                          |
| ------------- | ----------------------------------------------------------------------------- |
| **`options`** | <code><a href="#getnetworkdevicesoptions">GetNetworkDevicesOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#networkdevicesresult">NetworkDevicesResult</a>&gt;</code>

--------------------


### getUsbDevices(...)

```typescript
getUsbDevices(options: GetUsbDevicesOptions) => Promise<UsbDevicesResult>
```

| Param         | Type                                                                  |
| ------------- | --------------------------------------------------------------------- |
| **`options`** | <code><a href="#getusbdevicesoptions">GetUsbDevicesOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#usbdevicesresult">UsbDevicesResult</a>&gt;</code>

--------------------


### isInitialized()

```typescript
isInitialized() => Promise<ValueResult<boolean>>
```

**Returns:** <code>Promise&lt;<a href="#valueresult">ValueResult</a>&lt;boolean&gt;&gt;</code>

--------------------


### initialize()

```typescript
initialize() => Promise<void>
```

--------------------


### addEntry(...)

```typescript
addEntry(options: AddEntryOptions) => Promise<void>
```

| Param         | Type                                                        |
| ------------- | ----------------------------------------------------------- |
| **`options`** | <code><a href="#addentryoptions">AddEntryOptions</a></code> |

--------------------


### getAllEntries()

```typescript
getAllEntries() => Promise<GetAllEntriesResult>
```

**Returns:** <code>Promise&lt;<a href="#getallentriesresult">GetAllEntriesResult</a>&gt;</code>

--------------------


### getEntry(...)

```typescript
getEntry(options: WithLogicalName) => Promise<GetEntryResult>
```

| Param         | Type                                                        |
| ------------- | ----------------------------------------------------------- |
| **`options`** | <code><a href="#withlogicalname">WithLogicalName</a></code> |

**Returns:** <code>Promise&lt;<a href="#getentryresult">GetEntryResult</a>&gt;</code>

--------------------


### modifyEntry(...)

```typescript
modifyEntry(options: ModifyEntryOptions) => Promise<ValueResult<boolean>>
```

| Param         | Type                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#modifyentryoptions">ModifyEntryOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#valueresult">ValueResult</a>&lt;boolean&gt;&gt;</code>

--------------------


### removeAllEntries()

```typescript
removeAllEntries() => Promise<void>
```

--------------------


### removeEntry(...)

```typescript
removeEntry(options: WithLogicalName) => Promise<ValueResult<boolean>>
```

| Param         | Type                                                        |
| ------------- | ----------------------------------------------------------- |
| **`options`** | <code><a href="#withlogicalname">WithLogicalName</a></code> |

**Returns:** <code>Promise&lt;<a href="#valueresult">ValueResult</a>&lt;boolean&gt;&gt;</code>

--------------------


### save()

```typescript
save() => Promise<void>
```

--------------------


### createControl(...)

```typescript
createControl(options: CreateControlOptions) => Promise<ValueResult<string>>
```

| Param         | Type                                                                  |
| ------------- | --------------------------------------------------------------------- |
| **`options`** | <code><a href="#createcontroloptions">CreateControlOptions</a></code> |

**Returns:** <code>Promise&lt;<a href="#valueresult">ValueResult</a>&lt;string&gt;&gt;</code>

--------------------


### disposeControl(...)

```typescript
disposeControl(options: WithHashKey) => Promise<ValueResult<boolean>>
```

| Param         | Type                                                |
| ------------- | --------------------------------------------------- |
| **`options`** | <code><a href="#withhashkey">WithHashKey</a></code> |

**Returns:** <code>Promise&lt;<a href="#valueresult">ValueResult</a>&lt;boolean&gt;&gt;</code>

--------------------


### callControl(...)

```typescript
callControl<T = any>(options: CallControlOptions) => Promise<ValueResult<T> | void>
```

| Param         | Type                                                              |
| ------------- | ----------------------------------------------------------------- |
| **`options`** | <code><a href="#callcontroloptions">CallControlOptions</a></code> |

**Returns:** <code>Promise&lt;void | <a href="#valueresult">ValueResult</a>&lt;T&gt;&gt;</code>

--------------------


### addControlListener(...)

```typescript
addControlListener(options: AddControlListenerOptions) => Promise<void>
```

| Param         | Type                                                                            |
| ------------- | ------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#addcontrollisteneroptions">AddControlListenerOptions</a></code> |

--------------------


### removeControlListener(...)

```typescript
removeControlListener(options: RemoveControlListenerOptions) => Promise<void>
```

| Param         | Type                                                                                  |
| ------------- | ------------------------------------------------------------------------------------- |
| **`options`** | <code><a href="#removecontrollisteneroptions">RemoveControlListenerOptions</a></code> |

--------------------


### Interfaces


#### BluetoothDevicesResult

| Prop          | Type                                |
| ------------- | ----------------------------------- |
| **`devices`** | <code>BluetoothDeviceEntry[]</code> |


#### BluetoothDeviceEntry

| Prop            | Type                  |
| --------------- | --------------------- |
| **`address`**   | <code>string</code>   |
| **`alias`**     | <code>string</code>   |
| **`name`**      | <code>string</code>   |
| **`bondState`** | <code>number</code>   |
| **`type`**      | <code>number</code>   |
| **`uuids`**     | <code>string[]</code> |


#### NetworkDevicesResult

| Prop          | Type                  |
| ------------- | --------------------- |
| **`devices`** | <code>string[]</code> |


#### GetNetworkDevicesOptions

| Prop                   | Type                                                                   |
| ---------------------- | ---------------------------------------------------------------------- |
| **`action`**           | <code>number</code>                                                    |
| **`wifiSearchOption`** | <code>{ lookupCount: number; interval: number; wire?: number; }</code> |


#### UsbDevicesResult

| Prop          | Type                          |
| ------------- | ----------------------------- |
| **`devices`** | <code>UsbDeviceEntry[]</code> |


#### UsbDeviceEntry

| Prop                   | Type                |
| ---------------------- | ------------------- |
| **`deviceName`**       | <code>string</code> |
| **`manufacturerName`** | <code>string</code> |
| **`productName`**      | <code>string</code> |
| **`version`**          | <code>string</code> |
| **`serialNumber`**     | <code>string</code> |
| **`deviceId`**         | <code>number</code> |
| **`vendorId`**         | <code>number</code> |
| **`productId`**        | <code>number</code> |
| **`deviceClass`**      | <code>number</code> |
| **`deviceSubclass`**   | <code>number</code> |
| **`deviceProtocol`**   | <code>number</code> |


#### GetUsbDevicesOptions

| Prop                    | Type                 |
| ----------------------- | -------------------- |
| **`requestPermission`** | <code>boolean</code> |


#### ValueResult

| Prop        | Type           |
| ----------- | -------------- |
| **`value`** | <code>T</code> |


#### AddEntryOptions

| Prop                 | Type                                                                    |
| -------------------- | ----------------------------------------------------------------------- |
| **`deviceCategory`** | <code><a href="#bixolondevicecategory">BixolonDeviceCategory</a></code> |
| **`productName`**    | <code>string</code>                                                     |
| **`deviceBus`**      | <code><a href="#bixolondevicebus">BixolonDeviceBus</a></code>           |
| **`address`**        | <code>string</code>                                                     |
| **`secure`**         | <code>boolean</code>                                                    |


#### GetAllEntriesResult

| Prop          | Type                               |
| ------------- | ---------------------------------- |
| **`entries`** | <code>EntryWithProperties[]</code> |


#### EntryWithProperties

| Prop             | Type                                                         |
| ---------------- | ------------------------------------------------------------ |
| **`properties`** | <code><a href="#record">Record</a>&lt;string, any&gt;</code> |


#### GetEntryResult

| Prop                 | Type                |
| -------------------- | ------------------- |
| **`deviceCategory`** | <code>number</code> |
| **`productName`**    | <code>string</code> |
| **`address`**        | <code>string</code> |
| **`deviceBus`**      | <code>number</code> |


#### WithLogicalName

| Prop              | Type                |
| ----------------- | ------------------- |
| **`logicalName`** | <code>string</code> |


#### ModifyEntryOptions

| Prop            | Type                                                          |
| --------------- | ------------------------------------------------------------- |
| **`deviceBus`** | <code><a href="#bixolondevicebus">BixolonDeviceBus</a></code> |
| **`address`**   | <code>string</code>                                           |
| **`secure`**    | <code>boolean</code>                                          |


#### CreateControlOptions

| Prop                 | Type                                                                    |
| -------------------- | ----------------------------------------------------------------------- |
| **`deviceCategory`** | <code><a href="#bixolondevicecategory">BixolonDeviceCategory</a></code> |


#### WithHashKey

| Prop          | Type                |
| ------------- | ------------------- |
| **`hashKey`** | <code>string</code> |


#### CallControlOptions

| Prop             | Type                               |
| ---------------- | ---------------------------------- |
| **`methodName`** | <code>string</code>                |
| **`args`**       | <code>CallControlArgument[]</code> |


#### HashNativeArgument

| Prop            | Type                |
| --------------- | ------------------- |
| **`hashKey`**   | <code>string</code> |
| **`classType`** | <code>string</code> |


#### ComplexNativeArgument

| Prop            | Type                                                        |
| --------------- | ----------------------------------------------------------- |
| **`value`**     | <code><a href="#nativeprimitive">NativePrimitive</a></code> |
| **`classType`** | <code>string</code>                                         |


#### ComplexNativeArrayArgument

| Prop                     | Type                                                                                                                                  |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| **`value`**              | <code>(<a href="#nativeprimitive">NativePrimitive</a> \| <a href="#complexnativeargument">ComplexNativeArgument</a>)[] \| null</code> |
| **`componentClassType`** | <code>string</code>                                                                                                                   |
| **`classType`**          | <code>string</code>                                                                                                                   |


#### AddControlListenerOptions

| Prop                  | Type                  |
| --------------------- | --------------------- |
| **`eventName`**       | <code>string</code>   |
| **`eventProperties`** | <code>string[]</code> |


#### RemoveControlListenerOptions

| Prop            | Type                |
| --------------- | ------------------- |
| **`eventName`** | <code>string</code> |


### Type Aliases


#### Record

Construct a type with a set of properties K of type T

<code>{
 [P in K]: T;
 }</code>


#### CallControlArgument

<code><a href="#nativeargument">NativeArgument</a> | NativeArgument[]</code>


#### NativeArgument

<code><a href="#nativeprimitive">NativePrimitive</a> | <a href="#hashnativeargument">HashNativeArgument</a> | <a href="#complexnativeargument">ComplexNativeArgument</a> | <a href="#complexnativearrayargument">ComplexNativeArrayArgument</a></code>


#### NativePrimitive

<code>string | number | boolean | null</code>


### Enums


#### BixolonDeviceCategory

| Members                | Value          |
| ---------------------- | -------------- |
| **`CashDrawer`**       | <code>0</code> |
| **`MSR`**              | <code>1</code> |
| **`POSPrinter`**       | <code>2</code> |
| **`SmartCardRW`**      | <code>3</code> |
| **`LocalSmartCardRW`** | <code>4</code> |


#### BixolonDeviceBus

| Members           | Value          |
| ----------------- | -------------- |
| **`Bluetooth`**   | <code>0</code> |
| **`Ethernet`**    | <code>1</code> |
| **`USB`**         | <code>2</code> |
| **`Wifi`**        | <code>3</code> |
| **`WifiDirect`**  | <code>4</code> |
| **`BluetoothLE`** | <code>5</code> |

</docgen-api>
