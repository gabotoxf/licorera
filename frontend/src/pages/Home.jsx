import "../assets/css/components/Home.css";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CategoriasCarrusel from "../components/CategoriasCarrusel";


export default function Home() {
  return (
    <div>
      <Navbar />

      <div className="container-fluid cont-inicio">
        <div className="container cont-hijo">
          <div className="row">
            <div className="col">
              <h1>Full Liquors & Bebidas</h1>
              <h2 className="mb-4">Explora - Disfruta</h2>
              <Link to="/products" className="btn btn-bg-none btn-comprar py-3 px-5">
                Ir a productos
              </Link>
            </div>

            <div className="col">

            </div>
          </div>
        </div>
      </div>

      <CategoriasCarrusel />

      <div className="container elegir">
        <h2 className="subtitulo sub-home">¿Por qué elegirnos?</h2>

        <div className="row">
          <div className="col-md-6 align-content-center">
            <div className="row">
              <div className="col-md-4 columnas">
                <span className="iconos">
                  <i className="fa-solid fa-wine-bottle"></i>
                </span>
                <p>Nombre</p>
              </div>
              <div className="col-md-4 columnas">
                <span className="iconos">
                  <i className="fa-solid fa-martini-glass"></i>
                </span>
                <p>Nombre</p>
              </div>
              <div className="col-md-4 columnas">
                <span className="iconos">
                  <i className="fa-solid fa-beer-mug-empty"></i>
                </span>
                <p>Nombre</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 align-content-center py-5">
            <h2 className="subtitulo sub-elegir">Disfruta tu experiencia</h2>
            <p className="sub-elegir-p">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

            <Link to="/products" className="btn comprar py-2 px-5">
              Compra ya
            </Link>

          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}