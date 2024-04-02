const validator = require("./helper");

const saveFollowing = (req, res, next) => {
  const validationRule = {
    userId: "required|string",
    following: "array|required",
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
  saveFollowing,
};
