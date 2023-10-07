const Header = (props) => {
  return (
    <>
      <h1>{props.name}</h1>
    </>
  );
};

const Content = (props) => {
  const [first, second, third] = props.parts;
  return (
    <>
      <Part name={first.name} exercises={first.exercises} />
      <Part name={second.name} exercises={second.exercises} />
      <Part name={third.name} exercises={third.exercises} />
    </>
  );
};

const Part = (props) => {
  return (
    <>
      <p>
        {props.name} {props.exercises}
      </p>
    </>
  );
};

const Total = (props) => {
  const [first, second, third] = props.parts;
  const total = first.exercises + second.exercises + third.exercises;
  return (
    <>
      <p>Number of exercises {total}</p>
    </>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
