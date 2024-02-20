import React, { useState } from "react";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";

export default function AsignarTarea() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [usuario, setUsuario] = useState("");

  const enviar = async (event) => {
    event.preventDefault();

    const data = {
      titulo: titulo,
      descripcion: descripcion,
      fechaL: fecha,
      usuario: usuario,
    };
    try {
      const response = await fetch("http://localhost:3000/tareas/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const responseData = await response.json();
      alert(responseData.message);
      setTitulo("");
      setDescripcion("");
      setFecha("");
      setUsuario("");
      console.log(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="formulario" onSubmit={enviar}>
      <MDBInput
        id="Titulo"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        wrapperClass="mb-4"
        label="Titulo"
      />
      <MDBInput
        id="Descripricion"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        wrapperClass="mb-4"
        label="Descripricion"
      />
      <MDBInput
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        wrapperClass="mb-4"
        id="Fecha"
        label="Fecha limite"
      />
      <MDBInput
        wrapperClass="mb-4"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
        id="usuario"
        label="Empleado acargo de la actividad"
      />

      <MDBBtn type="submit" className="mb-4" block>
        Enviar
      </MDBBtn>
    </form>
  );
}
