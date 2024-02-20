import React, { useState } from 'react';
import { FaThumbsUp, FaUserGraduate, FaHardHat, FaBuilding } from 'react-icons/fa';
import Room from './Room';

function Chat({usuario}) {
  const [salas, setSalas] = useState([
    { nombre: 'Trabajadores', icono: <FaThumbsUp /> },
    { nombre: 'Becarios', icono: <FaUserGraduate /> },
    { nombre: 'Mantenimiento', icono: <FaHardHat /> },
    { nombre: 'Empresa', icono: <FaBuilding /> },
  ]);
  const [salaSeleccionada, setSalaSeleccionada] = useState('Trabajadores');

  const cambiarSala = (nuevaSala) => {
    setSalaSeleccionada(nuevaSala);
  };

  return (
    <div className='chat'>
      <ul className='grupos'>
        {salas.map((sala) => (
          <li key={sala.nombre} onClick={() => cambiarSala(sala.nombre)}>
            {sala.icono} {sala.nombre}
          </li>
        ))}
      </ul>
      <Room room={salaSeleccionada} usuario={usuario} />
    </div>
  );
}

export default Chat;
