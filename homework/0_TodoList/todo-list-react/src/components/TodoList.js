import React from "react";
import { v4 as uuidv4 } from 'uuid'

function TodoList() {
    const [todoList, setTodoList] = React.useState([]);
    const [inputText, setInputText] = React.useState("");

    function addTodo(name) {
        if (name.trim() === "") return  
        let todo = {
            id: uuidv4(),
            name: name,
            isDone: false
        };
        setTodoList(l => [todo, ...l])
        setInputText("")
    }

    function deleteHandler(id){
        setTodoList(l => l.filter(e => e.id !== id))
    }

    function doneHandler(id) {
        setTodoList(l => l.map(
            todo => todo.id === id ? {...todo, isDone: !todo.isDone} : todo
        ))
    }

    function updateNameHandler(id, newName) {
        if (newName.trim() === "") return;
        setTodoList(l => l.map(
            todo => todo.id === id ? {...todo, name: newName} : todo
        ))
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
            {todoList.map((todo) => (
                <Entry 
                    key={todo.id} 
                    todo={todo} 
                    deleteHandler={deleteHandler}
                    doneHandler={doneHandler}
                    updateNameHandler={updateNameHandler}
                />
            ))}
        </div>
    )


}

function Entry({todo, deleteHandler, doneHandler, updateNameHandler}){
    return (
        <div>
            <input 
                type="text" 
                value={todo.name}
                onChange={e => updateNameHandler(todo.id, e.target.value)}
                style={{ 
                    textDecoration: todo.isDone ? "line-through" : "none",
                    color: todo.isDone ? "#888" : "black"
                 }}  
            />
            <button onClick={() => doneHandler(todo.id)}>{todo.isDone ? "Undo":"Done"}</button>
            <button onClick={() => deleteHandler(todo.id)}>Delete</button>
        </div>
    )
}

export default TodoList