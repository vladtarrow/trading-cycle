import Base from './Base';

export default class Renko extends Base {
    constructor() {
        super(...arguments);
        this.brickSizeLong = this.defaults.sizeLong || this.defaults.size;
        this.brickSizeShort = this.defaults.sizeShort || this.defaults.size;
        this.renko = null;
        this.val = 0;
        this.extraChangeVal = 0;
    }

    doExecute() {
        if (!this.v.candle) {
            return;
        }
        if (this.renko) {
            this.renko.len++;
            this.renko.c = this.v.candle.c;
            this.renko.h = Math.max(this.renko.h, this.v.candle.h);
            this.renko.l = Math.min(this.renko.l, this.v.candle.l);
            if(this.v.candle.c > this.renko.o) {
                this.renko.up++;
            }
            if(this.v.tick.c < this.renko.o) {
                this.renko.down++;
            }
        } else {
            this.renko = {
                o: this.v.candle.o,
                c: this.v.candle.c,
                h: this.v.candle.h,
                l: this.v.candle.l,
                up: 0,
                down: 0,
                len: 1,
            };
        }

        const max = Math.max(this.renko.c, this.renko.o);
        const min = Math.min(this.renko.c, this.renko.o);

        const percentChange = Math.abs(max - min) / min;

        const isLong = this.renko.c > this.renko.o && percentChange >= this.brickSizeLong;
        const isShort = this.renko.c < this.renko.o && percentChange >= this.brickSizeShort;

        const extraChange = isLong ? percentChange - this.brickSizeLong : percentChange - this.brickSizeShort;

        if (isLong || isShort) {
            const renko = this.renko;
            renko.t = this.v.tick.t;
            this.val = this.val + (renko.c > renko.o ? 1 : -1)
            // this.val = 1/renko.len
            // renko.len = 1/renko.len
            renko.val = this.val;
            renko.extraChange = extraChange;
            // if(isLong) {
                this.extraChangeVal = extraChange >= 0.04/100 ? this.extraChangeVal+1 : this.extraChangeVal-1;
            // }
            renko.extraChangeVal = this.extraChangeVal;
            this.renko = {
                o: renko.c,
                c: renko.c,
                h: renko.c,
                l: renko.c,
                len: 0,
                up: 0,
                down: 0,
                t: this.v.tick.t,
                val: this.val,
            }
            return renko;
        }
    }
}
