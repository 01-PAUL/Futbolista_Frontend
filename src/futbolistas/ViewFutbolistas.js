import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewFutbolistas() {
  const [futbolis, setFutbol] = useState({});
  const { id } = useParams();

  useEffect(() => {
    console.log(`ID capturado de la URL: ${id}`);
    loadFutbol(id);
  }, [id]);

  const loadFutbol = async (id) => {
    const result = await axios.get(`http://localhost:8090/url/futbolista/${id}`);
    console.log('Datos del futbolista:', result.data);
    if (result.data.length > 0) {
      setFutbol(result.data[0]); 
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Detalle del Futbolista</h2>

          {futbolis && futbolis.idFutbolista ? (
            <div className="card">
              <div className="card-header">
                Detalles del ID del Futbolista: {futbolis.idFutbolista}
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <b>Nombres:</b> {futbolis.nombres}
                  </li>
                  <li className="list-group-item">
                    <b>Apellidos:</b> {futbolis.apellidos}
                  </li>
                  <li className="list-group-item">
                    <b>Fecha Nacimiento:</b> {futbolis.fechaNacimiento}
                  </li>
                  <li className="list-group-item">
                    <b>Características:</b> {futbolis.caracteristicas}
                  </li>
                  <li className="list-group-item">
                    <b>Posición:</b> {futbolis.posicion?.descripcion}
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <p>Cargando datos...</p>
          )}
          <br></br>
          <Link className="btn btn-success" to={"/"}>
            Regresar al Inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
