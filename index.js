const express = require("express");

const fs = require("fs");

const app = express();

app.use(express.json());

const users = require("./users.json");

app.get("/", (req, res) => {
  res.send(" Welcome ....!!!");

});

//    get data from users.json

app.get("/api/users", (req, res) => {
  
  const result = fs.readFileSync("./users.json", { encoding: "utf-8" });
  // console.log(result)
  const presend_res = JSON.parse(result);
  const { users } = presend_res;
  res.send(users);
  

});

// post the data in users.json

app.post("/api/users", (req, res) => {
  try{
    
    const payload = req.body;
    const data = fs.readFileSync("./users.json", { encoding: "utf-8" });
  
    const parseData = JSON.parse(data);
    const users = parseData.users;
    const newusers = [...users, payload];
  
    // console.log(newusers)
  
    parseData.users = newusers;
    const latset_data = JSON.stringify(parseData);
    fs.writeFileSync("./users.json", latset_data, "utf-8");
    res.json({message:"product create"});

    const error = new Error('Invalid request');
    error.status = 400;
    throw error
  }
  catch(error){

    res.status(error.status || 500).json({ error: error.message })
  }
 
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message });
});


app.listen(7000, () => {
  console.log("Server is listening on port:7000");
});
