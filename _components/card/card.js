(function (w) {
    var Card = function (options) {
        this.options = options;
        this.defImg = "/algorithms/pictures/1.png";
    };

    Card.prototype.videoToLink = function () {
        if (this.options.video) {
            return "<a class='presentation-card__video-link' href='" + this.options.video + "'>Video can be found here</a>";
        }

        return "";
    };

    Card.prototype.toHTML = function () {
        return "<div class='presentation-card'>" +
                    "<a class='presentation-card__link' href='" + this.options.link + "'>" +
                        "<h3 class='presentation-card__title'>" + this.options.title + "</h3>" +
                        "<img class='presentation-card__image' src='" + (this.options.img || this.defImg) + "' />" +
                    "</a>" +
                    this.videoToLink() +
                "</div>";
    };

    w.Card = Card;
})(window);