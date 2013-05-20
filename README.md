leelacolorpicker
================

Simple Jquery Color Picker

Basic Leela Colorpicker v1

This is a very minimal, yet robust Color Picker based on jQuery.

Color Picker requires jQuery 1.7.1 or higher. 
Make sure to load it before Color Picker (there's no other dependencies!).

<h4>Implementation</h4>

<pre>
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
			selectColor: function(colorcode) { // function upon selecting the color
			console.log(colorcode);
				// Use Your ajax code to use this color code
			},
			});
</pre>

All are not mandatory. If mentioned takes the values if not default values are assigned.

Let us know how you are using leela Color Picker...

<h3>Contributor</h3>
Leela Narasimha Reddy - leela.narsimha@gmail.com

<h3>Issues & Suggestions</h3>

Please report any bugs or feature requests here: https://github.com/leelanarasimha/leelacolorpicker/issues
