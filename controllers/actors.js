const db = require("../database/db");
const { handleStreak, eventCount } = require("../helperFunc");

const getAllActors = (req, res) => {
  try {
    db.find({})
      .projection({ _id: 0 })
      .exec((err, doc) => {
        if (err) {
          res.status(500).json(err);
        }

        res.status(200).json(eventCount(doc));
      });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateActor = (req, res) => {
  try {
    let { id, avatar_url, login } = req.body;
    id = id.toString();
    db.find({ "actor.id": id })
      .projection({ _id: 0 })
      .exec((err, [doc]) => {
        if (err) {
          res.status(500).json(err);
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
                res.status(500).json(err);
              }

              return res.status(200).json(doc);
            }
          );
        }
        /**Failed to get an actor */
        return res.status(404).json();
      });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getStreak = (req, res) => {
  try {
    db.find({})
      .projection({ _id: 0 })
      .exec((err, doc) => {
        if (err) {
          res.status(500).json(err);
        }

        return res.status(200).json(handleStreak(doc));
      });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  updateActor,
  getAllActors,
  getStreak,
};
