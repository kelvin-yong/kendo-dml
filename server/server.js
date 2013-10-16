/**
 * Module dependencies.
 */
var connect = require('connect');
var http = require('http')
var url = require('url');
var fs = require('fs');

var createProducts = function() {
	var products = [];
	products.push({pid:1, name:"table", price: 900, stock: 20});
	products.push({pid:2, name:"chair", price: 120, stock: 80});
	products.push({pid:3, name:"oven", price: 480, stock: 16});
	products.push({pid:4, name:"kettle", price: 65, stock: 19});
	return products;
}

var allProducts = createProducts();

/**
 * Create Application Server.
 */
var app = connect();

app.use(connect.logger('dev')); 
app.use(connect.query());
app.use(connect.bodyParser());

// print headers to console
app.use(function(req, res, next) {
	console.log("URL: " + req.url + " METHOD: " + req.method);
	console.log("REQUEST HEADERS");
	console.log(req.headers);
	console.log("QUERY: ", req.query);
	console.log("BODY: ", req.body);
	next();
});

// deal with cross domain pre-flight request
app.use(function(req, res, next) {
	if (req.method=="OPTIONS") {
		res.writeHead(200, {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
			'Access-Control-Allow-Headers': 'SESSION',
			'Access-Control-Max-Age': '30',
		});
		res.end();
	} else {
		next();
	}
});

// for movies data [ds04.html]
app.use(function(req, res, next) {
	if (req.url=='/' && req.method=="POST") {
		res.writeHead(200, {
			'Content-Type': 'application/json'
			,'Access-Control-Allow-Origin': '*'
		});
		if ("cartoon"==req.body.movietype) {
			fs.createReadStream('static/cartoon.json').pipe(res);
		} else if ("thriller"==req.body.movietype) {
			fs.createReadStream('static/thriller.json').pipe(res);
		} else {
			fs.createReadStream('static/all.json').pipe(res);
		}
	} else {
		next();
	}
});

// for products data [mvvm06.html]
app.use(function(req, res, next) {
	if (req.url=='/products') {
		res.writeHead(200, {
			'Content-Type': 'application/json'
			,'Access-Control-Allow-Origin': '*'
		});
		if (req.body.reset == 'true') {
			allProducts = createProducts();
		}
		res.end(JSON.stringify(allProducts));
	} else {
		next();
	}
});

app.use(function(req, res, next) {
	if (req.url=='/products/destroy') {
		var models = req.body.models;
		if (models==null){
			models = [req.body];
		}
		
		models.forEach(function(elem){
			allProducts.every(function(product, index, array) {
    			if (product.pid == elem.pid) {
    				array.splice(index, 1);
        			return false;
    			}
    			return true;
			})
		});

		res.writeHead(200, {
			'Content-Type': 'application/json'
			,'Access-Control-Allow-Origin': '*'
		});
		res.end("[]");
	} else {
		next();
	}
});

app.use(function(req, res, next) {
	if (req.url=='/products/update') {
		var models = req.body.models;
		if (models==null){
			models = [req.body];
		}
		
		models.forEach(function(elem){
			allProducts.every(function(product, index, array) {
    			if (product.pid == elem.pid) {
    				array[index] = elem;
        			return false;
    			}
    			return true;
			})
		});

		res.writeHead(200, {
			'Content-Type': 'application/json'
			,'Access-Control-Allow-Origin': '*'
		});
		res.end("[]");
	} else {
		next();
	}
});

// for endless scrolling [list07.html]
app.use(function(req, res, next) {
	if (req.url=='/endless') {
		var allData = [], totalRecords = 280;		
		
		var i = parseInt(req.body.skip);
		var max = i + parseInt(req.body.pageSize);
        if (max>totalRecords) {
            max = totalRecords;
        }
		
		for (; i < max; i++) {
            allData .push({ name: "Remote " + i, modified: +new Date() });
        }

		res.writeHead(200, {
			'Content-Type': 'application/json'
			,'Access-Control-Allow-Origin': '*'
		});
		
		// simulate slow loading
		if (req.body.slow=="true") {
			setTimeout(function(){
				res.end(JSON.stringify(allData));	
			}, 1500);
		} else {
			res.end(JSON.stringify(allData));
		}
	} else {
		next();
	}
});

var server = http.createServer(app);	
server.listen(7100);

