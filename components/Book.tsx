import styles from "./Book.module.css"
import { useDispatch, useSelector } from "react-redux"
import { addBook } from "@/redux/CartSlice"
import { useState } from "react"
import { useRouter } from "next/router"


interface BookType {
    id: string,
    imageLinks?: string,
    authors: string,
    title: string,
    ratingsCount?: string,
    averageRating?: string,
    description: string,
    price: string,
    priceCode: string,
}



function Book({id, imageLinks="/images/nophoto.png", authors, title, ratingsCount="", averageRating="", description, price, priceCode}: BookType) {

    const router = useRouter()

    let buttonType = "buybutton"

    const cart = useSelector((state : any) => state.cart)
    const arr = cart.books.map((item : any) => {return item.id})

    if (arr.includes(id)) {
        buttonType = "cartbtn"
    }

    if (description) {
        description.length > 100 ? description = description.slice(0, 100) + "..." : description = description
    }

    const dispatch = useDispatch();
    
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
                <p className={styles.book__sale}>{`${price} ${priceCode}`}</p>
                {price ?
                    <>
                        {buttonType === "buybutton" ? 
                                <button className={`${styles[buttonType]} standartbtn ${styles.bookbtn}`} onClick={() => {
                                    dispatch(addBook({
                                        id: id,
                                        img: imageLinks,
                                        title: title,
                                        author: authors,
                                        ratingsCount: ratingsCount, 
                                        averageRating: averageRating,
                                        price: price,
                                        priceCode: priceCode,
                                        count: 1,
                                    }))
                                }}>
                                    Buy now
                                </button>  
                            : 
                            <button className={`${styles[buttonType]} standartbtn ${styles.bookbtn}`} onClick={() => {router.push("/cart")}}>
                                in the cart
                            </button> 
                        }
                    </>
                    :
                    <></>
                }
            </div>
        </div>
    )
}

export default Book