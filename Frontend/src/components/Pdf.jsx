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
    fontWeight: "bold"
  },

  description: {
    fontSize: 11,
    textAlign: "center",
    marginBottom: 15,
    color: "#555"
  },

  section: {
    marginBottom: 20
  },

  sectionTitle: {
    fontSize: 12,
    marginBottom: 5,
    fontWeight: "bold"
  },

  image: {
    width: "100%",
    borderRadius: 8
  },

  footer: {
    marginTop: 20,
    borderTop: "1px solid #ccc",
    paddingTop: 10,
    textAlign: "center",
    fontSize: 9,
    color: "#777"
  }
});

export default function Pdf({ sections = [] }) {

  const fechaActual = new Date().toLocaleDateString();

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        <View style={styles.header}>
          <Image src="/logo.jpg" style={styles.logo} />
          <View style={styles.headerText}>
            <Text>Sistema de Inventario</Text>
            <Text>Reporte Estadístico</Text>
            <Text>{fechaActual}</Text>
          </View>
        </View>

        <Text style={styles.title}>
          Reporte General del Dashboard
        </Text>

        <Text style={styles.description}>
          Este informe presenta un resumen visual del estado actual del inventario,
          incluyendo materiales no devueltos, materiales dañados, usuarios con pendientes
          y tendencias de uso de materiales.
        </Text>

        {sections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>
              {section.title || `Gráfica ${index + 1}`}
            </Text>
            <Image src={section.image} style={styles.image} />
          </View>
        ))}

        <Text style={styles.footer}>
          Generado automáticamente por el sistema | © 2026
        </Text>

      </Page>
    </Document>
  );
}