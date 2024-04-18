import { useEffect, useState } from "react";
import AsignarTarea from "./AsignarTarea";
import { useParams, useNavigate } from "react-router";
import Tareas from "./Tareas";
import Chat from "./Chat";
import "../styles/Home.css";

function Home() {
  const { name } = useParams();
  const navegar = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [res, setRes] = useState(0);
  const [bandera, setBandera] = useState(false);
  

  const agregarUsuario = (nuevoUsuario) => {
    setUsuarios(nuevoUsuario);
  };
  const obtenerUsuarios = async () => {
    try {
      const res = await fetch("http://localhost:3000/usuarios/all");
      if (!res.ok) {
        throw new Error(`Error: ${res.status} - ${res.statusText}`);
      }
      const data = await res.json();
      setUsuarios(data.usuarios);
    } catch (error) {
      console.error(error);
    }
  };

  const obtenerUsuarioInterval = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/usuarios/notificacionNew/"
      );
      if (!res.ok) {
        throw new Error(`Error: ${res.status} - ${res.statusText}`);
      }
      const data = await res.json();
      agregarUsuario(data.usuarios);
      setRes(res + 1);
    } catch (error) {
      console.error(error);
    } finally {
      obtenerUsuarioInterval;
    }
  };

  const exit = async () => {
    try {
      const res = await fetch(`http://localhost:3000/usuarios/${name}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status} - ${res.statusText}`);
      }
      const data = await res.json();
      console.log(data);
      setUsuarios(data.usuarios);
      navegar("/");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    obtenerUsuarioInterval();
  }, [res]);
  useEffect(() => {
    obtenerUsuarios();
  }, []);
  return (
    <div className="home">
      <ul className="nav">
        <li onClick={exit}>Salir</li>
        {name == "Profe" ? (
          <li onClick={() => setBandera(false)}>Asignar Tareas</li>
        ) : (
          <li onClick={() => setBandera(false)}>Tareas</li>
        )}
        <li onClick={() => setBandera(true)}>Chat</li>
      </ul>
      <section className="act">
        <ul className="tabla">
          <th>Usuarios conectados</th>
          {usuarios.map((usuario, index) => (
            <li key={index}>{usuario}</li>
          ))}
        </ul>

        {!bandera && name != "Profe" ? (
          <Tareas usuario={name} />
        ) : !bandera && name == "Profe" ? (
          <AsignarTarea />
        ) : (
          <Chat usuario={name} />
        )}
      </section>
    </div>
  );
}

export default Home;
