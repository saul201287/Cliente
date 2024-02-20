import React, { useState, useEffect } from "react";
import { IoMdSend } from "react-icons/io";
import io from "socket.io-client";
import "../styles/Room.css";
const apiUrl = import.meta.env.VITE_API_URL;

const Room = ({ room, usuario }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socket = io("http://localhost:3000");

  useEffect(() => {
    try {
      socket.emit("joinRoom", { room, usuario });

      socket.on("message", estado);

     
    } catch (error) {
      console.error("Error en la conexión de Socket.IO:", error);
    }
  }, [room]);

  function eliminarDuplicados(arr, clave) {
    const set = new Set();
    return arr.filter(obj => {
        const valor = clave ? obj[clave] : obj;
        if (set.has(valor)) {
            return false; 
        }
        set.add(valor);
        return true; 
    });
}
  const estado = (mensaje) => {
    setMessages((state) => {
        const newState = eliminarDuplicados([...state, mensaje], 'message');
        return newState;
    });
};

  console.log(messages);
  const obtenerHoraActual = () => {
    const ahora = new Date();
    const horas = ahora.getHours();
    const minutos = ahora.getMinutes();
    const horaFormateada = String(horas).padStart(2, "0");
    const minutosFormateados = String(minutos).padStart(2, "0");
    const horaActual = `${horaFormateada}:${minutosFormateados}`;
    return horaActual;
  };
  const sendMessage = () => {
    socket.emit("message", {
      room: room,
      message: message,
      hora: obtenerHoraActual(),
      usuario: usuario,
    });
    setMessage("");
  };

  return (
    <div className="tab">
      <h2>Chat: {room}</h2>
      <ul className="messages">
        {messages.map((msg, index) =>
          msg.room === room ? (
            <li key={index} className={ msg.usuario === usuario ? "mensaje" : "mensaje2"}>
              {msg.usuario == usuario ? "me" : msg.usuario}:&nbsp;
              {msg.message}
              <p>{msg.hora}</p>
            </li>
          ) : null
        )}
      </ul>
      <div className="fondo">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <IoMdSend
          size={50}
          style={{ cursor: "pointer" }}
          onClick={sendMessage}
        />
      </div>
    </div>
  );
};

export default Room;
