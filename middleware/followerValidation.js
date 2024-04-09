const validator = require("./helper");

const saveFollower = (req, res, next) => {
  const validationRule = {
    userId: "required|string",
    followers: "array|present",
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveFollower,
};
