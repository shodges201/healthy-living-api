import React from 'react'

const styles:any = {
    container: {
        display: "table",
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%"
    },
    middle: {
        display: "table-cell",
        verticalAlign: "middle"
    },
    inner: {
        marginLeft: "auto",
        marginRight: "auto",
        width: "400px"
    },
    text: {
        color: "white"
    }
}

export default function NoMatch() {
    return (
        <div style={styles.container}>
            <div style={styles.middle}>
                <div style={styles.inner}>
                    <h1 style={styles.text}>This Page Cannot Be Found</h1>
                </div>
            </div>
        </div>
    )
}
