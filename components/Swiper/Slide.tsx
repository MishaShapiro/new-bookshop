import styles from "./Swiper.module.css"

function Slide({text = "", url = "none"}) {
    return (
        <div className={styles.slide_container}>
            <p>{text}</p>
            <img src={url} alt="No photo(" />
        </div>
    )
}

export default Slide