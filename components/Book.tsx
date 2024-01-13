import styles from "./Book.module.css"

interface BookType {
    id: string,
    imageLinks?: string,
    authors: string,
    title: string,
    ratingsCount?: string,
    averageRating?: string,
    description: string,
    price: string,
    buttontype?: string,
}



function Book({id, imageLinks="/images/nophoto.png", authors, title, ratingsCount="", averageRating="", description, price, buttontype="buybutton"}: BookType) {
    if (description) {
        description.length > 100 ? description = description.slice(0, 100) + "..." : description = description
    }
    
    return (
        <div className={styles.book}>
            <img className={styles.book__image} src={imageLinks} alt="" />
            <div className={styles.book__main}>
                <p className={styles.book__authors}>{authors}</p>
                <p className={styles.book__titles}>{title}</p>
                <div className={styles.book__rating}>
                    {ratingsCount && averageRating ?
                    <>
                        <p className={styles.book__stars}><img src={`/images/${averageRating}stars.png`} alt={`${averageRating} stars`}/></p>
                        <p className={styles.book__ratingcount}>{ratingsCount}</p>
                    </>
                    : <></>
                    }   
                </div>
                <p className={styles.book__description}>{description}</p>
                <p className={styles.book__sale}>{price}</p>
                <button className={`${styles[buttontype]} standartbtn ${styles.bookbtn}`}>
                    {buttontype === "buybutton" ? "Buy now" : "in the cart"}
                </button>
            </div>
        </div>
    )
}

export default Book