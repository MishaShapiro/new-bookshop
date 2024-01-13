import styles from "./Theam.module.css"

interface TheamType {
    text: string,
    active: boolean,
    onClick: () => void,
}

function Theam({text="", active=false, onClick= () => {}} : TheamType) {
    return (
        <li onClick={onClick} className={`${styles.books__theam} ${active ? styles.books__theam_active: ""}`}>{text}</li>
    )
}

export default Theam