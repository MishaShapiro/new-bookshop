import { useState } from "react";
import CartBook from "../../components/CartBook";
import Layout from "../../components/Layout";
import TableRow from "../../components/TableRow";
import styles from "../styles/cart.module.css"
import { useDispatch, useSelector } from "react-redux";

function incr(arr : number[] = [], ind: number = 0) {
    arr[ind] += 1
    return arr.slice()
}

function decr(arr : number[] = [], ind: number = 0) {
    arr[ind] -= 1
    return arr.slice()
}

function Cart() {

    const dispatch = useDispatch();
    const cart = useSelector((state : any) => state.cart);
    const MockData : any[] = cart.books

    const [booksCount, setbooksCount] = useState(Array(MockData.length).fill(1))

    let totalPrice = 0

    return (
        <Layout>
            <div className={styles.container}>
                <h2 className={styles.heading}>SHOPPING CART</h2>
                    {MockData[0].id !== "No Data" ?
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