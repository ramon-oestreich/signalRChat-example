"use strict";

const connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    let msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    let encodedMsg = user  + ": " + msg;
    let li = document.createElement("p");
    let date =  new Date();
    let datecurrent = date.getHours() + ":" + date.getMinutes() 
    console.log(datecurrent)
    li.textContent = encodedMsg + " - " + datecurrent;
    document.getElementById("messagesList").appendChild(li);
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    let user = document.getElementById("userInput").value;
    let message = document.getElementById("messageInput").value;
    if(user !== "" && message !== ""){
        connection.invoke("SendMessage", user, message).catch(function (err) {
            return console.error(err.toString());
        });
        event.preventDefault();
    }else{
        return alert("fields empty: user or message");
    }
   
   
});