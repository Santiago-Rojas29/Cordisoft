export default function DashboardTemplate ({ children}) {
    return (
        <div style={{padding: "30px", background: "#f5f5f5", minHeight: "100vh"}}>
            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px"}}>
                {children}
            </div>
        </div>
    )
}