const validator = require("./helper");

const savePost = (req, res, next) => {
  const validationRule = {
    authorId: "required|string",
    image: "string",
    caption: "string"
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
  savePost,
};
