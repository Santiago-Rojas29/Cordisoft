import { PieChart, Pie, Cell } from "recharts";
import ChartTooltip from "../../atoms/Grafics/ChartTooltip";
import ChartLegend from "../../atoms/Grafics/ChartLegend";
import ChartCard from "../../molecules/Grafics/ChartCard";

const Colors = ["#15631f", "#ff0000", "#eab308", "#22c55e"]

export default function SolicitudesEstado ({ title, data}) {
    return (
        <ChartCard title={title}>
            <PieChart>

                <Pie data={data} dataKey="cantidad" nameKey="estado" outerRadius={100} label>
                    {data.map((entry, index) => (
                        <Cell
                        key={index}
                        fill={Colors[index % Colors.length]}
                        />
                    ))}
                </Pie>

                <ChartTooltip />
                <ChartLegend />

            </PieChart>
        </ChartCard>
    )
}