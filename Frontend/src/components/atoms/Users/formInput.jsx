export default function FormInput({
    label,
    name,
    value,
    onChange,
    type="text",
    style
    }) {

    return (

        <div className="col-md-6">

        <label className="form-label">
            {label}
        </label>

        <input
            type={type}
            name={name}
            className="form-control form-label fw-semibold text-secondary"
            value={value}
            style={{ height: "auto", marginBottom: "0.25rem", ...style }}
            onChange={onChange}
        />

        </div>

    );

}