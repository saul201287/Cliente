import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "../styles/Home.css"

function Home() {
  const [usuarios, setUsuarios] = useState([]);
  const {name} = useParams()
  function agregarUsuario(usuario) {
    setUsuarios((prevUsuarios) => {
      const usuarioExistente = prevUsuarios.find((u) => u.name === usuario.name);
      if (!usuarioExistente) {
        return [...prevUsuarios, usuario];
      }
      return prevUsuarios;
    });
  }
  async function obtenerUsuarios() {
    try {
      const res = await fetch("http://localhost:3000/usuarios/notificacion");
      const data = await res.json();
      data.usuario.forEach(agregarUsuario);
    } catch (error) {
      console.error(error);
    }
  }

  const obtenerUsuarioInterval = async () => {
    try {
      const res = await fetch("http://localhost:3000/usuarios/notificacion/");
      const data = await res.json();
      data.usuario.forEach(agregarUsuario);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(obtenerUsuarioInterval, 1000); 
    }
  };

  useEffect(() => {
    obtenerUsuarios();
    obtenerUsuarioInterval();
    return () => clearTimeout(obtenerUsuarioInterval);
  }, []); 

  return (
    <div>
      <ul>
        <ol>Usuarios conectados</ol>
        {usuarios.map((usuario, index) => (
          usuario.name != name ? (<li key={index}>{usuario.name}</li>): (<li key={index}>me</li>)
        ))}
      </ul>
    </div>
  );
}

export default Home;
