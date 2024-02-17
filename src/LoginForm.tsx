import React, { useState } from "react";

interface FormData {
  username: string;
  email: string;
  message: string;
}

export const LoginForm: React.FC = () => {
  const [inputData, setInputData] = useState<FormData>({
    username: "",
    email: "",
    message: "",
  });

  const [submittedData, setSubmittedData] = useState<FormData[]>([]); // State to store submitted form data
  

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(submittedData.map((data)=>data.username));
    console.log(submittedData.map((data)=>data.email));
    console.log(submittedData.map((data)=>data.message));
    setSubmittedData([...submittedData, inputData]); // Add the inputData to the submittedData array

    // Reset the form fields after submission
    setInputData({
      username: "",
      email: "",
      message: "",
    });
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Name:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={inputData.username}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={inputData.email}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={inputData.message}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      
      <div>
        <h3>Submitted Data:</h3>
        <table>
          <ul style={{border: "2px solid black"}}>
            {submittedData.map((data, index) => (
              <li key={index}>
                <p>Username:{data.username}</p>
                <p>Email: {data.email}</p>
                <p>Message: {data.message}</p>
              </li>
            ))}
          </ul>
        </table>
      </div>
    </>
  );
};
