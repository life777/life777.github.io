(function (w) {
    var Card = function (options) {
        this.options = options;
        this.defImg = "/algorithms/pictures/1.png";
    };

    Card.prototype.videoToLink = function (video, index) {
        return "<a class='presentation-card__video-link' href='" + video + "'>Video " + (index + 1) + "</a>";
    };

    Card.prototype.videosToLink = function () {
        if (this.options.videos) {
            var videos = this.options.videos;
            return "<div class='presentation-card__video-list'>" + videos.map(this.videoToLink).join(" | ") + "</div>";
        }

        return "";
    };

    Card.prototype.toHTML = function () {
        return "<div class='presentation-card'>" +
                    "<a class='presentation-card__link' href='" + this.options.link + "'>" +
                        "<div class='presentation-card__header'>" +
                            "<h3 class='presentation-card__title'>" + this.options.title + "</h3>" +
                        "</div>" +
                        "<div class='presentation-card__image' style='background-image: url(" + (this.options.img || this.defImg) + ");' ></div>" +
                    "</a>" +
                    this.videosToLink() +
                "</div>";
    };

    w.Card = Card;
})(window);