const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        let param = isRealString(506);

        expect(param).toBe(false);
    });

    it('should reject strings with only spaces', () => {
        let param = isRealString(' ');

        expect(param).toBe(false);
    });

    it('should allow string with non-space characters' , () => {
        let param = isRealString('     McJoboo');

        expect(param).toBe(true)
    });
});