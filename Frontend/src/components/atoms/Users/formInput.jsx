export default function FormInput({
    label,
    name,
    value,
    onChange,
    type="text"
    }) {

    return (

        <div className="col-md-6">

        <label className="form-label">
            {label}
        </label>

        <input
            type={type}
            name={name}
            className="form-control"
            value={value}
            onChange={onChange}
        />

        </div>

    );

}