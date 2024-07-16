import './Home.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function Home() {
  const [futbolis, setFutbol] = useState([]);
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [selectedId, setSelectedId] = useState(null); // State for selected player ID

  useEffect(() => {
    loadFutbol();
  }, []);

  const loadFutbol = async () => {
    const result = await axios.get("http://localhost:8090/url/futbolista");
    setFutbol(result.data);
  };

  const deleteFutbol = async () => {
    await axios.delete(`http://localhost:8090/url/eliminaFutbolista/${selectedId}`);
    setShowModal(false);
    loadFutbol();
  };

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
    setSelectedId(null);
  };

  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">ㅤIDㅤ</th>
              <th scope="col">Nombres</th>
              <th scope="col">Apellidos</th>
              <th scope="col">Fecha Nacimiento</th>
              <th scope="col">Características</th>
              <th scope="col">Posición</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {futbolis.map((futbol, index) => (
              <tr key={futbol.idFutbolista}>
                <th scope="row">{index + 1}</th>
                <td>{futbol.nombres}</td>
                <td>{futbol.apellidos}</td>
                <td>{futbol.fechaNacimiento}</td>
                <td>{futbol.caracteristicas}</td>
                <td>{futbol.posicion.descripcion}</td>
                <td>
                  <Link
                    className="btn btn-success"
                    to={`/viewfutbolista/${futbol.idFutbolista}`}
                  >Ver</Link>
                  <Link 
                    className="btn btn-primary mx-1"
                    to={`/editfutbolista/${futbol.idFutbolista}`}
                  >Actualizar</Link>
                  <button 
                    className="btn btn-danger mx2"
                    onClick={() => handleDeleteClick(futbol.idFutbolista)}
                  >Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      <div
        className={`modal fade ${showModal ? 'show' : ''}`}
        tabIndex="-1"
        style={{ display: showModal ? 'block' : 'none' }}
        aria-labelledby="deleteModalLabel"
        aria-hidden={!showModal}
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title" id="deleteModalLabel">Confirmar Eliminación</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleCancel}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p><strong>¿Está seguro que desea eliminar este futbolista?</strong></p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                Cancelar
              </button>
              <button type="button" className="btn btn-danger" onClick={deleteFutbol}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
