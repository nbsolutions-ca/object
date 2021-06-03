
import * as api from '../src/api';
import defaultapi from '../src/api';
import {NBSObject} from '../src/NBSObject';

describe('Public API', () => {
    it('NBSObject', () => {
        expect(api.NBSObject).toBe(NBSObject);
    });

    it('default export', () => {
        expect(defaultapi).toBe(NBSObject);
    });
});
