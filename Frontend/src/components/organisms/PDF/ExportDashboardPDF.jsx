import { useState, useEffect } from "react";
import html2canvas from 'html2canvas'
import { PDFDownloadLink } from '@react-pdf/renderer'
import Pdf from "../../Pdf";

export const ExportDashboardPDF = ({ charts = [] }) => {
    const [selectedCharts, setSelectedCharts] = useState([]);
    const [sections, setSections] = useState([]);
    const [isCapturing, setIsCapturing] = useState(false);
    const [showOptions, setShowOptions] = useState(false);

    useEffect(() => {
        if (charts.length > 0 && selectedCharts.length === 0 && sections.length === 0) {
            setSelectedCharts(charts.map(c => c.id));
        }
    }, [charts]);

    const toggleChart = (id) => {
        setSelectedCharts(prev => 
            prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
        );
        setSections([]);
    };

    const captureDashboard = async() => {
        if (selectedCharts.length === 0) return;
        
        setIsCapturing(true);
        const newSections = [];
        
        for (const chart of charts) {
            if (selectedCharts.includes(chart.id) && chart.ref?.current) {
                const canvas = await html2canvas(chart.ref.current, {
                    scale: 2
                });
                newSections.push({
                    title: chart.name,
                    image: canvas.toDataURL("image/png")
                });
            }
        }
        
        setSections(newSections);
        setIsCapturing(false);
    };

    return (
        <div className="mb-4">
            <button 
                className="btn btn-outline-primary shadow-sm fw-medium d-flex align-items-center gap-2 mb-3"
                onClick={() => setShowOptions(!showOptions)}
            >
                <i className={`bi bi-chevron-${showOptions ? 'up' : 'down'}`}></i>
                Opciones para exportar PDF
            </button>

            {showOptions && (
                <div className="card shadow-sm border-0">
                    <div className="card-body">
                        <h5 className="card-title fw-bold text-dark">Opciones de Reporte PDF</h5>
                        <p className="card-text text-muted mb-3 small">Selecciona las gráficas o tablas que deseas incluir en el documento.</p>
                        
                        <div className="d-flex flex-wrap gap-4 mb-4">
                            {charts.map(chart => (
                                <div key={chart.id} className="form-check form-switch">
                                    <input 
                                        className="form-check-input bg-primary border-primary" 
                                        type="checkbox" 
                                        role="switch"
                                        id={`check-${chart.id}`}
                                        checked={selectedCharts.includes(chart.id)}
                                        onChange={() => toggleChart(chart.id)}
                                    />
                                    <label className="form-check-label user-select-none" htmlFor={`check-${chart.id}`}>
                                        {chart.name}
                                    </label>
                                </div>
                            ))}
                        </div>

                        <div className="d-flex align-items-center gap-2">
                            <button 
                                className="btn btn-dark px-4 fw-medium shadow-sm" 
                                onClick={captureDashboard}
                                disabled={isCapturing || selectedCharts.length === 0}
                            >
                                {isCapturing ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Preparando...
                                    </>
                                ) : "Generar Documento"}
                            </button>
                            
                            {sections.length > 0 && !isCapturing && (
                                <PDFDownloadLink document={<Pdf sections={sections} />} fileName="reporte-dashboard.pdf">
                                    {({ loading }) => (
                                        <button className="btn btn-success px-4 fw-medium shadow-sm" disabled={loading}>
                                            <i className="bi bi-file-earmark-pdf me-2"></i>
                                            {loading ? "Cargando PDF..." : "Descargar PDF"}
                                        </button>
                                    )}
                                </PDFDownloadLink>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
