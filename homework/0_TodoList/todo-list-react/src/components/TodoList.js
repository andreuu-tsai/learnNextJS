import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Entry from "./Entry";

function TodoList() {
  const [todos, setTodos] = useState({
    todoMap: new Map(),
    todoOrder: [],
  });
  const [inputText, setInputText] = useState("");

  function addTodo(name) {
    if (name.trim() === "") return;
    const id = uuidv4();
    const newTodo = {
      id: id,
      name: name,
      isDone: false,
    };
    setTodos((prevTodos) => {
      const newMap = new Map(prevTodos.todoMap).set(id, newTodo);
      const newOrder = [id, ...prevTodos.todoOrder];
      return { todoMap: newMap, todoOrder: newOrder };
    });
    setInputText("");
  }

  function deleteHandler(id) {
    setTodos((prevTodos) => {
      const newMap = new Map(prevTodos.todoMap);
      newMap.delete(id);
      const newOrder = prevTodos.todoOrder.filter((i) => i !== id);
      return { todoMap: newMap, todoOrder: newOrder };
    });
  }

  function doneHandler(id) {
    setTodos((prevTodos) => {
      const newMap = new Map(prevTodos.todoMap);
      const todo = newMap.get(id);
      newMap.set(id, { ...todo, isDone: !todo.isDone });
      return { ...prevTodos, todoMap: newMap };
    });
  }

  function updateNameHandler(id, newName) {
    if (newName.trim() === "") return;
    setTodos((prevTodos) => {
      const newMap = new Map(prevTodos.todoMap);
      const todo = newMap.get(id);
      newMap.set(id, { ...todo, name: newName });
      return { ...prevTodos, todoMap: newMap };
    });
  }

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
        }}
        placeholder="Something to do"
      />
      <button onClick={() => addTodo(inputText)}>Add</button>
      {todos.todoOrder.map((id) => (
        <Entry
          key={id}
          todo={todos.todoMap.get(id)}
          deleteHandler={deleteHandler}
          doneHandler={doneHandler}
          updateNameHandler={updateNameHandler}
        />
      ))}
    </div>
  );
}

export default TodoList;
