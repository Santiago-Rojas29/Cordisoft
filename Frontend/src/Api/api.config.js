export const API_BASE_URL = 'http://localhost:3000/api'; // 

export const STATS_ENDPOINTS = {
  unreturnedMaterials: `${API_BASE_URL}/estadisticas/materialesNoDevueltos`,
  damagedMaterials:    `${API_BASE_URL}/estadisticas/materialesDanados`,
  defaultingUsers:     `${API_BASE_URL}/estadisticas/usuariosMorosos`,
  mostUsedMaterials:   `${API_BASE_URL}/estadisticas/materialesMasPrestados`,
};
