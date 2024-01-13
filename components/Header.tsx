import Link from "next/link"
import styles from "./Header.module.css"
import { useRouter } from "next/router"

function Header() {
    const pathname = useRouter().pathname
    return (
        <header className={styles.header}>
            <div className={styles.header__container}>
                <p className={styles.container__name}>
                    Bookshop
                </p>
                <nav className={styles.container__links}>
                    <ul id={styles.links}>
                        <li className={`${styles.links__link} ${pathname === "/" ? styles.links__link_active : ""}`}><Link href={"/"}>books</Link></li>
                        <li className={`${styles.links__link} ${pathname === "/audiobooks" ? styles.links__link_active : ""}`}><Link href={"/audiobooks"}>audiobooks</Link></li>
                        <li className={`${styles.links__link} ${pathname === "/" ? styles.links__link_active : ""}`}><Link href={"/"}>Stationery & gifts</Link></li>
                        <li className={`${styles.links__link} ${pathname === "/" ? styles.links__link_active : ""}`}><Link href={"/"}>blog</Link></li>
                    </ul>
                </nav>
                <div className={styles.container__icons}>
                    <div  id={styles.icon_user} className={styles.icons}>
                        <img src="/svg/user.svg" alt="user.svg" />
                    </div>
                    <div id={styles.icon_search} className={styles.icons}>
                        <img src="/svg/search.svg" alt="search.svg" />
                    </div>
                    <div id={styles.icon_shopbag_cont}>
                        <div id={styles.icon_shopbag} className={styles.icons}>
                            <img src="/svg/shop bag.svg" alt="shop_bag.svg" />
                        </div>
                        <div id={styles.icon_circle} className={`${styles.icons} ${styles.icons_circle_1} ${styles.icon_circle_active}`}>
                            <img src="/svg/circle.svg" alt="circle.svg" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header