class BCDNumber {
    constructor(value) {
        
        if (
            (typeof value !== 'number' && typeof value !== 'bigint') ||
            value < 0 ||
            (typeof value === 'number' && !Number.isInteger(value))
        ) {
            throw new Error('Только неотрицательные целые числа');
        }

        let temp = typeof value === 'bigint' ? value : BigInt(value);
        const digits = [];

        if (temp === 0n) {
            digits.push(0);
        } else {
            while (temp > 0n) {
                digits.push(Number(temp % 10n));
                temp /= 10n;
            }
            digits.reverse();
        }

        this.size = digits.length;
        this.digitsArray = new Uint8Array(this.size);

        for (let i = 0; i < this.size; i++) {
            this.digitsArray[i] = digits[i];
        }
    }

    toString() {
        let result = '';
        for (let d of this.digitsArray) {
            result += d;
        }
        return result;
    }

    toBigint() {
        let result = 0n;
        for (let i = 0; i < this.size; i++) {
            result = result * 10n + BigInt(this.digitsArray[i]);
        }
        return result;
    }

    toNumber() {
        const big = this.toBigint();
        if (big > BigInt(Number.MAX_SAFE_INTEGER)) {
            throw new Error('Число слишком большое для Number');
        }
        return Number(big);
    }

    at(index) {
        const idx = index >= 0 ? index : this.size + index;
        if (idx < 0 || idx >= this.size) {
            return undefined; // как в Array.at
        }
        return this.digitsArray[idx];
    }
}
