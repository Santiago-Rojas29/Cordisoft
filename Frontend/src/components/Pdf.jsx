import { Document, Page, Image, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: "Helvetica"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    borderBottom: "1px solid #ccc",
    paddingBottom: 10
  },
  logo: {
    width: 50,
    height: 50
  },
  headerText: {
    textAlign: "right"
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
    fontWeight: "bold",
    color: "#333"
  },
  description: {
    fontSize: 11,
    textAlign: "justify",
    marginBottom: 20,
    color: "#555",
    lineHeight: 1.5
  },
  conclusion: {
    fontSize: 11,
    textAlign: "justify",
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderLeftWidth: 3,
    borderLeftColor: "#4CAF50",
    color: "#444",
    lineHeight: 1.5
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderColor: "#bfbfbf"
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row"
  },
  tableColHeader: {
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderColor: "#bfbfbf",
    backgroundColor: "#f2f2f2"
  },
  tableCol: {
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderColor: "#bfbfbf"
  },
  tableCellHeader: {
    margin: 5,
    fontSize: 10,
    fontWeight: "bold"
  },
  tableCell: {
    margin: 5,
    fontSize: 10
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    borderTop: "1px solid #ccc",
    paddingTop: 10,
    textAlign: "center",
    fontSize: 9,
    color: "#777"
  }
});

export default function Pdf({ title, description, conclusion, data = [], columns = [] }) {
  const fechaActual = new Date().toLocaleDateString();
  const horaActual = new Date().toLocaleTimeString();

  // Calculate width percentage based on number of columns
  const colWidth = `${100 / (columns.length || 1)}%`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src="/logo.jpg" style={styles.logo} />
          <View style={styles.headerText}>
            <Text>Sistema de Inventario</Text>
            <Text>Reporte Estadístico</Text>
            <Text>{fechaActual} {horaActual}</Text>
          </View>
        </View>

        <Text style={styles.title}>
          {title || "Reporte de Datos"}
        </Text>

        {description && (
          <Text style={styles.description}>
            {description}
          </Text>
        )}

        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableRow}>
            {columns.map((col, index) => (
              <View key={index} style={[styles.tableColHeader, { width: colWidth }]}>
                <Text style={styles.tableCellHeader}>{col.label}</Text>
              </View>
            ))}
          </View>

          {/* Table Body */}
          {data.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.tableRow}>
              {columns.map((col, colIndex) => (
                <View key={colIndex} style={[styles.tableCol, { width: colWidth }]}>
                  <Text style={styles.tableCell}>{row[col.key] != null ? String(row[col.key]) : "N/A"}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        {data.length === 0 && (
          <Text style={{ textAlign: "center", marginTop: 20, fontSize: 12, color: "#999" }}>
            No hay datos disponibles para este reporte.
          </Text>
        )}

        {conclusion && (
          <View style={styles.conclusion}>
            <Text style={{ fontWeight: "bold", marginBottom: 5, color: "#333" }}>Conclusión y Recomendaciones:</Text>
            <Text>{conclusion}</Text>
          </View>
        )}

        <Text style={styles.footer} fixed>
          Generado automáticamente por el sistema | © {new Date().getFullYear()}
        </Text>
      </Page>
    </Document>
  );
}