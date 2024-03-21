import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FaRegCheckCircle } from 'react-icons/fa';
import { BiSolidEdit, BiSolidTrashAlt } from 'react-icons/bi';
import { FiSave } from 'react-icons/fi';
import { MdCancel } from 'react-icons/md';
import DeleteModal from './DeleteModal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


export default function TodoItem({ todo, editItemId, editedTitle, toggleTodo, deleteTodo, handleEdit, handleSaveEdit, handleCancelEdit }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(todo.deadline ? new Date(todo.deadline) : null);
    const isTitleEmpty = editedTitle.trim() === '';

    const handleOpenDeleteModal = () => {
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const handleDeleteConfirmation = () => {
        deleteTodo(todo.id);
        handleCloseDeleteModal();
    };

    const handleDateChange = date => {
        setSelectedDate(date);
        todo.deadline = date ? date.toLocaleDateString() : null;
    };

    return (
        <>
            <Card className="mb-3" style={{ height: 'auto' }}>
                <Card.Body className="d-flex justify-content-between align-items-center">
                    <div>
                        <div>
                            {editItemId === todo.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editedTitle}
                                        onChange={e => handleEdit(todo.id, e.target.value)}
                                        className="edit-input form-control"
                                    />
                                    <DatePicker
                                        selected={selectedDate}
                                        onChange={handleDateChange}
                                        className="edit-input form-control"
                                        placeholderText="Select deadline"
                                    />
                                    <Button
                                        onClick={() => !isTitleEmpty && handleSaveEdit(todo.id)}
                                        disabled={isTitleEmpty}
                                        variant="primary"
                                        className="ml-2 edit-button"
                                    >
                                        <FiSave className="edit-button-icon" />
                                    </Button>
                                    <Button onClick={handleCancelEdit} variant="secondary" className="edit-button">
                                        <MdCancel className="edit-button-icon" />
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <FaRegCheckCircle
                                        style={{ cursor: 'pointer', color: todo.completed ? '#FF7F4D' : 'gray' }}
                                        onClick={() => toggleTodo(todo.id, !todo.completed)} 
                                    />
                                    {} <span className="todo-title" style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                                        {todo.title}
                                    </span>
                                </>
                            )}
                        </div>
                        <div className="mt-2" style={{ fontSize: '14px', fontStyle: 'italic', color: '#808080' }}>
                            Date Created: {todo.datecreated}
                        </div>
                        {selectedDate && (
                            <div className="mt-2" style={{ fontSize: '14px', fontStyle: 'italic', color: '#808080' }}>
                                Due: {selectedDate.toLocaleDateString()}
                            </div>
                        )}
                    </div>
                    <div className="mt-2">
                        <Button onClick={() => handleEdit(todo.id, todo.title)} variant="info" className="mr-2 edit-button">
                            <BiSolidEdit className="edit-icon" />
                        </Button>
                        <Button onClick={handleOpenDeleteModal} variant="danger" className="delete-button">
                            <BiSolidTrashAlt className="trash-icon" />
                        </Button>
                    </div>
                </Card.Body>
            </Card>

           
            <DeleteModal
                show={showDeleteModal}
                handleClose={handleCloseDeleteModal}
                handleDeleteConfirmation={handleDeleteConfirmation}
            />
        </>
    );
}
