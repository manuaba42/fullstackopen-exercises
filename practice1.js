// const arto = {
//   name: 'Arto Hellas',
//   age: 35,
//   education: 'PhD',
//   greet: function() {
//     console.log('hello, my name is ' + this.name)
//   },
//   doAddition: function(a, b) {
//     console.log(a + b)
//   },
// }

// arto.greet()
// setTimeout(arto.greet.bind(arto), 1000)


// class Person{
//     constructor(name, age) {
//     this.name = name
//     this.age = age
//   }
//   greet() {
//     console.log('hello, my name is ' + this.name)
//   }
// }

// const adam = new Person('Adam', 25)
// adam.greet()


const Hello = (props) => {
    const bornYear = () =>{
        const year = new Date().getFullYear()
        return year - props.age
    }

    return (
        <div>
            <p>Hello {props.name}, you are {props.age} years old</p>
            <p>So you were probably born in {bornYear()}</p>
        </div>
    )
}
