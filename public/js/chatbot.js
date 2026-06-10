document
.getElementById("sendMessage")
.addEventListener("click", async () => {

  const input =
  document.getElementById("messageInput");

  const msg = input.value.trim();

  if(!msg) return;

  const messages =
  document.getElementById("messages");

  messages.innerHTML += `
    <div class="user-message">
      ${msg}
    </div>
  `;

  input.value = "";

  messages.innerHTML += `
    <div class="bot-message">
      Thinking...
    </div>
  `;

  try{

    const response = await fetch(
      "/ai/chat",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          message:msg
        })
      }
    );

    const data =
    await response.json();

    const bots =
    document.querySelectorAll(".bot-message");

    bots[bots.length-1].innerHTML =
    data.reply;

  }catch(err){

    const bots =
    document.querySelectorAll(".bot-message");

    bots[bots.length-1].innerHTML =
    "Something went wrong.";

  }

  messages.scrollTop =
  messages.scrollHeight;

});