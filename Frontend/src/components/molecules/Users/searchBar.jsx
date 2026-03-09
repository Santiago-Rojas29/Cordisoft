export default function SearchBar({value,onChange}){

    return(

        <div className="d-flex gap-2 mb-3">

        <input
            className="form-control"
            placeholder="Buscar..."
            value={value}
            onChange={onChange}
        />

        <button className="btn btn-outline-primary">
            Buscar
        </button>

        </div>

    )

}