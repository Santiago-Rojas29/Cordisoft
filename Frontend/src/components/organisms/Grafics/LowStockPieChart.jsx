import { PieChart, Pie, Cell } from "recharts";

import ChartCard from "../../molecules/Grafics/ChartCard";
import ChartTooltip from "../../atoms/Grafics/ChartTooltip";
import ChartLegend from "../../atoms/Grafics/ChartLegend";

const Colors = ["#ef4444", "#f97316", "#eab308", "#22c55e"]

export default function BajoStockPieChart ({ title, data}) {
    return (
        <ChartCard title={title}>
            <PieChart>

                <Pie data={data} dataKey="cantidad" nameKey="nombre" outerRadius={100} label>
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