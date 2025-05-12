const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
const { v4: uuidv4 } = require("uuid");

const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, (req, res) => {
  console.log("port has started");
});

let data = [
  {
    username: "vinay",
    content: "i am vinay",
    id: uuidv4(),
  },
  {
    username: "vijay",
    content: "i am vijay",
    id: uuidv4(),
  },
];

app.get("/posts", (req, res) => {
  res.render("index", { data });
});

app.get("/posts/new", (req, res) => {
  res.render("new");
});

app.post("/posts", (req, res) => {
  req.body.id = uuidv4();
  data.push(req.body);
  res.render("index", { data });
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  data = data.filter((p) => id != p.id);
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = data.find((p) => id === p.id);
  res.render("edit",{post})
});

app.patch("/posts/:id",(req,res) => {
  let { id } = req.params;
  let post = data.find((p) => id === p.id);
  post.content = req.body.content
  res.redirect("/posts")
})

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = data.find((p) => id === p.id);
  console.log(id);
  res.render("detailpost", { post });
});
