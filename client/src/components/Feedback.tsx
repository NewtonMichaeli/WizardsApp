import React from 'react'
import { ui_state_type } from '../redux/types/reducerStateTypes'
// Styles:
import Styles from '../styles/components/Feedback.module.css'


const Feedback: React.FC<ui_state_type> = ({status, msg}) => {
    if (msg) return (
        <div className={Styles["Feedback"]}>
            <p className={Styles[status ? 'good-feedback' : 'bad-feedback']}>
                {msg}
            </p>
        </div>
    )
    else return <></>
}

export default Feedback
