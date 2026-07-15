const Course = (props) => {
  return (
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  // console.log(props.parts)
  return (
    <div>
        {props.parts.map(note =>
          <p key={note.id}>
            {note.name}, {note.exercises}
          </p>
        )}
    </div>
  )
}

const Content = (props) => {
  // console.log(props.parts)
  return (
    <div>
      <Part parts={props.parts} />
    </div>
    )
}

const Total = (props) => {
  // console.log(props.parts)
  // let sum = 0
  // props.parts.map(note => {
  //   sum += note.exercises
  // })

  const totalExercises = props.parts.reduce((total, item) => {
    return total + item.exercises;
  }, 0);

  return (
    <div>
      <b>total of {totalExercises} exercises</b>
    </div>
  )
}

export default Course
