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
        var img_step_size = 10;

        var indicator1 = document.getElementById("page_indicator_1");
        var indicator2 = document.getElementById("page_indicator_2");
        var indicator3 = document.getElementById("page_indicator_3");
        var indicator4 = document.getElementById("page_indicator_4");
        var indicator5 = document.getElementById("page_indicator_5");

        var indicator_step_size = indicator3.offsetLeft / (img3.offsetLeft / img_step_size);//for completing the distance between indicator and the point they will go in precise step

        var carosuel_pos = document.getElementById("carousel_images").getBoundingClientRect();
        this.animation = setInterval(frame);
        var anim = this.animation;
        var ref = this;

        indicator3.style.transform="rotateZ(180deg)";
        indicator3.style.animationName="background_decrease";
        indicator4.style.transform="rotateZ(0deg)";
        indicator4.style.animationName="background_increase";
        this.TriggerAnim(indicator3);
        this.TriggerAnim(indicator4);
        

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

                indicator1.id = "page_indicator_5";
                indicator2.id = "page_indicator_1";
                indicator3.id = "page_indicator_2";
                indicator4.id = "page_indicator_3";
                indicator5.id = "page_indicator_4";
                
                indicator1.style.left = "105%";
                indicator3.style.left = "0";
                indicator4.style.left = "35%";
                indicator5.style.left = "70%";
                indicator1.style.transform = "";

                var item_list_length = Generator.current_generator.item_list.length;

                ref.current_row++;
                if (ref.current_row > item_list_length - 1)
                    ref.current_row = 0;

                img1.src = Generator.current_generator.item_list[(ref.current_row + 1) % item_list_length].src;

            }
            else {
                img1.style.left = (img1.offsetLeft - img_step_size) + "px";
                img2.style.left = (img2.offsetLeft - img_step_size) + "px";
                img3.style.left = (img3.offsetLeft - img_step_size) + "px";

                indicator1.style.left = (indicator1.offsetLeft - indicator_step_size) + "px";
                indicator2.style.left = (indicator2.offsetLeft - indicator_step_size) + "px";
                indicator3.style.left = (indicator3.offsetLeft - indicator_step_size) + "px";
                indicator4.style.left = (indicator4.offsetLeft - indicator_step_size) + "px";
                indicator5.style.left = (indicator5.offsetLeft - indicator_step_size) + "px";

                ref.CalculateOpacity(img1, img2, img3, carosuel_pos);
            }
        }
    }

    ToRight() {
        var img1 = document.getElementById("carousel_img1");
        var img2 = document.getElementById("carousel_img2");
        var img3 = document.getElementById("carousel_img3");
        var img_step_size = 10;

        var indicator1 = document.getElementById("page_indicator_1");
        var indicator2 = document.getElementById("page_indicator_2");
        var indicator3 = document.getElementById("page_indicator_3");
        var indicator4 = document.getElementById("page_indicator_4");
        var indicator5 = document.getElementById("page_indicator_5");
        var indicator_step_size = (indicator1.offsetLeft * -1) / ((img1.offsetLeft * -1) / img_step_size);

        var carosuel_pos = document.getElementById("carousel_images").getBoundingClientRect();
        this.animation = setInterval(frame);
        var anim = this.animation;
        var ref = this;

        indicator2.style.transform="rotateZ(180deg)";
        indicator2.style.animationName="background_increase";
        indicator3.style.transform="rotateZ(0deg)";
        indicator3.style.animationName="background_decrease";
        this.TriggerAnim(indicator2);
        this.TriggerAnim(indicator3);

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

                indicator1.id = "page_indicator_2";
                indicator2.id = "page_indicator_3";
                indicator3.id = "page_indicator_4";
                indicator4.id = "page_indicator_5";
                indicator5.id = "page_indicator_1";
                indicator2.style.transform = "";
                indicator5.style.left = "-35%";

                indicator1.style.left = "0";
                indicator2.style.left = "35%";
                indicator3.style.left = "70%";

                var item_list_length = Generator.current_generator.item_list.length;
                ref.current_row--;
                if (ref.current_row < 0)
                    ref.current_row = item_list_length - 1;

                img3.src = Generator.current_generator.item_list[(item_list_length + ref.current_row - 1) % item_list_length].src;

            }
            else {
                img1.style.left = (img1.offsetLeft + img_step_size) + "px";
                img2.style.left = (img2.offsetLeft + img_step_size) + "px";
                img3.style.left = (img3.offsetLeft + img_step_size) + "px";

                indicator1.style.left = (indicator1.offsetLeft + indicator_step_size) + "px";
                indicator2.style.left = (indicator2.offsetLeft + indicator_step_size) + "px";
                indicator3.style.left = (indicator3.offsetLeft + indicator_step_size) + "px";
                indicator4.style.left = (indicator4.offsetLeft + indicator_step_size) + "px";
                indicator5.style.left = (indicator5.offsetLeft + indicator_step_size) + "px";

                ref.CalculateOpacity(img1, img2, img3, carosuel_pos);



            }
        }
    }

    Click(e, event) {
        if (this.animation != null)
            clearInterval(this.animation);


        this.mouse_left_difference = event.clientX - document.getElementById("carousel_img2").getBoundingClientRect().left + scrollX;
        this.img_selected = e;
        var ref = this;
        document.body.onmousemove = function (e) {
            ref.Translate(e);
        }
        document.body.onclick = function () {
            ref.Leave();
        };
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
            var carosuel_pos = document.getElementById("carousel_images").getBoundingClientRect();
            this.CalculateOpacity(img1, img2, img3, carosuel_pos);
        }
        document.body.onmousemove = null;
        document.body.onclick = null;
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

    CalculateOpacity(img1, img2, img3, carosuel_pos) {
        img1.style.opacity = 1 / Math.abs(((carosuel_pos.width / 2) - (img1.offsetLeft + img1.offsetWidth / 2)) / (screen.width / 18));
        img2.style.opacity = 1 / Math.abs(((carosuel_pos.width / 2) - (img2.offsetLeft + img2.offsetWidth / 2)) / (screen.width / 18));
        img3.style.opacity = 1 / Math.abs(((carosuel_pos.width / 2) - (img3.offsetLeft + img3.offsetWidth / 2)) / (screen.width / 18));
    }

    //This is for triggering animation 
    TriggerAnim(element){
        element.style.display = "none";
        element.style.display = "block";
    }
}