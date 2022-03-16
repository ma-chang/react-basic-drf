import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { logRoles } from '@testing-library/react';

const DrfApiFetch = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState([]);
  const [editedTask, setEditedTask] = useState({ id: '', title: '' });
  const [id, setId] = useState(1);

  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
  const API_TOKEN = process.env.REACT_APP_API_TOKEN;

  useEffect(() => {
    axios
      .get(`${API_ENDPOINT}tasks/`, {
        headers: {
          Authorization: API_TOKEN,
        },
      })
      .then((res) => {
        setTasks(res.data);
      });
  }, []);

  const getTask = () => {
    axios
      .get(`${API_ENDPOINT}tasks/${id}`, {
        headers: {
          Authorization: API_TOKEN,
        },
      })
      .then((res) => {
        setSelectedTask(res.data);
      });
  };

  const deleteTask = () => {
    axios
      .delete(`${API_ENDPOINT}tasks/${id}`, {
        headers: {
          Authorization: API_TOKEN,
        },
      })
      .then((res) => {
        setTasks(tasks.filter((task) => task.id !== id));
        setSelectedTask([]);
      });
  };
  const newTask = (task) => {
    const data = {
      title: task.title,
    };
    axios
      .post(`${API_ENDPOINT}tasks/`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: API_TOKEN,
        },
      })
      .then((res) => setTasks([...tasks, res.data]));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setEditedTask({ ...editedTask, [name]: value });
  };

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.id} : {task.title}
            <button type='button' onClick={() => deleteTask(task.id)}>
              <i className='fas fa-trash-alt'></i>
            </button>
          </li>
        ))}
      </ul>
      Set Id
      <br />
      <input type='text' value={id} onChange={(e) => setId(e.target.value)} />
      <br />
      <button type='button' onClick={() => getTask()}>
        Get Task
      </button>
      <h3>
        {selectedTask.id}:{selectedTask.title}
      </h3>
      <input
        type='text'
        name='title'
        value={editedTask.title}
        onChange={(e) => handleInputChange(e)}
        placeholder='New task ?'
        required
      />
      <button type='button' onClick={() => newTask(editedTask)}>
        Create
      </button>
    </div>
  );
};

export default DrfApiFetch;
