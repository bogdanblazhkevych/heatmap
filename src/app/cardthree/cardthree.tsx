// 'use client'

// import { useRef } from 'react';
import styles from './styles.module.css'
import { MdOutlineArrowOutward } from "react-icons/md";

interface CardThreePropsInterface {
    title: string,
    paragraph: string,
    svg?: JSX.Element,
    clickable: boolean,
    id: string
}

export default function CardThree(props: CardThreePropsInterface) {
    const { title, paragraph, svg, clickable, id } = props
    // const testref = useRef<HTMLDivElement>(null)
    return (
        <div id={id} className={styles.cardwrapper} data-clickable={clickable}>
            {svg}
            <h1 id={`${id}h1`} className={styles.cardh1}>{title}</h1>
            <p id={`${id}p`} className={styles.cardp}>{paragraph}</p>
            <div id={`${id}arrow`} className={styles.cardarrow}>
                <MdOutlineArrowOutward />
            </div>
        </div>
    )
}