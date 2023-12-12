import express  from "express"
const app = express();
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const URL =process.env.DB
app.use(express.json())
let mentor = [];
let student = [];

 
  app.get('/', (req, res) => {
    res.status(200).json({
      message: 'Welcome to Mentor and Student assigning with database'
    });
  });

app.post("/create_mentor", async (req, res) => {
  try {
    const connection = await mongoclient.connect(URL);
    const db = connection.db("mentorstudents");
    const mentor = await db.collection("mentors").insertOne(req.body);
    await connection.close();
    res.json({ message: "Mentor created", id: mentor.insertedId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.post("/create_student", async (req, res) => {
  try {
    const connection = await mongoclient.connect(URL);
    const db = connection.db("mentorstudents");
    const student = await db.collection("students").insertOne(req.body);
    await connection.close();
    res.json({ message: "Student created", id: student.insertedId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

/** get all mentors */
app.get("/mentors", async (req, res) => {
  try {
    const connection = await mongoclient.connect(URL);
    const db = connection.db("mentorstudents");
    const mentor = await db.collection("mentors").find({}).toArray();
    await connection.close();
    res.json(mentor);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

/** get student */

app.get("/students", async (req, res) => {
  try {
    const connection = await mongoclient.connect(URL);
    const db = connection.db("assignment");
    const student = await db.collection("students").find({}).toArray();
    await connection.close();
    res.json(student);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

/** assign student to a mentor */
app.put("/assign_student/:id", async (req, res) => {
  try {
    const connection = await mongoclient.connect(URL);
    const db = connection.db("mentorstudents");
    const mentordata = await db
      .collection("mentors")
      .findOne({ _id: mongodb.ObjectId(req.params.id) });
    if (mentordata) {
      delete req.body._id;
      const mentor = await db
        .collection("mentors")
        .updateOne(
          { _id: mongodb.ObjectId(req.params.id) },
          { $set: req.body }
        );
      await connection.close();

      res.json(mentor);
    } else {
      res.status(404).json({ message: "mentor not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

/** show all students of particular mentor */

app.get("/mentor_student/:id", async (req, res) => {
  try {
    const connection = await mongoclient.connect(URL);
    const db = connection.db("mentorstudents");
    const mentor = await db
      .collection("mentors")
      .findOne({ _id: mongodb.ObjectId(req.params.id) });
    await connection.close();
    if (mentor) {
      res.json(`students name : ${mentor.student} assigned to ${mentor.name}`);
    } else {
      res.status(404).json({ message: "Mentor not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});
/** assign or change mentor for student */
app.put("/assign_change_mentor/:id", async(req, res) => {
    try {
        const connection = await mongoclient.connect(URL);
        const db = connection.db("mentorstudents");
        const studentdata = await db
        .collection("students")
        .findOne({ _id: mongodb.ObjectId(req.params.id) });
        if (studentdata) {
            delete req.body._id;
            const student = await db
              .collection("students")
              .updateOne(
                { _id: mongodb.ObjectId(req.params.id) },
                { $set: req.body }
              );
            await connection.close();
      
            res.json(student);
          } else {
            res.status(404).json({ message: "Student not found" });
          }
        await connection.close();
        res.json(student);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
      }
});

app.listen(process.env.PORT || 7000);