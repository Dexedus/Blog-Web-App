
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

let posts = [
  {
    id: 1,
    title: "Using a Public API to Create a Weather App.",
    content: "Using public API's is fairly straight forward so long as you know how to read the documentation. Simply, use Axios to make the route handling much easier and cleaner in your code. Once the data is retrieved in a resonse variable, you can display the response data in whole or in individual pieces to suit whatever response is necessary. I hope this brief description on how to use public API's was helpful. Thanks for reading.",
    author: "Karl Fleming",
    date: "21/10/2024"
  },
  {
    id: 2,
    title: "How to Wire a Consumer Unit: Electrical Work.",
    content: "First, only do this if you are a qualified professional otherwise contact an electrician to do it for you. First, we mount the consumer unit base to the wall with suitable knockouts removed for cable entry. If cables are already in place, which they should be, slide the cables through the suitable knockout holes. Once the base is mounted to a solid material (be screwed into the wooden studs of a house for example), it is best time to mount the required potective devices (MCBs, RCBOs, RCDs etc) onto the consumer unit racks. Once these are in place, begin stripping the cables of their outer insulation, but remember to mark each stripped circuit with some marker and tape as you go. Leave plenty of slack on cables for dressing. Then, dress the conductors neatly using small cable ties to the respective sections of the consumer unit. Begin to shorten each wire, and neatly terminate into the appropriate protective devices. Mark each earth and neutral conductor so that they match to the corresponding circuit. This will make testing much easier. Terminate the mains, and apply necessary stickers to the protective devices. Perform necessary testing procedures, such as earth continuity, polarity tests and insulation resistance tests. Power on each circuit, one at a time, to confirm functionality. Mount the protective cover to the board.",
    author: "Karl Fleming",
    date: "21/10/2024",
  },
];

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/posts", (req,res) =>{
  res.json(posts)
})

app.get("/posts/:id", (req,res)=>{
  const id = parseInt(req.params.id);
  const foundPost = posts.find((post) => post.id === id)
  res.json(foundPost)
})

app.post("/posts", (req,res)=>{
  const id = posts.length + 1;
  const fullDate = new Date()
  const day = fullDate.getDate()
  const month = fullDate.getMonth() + 1
  const year = fullDate.getFullYear()
  const newPost = {
    id: id,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: `${day}/${month}/${year}`,
  }
  posts.push(newPost);
  console.log(newPost);
  res.json(newPost);
})

app.patch("/posts/:id", (req,res)=>{
  const id = parseInt(req.params.id);
  const existingPost = posts.find((post) => post.id === id)
  const fullDate = new Date()
  const day = fullDate.getDate()
  const month = fullDate.getMonth() + 1
  const year = fullDate.getFullYear()
  const updatedPost = {
    id: id,
    title: req.body.title || existingPost.title,
    content: req.body.content || existingPost.content,
    author: req.body.author || existingPost.author,
    date: `Updated on the ${day}/${month}/${year}`,
  }
  const searchIndex = posts.findIndex((post) => post.id === id);
  posts[searchIndex] = updatedPost;
  res.json(updatedPost);
})

app.delete("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const searchIndex = posts.findIndex((post) => post.id === id);

  posts.splice(searchIndex, 1)
  res.json({message: "Post Deleted"})
})



app.listen(port, () => {
    console.log(`Backend server is running on http://localhost:${port}`);
  });
