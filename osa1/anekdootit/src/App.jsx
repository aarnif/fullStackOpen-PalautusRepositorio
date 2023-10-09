import { useState } from "react";

const Header = ({ header }) => <h1>{header}</h1>;

const Button = ({ name, handleClick }) => (
  <button onClick={handleClick}>{name}</button>
);

const Anecdote = ({ anecdote, votes }) => {
  return (
    <>
      <div>{anecdote}</div>
      <div>has {votes} votes</div>
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length));
  const anecdoteIndexWithMostVotes = votes.findIndex(
    (element) => element === Math.max(...votes)
  );

  const handleChooseNextAnecdote = () => {
    let randomAnecdoteIndex = selected;
    while (randomAnecdoteIndex === selected) {
      randomAnecdoteIndex = Math.floor(Math.random() * anecdotes.length);
    }
    setSelected(randomAnecdoteIndex);
  };

  const handleVoteClick = () => {
    const copy = [...votes];
    ++copy[selected];
    setVotes(copy);
  };

  return (
    <>
      <Header header="Anecdote of the day" />
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button name="vote" handleClick={handleVoteClick} />
      <Button name="next anecdote" handleClick={handleChooseNextAnecdote} />
      <Header header="Anecdote with most votes" />
      <Anecdote
        anecdote={anecdotes[anecdoteIndexWithMostVotes]}
        votes={votes[anecdoteIndexWithMostVotes]}
      />
    </>
  );
};

export default App;
