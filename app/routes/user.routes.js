const db = require("../models");
const User = db.user;

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/users", async (req, res) => {
    try {
      const users = await User.find();
      res.send(users);
    } catch (err) {
      res.status(500).json({message: err.message})
    }
  });

  app.get("/api/checkUsername/:username", async (req, res) => {
    try {
      const user = await User.exists({ username: req.params.username })
      
      res.send(user);
    } catch (err) {
      res.send(user);
    }
  })

  app.get("/api/checkEmail/:email", async (req, res) => {
    try {
      const user = await User.exists({ email: req.params.email })
      
      res.send(user);
    } catch (err) {
      res.send(user);
    }
  })

  app.get("/api/user/:id", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.params.id });
      res.send({
        id: user._id,
        username: user.username,
        watching: user.watching,
        planned: user.planned,
        completed: user.completed,
        about: user.about,
        profile_pic: user.profile_pic,
      });
    } catch (err) {
      res.status(500).json({message: err.message})
    }
  });

  app.put("/api/user/addWatching/:id", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.params.id });
      var new_watching = user.watching;
      if (!(new_watching.includes(req.body.anime_id))) {
        new_watching.push(req.body.anime_id);
        var new_planned = user.planned;
        const index = new_planned.indexOf(req.body.anime_id);
        if (index > -1) { 
          new_planned.splice(index, 1);
        }
      } else {
        res.send({ message: "Already in watching list." })
        return;
      }
      const updated_user = await User.findByIdAndUpdate(user._id, { watching: new_watching, planned: new_planned }, { useFindAndModify: false });
      res.send(updated_user);
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  });

  app.put("/api/user/addPlanned/:id", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.params.id });
      var new_planned = user.planned;
      if (!(new_planned.includes(req.body.anime_id))) {
        new_planned.push(req.body.anime_id);
        // remove from other list(s)
        var new_watching = user.watching;
        const index = new_watching.indexOf(req.body.anime_id);
        if (index > -1) {
          new_watching.splice(index, 1);
        }
      } else {
        res.send({ message: "Already in planned list." })
        return;
      }
      const updated_user = await User.findByIdAndUpdate(user._id, { planned: new_planned, watching: new_watching }, { useFindAndModify: false });
      res.send(updated_user);
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  });

  app.put("/api/user/addCompleted/:id", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.params.id });
      var new_completed = user.completed;
      if (!(new_completed.includes(req.body.anime_id))) {
        new_completed.push(req.body.anime_id);
      } else {
        res.send({ message: "Already in completed list." })
        return;
      }
      const updated_user = await User.findByIdAndUpdate(user._id, { completed: new_completed }, { useFindAndModify: false });
      res.send(updated_user);
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  });

  app.put("/api/user/removePlanned/:id", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.params.id });
      var updated_planned = user.planned;
      const index = updated_planned.indexOf(req.body.anime_id);
      if (index > -1) { 
        updated_planned.splice(index, 1);
      }
      const updated_user = await User.findByIdAndUpdate(user._id, { planned: updated_planned }, { useFindAndModify: false});
      res.send(updated_user);
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

  app.put("/api/user/removeWatching/:id", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.params.id });
      var updated_watching = user.watching;
      const index = updated_watching.indexOf(req.body.anime_id);
      if (index > -1) { 
        updated_watching.splice(index, 1);
      }
      const updated_user = await User.findByIdAndUpdate(user._id, { watching: updated_watching }, { useFindAndModify: false});
      res.send(updated_user);
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

  app.put("/api/user/removeCompleted/:id", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.params.id });
      var updated_completed = user.completed;
      const index = updated_completed.indexOf(req.body.anime_id);
      if (index > -1) { 
        updated_completed.splice(index, 1);
      }
      const updated_user = await User.findByIdAndUpdate(user._id, { completed: updated_completed }, { useFindAndModify: false});
      res.send(updated_user);
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

  app.put("/api/user/updateAbout/:id", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.params.id });
      const updated_user = await User.findByIdAndUpdate(user._id, { about: req.body.updated_about }, { useFindAndModify: false});
      res.send(updated_user);
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })
  
  app.put("/api/user/updateProfilePic/:id", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.params.id });
      const updated_user = await User.findByIdAndUpdate(user._id, { profile_pic: req.body.profile_pic });
      res.send(updated_user);
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })
};