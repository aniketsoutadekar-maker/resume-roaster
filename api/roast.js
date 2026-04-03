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

    res.status(200).json({
      roast: data.output[0].content[0].text
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
