import Base from './Base';

export default class TestDiff extends Base {
    constructor() {
        super(...arguments);
        this.val = 0;
    }

    doExecute() {
        const renko = this._state['renko-0.05']
        if (renko.length < 10) {
            return
        }

        this.val = this.val + (renko[renko.length - 1].c > renko[renko.length - 1].o ? 1 : -1)

        return {
            val: this.val,
            t: this.v.tick.t,
        }
    };
}
