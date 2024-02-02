import { useEffect, useState } from 'react'
import Book from '../../components/Book'
import Layout from '../../components/Layout'
import Theam from '../../components/Theam'
import styles from "../styles/index.module.css"
import Swiper from '../../components/Swiper/Swiper'
import Slide from '../../components/Swiper/Slide'
import { Montserrat } from 'next/font/google';
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { setCurTheam } from '@/redux/TheamSlice'

const font700 = Montserrat({
    weight: ["700"],
    subsets: ["latin", "cyrillic"],
})

const theams = ["Architecture", "Art & Fashion", "Biography", "Business", "Crafts & Hobbies", "Drama", "Fiction", "Food & Drink", "Health & Wellbeing", "History & Politics", "Humor", "Poetry", "Psychology", "Science", "Technology", "Travel & Maps"]

interface BookType {
  id: string,
  authors: string,
  title: string,
  ratingsCount: string,
  averageRating: string,
  description: string,
  price: string,
}


export default function Home() {


  const cur_theam = useSelector((state: any) => state.theam)
  const dispatch = useDispatch()

  const [theam, setTheam] = useState(cur_theam.theam)
  const [booksData, setBooksData] = useState([])
  const [booksCount, setBooksCount] = useState(6)
  const [reload, changeReload] = useState(true) // Небольшой костыль, который исправляет загрузку книг
  
  function addBooks() {
    setBooksCount(booksCount + 6)
  }
  
  const Values : any = {
    "Architecture": "Architecture",
    "Art & Fashion": "Art",
    "Biography": "Biography & Autobiography",
    "Business": "Business",
    "Crafts & Hobbies": "Crafts & Hobbies",
    "Drama": "Drama",
    "Fiction": "Fiction",
    "Food & Drink": "Cooking",
    "Health & Wellbeing": "Health & Fitness",
    "History & Politics": "History",
    "Humor": "Humor",
    "Poetry": "Poetry",
    "Psychology": "Psychology",
    "Science": "Science",
    "Technology": "Technology",
    "Travel & Maps": "Travel",
  }

  function sendFetch() {
    setBooksData([])
    fetch("/api/books?" + new URLSearchParams({
      subject: Values[theam], 
      page: `${booksCount}`,
    }), 
    {
      method: 'POST',
    })
    .then((data) => {return data.json()})
    .then((data) => {
      console.log(data)
      setBooksData(data.data.items)
    })
    .catch((res) => {console.log("error", res)})
  }

  useEffect(() => {
    if (booksCount === 6) {
      changeReload(!reload) // Так как изменение booksCount не перезагружает страницу, нам нужно запустить загрузку через reload
    }
    setBooksCount(6)
    dispatch(setCurTheam({theam: theam}))
  }, [theam])

  useEffect(() => {
    sendFetch()
  }, [booksCount, reload]) 

  return (
    <Layout>
      <main>
        <Swiper timeout={4000}>
          <Slide url='/images/banner.png'/>
          <Slide url='/images/banner 2.png'/>
          <Slide url='/images/banner 3.png'/>
        </Swiper>
        <div className={styles.books}>
            <nav className={styles.books__nav}>
                <ul className={styles.books__elements}>
                    {theams.map((item, index) => {
                        return <Theam onClick={() => {setTheam(item)}} text={item} active={item === theam} key={index}/>
                      })
                    }
                </ul>
            </nav>
            <div className={styles.container}>
                <div className={styles.books__container}>
                  {booksData.length ?
                  <>
                    {booksData.map((item: any, index) => {
                      const infodata = item.volumeInfo

                      let price = ""
                      let priceCode = ""
                      if (item.saleInfo.retailPrice) { // Выводим корректную цену (Если её нет, то ничего не выводим)
                          price = `${item.saleInfo.retailPrice.amount}`
                          priceCode = `${item.saleInfo.retailPrice.currencyCode}`
                      }

                      let description = ""
                      let title = ""
                      let thumbnail = "./images/nophoto.png"
                      let averageRating = ""
                      let ratingsCount = ""
                      let authors = ""
                      
                      if (infodata.description) {
                          infodata.description.length > 100 ? description = infodata.description.slice(0, 100) + "..." : description = infodata.description
                      }
              
                      if (infodata.title) {
                          infodata.title.length > 25 ? title = infodata.title.slice(0, 25) + "..." : title = infodata.title
                      }
              
                      if (infodata.imageLinks) {
                          thumbnail = infodata.imageLinks.thumbnail
                      }
              
                      if (infodata.averageRating) {
                          averageRating = infodata.averageRating
                      }
              
                      if (infodata.ratingsCount) {
                          ratingsCount = infodata.ratingsCount + "M review"
                      }

                      if (infodata.authors) {
                        authors = infodata.authors[0]
                      }

                      return <Book id={item.id} title={title} description={description} imageLinks={thumbnail} authors={authors} averageRating={averageRating} ratingsCount={ratingsCount} price={price} priceCode={priceCode} key={index}/>
                    })}
                  </>
                    :
                    <div className={styles.loading}>
                      <Image src={"/svg/Loading.svg"} alt={"Loadind"} width={300} height={300}/>
                    </div>
                  }
                </div>
                <div className={styles.newloader}>
                    <button className={`${styles.newloader__btn} standartbtn ${font700.className}`} onClick={addBooks}>Load more</button>
                </div>
            </div>
        </div>
      </main>
    </Layout>
  )
}
