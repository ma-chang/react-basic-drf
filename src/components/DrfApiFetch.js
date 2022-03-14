import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DrfApiFetch = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState([]);
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
        console.log(res.data);
        setSelectedTask(res.data);
      });
  };

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.id} : {task.title}
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
    </div>
  );
};

export default DrfApiFetch;
