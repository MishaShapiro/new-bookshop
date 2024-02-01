import { PropsWithChildren, useEffect, useState } from "react"
import styles from "./Swiper.module.css"
import { Children } from "react"
import Image from "next/image"

function Swiper({timeout = 1000, children = {}}) {

    const [currentSlide, setCurrentSlide] = useState(0)

    const childCount = Children.count(children)

    function moveToNextSlide() {
        let nextSlide = currentSlide + 1
        if (nextSlide >= childCount) {
            nextSlide = 0
        }
        setCurrentSlide(nextSlide)
    }

    function moveToPrevSlide() {
        let nextSlide = currentSlide - 1
        if (nextSlide <= -1) {
            nextSlide = childCount - 1
        }
        setCurrentSlide(nextSlide)
    }

    useEffect(() => {
        const func = setInterval(() => {
            moveToNextSlide()
        }, timeout)
        return () => clearInterval(func)
    })

    return (
        <div className={styles.swiper}>
            <div className={styles.slides}>
                <button onClick={() => {moveToPrevSlide()}}>
                    <Image src={"/svg/arrow-left.svg"} alt={"arrow-left.svg"} width={50} height={50}/>
                </button>
                <>{Children.map(children, (child, i) => i === currentSlide && child)}</>
                <button onClick={() => {moveToNextSlide()}}>
                    <Image src={"/svg/arrow-right.svg"} alt={"arrow-right.svg"} width={50} height={50}/>
                </button>
            </div>
            <div className={styles.points}>
                {Children.map(children, (child, i) => {
                return (
                    <button onClick={() => {setCurrentSlide(i)}}>
                        {currentSlide === i ? <Image src={"/svg/point_active.svg"} alt={"point.svg"} width={12} height={12}/> : <Image src={"/svg/point.svg"} alt={"point.svg"} width={12} height={12}/>}
                    </button>
                )})}
            </div>
        </div>
    )
}

export default Swiper