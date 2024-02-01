import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import styles from "../styles/user.module.css"
import { useRouter } from "next/router";
import { quit } from "@/redux/UserSlice";

function User() {
    const dispatch = useDispatch()
    const router = useRouter()
    const user = useSelector((state : any) => state.user)
    return (
        <Layout>
            <div className={styles.container}>
                <div className={styles.profile}>
                    <h2 className={styles.profile_title}>Profile</h2>
                    <div className={styles.info_img}>
                        <img src="/images/user.png" alt="user.png" />
                        <div className={styles.main_info}>
                            <p className={styles.info_title}>Your name</p>
                            <p className={styles.info_data}>{user.data.name}</p>
                            <p className={styles.info_title}>Your email</p>
                            <p className={styles.info_data}>{user.data.mail}</p>
                            <button className={styles.button} onClick={() => {router.push("/user_edit")}}>Edit profile</button>
                            <button className={`${styles.quitbutton} ${styles.button}`} onClick={() => {
                                dispatch(quit())
                                router.push("/")
                            }}>Quit</button>
                        </div>
                    </div>
                </div>
                <div className={styles.about_me}>
                    <p className={styles.info_title}>About me</p>
                    <p className={styles.about_me_text}>{user.data.info}</p>
                </div>
            </div>
        </Layout>
    )
}

export default User