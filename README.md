leelacolorpicker
================

Simple Jquery Color Picker

Basic Leela Colorpicker v1

This is a very minimal, yet robust Color Picker based on jQuery.

Color Picker requires jQuery 1.7.1 or higher. 
Make sure to load it before Color Picker (there's no other dependencies!).

### Implementation

	<script src='http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js'></script>
	<script src='leela.colorpicker-1.0.jquery.min.js'></script>
	

#### Plugin Usage

	$('h1').colorPicker({
  		rows: 8, // No of rows to display
		cols: 8, // No of columns to display
		top: 20, // Top position to display color picker
		left: 20, // Left position to display color picker
		cellspacing: 4, // Space between the cells 
		cellWidth: 20, // width of each cell showing color
		cellHeight: 20, // height of each cell showing color
		zindex: 200, // zindex for the color picker
		showCode: 0, // showing code on the bottom if made as 1
		onSelect: function(colorcode) { // function upon selecting the color
		// Use Your ajax code to use this color code
		},
		onmouseover: function(colorcode) { // function upon selecting the color
		// Use Your ajax code to use this color code
		},
		colorData: ['red','blue','orange'] //Custom colors if mentioned loads the colors from the array. 
		//Accepted hexadecimal colorcodes also
	});

All are not mandatory. If mentioned takes the values if not default values are assigned.

Let us know how you are using leela Color Picker...

### Contributor
Leela Narasimha Reddy - leela.narsimha@gmail.com

### Issues & Suggestions

Please report any bugs or feature requests here: https://github.com/leelanarasimha/leelacolorpicker/issues
