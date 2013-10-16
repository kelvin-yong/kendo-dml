# KendoUI Mobile: Datasource, MVVM, ListView

After you have worked your way through [Kendo UI Mobile Tutorial](https://github.com/kelvin-yong/kendo), you are now ready to learn more about Datasource, MVVM, and ListViews.

This repo contains various examples of the above topics in increasing complexity. It is recommended that you follow the examples in the sequence presented.


## Datasource 
The DataSource component is an abstraction for using local (arrays of JavaScript objects) or remote (XML, JSON, JSONP) data. It fully supports CRUD (Create, Read, Update, Destroy) data operations and provides both local and server-side support for sorting, paging, filtering, grouping, and aggregates.

### Examples
- `ds01.html` - We introduce a basic datasource and a template. When data is loaded, the change function is activated and we render the data with the template and swapped in the resulting HTML. This example also profiles the rendering speed for 50,000 runs.

- `ds02.html` - The same, except the template is created without using 'with' by specifying {useWithBlock:false}. The rendering speed is about 4 times faster.

- `ds03.html` - Same as `ds01.html`, except that the data is a remote datasource. Try the following commands in the console.
	- `dataSource.sort({ field: "rank", dir: "desc" });`
	- `dataSource.sort({ field: "rank", dir: "asc" });`
	- `dataSource.sort({ field: "year", dir: "desc" });`
	- `dataSource.sort({ field: "year", dir: "asc" });`

- `ds04.html` - Remote datasource from server. You will need to run the server application found in server/server.js via [Node](http://nodejs.org/).

	1. Navigate to the server folder and tun `node install`
	2. Run `node server.js`. The server starts on port 7100. Edit this if desired.
	3. In `ds04.html`, update the line `var baseServiceURL = "http://localhost:7100/";` to point to the server.


## MVVM 
Model View ViewModel (MVVM) is a design pattern which helps developers separate the Model (the data) from the View (the UI). The View-Model part of MVVM is responsible for exposing the data objects from the Model in such a way that those objects are easily consumed in the View.
Kendo MVVM is an implementation of the MVVM pattern which seamlessly integrates with the rest of the Kendo framework (widgets and DataSource).

### Examples
- `mvvm01.html` - This demo shows the basic features of MVVM. For data binding, we are using data-bind:text and source.

- `mvvm02.html` - Continuing from the previous example, we will now include the functionality of adding a person.

- `mvvm03.html` - In this example, we are now able to delete a person from our data.

- `mvvm04.html` - This is similar to `mvvm03.html`, mvvm04.html. We used **data-value-update="keyup"** for the text inputs. We have also explicitly made the array to contain observable objects, but this is not necessary according to [Kendo documentation](http://docs.kendoui.com/api/framework/observableobject). 

> **Important**: Complex fields are automatically wrapped in nested ObservableObject instances. Array fields are wrapped as kendo.data.ObservableArray objects. The change event of the child objects will bubble to the parent ObservableObject. Fields, which name are prefixed with an underscore will not be wrapped.

- `mvvm05.html` - We moved on to another example of MVVM, this time using multiple templates and also using the ViewModel's function inside the templates.

- `mvvm06.html` - Combining datasource in view model, and remote data operations on the server. As with `ds04.html`, you will need to run the server application found in server/server.js via [Node](http://nodejs.org/).

	1. Run `node server.js`. The server starts on port 7100. Edit this if desired.
	2. In `mvvm06.html`, update the line `var baseServiceURL = "http://localhost:7100/";` to point to the server.


## ListViews 
The Kendo Mobile ListView widget is used to display flat or grouped list of items. It can be either used in unbound mode by enhancing an HTML ul element, or bound to a DataSource instance.

Most examples here are adopted from Kendo UI Mobile Demo.

### Examples
- `list01.html` - This demo shows the basic usage of a grouped list view. In the \<ul\> element, try removing the `data-style="inset"` attribute and see what happens.

- `list02a.html` - Sample data binding to local data. For the flat list, we declared `<ul id="flat-listview"></ul>` then used JavaScript `$("#flat-listview").kendoMobileListView({ dataSource: flatData });` to bind the data.

- `list02b.html` - Same example of the above, but here, we used `<ul id="flat-listview" data-role="listview" data-source="flatData"></ul>` for the flat list and `<ul id="grouped-listview" data-role="listview" data-source="dsGroup" data-fixed-headers="true" data-template="template1"  data-header-template="header-template"></ul>` for the grouped list.

- `list03.html` - Custom templates. Shows how to prettify iOS or Android.

- `list04.html` - Mixing MVVM into list view. Nothing fanciful here.

- `list05.html` - Endless scrolling with local data. There is a total of 280 records. Understand this well and you will be able to follow the next 2 examples.

- `list06.html` - Endless scrolling with local data, but using another method.

- `list07.html` - Endless scrolling with data from the server. You'll need to run the server as with `mvvm06.html`. Change `params.slow` in `list07.html` to true to simulate slow loading from server.

