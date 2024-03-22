import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import HeaderImage from './components/Header';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

export default function App() {
    const [newItem, setNewItem] = useState("");
    const [todos, setTodos] = useState([]);
    const [editItemId, setEditItemId] = useState(null);
    const [editedTitle, setEditedTitle] = useState("");
    const [selectedDate, setSelectedDate] = useState(null); // State for selected date

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos'));
        if (storedTodos !== null) {
            setTodos(storedTodos);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    function handleSubmit(e) {
        e.preventDefault();
        const currentDate = new Date().toLocaleString();
        setTodos(currentTodos => {
            return [
                ...currentTodos,
                {
                    id: Date.now(), // Use timestamp as id
                    title: newItem,
                    completed: false,
                    datecreated: currentDate,
                    deadline: selectedDate ? selectedDate.toLocaleDateString() : null, // Store the selected date as deadline
                },
            ];
        });
        setNewItem("");
        setSelectedDate(null); // Reset selected date after adding todo
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
        setEditItemId(null);
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

    const uncheckedCount = todos.filter(todo => !todo.completed).length;
    const completedCount = todos.filter(todo => todo.completed).length;
    const totalCount = todos.length;

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="todo-container">
                <HeaderImage />
                <div className="todo-header">
                    <h1>To-Do List</h1>
                    <TodoForm
                        newItem={newItem}
                        setNewItem={setNewItem}
                        handleSubmit={handleSubmit}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate} // Pass setSelectedDate to TodoForm
                        className="todo-form"
                    />
                    <div className="completed-count">
                        {completedCount}/{totalCount} have been completed
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
