import DashboardTemplate from "../../templates/Grafics/DashboardTemplate";
import MaterialsBarCharts from "../../organisms/Grafics/MaterialsBarChart";
import BajoStockPieChart from "../../organisms/Grafics/LowStockPieChart";
import axiosClient from "../../../Api/axiosClient";
import { useEffect, useState } from "react";
import SolicitudesEstado from "../../organisms/Grafics/SolicitudesEstado";

export default function Dashboard({title = "Administración de Materiales"}) {
  const [lista, setLista] = useState([])
  const [detalleCantidad, setDetalleCantidad] = useState([])
  const [solicitudes, setSolcitudes] = useState([])

  const obtenerMateriales = async () => {
    const res = await axiosClient.get("/materiales/listar");
    setLista(res.data)
  }

    useEffect(() => {
    obtenerMateriales()
  }, [])

    const obtenerSolicitudes = async () => {
    const res = await axiosClient.get("/solicitudes/listar");
    setSolcitudes(res.data)
  }

  useEffect(() => {
    obtenerSolicitudes()
  }, [])

  const obtenerDetalleSolicitud = async () => {
    const res = await axiosClient.get("/detalleSolicitudes/listar");
    setDetalleCantidad(res.data)
  }

  useEffect(() => {
    obtenerDetalleSolicitud()
  }, [])

    const solicitudesMap = {}
  solicitudes.forEach(solicitud => {
    solicitudesMap[solicitud.id_solicitud] = solicitud.estado
  })
  

  const estadoData = {}
  detalleCantidad.forEach(detalle => {
    const estado = solicitudesMap[detalle.id_solicitud]

    if (!estadoData[estado]) {
      estadoData[estado] = 0
    }

    estadoData[estado] += detalle.cantidad
  })






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

    const SolicitudData = Object.entries(estadoData).map(([estado, cantidad]) => ({
      estado,
      cantidad
    }))
    console.log(SolicitudData)
  return (
    <div>

      <h1 className="fw-bold mb-4">
        Panel de Administración
      </h1>

      <DashboardTemplate>

        <MaterialsBarCharts data={materialsData} title={title} />

        <BajoStockPieChart data={bajoStockData} title={"Administración de Bajo Stock"} />

        <SolicitudesEstado data={SolicitudData} title={"Estadística de Solcitudes Aprobadas/Rechazadas y Cantidad"} />

      </DashboardTemplate>
    </div>
  );
}