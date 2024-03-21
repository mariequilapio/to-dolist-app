import React, { useState, useEffect } from 'react';
import { IoFilter } from 'react-icons/io5';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import TodoItem from './TodoItem';
import Banner from './Banner'; // Import the Banner component

export default function TodoList({todos,editItemId,editedTitle,toggleTodo,deleteTodo,handleEdit,handleSaveEdit,handleCancelEdit,deleteAllTodos,completeAllTodos,selectedDate,setSelectedDate,
}) {
  const [filter, setFilter] = useState('all');
  const [allCompleted, setAllCompleted] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const totalCount = todos !== null ? todos.length : 0;
  const uncheckedCount = todos !== null ? todos.filter((todo) => !todo.completed).length : 0;
  const completedCount = todos !== null ? todos.filter((todo) => todo.completed).length : 0;

  useEffect(() => {
    if (todos) {
      const allTodosCompleted = todos.every((todo) => todo.completed);
      setAllCompleted(allTodosCompleted);
    }
  }, [todos]);

  const handleCompleteAll = () => {
    if (allCompleted) {
      completeAllTodos(false);
    } else {
      completeAllTodos(true);
    }
  };

  const applyFilter = (todo) => {
    const currentDate = new Date();
    const todoDate = todo.deadline ? new Date(todo.deadline) : null;
    const currentDateWithoutTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

    if (filter === 'today') {
      return todoDate && todoDate.getTime() === currentDateWithoutTime.getTime();
    } else if (filter === 'completed') {
      return todo.completed;
    } else if (filter === 'uncompleted') {
      return !todo.completed;
    } else {
      return true;
    }
  };

  const filteredTodos = todos !== null ? todos.filter(applyFilter) : [];

  const handleOpenDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="todo-list-container">
      <div className="filter-container">
        <Dropdown className="small-dropdown">
          <Dropdown.Toggle variant="secondary" id="dropdown-filter">
            <IoFilter /> {filter.charAt(0).toUpperCase() + filter.slice(1)} ({totalCount})
             </Dropdown.Toggle>
                 <Dropdown.Menu>
                        <Dropdown.Item className="dropdown-item" onClick={() => handleFilterChange('all')}>
                        All ({totalCount})
                        </Dropdown.Item>
                        <Dropdown.Item className="dropdown-item" onClick={() => handleFilterChange('today')}>
                        Tasks for the Day ({filteredTodos.length})
                        </Dropdown.Item>
                        <Dropdown.Item className="dropdown-item" onClick={() => handleFilterChange('completed')}>
                        Completed ({completedCount})
                        </Dropdown.Item>
                        <Dropdown.Item className="dropdown-item" onClick={() => handleFilterChange('uncompleted')}>
                        Uncompleted ({uncheckedCount})
                        </Dropdown.Item>
                              </Dropdown.Menu>
                                    </Dropdown>
      </div>
         {filteredTodos.length === 0 && (
             <Banner filter={filter} />  )}
      {filteredTodos.length > 0 && (
        <table className="todo-table">
          <tbody>
            {filteredTodos.map(todo => (
              <TodoItem 
                key={todo.id}
                todo={todo}
                editItemId={editItemId}
                editedTitle={editedTitle}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
                handleEdit={handleEdit}
                handleSaveEdit={handleSaveEdit}
                handleCancelEdit={handleCancelEdit}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            ))}
          </tbody>
        </table>
      )}
      {filteredTodos.length > 0 && (
        <div className="action-buttons">
          <button onClick={handleCompleteAll} className="btn btn-primary" style={{ marginRight: '15px' }}>
            {allCompleted ? 'Unmark All as Done' : 'Mark All as Done'}
          </button>
          <button onClick={handleOpenDeleteModal} className="btn btn-primary">
            Delete All
          </button>
        </div>
      )}




      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton style={{ backgroundColor: '#FFFFFF', color: '#5E1B89' }}>
          <Modal.Title style={{ color: '#5E1B89' }}>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#9D71BC', color: 'white' }}>Are you sure you want to delete all todos?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal} style={{ backgroundColor: '#F4512C', borderRadius: '20px', border: 'none', padding: '10px 20px', margin: '0 5px', cursor: 'pointer', color: 'white' }}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => { deleteAllTodos(); handleCloseDeleteModal(); }} style={{ backgroundColor: '#5E1B89', borderRadius: '20px', border: 'none', padding: '10px 20px', margin: '0 5px', cursor: 'pointer', color: 'white' }}>
            Delete All
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
