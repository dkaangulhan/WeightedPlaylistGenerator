-When index.html is opened, Edit/Add Item panel will welcome you to enter your first item for playlist
-Name input field is for visually identifying the item
-SRC input is for img elements that will be shown on 'carousel view' 
-Weight input can be set between 1 and 10. Then playlist items are weighted(probabilty of being selected on the playlist) based on total weight which all items' weight are summed
-After filling inputs, it can be added to the list of that will be input for generator by using 'Add' button. If wanted, inputs can be discarded by 'Cancel' button. Also can be deleted after creating using 'Delete' button
-After adding new item, new items can be added using 'Add Item' button, which is yellow and right-top of the screen. 
-Items are created, by clicking 'Generator' button, input for playlist length panel is opened. By giving input to Playlist Length, playlist can be generated.
-There is an error case when items are not weighted properly. If any item has more than 50% of the total weight, the list can not be created.
-After properly setting and generating the playlist, the panel that has List View and Carousel View is opened. When it is opened, List view will contain items and their names in listed order. In order to list the playlist in carousel view, at the bottom of the screen there are two buttons; left one is for list view and the right one is for carousel view.
-If it is wanted to edit the playlist items, it is possible to turn back to Add/Edit Item panel by clicking 'Turn to edit page' button which is placed at top-center of the screen.
-After generating the playlist after giving input to Playlist Length, 10000 test cases are created with the playlist length. Then one list is created with DOM objects for view panels to demonstration. Default generation function is defined in Generate function from generator.js . For generating, new object of Generator class is created. Constructor of the class takes 4 arguments, two of them are optional; test_count is for how many playlists will be generated, create_dom parameter is for if playlist will be drawn on screen