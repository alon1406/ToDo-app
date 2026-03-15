import React, { useState } from "react";

interface TodoInputProps {
  onAdd: (
    title: string,
    description: string,
    date: string,
    hour?: string,
  ) => void;
}

export const TodoInput = ({ onAdd }: TodoInputProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim() || !date.trim() || !description.trim()) return;
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
            onChange={(e) => setDate(e.target.value)}
            aria-label="Due date"
          />
          <input
            type="time"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            aria-label="Due time (optional)"
          />
        </div>
      </div>
      <div className="todo-form-actions">
        <button type="submit" className="btn btn-primary btn-add-task">
          Add task
        </button>
      </div>
    </form>
  );
};
