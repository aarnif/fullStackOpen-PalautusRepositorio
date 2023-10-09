import { useState } from "react";

const Header = ({ header }) => <h1>{header}</h1>;

const Button = ({ name, handleClick }) => (
  <button onClick={handleClick}>{name}</button>
);

const StatisticLine = ({ name, value }) => (
  <tr>
    <td>{name}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good * 1 + neutral * 0 + bad * -1) / all;
  const positive = good / all;

  if (all === 0) {
    return (
      <>
        <div>No feedback given</div>
      </>
    );
  }

  return (
    <table>
      <tbody>
        <StatisticLine name="good" value={good} />
        <StatisticLine name="neutral" value={neutral} />
        <StatisticLine name="bad" value={bad} />
        <StatisticLine name="all" value={all} />
        <StatisticLine name="average" value={average} />
        <StatisticLine name="positive" value={`${positive * 100} %`} />
      </tbody>
    </table>
  );
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  return (
    <div>
      <Header header="give feedback" />
      <Button name="good" handleClick={handleGoodClick} />
      <Button name="neutral" handleClick={handleNeutralClick} />
      <Button name="bad" handleClick={handleBadClick} />
      <Header header="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
