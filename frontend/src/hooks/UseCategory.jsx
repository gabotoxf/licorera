import { use, useEffect, useState } from "react";
import { getCategorias } from "../api/CategoryApi";

export default function useCategory(){
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadCategorias = async () => {
        setLoading(true);

        try {
            const res = await getCategorias();
            setCategorias(res.data);
        } catch (error) {
            console.error("ERROR en la petición:", error);
            console.error("Mensaje de error:", error.message);
            console.error("Respuesta de error:", error.response);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadCategorias();
    }, []);

    return { categorias, loading };
}