import MaterialTable from "@material-table/core"
import { ExportCsv, ExportPdf } from "@material-table/exporters"

function InformePrestamos(props){
    const cols = [{ title: "Articulo", field: "articulo" }, { title: "Persona", field: "persona", filtering: false }, { title: "Fecha", field: "fecha", filtering: false }]
    const tabla = props.datos
    return<>
        <MaterialTable
            columns={cols} data={tabla}
            title="Información de Prestamos"
            options={{
                draggable: true,
                columnsButton: true,
                filtering: true,
                headerStyle: {
                    backgroundColor: "#b2ffc3",
                    color: "rgba(70,69,69,0.87)",
                  },
                exportMenu: [
                    {
                        label: "Exportar a PDF",
                        exportFunc: (cols, tabla) => ExportPdf(cols, tabla, "PrestamosPDF"),
                    },
                    {
                        label: "Exportar a CSV",
                        exportFunc: (cols, tabla) => ExportCsv(cols, tabla, "PrestamosCSV")
                    }
                ],
            }}
        />
    </>
}
export default InformePrestamos