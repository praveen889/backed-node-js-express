// { npm init } It will create the package.json file
//{ npm install nodemon --g } It will install nodemon globally beacuse of this we don't have to restart server again-n-again.
//{ npm install express } It will install express node_modules
const express = require('express')

//it comes from data.js file
const data = require('./data')


const app = express()
app.use(express.json())

//It defines that server is connected at port localhost:3000
app.listen(3000, ()=>{
    console.log('Server is Connected')
})

//If the server is connected at localhost:3000 it shows the hardcoded json data.
app.get('/', (req, res) =>{
    res.json({message: "Api is Working"})
})





//         { { {     Use "nodemon" command in the terminal to start the server.    } } }         //





//At localhost:3000/api/data with get operation it shows the data from data.js file.
app.get('/api/data', (req, res)=>{
    res.json(data)
})

//At localhost:3000/api/data with post operation it will post the data in data.js file with a new index.
//To use the post operation it is preferred to use the postman.
app.post('/api/data', (req, res)=>{


    const user = {
        id : data.length + 1,
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email,
        gender : req.body.gender
    }
    data.push(user)
    res.json(user)
})

//At localhost:3000/api/data/{give_id} with put operation it will update the data in data.js file of a given id. 
//{ note: hardcoded json data from the data.js file remain same as starting after server is restarted}
//To use the put operation it is preferred to use the postman.

app.put('/api/data/:id', (req, res)=>{
    let id = req.params.id
    let first_name = req.body.first_name
    let last_name = req.body.last_name
    let email = req.body.email
    let gender = req.body.gender
    
    let index = data.findIndex((data)=>{
        return (data.id == Number.parseInt(id))
    })

    if(index >= 0){
        let uid = data[index]
        uid.first_name = first_name
        uid.last_name = last_name
        uid.email = email
        uid.gender = gender

        res.json(uid)
    }else{
        res.status(404)
        res.end()
    }

    console.log(id);
    res.json(id)
})


//At localhost:3000/api/data/{give_id} with delete operation it will data the data in data.js file of a given id.
//{ note: hardcoded json data from the data.js file remain same as starting after server is restarted}
//To use the delete operation it is preferred to use the postman.
app.delete("/api/data/:id", (req, res) =>{
    let id = req.params.id
    let index = data.findIndex((data)=>{
        return (data.id == Number.parseInt(id))
    })

    if(index >= 0){
        let uid = data[index]
        data.splice(index , 1)
        res.json(uid)
    }else{
        res.status(404)
        res.end()
    }

})