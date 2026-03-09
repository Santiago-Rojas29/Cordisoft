export default function Select({
    label,
    name,
    value,
    onChange,
    options
    }) {

    return (

        <div className="col-md-6">

        <label className="form-label">{label}</label>

        <select
            name={name}
            className="form-select"
            value={value}
            onChange={onChange}
        >

            {options.map((opt)=>(
            <option key={opt.value} value={opt.value}>
                {opt.label}
            </option>
            ))}

        </select>

        </div>

    );

}