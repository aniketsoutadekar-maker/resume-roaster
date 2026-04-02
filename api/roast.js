export default async function handler(req, res) {
  const { resume } = req.body;

  const prompt = `
You are a savage, funny Indian friend roasting a resume.

Make it meme-style, short, Hinglish allowed, max 6 lines.

Resume:
${resume}
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    })
  });

  const data = await response.json();

  res.status(200).json({
    roast: data.choices[0].message.content
  });
}
