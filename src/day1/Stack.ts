type Node<T> = {
    value: T;
    next?: Node<T>;
};

export default class Stack<T> {
    public length: number;
    private head: Node<T> | undefined;

    constructor() {
        this.head = undefined;
        this.length = 0;
    }

    push(item: T): void {
        this.length++;
        const node = { value: item } as Node<T>;

        if (!this.head) {
            this.head = node;
            return;
        }

        const head = this.head;
        this.head = node;
        this.head.next = head;
    }
    pop(): T | undefined {
        if (!this.head) return;

        this.length--;

        const head = this.head;
        this.head = this.head.next;

        return head?.value;
    }
    peek(): T | undefined {
        return this.head?.value;
    }
}
