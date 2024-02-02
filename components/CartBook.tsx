import Image from "next/image";
import styles from "./CartBook.module.css"
import { Montserrat, Open_Sans } from 'next/font/google';

const font700 = Montserrat({
    weight: ["700"],
    subsets: ["latin", "cyrillic"],
})

const font400 = Open_Sans({
    weight: ["400"],
    subsets: ["latin", "cyrillic"],
})

interface CartBookType {
    img: string, 
    title: string,
    author: string, 
    ratingsCount?: string, 
    averageRating?: string,
}

function CartBook({img, title, author, ratingsCount="", averageRating=""}: CartBookType) {
    return (
        <div className={`${styles.container} ${font700.className}`}>
            <Image className={styles.image} src={img} alt="" width={100} height={150}/>
            <div className={styles.info}>
                <p className={styles.title}>{title}</p>
                <p className={`${styles.author} ${font400.className}`}>{author}</p>
                <div className={styles.rating}>
                    {ratingsCount && averageRating ?
                    <>
                        <p className={styles.stars}>
                            <Image src={`/images/${averageRating}stars.png`} alt={`${averageRating} stars`} width={157} height={33}/>
                        </p>
                        <p className={`${styles.ratingsCount} ${font400.className}`}>{ratingsCount + " reviews"}</p>
                    </>
                    : <></>
                    }   
                </div>
            </div>
        </div>
    )
}

export default CartBook