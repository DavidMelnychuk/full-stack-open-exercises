import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>{text}</button>
)

const Statistics = ({good, neutral, bad, all}) => {
    if(all === 0){
        return(
            <div>
                <h1>statistics</h1>
                No feedback given
            </div>
        )
    }


    return(
    <div>
        <h1>statistics</h1>
        <Statistic text="good" value={good}/>
        <Statistic text="netural" value={neutral}/>
        <Statistic text="bad" value={bad}/>
        <Statistic text="all" value={all}/>
        <Statistic text="average" value={((good * 1) + (neutral * 0) + (bad * -1)) / all}/>
        <Statistic text="positive" value={(good / all) * 100}/>
    </div>
    )

}

const Statistic = ({text, value}) => {
    return(
        <p>{text} {value}</p>
    )
}

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    const [all, setAll] = useState(0);

    const handleGoodClick = () => {
        setGood(good + 1)
        setAll(all + 1)
    }

    const handleNeturalClick = () => {
        setNeutral(neutral + 1)
        setAll(all + 1)
    }

    const handleBadClick = () => {
        setBad(bad + 1)
        setAll(all + 1)
    }

    return (
        <div>
            <h1>give feedback</h1>
            <Button onClick={handleGoodClick} text='good'/>
            <Button onClick={handleNeturalClick} text='neutral'/>
            <Button onClick={handleBadClick} text='bad'/>
            <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
          );
        };
        
ReactDOM.render(<App />, document.getElementById("root"));
