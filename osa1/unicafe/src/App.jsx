import { useState } from "react";

const Header = ({ header }) => <h1>{header}</h1>;

const Button = ({ name, handleClick }) => (
  <button onClick={handleClick}>{name}</button>
);

const Display = ({ name, value }) => (
  <div>
    {name} {value}
  </div>
);

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  const all = good + neutral + bad;
  const average = (good * 1 + neutral * 0 + bad * -1) / all;
  const positive = good / all;

  return (
    <div>
      <Header header="give feedback" />
      <Button name="good" handleClick={handleGoodClick} />
      <Button name="neutral" handleClick={handleNeutralClick} />
      <Button name="bad" handleClick={handleBadClick} />
      <Header header="statistics" />
      <Display name="good" value={good} />
      <Display name="neutral" value={neutral} />
      <Display name="bad" value={bad} />
      <Display name="all" value={all} />
      <Display name="average" value={average} />
      <Display name="positive" value={`${positive * 100} %`} />
    </div>
  );
};

export default App;
