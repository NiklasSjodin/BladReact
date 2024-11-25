import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import axios from 'axios';

const AddToBookListModal = ({ userId, bookId, isOpen, onClose }) => {
  const [bookLists, setBookLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);

  useEffect(() => {
    if (isOpen) {
      axios.get(`https://localhost:7076/api/user/${userId}/booklist`)
        .then(response => {
          setBookLists(response.data); // Sätt användarens listor
        })
        .catch(error => {
          console.error('Error fetching book lists:', error);
        });
    }
  }, [isOpen, userId]);

  const handleAddToList = () => {
    if (!selectedList) {
      alert('Välj en lista att lägga till boken i!');
      return;
    }

    // Skicka POST-anrop för att lägga till boken i den valda listan
    axios.post(`https://localhost:7076/api/user/${userId}/booklist`, {
      listId: selectedList,
      bookId: bookId
    })
    .then(response => {
      alert('Boken har lagts till i listan!');
      onClose(); // Stäng modalen
    })
    .catch(error => {
      console.error('Error adding book to list:', error);
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Lägg till bok i lista</h2>
        <select
          className="w-full p-2 border rounded"
          onChange={(e) => setSelectedList(e.target.value)}
          value={selectedList}
        >
          <option value="">Välj en lista</option>
          {bookLists.map((list) => (
            <option key={list.id} value={list.id}>{list.name}</option>
          ))}
        </select>
        <div className="mt-4">
          <Button onClick={handleAddToList}>Lägg till i lista</Button>
          <Button onClick={onClose}>Stäng</Button>
        </div>
      </div>
    </div>
  );
};

export default AddToBookListModal;