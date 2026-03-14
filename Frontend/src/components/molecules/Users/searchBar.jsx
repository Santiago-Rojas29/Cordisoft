export default function SearchBar({ value, onChange, placeholder = "Escribe para buscar..." }) {

    return (

        <div className="d-flex mb-4">

            <input
                type="search"
                className="form-control rounded-pill px-4 py-2"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                style={{
                    maxWidth: "400px",
                    border: "1px solid #ced4da",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
                }}
            />

        </div>

    )

}