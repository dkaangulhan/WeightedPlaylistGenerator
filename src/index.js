import { OpenPanel } from "./app/util"
import { ClosePanel } from "./app/util"
import { Generate } from "./app/generator"
import { WeightChange } from "./app/util"
import { AddItem } from "./app/generator"
import { OpenEditPanel } from "./app/util"
import { Carousel } from "./app/carousel"

document.getElementById("generate_button").onclick = Generate;
document.getElementById("close_generate_box_button").onclick = function () { ClosePanel("generate_panel") };;
document.getElementById("item_weight").onclick = WeightChange;
document.getElementById("add_item_button").onclick = AddItem;
document.getElementById("close_edit_panel_button").onclick = function () { ClosePanel("item_edit_panel") };;
document.getElementById("open_edit_panel_button").onclick = OpenEditPanel;
document.getElementById("open_generator_panel_button").onclick = function () { OpenPanel("generate_panel") };
document.getElementById("presentation_turn_edit").onclick = function () {
    document.getElementById("generator_page").style.display = "block";
    document.getElementById("presentation_page").style.display = "none";
};
document.getElementById("presentation_list_button").onclick = function () { 
    document.getElementById("presentation_list").style.display = "block";
    document.getElementById("presentation_carousel").style.display = "none";
};
document.getElementById("presentation_carousel_button").onclick = function () { 
    document.getElementById("presentation_carousel").style.display = "block";
    document.getElementById("presentation_list").style.display = "none";
};

document.getElementById("carousel_img1").onmousedown = function(e){
    Carousel.carousel.Click(document.getElementById("carousel_img1"),e);
};

document.getElementById("carousel_img2").onmousedown = function(e){
    Carousel.carousel.Click(document.getElementById("carousel_img2"), e);
};

document.getElementById("carousel_img3").onmousedown = function(e){
    Carousel.carousel.Click(document.getElementById("carousel_img3"), e);
};

document.getElementById("carousel_left_button").onclick = function(e){
    Carousel.carousel.Animate('left', e);
};

document.getElementById("carousel_right_button").onclick = function(e){
    Carousel.carousel.Animate('right', e);
};

new Carousel();