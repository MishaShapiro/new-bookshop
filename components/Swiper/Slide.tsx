import styles from "./Swiper.module.css"

function Slide({url = "none"}) {
    return (
        <div className={styles.slide_container}>
            <img src={url} alt="No photo(" />
        </div>
    )
}

export default Slide