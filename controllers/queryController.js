const Customer = require("../models/customerModel");
const queries = {};

queries.aggregateMongoose = async (req, res) => {
  try {
    const customer = await Customer.aggregate()
      .lookup({
        from: "Lesson",
        localField: "_id",
        foreignField: "customerId",
        as: "lessons",
      })
      .match({
        name: "Yolanda",
      })
      .project({
        name: 1,
        lastName: 1,
        fullName: {
          $concat: ["$name", " ", "$lastName"],
        },
        lessons: 1,
      });
    res.json(customer);
  } catch (error) {
    res.json({
      error,
    });
  }
};

queries.aggregateMongoDB = async (req, res) => {
  try {
    const customer = await Customer.aggregate([
      {
        $lookup: {
          from: "Lesson",
          localField: "_id",
          foreignField: "customerId",
          as: "lessons",
        },
      },
      {
        $match: {
          name: "Yolanda",
        },
      },
      {
        $project: {
          name: 1,
          fullName: {
            $concat: ["$name", " ", "$lastName"],
          },
          lessons: 1
        },
      },
      {
        $limit: 1
      }
    ]);
    res.json(customer);
  } catch (error) {
    res.json({
      error,
    });
  }
};

queries.getWithProject = (req, res) => {
  Customer.find({}, "email", (error, customers) => {
    if (error) {
      res.json({
        error,
      });
    } else {
      res.json(customers);
    }
  });
};

queries.getWithExec = (req, res) => {
  const users = Customer.find({});
  //users.projection({ email: 1 });
  users.select("email");

  users.exec((error, data) => {
    if (error) {
      res.json({
        error,
      });
    } else {
      res.json(data);
    }
  });
};

module.exports = queries;
