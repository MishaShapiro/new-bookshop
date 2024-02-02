import styles from "./TableRow.module.css"
import { Montserrat } from 'next/font/google';

const font700 = Montserrat({
    weight: ["700"],
    subsets: ["latin", "cyrillic"],
})

interface TableRowType {
    type?: string,
    children: any,
}

function TableRow({type="heading", children} : TableRowType) {
    return (
        <>
            {type === "heading" ?
                <div className={`${styles.tableheading} ${font700.className}`}>
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