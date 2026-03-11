import React from 'react';
import UserTable from "../organisms/UserTable";
import SearchBar from "../molecules/SearchBar";
import Button from "../atoms/Button";

const PageUser = ({ lista, actualizarUsuario, eliminarUsuario, abrirModal }) => {
    // return (
        // <div className="container-fluid p-4 bg-light min-vh-100">
        //     <div className="d-flex justify-content-between align-items-center mb-4">
        //         <div>
        //             <h2 className="fw-bold mb-1">Gestión de Usuarios</h2>
        //         </div>
        //         <Button variant="success" onClick={abrirModal} className="rounded-pill px-4 shadow-sm">
        //             + Agregar Usuario
        //         </Button>
        //     </div>

        //     <div className="card border-0 shadow-sm rounded-4">
        //         <div className="card-body p-4">
        //             <div className="mb-4">
        //                 <SearchBar
        //                 busqueda={busqueda}
        //                 setBusqueda={setBusqueda}
        //                 onSearch={onSearch}
        //                 />
        //             </div>

        //             <UserTable
        //                 lista={lista}
        //                 actualizarUsuario={actualizarUsuario}
        //                 eliminarUsuario={eliminarUsuario}
        //             />
        //         </div>
        //     </div>
        // </div>
    // )
};

export default PageUser;