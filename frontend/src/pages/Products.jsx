import useProducts from "../hooks/UseProducts";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


export default function Products() {
    const { products, loading } = useProducts();

    if (loading) return <p>Cargando...</p>;

    return (
        <div>
            <Navbar />
            <h1>Productos</h1>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Categoria</th>
                        <th>Marca</th>
                        <th>Tipo</th>
                        <th>Pais de Origen</th>
                        <th>Grado de Alcohol</th>
                        <th>Stock</th>
                        <th>Imagen</th>
                        <th>Estado</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((u, index) => (
                        <tr key={u.producto_id}>
                            <td>{u.producto_id}</td>
                            <td>{u.nombre}</td>
                            <td>{u.descripcion}</td>
                            <td>{u.precio}</td>
                            <td>{u.categoria_nombre}</td>
                            <td>{u.marca}</td>
                            <td>{u.tipo_licor}</td>
                            <td>{u.pais_origen}</td>
                            <td>{u.grado_alcohol}</td>
                            <td>{u.stock}</td>
                            <td>{u.imagen_url}</td>
                            <td>{Number(u.estado) === 1 ? 'Activo' : 'Inactivo'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Footer />
        </div>
    );
}
