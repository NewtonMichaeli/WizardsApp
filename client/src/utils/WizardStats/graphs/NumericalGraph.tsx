// Graph that shows statistics for a numerical range

import React from "react"
import { getStyles } from "../../../controllers"
// Styles:
import Styles from '../../../styles/Utils/WizardStats/graphs/NumericalGraph.module.css'


const NumericalGraph: React.FC<{data: number[]}> = ({data}) => {

  const total = data.reduce((total, num) => total + num)                        // find total value
  const mean: number = total / data.length    // find mean (average)
  // const stdev: number = data ? Math.sqrt(data.reduce((total, num) => total + Math.pow(num - mean, 2)) / (data.length - 1)) : 0   // find SD
  const stdev: number = (data && data.length) ? Math.sqrt(data.map(num => Math.pow(num - mean, 2)).reduce((a, b) => a + b) / data.length) : 0
  // unique set 
  const data_set: number[] = data.filter((item, pos, self) => self.indexOf(item) == pos)
  console.log(total, mean, stdev, data_set)

  const RenderStatBlock: React.FC<{val: number, isOdd: boolean}> = ({val, isOdd}) => {
    // Choices percentage
    // const percentage = (data.reduce((total, num) => total + (num === val ? 1 : 0)) / data.length * 100)
    const percentage = data.filter(x => x === val).length * 100
    const val_stdev = stdev ? (mean-val) / stdev : 0
    console.log(percentage, val_stdev)

    return (
      <section className={getStyles(Styles, `Stat-block ${isOdd
        ? "odd"
        : "even"}`)} style={{height: percentage + '%', width: "2rem", borderRight: `${val_stdev+2}px solid #222`}}>
        <p className={Styles["name"]}>{val}</p>
        <p className={Styles["percentage"]}>{percentage}</p>
        <p className={Styles["val_stdev"]}>{val_stdev}</p>
      </section>
    )
  }

  return (
    <div className={Styles["Numerical-Graph"]}>
      {data_set.map((val, i) => <RenderStatBlock key={i} val={val} isOdd={i % 2 == 1} />)}
      {/* border for stdev */}
      {/* <section className={Styles["Stat-block-fixed-border"]} /> */}
    </div>
  )
}

export default NumericalGraph