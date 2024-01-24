import { useSelector } from "react-redux";
import Layout from "../../components/Layout";
import styles from "../styles/user.module.css"

function User() {
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
                            <p className={styles.info_data}>John Smith</p>
                            <p className={styles.info_title}>Your email</p>
                            <p className={styles.info_data}>{user.user.mail}</p>
                            <button className={styles.button}>Edit profile</button>
                        </div>
                    </div>
                </div>
                <div className={styles.about_me}>
                    <p className={styles.info_title}>About me</p>
                    <p className={styles.about_me_text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in ante consequat, ornare nisi et, ultrices libero. Nunc nibh dolor, maximus quis auctor nec, tempor quis ipsum. Proin mollis pellentesque nulla ac varius.</p>
                </div>
            </div>
        </Layout>
    )
}

export default User