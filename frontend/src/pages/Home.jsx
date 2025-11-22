import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Bienvenido a la página de inicio</h1>

      <Link to="/products">
        <button>Ir a productos</button>
      </Link>
    </div>
  );
}