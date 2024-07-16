import './Add.css';
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function AddFutbolistas() {
  let navigate = useNavigate();

  const [futbolis, setFutbol] = useState({
    nombres: "",
    apellidos: "",
    fechaNacimiento: "",
    caracteristicas: "",
    posicion: {
      idPosicion: ""
    },
  });

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  const { nombres, apellidos, fechaNacimiento, caracteristicas, posicion } = futbolis;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "posicion") {
      setFutbol({ ...futbolis, posicion: { idPosicion: value } });
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

  const validate = () => {
    let tempErrors = {};
    tempErrors.nombres = nombres ? "" : "Este campo es requerido.";
    tempErrors.apellidos = apellidos ? "" : "Este campo es requerido.";
    tempErrors.fechaNacimiento = fechaNacimiento ? "" : "Este campo es requerido.";
    tempErrors.caracteristicas = caracteristicas ? "" : "Este campo es requerido.";
    tempErrors.posicion = posicion.idPosicion ? "" : "Este campo es requerido.";

    setErrors(tempErrors);

    return Object.values(tempErrors).every(x => x === "");
  };

  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const fetchPositions = async () => {
      const response = await axios.get("http://localhost:8090/url/posicion");
      setPositions(response.data);
    };

    fetchPositions();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      await axios.post("http://localhost:8090/url/registraFutbolista", futbolis);
      setShowModal(true); // Show modal on successful submission
    }
  };

  const handleAccept = () => {
    setShowModal(false);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Registrar Futbolista</h2>

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="nombres" className="form-label">
                Nombres
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Introduzca su nombre"
                name="nombres"
                value={nombres}
                onChange={onInputChange}
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
                value={apellidos}
                onChange={onInputChange}
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
                value={fechaNacimiento}
                onChange={onInputChange}
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
                value={caracteristicas}
                onChange={onInputChange}
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
                value={posicion.idPosicion}
                onChange={onInputChange}
                onBlur={onBlur}
              >
                <option value="">Seleccione una posición</option>
                {positions.map((position) => (
                  <option key={position.idPosicion} value={position.idPosicion}>
                    {position.descripcion}
                  </option>
                ))}
              </select>
              {errors.posicion && <div className="text-danger">{errors.posicion}</div>}
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Registrar
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancelar
            </Link>
          </form>

          {/* Modal */}
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
                  <h5 className="modal-title" id="successModalLabel">Registro Exitoso</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleAccept}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <strong>¡Futbolista registrado con éxito!</strong>
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
