function Entry({ todo, deleteHandler, doneHandler, updateNameHandler }) {
  return (
    <div>
      <input
        type="text"
        value={todo.name}
        onChange={(e) => updateNameHandler(todo.id, e.target.value)}
        style={{
          textDecoration: todo.isDone ? "line-through" : "none",
          color: todo.isDone ? "#888" : "black",
        }}
      />
      <button onClick={() => doneHandler(todo.id)}>
        {todo.isDone ? "Undo" : "Done"}
      </button>
      <button onClick={() => deleteHandler(todo.id)}>Delete</button>
    </div>
  );
}

export default Entry;
