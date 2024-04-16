import React, { useState } from 'react';

const InputCreate = ({ addTask }) => {
  const [taskTitle, setTaskTitle] = useState('');

  const handleInputChange = (event) => {
    setTaskTitle(event.target.value);
  };

  const handleSubmit = () => {
    if (taskTitle.trim() !== '') {
      // Enviar la tarea al servidor
      fetch('http://localhost:3000/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: taskTitle }),
      })
        .then(response => response.json())
        .then(data => {
          
          addTask(data);
          setTaskTitle(''); 
        })
        .catch(error => console.error('Error al agregar tarea:', error));
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Escribe tu tarea"
        value={taskTitle}
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>Agregar tarea</button>
    </div>
  );
};

export default InputCreate;