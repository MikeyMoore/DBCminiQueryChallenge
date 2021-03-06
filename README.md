# miniQuery challenge

##Summary

[jQuery](http://jquery.com/) is a very popular Javascript toolbelt. It is a
collection of tools, each tool allows you to do a very specific job, for
example:

- Select elements with css: `$('#id')`, `$('.class')`, `$('element')`
- Manipulate the DOM: `.show()`, `.hide()`, `.addClass()`, `.removeClass()`, etc.
- Dispatch and listen for events: `.trigger(...)`, `.on(...)`
- Send http requests: `$.ajax`

It's important to realize that jQuery is not just one thing, it's a collection
of things grouped under one framework. In fact, some parts of it could be used
as standalone tools. For example, jQuery uses
[Sizzle](https://github.com/jquery/sizzle) under the hood as its selector
engine.

In this challenge we will decompose jQuery and reimplement some of its
functionality. We will start by implementing each tool on its own. Eventually,
we will group everything together under one toolbelt: miniQuery. The objective
is to remove the "magic" from jQuery and realize that it's nothing you couldn't
write. It's also important to separate the different tools that jQuery provides
you by function and to be able to identify them as separate components
collected under one umbrella.

### Setting Up the Application

Under the source folder, you'll find an index.html file and a lib folder. The
index.html is very simple, it primarily links to our miniQuery library and
allows us to test it easily. The lib folder contains miniQuery.js, this is
where you'll be spending most of your time. You are NOT allowed to include the
jQuery or any other external library, this would defeat the purpose of this
challenge. You are, however, encouraged to read the jQuery code, get inspired.
You will be using the browser console to test your code.

**IMPORTANT**: You should **not** double-click on the `index.html` file to open
it. You will want to have an actual web server "host" the file for you. The
Python language comes with a built-in simple web server which will serve your
`index.html` page. Open a terminal window and from within the directory with
`index.html` in it type: `python -m SimpleHTTPServer`.

This will start a, uh, simple http server on port 8000. If ever you need to
server something quickly, it's worth knowing about this particular bit of
Python awesomeness.

Read [Module Pattern chapter of Javascript Design Patterns][mod]


##Releases

###Release 0: A selector library
Create a module called SweetSelector that allows us to do the following (hint: you need to do it in [pure javascript](http://www.w3schools.com/js/js_htmldom_elements.asp) ):

- select by id:
```javascript
// should return <div id="eyed">eyed</div>
SweetSelector.select('#eyed')
```
- select by class:
```javascript
// should return <div class="klass">klass</div>
SweetSelector.select('.klass')
```
- select by tag name:
```javascript
// should return <a href="#hello">click me</a>
SweetSelector.select('a')
```

**Important**:  You _should not_ use `document.querySelector*` methods.  Try to go as punk rock as possible: DIY with the lowest-level tools you can find.  As a **Bonus** feel free to add a `querySelector` or `querySelectorAll` of your own design to the `SweetSeelctor` namespace.

###Release 1: DOM manipulation

Create a module called DOM that allows us to do the following:

Hint: What does hide actually do? Try it in jQuery, hide an element and inspect it. See anything different? Styling maybe?

- hide and show elements:
```javascript
DOM.hide('.klass') // hides the div
DOM.show('.klass') // shows the div
```
- addClass and removeClass elements:
```javascript
// div.klass should look like this: <div class="klass custom">klass</div>
DOM.addClass('.klass', 'custom')
// div.klass should look like this: <div class="klass">klass</div>
DOM.removeClass('.klass', 'custom')
```

###Release 2:  Event dispatch
Create a module called EventDispatcher that allows us to do the following:

Hints:

- Read about events, [here is a start](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events)

Implement the following functionalities:

```javascript
EventDispatcher.on('.klass', 'customEvent', function() { console.log("fired my own custom event!") });
EventDispatcher.trigger('.klass', 'customEvent');
// this should print "fired my own custom event!" in the console.
```

###Release 3: Ajax
Create a module called AjaxWrapper that allows us to do the following:

Hints:
  * [using XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest)
  * [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

```javascript
// this should an ajax request to the url and call the then callback if successful and catch callback if unsuccessful.
AjaxWrapper.request({
 url: 'someurl',
 type: 'GET'
}).then(function(response) {
  // Handle data returned from the Promise
}).catch(function(error) {
  // Handle data returned from the Promise
});
```

###Release 4: miniQuery

Let's namespace all of our tools/libraries into one awesome toolbelt: miniQuery. We want to be able to do the following:

```javascript
// selectors:
miniQuery('.klass')
miniQuery('#eyed')
miniQuery('a')
// DOM manipulation
miniQuery('.klass').hide();
miniQuery('.klass').show();
miniQuery('.klass').addClass();
miniQuery('.klass').removeClass();
// Event Dispatch
miniQuery('.klass').on('customEvent', function() { console.log("fired my own custom event!") });
miniQuery('.klass').trigger('customEvent');
// ajax
miniQuery.ajax({
 url: 'someurl',
 type: 'GET',
 success: function() {
   //do something
 },
 fail: function() {
  //do something
 }
});
```

- Start by creating a miniQuery module and move everything under it. So you'll have a somthing like:
```javascript
miniQuery.DOM.hide('.klass');
miniQuery.AjaxWrapper.request({...});
```
- Then move the selectors so they work directly from miniQuery('...'). Don't move all of the functions straight under miniQuery module, think of a clean way to use them under the hood.
- Continue with the rest of the libraries and make sure you're not repeating yourself. Meaning, can the libraries use each other?
- Take small steps, don't attempt to solve this all at once.

###Release 5: DOM ready
Remember that jQuery.ready takes a callback function as an argument. This callback is executed when the DOM is ready.

Let's write the miniQuery equivalent.

There are two situations the DOM can be in when you call miniQuery.ready:
- DOM is ready: execute the callback immediately
- DOM is not ready: pass your callback to an event listener which listens to an event that fires when the DOM is ready. This event exists; you don't need to rewrite it.

You can test by checking document.readyState within your ready function and seeing if it always equals "complete"

Hints:
  * [DOMContentLoaded event](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded)
  * [document.readyState](https://developer.mozilla.org/en-US/docs/Web/API/Document/readyState)

```javascript
miniQuery.ready( function() { console.log("The DOM is ready"); })
```

###Release 6: use $
miniQuery is too long to write, can we use $ as well. Nothing should change, we'll just give the user the option to use miniQuery() or $().

###Dive Deeper
- [Bonzo](https://github.com/ded/bonzo)
- [reqwest](https://github.com/ded/reqwest)
- [Bean](https://github.com/fat/bean)
[mod]:http://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript
