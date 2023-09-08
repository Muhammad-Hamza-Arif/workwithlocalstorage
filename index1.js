// const uuid = require("uuid")

// let id = uuid.v4()

// console.log(id);
const secretKey = "nodeRestApi";
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
let id = uuid.v4()
const token = jwt.sign({ id: id }, secretKey);
console.log(token);