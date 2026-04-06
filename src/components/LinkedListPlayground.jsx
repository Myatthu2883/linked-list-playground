"use client";

import { useState, useCallback, useRef } from "react";
import { LinkedList } from "../lib/LinkedList";
import styles from "./LinkedListPlayground.module.css";

const MAX_LOG = 30;

const PRESETS = [
  { label: "1→5 chain", values: [10, 20, 30, 40, 50] },
  { label: "Odd nums",  values: [1, 3, 5, 7, 9] },
  { label: "Fibonacci", values: [1, 1, 2, 3, 5, 8] },
  { label: "Descending",values: [100, 75, 50, 25] },
  { label: "Single",    values: [42] },
];

function makeList(arr = []) {
  const ll = new LinkedList();
  arr.forEach(v => ll.append(v));
  return ll;
}

export default function LinkedListPlayground() {
  const [ll, setLL] = useState(() => makeList());
  const [nodes, setNodes] = useState([]);           // [{val, key, state}] state: normal|highlight|removing
  const [log, setLog]   = useState([]);
  const [insertVal, setInsertVal] = useState("");
  const [insertIdx, setInsertIdx] = useState("");
  const [removeVal, setRemoveVal] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const keyRef = useRef(0);

  const freshKey = () => ++keyRef.current;

  // ── Re-build nodes array from LL ──────────────────────────────────────────
  const syncNodes = useCallback((listInstance, highlightIndexes = [], removingIndexes = []) => {
    const arr = listInstance.toArray();
    setNodes(arr.map((v, i) => ({
      val: v,
      key: freshKey(),
      state: removingIndexes.includes(i) ? "removing"
           : highlightIndexes.includes(i) ? "highlight"
           : "normal",
    })));
    setLL(listInstance);
  }, []);

  const addLog = useCallback((type, msg, ok = true) => {
    setLog(prev => {
      const entry = { id: Date.now() + Math.random(), type, msg, ok };
      return [entry, ...prev].slice(0, MAX_LOG);
    });
  }, []);

  // ── Operations ────────────────────────────────────────────────────────────
  function runPrepend() {
    const v = parseInt(insertVal);
    if (isNaN(v)) return;
    const newLL = makeList(ll.toArray());
    const { index } = newLL.prepend(v);
    syncNodes(newLL, [index]);
    addLog("PREPEND", `Added ${v} at head → index 0`);
    setInsertVal("");
  }

  function runAppend() {
    const v = parseInt(insertVal);
    if (isNaN(v)) return;
    const newLL = makeList(ll.toArray());
    const { index } = newLL.append(v);
    syncNodes(newLL, [index]);
    addLog("APPEND", `Added ${v} at tail → index ${index}`);
    setInsertVal("");
  }

  function runInsertAt() {
    const v = parseInt(insertVal);
    const i = parseInt(insertIdx);
    if (isNaN(v) || isNaN(i)) return;
    const newLL = makeList(ll.toArray());
    const { index } = newLL.insertAt(v, i);
    syncNodes(newLL, [index]);
    addLog("INSERT", `Inserted ${v} at index ${index}`);
    setInsertVal(""); setInsertIdx("");
  }

  function runRemoveHead() {
    if (ll.isEmpty) return addLog("ERROR", "List is empty", false);
    const newLL = makeList(ll.toArray());
    const result = newLL.removeHead();
    syncNodes(newLL, []);
    addLog("REMOVE HEAD", `Removed ${result.val} from head`);
  }

  function runRemoveTail() {
    if (ll.isEmpty) return addLog("ERROR", "List is empty", false);
    const newLL = makeList(ll.toArray());
    const result = newLL.removeTail();
    syncNodes(newLL, []);
    addLog("REMOVE TAIL", `Removed ${result.val} from tail`);
  }

  function runRemoveAt() {
    const i = parseInt(removeVal);
    if (isNaN(i)) return;
    const newLL = makeList(ll.toArray());
    const result = newLL.removeAt(i);
    if (!result) return addLog("ERROR", `Index ${i} is out of bounds (size: ${ll.size})`, false);
    syncNodes(newLL, []);
    addLog("REMOVE", `Removed ${result.val} from index ${i}`);
    setRemoveVal("");
  }

  function runSearch() {
    const v = parseInt(searchVal);
    if (isNaN(v)) return;
    const result = ll.search(v);
    if (result.found) {
      syncNodes(makeList(ll.toArray()), [result.index]);
      addLog("SEARCH", `Found ${v} at index ${result.index} — O(n) traversal`);
    } else {
      syncNodes(makeList(ll.toArray()), []);
      addLog("SEARCH", `${v} not found in list`, false);
    }
    setSearchVal("");
  }

  function runReverse() {
    if (ll.isEmpty) return addLog("ERROR", "Nothing to reverse", false);
    const newLL = makeList(ll.toArray());
    newLL.reverse();
    syncNodes(newLL, []);
    addLog("REVERSE", `List reversed in place — O(n)`);
  }

  function runClear() {
    syncNodes(new LinkedList(), []);
    addLog("CLEAR", "List cleared");
  }

  function loadPreset(values) {
    const newLL = makeList(values);
    syncNodes(newLL, []);
    addLog("PRESET", `Loaded [${values.join(" → ")}]`);
  }

  const arr = ll.toArray();

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>Linked List Playground</h1>
        <span className={styles.badge}>Day 02 · Data Structures</span>
      </header>

      {/* Control panels */}
      <div className={styles.panels}>
        {/* Insert */}
        <section className={styles.panel}>
          <h3 className={styles.panelTitle}>Insert node</h3>
          <div className={styles.row}>
            <input
              className={styles.input}
              type="number"
              placeholder="Value"
              value={insertVal}
              onChange={e => setInsertVal(e.target.value)}
              onKeyDown={e => e.key === "Enter" && runAppend()}
            />
            <input
              className={styles.input}
              type="number"
              placeholder="Index (optional)"
              value={insertIdx}
              onChange={e => setInsertIdx(e.target.value)}
              style={{ width: 130 }}
            />
          </div>
          <div className={styles.row}>
            <button className={`${styles.btn} ${styles.btnBlue}`} onClick={runPrepend}>Prepend</button>
            <button className={`${styles.btn} ${styles.btnBlue}`} onClick={runAppend}>Append</button>
            <button className={styles.btn} onClick={runInsertAt}>At index</button>
          </div>
        </section>

        {/* Remove */}
        <section className={styles.panel}>
          <h3 className={styles.panelTitle}>Remove node</h3>
          <div className={styles.row}>
            <input
              className={styles.input}
              type="number"
              placeholder="Index to remove"
              value={removeVal}
              onChange={e => setRemoveVal(e.target.value)}
            />
          </div>
          <div className={styles.row}>
            <button className={`${styles.btn} ${styles.btnRed}`} onClick={runRemoveHead}>Head</button>
            <button className={`${styles.btn} ${styles.btnRed}`} onClick={runRemoveTail}>Tail</button>
            <button className={styles.btn} onClick={runRemoveAt}>At index</button>
            <button className={`${styles.btn} ${styles.btnGhost}`} onClick={runClear}>Clear</button>
          </div>
        </section>

        {/* Search */}
        <section className={styles.panel}>
          <h3 className={styles.panelTitle}>Search & traverse</h3>
          <div className={styles.row}>
            <input
              className={styles.input}
              type="number"
              placeholder="Value to find"
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
              onKeyDown={e => e.key === "Enter" && runSearch()}
            />
            <button className={`${styles.btn} ${styles.btnTeal}`} onClick={runSearch}>Search</button>
          </div>
          <div className={styles.row}>
            <button className={styles.btn} onClick={runReverse}>Reverse list</button>
          </div>
        </section>

        {/* Presets */}
        <section className={styles.panel}>
          <h3 className={styles.panelTitle}>Presets</h3>
          <div className={styles.row} style={{ flexWrap: "wrap" }}>
            {PRESETS.map(p => (
              <button key={p.label} className={styles.btn} onClick={() => loadPreset(p.values)}>
                {p.label}
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* Visualizer */}
      <div className={styles.vizWrap}>
        {arr.length === 0 ? (
          <span className={styles.emptyMsg}>List is empty — insert a node to get started.</span>
        ) : (
          <div className={styles.chain}>
            {arr.map((v, i) => {
              const nodeData = nodes[i] || { key: i, state: "normal" };
              const isHead = i === 0, isTail = i === arr.length - 1;
              return (
                <div key={nodeData.key} className={styles.nodeGroup}>
                  <div className={`${styles.node} ${nodeData.state === "highlight" ? styles.highlight : ""}`}>
                    <div className={`${styles.nodeBox} ${nodeData.state === "highlight" ? styles.nodeActive : ""}`}>
                      <span className={styles.nodeVal}>{v}</span>
                      <span className={styles.nodeIdx}>[{i}]</span>
                    </div>
                    <span className={styles.nodeLabel}>
                      {[isHead && "HEAD", isTail && "TAIL"].filter(Boolean).join("/")}
                    </span>
                  </div>
                  {i < arr.length - 1 && <div className={styles.arrow}>→</div>}
                </div>
              );
            })}
            <div className={styles.arrow}>→</div>
            <div className={styles.nullBox}>NULL</div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className={styles.stats}>
        {[
          ["Length",    ll.size],
          ["Head val",  ll.headVal ?? "—"],
          ["Tail val",  ll.tailVal ?? "—"],
        ].map(([label, val]) => (
          <div key={label} className={styles.stat}>
            <div className={styles.statLabel}>{label}</div>
            <div className={styles.statVal}>{val}</div>
          </div>
        ))}
      </div>

      {/* Complexity reference */}
      <div className={styles.complexityRow}>
        {[
          ["Prepend",   "O(1)"],
          ["Append",    "O(n)"],
          ["Insert at", "O(n)"],
          ["Remove",    "O(n)"],
          ["Search",    "O(n)"],
          ["Reverse",   "O(n)"],
          ["Space",     "O(n)"],
        ].map(([op, cx]) => (
          <div key={op} className={styles.chip}>
            {op}: <strong>{cx}</strong>
          </div>
        ))}
      </div>

      {/* Operation log */}
      <div className={styles.logWrap}>
        <div className={styles.logHeader}>Operation log</div>
        <div className={styles.log}>
          {log.length === 0 ? (
            <div className={styles.logEmpty}>No operations yet.</div>
          ) : (
            log.map(entry => (
              <div key={entry.id} className={styles.logEntry}>
                <span className={`${styles.logOp} ${entry.ok ? styles.logOk : styles.logErr}`}>
                  [{entry.type}]
                </span>
                <span className={styles.logMsg}> {entry.msg}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
