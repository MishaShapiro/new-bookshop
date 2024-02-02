import Link from "next/link"
import styles from "./Header.module.css"
import { useRouter } from "next/router"
import { DOMElement, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addUser, setUser, upload } from "@/redux/UserSlice"
import store from "@/redux/store"
import { Montserrat } from 'next/font/google';
import Image from "next/image"
import { cartUpload, setCart } from "@/redux/CartSlice"

const font700 = Montserrat({
    weight: ["700"],
    subsets: ["latin", "cyrillic"],
})

const font900 = Montserrat({
    weight: ["900"],
    subsets: ["latin", "cyrillic"],
})

const font500 = Montserrat({
    weight: ["500"],
    subsets: ["latin", "cyrillic"],
})

function Header() {
    const dispatch = useDispatch()
    const user = useSelector((state : any) => state.user)
    const cart = useSelector((state : any) => state.cart)

    useEffect(() => {
        dispatch(setCart({books: user.data.cart}))
    }, [])

    const router = useRouter()
    const pathname = useRouter().pathname

    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [repeatPass, setRepeatPass] = useState("")
    const [userName, setUserName] = useState("")

    const ref: React.RefObject<any> = useRef(null)
    const [isOpen, setIsOpen] = useState(false)
    const [isRegister, setRegister] = useState(false)

    useEffect(() => {
        function clickOutside(e: MouseEvent) {
            if (isOpen && ref.current && !ref.current.contains(e.target)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", clickOutside)
        return () => {document.removeEventListener("mousedown", clickOutside)}
    }, [isOpen])

    const [isInCorrect, setIsInCorrect] = useState("")

    function sendAuthFetch(email = "", pass = "", allUsers=[]) {
        fetch("/api/auth", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: pass,
                allUsers: allUsers,
            })
        })
        .then((res) => {return res.json()})
        .then((res) => {
            if (res.success) {
                dispatch(setUser({data: 
                    {
                        mail: email,
                        pass: pass,
                    }
                }))
                router.push("/user")
            } else {
                setIsInCorrect(res.message)
            }
        })
        .catch((res) => {
            console.log(res)
        })
    }

    function sendRegisterFetch(email = "", pass = "", repeatPass="", userName = "", cart = [{id: "No Data", count: 0,}], allUsers = []) {
        fetch("/api/register", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: pass,
                repeatPass: repeatPass,
                allUsers: allUsers,
            })
        })
        .then((res) => {return res.json()})
        .then((res) => {
            if (res.success) {
                dispatch(addUser({newUser: 
                    {
                        mail: email,
                        pass: pass,
                        name: userName,
                        info: "Some information about user...",
                        cart: cart
                    }
                }))
                dispatch(setUser({data:
                    {
                        mail: email,
                        pass: pass,
                    }
                }))
                router.push("/user")
            } else {
                setIsInCorrect(res.message)
            }
        })
        .catch((res) => {
            console.log(res)
        })
    }

    return (
        <header className={styles.header}>
            {/* <button onClick={() => {dispatch(upload())}}>Clear user</button>
            <button onClick={()=> {console.log(store.getState())}}>Storage</button> */}
            <div className={styles.header__container}>
                <p className={`${styles.container__name} ${font700.className}`}>
                    Bookshop
                </p>
                <nav className={`${styles.container__links} ${font700.className}`}>
                    <ul id={styles.links}>
                        <li className={`${styles.links__link} ${pathname === "/" ? `${styles.links__link_active} ${font900.className}` : ""}`}>
                            <Link href={"/"}>books</Link >
                        </li>
                        <li className={`${styles.links__link} ${pathname === "/audiobooks" ? `${styles.links__link_active} ${font900.className}` : ""}`}>
                            <Link href={"/audiobooks"}>audiobooks</Link>
                        </li>
                        <li className={`${styles.links__link} ${pathname === "/gifts" || pathname === "/404" ? `${styles.links__link_active} ${font900.className}` : ""}`}>
                            <Link href={"/gifts"}>Stationery & gifts</Link>
                        </li>
                        <li className={`${styles.links__link} ${pathname === "/blog" || pathname === "/404" ? `${styles.links__link_active} ${font900.className}` : ""}`}>
                            <Link href={"/blog"}>blog</Link>
                        </li>
                    </ul>
                </nav>
                <div className={styles.container__icons}>
                    <div id={styles.icon_user} className={`${styles.icons} ${pathname === "/user" ? styles.links__link_active : ""}`} ref={ref}>
                        <Image src={"/svg/user.svg"} alt={"user.svg"} onClick={() => {user.data.mail ? router.push("/user") : setIsOpen(!isOpen)}} width={12} height={15}/>
                        {isOpen ?
                            (isRegister ?
                                <div className={`${styles.loginWindow} ${font700.className}`}>
                                    <h3 className={`${styles.loginHeading} ${font700.className}`}>Register</h3>
                                    <p className={`${styles.loginText} ${font700.className}`}>your name</p>
                                    <input value={userName} onChange={(e) => {setUserName(e.target.value)}} className={styles.loginInput} type="text" />
                                    <p className={`${styles.loginText} ${font700.className}`}>Email</p>
                                    <input value={email} onChange={(e) => {setEmail(e.target.value)}} className={styles.loginInput} type="text" />
                                    <p className={`${styles.loginText} ${font700.className}`}>Password</p>
                                    <input value={pass} onChange={(e) => {setPass(e.target.value)}} className={styles.loginInput} type="password" />
                                    <p className={`${styles.loginText} ${font700.className}`}>Repeat Password</p>
                                    <input value={repeatPass} onChange={(e) => {setRepeatPass(e.target.value)}} className={styles.loginInput} type="password" />
                                    {isInCorrect ? <p className={styles.errMess}>{isInCorrect}</p> : <></>}
                                    <button className={styles.loginBtn} onClick={() => {sendRegisterFetch(email, pass, repeatPass, userName, user.data.cart, user.allUsers)}}>Register</button>
                                    <button onClick={() => {setRegister(!isRegister)}} className={styles.changeBtn}>login</button>
                                </div>
                                :
                                <div className={`${styles.loginWindow} ${font700.className}`}>
                                    <h3 className={`${styles.loginHeading} ${font700.className}`}>Login</h3>
                                    <p className={`${styles.loginText} ${font700.className}`}>Email</p>
                                    <input value={email} onChange={(e) => {setEmail(e.target.value)}} className={styles.loginInput} type="text" />
                                    <p className={`${styles.loginText} ${font700.className}`}>Password</p>
                                    <input value={pass} onChange={(e) => {setPass(e.target.value)}} className={styles.loginInput} type="password" />
                                    {isInCorrect ? <p className={styles.errMess}>{isInCorrect}</p> : <></>}
                                    <button className={styles.loginBtn} onClick={() => {sendAuthFetch(email, pass, user.allUsers)}}>Log in</button>
                                    <button onClick={() => {setRegister(!isRegister)}} className={styles.changeBtn}>register</button>
                                </div>
                            )
                            :
                            <></>
                        }
                    </div>
                    <div id={styles.icon_search} className={styles.icons}>
                        <Image src={"/svg/search.svg"} alt={"search.svg"} width={15} height={15}/>
                    </div>
                    <div id={styles.icon_shopbag_cont} className={user.data.mail ? "" : styles.disabled}>
                        <Link href={"/cart"}> 
                            <div id={styles.icon_shopbag} className={styles.icons}>
                                <Image src={"/svg/shop bag.svg"} alt={"shop_bag.svg"} width={14} height={17}/>
                            </div>
                            <div id={styles.icon_circle} className={`${font500.className} ${styles.icons} ${styles.icons_circle_1} ${cart.books[0].id !== 'No Data' ? styles.icon_circle_active : ""}`}>
                                <p id={styles.icon_circle_num} className={cart.books.length >= 10 ? styles.icon_circle_num10 : styles.icon_circle_num1}>{cart.books.length}</p>
                                <Image src={"/svg/circle.svg"} alt={"circle.svg"} width={16} height={16}/>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header