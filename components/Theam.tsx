import styles from "./Theam.module.css"
import { Montserrat } from 'next/font/google';

const font700 = Montserrat({
    weight: ["700"],
    subsets: ["latin", "cyrillic"],
})

interface TheamType {
    text: string,
    active: boolean,
    onClick: () => void,
}

function Theam({text="", active=false, onClick= () => {}} : TheamType) {
    return (
        <li onClick={onClick} className={`${styles.books__theam} ${font700.className} ${active ? styles.books__theam_active: ""}`}>{text}</li>
    )
}

export default Theam