export const AuthTemplate = ({ backgroundImage, logo, children }) => {
    const styles = {
        container: {
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
            url(${backgroundImage})
        `,
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "20px"
        },

        card: {
            width: "100%",
            maxWidth: "400px",
            padding: "45px 30px",
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderRadius: "16px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
            border: "1px solid rgba(255, 255, 255, 0.5)",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: "20px"
        },

        logo: {
            width: "400px",
            height: "160px",
            marginBottom: "1px",
            alignSelf: "center",
            filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.1))"
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