import React, { useState, useEffect, useMemo, useCallback } from "react";
import "./App.css";

// ─── useState Task ───────────────────────────────────────────────
function StudentNameDisplay() {
  const [name, setName] = useState("");

  return (
    <div className="hook-card">
      <div className="card-header">
        <span className="badge badge-blue">useState</span>
        <span className="card-title">Student Name Display</span>
      </div>

      <div className="card-body">
        <h2 className="task-name">Student Name Display</h2>
        <p className="info">
          Type your name below. The greeting updates live using{" "}
          <code>useState</code>.
        </p>

        <input
          type="text"
          placeholder="Enter your name…"
          maxLength={40}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="hook-input"
        />

        <div className={`welcome-msg ${name ? "active" : "empty"}`}>
          {name ? `Welcome, ${name}!` : "Welcome, …"}
        </div>
      </div>
    </div>
  );
}

// ─── useEffect Task ──────────────────────────────────────────────
function WelcomeAlert() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);

    const timer = setTimeout(() => {
      setShow(false);
    }, 3500);

    alert("PLZ reload after some time");

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="hook-card">
      <div className="card-header">
        <span className="badge badge-purple">useEffect</span>
        <span className="card-title">Welcome Alert</span>
      </div>

      <div className="card-body">
        <h2 className="task-name">Welcome Alert</h2>
        <p className="info">
          On mount, <code>useEffect</code> fires once and shows an alert.
        </p>

        {show && (
          <div className="alert-flash">
            Welcome!
          </div>
        )}
      </div>
    </div>
  );
}

// ─── useMemo Task ────────────────────────────────────────────────
function MultiplyByTwo() {
  const [number, setNumber] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  const result = useMemo(() => {
    return number * 2;
  }, [number]);

  return (
    <div className="hook-card">
      <div className="card-header">
        <span className="badge badge-teal">useMemo</span>
        <span className="card-title">Multiply Number by 2</span>
      </div>

      <div className="card-body">
        <h2 className="task-name">Multiply Number by 2</h2>
        <p className="info">
          Enter a number and click Calculate. <code>useMemo</code> caches
          the result and only recomputes when the number changes.
        </p>

        <div className="row">
          <input
            type="number"
            className="hook-input number-input"
            value={number}
            min={0}
            max={9999}
            onChange={(e) => {
              setNumber(parseInt(e.target.value) || 0);
              setSubmitted(false);
            }}
          />

          <button
            className="hook-btn primary"
            onClick={() => setSubmitted(true)}
          >
            Calculate
          </button>
        </div>

        {submitted && (
          <div className="memo-row">
            <span className="num-big">{number}</span>
            <span className="arrow">× 2 =</span>
            <span className="result-num">{result}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── useCallback Task ────────────────────────────────────────────
function ShowWelcomeMessage() {
  const [message, setMessage] = useState(null);

  const handleButtonA = useCallback(() => {
    setMessage({
      text: "Hello from Button A! 👋 This callback is memoized with useCallback.",
      type: "msg-a",
    });
  }, []);

  const handleButtonB = useCallback(() => {
    setMessage({
      text: "Hi from Button B! 🎉 useCallback prevents unnecessary re-creation.",
      type: "msg-b",
    });
  }, []);

  return (
    <div className="hook-card">
      <div className="card-header">
        <span className="badge badge-coral">useCallback</span>
        <span className="card-title">Show Welcome Message</span>
      </div>

      <div className="card-body">
        <h2 className="task-name">Show Welcome Message</h2>
        <p className="info">
          Two buttons each hold a memoized callback via{" "}
          <code>useCallback</code>. Click either to show its message.
        </p>

        <div className="row">
          <button className="hook-btn" onClick={handleButtonA}>
            Button A
          </button>

          <button className="hook-btn" onClick={handleButtonB}>
            Button B
          </button>
        </div>

        {message && (
          <div className={`msg-box ${message.type}`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── App Root ────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="app">
      <StudentNameDisplay />
      <WelcomeAlert />
      <MultiplyByTwo />
      <ShowWelcomeMessage />
    </div>
  );
}