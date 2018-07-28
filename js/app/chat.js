var user = "TOSHE" + parseInt(Math.random() * 100, 10);

$(function () {
    const host = "http://localhost:3000";
    const chat_window = ".chat-window";
    const chat_inputText = ".chat-input-text";
    const chat_inputSendBtn = ".chat-send-btn";

    var canScroll = true;

    var socket = io(host);

    socket.emit('joined', user);

    socket.on('joined', function(msg){
        chatReceivedMessage(msg);
    });

    socket.on('chat', function(msg){
        chatReceivedMessage(msg);
    });

    socket.on('history', function(history){
        history.reverse();
        for(var i = 0;i < history.length;i++) {
            chatReceivedMessage(history[i]);
        }
    });


    var canScroll = function(elem) {
        if ($(elem)[0].scrollHeight - $(elem).scrollTop() == Math.floor($(elem).outerHeight())) {
            return true;
        }
        return false;
    }

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

        if (canScroll) {
            chatScrollBottom();
        }
    }

    var chatSendMessage = function (id, text) {
        var payload = {"user": id, "text": text};

        socket.emit('chat', payload );
    }

    var chatSendMessageFromInput = function() {
        if ($(chat_inputText).val().length > 0) {
            chatSendMessage(user, $(chat_inputText).val());
            $(chat_inputText).val("");
        }
    }
    
    // EVENTS
    $(document).on('keypress', chat_inputText, function (e) {
        if (e.keyCode === 13) {
            chatSendMessageFromInput();
        }
    });
    
    $(document).on('click', chat_inputSendBtn, function (e) {
        chatSendMessageFromInput();
    });

    $( chat_window ).scroll(function() {
        if ($(this)[0].scrollHeight - $(this).scrollTop() == Math.floor($(this).outerHeight())) {
            canScroll = true;
            return;
        }

        canScroll = false;
    });
  });