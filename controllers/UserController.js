const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if ((!name || !email, !password)) {
        return res.status(400).json({ message: "Please fill all form" });
      }

      const findUser = await User.findOne({ where: { email: email } });
      if (findUser) {
        return res.status(400).json({ message: "email already" });
      } else {
        const salt = await bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
          name,
          email,
          password: hashPassword,
        });

        const token = jwt.sign(
          { id: newUser.id, name: newUser.name },
          process.env.SECRET_KEY
        );

        res
          .status(201)
          .cookie("token", { token }, { httpOnly: true })
          .json({ data: newUser });
      }
    } catch (error) {
      return res.status(500).json({ message: "Sserver problem" });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const findUser = await User.findOne({ where: { email: email } });
      if (!findUser) {
        return res.status(404).json({ message: "User not found" });
      }

      const checkPassword = await bcrypt.compareSync(
        password,
        findUser.password
      );
      if (!checkPassword) {
        return res.status(401).json({ message: "Wrong password" });
      }

      const token = jwt.sign(
        { id: findUser.id, name: findUser.name },
        process.env.SECRET_KEY
      );

      
    

      res
        .status(200)
        .cookie("token", { token }, { httpOnly: true })
        .json({ data: findUser });
    } catch (error) {
      return res.status(500).json({ message: "Sserver problem" });
    }
  },
};
