import React, { useState, useEffect } from 'react';
import './ChatRoom.css';
import io from 'socket.io-client';

const ChatRoom = ({ serverUrl, room, user }) => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Establecer la conexión con el servidor
    const newSocket = io("https://api-ws.piweb.lat/", {
      auth: { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiYzA2OGEzZGQtNmY3Mi00OWQyLTgzNDktM2RiNzU2ODZlZjczIiwiaWF0IjoxNzIxNTIxOTIxLCJleHAiOjE3MjE1MjU1MjF9.cCliGxhF1W-riXGWjt-aSkfCYibrjJLvrLQrqG3FBv4" },
      query: { id_user: "c068a3dd-6f72-49d2-8349-3db75686ef73" },
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Conectado al servidor de WebSocket');
    });

    // Escuchar eventos de datos
    newSocket.on('datas', (msg) => {
        console.log(msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
    newSocket.on('notification-alerts', (msg) => {
      console.log(msg);
    setMessages((prevMessages) => [...prevMessages, msg]);
  });
    // Limpiar la conexión cuando el componente se desmonte
    return () => {
      newSocket.disconnect();
    };
  }, [serverUrl]);

  return (
    <div className="chat-room">
      <h2>Chat Room: {room}</h2>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.user}: </strong>{msg.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatRoom;
