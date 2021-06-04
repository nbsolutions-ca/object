
/**
 * NBSObject serves as a root object for all NBS framework
 * classes. By default, all instance methods are bound to the instance.
 * 
 * This means you don't need to do:
 * 
 * ```typescript
 * this.someCallbackMethod = this.someCallbackMethod.bind(this)
 * ```
 * 
 * To pass callback methods to certain classes / event handlers.
 * 
 * To opt out of this, override `_skipNBSObjectAutoBind` and return `false`.
 * Note that this method will not be affected by super class overrides. In otherwords,
 * If you have `Class C extends B extends A` and Class b skips auto binding,
 * **only** `Class B` methods will not be binded, but `Class A` and `Class C` methods
 * will still be automatically binded.
 * 
 * Alternatively you can exclude certain methods out of auto binding by
 * overriding `_excludeNBSObjectAutoBindingsFor` and returning a list of method names
 * as strings that shouldn't be bound to this instance.
 */

export class NBSObject {
    public constructor() {
        this.$nbsAutobind(this);
    }

    public testBind(): NBSObject {
        return this;
    }

    public getClassName(): string {
        return this.constructor.name;
    }

    private $nbsAutobind(context: any): void {
        // First determine if this object defines their own skip bind
        // if not, we'll reset it to NBSObject's 
        if (!Object.prototype.hasOwnProperty.call(Object.getPrototypeOf(context), '_skipNBSObjectAutoBind')) {
            Object.getPrototypeOf(context)._skipNBSObjectAutoBind = NBSObject.prototype._skipNBSObjectAutoBind;
        }
        
        // Use this context's prototype version of skipNBSObjectAutoBind (to avoid overrides)
        if (!Object.getPrototypeOf(context)._skipNBSObjectAutoBind()) {
            let excludes: string[] = this.$excludeNBSObjectAutoBindingsFor().concat(context._excludeNBSObjectAutoBindingsFor());
            Object.getOwnPropertyNames(Object.getPrototypeOf(context)).filter((method: string) => {
                if (Object.prototype.hasOwnProperty.call(this, method)) {
                    // Already has been bounded
                    return false;
                }

                if (excludes.length > 0) {
                    return excludes.indexOf(method) === -1;
                }

                return true;
            }).forEach((method: string) => {
                (this as any)[method] = (this as any)[method].bind(this);
            });
        }

        let parentContext: any = Object.getPrototypeOf(context);
        if (parentContext instanceof NBSObject) {
            this.$nbsAutobind(parentContext);
        }
    }

    /**
     * Returns true if the given value is `null` or `undefined`
     * @param o Any value
     * @returns 
     */
    public static isVoid<T = any>(o: T): boolean {
        return o === null || o === undefined;
    }

    protected _skipNBSObjectAutoBind(): boolean {
        return false;
    }

    private $excludeNBSObjectAutoBindingsFor(): string[] {
        return [
            'constructor',
            '$nbsAutobind',
            '$excludeNBSObjectAutoBindingsFor',
            '_excludeNBSObjectAutoBindingsFor',
            '_skipNBSObjectAutoBind'
        ];
    }

    protected _excludeNBSObjectAutoBindingsFor(): string[] {
        return [];
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public static getClassName(o: any): string {
        if (o.prototype) {
            return o.prototype.constructor.name;
        }
        else {
            return o.constructor.name;
        }
    }
}
