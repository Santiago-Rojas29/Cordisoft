export const Input = ({ type, value, onChange, placeholder, }) => {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            style={styles}
            required
        />
    );
}

const styles = {
    width: "100%",
    padding: "12px 10px",
    marginTop: "20px",
    marginBottom: "1rem",
    borderRadius: "8px",
    border: "1px solid #ccc",

}