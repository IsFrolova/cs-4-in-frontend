class BCDNumber {
    constructor(value) {
        if (value < 0) {
            throw new Error('Число должно быть положительным');
        }

        const digits = value.toString().split('').map(d => parseInt(d, 10));

        this.size = digits.length;
        this.digitsArray = new Uint8Array(this.size);

        for (let i = 0; i < digits.length; i++) {
            this.digitsArray[i] = digits[i];
        }

        this.originalValue = typeof value === 'bigint' ? value : BigInt(value);
    }

    toString() {
        let result = '';
        for (let d of this.digitsArray) {
            result += d;
        }
        return result;
    }

    toNumber() {
        let result = 0;
        let pow = 0;
        for (let i = this.size - 1; i >= 0; i--) {
            result += this.digitsArray[i] * 10 ** pow;
            pow++;
        }
        return result;
    }

    toBigint() {
        let binaryString = '';
        
        for (let i = 0; i < this.size; i++) {
            let digit = this.digitsArray[i];
            let binary = digit.toString(2);
            
            while (binary.length < 4) {
                binary = '0' + binary;
            }
            
            binaryString += binary;
        }
        
        return BigInt('0b' + binaryString);
    }

    at(index) {
        const idx = index >= 0 ? index : this.size + index;
        if (idx < 0 || idx >= this.size) {
            throw new Error('Неверный индекс');
        }
        return this.digitsArray[idx];
    }
}
