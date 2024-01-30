import Link from "next/link"
import styles from "./Header.module.css"
import { useRouter } from "next/router"
import { DOMElement, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addUser, setUser, upload } from "@/redux/UserSlice"
import store from "@/redux/store"

function Header() {
    const dispatch = useDispatch()
    const user = useSelector((state : any) => state.user)

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

    function sendRegisterFetch(email = "", pass = "", repeatPass="", userName = "", allUsers = []) {
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
                        info: "Some information about user..."
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
            <button onClick={() => {dispatch(upload())}}>Clear user</button>
            <button onClick={()=> {console.log(store.getState())}}>Storage</button>
            <div className={styles.header__container}>
                <p className={styles.container__name}>
                    Bookshop
                </p>
                <nav className={styles.container__links}>
                    <ul id={styles.links}>
                        <li className={`${styles.links__link} ${pathname === "/" ? styles.links__link_active : ""}`}>
                            <Link href={"/"}>books</Link >
                        </li>
                        <li className={`${styles.links__link} ${pathname === "/audiobooks" ? styles.links__link_active : ""}`}>
                            <Link href={"/audiobooks"}>audiobooks</Link>
                        </li>
                        <li className={`${styles.links__link} ${pathname === "/gifts" || pathname === "/404" ? styles.links__link_active : ""}`}>
                            <Link href={"/gifts"}>Stationery & gifts</Link>
                        </li>
                        <li className={`${styles.links__link} ${pathname === "/blog" || pathname === "/404" ? styles.links__link_active : ""}`}>
                            <Link href={"/blog"}>blog</Link>
                        </li>
                    </ul>
                </nav>
                <div className={styles.container__icons}>
                    <div id={styles.icon_user} className={`${styles.icons} ${pathname === "/user" ? styles.links__link_active : ""}`} ref={ref}>
                        <img src="/svg/user.svg" alt="user.svg" onClick={() => {user.data.mail ? router.push("/user") : setIsOpen(!isOpen)}} />
                        {isOpen ?
                            (isRegister ?
                                <div className={styles.loginWindow}>
                                    <h3 className={styles.loginHeading}>Register</h3>
                                    <p className={styles.loginText}>your name</p>
                                    <input value={userName} onChange={(e) => {setUserName(e.target.value)}} className={styles.loginInput} type="text" />
                                    <p className={styles.loginText}>Email</p>
                                    <input value={email} onChange={(e) => {setEmail(e.target.value)}} className={styles.loginInput} type="text" />
                                    <p className={styles.loginText}>Password</p>
                                    <input value={pass} onChange={(e) => {setPass(e.target.value)}} className={styles.loginInput} type="password" />
                                    <p className={styles.loginText}>Repeat Password</p>
                                    <input value={repeatPass} onChange={(e) => {setRepeatPass(e.target.value)}} className={styles.loginInput} type="password" />
                                    {isInCorrect ? <p className={styles.errMess}>{isInCorrect}</p> : <></>}
                                    <button className={styles.loginBtn} onClick={() => {sendRegisterFetch(email, pass, repeatPass, userName, user.allUsers)}}>Register</button>
                                    <button onClick={() => {setRegister(!isRegister)}} className={styles.changeBtn}>login</button>
                                </div>
                                :
                                <div className={styles.loginWindow}>
                                    <h3 className={styles.loginHeading}>Login</h3>
                                    <p className={styles.loginText}>Email</p>
                                    <input value={email} onChange={(e) => {setEmail(e.target.value)}} className={styles.loginInput} type="text" />
                                    <p className={styles.loginText}>Password</p>
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
                        <img src="/svg/search.svg" alt="search.svg" />
                    </div>
                    <div id={styles.icon_shopbag_cont}>
                        <Link href={"/cart"}> 
                            <div id={styles.icon_shopbag} className={styles.icons}>
                                <img src="/svg/shop bag.svg" alt="shop_bag.svg" />
                            </div>
                            <div id={styles.icon_circle} className={`${styles.icons} ${styles.icons_circle_1} ${styles.icon_circle_active}`}>
                                <img src="/svg/circle.svg" alt="circle.svg" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header