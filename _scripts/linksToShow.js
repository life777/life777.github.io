(function (w) {
    var renderList = function (list) {
        var listElt = document.querySelector("[rel='presentations_list']");

        listElt.innerHTML = list.reduce(function (whole, pres) {
            var card = new Card(pres);
            return whole + card.toHTML();
        }, "");
    };

    if (document.readyState === "complete") {
        renderList(w.Presentations);
    } else {
        document.addEventListener("DOMContentLoaded", function () {
            renderList(w.Presentations);
        }, false);
    }
})(window);