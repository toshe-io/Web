;
/*
 * AshAlom Gauge Meter.  Version 2.0.0
 * Copyright AshAlom.com  All rights reserved.
 * https://github.com/AshAlom/GaugeMeter <- Deleted!
 * https://github.com/githubsrinath/GaugeMeter <- Backup original.
 *
 * Original created by Dr Ash Alom
 *
 * This is a bug fixed and modified version of the AshAlom Gauge Meter.
 * Copyright 2018 Michael Wolf (Mictronics)
 * https://github.com/mictronics/GaugeMeter
 *
 */
!function ($) {
    $.fn.gaugeMeter = function (t) {
        var defaults = $.extend({
            id: "",
            percent: 0,
            used: null,
            total: null,
            size: 100,
            prepend: "",
            append: "",
            theme: "Red-Gold-Green",
            color: "",
            back: "RGBa(0,0,0,.06)",
            width: 3,
            style: "Full",
            stripe: "0",
            animationstep: 1,
            animate_gauge_colors: false,
            animate_text_colors: false,
            label: "",
            label_color: "Black",
            text: "",
            text_size: 0.22,
            fill: "",
            showvalue: false
        }, t);
        return this.each(function () {

           function colorLerp(p, rgb_beginning, rgb_end){
                var w = p * 2 - 1;
            
                var w1 = (w + 1) / 2.0;
                var w2 = 1 - w1;
            
                var rgb = [parseInt(rgb_beginning[0] * w1 + rgb_end[0] * w2),
                    parseInt(rgb_beginning[1] * w1 + rgb_end[1] * w2),
                        parseInt(rgb_beginning[2] * w1 + rgb_end[2] * w2)];
                return rgb;
            };

            function rgbToHex(rgb) {
                return "#" + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);
              }

           function getThemeColor(value){
                var color1;
                var color2;
                if (option.theme == "Red-Green") {
                    color1 = [231,76,60];
                    color2 = [46,204,113];
                }
                else if (option.theme == "Green-Red") {
                    color1 = [46,204,113];
                    color2 = [231,76,60];
                }

               return rgbToHex(colorLerp(value/100, color1, color2));
            }
            
            /* The label below gauge. */
            function createLabel(t, a) {
                console.log("createLabel");
                if(t.children("b").length === 0){
                    console.log("createLabel2");
                    $("<b></b>").appendTo(t).html(option.label).css({
                        "line-height": option.size + 5 * a + "px",
                        color: option.label_color
                    });
                }
                else if(option.label.length > 0) {
                    t.children("b").html(option.label);
                }
            }
            /* Prepend and append text, the gauge text or percentage value. */
            function createSpanTag(t) {
                var fgcolor = "";
                if (option.animate_text_colors === true){
                    fgcolor = option.fgcolor;
                }
                var child = t.children("span");
                if(child.length !== 0){
                    child.html(r).css({color: fgcolor});
                    return;
                }
                if(option.text_size <= 0.0 || Number.isNaN(option.text_size)){
                    option.text_size = 0.22;
                }
                if(option.text_size > 0.5){
                    option.text_size = 0.5;
                }
                $("<span></span>").appendTo(t).html(r).css({
                    "line-height": option.size + "px",
                    "font-size": option.text_size * option.size + "px",
                    color: fgcolor
                });
            }
            /* Get data attributes as options from div tag. Fall back to defaults when not exists. */
            function getDataAttr(t) {
                $.each(dataAttr, function (index, element) {
                    if(t.data(element) !== undefined && t.data(element) !== null){
                        option[element] = t.data(element);
                    } else {
                        option[element] = $(defaults).attr(element);
                    }

                    if(element === "fill"){
                        s = option[element];
                    }

                    if((element === "size" ||
                        element === "width" ||
                        element === "animationstep" ||
                        element === "stripe"
                        ) && !Number.isInteger(option[element])){
                        option[element] = parseInt(option[element]);
                    }

                    if(element === "text_size"){
                        option[element] = parseFloat(option[element]);
                    }
                });
            }
            /* Draws the gauge. */
            function drawGauge(a) {
		        if(M < 0) M = 0;
                if(M > 100) M = 100;
                var lw = option.width < 1 || isNaN(option.width) ? option.size / 20 : option.width;
                g.clearRect(0, 0, b.width, b.height);
                g.beginPath();
                g.arc(m, v, x, G, k, !1);
                if(s){
                    g.fillStyle = option.fill;
                    g.fill();
                }
                g.lineWidth = lw;
                g.strokeStyle = option.back;
                option.stripe > parseInt(0) ? g.setLineDash([option.stripe], 1) : g.lineCap = "round";
                g.stroke();
                g.beginPath();
                g.arc(m, v, x, -I, P * a - I, !1);
                g.lineWidth = lw;
                g.strokeStyle = option.fgcolor;
                g.stroke();
                c > M && (M += z, requestAnimationFrame(function(){
                    drawGauge(Math.min(M, c) / 100);
                }, p));
            }

            $(this).attr("data-id", $(this).attr("id"));
            var r,
                dataAttr = ["percent",
                    "used",
                    "total",
                    "size",
                    "prepend",
                    "append",
                    "theme",
                    "color",
                    "back",
                    "width",
                    "style",
                    "stripe",
                    "animationstep",
                    "animate_gauge_colors",
                    "animate_text_colors",
                    "label",
                    "label_color",
                    "text",
                    "text_size",
                    "fill",
                    "showvalue"],
                option = {},
                c = 0,
                p = $(this),
                s = false;
            p.addClass("gaugeMeter");
            getDataAttr(p);

            if(Number.isInteger(option.used) && Number.isInteger(option.total)){
                c = option.used / (option.total / 100);
            } else {
                if(Number.isInteger(option.percent)){
                    c = option.percent;
                } else {
                    c = parseInt(defaults.percent);
                }
            }
            if(c < 0) c = 0;
            if(c > 100) c = 100;

            if( option.text !== "" && option.text !== null && option.text !== undefined){
                if(option.append !== "" && option.append !== null && option.append !== undefined){
                    r = option.text + "<u>" + option.append + "</u>";
                } else {
                    r = option.text;
                }
                if(option.prepend !== "" && option.prepend !== null && option.prepend !== undefined){
                    r = "<s>" + option.prepend + "</s>" + r;
                }
            } else {
                if(defaults.showvalue === true || option.showvalue === true){
                    r = option.used;
                } else {
                    r = c.toString();
                }
                if(option.prepend !== "" && option.prepend !== null && option.prepend !== undefined){
                    r = "<s>" + option.prepend + "</s>" + r;
                }

                if(option.append !== "" && option.append !== null && option.append !== undefined){
                    r = r + "<u>" + option.append + "</u>";
                }
            }

            option.fgcolor = getThemeColor(c);
            console.log(option.fgcolor);
            if(option.color !== "" && option.color !== null && option.color !== undefined){
                option.fgcolor = option.color;
            }

            if(option.animate_gauge_colors === true){
                option.fgcolor = getThemeColor(c);
            }
            createSpanTag(p);

            if(option.style !== "" && option.style !== null && option.style !== undefined){
                createLabel(p, option.size / 13);
            }

            $(this).width(option.size + "px");

            var b = $("<canvas></canvas>").attr({width: option.size, height: option.size}).get(0),
                    g = b.getContext("2d"),
                    m = b.width / 2,
                    v = b.height / 2,
                    _ = 360 * option.percent,
                    x = (_ * (Math.PI / 180), b.width / 2.5),
                    k = 2.3 * Math.PI,
                    G = 0,
                    M = 0 === option.animationstep ? c : 0,
                    z = Math.max(option.animationstep, 0),
                    P = 2 * Math.PI,
                    I = Math.PI / 2,
                    R = option.style;
            var child = $(this).children("canvas");
            if(child.length !== 0){
                /* Replace existing canvas when new percentage was written. */
                child.replaceWith(b);
            } else {
                /* Initially create canvas. */
                $(b).appendTo($(this));
            }

            if ("Semi" === R){
                k = 2 * Math.PI;
                G = 3.13;
                P = 1 * Math.PI;
                I = Math.PI / .996;
            }
            if ("Arch" === R){
                k = 2.195 * Math.PI;
                G = 1, G = 655.99999;
                P = 1.4 * Math.PI;
                I = Math.PI / .8335;
            }
            drawGauge(M / 100);
        });
    };
}
(jQuery);
