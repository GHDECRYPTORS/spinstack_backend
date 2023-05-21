const userHandlers = require("../controllers/userController.js");
module.exports = function (app: any) {
  // todoList Routes
  app.route("/profile").post(userHandlers.loginRequired, userHandlers.profile);

  app.route("/auth/register").post(userHandlers.register);

  app.route("/auth/sign_in").post(userHandlers.sign_in);
};
