import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

import ChartCard from "../../molecules/Grafics/ChartCard";
import ChartTooltip from "../../atoms/Grafics/ChartTooltip";
import ChartLegend from "../../atoms/Grafics/ChartLegend";

export default function MaterialsBarCharts ({ title, data}) {
    return (
        <ChartCard title={title}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3"/>

                <XAxis dataKey="nombre" />

                <YAxis />

                <ChartTooltip />
                <ChartLegend />

                <Bar dataKey="cantidad" fill="#4f46e5" />

            </BarChart>
        </ChartCard>

    )
}