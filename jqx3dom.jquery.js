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
	var FONT_COLOR = "#000000";
	var FONT_FAMILY = 'San-Serif';
	var FONT_SIZE = .5;
	var ANIMATION_CODE = '<timeSensor DEF="clock" cycleInterval="16" loop="true"></timeSensor>\
		<OrientationInterpolator DEF="spinThings" key="0 0.25 0.5 0.75 1" keyValue="0 1 0 0  0 1 0 1.57079  0 1 0 3.14159  0 1 0 4.71239  0 1 0 6.28317"></OrientationInterpolator>\
        <ROUTE fromNode="clock" fromField="fraction_changed" toNode="spinThings" toField="set_fraction"></ROUTE>\
    	<ROUTE fromNode="spinThings" fromField="value_changed" toNode="rotationArea" toField="set_rotation"></ROUTE>';
	
	// hex to RGB converter
	function hex2rgb( hex ) {
		hex = (hex.substr(0,1)=="#") ? hex.substr(1) : hex;
		return [parseInt(hex.substr(0,2), 16)/255, parseInt(hex.substr(2,2), 16)/255, parseInt(hex.substr(4,2), 16)/255];
	};	
	
	function setLabel ( oAttr ) {
		var z = oAttr.z;
		var label = '\
			<transform translation="' + oAttr.x + ',' + oAttr.y + ',' + ++z + '">\<shape>\
			<appearance>\
				<material diffuseColor="'+hex2rgb(oAttr.fontColor)+'" ></material>\
			</appearance>\
			<text string="'+oAttr.label+'">\
				<fontstyle family="'+oAttr.fontFamily+'" size="'+oAttr.fontSize+'"></fontstyle>\
			</text>\
			</shape></transform>';
			return label;
  	}
	
	// change existing arguments
	function setArgs (oDefault, oArg)
	{
		$.each( oArg, function( key, value ) {
			oDefault[key] = value;
		});
		return oDefault;
	}

	function x3domInit(elem, options) {
		var animationCode = options.sceneAnimation ? ANIMATION_CODE : '';
		var xmlx3d = $($.parseXML( '\
		<x3d id="x3dElement" width="150px" height="150px" showStat="false" showLog="false">\
		<Scene><transform DEF="rotationArea"><Background skyColor="1 1 1"/><Viewpoint orientation="0,0,0,1" position="0,0,10" /></transform>'
		+animationCode+'</Scene>\
		</x3d>' ));			
		//<OrientationInterpolator DEF="spinThings" key="0 0.25 0.5 0.75 1" keyValue="0 1 0 0  0 1 0 1.57079  0 1 0 3.14159  0 1 0 4.71239  0 1 0 6.28317"></orientationInterpolator>\

		xmlx3d.find('x3d').attr('width', options.width);		
		xmlx3d.find('x3d').attr('height', options.height);
		xmlx3d.find('x3d').attr('showStat', options.showStat);
		xmlx3d.find('x3d').attr('showLog', options.showLog);		
		xmlx3d.find('Background').attr('skyColor', hex2rgb(options.background));
		xmlx3d.find('Viewpoint').attr('orientation', options.ViewpointOrientation);
		xmlx3d.find('Viewpoint').attr('position', options.ViewpointPosition);
		var x3dElem = (new XMLSerializer()).serializeToString(xmlx3d[0]);
		FONT_FAMILY = options.fontFamily;
		FONT_SIZE = options.fontSize;
		elem.append(x3dElem);
	};
	
	/* public functions
	--------------------------------------------------------------------------*/
	$.fn.addText = function( oArg) {
		var oAttr = {x:0,y:0,z:0,text:'',fontFamily:'Arial',fontColor:FONT_COLOR,fontSize:FONT_SIZE};
		if (oArg != null) { oAttr = setArgs (oAttr, oArg); }
		
		this.find('scene').append($('\
			<transform translation="' + oAttr.x + ',' + oAttr.y + ',' + oAttr.z + '">\<shape>\
			<appearance>\
				<material diffuseColor="'+hex2rgb(oAttr.fontColor)+'" ></material>\
			</appearance>\
			<text string="'+oAttr.text+'">\
				<fontstyle family="'+oAttr.fontFamily+'" size="'+oAttr.fontSize+'"></fontstyle>\
			</text>\
			</shape></transform>'));

  	}
	$.fn.addCylinder = function( oArg) {
		var oAttr = {x:0,y:0,z:0,radius:1,height:1,color:NODE_COLOR,label:'',fontFamily:'Arial',fontColor:FONT_COLOR,fontSize:FONT_SIZE};
		if (oArg != null) { oAttr = setArgs (oAttr, oArg); }
		var label = (oAttr.label.length > 0) ? setLabel ( oAttr ) : '';
		this.find('scene').append($('\
			<transform translation="' + oAttr.x + ',' + oAttr.y + ',' + oAttr.z + '">\
			<shape><appearance><material diffuseColor="'+hex2rgb(oAttr.color)+'"></material></appearance><Cylinder radius="'+oAttr.radius+' "height="'+oAttr.height+'"></Cylinder></shape>\
			</transform>'+label));
	};	
	$.fn.addSphere = function( oArg) {
		var oAttr = {x:0,y:0,z:0,radius:1,color:NODE_COLOR,label:'',fontFamily:'Arial',fontColor:FONT_COLOR,fontSize:FONT_SIZE};
		if (oArg != null) { oAttr = setArgs (oAttr, oArg); }
		var label = (oAttr.label.length > 0) ? setLabel ( oAttr ) : '';
		this.find('scene').append($('\
			<transform translation="' + oAttr.x + ',' + oAttr.y + ',' + oAttr.z + '">\
			<shape><appearance><material diffuseColor="'+hex2rgb(oAttr.color)+'"></material></appearance><Sphere radius="'+oAttr.radius+'"></Sphere></shape>\
			</transform>'+label));
	};	
	$.fn.addCone = function( oArg ) {
		var oAttr = {x:0,y:0,z:0, height:1,bottomRadius:1.0,topRadius:0,color:NODE_COLOR,label:'',fontFamily:'Arial',fontColor:FONT_COLOR,fontSize:FONT_SIZE};
		if (oArg != null) { oAttr = setArgs (oAttr, oArg); }
		var label = (oAttr.label.length > 0) ? setLabel ( oAttr ) : '';
		this.find('scene').append($('\
			<transform translation="' + oAttr.x + ',' + oAttr.y + ',' + oAttr.z + '">\
			<shape><appearance><material diffuseColor="'+hex2rgb(oAttr.color)+'"></material></appearance><Cone  height="'+oAttr.height+'" bottomRadius="'+oAttr.bottomRadius+'" topRadius="'+oAttr.topRadius+'"></Cone></shape>\
			</transform>'+label));
	};	
	$.fn.addBox = function( oArg ) {
		var oAttr = {x:0,y:0,z:0,width:1,depth:1,height:1,color:NODE_COLOR,label:'',fontFamily:FONT_FAMILY,fontColor:FONT_COLOR,fontSize:FONT_SIZE};
		if (oArg != null) { oAttr = setArgs (oAttr, oArg); }
		var label = (oAttr.label.length > 0) ? setLabel ( oAttr ) : '';
		this.find('scene').append($('\
			<transform translation="' + oAttr.x + ',' + oAttr.y + ',' + oAttr.z + '">\
			<shape><appearance><material diffuseColor="'+hex2rgb(oAttr.color)+'"></material></appearance><Box size="'+oAttr.width+','+oAttr.height+','+oAttr.depth+'"></Box></shape>\
			</transform>'+label));
	};	

	$.fn.jqx3dom.defaults = {
		width:		"150px",
		height:		"150px",
		background:	"#ffffff",
		fontSize:	0.8,
		fontFamily:	'Sans',
		sceneAnimation: false,
		ViewpointOrientation: '0,0,0,1',//"0.1,-0.2,-0.2,-0.1" 
		ViewpointPosition: '0,0,10',
		showStat:	false,
		showLog:	false,
		id:			"x3dElement"		
	};
}( jQuery ));