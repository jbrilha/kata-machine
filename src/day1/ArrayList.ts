export default class ArrayList<T> {
    public length: number;
    private capacity: number;
    private data: (T | undefined)[];

    constructor(capacity: number) {
        this.length = 0;
        this.capacity = capacity;
        this.data = Array.from({ length: this.capacity }, () => undefined);
    }

    prepend(item: T): void {
        if (this.length === this.capacity) this.growArray();

        this.insertAt(item, 0);
    }

    insertAt(item: T, idx: number): void {
        if (idx < 0 || idx > this.length) return undefined;

        if (this.length === this.capacity) this.growArray();

        for (let i = this.length; i > idx; i--) this.data[i] = this.data[i - 1];

        this.data[idx] = item;
        this.length++;
    }

    append(item: T): void {
        if (this.length === this.capacity) this.growArray();

        this.data[this.length] = item;
        this.length++;
    }

    remove(item: T): T | undefined {
        for (let i = 0; i < this.length; i++)
            if (this.data[i] === item) return this.removeAt(i);

        return undefined;
    }

    get(idx: number): T | undefined {
        if (idx < 0 || idx > this.length) return undefined;

        return this.data[idx];
    }

    removeAt(idx: number): T | undefined {
        if (idx < 0 || idx > this.length) return undefined;

        var val = this.data[idx];

        for (let i = idx; i < this.length - 1; i++)
            this.data[i] = this.data[i + 1];

        this.data[this.length - 1] = undefined;

        this.length--;

        return val;
    }

    private growArray(): void {
        this.capacity *= 2;

        var data: (T | undefined)[] = Array.from(
            { length: this.capacity },
            () => undefined,
        );

        for (let i = 0; i < this.data.length; i++) {
            data[i] = this.data[i];
            this.data[i] = undefined; // Housekeeping
        }

        this.data = data;
    }
}
