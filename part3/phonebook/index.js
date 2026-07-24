const express = require('express');
const app = express();

app.use(express.json())

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const person = persons.find(person => person.id === id);
//   res.json(person);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.get('/info', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<p>Phonebook has info for ' + persons.length + ' people</p>'
    + '<p>' + new Date() + '</p>');
//   res.send('<p>' + new Date() + '</p>');
});

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  persons = persons.filter(person => person.id !== id);
  res.status(204).end();
});

const generateId = () => {
  const maxId = Math.floor(Math.random() * 9991) + 10;
  return String(maxId)
}

app.post('/api/persons', (req, res) => {
  const person = req.body;

  console.log(person);

  if (!person.name){
    return res.status(400).json({
      error: 'name missing'
    })
  } else if (!person.number){
    return res.status(400).json({
      error: 'number missing'
    })
  } else if (persons.find(person => person.name === person.name)){
    return res.status(400).json({
      error: 'name must be unique'
    })
  }
    const newPerson = {
      id: generateId(),
      name: person.name,
      number: person.number,
    }
    
  persons = persons.concat(newPerson);
  console.log(newPerson);
  res.json(newPerson)
  // res.json(note);
})


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
