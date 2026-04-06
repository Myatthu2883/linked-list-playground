// ─── Linked List Data Structure ───────────────────────────────────────────────

export class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

export class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  /** O(1) — Insert at head */
  prepend(val) {
    const node = new ListNode(val);
    node.next = this.head;
    this.head = node;
    this.size++;
    return { index: 0, node };
  }

  /** O(n) — Insert at tail */
  append(val) {
    const node = new ListNode(val);
    if (!this.head) {
      this.head = node;
      this.size++;
      return { index: 0, node };
    }
    let curr = this.head;
    while (curr.next) curr = curr.next;
    curr.next = node;
    this.size++;
    return { index: this.size - 1, node };
  }

  /** O(n) — Insert at given index */
  insertAt(val, index) {
    if (index <= 0) return this.prepend(val);
    if (index >= this.size) return this.append(val);

    const node = new ListNode(val);
    let curr = this.head;
    for (let i = 0; i < index - 1; i++) curr = curr.next;
    node.next = curr.next;
    curr.next = node;
    this.size++;
    return { index, node };
  }

  /** O(1) — Remove head */
  removeHead() {
    if (!this.head) return null;
    const val = this.head.val;
    this.head = this.head.next;
    this.size--;
    return { val, index: 0 };
  }

  /** O(n) — Remove tail */
  removeTail() {
    if (!this.head) return null;
    if (!this.head.next) {
      const val = this.head.val;
      this.head = null;
      this.size--;
      return { val, index: 0 };
    }
    let curr = this.head;
    let index = 1;
    while (curr.next.next) { curr = curr.next; index++; }
    const val = curr.next.val;
    curr.next = null;
    this.size--;
    return { val, index };
  }

  /** O(n) — Remove at given index */
  removeAt(index) {
    if (index < 0 || index >= this.size) return null;
    if (index === 0) return this.removeHead();

    let curr = this.head;
    for (let i = 0; i < index - 1; i++) curr = curr.next;
    const val = curr.next.val;
    curr.next = curr.next.next;
    this.size--;
    return { val, index };
  }

  /** O(n) — Remove by value (first occurrence) */
  removeByValue(val) {
    if (!this.head) return null;
    if (this.head.val === val) return this.removeHead();

    let curr = this.head;
    let index = 1;
    while (curr.next) {
      if (curr.next.val === val) {
        curr.next = curr.next.next;
        this.size--;
        return { val, index };
      }
      curr = curr.next;
      index++;
    }
    return null;
  }

  /** O(n) — Find first occurrence of value, returns index or -1 */
  search(val) {
    let curr = this.head;
    let index = 0;
    const path = [];
    while (curr) {
      path.push(index);
      if (curr.val === val) return { found: true, index, path };
      curr = curr.next;
      index++;
    }
    return { found: false, index: -1, path };
  }

  /** O(n) — Reverse the list in place */
  reverse() {
    let prev = null;
    let curr = this.head;
    while (curr) {
      const next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }
    this.head = prev;
  }

  /** O(n) — Check if list has a cycle (Floyd's algorithm) */
  hasCycle() {
    let slow = this.head;
    let fast = this.head;
    while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;
      if (slow === fast) return true;
    }
    return false;
  }

  /** O(n) — Convert to plain array for rendering */
  toArray() {
    const result = [];
    let curr = this.head;
    while (curr) {
      result.push(curr.val);
      curr = curr.next;
    }
    return result;
  }

  get length() { return this.size; }
  get isEmpty() { return this.size === 0; }
  get headVal() { return this.head?.val ?? null; }
  get tailVal() {
    if (!this.head) return null;
    let curr = this.head;
    while (curr.next) curr = curr.next;
    return curr.val;
  }
}
