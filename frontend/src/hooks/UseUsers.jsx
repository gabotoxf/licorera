import { useEffect, useState } from "react";
import { getUsers } from "../api/UsersApi";

export default function useUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);


    const loadUsers = async () => {
        setLoading(true);                    // ↑ Encender letrero "CARGANDO"
        const res = await getUsers();        // → 🏃‍♂️ Enviar mensajero a buscar datos
        setUsers(res.data);                  // ← 📦 Guardar datos en la caja
        setLoading(false);                   // ↓ Apagar letrero "CARGANDO"
    };

    useEffect(() => {
        loadUsers();  // ← Ejecutar inmediatamente cuando el componente nace
    }, []);         // ← Array vacío = solo una vez al inicio

    return { users, loading, reload: loadUsers };
}