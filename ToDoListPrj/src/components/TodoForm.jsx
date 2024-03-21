import React from 'react';
import { FormControl, Button } from 'react-bootstrap';
import { IoIosAddCircle } from 'react-icons/io';


export default function TodoForm({ newItem, setNewItem, handleSubmit }) {
  
  return (
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="input-group mb-3">
        <FormControl
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          type="text"
          placeholder="Type a New Task..."
          required
          className="todo-input"
        />
        <Button type="submit" variant="secondary" className="add-button">
          <IoIosAddCircle className="add-icon" />
        </Button>
      </div>
    </form>
  );
}
