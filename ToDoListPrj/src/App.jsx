import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import HeaderImage from './components/Header'; 
import './App.css';

export default function App() {
    const [newItem, setNewItem] = useState("");
    const [todos, setTodos] = useState(null); 
    const [editItemId, setEditItemId] = useState(null);
    const [editedTitle, setEditedTitle] = useState(""); 
    
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos'));
        if (storedTodos !== null) {
            setTodos(storedTodos);
        }
    }, []);

    useEffect(() => {
        if (todos !== null) {
            localStorage.setItem('todos', JSON.stringify(todos));
        }
    }, [todos]);

    function handleSubmit(e) {
        e.preventDefault();
        const currentDate = new Date().toLocaleString(); 
        setTodos(currentTodos => {
            return [
                ...currentTodos,
                {
                    id: crypto.randomUUID(),
                    title: newItem,
                    completed: false,
                    datecreated: currentDate
                },
            ];
        });
        setNewItem("");
    }

    function toggleTodo(id, completed) {
        setTodos(currentTodos => {
            return currentTodos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, completed };
                }
                return todo;
            });
        });
    }

    function deleteTodo(id) {
        setTodos(currentTodos => {
            return currentTodos.filter(todo => todo.id !== id);
        });
    }

    function handleEdit(id, title) {
        setEditItemId(id);
        setEditedTitle(title);
    }

    function handleSaveEdit(id) {
        setTodos(currentTodos => {
            return currentTodos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, title: editedTitle };
                }
                return todo;
            });
        });
        setEditItemId(null);
    }

    function handleCancelEdit() {
        setEditItemId(null); // Reset editItemId to exit edit mode
    }

    function deleteAllTodos() {
        setTodos([]);
    }

    function completeAllTodos() {
        const allCompleted = todos.every(todo => todo.completed);
        if (allCompleted) {
            setTodos(currentTodos => {
                return currentTodos.map(todo => {
                    return { ...todo, completed: false };
                });
            });
        } else {
            setTodos(currentTodos => {
                return currentTodos.map(todo => {
                    return { ...todo, completed: true };
                });
            });
        }
    }

    const uncheckedCount = todos !== null ? todos.filter(todo => !todo.completed).length : 0;
    const completedCount = todos !== null ? todos.filter(todo => todo.completed).length : 0;
    const totalCount = todos !== null ? todos.length : 0;

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="todo-container">
                <HeaderImage /> {}
                <div className="todo-header">
                    <h1>TO-DO LIST</h1>
                    <TodoForm
                        newItem={newItem}
                        setNewItem={setNewItem}
                        handleSubmit={handleSubmit}
                        className="todo-form"
                    />
                    <div className="completed-count">
                       Completed Task {completedCount}/{totalCount} 
                    </div>
                </div>
                <TodoList
                    todos={todos}
                    editItemId={editItemId}
                    editedTitle={editedTitle}
                    toggleTodo={toggleTodo}
                    deleteTodo={deleteTodo}
                    handleEdit={handleEdit}
                    handleSaveEdit={handleSaveEdit}
                    deleteAllTodos={deleteAllTodos}
                    completeAllTodos={completeAllTodos}
                    handleCancelEdit={handleCancelEdit}
                />
            </div>
        </div>
    );
}
