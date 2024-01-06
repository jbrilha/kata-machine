type Node<T> = {
    value: T;
    prev?: Node<T>;
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
        this.head.prev = node;
        this.head = node;
    }

    insertAt(item: T, idx: number): void {
        if (!this.head || idx > this.length) return;

        if (idx === 0) return this.prepend(item);
        if (idx === this.length) return this.append(item);

        this.length++;
        for (let node = this.head, i = 0; i < this.length, node.next; i++) {
            if (i === idx) {
                const newNode = {
                    value: item,
                    next: node.next,
                    prev: node,
                } as Node<T>;
                node.next.prev = newNode;
                node.next = newNode;

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
        node.prev = this.tail;
        this.tail = node;
    }

    remove(item: T): T | undefined {
        if (!this.head || !this.tail) return undefined;

        if (this.head.value === item) {
            const val = this.head.value;
            const newHead = this.head.next;

            this.head = newHead;
            this.length--;
            return val;
        }
        if (this.tail.value === item) {
            const val = this.tail.value;
            const newTail = this.tail.prev;

            this.tail = newTail;
            this.length--;
            return val;
        }

        for (let node = this.head, i = 0; i < this.length, node.next; i++) {
            if (node.value === item) {
                const val = node.value;

                node.next.prev = node.prev;
                if (node.prev) node.prev.next = node.next;
                this.length--;

                return val;
            }

            node = node.next;
        }

        return undefined;
    }

    get(idx: number): T | undefined {
        if (idx > this.length) return undefined;

        if (idx === 0) return this.head?.value;
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
