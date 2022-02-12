import { Generator } from "./generator"

export class Carousel {
    static carousel;
    animation;//When the current playlist item is changed, created animation which moves carousel is kept in this variable

    img_selected;//This is for keeping the element that is being dragged
    mouse_left_difference;//This keeps the initial difference between mouse point and offsetLeft of the element being dragged

    current_row;//This keeps the current playlist item that is shown to the user

    constructor() {
        this.animation = null;
        this.img_selected = null;
        this.mouse_left_difference = 0;
        this.current_row = 0;

        Carousel.carousel = this;
    }

    Animate(to) {
        if (this.animation != null)
            clearInterval(this.animation);

        if (to == "left")
            this.ToLeft();
        else
            this.ToRight();
    }

    ToLeft() {
        var img1 = document.getElementById("carousel_img1");
        var img2 = document.getElementById("carousel_img2");
        var img3 = document.getElementById("carousel_img3");
        var carosuel_pos = document.getElementById("carousel_images").getBoundingClientRect();
        this.animation = setInterval(frame);
        var anim = this.animation;
        var ref = this;
        function frame() {
            if (img2.offsetLeft * -1 > img2.offsetWidth) {
                clearInterval(anim);

                img1.style.left = img1.offsetWidth + "px";
                img2.style.left = img2.offsetWidth * -1;
                img3.style.left = 0;

                //below, DOM object which keeps the current playlist element is set as carousel_img2 which is on the center of the carousel
                img1.id = "carousel_img3";
                img2.id = "carousel_img1";
                img3.id = "carousel_img2";

                var item_list_length = Generator.current_generator.item_list.length;

                ref.current_row -= 1;
                if (ref.current_row < 0)
                    ref.current_row = item_list_length - 1;

                img3.src = Generator.current_generator.item_list[ref.current_row].src;
                img2.src = Generator.current_generator.item_list[(item_list_length + ref.current_row - 1) % item_list_length].src;
                img1.src = Generator.current_generator.item_list[(ref.current_row + 1) % item_list_length].src;

                document.getElementById("carousel_playlist_element").innerHTML = ref.current_row;
            }
            else {
                ref.CalculateOpacity(img1, img2, img3, carosuel_pos);
                img1.style.left = (img1.offsetLeft - 15) + "px";
                img2.style.left = (img2.offsetLeft - 15) + "px";
                img3.style.left = (img3.offsetLeft - 15) + "px";
            }
        }
    }

    ToRight() {
        var img1 = document.getElementById("carousel_img1");
        var img2 = document.getElementById("carousel_img2");
        var img3 = document.getElementById("carousel_img3");
        var carosuel_pos = document.getElementById("carousel_images").getBoundingClientRect();
        this.animation = setInterval(frame);
        var anim = this.animation;
        var ref = this;

        function frame() {
            if (img2.offsetLeft > img2.offsetWidth) {
                clearInterval(anim);

                img1.style.left = 0;
                img2.style.left = img2.offsetWidth;
                img3.style.left = (img1.offsetWidth * -1) + "px";

                //below, DOM object which keeps the current playlist element is set as carousel_img2 which is on the center of the carousel
                img1.id = "carousel_img2";
                img2.id = "carousel_img3";
                img3.id = "carousel_img1";

                ref.current_row += 1;
                if (ref.current_row > Generator.current_generator.item_list.length - 1)
                    ref.current_row = 0;

                var item_list_length = Generator.current_generator.item_list.length;

                img1.src = Generator.current_generator.item_list[ref.current_row].src;
                img2.src = Generator.current_generator.item_list[(ref.current_row + 1) % item_list_length].src;
                img3.src = Generator.current_generator.item_list[(item_list_length + ref.current_row - 1) % item_list_length].src;

                document.getElementById("carousel_playlist_element").innerHTML = ref.current_row;
            }
            else {
                ref.CalculateOpacity(img1, img2, img3, carosuel_pos);
                img1.style.left = (img1.offsetLeft + 15) + "px";
                img2.style.left = (img2.offsetLeft + 15) + "px";
                img3.style.left = (img3.offsetLeft + 15) + "px";
            }
        }
    }

    CalculateOpacity(img1, img2, img3, carosuel_pos) {
        img1.style.opacity = 1 / Math.abs(((carosuel_pos.width / 2) - (img1.offsetLeft + img1.offsetWidth / 2)) / (screen.width / 18));
        img2.style.opacity = 1 / Math.abs(((carosuel_pos.width / 2) - (img2.offsetLeft + img2.offsetWidth / 2)) / (screen.width / 18));
        img3.style.opacity = 1 / Math.abs(((carosuel_pos.width / 2) - (img3.offsetLeft + img3.offsetWidth / 2)) / (screen.width / 18));
    }

    Click(e, event) {
        if (this.animation != null)
            clearInterval(this.animation);

        this.mouse_left_difference = event.clientX - document.getElementById("carousel_img2").getBoundingClientRect().left + scrollX;
        this.img_selected = e;
    }

    //When mouse is dropped, this method runs and adjust final position of the playlist elements
    Leave() {
        this.img_selected = null;
        var img1 = document.getElementById("carousel_img1");
        var img2 = document.getElementById("carousel_img2");
        var img3 = document.getElementById("carousel_img3");

        if (Math.abs(img2.offsetLeft) > img2.offsetWidth / 4) {
            if (img2.offsetLeft > 0)
                this.ToRight();
            else
                this.ToLeft();
        } else {
            img2.style.left = "0px";
            img1.style.left = img2.offsetLeft - img1.offsetWidth + "px";
            img3.style.left = img2.offsetLeft + img3.offsetWidth + "px";
        }
    }

    //Translate moves carousel objects according to mouse position
    Translate(event) {
        if (this.img_selected != null) {
            var carosuel_pos = document.getElementById("carousel_images").getBoundingClientRect();
            var diff = event.clientX - carosuel_pos.left + scrollX - this.mouse_left_difference;
            var img1 = document.getElementById("carousel_img1");
            var img2 = document.getElementById("carousel_img2");
            var img3 = document.getElementById("carousel_img3");

            img1.style.left = img2.offsetLeft - img1.offsetWidth + "px";
            img2.style.left = diff + "px";
            img3.style.left = img2.offsetLeft + img3.offsetWidth + "px";

            this.CalculateOpacity(img1, img2, img3, carosuel_pos);
        }
    }

}