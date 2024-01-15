import styles from "./CartBook.module.css"

interface CartBookType {
    img: string, 
    title: string,
    author: string, 
    ratingsCount?: string, 
    averageRating?: string,
}

function CartBook({img, title, author, ratingsCount="", averageRating=""}: CartBookType) {
    return (
        <div className={styles.container}>
            <img className={styles.image} src={img} alt="" />
            <div className={styles.info}>
                <p className={styles.title}>{title}</p>
                <p className={styles.author}>{author}</p>
                <div className={styles.rating}>
                    {ratingsCount && averageRating ?
                    <>
                        <p className={styles.stars}><img src={`/images/${averageRating}stars.png`} alt={`${averageRating} stars`}/></p>
                        <p className={styles.ratingcount}>{ratingsCount + " reviews"}</p>
                    </>
                    : <></>
                    }   
                </div>
            </div>
        </div>
    )
}

export default CartBook