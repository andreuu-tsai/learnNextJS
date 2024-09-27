import React from "react";
import { v4 as uuidv4 } from 'uuid'

function TodoList() {
    const [todoMap, setTodoMap] = React.useState(new Map());
    const [todoOrder, setTodoOrder] = React.useState([]);
    const [inputText, setInputText] = React.useState("");

    function addTodo(name) {
        if (name.trim() === "") return  
        const id = uuidv4();
        let newTodo = {
            id: id,
            name: name,
            isDone: false
        };
        setTodoMap(prevMap => new Map(prevMap).set(id, newTodo));
        setTodoOrder(l => [id, ...l]);
        setInputText("")
    }

    function deleteHandler(id){
        setTodoMap(prevMap => {
            const newMap = new Map(prevMap);
            newMap.delete(id);
            return newMap;
        })
        setTodoOrder(prevOrder => prevOrder.filter( i => i !== id))
    }

    function doneHandler(id) {
        setTodoMap(prevMap => {
            const newMap = new Map(prevMap);
            const todo = newMap.get(id);
            newMap.set(id, {...todo, isDone: !todo.isDone})
            return newMap;
        })
    }

    function updateNameHandler(id, newName) {
        if (newName.trim() === "") return;
        setTodoMap(prevMap => {
            const newMap = new Map(prevMap);
            const todo = newMap.get(id);
            newMap.set(id, {...todo, name: newName})
            return newMap;
        })
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
            {todoOrder.map(id => (
                <Entry 
                    key={id} 
                    todo={todoMap.get(id)} 
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