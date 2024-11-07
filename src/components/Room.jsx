import React, { useState, useEffect } from "react";
import { IoMdSend } from "react-icons/io";
import io from "socket.io-client";
import "../styles/Room.css";

const apiUrl = import.meta.env.VITE_API_URL;
const id_user = "c068a3dd-6f72-49d2-8349-3db75686ef73";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiYzA2OGEzZGQtNmY3Mi00OWQyLTgzNDktM2RiNzU2ODZlZjczIiwiaWF0IjoxNzIxNTIxOTIxLCJleHAiOjE3MjE1MjU1MjF9.cCliGxhF1W-riXGWjt-aSkfCYibrjJLvrLQrqG3FBv4";

const Room = ({ room, usuario }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3005", {
      auth: { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiYzA2OGEzZGQtNmY3Mi00OWQyLTgzNDktM2RiNzU2ODZlZjczIiwiaWF0IjoxNzIxNTIxOTIxLCJleHAiOjE3MjE1MjU1MjF9.cCliGxhF1W-riXGWjt-aSkfCYibrjJLvrLQrqG3FBv4" },
      query: { id_user:"c068a3dd-6f72-49d2-8349-3db75686ef73" },
    });

    newSocket.on("connect", () => {
      console.log("Conectado al servidor de socket.io");
    });

    newSocket.on("datas", (estado) => {
      setMessages((prevMessages) => eliminarDuplicados([...prevMessages, estado], 'message'));
    });

    newSocket.on("error", (error) => {
      console.error("Error en la conexión de Socket.IO:", error);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [room]);

  const eliminarDuplicados = (arr, clave) => {
    const set = new Set();
    return arr.filter(obj => {
      const valor = clave ? obj[clave] : obj;
      if (set.has(valor)) {
        return false; 
      }
      set.add(valor);
      return true; 
    });
  };

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
    if (socket) {
      socket.emit("message", {
        room: room,
        message: message,
        hora: obtenerHoraActual(),
        usuario: usuario,
      });
      setMessage("");
    }
  };

  return (
    <div className="tab">
      <h2>Chat: {room}</h2>
      <ul className="messages">
        {messages.map((msg, index) =>
          msg.room === room ? (
            <li key={index} className={msg.usuario === usuario ? "mensaje" : "mensaje2"}>
              {msg.usuario === usuario ? "me" : msg.usuario}:&nbsp;
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
