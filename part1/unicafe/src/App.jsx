import { useState } from 'react'

const Header = (props) => {
  return (
    <h1>
      {props.title}
    </h1>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {

  if (props.value === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={props.value} />
        <StatisticLine text="average" value={props.average} />
        <StatisticLine text="positive" value={props.positive} />
      </tbody>
    </table>
  )
}

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}



const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const increaseGood = () => {
    const updateGood = good + 1
    setGood(updateGood)
    setTotal(updateGood + neutral + bad)
  }

  const increaseNeutral = () => {
    const updateNeutral = neutral + 1
    setNeutral(updateNeutral)
    setTotal(good + updateNeutral + bad)
  }


  const increaseBad = () => {
    const updateBad= bad + 1
    setBad(updateBad)
    setTotal(good + neutral + updateBad)
  }

  const average = () => {
    return (good - bad) / total
  }
  const positive = () => {
    const positiveValue = (good / total) * 100
    return `${positiveValue}%`
  } 


  return (
    <div>
      <Header title="give feedback" />
      <Button onClick={increaseGood} text="good" />
      <Button onClick={increaseNeutral} text="neutral" />
      <Button onClick={increaseBad} text="bad" />
      <Header title="statistics"/>
      <Statistics value={total} good={good} neutral={neutral} bad={bad} average={average()} positive={positive()} />
    </div>
  )
}

export default App
