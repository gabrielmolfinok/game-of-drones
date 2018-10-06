import User from './../models/user'

export function addUser(req, res) {

    let newUser = new User({
        name: req.body.name
    })

    newUser.save((err, saved) => {
        if (err) {
          res.status(500).send(err);
        }
        res.json({ user: saved });
      });
}