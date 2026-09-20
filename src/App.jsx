import { useState } from "react";
import "./index.css";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all"); // all | active | completed

  const addTodo = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos([
      { id: Date.now(), text: trimmed, done: false },
      ...todos,
    ]);
    setText("");
  };

  const toggleTodo = (id) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((t) => !t.done));
  };

  const visibleTodos = todos.filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "completed") return t.done;
    return true;
  });

  const remaining = todos.filter((t) => !t.done).length;

  return (
    <div className="app">
      <div className="card">
        <h1 className="title">Here is your todo list</h1>

        <form className="add-form" onSubmit={addTodo}>
          <input
            type="text"
            className="add-input"
            placeholder="What needs doing?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit" className="add-btn">
            Add
          </button>
        </form>
      <div classname="app">
        style={{
          background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
          minHeight: "100vh",
        }}
      </div>
      
        {todos.length > 0 && (
          <>
            <ul className="todo-list">
              {visibleTodos.map((todo) => (
                <li key={todo.id} className={`todo-item ${todo.done ? "done" : ""}`}>
                  <label className="todo-label">
                    <input
                      type="checkbox"
                      checked={todo.done}
                      onChange={() => toggleTodo(todo.id)}
                    />
                    <span className="todo-text">{todo.text}</span>
                  </label>
                  <button
                    className="delete-btn"
                    onClick={() => deleteTodo(todo.id)}
                    aria-label="Delete todo"
                  >
                    ×
                  </button>
                </li>
              ))}
              {visibleTodos.length === 0 && (
                <li className="empty-state">Nothing here.</li>
              )}
            </ul>

            <div className="footer">
              <span className="count">
                {remaining} {remaining === 1 ? "item" : "items"} left
              </span>

              <div className="filters">
                {["all", "active", "completed"].map((f) => (
                  <button
                    key={f}
                    className={`filter-btn ${filter === f ? "active" : ""}`}
                    onClick={() => setFilter(f)}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>

              <button className="clear-btn" onClick={clearCompleted}>
                Clear completed
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}