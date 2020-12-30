# fayQuery
fayQuery is a small library that I created for a learning project (a small WebGL game). For this project I did not want to use any libraries - therefore, I created fayQuery as a sort of clone of jQuery [fayQuery = fake-jQuery].

## Installation
To use fayQuery, simply put the fayQuery.js or fayQuery.min.js file somewhere in your project.

## Requirements
fayQuery has very limited cross-browser code; it was initially written for a WebGL based game, which means the browser supported most things I needed.
The main requirement is the existence of querySelectorAll() and the support of any selectors you want to use. Depending on the latter, IE8 may be in or out.
Some specific functions require newer versions of browsers.

## Functions
Some function are not documented, as they are meant for internal usage.

### Core
#### $(source)
Create a fayQuery list from any of the following:
* a HTMLElement instance, will return a fayQuery list of that single element.
* an Array, HTMLCollection or NodeList, will return a fayQuery list with the same elements. This will never be a live list.
* a CSS selector string. Will return any matching elements (uses querySelectorAll).

#### $.$(base, source)
Same as above. For the CSS selector, querySelectorAll will be called on the base.
This is useful if you want to search within a specific element to which you already have a reference.

#### fayQuery list: .get(propertyName)
Return the value of the property of the first item in the list. Will not check whether the property is defined.
Returns undefined if the list is empty.

#### fayQuery list: .getAttribute(attributeName)
Return the value of the attribute of the first item in the list. Will not check whether the attribute is defined and whether the first element in the list has the getAttribute() method implemented.
Returns undefined if the list is empty.

#### fayQuery list: .set(propertyName, value)
Sets the value as a property for all items in the list.

#### fayQuery list: .setAttribute(attributeName, value)
Sets the value as a attribute for all items in the list. Will not check whether the elements in the list have the setAttribute() method implemented.

#### fayQuery list: .append(propertyName, value)
Sets or appends the value as a property for all items in the list.

#### fayQuery list: .appendAttribute(attributeName, value)
Sets or appends the value as a attribute for all items in the list. Will not check whether the elements in the list have the setAttribute() method implemented.

#### fayQuery list: .setStyle(properties)
Sets the styles defined in properties.
The property-value pairs in the object will be added to the style object as property-value pairs.
Example object:
```
{
	backgroundColor: '#000',
	color: '#FFF'
}
```

Has some experimental for support for directly entering a CSS string. Do not use this, it may not be present in future versions.

#### fayQuery list: .setInnerHTML(html)
Sets the innerHTML of all elements in the list.
Effectively the same as .set('innerHTML', html);

#### fayQuery list: .addEventListener(...)
Calls addEventListener with the same arguments on each element in the list (only four arguments will be used).

#### fayQuery list: .removeEventListener(...)
Calls removeEventListener with the same arguments on each element in the list (only four arguments will be used).

#### $.remove(el)
Removes an element from its parent.

#### fayQuery list: .remove()
Removes all elements in the list from their parents.

#### $.hasClass(el, class)
Returns true if el has the given class. false Otherwise.

#### fayQuery list: .hasClass(class)
Returns true if any element in the list has the given class. false Otherwise.

#### fayQuery list: .allHaveClass(class)
Returns true if all elements in the list have the given class. false Otherwise.

#### $.addClass(el, class)
Adds the given class to the classes of el. Does not add the class if it already is in the classes of an element.

#### fayQuery list: .addClass(class)
Adds the given class to all elements in the list. Does not add the class if it already is in the classes of an element.

#### $.removeClass(el, class)
Removes the given class from el. Has no effect if el does not have the class.

#### fayQuery list: .removeClass(class)
Removes the given class from all elements in the list. Does not have any effect on elements without the class.

#### $.toggleClass(el, class)
Adds the class to el if el does not have the given class. Otherwise removes it.

#### fayQuery list: .toggleClass(class)
Adds the class to any element int he list that does not have the given class. Removes it from the others.

#### fayQuery list: .run(function, ...)
Runs the function on each of the elements in the list. 'this' Will refer to the element within the function.
Any extra arguments passed, will be passed to the called function. The current index within the list is passed as the final argument.

#### fayQuery list: .each(function, ...)
Runs the function on each of the elements in the list. 'this' Will refer to the element within the function.
Any extra arguments passed, will be passed to the called function. If the function returns false, the function will not be called on any further elements.

#### $.getText(el)
Returns the textual content of an element.

#### fayQuery list: .getText()
Returns the textual contenf of the first item of the list. Returns undefined if the list is empty. Does not check if the first item in the list is an actual element.