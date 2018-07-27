var user = "TOSHE" + parseInt(Math.random() * 100, 10);
var apiHost = "http://localhost:3000";

$(function () {
    var chat_window = ".chat-window";
    var chat_inputText = ".chat-input-text";
    var chat_inputSendBtn = ".chat-send-btn";

    var socket = io(apiHost);

    socket.emit('joined', user);

    socket.on('joined', function(msg){
        chatReceivedMessage(msg);
        console.log(msg);
    });

    socket.on('chat', function(msg){
        chatReceivedMessage(msg);
        console.log(msg);
    });


    var chatScrollBottom = function() {
        var chat = document.querySelector(chat_window);
        chat.scroll({ top: chat.scrollHeight, left: 0, behavior: 'smooth' });
    }
    
    var chatAddMessage = function(clientID, text, time) {
        $(chat_window).append( createChatItem(clientID, text, time ) );
    }
    
    var chatReceivedMessage = function(json) {
        var clientID = json["user"];
        var text = json["text"];
        var time = getTime(json["time"]);
        
        chatAddMessage(clientID, text, time);
    }

    var chatSendMessage = function (id, text) {
        var payload = {"user": id, "text": text, "time": getTimestamp()};

        socket.emit('chat', payload );
    }

    var chatSendMessageFromInput = function() {
        if ($(chat_inputText).val().length > 0) {
            chatSendMessage(user, $(chat_inputText).val());
            $(chat_inputText).val("");
        }
    }
    
    $(document).on('keypress', chat_inputText, function (e) {
        if (e.keyCode === 13) {
            chatSendMessageFromInput();
        }
    });
    
    $(document).on('click', chat_inputSendBtn, function (e) {
        chatSendMessageFromInput();
    });
  });