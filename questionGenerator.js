async function getGeminiResponse(prompt) {
  const apiKey = ""; // Replace with your Gemini API key
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Extracting the reply content from the response
    if (data.candidates && data.candidates.length > 0) {
      const reply = data.candidates[0].content;
      const replyText = reply.parts[0].text;
      //replyText is the output
      console.log(replyText);
    } else {
      console.log("No reply found.");
    }
  } catch (error) {
    console.error("Error fetching response from Gemini:", error);
  }
}

// Admin will select topic, subTopic, questionType from 'Dropdown' in UI,
//Then clicks generate btn, This code should execute.
//The response is in JSX and in replyTextVariable

//These are admin controllable inputs
const topic = "Java";
const subTopic = "Datatypes";
const questionType = "MCQ with 4 Options and only one correct option";
const format =
  "{questionText: 'The question', questionOptions: ['', '', '', ''], correctOptionIndex: '', explanation: ''}";

//Admin can stop repeated questions by changing this somehow in UI but I don't have clear idea how
const alreadyAskedQuestions = [
  "Which of the following Java data types is used to represent a single character?",
  "Which Java data type is most appropriate for storing a large number representing the population of a country?",
];

//The prompt that is sent to Gemini
const prompt = `
    Gemini, you are a assistant to an 'Question Writer'.
    Your job is to generate one question on topic ${topic} and sub topic is ${subTopic}.
    The question type is - ${questionType}.
    Your reply format should be in JSON format like this.
    The format : ${format}.
    The already asked questions are : ${alreadyAskedQuestions}.
    Avoid asking questions similar to already asked questions.
`;

getGeminiResponse(prompt);
