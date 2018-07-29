var user = "TOSHE" + parseInt(Math.random() * 100, 10);

$(function () {
    const host = "http://localhost:3001";
    const gitDomains = ["https://github.com/", "https://gist.github.com/"];

    const main_window = ".vote-window";
    const vote_input = ".vote-input-text";
    const vote_step_count = ".vote-step-count";
    const vote_step_previous = ".vote-step-previous";
    const vote_step_next = ".vote-step-next";
    const vote_likes_btn = ".vote-likes-btn";
    var socket = io(host);

    var newVote = [];
    var currentStep = 0;

    socket.emit('joined');

    socket.on('vote', function(vote){
        receiveVote(vote);
    });

    socket.on('history', function(history){
        history.reverse();
        for(var i = 0;i < history.length;i++) {
            receiveVote(history[i]);
        }
    });

    socket.on('update_vote', function(vote){
        updateVote(vote);
    });

    const getSeparatorClassForTimestamp = function(timestamp) {
        var date = moment.unix(timestamp);
        var month = date.format("MMMM");
        var year = date.format("YYYY");
        return ".vote-separator-" + month + "-" + year;
    }

    var receiveVote = function(vote) {
        var id = vote["id"];
        var description = vote["description"];
        var link = vote["link"];
        var likes = vote["likes"];
        var budget = vote["budget"];
        var status = vote["status"];
        var time = vote["time"];

        var separatorClass = $(getSeparatorClassForTimestamp(time));

        if (separatorClass.length == 0) {
            voteSeparator(time);
        }
        
        voteAdd(id, description, link, status, likes, budget, time);
    }

    var updateVote = function(vote) {
        var id = vote["id"];
        var description = vote["description"];
        var link = vote["link"];
        var likes = vote["likes"];
        var budget = vote["budget"];
        var status = vote["status"];
        var time = vote["time"];

        var voteBox = "#vote-box-" + id;

        $(voteBox).find(vote_likes_btn).find("span").text(likes);
    }

    var voteAdd = function(id, text, link, status, likes, budget, time) {
        var separator_window = getSeparatorClassForTimestamp(time);

        $(separator_window).append( createVoteItem(id, text, link, status, likes, budget) );
    }
    
    var voteSeparator = function(timestamp) {
        $(vote_window).append( createVoteSeparator(timestamp) );
    }

    const isValidGitURL = function(str) {
        for(var i = 0;i < gitDomains.length; i++) {
            if (str.startsWith(gitDomains[i]))
                return true;
        }
        return false;
    }

    const updateVoteStep = function(step) {
        if (step == 0) {
            $(vote_input).attr("placeholder", "Description");
            $(vote_step_previous).fadeOut();
            $(vote_step_next).fadeIn();
        }
        else if (step == 1) {
            $(vote_input).attr("placeholder", "GitHub Link");
            $(vote_step_previous).fadeIn();
            $(vote_step_next).fadeIn();
        }
        else if (step == 2) {
            $(vote_input).attr("placeholder", "Budget");
            $(vote_step_previous).fadeIn();
            $(vote_step_next).fadeIn();
        }

        $(vote_step_count).text(step + 1);
        $(vote_input).val(newVote[step]);
    }

    var submitVote = function(user, description, link, budget) {
        var payload = {"user": user, "description": description, "link": link, "budget": budget};

        socket.emit('vote', payload );
    }

    var submitLike = function(voteID) {
        var payload = {"id": voteID};

        socket.emit('like', payload );
    }

    var resetStep = function() {
        newVote = [];
        currentStep = 0;
        updateVoteStep(currentStep);
    }
    
    var processStep = function(stepDir) {
        var stepInput = $(vote_input).val();
        
        if (isValidStep(currentStep, stepInput) || stepDir < 0) {
            newVote[currentStep] = $(vote_input).val();
            currentStep += stepDir;

            updateVoteStep(currentStep);

            if (currentStep == 3) {
                submitVote(user, newVote[0], newVote[1], newVote[2]);
                resetStep();
            }
        }
    }

    const isValidStep = function(step, stepInput) {
        if (step == 0) {
            // Description
            return stepInput.length > 0;
        }
        else if (step == 1) {
            // Link
            return isValidGitURL(stepInput);
        }
        else if (step == 2) {
            // Budget
            return $.isNumeric(stepInput);
        }

        return false;
    }

    const getVoteIDFromClass = function(voteBox) {
        return $(voteBox).attr("id").replace("vote-box-", "");
    }

    // EVENTS
    $(document).on('keypress', vote_input, function (e) {
        if (e.keyCode === 13) {
            processStep(1);
        }
    });

    $(document).on('click', vote_step_next, function (e) {
        processStep(1);
    });

    $(document).on('click', vote_step_previous, function (e) {
        processStep(-1);
    });

    $(document).on('click', vote_likes_btn, function (e) {
        var voteID = getVoteIDFromClass($(this).closest( ".vote-box" ));

        if ( $.isNumeric(voteID) ) {
            submitLike(voteID);
        }
    });

  });