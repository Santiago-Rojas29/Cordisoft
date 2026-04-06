import DashboardTemplate from "../../templates/Grafics/DashboardTemplate";
import MaterialsBarCharts from "../../organisms/Grafics/MaterialsBarChart";
import BajoStockPieChart from "../../organisms/Grafics/LowStockPieChart";
import axiosClient from "../../../Api/axiosClient";
import { useEffect, useState } from "react";

export default function Dashboard({title = "Administración de Materiales"}) {
  const [lista, setLista] = useState([])

  const obtenerMateriales = async () => {
    const res = await axiosClient.get("/materiales/listar");
    setLista(res.data)
  }

  useEffect(() => {
    obtenerMateriales()
  }, [])

  const materialsData = lista.map(materiales => ({
    nombre: materiales.nombre,
    cantidad: materiales.cantidad
  }))

  const bajoStockData = lista
    .filter(material => material.cantidad <= 5)
    .map(material => ({
      nombre: material.nombre,
      cantidad: material.cantidad
    }))
    console.log(bajoStockData)

  return (
    <div>

      <h1 className="fw-bold mb-4">
        Panel de Administración
      </h1>

      <DashboardTemplate>

        <MaterialsBarCharts data={materialsData} title={title} />

        <BajoStockPieChart data={bajoStockData} title={"Administración de Bajo Stock"} />

      </DashboardTemplate>
    </div>
  );
}