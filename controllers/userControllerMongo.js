const User = require("../models/user.model");
const userController = {};

const users = [
  {
    id: 1,
    email: "omar.salas@jynsystems.com",
    password: "123",
    role: "teacher",
  },
  {
    id: 2,
    email: "andres@jynsystems.com",
    password: "123",
    role: "student",
  },
  {
    id: 3,
    email: "luis@jynsystems.com",
    password: "123",
    role: "student",
  },
  {
    id: 4,
    email: "felix@jynsystems.com",
    password: "123",
    role: "teacher",
  },
  {
    id: 5,
    email: "daniel@jynsystems.com",
    password: "123",
    role: "teacher",
  },
];

userController.get = async (req, res) => {
  try {
    const users = await User.find({});
    //const users = await User.findById("5fb54f4736077a596cacda16")
    //const user = await User.findOne({email: "chema2@gmail.com"})
    res.json(users);
  } catch (error) {
    res.json({ error: "No se pudieron agregar" });
  }
};

userController.getById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const userFound = await User.findById(id);

  if (userFound) {
    res.json(userFound);
  } else {
    res.status(404).send("No existe el usuario");
  }
};

userController.getByRole = async (req, res) => {
  const { role } = req.params;

  const usersFound = await User.find({ role: role });

  if (usersFound) {
    res.json(usersFound);
  } else {
    res.status(404).send("No hay usuarios con ese rol");
  }
};

userController.post = async (req, res) => {
  //const { email, password, role } = req.body;
  try {
    var userExpect = {};

    const expectedParams = [
      "email",
      "password",
      "role",
      "name",
      "score",
      "description",
    ];

    Object.keys(req.body).forEach((p) => {
      if (expectedParams.includes(p)) {
        userExpect[p] = req.body[p];
      }
    });

    const user = new User(userExpect);

    await user.save();

    res.json(user);
  } catch (error) {
    res.json({ error });
  }
};

userController.patch = (req, res) => {
  const { id } = req.params;
  const query = req.query;
  const userFound = users.find((userF) => userF.id == id);

  if (userFound) {
    const expectedParams = [
      "email",
      "password",
      "role",
      "name",
      "score",
      "description",
    ];
    Object.keys(req.body).forEach((p) => {
      if (expectedParams.includes(p)) {
        userFound[p] = req.body[p];
      }
    });
    res.json(userFound);
  } else {
    res.status(404).send("el usuario que desea actualizar no existe");
  }
};

userController.delete = async (req, res) => {
  const { id } = req.params;
  
  try {
    const remove = await User.deleteOne({ _id: id })
    res.status(200).json({success: 'El usuario se elimino correctamente. '});
  } catch (error) {
    res.status(404).json({error: "el usuario que desea actualizar no existe"});
  }

  if (remove) {
    const idDelete = users[index].id;
    users.splice(index, 1);
    res.status(200).send(`Se elimino el usuario con el id ${idDelete}`);
  } else {
    res.status(400).send("el usuario que desea actualizar no existe");
  }
};

module.exports = userController;
