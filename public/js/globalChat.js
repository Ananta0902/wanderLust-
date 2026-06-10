function openGlobalChat() {

  document.getElementById(
    "globalChatPopup"
  ).style.display = "block";

  document.getElementById(
    "globalChatMessages"
  ).innerHTML = `
    <div>
      👋 Welcome to WanderLust AI

      <br><br>

      Ask me:

      <ul>
        <li>Best places in Europe</li>
        <li>Thailand vs Bali</li>
        <li>Japan travel tips</li>
        <li>Budget backpacking</li>
        <li>Visa information</li>
      </ul>
    </div>
  `;
}

function closeGlobalChat() {

  document.getElementById(
    "globalChatPopup"
  ).style.display = "none";
}

async function sendGlobalMessage() {

  const input =
    document.getElementById(
      "globalChatInput"
    );

  const message =
    input.value.trim();

  if (!message) return;

  const chat =
    document.getElementById(
      "globalChatMessages"
    );

  chat.innerHTML += `
    <p>
      <b>You:</b> ${message}
    </p>
  `;

  input.value = "";

  try {

    const response = await fetch(
      "/ai/global-chat",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          message
        })
      }
    );

    const data =
      await response.json();

    chat.innerHTML += `
      <p>
        <b>AI:</b>
        ${data.reply}
      </p>
    `;

    chat.scrollTop =
      chat.scrollHeight;

  } catch {

    chat.innerHTML += `
      <p>
        AI unavailable.
      </p>
    `;
  }
}