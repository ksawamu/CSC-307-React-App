const express = require('express');
const app = express();
const port = 5001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});
//new
const users = { 
   users_list :
   [
      { 
         id : 'xyz789',
         name : 'Charlie',
         job: 'Janitor',
      },
      {
         id : 'abc123', 
         name: 'Mac',
         job: 'Bouncer',
      },
      {
         id : 'ppp222', 
         name: 'Mac',
         job: 'Professor',
      }, 
      {
         id: 'yat999', 
         name: 'Dee',
         job: 'Aspring actress',
      },
      {
         id: 'zap555', 
         name: 'Dennis',
         job: 'Bartender',
      }
   ]
}
//new

// app.get('/users', (req, res) => {
//     res.send(users);
// });
// new
app.get('/users', (req, res) => {
    const name = req.query.name;
    if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}
//new

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

//new
app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(200).end();
});

function addUser(user){
    users['users_list'].push(user);
}

// DELETE method
app.delete('/users/:id', (req, res) => {
    //const id2 = id;
    const id2 = req.params['id']; 
    console.log(id2);
    for (let i = 0; i < users.users_list.length; i++)
    {
        console.log(users.users_list[i].id);

        if (users.users_list[i].id === id2)
        {
            deleteUser(i);
            res.status(204).end();
        }
    }
    res.status(404).end();
    // const userToDelete = findUserById(id);
    // deleteUser(userToDelete);
    // res.status(200).end();
});


function deleteUser(index){
    users['users_list'].splice(index, 1);
}
// end DELETE

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});