import { useState } from 'react'
import Book from '../../components/Book'
import Layout from '../../components/Layout'
import Theam from '../../components/Theam'
import styles from "../styles/index.module.css"
import Swiper from '../../components/Swiper/Swiper'
import Slide from '../../components/Swiper/Slide'

const theams = ["Architecture", "Art & Fashion", "Biography", "Business", "Crafts & Hobbies", "Drama", "Fiction", "Food & Drink", "Health & Wellbeing", "History & Politics", "Humor", "Poetry", "Psychology", "Science", "Technology", "Travel & Maps"]

export default function Home() {

  const [theam, setTheam] = useState(theams[0])

  return (
    <Layout>
      <main>
        <Swiper timeout={3000}>
          <Slide text={"First slide"} url='/images/banner.png'/>
          <Slide text={"Seconde slide"} url='/images/banner 2.png'/>
          <Slide text={"Third slide"} url='/images/banner 3.png'/>
        </Swiper>
        <div className={styles.books}>
            <nav className={styles.books__nav}>
                <ul className={styles.books__elements}>
                    {theams.map((item) => {
                        return <Theam onClick={() => {setTheam(item)}} text={item} active={item === theam}/>
                      })
                    }
                </ul>
            </nav>
            <div className={styles.container}>
                <div className={styles.books__container}>
                  <Book id='1' imageLinks="http://books.google.com/books/content?id=fmevEAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api" authors='Stefano Calicchio' title="4 adımda problem çözme" description="Problem çözme nedir ve nasıl çalışır? Kimler kullanabilir ve ne gibi sonuçlar doğurur? Problem çözme stratejileri insanların hayatlarında nasıl bir fark yaratabilir? Bu rehber, problem çözmenin basit tanımının ötesine geçmek ve en iyi problem çözücüler ile önde gelen kurumsal ve kurumsal kuruluşlar tarafından problemleri çözmek için hangi stratejilerin uygulandığını açıklamak için basit, açık ve kapsamlı bir şekilde yazılmıştır. El kitabı özellikle okuyucunun elinden tutmakta ve onu konunun kilit noktalarıyla tanıştırmaktadır: - problem çözmenin ne olduğu ve nasıl işlediği; - bir problemin nasıl doğru bir şekilde temsil edileceği ve çözüm hipotezlerinin nasıl doğru bir şekilde tanımlanacağı - içgörünün ne olduğu ve bu düşünme biçiminin problem çözmede nasıl bir rol oynadığı - deneyimli ve deneyimsiz problem çözücüleri birbirinden ayıran özellikler ve problem çözme becerilerinin nasıl geliştirilebileceği. Bu kılavuzda açıklanan en iyi problem çözme stratejilerini doğru bir şekilde kullanmayı öğrenmek, nasıl yapılacağını bildiğiniz sürece herkes için erişilebilir bir etkinlik haline gelebilir. Binlerce sayfalık teorik kılavuzlarla zaman kaybetmeyi bırakın ve basit, teşvik edici ve anlaşılır bir okuma ile gerçekten neyin önemli olduğunu keşfedin." price="74.76 RUB"/>
                  <Book id='2' authors='Stefano Calicchio' title="4 adımda problem çözme" ratingsCount='1M views' averageRating='2' description="Problem çözme nedir ve nasıl çalışır? Kimler kullanabilir ve ne gibi sonuçlar doğurur? Problem çözme stratejileri insanların hayatlarında nasıl bir fark yaratabilir? Bu rehber, problem çözmenin basit tanımının ötesine geçmek ve en iyi problem çözücüler ile önde gelen kurumsal ve kurumsal kuruluşlar tarafından problemleri çözmek için hangi stratejilerin uygulandığını açıklamak için basit, açık ve kapsamlı bir şekilde yazılmıştır. El kitabı özellikle okuyucunun elinden tutmakta ve onu konunun kilit noktalarıyla tanıştırmaktadır: - problem çözmenin ne olduğu ve nasıl işlediği; - bir problemin nasıl doğru bir şekilde temsil edileceği ve çözüm hipotezlerinin nasıl doğru bir şekilde tanımlanacağı - içgörünün ne olduğu ve bu düşünme biçiminin problem çözmede nasıl bir rol oynadığı - deneyimli ve deneyimsiz problem çözücüleri birbirinden ayıran özellikler ve problem çözme becerilerinin nasıl geliştirilebileceği. Bu kılavuzda açıklanan en iyi problem çözme stratejilerini doğru bir şekilde kullanmayı öğrenmek, nasıl yapılacağını bildiğiniz sürece herkes için erişilebilir bir etkinlik haline gelebilir. Binlerce sayfalık teorik kılavuzlarla zaman kaybetmeyi bırakın ve basit, teşvik edici ve anlaşılır bir okuma ile gerçekten neyin önemli olduğunu keşfedin." price="74.76 RUB"/>
                </div>
                <div className={styles.newloader}>
                    <button className={`${styles.newloader__btn} standartbtn`}>Load more</button>
                </div>
            </div>
        </div>
      </main>
    </Layout>
  )
}
