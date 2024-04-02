const validator = require("./helper");

const saveUser = (req, res, next) => {
  const validationRule = {
    auth0Id: "required|string",
    firstName: "required|string",
    lastName: "required|string",
    birthday: "string",
    profilePicUrl: "string",
    email: "string",
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
  saveUser,
};
