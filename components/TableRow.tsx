import styles from "./TableRow.module.css"

interface TableRowType {
    type?: string,
    children: any,
}

function TableRow({type="heading", children} : TableRowType) {
    return (
        <>
            {type === "heading" ?
                <div className={styles.tableheading}>
                    {children}
                </div>
                :
                <div className={styles.table}>
                    {children}
                </div>
            }
        </>
    )
}

export default TableRow