import { ResponsiveContainer } from "recharts";
import ChartTitle from "../../atoms/Grafics/ChartTitle";

export default function ChartCard ({ title, children}) {
    return (
        <div style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
            width: "100%",
            height: "350px"
        }}>
            <ChartTitle title={title} />

            <div style={{ width: "100%", height: "300px" }}>
                <ResponsiveContainer width="100%" height="100%">
                    {children}
                </ResponsiveContainer>
            </div>
        </div>
    )
}