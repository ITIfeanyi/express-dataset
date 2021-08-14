const db = require("../database/db");
const getAllEvents = (req, res) => {
  try {
    db.find({})
      .sort({ id: 1 })
      .exec((err, doc) => {
        if (err) {
          console.log(err);
        }
        return res.status(200).json(doc);
      });
  } catch (error) {
    console.log(error);
  }
};

const addEvent = (req, res) => {
  try {
    const { id, type, actor, repo, created_at } = req.body;
    /**If the data sent omits any of the above then it stops the flow */
    if ((!id && !type && !actor && !repo, !created_at)) {
      return res.status(400).json({ message: "Data incomplete" });
    }

    if (actor) {
      let { id } = actor;
      actor.id = id.toString();
    }

    const newDoc = {
      id,
      type,
      actor,
      repo,
      created_at,
    };

    /**check if the db can find this ID */
    db.findOne({ id }, (err, document) => {
      if (err) {
        console.log(err);
      }
      //   if found return 400 with a message
      if (document) {
        return res
          .status(400)
          .json({ message: `Data with id ${id} exist already.` });
      }
      /**if not found, save new data and return 200 */
      db.insert(newDoc, (err, doc) => {
        if (err) {
          console.log(err);
        }
        return res.status(201).json(doc);
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const getByActor = (req, res) => {
  try {
    const id = req.params.actorID;
    //
    db.find({ "actor.id": id })
      .sort({ id: 1 })
      .exec((err, doc) => {
        if (err) {
          console.log(err);
        }
        if (doc.length > 0) {
          return res.status(200).json(doc);
        }
        return res.status(404).json();
      });
  } catch (error) {
    console.log(error);
  }
};

const eraseEvents = (req, res) => {
  try {
    /**Deleting all events in the db */
    db.remove({}, { multi: true }, (err, result) => {
      if (err) {
        console.log(err);
      }
      return res.status(200).json(result);
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllEvents,
  addEvent,
  getByActor,
  eraseEvents,
};
