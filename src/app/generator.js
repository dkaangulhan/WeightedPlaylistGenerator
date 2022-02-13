import { Carousel } from "./carousel";
import { GenerateRandom } from "./util"
import { edit_mode } from "./util"
import { OpenEditPanel } from "./util";
var item_created = 0;//This keeps value of total items created
var created_items = [];//keeps items


//Function for adding items which will be input for the generator
export function AddItem() {
    var item_name = document.getElementById("item_name").value;
    var item_src = document.getElementById("item_src").value;
    var item_weight = parseFloat(document.getElementById("item_weight").value);

    if (edit_mode == null) {
        var temp_item = document.createElement("li");
        temp_item.id = "item_" + item_created;
        temp_item.classList.add(['item']);
        temp_item.innerHTML = "<a id=\"" + temp_item.id + "_name\"  class=\"item_properties\">" + item_name + "</a><a class=\"seperator\"></a><div style=\"height: 100%; position: absolute; top: 0; left: 30%;\"><a class=\"item_properties\">weight: </a><a id=\"" + temp_item.id + "_weight\" class=\"item_properties\">" + item_weight + "</a></div>";

        var button_delete = document.createElement("button");
        button_delete.classList.add("generator_button", "button_hover", "button_red");
        button_delete.innerHTML = "Delete";
        button_delete.onclick = function () { Item.DeleteItem(temp_item.id); }
        temp_item.appendChild(button_delete);

        var button_edit = document.createElement("button");
        button_edit.classList.add("generator_button", "button_hover");
        button_edit.innerHTML = "Edit";
        button_edit.onclick = function () { OpenEditPanel(temp_item.id); }
        temp_item.appendChild(button_edit);

        document.getElementById("generated_item_list").appendChild(temp_item);
        created_items.push(new Item(temp_item, item_src, item_weight));
        item_created++;
    } else {
        document.getElementById(edit_mode.domObject.id + "_name").innerText = item_name;
        document.getElementById(edit_mode.domObject.id + "_weight").innerText = item_weight;

        edit_mode.weight = item_weight;
        edit_mode.src = item_src;
    }

    document.getElementById("item_edit_panel").style.display = "none";
}


export function Generate() {
    /*
    *highest_weight is used for controlling if the playlist can be constructed using given weights
    *if highest_weight is more than %50 of the weight_total playlist shouldn't be created
    *because of that there can not be consecutive same item, %51 means half of the list +1 which has to be
    *placed consecutively
    */
    var highest_weight = -1;
    var weight_total = 0;
    var generate_panel_item_count = parseFloat(document.getElementById("generate_panel_item_count").value);
    for (var i = 0; i < created_items.length; i++) {
        weight_total += created_items[i].weight;
        if (created_items[i].weight > highest_weight) {
            highest_weight = created_items[i].weight;
        }
    }

    var weight_total_begin_value = weight_total;
    highest_weight = generate_panel_item_count / weight_total * highest_weight;
    weight_total = generate_panel_item_count;
    if (weight_total % 2 == 1)
        weight_total++;


    if (highest_weight / weight_total <= 0.5 && item_created > 0) {
        new Generator(generate_panel_item_count, weight_total_begin_value, 10000);//Test cases
        new Generator(generate_panel_item_count, weight_total_begin_value, 1, true);//Demonstration
    }
    else {
        alert("Playlist couldn't be generated because of the inappropriate weight selection!");
    }

}

//This class is used for creating playlist using created_items array which contain weighted playlist items
export class Generator {
    item_list = [];
    playlist_length;
    weight_total;
    static current_generator;

    //create_dom parameter is for if the list items will be created on screen
    constructor(playlist_length, weight_total, test_count = 1, create_dom = false) {
        document.getElementById("presentation_ul").innerHTML = "";

        this.playlist_length = playlist_length;
        this.weight_total = weight_total;

        var test_items = [];
        for (var i = 0; i < created_items.length; i++) {
            test_items.push(new Item(created_items[i].domObject, null, created_items[i].weight));
        }

        for (var i = 0; i < test_count; i++) {
            this.CreateList(created_items, create_dom);

            for (var t = 0; t < created_items.length; t++) {
                test_items[t].itemCreated += created_items[t].itemCreated;
                created_items[t].itemCreated = 0;
            }

            Generator.current_generator = this;
            if (!create_dom)
                this.item_list = [];
            else {
                var img1 = document.getElementById("carousel_img1");
                var img2 = document.getElementById("carousel_img2");
                var img3 = document.getElementById("carousel_img3");

                var item_list_length = this.item_list.length;

                Carousel.carousel.current_row = 0;//When new playlist is created, current_row of carousel is set as 0

                img1.src = Generator.current_generator.item_list[(item_list_length + Carousel.carousel.current_row - 1) % item_list_length].src;
                img2.src = Generator.current_generator.item_list[Carousel.carousel.current_row].src;
                img3.src = Generator.current_generator.item_list[(Carousel.carousel.current_row + 1) % item_list_length].src;
            }
        }

        console.log("Total elements created: " + (playlist_length * test_count));
        console.log("Total test covered: " + test_count);
        for (var i = 0; i < test_items.length; i++) {
            console.log(test_items[i].domObject.id + "--> Weight: " + (test_items[i].weight / this.weight_total) + " Result Weight: " + (test_items[i].itemCreated / (playlist_length * test_count)));
        }
        console.log("---------------------------------");

    }

    //This method is called on constructor to create weighted playlist's DOM elements and fills the playlist
    CreateList(created_items, create_dom) {
        var probabilties = [];//probabilites array is used for weighting which is based on x/100
        for (var i = 0; i < created_items.length; i++) {
            var count = created_items[i].weight / this.weight_total * 100;
            for (var t = 0; t < count; t++) {
                probabilties.push(created_items[i]);
            }
        }

        var last_created_item = null;//This is for keeping the last created item in order not to create the same element consecutively
        var rand = GenerateRandom(0, probabilties.length);
        for (var i = 0; i < this.playlist_length - 1; i++) {
            
            while (probabilties[rand].domObject == last_created_item) {
                rand = GenerateRandom(0, probabilties.length);
            }
            this.item_list.push(probabilties[rand]);
            last_created_item = probabilties[rand].domObject;
            probabilties[rand].itemCreated++;
        }
        rand = GenerateRandom(0, probabilties.length);
        while (probabilties[rand].domObject == last_created_item || probabilties[rand].domObject == this.item_list[0].domObject) {
            rand = GenerateRandom(0, probabilties.length);
        }
        this.item_list.push(probabilties[rand]);
        probabilties[rand].itemCreated++;


        var lowers = [];//lowers array keeps the items that are created less than given weight
        var highers = [];//highers array keeps the items that are created more than given weight
        for (var i = 0; i < created_items.length; i++) {
            if (created_items[i].itemCreated / this.item_list.length < created_items[i].weight / this.weight_total) {
                var add_count = created_items[i].weight / this.weight_total - created_items[i].itemCreated / this.item_list.length;
                add_count = add_count * this.playlist_length;
                for (var t = 0; t < add_count; t++)
                    lowers.push(created_items[i]);
            } else {
                var add_count = created_items[i].itemCreated / this.item_list.length - created_items[i].weight / this.weight_total;
                add_count = add_count * this.playlist_length;
                for (var t = 0; t < add_count; t++)
                    highers.push(created_items[i]);
            }
        }

        //common_length keeps lower length between lowers and highers not to get out of index error
        var common_length = lowers.length > highers.length ? highers.length : lowers.length;

        //This for loop changes elements that were created more than its weight with the ones that were created less than its weight
        for (var i = 0; i < common_length; i++) {
            for (var t = 1; t < this.item_list.length - 1; t++) {
                if (this.item_list[t] == highers[i] && lowers[i] != this.item_list[t - 1] && lowers[i] != this.item_list[t + 1]) {
                    this.item_list[t] = lowers[i];
                    lowers[i].itemCreated++;
                    highers[i].itemCreated--;
                    break;
                }
            }
        }

        //If same objects are placed consecutively, error is displayed on console
        for (var i = 0; i < this.item_list.length - 1; i++) {
            if (this.item_list[i] == this.item_list[i + 1])
                console.log("ERROR!!");
        }

        //If create_dom bool is true on parameter of constructor, playlist is filled on HTML
        if (create_dom) {
            for (var i = 0; i < this.item_list.length; i++) {
                var node = document.createElement("li");
                node.innerHTML = "<a>" + document.getElementById(this.item_list[i].domObject.id + "_name").innerHTML + "</a>";
                document.getElementById("presentation_ul").appendChild(node);
            }
        }

        document.getElementById("generator_page").style.display = "none";
        document.getElementById("presentation_page").style.display = "block";
    }
}

//Item class is general class for items that are created
export class Item {
    domObject;
    src;
    weight;
    itemCreated;//This is for keeping how many items have been created on generator


    constructor(domObject, src, weigth = 0) {
        this.domObject = domObject;
        this.src = src;
        this.weight = weigth;
        this.itemCreated = 0;
    }

    static DeleteItem(item_id) {
        for (var i = 0; i < created_items.length; i++) {
            if (created_items[i].domObject.id == item_id) {
                var temp = created_items[created_items.length - 1];
                created_items[created_items.length - 1] = created_items[i];
                created_items[i] = temp;

                created_items[created_items.length - 1].domObject.remove();
                created_items.pop();
                break;
            }
        }
    }

    static FindItem(item_id) {
        for (var i = 0; i < created_items.length; i++) {
            if (created_items[i].domObject.id == item_id) {
                return created_items[i];
            }
        }

        return null;
    }
}