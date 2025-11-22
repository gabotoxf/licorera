import { useEffect, useState } from "react";
import { getProducts } from "../api/ProductsApi";

export default function useProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);


    const loadProducts = async () => {

        setLoading(true);
        try {
            const res = await getProducts();
            setProducts(res.data);
        } catch (error) {
            console.error("ERROR en la petición:", error);
            console.error("Mensaje de error:", error.message);
            console.error("Respuesta de error:", error.response);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();  // ← Ejecutar inmediatamente cuando el componente nace
    }, []);         // ← Array vacío = solo una vez al inicio

    return { products, loading, reload: loadProducts };
}