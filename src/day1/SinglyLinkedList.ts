type Node<T> = {
    value: T;
    next?: Node<T>;
};

export default class SinglyLinkedList<T> {
    public length: number;
    private head: Node<T> | undefined;
    private tail: Node<T> | undefined;

    constructor() {
        this.head = this.tail = undefined;
        this.length = 0;
    }

    prepend(item: T): void {
        this.length++;
        const node = { value: item } as Node<T>;
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        node.next = this.head;
        this.head = node;
    }

    insertAt(item: T, idx: number): void {
        if (!this.head || idx > this.length) return;

        if (idx === 0) return this.prepend(item);
        if (idx === this.length - 1) return this.append(item);

        this.length++;
        for (let node = this.head, i = 0; node.next; i++) {
            if (i === idx - 1) {
                const next = node.next;
                node.next = { value: item, next: next } as Node<T>;

                break;
            }
            node = node.next;
        }
    }

    append(item: T): void {
        this.length++;
        const node = { value: item } as Node<T>;
        if (!this.tail) {
            this.head = this.tail = node;
            return;
        }

        this.tail.next = node;
        this.tail = node;
    }

    remove(item: T): T | undefined {
        if (!this.head) return undefined;

        if (this.head?.value === item) {
            const val = this.head.value;
            this.head = this.head.next;
            this.length--;
            return val;
        }

        for (let node = this.head, i = 0; i < this.length, node.next; i++) {
            const next = node.next;
            if (next?.value === item) {
                const val = next.value;
                node.next = next.next;
                this.length--;

                return val;
            }
            node = node.next;
        }

        return undefined;
    }

    get(idx: number): T | undefined {
        if (idx > this.length) return undefined;

        if (idx === this.length - 1) return this.tail?.value;

        for (let node = this.head, i = 0; i <= idx; i++) {
            if (i === idx) return node?.value;

            node = node?.next;
        }

        return undefined;
    }

    removeAt(idx: number): T | undefined {
        const item = this.get(idx);
        if (item) return this.remove(item);

        return undefined;
    }
}
