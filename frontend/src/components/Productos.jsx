import { useEffect, useState } from "react";

export default function Productos() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/products");
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerDatos();
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <h2>Componente de productos:</h2>

      <ul>
        {data.map(item => (
          <p key={item.producto_id}>{item.nombre}</p>
        ))}
      </ul>
    </div>
  );
}
