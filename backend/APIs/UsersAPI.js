const { Router } = require("express");
const UserModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const SaltRounds = 10;

const usersAPI = Router();

usersAPI.post("/users/AddUser", async (req, res) => {
  let newUser = req.body;
  try {
    const doesUserExist = await UserModel.findOne({ email: newUser.email });
    if (doesUserExist) {
    } else {
      const hashedPassword = await bcrypt.hash(newUser.password, SaltRounds);
      newUser.password = hashedPassword;
      const newUserData = new UserModel(newUser);
      await newUserData.save();
      console.log("UserCreated");
      res.send({ message: "userCreated" });
    }
  } catch (err) {
    console.error(`Error in AddUser API ${err}`);
  }
});

usersAPI.post("/users/Signin", async(req, res) => {
    let userCreds = req.body
    try {
        // console.log(userCreds)
        const result = await UserModel.findOne({email: userCreds.emailLogin})
        if (result) {
            const passComparaison = await bcrypt.compare(userCreds.password, result.password)
            if (passComparaison) {
                const jwtToken = jsonwebtoken.sign(result.email, process.env.ACCESS_TOKEN);
                res.send({
                    token: jwtToken,
                    user: result,
                    giveAccess: true
                })
            } else {
                res.send({
                    giveAccess: false
                })
            }
        } else {
           res.send({message: 'Usernoexist'}) 
        }
    } catch (err) {
        console.error(`Error in loginUser API ${err}`)
    }
})

module.exports = usersAPI;
