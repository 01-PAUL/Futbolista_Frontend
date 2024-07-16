import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Add.css'; 

export default function EditFutbolistas() {
  let navigate = useNavigate();
  const { id } = useParams();

  const [futbolis, setFutbol] = useState({});
  const [positions, setPositions] = useState([]);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  useEffect(() => {
    console.log(`ID capturado de la URL: ${id}`);
    loadFutbol(id);
    loadPositions();
  }, [id]);

  const loadFutbol = async (id) => {
    const result = await axios.get(`http://localhost:8090/url/futbolista/${id}`);
    console.log('Datos del futbolista:', result.data);
    if (result.data.length > 0) {
      setFutbol(result.data[0]);
    }
  };

  const loadPositions = async () => {
    const result = await axios.get(`http://localhost:8090/url/posicion`);
    setPositions(result.data);
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.nombres = futbolis.nombres ? "" : "Este campo es requerido.";
    tempErrors.apellidos = futbolis.apellidos ? "" : "Este campo es requerido.";
    tempErrors.fechaNacimiento = futbolis.fechaNacimiento ? "" : "Este campo es requerido.";
    tempErrors.caracteristicas = futbolis.caracteristicas ? "" : "Este campo es requerido.";
    tempErrors.posicion = futbolis.posicion ? "" : "Este campo es requerido.";

    setErrors(tempErrors);

    return Object.values(tempErrors).every(x => x === "");
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      const response = await axios.put(`http://localhost:8090/url/actualizaFutbolista`, futbolis);
      console.log(response.data);
      setShowModal(true); // Show modal on successful submission
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    if (name === "posicion") {
      const selectedPosition = positions.find((position) => position.descripcion === value);
      setFutbol({ ...futbolis, posicion: selectedPosition });
      if (value) {
        setErrors({ ...errors, posicion: "" });
      }
    } else {
      setFutbol({ ...futbolis, [name]: value });
      if (value) {
        setErrors({ ...errors, [name]: "" });
      }
    }
  };

  const onBlur = (e) => {
    const { name, value } = e.target;
    let tempErrors = { ...errors };
    if (name === "posicion") {
      tempErrors.posicion = value ? "" : "Este campo es requerido.";
    } else {
      tempErrors[name] = value ? "" : "Este campo es requerido.";
    }
    setErrors(tempErrors);
  };

  const handleAccept = () => {
    setShowModal(false);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Actualizar Futbolista</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="idFutbolista" className="form-label">
                ID
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Introduzca su ID"
                name="idFutbolista"
                value={futbolis.idFutbolista}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="nombres" className="form-label">
                Nombres
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Introduzca su nombre"
                name="nombres"
                value={futbolis.nombres || ""}
                onChange={onChange}
                onBlur={onBlur}
              />
              {errors.nombres && <div className="text-danger">{errors.nombres}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="apellidos" className="form-label">
                Apellidos
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Introduzca sus Apellidos"
                name="apellidos"
                value={futbolis.apellidos || ""}
                onChange={onChange}
                onBlur={onBlur}
              />
              {errors.apellidos && <div className="text-danger">{errors.apellidos}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="fechaNacimiento" className="form-label">
                Fecha Nacimiento
              </label>
              <input
                type="date"
                className="form-control"
                placeholder="Introduzca su Fecha Nacimiento"
                name="fechaNacimiento"
                value={futbolis.fechaNacimiento || ""}
                onChange={onChange}
                onBlur={onBlur}
              />
              {errors.fechaNacimiento && <div className="text-danger">{errors.fechaNacimiento}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="caracteristicas" className="form-label">
                Características
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Introduzca las Características"
                name="caracteristicas"
                value={futbolis.caracteristicas || ""}
                onChange={onChange}
                onBlur={onBlur}
              />
              {errors.caracteristicas && <div className="text-danger">{errors.caracteristicas}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="posicion" className="form-label">
                Posición
              </label>
              <select
                className="form-control"
                name="posicion"
                value={futbolis.posicion?.descripcion || ""}
                onChange={onChange}
                onBlur={onBlur}
              >
                <option value="">Seleccione una posición</option>
                {positions.map((position) => (
                  <option key={position.idPosicion} value={position.descripcion}>
                    {position.descripcion}
                  </option>
                ))}
              </select>
              {errors.posicion && <div className="text-danger">{errors.posicion}</div>}
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Actualizar
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancelar
            </Link>
          </form>

          {/* Success Modal */}
          <div
            className={`modal fade ${showModal ? 'show' : ''}`}
            tabIndex="-1"
            style={{ display: showModal ? 'block' : 'none' }}
            aria-labelledby="successModalLabel"
            aria-hidden={!showModal}
            role="dialog"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header bg-success text-white">
                  <h5 className="modal-title" id="successModalLabel">Actualización Exitosa</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleAccept}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p><strong>¡Futbolista actualizado con éxito!</strong></p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-success" onClick={handleAccept}>
                    Aceptar
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
