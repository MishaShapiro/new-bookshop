import styles from "./Book.module.css"
import { useDispatch, useSelector } from "react-redux"
import { addBook } from "@/redux/CartSlice"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Montserrat, Open_Sans } from 'next/font/google';
import Image from "next/image"
import { setUserCart } from "@/redux/UserSlice"

const font700 = Montserrat({
    weight: ["700"],
    subsets: ["latin", "cyrillic"],
})

const font400 = Open_Sans({
    weight: ["400"],
    subsets: ["latin", "cyrillic"],
})


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

    const dispatch = useDispatch();

    const cart = useSelector((state : any) => state.cart)
    const user = useSelector((state : any) => state.user)

    useEffect(() => {
        dispatch(setUserCart({
            mail: user.data.mail,
            cart: cart.books
        }))    
    }, [cart])

    const arr = cart.books.map((item : any) => {return item.id})

    if (arr.includes(id)) {
        buttonType = "cartbtn"
    }

    if (description) {
        description.length > 100 ? description = description.slice(0, 100) + "..." : description = description
    }
    
    return (
        <div className={`${styles.book} ${font700.className}`}>
            <Image className={styles.book__image} src={imageLinks} alt={"book.png"} width={212} height={300}/>
            <div className={styles.book__main}>
                <p className={`${styles.book__authors} ${font400.className}`}>{authors}</p>
                <p className={styles.book__titles}>{title}</p>
                <div className={styles.book__rating}>
                    {ratingsCount && averageRating ?
                    <>
                        <p className={styles.book__stars}>
                            <Image src={`/images/${averageRating}stars.png`} alt={`${averageRating} stars`} width={157} height={33}/>
                        </p>
                        <p className={`${styles.book__ratingcount} ${font400.className}`}>{ratingsCount}</p>
                    </>
                    : <></>
                    }   
                </div>
                <p className={`${styles.book__description} ${font400.className}`}>{description}</p>
                <p className={styles.book__sale}>{`${price} ${priceCode}`}</p>
                {price ?
                    <>
                        {buttonType === "buybutton" ? 
                                <button className={`${styles[buttonType]} standartbtn ${styles.bookbtn} ${user.data.mail ? "" : styles.disabled}`} onClick={() => {
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