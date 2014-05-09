/*
* jqx3dom - X3DOM jQuery wrapper for 3D geometry
*
* Aleksandar Radovanovic (2014)
* http://www.livereference.org/jqx3dom
*
* Licensed under the MIT license:
* http://www.opensource.org/licenses/mit-license.php
*
*
* Based on X3DOM (http://www.x3dom.org)
*
*/
(function ( $ ) {
	
	$.fn.jqx3dom = function( options ) {
		var options = $.extend( {}, $.fn.jqx3dom.defaults, options );
		return this.each(function() {			
			var element = $( this );
			x3domInit(element, options);
		});
	};

	/* private functions
	--------------------------------------------------------------------------*/
	
	var NODE_COLOR = "#cccccc";
	// hex to RGB converter
	function hex2rgb( hex ) {
		hex = (hex.substr(0,1)=="#") ? hex.substr(1) : hex;
		return [parseInt(hex.substr(0,2), 16)/255, parseInt(hex.substr(2,2), 16)/255, parseInt(hex.substr(4,2), 16)/255];
	};	
	
	// change existing arguments
	function setArgs (oDefault, oArg)
	{
		$.each( oArg, function( key, value ) {
			oDefault[key] = value;
		});
		return oDefault;
	}

	function x3domInit(elem, options) {
		var xmlx3d = $($.parseXML( '<x3d id="x3dElement" width="150px" height="150px" showStat="false" showLog="false"><Scene><Background skyColor="1 1 1"/></Scene>\</x3d>' ));			
		xmlx3d.find('x3d').attr('width', options.width);		
		xmlx3d.find('x3d').attr('height', options.height);
		xmlx3d.find('x3d').attr('showStat', options.showStat);
		xmlx3d.find('x3d').attr('showLog', options.showLog);		
		xmlx3d.find('Background').attr('skyColor', hex2rgb(options.background));
		var x3dElem = (new XMLSerializer()).serializeToString(xmlx3d[0]);
		elem.append(x3dElem);
	};
	
	/* public functions
	--------------------------------------------------------------------------*/
	$.fn.addCylinder = function( oArg) {
		var oAttr = {x:0,y:0,z:0,radius:1,height:1,color:NODE_COLOR};
		if (oArg != null) { oAttr = setArgs (oAttr, oArg); }
		this.find('scene').append($('\
			<transform translation="' + oAttr.x + ',' + oAttr.y + ',' + oAttr.z + '">\
			<shape><appearance><material diffuseColor="'+hex2rgb(oAttr.color)+'"></material></appearance><Cylinder radius="'+oAttr.radius+' "height="'+oAttr.height+'"></Cylinder></shape>\
			</transform>\
			'));
	};	
	$.fn.addSphere = function( oArg) {
		var oAttr = {x:0,y:0,z:0,radius:1,color:NODE_COLOR};
		if (oArg != null) { oAttr = setArgs (oAttr, oArg); }
		this.find('scene').append($('\
			<transform translation="' + oAttr.x + ',' + oAttr.y + ',' + oAttr.z + '">\
			<shape><appearance><material diffuseColor="'+hex2rgb(oAttr.color)+'"></material></appearance><Sphere radius="'+oAttr.radius+'"></Sphere></shape>\
			</transform>\
			'));
	};	
	$.fn.addCone = function( oArg ) {
		var oAttr = {x:0,y:0,z:0, height:1,bottomRadius:1.0,topRadius:0,color:NODE_COLOR};
		if (oArg != null) { oAttr = setArgs (oAttr, oArg); }
		this.find('scene').append($('\
			<transform translation="' + oAttr.x + ',' + oAttr.y + ',' + oAttr.z + '">\
			<shape><appearance><material diffuseColor="'+hex2rgb(oAttr.color)+'"></material></appearance><Cone  height="'+oAttr.height+'" bottomRadius="'+oAttr.bottomRadius+'" topRadius="'+oAttr.topRadius+'"></Cone></shape>\
			</transform>\
			'));
	};	
	$.fn.addBox = function( oArg ) {
		var oAttr = {x:0,y:0,z:0,width:1,depth:1,height:1,color:NODE_COLOR};
		if (oArg != null) { oAttr = setArgs (oAttr, oArg); }
		this.find('scene').append($('\
			<transform translation="' + oAttr.x + ',' + oAttr.y + ',' + oAttr.z + '">\
			<shape><appearance><material diffuseColor="'+hex2rgb(oAttr.color)+'"></material></appearance><Box size="'+oAttr.width+','+oAttr.depth+','+oAttr.height+'"></Box></shape>\
			</transform>\
			'));
	};	

	$.fn.jqx3dom.defaults = {
		width:		"150px",
		height:		"150px",
		background:	"#ffffff",
		showStat:	false,
		showLog:	false,
		id:			"x3dElement"		
	};
}( jQuery ));