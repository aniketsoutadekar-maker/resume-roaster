export default async function handler(req, res) {
  try {
    const { resume } = req.body;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: `Roast this resume in a funny Indian meme style:\n${resume}`
      })
    });

    const data = await response.json();

    // 🔥 safer extraction
    let roastText = "";

    if (data.output && data.output.length > 0) {
      const content = data.output[0].content;
      if (content && content.length > 0) {
        roastText = content[0].text || content[0].content || "No roast generated";
      }
    }

    res.status(200).json({
      roast: roastText || "Something went wrong 😅"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
