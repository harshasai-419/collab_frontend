import { useState } from "react";
import API_BASE_URL from "../../apiConfig";

function AITest() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const sendPrompt = async () => {
    const res = await fetch(`${API_BASE_URL}/ai`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setOutput(data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>AI Test</h2>

      <textarea
        rows="5"
        cols="50"
        onChange={(e) => setInput(e.target.value)}
      />

      <br />

      <button onClick={sendPrompt}>Send</button>

      <pre>{output}</pre>
    </div>
  );
}

export default AITest;
