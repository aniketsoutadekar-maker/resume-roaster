export default async function handler(req, res) {
  try {
    const { resume } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Roast this resume in a funny Indian meme style:\n${resume}`
          }
        ]
      })
    });

    const data = await response.json();

    console.log("OPENAI RESPONSE:", data);

    if (!response.ok) {
      return res.status(500).json({
        error: data.error?.message || "Unknown API error"
      });
    }

    const roastText = data.choices?.[0]?.message?.content;

    res.status(200).json({
      roast: roastText || "No roast returned"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
