# ionic-mobile-app-project
#ToDo 3000!
This app was created as part of a "Mobile Applications Development" project.
A module in the second year of a "Software Development" course at GMIT.

##Core Features
1. Add a task
2. set description
3. store date set
4. store date due
5. set a category

##Extended functionality
1. Set custom task categories
2. Filter based on category
3. Sort A-Z, date set, due date
4. Delete custom categories
5. Archive Tasks
6. Delete Tasks

###Storing Tasks
I decided to store tasks using a map. The task category or type represents the map key, and the value returned is an object array that
conforms to the standard described above. This was allowed for quick filtering between task types, instead of storing everything
in one giant list and filtering by looping through an array.

Task types are stored in their own object array that simply stores the task type title and the associated colour. This allowed each
task type to have its own colour, making it (hopefully) more visually pleasing to the user.
I decided to have a seperate object array for the categories to ensure proper population of the map upon loading saved data.

I had to account for if the user had set custom tasks.
When a custom task type is created, it
1. Checks to see if the type is already in the object array
2. Adds the type to the object array
3. Puts a new key/value pair into the map.
I also had to ensure that upon loading from local storage, the map would fill with the custom lists, should they exist.
This meant I couldn't statically fill the map from the default types (Work and personal). I made it so that the list dynamically fills
based on the task types which are loaded in first.

###Considerations
If the user deletes a task type, I had to ensure that the key/value pair is removed from the map as well as local storage.
It also meant that the button in the view that allowed the user to choose that category for a new task had to go, as well as the filtering option.

##Sorting
I looked into how javascript array sorting worked and decided to create three comparison functions that the user could choose from.
When the user chooses to sort from a selection in the view, a switch statement is triggered. Upon meeting a requirement, a function
that fills an object array with all tasks from each map is created. This list is then sorted with the desired comparison function.

##Archiving, Removing
If the user archives a task, it is spliced out of whatever list it is in and put in a new object array with other completed tasks (regardless of type).
If it is removed, it is simply removed.
If it is updated, the user can change the due date of a task.
###Considerations
I had to ensure that the user could not archive tasks that were being show from the "completed" view. I acheived this by
hiding <ion-option-button> when the user switches to this view.
I also had to ensure that the proper item is removed if the user chooses to remove something while viewing all tasks.
An index of this array does not correspond to the indices of each map array. So I created a function that switches to the appropriate array,
checks if the object in the array is the object they picked and then removes it.

##Filtering
When the user picks a category to filter by, a function is called that attempts to get the value in the map by the key (whatever task category was chosen)
The current view is then changed to the object array that is returned. I felt that using maps as a way of filtering instead of looping through a giant array was
a better idea.

##Accounting for complexities
1. What if the user tries to delete default tasks category?
  * Don't allow the user to delete these! if the tasktype index is less than two, tell the user they can't remove those things!
2. What if the user tries to add a category thats already there?
3. What if the user tries to set the date to something before the current day?
  * use the input "min" functionallity to prevent entry of a date before the current date.

###Telling the User
If the user tries to do something I don't want them to do. I use the $ionicPopup service to pop a message that explains the issue to the user.
This includes if the user tries to delete the work category, or add a task without a name.
This allowed me to place various error and warning messages in the factory and pop them at the appropriate time.

###Updating Tasks and Removing Categories
If the user wishes to update a task, I use the modal service to show a specific view that allows the user to change a due date.
A similar approach is taken to the view which allows users to remove or add categories. Using the modal service allowed me to
keep the tabs included in the app to three core pillars of list/settings/newentry. I thought this kept it tidier than having a bunch
of tabs all beside each other. 

###Local Storage
When getting things from local storage using JSON parsing methods, I had to manually convert the date strings into date objects in the code.
Otherwise the objects would not display properly in the view, as it would expect a date object but get just a plain string.
This was a fun little problem to over-come.

###Styling
I decided to tie each task type to a colour that is passed to the view when displaying a list. This creates different colour styles for each button
or heading for each category. A small feature, but one that differentiates each category from each other.


###More Information

I have commented the factory and controllers to give further insight into my design decisions and solutions.
Please contact me if you have any questions.

-Mark Grimes
