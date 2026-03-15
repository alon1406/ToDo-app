import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TodoInputProps {
  onAdd: (
    title: string,
    description: string,
    date: string,
    hour?: string,
  ) => void;
}

function getToday(): string {
  const t = new Date();
  return (
    t.getFullYear() +
    "-" +
    String(t.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(t.getDate()).padStart(2, "0")
  );
}

function isDateAndTimeInPast(dateStr: string, hourStr?: string): boolean {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  if (hourStr) {
    const [h, m] = hourStr.split(":").map(Number);
    d.setHours(h ?? 0, m ?? 0, 0, 0);
  } else {
    d.setHours(23, 59, 59, 999);
  }
  return d.getTime() <= Date.now();
}

export const TodoInput = ({ onAdd }: TodoInputProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [error, setError] = useState<string | null>(null);

  const isInvalid = useMemo(
    () => date.trim() !== "" && isDateAndTimeInPast(date, hour || undefined),
    [date, hour]
  );

  const isDisabled =
    !title.trim() ||
    !description.trim() ||
    !date.trim() ||
    isInvalid;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim() || !date.trim() || !description.trim()) return;
    if (isDateAndTimeInPast(date, hour || undefined)) {
      setError("Date and time must be in the future.");
      return;
    }
    setError(null);
    onAdd(title, description, date, hour || undefined);
    setTitle("");
    setDescription("");
    setDate("");
    setHour("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="todo-form-field">
        <label className="todo-form-label" htmlFor="todo-title">
          Title
        </label>
        <input
          id="todo-title"
          type="text"
          className="todo-form-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-label="Todo title"
          autoComplete="off"
        />
      </div>
      <div className="todo-form-field">
        <label className="todo-form-label" htmlFor="todo-desc">
          Description
        </label>
        <textarea
          id="todo-desc"
          className="todo-form-desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          aria-label="Todo description"
          autoComplete="off"
          rows={3}
        />
      </div>
      <div className="todo-form-datetime-wrap">
        <span className="todo-form-label">Time</span>
        <div className="todo-form-datetime">
          <input
            type="date"
            value={date}
            min={getToday()}
            onChange={(e) => {
              setDate(e.target.value);
              setError(null);
            }}
            aria-label="Due date"
            aria-invalid={isInvalid ? "true" : undefined}
          />
          <input
            type="time"
            value={hour}
            onChange={(e) => {
              setHour(e.target.value);
              setError(null);
            }}
            aria-label="Due time (optional)"
          />
        </div>
      </div>
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            key="error"
            className="todo-form-error"
            role="alert"
            initial={{ opacity: 0, x: 0 }}
            animate={{
              opacity: 1,
              x: [0, -8, 8, -8, 8, 0],
            }}
            transition={{
              opacity: { duration: 0.2 },
              x: { duration: 0.4 },
            }}
            exit={{ opacity: 0 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
      <div className="todo-form-actions">
        <button
          type="submit"
          className="btn btn-primary btn-add-task"
          disabled={isDisabled}
        >
          Add task
        </button>
      </div>
    </form>
  );
};
