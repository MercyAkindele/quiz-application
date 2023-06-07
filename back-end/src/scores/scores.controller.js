const scoresService = require("./scores.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(req,res){
  try{
    const scores = await scoresService.list()
    res.json({scores});
  }catch(error){
    console.error('An error occurred while retrieving the scores:', error);
    res.status(500).json({ message: 'Error retrieving scores' });
  }
}

async function createScore(req,res,next){
  try{
    console.log("trying to post score")
    const data = await scoresService.create(req.body.data)
    console.log("this is data in ncreateScore", data)
    res.status(201).json({data})
  }catch(error){
    next(error)
  }
}

async function hasOnlyScoreProperty(req,res,next){
  const{data={}} = req.body;
  console.log("req.body is:", req.body)
  console.log("data is:", data);
  let scoreAsArray=Object.keys(data)
  if(scoreAsArray[scoreAsArray.length-1]!=='score'){
    return next({
      status:400,
      message:`Invalid field`
    });
  }
  next();
}

async function scoreBtwn0And100(req,res,next){
  const {data ={}} = req.body;
  console.log("this is data", data)
  if(typeof data.score !== "number" || !(data.score >= 0 && data.score <=100)){
    return next({
      status:400,
      message:`Invalid score: ${data.score}`
    })
  }
  next();
}
async function scoreExists(req,res,next){
  let score_id = req.params.score_id;
  let score = await scoresService.read(score_id);
  if(score){
    res.locals.score = score;
    return next();
  }
  return next({
    status:404,
    message: `Score id ${score_id}, could not be found.`,
  })
}
async function destroy(req, res, next) {
  console.log(res.locals.score.score_id)
  try {
    await scoresService.delete(res.locals.score.score_id);
    res.sendStatus(204);
  } catch (error) {
    next({ status: 500, message: "Error deleting score" });
  }
}
module.exports ={
  list:asyncErrorBoundary(list),
  create:[
    asyncErrorBoundary(hasOnlyScoreProperty),
    asyncErrorBoundary(scoreBtwn0And100),
    asyncErrorBoundary(createScore)
  ],
  delete:[
    asyncErrorBoundary(scoreExists),
    asyncErrorBoundary(destroy),
  ]
}