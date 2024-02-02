import { useEffect, useState } from "react";
import CartBook from "../../components/CartBook";
import Layout from "../../components/Layout";
import TableRow from "../../components/TableRow";
import styles from "../styles/cart.module.css"
import { useDispatch, useSelector } from "react-redux";
import { changeIndex } from "@/redux/CartSlice";
import { Montserrat } from 'next/font/google';
import Image from "next/image";
import { setUserCart } from "@/redux/UserSlice";

const font700 = Montserrat({
    weight: ["700"],
    subsets: ["latin", "cyrillic"],
})

function Cart() {

    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user)
    const cart = useSelector((state : any) => state.cart);
    const MockData : any[] = cart.books

    useEffect(() => {
        dispatch(setUserCart({
            mail: user.data.mail,
            cart: cart.books
        }))    
    }, [cart])

    function incr(arr : number[] = [], ind: number = 0, id: number) {
        arr[ind] += 1
        dispatch(changeIndex({id: id, count: arr[ind]}))
        return arr.slice()
    }
    
    function decr(arr : number[] = [], ind: number = 0, id: number) {
        arr[ind] -= 1
        dispatch(changeIndex({id: id, count: arr[ind]}))
        return arr.slice()
    }

    const [booksCount, setbooksCount] = useState(MockData.map((item) => {return item.count}))

    useEffect(() => {
        setbooksCount(MockData.map((item) => {return item.count}))
    }, [MockData]) 

    let totalPrice = 0

    return (
        <Layout>
            <div className={`${styles.container} ${font700.className}`}>
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
                            <TableRow type="row" key={index}>
                                <CartBook img={data.img ? data.img : "/images/nophoto.png"} title={data.title} author={data.author} ratingsCount={data.ratingsCount} averageRating={data.averageRating}/>
                                <div className={styles.buttonsContainer}>
                                    <button className={styles.button} onClick={() => {setbooksCount(incr(booksCount, index, data.id))}}>
                                        <Image src="/svg/plus.svg" alt="+" width={21} height={24}/>
                                    </button>
                                    <p className={styles.booksCount}>{booksCount[index]}</p>
                                    <button className={styles.button} onClick={() => {setbooksCount(decr(booksCount, index, data.id))}}>
                                        <Image src="/svg/minus.svg" alt="-" width={22} height={25}/>
                                    </button>
                                </div>
                                <p className={styles.bookPrice}>{Math.round((+ data.price * booksCount[index]) * 100) / 100} {data.priceCode}</p>
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