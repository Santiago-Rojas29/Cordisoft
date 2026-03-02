import Button from "./Atom/Button";
import Input from "./Atom/Input";

const SearchBar = ({ value, onChange, onSearch }) => {
    return (
        <div className="d-flex gap-2">
            <Input
            type="text"
            placeholder="Buscar..."
            value={value}
            onChange={onChange}
            style={{ width: "500px", borderRadius: 15 }}
            />
            <Button variant="outline" size="sm" onClick={onSearch}>
                Buscar
            </Button>
        </div>
    );
};  

export default SearchBar;