import Image from "next/image"
import styles from "./Swiper.module.css"

function Slide({url = "none"}) {
    return (
        <div className={styles.slide_container}>
            <Image src={url} alt="No photo(" width={600} height={380}/>
        </div>
    )
}

export default Slide