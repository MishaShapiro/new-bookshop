import { PropsWithChildren, useEffect, useState } from "react"
import styles from "./Swiper.module.css"
import { Children } from "react"

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
                    <img src="/svg/arrow-left.svg" alt="arrow-left.svg"/>
                </button>
                <>{Children.map(children, (child, i) => i === currentSlide && child)}</>
                <button onClick={() => {moveToNextSlide()}}>
                    <img src="/svg/arrow-right.svg" alt="arrow-right.svg"/>
                </button>
            </div>
            <div className={styles.points}>
                {Children.map(children, (child, i) => {
                return (
                    <button onClick={() => {setCurrentSlide(i)}}>
                        {currentSlide === i ? <img src="/svg/point_active.svg" alt="point.svg"/> : <img src="/svg/point.svg" alt="point.svg"/>}
                    </button>
                )})}
            </div>
        </div>
    )
}

export default Swiper