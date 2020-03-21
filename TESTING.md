<div align="center">

[View this website on GitHub Pages](https://astromerik.github.io/milestone1/) 
</div>

## Testing 

### Validation 

The code for the application has been tested using [W3C's HTLM Validator](https://validator.w3.org/) for the HTML code, [W3C's CSS Validator](https://validator.w3.org/) for the CSS code and [JSHint](https://jshint.com/) for the JavaScript code.
As of date the code get no error or warning messages for the HTML code and the CSS Code when running through the validators. 
When running JSHint it is configured to recognize new format, thus new types is not flaged, such as arrow functions or "let". 
JSHint reacts to line 28 in the JavaScript code: "Chart is an undefined variable". As the Chart is collected from Chart.JS it is a default vairable. When removing the variable, the chart will not run. 
JSHint reacts to line 73 in the JavaScript code: "searchStock is an unused variable". Since it is a function, I cannot leave it un-named. If I do, I get an error message from the IDE.
JSHint reacts to line 110 in the JavaScript code: "async functions' is only available in ES8". This is a warning and will not be fixed. 

### Testing function by function 

The test below is performed manually. 

#### Navigation bar 
The navigation bar is interactive and clickable:
* When clicked - "Home" directs the user to the top of the page
* When clicked - "Application" directs the user to the Success Tracker application
* When clicked - "About" directs the user to the about section 
* When clicked - "Contact" directs the user to the contact section 
* When the screen siz is less than 992 pixels, it collapses into a "hamburger menu" and moving the logotype to the top left of the screen instead of the center.
* When clicked - "Hamburger menu" colabses and display the navigation options. 
* The functionality is the same for the options displayed in the collapsed hamburger menu as on the full size navbar, all options work as expected.
* The hamburger menu do not dissapear after a option has been clicked. This need additional JavaScript which will be added in the future. 

#### Footer

The footer contains three icons. 
* When the Twitter icon is clicked - The user is redirected to Twitter's home page (opened in a new tab in the browser)
* When the Instagram icon is clicked - The user is redirected to Instagram's home page (opened in a new tab in the browser)
* When the Facebook icon is clicked - The user is redirected to Facebook's home page (opened in a new tab in the browser)

#### Home section
The home section is not interactive in terms of user mouse clicks. 
* When screen width is reduced to a width of 767 pixels or less, the smallest text beneath the icons dissapear and two icons per row is displayed (instead of 3)

#### Application 
The application section is the section which includes most interaction with the user. 
* When entering a letter in the search bar the user is presented with a list of option which match the input. The more letters the user puts in, the fewer options and more accurate the result is presented.
* When hover over the alternatives, the background for the specific alternativ changes background from transparent to orange. The mouse also changes to a pointer to indicate that the alternative is clickable.
* When an alternative is clicked, a request is sent to the API. The API answers with data which is displayed in a graph and in stock information (last day of trading, highest price of the day, lowest price of the day, closing price of the day)
* While the API is answering the request, a "loading gif" is presented for the user.
* As mentioned in the readme - When a request is sent to the API containg information which is not available in the API, the user do not get a error message and the "loading gif" is running until the page is reloaded or the user ask for a new stock that is available in the API. This is a problem.
* When text is removed from the input field, the list is continiously cleared. 
* When the screen width is 767 pixels or less, the stock information is displayed in pairs instead of all of them on one row. 
* The chart is currently not displaying a label for the last day of trading on the x-axis. This need deeper investigation.

#### About Section 
The home section is not interactive in terms of user mouse clicks. 
* When the screen width is 576 pixels or less, the cards displaying fictional user portfolios are stacked on top of each other instead of on one row. 

#### Contact 
The FAQ section is clickable and interactive:
* When the mouse is hovering over the questions, the question changes colour to indicate that it is clickabel. 
* When the first question is clicked, the question collapses and display the answer
* When the second question is clicked, the question collapses and display the answer
* When the third question is clicked, the question collapses and display the answer 

### Webpage on different browsers/devices 

The website is tested and work as expected on Google Chrome, Safari, Mozilla Firefox and Microsoft Edge. 
The Website is tested and work as expected on OnePlus 7T (Android OS) and Iphone X (iOS). 

 ### Future testing 

* Future testing will be to add automatic testing, for example Jasmine to test the JavaScript and jQuery code. 