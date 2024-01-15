import { useState } from "react";
import CartBook from "../../components/CartBook";
import Layout from "../../components/Layout";
import TableRow from "../../components/TableRow";
import styles from "../styles/cart.module.css"

const MockData : any[] = [
    {
        img: "http://books.google.com/books/content?id=fmevEAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
        title: "The weight of things",
        author: "Marianne Fritz",
        ratingsCount: "353", 
        averageRating: "4",
        price: "18.23",
    },
    {
        title: "Mothers stories",
        author: "Chris Power",
        // ratingsCount: "400", 
        // averageRating: "4",
        price: "12.35",
    }
]

function incr(arr : number[] = [], ind: number = 0) {
    arr[ind] += 1
    return arr.slice()
}

function decr(arr : number[] = [], ind: number = 0) {
    arr[ind] -= 1
    return arr.slice()
}

function Cart() {

    const [booksCount, setbooksCount] = useState(Array(MockData.length).fill(1))

    let totalPrice = 0

    return (
        <Layout>
            <div className={styles.container}>
                <h2 className={styles.heading}>SHOPPING CART</h2>
                    {MockData.length ?
                    (<>
                    <TableRow type="heading">
                        <p>ITEM</p>
                        <p>QUANTITY</p>
                        <p>PRICE</p>
                        <p>DELIVERY</p>
                    </TableRow>
                    {MockData.map((data, index) => {
                        totalPrice += data.price * booksCount[index]
                        return (
                            <TableRow type="row">
                                <CartBook img={data.img ? data.img : "/images/nophoto.png"} title={data.title} author={data.author} ratingsCount={data.ratingsCount} averageRating={data.averageRating}/>
                                <div className={styles.buttonsContainer}>
                                    <button className={styles.button} onClick={() => {setbooksCount(incr(booksCount, index))}}>
                                        <img src="/svg/plus.svg" alt="+" />
                                    </button>
                                    <p className={styles.booksCount}>{booksCount[index]}</p>
                                    <button className={styles.button} onClick={() => {setbooksCount(decr(booksCount, index))}}>
                                        <img src="/svg/minus.svg" alt="-" />
                                    </button>
                                </div>
                                <p className={styles.bookPrice}>{Math.round((+ data.price * booksCount[index]) * 100) / 100}</p>
                                <p className={styles.delivery}>deliver</p>
                            </TableRow>
                        )
                    })}
                    </>)
                    :
                    <p className={styles.noData}>No data!</p>
                    }
                    <h2 className={styles.totalPrice}>Total price: {Math.round((totalPrice) * 100) / 100}</h2>
                    <button className="standartbtn">checkout</button>
            </div>
        </Layout>
    )
}

export default Cart