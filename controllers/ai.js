const { marked } = require("marked");
 const axios=require("axios");

module.exports.chatBot = async (req, res) => {
  try {

    const { message, context } = req.body;

    if (!message) {
      return res.status(400).json({
        reply: "Please enter a message."
      });
    }

    const prompt = `
You are WanderLust AI.

Current Property:
${context ? `
Title: ${context.title}
Location: ${context.location}
Country: ${context.country}
Price: ₹${context.price}/night
` : "General Travel Assistant"}

Rules:
- Answer only travel-related questions and if not reply i can't answer this.
- If location is available, use it.
- Recommend attractions, restaurants, hotels and transport.
- Use bullet points.
- Keep answers concise and practical.

User Question:
${message}
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model:"mistralai/mistral-small-3.2-24b-instruct",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const reply =
      marked(response.data.choices[0].message.content);

    res.json({
      reply
    });

  } catch (err) {

    console.error(err.response?.data || err.message);

    res.status(500).json({
      reply:
        "🚦 WanderLust AI is currently unavailable. Please try again later."
    });

  }
};

module.exports.tripPlanner = async (req, res) => {

  try {

    const {
      destination,
      days,
      budget,
      interests
    } = req.body;

    const prompt = `
Create a detailed travel itinerary.

Destination: ${destination}
Days: ${days}
Budget: ${budget}
Interests: ${interests}

Provide:

1. Day-wise itinerary
2. Places to visit
3. Food recommendations
4. Local transport tips
5. Budget breakdown
6. Travel advice

Format nicely using headings and bullet points.
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
         model:"mistralai/mistral-small-3.2-24b-instruct",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const plan =
      marked(response.data.choices[0].message.content);
    res.render("ai/tripResult.ejs", {
      plan
    });

  } catch (err) {

    console.error(err.response?.data || err.message);

    res.render("ai/tripResult.ejs", {
      plan:
        "❌ Unable to generate itinerary right now. Please try again later."
    });

  }
};

module.exports.globalChat = async (req, res) => {

  try {

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        reply: "Please enter a message."
      });
    }

    const prompt = `
You are WanderLust Global Travel Guide.

You help travelers with:

- Destinations
- Budget travel
- Hotels
- Food
- Flights
- Visa information
- Travel tips
- Backpacking
- Travel planning

Rules:
- Answer only travel questions.
- Keep answers concise.
- Use bullet points.
- Be practical and friendly.

Question:
${message}
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-small-3.2-24b-instruct",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const reply =
      marked(response.data.choices[0].message.content);

    return res.json({ reply });

  } catch (err) {

    console.log(
      err.response?.data || err.message
    );

    return res.status(500).json({
      reply:
        "🌍 WanderLust Travel Guide is unavailable right now."
    });

  }
};