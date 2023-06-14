const questionsService = require("./questions.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function hasOnlyValidProperties(req, res, next) {
  const VALID_PROPERTIES = [
    "question",
    "answer_a",
    "answer_b",
    "answer_c",
    "answer_d",
    "correct",
  ];
  const { data = {} } = req.body;
  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );
  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")},`,
    });
  }
  next();
}
async function hasRequiredProperties(req, res, next) {
  const requiredProperties = [
    "question",
    "answer_a",
    "answer_b",
    "answer_c",
    "answer_d",
    "correct",
  ];
  const { data = {} } = req.body;

  requiredProperties.forEach((property) => {
    const value = data[property];
    if (!value) {
      return next({
        status: 400,
        message: `Must fill out ${property} property`,
      });
    }
  });
  next();
}

async function questionExists(req, res, next) {
  let question_id = req.params.question_id;
  let question = await questionsService.read(question_id);
  if (question) {
    res.locals.question = question;
    return next();
  }
  return next({
    status: 404,
    message: `Question id ${question_id}, could not be found.`,
  });
}

async function list(req, res) {
  try {
    const questions = await questionsService.list();
    res.json({ questions });
  } catch (error) {
    console.error(
      "An error occurred while retrieving the list of questions:",
      error
    );
    res.status(500).json({ message: "Error retrieving questions" });
  }
}
async function createQuestion(req, res, next) {
  try {
    const data = await questionsService.create(req.body.data);
    res.status(201).json({ data });
  } catch (error) {
    next(error);
  }
}
async function read(req, res) {
  const { question } = res.locals;
  res.json({ data: question });
}
async function update(req, res) {
  const updatedQuestion = req.body.data;
  res.json({
    data: await questionsService.update(
      updatedQuestion,
      res.locals.question.question_id
    ),
  });
}

async function destroy(req, res, next) {
  try {
    await questionsService.delete(res.locals.question.question_id);
    res.sendStatus(204);
  } catch (error) {
    next({ status: 500, message: "Error deleting question" });
  }
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    asyncErrorBoundary(hasRequiredProperties),
    asyncErrorBoundary(hasOnlyValidProperties),
    asyncErrorBoundary(createQuestion),
  ],
  read: [asyncErrorBoundary(questionExists), asyncErrorBoundary(read)],
  update: [
    asyncErrorBoundary(questionExists),
    asyncErrorBoundary(hasRequiredProperties),
    asyncErrorBoundary(update),
  ],
  delete: [asyncErrorBoundary(questionExists), asyncErrorBoundary(destroy)],
};
