import useUsers from "../hooks/UseUsers";

export default function Users() {
  const { users, loading } = useUsers();

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <h1>Usuarios</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
