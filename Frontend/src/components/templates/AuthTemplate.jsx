export const AuthTemplate = ({ backgroundImage, logo, children }) => {
    const styles = {
        container: {
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundImage: `
            linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),
            url(${backgroundImage})
        `,
            backgroundSize: "cover",
            backgroundPosition: "center"
        },

        card: {
            width: "380px",
            padding: "40px",
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: "15px"
        },

        logo: {
            width: "140px",
            marginBottom: "10px",
            alignSelf: "center"
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>

                <img
                    src={logo}
                    alt="logo"
                    style={styles.logo}
                />

                {children}

            </div>
        </div>
    )
}