async function sendMessage() {

  const input =
    document.getElementById("chatInput");

  const message =
    input.value.trim();

  if (!message) {
    alert("Enter a message");
    return;
  }

  const response = await fetch(
    "/ai/chat",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json"
      },
      body: JSON.stringify({
        message,
        context:
          window.listingData || null
      })
    }
  );

  const data =
    await response.json();

  document.getElementById(
    "chatMessages"
  ).innerHTML += `
    <div><b>You:</b> ${message}</div>
    <div><b>AI:</b><br>${data.reply}</div>
    <hr>
  `;

  input.value = "";
}

function openPropertyChat() {

  const popup =
    document.getElementById(
      "propertyChatPopup"
    );

  if (!popup) {
    console.log(
      "propertyChatPopup not found"
    );
    return;
  }

  popup.style.display = "block";

  document.getElementById(
    "chatMessages"
  ).innerHTML = `
    <div class="alert alert-light">
      👋 Welcome to WanderLust AI

      <br><br>

      📍 ${listingData.location},
      ${listingData.country}

      <br>

      🏡 ${listingData.title}

      <br>

      💰 ₹${listingData.price}/night

      <br><br>

      Ask me:
      <br>
      • Best attractions nearby
      <br>
      • Good restaurants
      <br>
      • Local transportation
      <br>
      • Travel tips
    </div>
  `;
}

function closePropertyChat() {

  document.getElementById(
    "propertyChatPopup"
  ).style.display = "none";
}