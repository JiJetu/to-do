const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 3000;

const app = express();

const bidStatus = {
  Pending: "Pending",
  In_Process: "In process",
  Rejected: "Rejected",
  Completed: "Completed",
};

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
  optionsSuccessStatus: 200,
};

// middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const uri = process.env.DB_URL;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // db collection
    const tasksCollection = client.db("toDo").collection("tasks");
    const taskBidsCollection = client.db("toDo").collection("bids");

    // creating jwt
    app.post("/jwt", (req, res) => {
      const email = req.body;
      const token = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "365d",
      });

      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });
    // remove jwt
    app.get("/logout", (req, res) => {
      res
        .clearCookie("token", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          maxAge: 0,
        })
        .send({ success: true });
    });

    // get all task data from db
    app.get("/tasks", async (req, res) => {
      try {
        const result = await tasksCollection.find().toArray();

        res.send(result);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).send({ message: "failed to fetch all task data" });
      }
    });

    // get a single task data from db using task id
    app.get("/task/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const query = { _id: new ObjectId(id) };

        const result = await tasksCollection.findOne(query);

        res.send(result);
      } catch (error) {
        console.error("Error fetching task:", error);
        res.status(500).send({ message: "failed to fetch task data" });
      }
    });

    // ToDo: Have to do it with token validation
    // get user specific task data from db
    app.get("/user-tasks/:email", async (req, res) => {
      try {
        const { email } = req.params;
        const query = { "postedBy.email": email };

        const result = await tasksCollection.find(query).toArray();

        res.send(result);
      } catch (error) {
        console.log("Error fetching user task data", error);
        res
          .status(500)
          .send({ message: "failed to fetch user specific tasks" });
      }
    });

    // save a task data in db
    app.post("/task", async (req, res) => {
      try {
        const taskData = req.body;

        const result = await tasksCollection.insertOne(taskData);

        res.send(result);
      } catch (error) {
        console.error("Error posting task:", error);
        res.status(500).send({ message: "failed to post task data" });
      }
    });

    // update task data in db
    app.put("/task/:id", async (req, res) => {
      try {
        const updatedTaskData = req.body;
        const { id } = req.params;
        const query = { _id: new ObjectId(id) };
        const options = { upsert: true };

        const updatedDoc = {
          $set: { ...updatedTaskData },
        };

        const result = await tasksCollection.updateOne(
          query,
          updatedDoc,
          options
        );

        res.send(result);
      } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).send({ message: "failed to update task data" });
      }
    });

    // delete task data in db
    app.delete("/task/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const query = { _id: new ObjectId(id) };

        const result = await tasksCollection.deleteOne(query);

        res.send(result);
      } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).send({ message: "failed to delete task data" });
      }
    });

    // getting all user bids from db
    app.get("/my-bids/:email", async (req, res) => {
      try {
        const { email } = req.params;
        const query = { bidRequestEmail: email };

        const result = await taskBidsCollection.find(query).toArray();

        res.send(result);
      } catch (error) {
        console.log("Error fetching bid", error);
        res.status(500).send({ message: "failed to fetch bid in db" });
      }
    });

    // get all bid request
    app.get("/bid-request/:email", async (req, res) => {
      try {
        const { email } = req.params;
        const query = { buyer_email: email };

        const result = await taskBidsCollection.find(query).toArray();

        res.send(result);
      } catch (error) {
        console.log("Error fetching bid", error);
        res.status(500).send({ message: "failed to fetch bid in db" });
      }
    });

    // save a bid data in db
    app.post("/bid", async (req, res) => {
      try {
        const bidData = req.body;

        bidData.createdAt = new Date();
        bidData.status = bidStatus.Pending;

        const { taskId } = bidData;
        const query = {
          _id: new ObjectId(taskId),
        };

        const updateResult = await tasksCollection.updateOne(query, {
          $inc: { bidCount: 1 },
        });

        if (updateResult.modifiedCount === 0) {
          return res
            .status(404)
            .send({ message: "Task not found to update bid count" });
        }

        const result = await taskBidsCollection.insertOne(bidData);

        res.send(result);
      } catch (error) {
        console.log("Error posting bid", error);
        res.status(500).send({ message: "failed to post bid in db" });
      }
    });

    // updating bid status
    app.patch("/bid/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const status = req.body;
        const query = { _id: new ObjectId(id) };

        const updateStatus = {
          $set: status,
        };

        const result = await taskBidsCollection.updateOne(query, updateStatus);

        res.send(result);
      } catch (error) {
        console.log("Error updating bid", error);
        res.status(500).send({ message: "failed to update bid in db" });
      }
    });

    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("todo server is running");
});

app.listen(port, () => console.log(`Server is running on port: ${port}`));
