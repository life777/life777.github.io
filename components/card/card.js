(function (w) {
    var Card = function (options) {
        this.options = options;
        this.defImg = "/algorithms/pictures/1.png";
    };

    Card.prototype.videoToLink = function (video, title) {
        return "<a target='_blank' class='presentation-card__video-link' href='" + video + "'>" + title +"</a>";
    };

    Card.prototype.videosToLink = function () {
        if (this.options.videos) {
            var videos = this.options.videos;
            var addIndex = videos.length > 1;
            return "<div class='presentation-card__video-list'>" + videos.map(function (video, index) {
                return this.videoToLink(video, addIndex ? "Video " + (index + 1) : "Video");
            }.bind(this)).join(" | ") + "</div>";
        }

        return "";
    };

    Card.prototype.toHTML = function () {
        return "<div class='presentation-card presentations-document__list-item'>" +
                    "<a target='_blank' class='presentation-card__link' href='" + this.options.link + "'>" +
                        "<div class='presentation-card__image' style='background-image: url(" + (this.options.img || this.defImg) + ");' ></div>" +
                        "<div class='presentation-card__header'>" +
                            "<h3 class='presentation-card__title'>" + this.options.title + "</h3>" +
                        "</div>" +
                    "</a>" +
                    this.videosToLink() +
                "</div>";
    };

    w.Card = Card;
})(window);