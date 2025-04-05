import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import Question from "./componenets/Question";

function App() {
  const [questionData, setQuestionData] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect requires an arrow function and an array of dependencies

  // using an async function
  // useEffect(() => {
  //   const fetchQuestionData = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://opentdb.com/api.php?amount=10&type=multiple`
  //       );
  //       const data = await response.json();

  //       if (data.response_code === 0) {
  //         setQuestionData(data.results);
  //         setIsLoading(false);
  //       }
  //     } catch (error) {
  //       setError(error);
  //       console.error("There was an error fetching the data", error);
  //     }
  //   };
  //   fetchQuestionData();
  // }, []);

  // using promise chaining
  useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=10&type=multiple`)
      .then((response) => response.json())
      .then((data) => {
        if (data.response_code === 0) {
          console.log(data);
          setQuestionData(data.results);
        }
      })
      .catch((error) => {
        setError(error);
        console.error("There was an error fetching the data", error);
      });
  }, []);

  if (isLoading) {
    return (
      <>
        <p>Page is Loading.. </p>
      </>
    );
  }

  return (
    <>
      <div>
        <h1>Quiz Questions</h1>
        {questionData.map((question, index) => (
          <Question key={index} questionData={question} />
        ))}
      </div>
    </>
  );
}

export default App;
