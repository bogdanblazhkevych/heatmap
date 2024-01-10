import styles from './styles.module.css'
import { MdOutlineArrowOutward } from "react-icons/md";

interface CardThreePropsInterface {
    title: string,
    paragraph: string,
    svg?: JSX.Element,
    clickable: boolean
}

export default function CardThree(props: CardThreePropsInterface) {
    const { title, paragraph, svg, clickable } = props
    return (
        <div className={styles.cardwrapper} data-clickable={clickable}>
            {svg}
            <h1 className={styles.cardh1}>{title}</h1>
            <p className={styles.cardp}>{paragraph}</p>
            <div className={styles.cardarrow}>
                <MdOutlineArrowOutward />
            </div>
        </div>
    )
}