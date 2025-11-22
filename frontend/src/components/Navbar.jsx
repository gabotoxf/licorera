import { Link } from "react-router-dom";
import "../assets/css/components/Navbar.css";
import logo from "../assets/img/UI/logo.png";

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg shadow-sm">
            <div className="container d-flex align-items-center">

                {/* LOGO */}
                <Link className="logo fw-bold d-flex align-items-center" to="/">
                    <img src={logo} /> <span>Liquors</span>
                </Link>

                {/* Botón móvil */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    {/* Carrito */}
                    <ul className="navbar-nav ms-auto align-items-left">

                        <li>
                            <Link className="nav-link" to="/Home">
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link className="nav-link" to="/About">
                                Nosotros
                            </Link>
                        </li>
                        <li>
                            <Link className="nav-link" to="/Products">
                                Productos
                            </Link>
                        </li>
                        <li>
                            <Link className="nav-link" to="/Users">
                                Usuarios
                            </Link>
                        </li>
                        <li className="nav-item position-relative">
                            <Link className="nav-link carro position-relative" to="/cart">
                                <i className="fas fa-shopping-cart fa-lg"></i>

                                {/* Contador */}
                                <span className="badge position-absolute top-0 start-100 translate-middle">
                                    0
                                </span>
                            </Link>
                        </li>
                        {/* <li>
                            <span className="input-group-text busqueda ms-1">
                            <i className="fas fa-search"></i>
                        </span>
                        </li> */}
                    </ul>

                </div>
            </div>
        </nav>
    );
}
