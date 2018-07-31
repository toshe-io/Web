var user = "TOSHE" + parseInt(Math.random() * 100, 10);

$(function () {
    const host = "http://localhost:3001";
    const gitDomains = ["https://github.com/", "https://gist.github.com/"];

    const main_window = ".proposal-window";
    const proposal_input = ".proposal-input-text";
    const proposal_step_count = ".proposal-step-count";
    const proposal_step_previous = ".proposal-step-previous";
    const proposal_step_next = ".proposal-step-next";
    const proposal_likes_btn = ".proposal-likes-btn";
    var socket = io(host);

    var newproposal = [];
    var currentStep = 0;

    socket.emit('joined');

    socket.on('proposal', function(proposal){
        receiveproposal(proposal);
    });

    socket.on('history', function(history){
        history.reverse();
        for(var i = 0;i < history.length;i++) {
            receiveproposal(history[i]);
        }
    });

    socket.on('update_proposal', function(proposal){
        updateproposal(proposal);
    });

    const getSeparatorClassForTimestamp = function(timestamp) {
        var date = moment.unix(timestamp);
        var month = date.format("MMMM");
        var year = date.format("YYYY");
        return ".proposal-separator-" + month + "-" + year;
    }

    var receiveproposal = function(proposal) {
        var id = proposal["id"];
        var description = proposal["description"];
        var link = proposal["link"];
        var likes = proposal["likes"];
        var budget = proposal["budget"];
        var status = proposal["status"];
        var time = proposal["time"];

        var separatorClass = $(getSeparatorClassForTimestamp(time));

        if (separatorClass.length == 0) {
            proposalSeparator(time);
        }
        
        proposalAdd(id, description, link, status, likes, budget, time);
    }

    var updateproposal = function(proposal) {
        var id = proposal["id"];
        var description = proposal["description"];
        var link = proposal["link"];
        var likes = proposal["likes"];
        var budget = proposal["budget"];
        var status = proposal["status"];
        var time = proposal["time"];

        var proposalBox = "#proposal-box-" + id;

        $(proposalBox).find(proposal_likes_btn).find("span").text(likes);
    }

    var proposalAdd = function(id, text, link, status, likes, budget, time) {
        var separator_window = getSeparatorClassForTimestamp(time);

        $(separator_window).append( createproposalItem(id, text, link, status, likes, budget) );
    }
    
    var proposalSeparator = function(timestamp) {
        $(proposal_window).append( createproposalSeparator(timestamp) );
    }

    const isValidGitURL = function(str) {
        for(var i = 0;i < gitDomains.length; i++) {
            if (str.startsWith(gitDomains[i]))
                return true;
        }
        return false;
    }

    const updateproposalStep = function(step) {
        if (step == 0) {
            $(proposal_input).attr("placeholder", "Description");
            $(proposal_step_previous).fadeOut();
            $(proposal_step_next).fadeIn();
        }
        else if (step == 1) {
            $(proposal_input).attr("placeholder", "GitHub Link");
            $(proposal_step_previous).fadeIn();
            $(proposal_step_next).fadeIn();
        }
        else if (step == 2) {
            $(proposal_input).attr("placeholder", "Budget");
            $(proposal_step_previous).fadeIn();
            $(proposal_step_next).fadeIn();
        }

        $(proposal_step_count).text(step + 1);
        $(proposal_input).val(newproposal[step]);
    }

    var submitproposal = function(user, description, link, budget) {
        var payload = {"user": user, "description": description, "link": link, "budget": budget};

        socket.emit('proposal', payload );
    }

    var submitLike = function(proposalID) {
        var payload = {"id": proposalID};

        socket.emit('like', payload );
    }

    var resetStep = function() {
        newproposal = [];
        currentStep = 0;
        updateproposalStep(currentStep);
    }
    
    var processStep = function(stepDir) {
        var stepInput = $(proposal_input).val();
        
        if (isValidStep(currentStep, stepInput) || stepDir < 0) {
            newproposal[currentStep] = $(proposal_input).val();
            currentStep += stepDir;

            updateproposalStep(currentStep);

            if (currentStep == 3) {
                submitproposal(user, newproposal[0], newproposal[1], newproposal[2]);
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

    const getproposalIDFromClass = function(proposalBox) {
        return $(proposalBox).attr("id").replace("proposal-box-", "");
    }

    // EVENTS
    $(document).on('keypress', proposal_input, function (e) {
        if (e.keyCode === 13) {
            processStep(1);
        }
    });

    $(document).on('click', proposal_step_next, function (e) {
        processStep(1);
    });

    $(document).on('click', proposal_step_previous, function (e) {
        processStep(-1);
    });

    $(document).on('click', proposal_likes_btn, function (e) {
        var proposalID = getproposalIDFromClass($(this).closest( ".proposal-box" ));

        if ( $.isNumeric(proposalID) ) {
            submitLike(proposalID);
        }
    });

  });