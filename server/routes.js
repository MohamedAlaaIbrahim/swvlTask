const express = require("express");
const { request } = require("http");
const { User, Promo } = require("./models");
const app = express();

app.post("/addUser", async (request, response) => {
    const user = new User(request.body);
  
    try {
      await user.save();
      response.send(user);
    } catch (error) {
      response.status(500).send(error);
    }
});

app.post("/addPromo", async (request, response) => {
    const promo = new Promo(request.body);
  
    try {
      await promo.save();
      response.send(promo);
    } catch (error) {
      response.status(500).send(error);
    }
});

app.get("/users", async (request, response) => {
    const users = await User.find({});
    try {
      response.send(users);
    } catch (error) {
      response.status(500).send(error);
    }
  });

app.put('/updateUser', async (request, response) => {
  const filter = {"email": request.body.email}
  const update = request.body
  console.log(filter)
  try {
    let doc = await User.findOneAndUpdate(filter, update)
    response.json(doc)
  } catch (error) {
    response.status(500).send(error);
  }
})
module.exports = app;