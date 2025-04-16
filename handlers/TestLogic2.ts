import Base from './Base';

export default class TestLogic2 extends Base {
    constructor() {
        super(...arguments);
    }

    doExecute() {
        const renko = this.s.candle;
        if (renko && renko.length < 10) {
            return
        }

        // if (
        //     this.v.candle && this.v.signal.signal// &&
        //     // renko[renko.length - 1].c > renko[renko.length - 1].o &&
        //     // renko[renko.length - 2].c < renko[renko.length - 2].o &&
        //     // renko[renko.length - 3].c < renko[renko.length - 3].o &&
        //     // renko[renko.length - 4].c < renko[renko.length - 4].o// &&
        //     // renko[renko.length - 5].c > renko[renko.length - 5].o &&
        //     // renko[renko.length - 6].c > renko[renko.length - 6].o
        // ) {
        //     return {
        //         signal: true
        //     }
        // }
    };
}
