import UserTable from "./Organism/UserTable";
import SearchBar from "./Molecule/SearchBar";
import Button from "./Molecule/Atom/Button";

const PageUser = ({ lista, actualizarUsuario, eliminarUsuario, abrirModal}) => {
    return (
        <div className="container-fluid p-4">

            <h2>USUARIOS</h2>

            <SearchBar
            />

            <UserTable
            lista={lista}
            actualizarUsuario={actualizarUsuario}
            eliminarUsuario={eliminarUsuario}
            />

            <Button variant="success" onClick={abrirModal}>
                Agregar Usuario
            </Button>

        </div>
    )
}

export default PageUser;