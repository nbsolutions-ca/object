[@nbsolutions/object - v0.0.0](../README.md) / [Exports](../modules.md) / NBSObject

# Class: NBSObject

NBSObject serves as a root object for all NBS framework
classes. By default, all instance methods are bound to the instance.

This means you don't need to do:

```typescript
this.someCallbackMethod = this.someCallbackMethod.bind(this)
```

To pass callback methods to certain classes / event handlers.

To opt out of this, override `_skipNBSObjectAutoBind` and return `false`.
Note that this method will not be affected by super class overrides. In otherwords,
If you have `Class C extends B extends A` and Class b skips auto binding,
**only** `Class B` methods will not be binded, but `Class A` and `Class C` methods
will still be automatically binded.

Alternatively you can exclude certain methods out of auto binding by
overriding `_excludeNBSObjectAutoBindingsFor` and returning a list of method names
as strings that shouldn't be bound to this instance.

## Implements

- `INBSObject`

## Table of contents

### Constructors

- [constructor](NBSObject.md#constructor)

### Methods

- [\_excludeNBSObjectAutoBindingsFor](NBSObject.md#_excludenbsobjectautobindingsfor)
- [\_skipNBSObjectAutoBind](NBSObject.md#_skipnbsobjectautobind)
- [getClassName](NBSObject.md#getclassname)
- [getClassName](NBSObject.md#getclassname-1)
- [isVoid](NBSObject.md#isvoid)

## Constructors

### constructor

• **new NBSObject**()

#### Defined in

[NBSObject.ts:27](https://github.com/nbsolutions-ca/object-js/blob/b4ba521/src/NBSObject.ts#L27)

## Methods

### \_excludeNBSObjectAutoBindingsFor

▸ `Protected` **_excludeNBSObjectAutoBindingsFor**(): `string`[]

#### Returns

`string`[]

#### Defined in

[NBSObject.ts:94](https://github.com/nbsolutions-ca/object-js/blob/b4ba521/src/NBSObject.ts#L94)

___

### \_skipNBSObjectAutoBind

▸ `Protected` **_skipNBSObjectAutoBind**(): `boolean`

#### Returns

`boolean`

#### Defined in

[NBSObject.ts:80](https://github.com/nbsolutions-ca/object-js/blob/b4ba521/src/NBSObject.ts#L80)

___

### getClassName

▸ **getClassName**(): `string`

#### Returns

`string`

#### Implementation of

INBSObject.getClassName

#### Defined in

[NBSObject.ts:31](https://github.com/nbsolutions-ca/object-js/blob/b4ba521/src/NBSObject.ts#L31)

___

### getClassName

▸ `Static` **getClassName**(`o`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `o` | `any` |

#### Returns

`string`

#### Defined in

[NBSObject.ts:99](https://github.com/nbsolutions-ca/object-js/blob/b4ba521/src/NBSObject.ts#L99)

___

### isVoid

▸ `Static` **isVoid**<`T`\>(`o`): `boolean`

Returns true if the given value is `null` or `undefined`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `o` | `T` | Any value |

#### Returns

`boolean`

#### Defined in

[NBSObject.ts:76](https://github.com/nbsolutions-ca/object-js/blob/b4ba521/src/NBSObject.ts#L76)
