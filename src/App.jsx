import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ItemDetailPage from './ItemDetailPage';
import InputCreate from './inputCreate'
const App = () => {
  const [data, setData] = useState(null);
  const urlApi = 'http://localhost:3000';

  const fetchData = async () => {
    try {
      const response = await fetch(urlApi);
      const resData = await response.json();
      setData(resData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Inicio</Link>
          <Link to="/create">Crear tarea</Link>
        </nav>
        {data === null ? (
          <div>Cargando...</div>
        ) : (
          <Routes>
            <Route path="/" element={<Home data={data} />} />
            <Route path="/create" element={<InputCreate />} />
            {data.map(item => (
              <Route key={item._id} path={`/${item._id}`} element={<ItemDetailPage item={item}/>} />
            ))}
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;
