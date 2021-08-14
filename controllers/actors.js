const db = require("../database/db");

const getAllActors = (req, res) => {
  try {
    db.find({})
      .projection({ actor: 1, _id: 0 })
      .exec((err, doc) => {});
  } catch (error) {
    console.log(error);
  }
};

const updateActor = (req, res) => {
  try {
    let { id, avatar_url, login } = req.body;
    id = id.toString();
    db.find({ "actor.id": id }, (err, [doc]) => {
      if (err) {
        console.log(err);
      }

      if (doc) {
        /**checks if the login changed*/
        if (doc.actor.login !== login) {
          return res.status(400).json();
        }

        return db.update(
          { "actor.id": doc.actor.id },
          { $set: { "actor.avatar_url": avatar_url } },
          {},
          (err, doc) => {
            if (err) {
              console.log(err);
            }
            console.log(doc);
            return res.status(200).json(doc);
          }
        );
      }
      /**Failed to get an actor */
      return res.status(404).json();
    });
  } catch (error) {
    console.log(error);
  }
};

const getStreak = () => {
  try {
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  updateActor,
  getAllActors,
  getStreak,
};
