[@nbsolutions/object - v0.0.0](../README.md) / [Exports](../modules.md) / [NBSObject](../modules/nbsobject.md) / NBSObject

# Class: NBSObject

[NBSObject](../modules/nbsobject.md).NBSObject

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

## Table of contents

### Constructors

- [constructor](nbsobject.nbsobject-1.md#constructor)

### Methods

- [\_excludeNBSObjectAutoBindingsFor](nbsobject.nbsobject-1.md#_excludenbsobjectautobindingsfor)
- [\_skipNBSObjectAutoBind](nbsobject.nbsobject-1.md#_skipnbsobjectautobind)
- [isVoid](nbsobject.nbsobject-1.md#isvoid)

## Constructors

### constructor

• **new NBSObject**()

#### Defined in

NBSObject.ts:24

## Methods

### \_excludeNBSObjectAutoBindingsFor

▸ `Protected` **_excludeNBSObjectAutoBindingsFor**(): `string`[]

#### Returns

`string`[]

#### Defined in

NBSObject.ts:79

___

### \_skipNBSObjectAutoBind

▸ `Protected` **_skipNBSObjectAutoBind**(): `boolean`

#### Returns

`boolean`

#### Defined in

NBSObject.ts:65

___

### isVoid

▸ `Static` **isVoid**<T\>(`o`): `boolean`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` = `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `o` | `T` |

#### Returns

`boolean`

#### Defined in

NBSObject.ts:61
