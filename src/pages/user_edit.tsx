import { useReducer, useState } from "react"
import Layout from "../../components/Layout"
import styles from "../styles/user_edit.module.css"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { editAllUser, setUser } from "@/redux/UserSlice"

function UserEdit() {
    const router = useRouter()
    const user = useSelector((state : any) => state.user)

    const [email, setEmail] = useState(user.data.mail)
    const [pass, setPass] = useState("")
    const [repeatPass, setRepeatPass] = useState("")
    const [userName, setUserName] = useState(user.data.name)
    const [aboutInfo, setAboutInfo] = useState(user.data.info)

    const [isInCorrect, setIsInCorrect] = useState("")

    const dispatch = useDispatch()
    
    function sendEditFetch(oldMail = "", email = "", pass = "", repeatPass = "", name="", info="", allUsers = []) {
        fetch("/api/edit", {
            method: "POST",
            body: JSON.stringify({
                oldMail: oldMail,
                email: email,
                password: pass,
                repeatPass: repeatPass,
                name: name,
                info: info,
                allUsers: allUsers,
            })
        })
        .then((res) => {return res.json()})
        .then((res) => {
            if (res.success) {
                dispatch(editAllUser({
                    allUsers: res.allUsers,
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
        <Layout>
            <div className={styles.container}>
                <h2 className={styles.heading}>EDIT PROFILE:</h2>
                <p className={styles.title}>Name</p>
                <input type="text" className={styles.input} value={userName} onChange={(e) => {setUserName(e.target.value)}}/>
                <p className={styles.title}>Email</p>
                <input type="text" className={styles.input} value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                <p className={styles.title}>Password</p>
                <input type="password" className={styles.input} value={pass} onChange={(e) => {setPass(e.target.value)}}/>
                <p className={styles.title}>Repeat password</p>
                <input type="password" className={styles.input} value={repeatPass} onChange={(e) => {setRepeatPass(e.target.value)}}/>
                <p className={styles.title}>Information</p>
                <textarea name="" id={styles.textarea} className={styles.input} value={aboutInfo} onChange={(e) => {setAboutInfo(e.target.value)}}></textarea>
                <div className={styles.buttons}>
                    <button className={styles.button} onClick={() => {sendEditFetch(user.data.mail, email, pass, repeatPass, userName, aboutInfo, user.allUsers)}}>Save changes</button>
                    <button className={`${styles.button} ${styles.button_cancel}`} onClick={() => {router.push("/user")}}>Cancel</button>
                </div>
                {isInCorrect ? 
                <p className={styles.error}>{isInCorrect}</p>
                :
                <></>}
            </div>
        </Layout>
    )
}

export default UserEdit