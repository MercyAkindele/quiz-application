const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
const headers = new Headers();
headers.append("Content-Type", "application/json");

async function fetchJson(url, options, onCancel){
  try{
    const response = await fetch(url,options);
    if(response.status < 200 || response.status > 399){
      throw new Error(`${response.status} - ${response.statusText}`);
    }
    if(response.status === 204){
      return null;
    }
    return await response.json();
  }catch(error){
    if(error.name !== "AbortError"){
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

//get a list of all questions
export async function getAllQuestions(signal){
  const url = `${API_BASE_URL}/questions`;
  return await fetchJson(url, {signal}, {})
}

//creates a new question
export async function createQuestion(data, signal){
  const url = `${API_BASE_URL}/questions`;
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({data}),
    signal,
  };
  return await fetchJson(url, options, data);
}
export async function readQuestion(question_id, signal){
  const url = `${API_BASE_URL}/questions/${question_id}`;
  return await fetchJson(url, {signal}, {})
}
//updates a question
export async function updateQuestion(data, signal){
  const url = `${API_BASE_URL}/questions/${data.question_id}`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({data}),
    signal,
  };
  return await fetchJson(url, options, data);
}
//deletes a question
export async function deleteQuestion(question_id, signal){
  const url = `${API_BASE_URL}/questions/${question_id}`
  const options = {
    method: "DELETE",
    signal,
  };
  return await fetchJson(url, options, []);
}
export async function postQuizScore(data, signal){
  const url = `${API_BASE_URL}/scores`;
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({data}),
    signal,
  };
  return await fetchJson(url, options, data);
}
//get a list of all scores
export async function getAllScores(signal){
  const url = `${API_BASE_URL}/scores`;
  return await fetchJson(url, {signal}, [])
}
export async function deleteScore(score_id, signal){
  const url = `${API_BASE_URL}/scores/${score_id}`
  const options = {
    method: "DELETE",
    signal,
  };
  return await fetchJson(url, options, []);
}