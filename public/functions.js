const ws = false;
let socket = null;

/*function initWS() {
    // Establish a WebSocket connection with the server
    socket = new WebSocket('ws://' + window.location.host + '/websocket');

    // Called whenever data is received from the server over the WebSocket connection
    socket.onmessage = function (ws_message) {
        const message = JSON.parse(ws_message.data);
        const messageType = message.messageType
        if(messageType === 'chatMessage'){
            addMessageToChat(message);
        }else{
            // send message to WebRTC
            processMessageAsWebRTC(message, messageType);
        }
    }
}
*/

function settledAuctionHTML(messageJSON) {
    //const username = messageJSON.username;
    const title = messageJSON.title;
    const auctionId = messageJSON.id;
    const winner = messageJSON.winner;
    const winningBid = messageJSON.winningBid;

    //let messageHTML = "<br><button onclick='deleteMessage(\"" + messageId + "\")'>X</button> ";
    messageHTML += "<span id='message_" + auctionId + "'><b>" + title + "</b> | winner: " + winner + " | winning bid: " + winningBid + "</span>";
    return messageHTML;
}

function clearChat() {
    const settledAuctions = document.getElementById("settled-listings");
    settledAuctions.innerHTML = "";
}

function addAuctionToChat(messageJSON) {
    const settledAuctions = document.getElementById("settled-listings");
    settledAuctions.innerHTML += settledAuctionHTML(messageJSON);
    settledAuctions.scrollIntoView(false);
    settledAuctions.scrollTop = settledAuctions.scrollHeight - settledAuctions.clientHeight;
}

function updateAuctions() {
    const request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            clearAuctions();
            const messages = JSON.parse(this.response);
            for (const message of messages) {
                addAuctionToChat(message);
            }
        }
    }
    request.open("GET", "/auction-history");
    request.send();
}

function redirectCreateAuction() {
    window.location.href = "/public/create_auction.html"; // Replace with your desired URL
}

function redirectActiveAuctions() {
    window.location.href = "/public/active_listings.html"; // Replace with your desired URL
}

function redirectMyAuctions() {
    window.location.href = "/public/my_auctions.html"; // Replace with your desired URL
}

function welcome() {
    /*document.addEventListener("keypress", function (event) {
        if (event.code === "Enter") {
            sendChat();
        }
    });*/


    //document.getElementById("paragraph").innerHTML += "<br/>This text was added by JavaScript 😀";
    //document.getElementById("chat-text-box").focus();

    updateAuctions();

    /*if (ws) {
        initWS();
    } else {
        const videoElem = document.getElementsByClassName('video-chat')[0];
        videoElem.parentElement.removeChild(videoElem);
        setInterval(updateChat, 2000);
    }*/

    // use this line to start your video without having to click a button. Helpful for debugging
    // startVideo();
}