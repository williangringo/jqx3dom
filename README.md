# 3D interactive graphics for jQuery

jqx3dom is X3DOM/HTML5 based 3D interactive graphics plugin for jQuery.

## Example and usage

Basic usage

### HTML

```html
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="X-UA-Compatible" content="chrome=1" />
<meta charset="utf-8">

<script src="http://www.x3dom.org/download/x3dom.js"></script>
<script src="http://code.jquery.com/jquery-latest.js"></script>
<script src="jqx3dom.jquery.js"></script>

<script>
$(function() { 
	var myCanvas = $('#3dcanvas').jqx3dom();
	myCanvas.addBox (); // add an object
}); 
</script>
</head>

<body>
	<div id="3dcanvas"></div>
</body>
</html>
```

### jQuery

to initialize the canvas:

```js
// with default options
var myCanvas = $('#3dcanvas').jqx3dom();

// or with options of your choice
var myCanvas = $('#3dcanvas').jqx3dom({
	width:		"600px",
	height:		"600px",
	background:	"#eeeeee",
	showStat:	false,
	showLog:	false,
	id:			"x3dElement"
});
```

Demo and more examples in "examples" folder and in [http://www.livereference.org/jqx3dom/](http://www.livereference.org/jqx3dom/)

### Copyright
This software comes with the same license as jQuery. However, x3dom has its own license. Please check at [http://www.x3dom.org/](http://www.x3dom.org/)

_– [Aleksandar](http://www.livereference.org/jqx3dom/index.php)_
