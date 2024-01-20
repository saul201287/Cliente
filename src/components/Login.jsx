import React, { useState } from "react";
import "../styles/Login.css";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";

function Login() {
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");

  const inicioSesion = () => {
    alert("hola", name, pass);
    console.log(name, pass);
  };

  return (
    <MDBContainer fluid className="p-3 my-5 h-custom login">
      <MDBRow style={{ display: "flex" }}>
        <MDBCol col="10" md="6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            class="img-fluid"
            alt="Sample image"
            width={700}
          />
        </MDBCol>

        <MDBCol col="7" md="6" className="cont">
          <h2>Inicio de sesion</h2>
          <MDBInput
            wrapperClass="mb-4"
            label="Usuario"
            id="formControlLg"
            type="email"
            size="lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Contraseña"
            id="formControlLg"
            type="password"
            size="lg"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />

          <div className="text-center text-md-start mt-4 pt-2">
            <MDBBtn className="mb-0 px-5" size="lg" onClick={inicioSesion}>
              Iniciar sesion
            </MDBBtn>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
