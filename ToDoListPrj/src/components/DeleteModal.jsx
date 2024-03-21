import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function DeleteModal({ show, handleClose, handleDeleteConfirmation }) {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton style={{ backgroundColor: '#FFFFFF', color: '#5E1B89' }}>
                <Modal.Title style={{ color: '#5E1B89' }}>Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: '#9D71BC', color: 'white' }}>
                Are you sure you want to delete?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} style={{ backgroundColor: '#F4512C', borderRadius: '20px', border: 'none', padding: '10px 20px', margin: '0 5px', cursor: 'pointer', color: 'white' }}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleDeleteConfirmation} style={{ backgroundColor: '#5E1B89', borderRadius: '20px', border: 'none', padding: '10px 20px', margin: '0 5px', cursor: 'pointer', color: 'white' }}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
