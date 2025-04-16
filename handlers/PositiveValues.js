import Base from './Base.js';

export default class PositiveValues extends Base {
    constructor() {
        super(...arguments);
        this.prev = undefined;
    }

    doExecute() {
        if (!this.v.input) {
            return;
        }
        const positive = !!(this.prev && this.v.input.c > this.prev.c);
        this.prev = this.v.input;
        if (positive) {
            return this.v.input;
        }
    }
}
