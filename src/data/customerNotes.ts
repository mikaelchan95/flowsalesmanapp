interface CustomerNote {
  id: number;
  customerId: number;
  date: string;
  content: string;
  author: string;
}

let notes: CustomerNote[] = [];
let nextNoteId = 1;

export const getCustomerNotes = (customerId: number): CustomerNote[] => {
  return notes.filter(note => note.customerId === customerId);
};

export const addCustomerNote = (customerId: number, content: string, author: string): CustomerNote => {
  const newNote: CustomerNote = {
    id: nextNoteId++,
    customerId,
    date: new Date().toISOString(),
    content,
    author
  };
  notes.push(newNote);
  return newNote;
};