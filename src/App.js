import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [ repositories, setRepository ] = useState([]);

  useEffect(() => {
    api.get('repositories').then(res => {
      setRepository(res.data);
    })
  }, []);

  async function handleAddRepository() {
    
    const res = await api.post('repositories', {});

    const repository = res.data;

    setRepository([...repositories, repository]);

  }

  async function handleRemoveRepository(id) {
    
  //  api.delete('repositories', id)

    setRepository(repositories.filter(repository => id !== id));

  }

  return (
    <div>
      <ul data-testid="repository-list">


      {repositories.map(repository => {
          return <li key={repository.id}>
            {repository.title}

              <button onClick={() => handleRemoveRepository(1)}>
                Remover
              </button>
          </li>
        })}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
