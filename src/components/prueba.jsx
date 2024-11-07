import React, { useState } from "react";
import axios from "axios";

const Prueba = () => {
    const [image, setImage] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!image) {
            console.error("No image selected");
            return;
        }

        const encodedImage = image.split(",")[1]; 

        const payload = {
            nombre: "prueba5",
            foto: encodedImage,
            apellido_paterno: "prueba5",
            apellido_materno: "prueba5",
            fecha_nacimiento: "2000-08-23",
            email: "email@ddad.com",
            num_celular: "9612475159",
            num_seguro_social: "6942554321",
            curp: "poi123722h",
            estatus_expediente: false,
            estatus: false,
            ultimo_grado_estudios_id: 1,
            genero_id: 1,
            extencion: "png",
            direccion: {
              pais: "Mexico",
              estado: "Chiapas",
              ciudad: "Tuxtla",
              codigo_postal: "29080",
              direccion: "a lado del oxxo",
            }
        };

        try {
            const response = await axios.post("http://52.70.44.60/empleados/", payload);
            if (response.status === 200) {
                console.log("Imagen subida con éxito:", response.data);
            } else {
                console.error("Error al subir la imagen:", response.status, response.data);
            }
        } catch (error) {
            console.error("Error al subir la imagen:", error);
        }
    };
    const handleSubmit2 = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.get("http://142.93.61.149:8080/codigo_postal/?codigo_postal=29019",{
                headers: { 
                    'Content-Type': 'application/json',      
                }
            });
            if (response.status === 200) {
                console.log(response.data);
            } else {
                console.error("Error:", response.status, response.data);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    return (
        <div>
            <h2>Upload Image</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                <button type="submit">Upload</button>
            </form>
            <button onClick={handleSubmit2}>
                postal
            </button>
        </div>
    );
};

export default Prueba;
