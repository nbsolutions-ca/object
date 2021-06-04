
import {NBSObject} from '../src/NBSObject';

describe('NBSObject', () => {
    class TestObject extends NBSObject {
        public testMethod(): TestObject {
            return this;
        }
    }

    it('auto binds instance methods', () => {
        let obj: TestObject = new TestObject();

        expect(obj.testMethod()).toBe(obj);
        let m = obj.testMethod;
        expect(m()).toBe(obj);
    });

    it('class name - static', () => {
        expect(NBSObject.getClassName(NBSObject)).toBe('NBSObject');
        expect(NBSObject.getClassName(TestObject)).toBe('TestObject');
    });

    it('class name - instance', () => {
        let nbs: NBSObject = new NBSObject();
        let obj: TestObject = new TestObject();
        expect(NBSObject.getClassName(nbs)).toBe('NBSObject');
        expect(NBSObject.getClassName(obj)).toBe('TestObject');
        expect(nbs.getClassName()).toBe('NBSObject');
        expect(obj.getClassName()).toBe('TestObject');
    });

    it('auto binds all methods on nested class structures', () => {
        class Obj extends TestObject {
            public testMethod2(): Obj {
                return this;
            }
        }

        let obj: Obj = new Obj();
        let m = obj.testMethod;
        let m2 = obj.testMethod2;
        expect(obj.testMethod()).toBe(obj);
        expect(obj.testMethod2()).toBe(obj);
        expect(m()).toBe(obj);
        expect(m2()).toBe(obj);
    });

    it('auto binds are isolated on nested class structures', () => {
        class Obj extends TestObject {
            public testObj(): Obj {
                return this;
            }

            protected _skipNBSObjectAutoBind(): boolean {
                return true;
            }
        }

        class objAutobind extends Obj {
            public shouldBeAutobinded(): objAutobind {
                return this;
            }
        }

        let obj: objAutobind = new objAutobind();
        // console.log('OBJ', obj);
        let testMethod = obj.testMethod;
        let testObj = obj.testObj;
        let shouldBeAutobinded = obj.shouldBeAutobinded;
        expect(obj.testMethod()).toBe(obj);
        expect(obj.testObj()).toBe(obj);
        expect(obj.shouldBeAutobinded()).toBe(obj);
        expect(testMethod()).toBe(obj);
        expect(testObj()).toBe(undefined);
        expect(shouldBeAutobinded()).toBe(obj);
    });

    it('skips auto bind', () => {
        class Obj extends NBSObject {
            protected _skipNBSObjectAutoBind(): boolean {
                return true;
            }

            public testMethod(): TestObject {
                return this;
            }
        }

        let obj: Obj = new Obj();
        let m = obj.testMethod;
        expect(obj.testMethod()).toBe(obj);
        expect(m()).toBe(undefined);
    })

    describe('isVoid', () => {
        let cases = [
            {
                name: 'null',
                test: null,
                expect: true
            },
            {
                name: 'undefined',
                test: undefined,
                expect: true
            },
            {
                name: 'empty string',
                test: '',
                expect: false
            },
            {
                name: 'some string',
                test: 'some string',
                expect: false
            },
            {
                name: '0',
                test: 0,
                expect: false
            },
            {
                name: 'NaN',
                test: NaN,
                expect: false
            },
            {
                name: 'boolean',
                test: true,
                expect: false
            }
        ];

        cases.forEach((testCase) => {
            it(testCase.name, () => {
                expect(NBSObject.isVoid(testCase.test)).toBe(testCase.expect);
            });
        });
    });
});
