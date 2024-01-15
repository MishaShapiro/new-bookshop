import CartBook from "../../components/CartBook";
import Layout from "../../components/Layout";
import TableRow from "../../components/TableRow";
import styles from "../styles/cart.module.css"

const MockData = [
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

function Cart() {
    return (
        <Layout>
            <div className={styles.container}>
                <h2 className={styles.heading}>SHOPPING CART</h2>
                <TableRow type="heading">
                    <p>ITEM</p>
                    <p>QUANTITY</p>
                    <p>PRICE</p>
                    <p>DELIVERY</p>
                </TableRow>
                {MockData.map((data) => {
                    return (
                        <TableRow type="row">
                            <CartBook img={data.img ? data.img : "/images/nophoto.png"} title={data.title} author={data.author} ratingsCount={data.ratingsCount} averageRating={data.averageRating}/>
                            <p>2</p>
                            <p>{data.price}</p>
                            <p>4</p>
                        </TableRow>
                    )
                })}
            </div>
        </Layout>
    )
}

export default Cart