export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const STATS_ENDPOINTS = {
  unreturnedMaterials:  `${API_BASE_URL}/estadisticas/materialesNoDevueltos`,
  damagedMaterials:     `${API_BASE_URL}/estadisticas/materialesDanados`,
  defaultingUsers:      `${API_BASE_URL}/estadisticas/usuariosMorosos`,
  mostUsedMaterials:    `${API_BASE_URL}/estadisticas/materialesMasPrestados`,
  loansByMonth:         `${API_BASE_URL}/estadisticas/prestamosPorMes`,
  stockByWarehouse:     `${API_BASE_URL}/estadisticas/stockPorBodega`,
  apprenticeDamages:    `${API_BASE_URL}/estadisticas/aprendicesConDanos`,
  returnRate:           `${API_BASE_URL}/estadisticas/tasaDevolucion`,
};

export const REPORT_ENDPOINTS = {
  prestamos:  `${API_BASE_URL}/reportes/prestamos`,
  danos:      `${API_BASE_URL}/reportes/danos`,
  inventario: `${API_BASE_URL}/reportes/inventario`,
};
