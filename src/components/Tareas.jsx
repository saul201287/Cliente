import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardHeader,
  MDBCardFooter,
  MDBBtn,
} from "mdb-react-ui-kit";

function Tareas({ usuario }) {
  const [tareas, setTareas] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const obtenerTareas = () => {
    fetch("http://localhost:3000/tareas")
      .then((res) => res.json())
      .then((data) => {
        setTareas(data.tareas);
        if (!isFetching) {
          // Solo programamos la siguiente solicitud si no está en progreso
          setTimeout(obtenerNewTareas, 3000);
        }
      });
  };

  const obtenerNewTareas = () => {
    setIsFetching(true);

    fetch("http://localhost:3000/tareas")
      .then((res) => res.json())
      .then((data) => {
        setTareas(data.tareas);
      })
      .catch((error) => {
        console.error("Error al obtener nuevas tareas:", error);
      })
      .finally(() => {
        setIsFetching(false);
        // Programamos la siguiente solicitud después de 3 segundos
        setTimeout(obtenerNewTareas, 3000);
      });
  };

  useEffect(() => {
    obtenerTareas();
  }, []);

  const realizado = async (id) => {
    await fetch(`http://localhost:3000/tareas/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((res) => console.log(res.message));
  };

  return (
    <div className="tareas">
      {tareas.length > 0 ? (
        <>
          {tareas.map((tarea, i) => (
            <MDBCard
              style={{ backgroundColor: "#38c01c" }}
              background="primary"
              className="text-white mb-4"
              key={i}
            >
              <MDBCardHeader>{tarea.titulo}</MDBCardHeader>
              <MDBCardBody>
                <MDBCardTitle>
                  {" "}
                  Fecha de entrega: {tarea.fechaLimite}
                </MDBCardTitle>
                <MDBCardText>{tarea.descripcion}</MDBCardText>
              </MDBCardBody>
              <MDBCardFooter>
                Asignado para: {tarea.usuario} <br />
                {tarea.usuario === usuario ? (
                  <MDBBtn onClick={() => realizado(tarea.id)}>Realizado</MDBBtn>
                ) : null}
              </MDBCardFooter>
            </MDBCard>
          ))}
        </>
      ) : (
        <>
          <h1 style={{ marginLeft: "50px" }}>Sin tareas a realizar</h1>
        </>
      )}
    </div>
  );
}

export default Tareas;
