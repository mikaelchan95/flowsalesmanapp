import React, { useState, useEffect } from 'react';
import { getCustomerNotes, addCustomerNote } from '../../../data/customerNotes';
import { formatDate } from '../../../utils/helpers';

interface CustomerNotesProps {
  customerId: number;
  className?: string;
}

const CustomerNotes: React.FC<CustomerNotesProps> = ({ customerId, className }) => {
  const [notes, setNotes] = useState<Array<{ id: number; date: string; content: string; author: string }>>([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    setNotes(getCustomerNotes(customerId));
  }, [customerId]);

  const handleAddNote = () => {
    if (newNote.trim()) {
      const currentUser = localStorage.getItem('currentUser') || 'Unknown';
      const addedNote = addCustomerNote(customerId, newNote, currentUser);
      setNotes([addedNote, ...notes]);
      setNewNote('');
    }
  };

  return (
    <div className={`card ${className}`}>
      <div className="card-body">
        <h2 className="text-xl font-semibold mb-4">Customer Notes</h2>
        <div className="mb-4">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="w-full p-2 border rounded"
            rows={3}
            placeholder="Add a new note..."
          />
          <button onClick={handleAddNote} className="btn btn-primary mt-2">Add Note</button>
        </div>
        <div className="space-y-4">
          {notes.map((note) => (
            <div key={note.id} className="border-b pb-2">
              <p className="text-sm text-gray-600">{formatDate(note.date)} - {note.author}</p>
              <p>{note.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerNotes;