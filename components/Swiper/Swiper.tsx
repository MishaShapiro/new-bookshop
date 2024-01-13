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
            <>{Children.map(children, (child, i) => i === currentSlide && child)}</>
            <button onClick={() => {moveToPrevSlide()}}>Prev</button>
            <button onClick={() => {moveToNextSlide()}}>Next</button>
            <>{Children.map(children, (child, i) => {return <button onClick={() => {setCurrentSlide(i)}}>{i}</button>})}</>
        </div>
    )
}

export default Swiper