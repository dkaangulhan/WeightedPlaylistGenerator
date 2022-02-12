import { Item } from "./generator"

//When an item will be edited, this will be reference to item so that 'AddItem' function won't create new item, but will edit
export var edit_mode = null;

//max isn't included
export function GenerateRandom(min, max) {
    var t = max - min;
    return min + Math.floor(Math.random() * t);
}

export function OpenPanel(panel_id) {
    document.getElementById(panel_id).style.display = "block";
}

export function ClosePanel(panel_id) {
    document.getElementById(panel_id).style.display = "none";
}

export function WeightChange() {
    document.getElementById("weight_text").innerText = document.getElementById("item_weight").value;
}

export function OpenEditPanel(item_id = "") {
    document.getElementById("item_edit_panel").style.display = "block";

    edit_mode = null;

    var temp_item_name = "";
    var temp_item_src = "";
    var temp_item_weight = 1;

    if (item_id != "") {
        var item = Item.FindItem(item_id);
        if (item != null) {
            edit_mode = item;
            temp_item_name = document.getElementById(item.domObject.id + "_name").innerText;
            temp_item_src = item.src;
            temp_item_weight = item.weight;
        }
    }

    document.getElementById("item_name").value = temp_item_name;
    document.getElementById("item_src").value = temp_item_src;
    document.getElementById("item_weight").value = temp_item_weight;
    WeightChange();
}