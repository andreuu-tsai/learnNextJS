import React from "react";
import { v4 as uuidv4 } from 'uuid'

function TodoList() {
    const [todoList, setTodoList] = React.useState([]);
    const [inputText, setInputText] = React.useState("");
    function addTodo(name) {
        if (name.trim() === "") return  
        let todo = {
            name: name,
            id: uuidv4()
        };
        setTodoList(l => [todo, ...l])
        setInputText("")
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
                    deleteHandler={() => setTodoList(l => l.filter(e => e.id !== todo.id))} 
                />
            ))}
        </div>
    )


}

function Entry({todo, deleteHandler}){
    const [isDone, setIsDone] = React.useState(false);
    return (
        <div>
            <input 
                type="text" 
                value={todo.name}
                style={{ 
                    textDecoration: isDone ? "line-through" : "none",
                    color: isDone ? "#888" : "black"
                 }}  
            />
            <button onClick={() => setIsDone(!isDone)}>{isDone ? "Undo":"Done"}</button>
            <button onClick={deleteHandler}>Delete</button>
        </div>
    )
}

export default TodoList