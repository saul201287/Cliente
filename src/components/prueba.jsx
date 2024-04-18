import { useEffect, useState } from "react";
import io from "socket.io-client";

export default function prueba() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [message, setMessage] = useState("");

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() =>{
    try {
    const socket = io("http://localhost:3005");
     socket.on("temperatura", (data) =>{
       console.log(data);
     });
     socket.on("notification-alert", (data) =>{
      console.log(data);
    });
    socket.on("alerta", (data) =>{
      console.log(data);
    });
    } catch (error) {
     console.log(error);
    }
    
   },[])
  const sendMessage = () => {
    const socket = io("http://localhost:3005", {
      auth: {
        token: message,
      },
    });
    console.log(socket.connected);
    socket.emit("notification-alert", {
      message: message
    });
   
  };
  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>conectar</button>
    </div>
  );
}
