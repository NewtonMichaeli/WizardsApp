import React from 'react'
import { Feedback__props } from '../interfaces/Feedback'
// Styles:
import Styles from '../styles/components/Feedback.module.css'


const Feedback: React.FC<Feedback__props> = (msg) => {
    console.log("msg: ")
    console.log(msg)
    if (msg.data.length) return (
        <div className={Styles["Feedback"]}>
            <p className={Styles[msg?.status ?
                'good-feedback' : 'bad-feedback']}>
                {msg?.data}
            </p>
        </div>
    )
    else return <></>
}

export default Feedback
