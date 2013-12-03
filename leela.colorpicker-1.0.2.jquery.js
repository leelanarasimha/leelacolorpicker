/**
 * Leela Color Picker in jQuery
 *
 * Licensed under the MIT (MIT-LICENSE.txt) licenses.
 *
 * Copyright (c) 2013
 * Leela Narasimha Reddy (leela.narsimha@gmail.com)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */


//Utility
if (typeof Object.create !== 'funtion') {
    Object.create = function(obj) {
        function F() {};
        F.prototype = obj;
        return new F();
    }
}

(function($){
    var Picker = {
        init: function(options, elem) {
            var self = this;
            self.elem = elem;
            self.$elem = $(elem);
            self.options = $.extend({}, $.fn.colorPicker.options, options);
            self.construct();
        },
        
        getHtmlData: function() {
            var self = this;
			var htmlData = false;
			var colorpickerPresent = $('.colorpickerClass').length;
				htmlData = '<div style="z-index: '+self.options.zindex+';position: absolute;display: none; background-color: white; border: 1px solid #CCC;" class="colorpickerClass">';
				var count = 0;
				for (var i=self.options.rows; i>0; i--) {
				for (var j=self.options.cols; j>0; j--) {
						htmlData += '<div  class="color_cell" title="'+self.options.colorData[count]+'"  style="background-color:'+self.options.colorData[count]+';float: left;"></div>';
						if (count == self.options.colorData.length) count = 0;
						count++;
					}
					htmlData += '<div class="no-space" style="clear: both;"></div>';
				}
				if (self.options.showCode) {
					htmlData += '<div class="show_code" style="text-align: center;font-size: 12px;border-top: 1px solid #ccc;"></div>'
				}
				htmlData += '</div>'; 
            return htmlData;
        },
        attachToElem: function(htmlData) {
			var n = this;
			$('.colorpickerClass').remove();
			$('body').append(htmlData);
			$('.colorpickerClass').hide();
			
			$(".colorpickerClass div.color_cell").css("width", n.options.cellWidth).css("height", n.options.cellHeight).css("margin", n.options.cellSpacing).css("outline", "1px solid #CCC");
            $(".colorpickerClass div.no-space").css("width", "0px").css("height", "0px").css("border", "none")
        },
		
        enableClick: function() {
            var self = this;
            self.$elem.on('click', function(e){
                e.stopPropagation();
				$('.colorpickerClass').show();
			var pos = self.$elem.offset();
			var top = pos.top + self.options.top;
			var left = pos.left + self.options.left;
			$('.colorpickerClass').show().css({
				top: top,
				left: left
			});
            });
			
            $(document).bind('click', function() {
                 $('.colorpickerClass').hide();
            });
			
			$('div.color_cell').on('mouseover', function() {
				if (self.options.showCode === 1) {
					$('div.show_code').html($(this).attr('title'));
				}
			});
        },
		
		createColorCodes : function(colorCodeLimit) {
			var self = this;
			var colorCodes = [];
			if (self.options.colorData.length === 0) {
				var colorLetters = ['A','0','B','1','2','C','3','D','4','E','5','F','6','7','8','9'];
				for (var i = 0, len = colorLetters.length; i < len; i++ ) {
					for ( var j = i, len2 = colorLetters.length; j < len2; j++) {
						for ( var k = j, len3 = colorLetters.length; k < len3; k++) {
							if (colorCodes.length < colorCodeLimit) {
								colorCodes.push('#'+colorLetters[i]+colorLetters[j]+colorLetters[k]);
							} else {
								break;
							}
						}
					}
				}
			} else {
				var colorLimit = self.options.rows * self.options.cols;
				var colorDataLength = self.options.colorData.length;
				var count = 0;
				for (var i = 0, len = colorLimit; i < len; i++ ) {
					colorCodes.push(self.options.colorData[count]);
					if ( colorDataLength-1 <= count ) {
						count = 0;
					} else {
						count ++;
					}
					
				}
			}
			return colorCodes;
		},
		
		getonSelect: function() {
			var self = this;
			if (typeof self.options.onSelect === 'function') {
				$('div.color_cell').on('click', function(e){
					e.preventDefault();
					e.stopPropagation();
					$('.colorpickerClass').hide();
					self.selectedColorCode = $(this).attr('title');
					self.options.onSelect.call( this, self.selectedColorCode );
					
				});
			};
			if (typeof self.options.onmouseover === 'function') {
				$('div.color_cell').on('mouseover', function(e){
					e.preventDefault();
					e.stopPropagation();
					self.selectedColorCode = $(this).attr('title');
					self.options.onmouseover.call( this, self.selectedColorCode );
				});
			};
		},
		
        construct: function() {
            var self = this;
			self.options.colorData = self.createColorCodes(self.options.rows * self.options.cols );
            self.attachToElem(self.getHtmlData());
            self.enableClick();
			self.getonSelect();
        }
    };
    
    $.fn.colorPicker = function(options) {
        return this.each(function(){
            var picker = Object.create(Picker);
            picker.init(options, this);
        });
    };
    
    $.fn.colorPicker.options = {
        rows: 4,
        cols: 4,
        cellWidth: 20,
        cellHeight: 20,
        cellSpacing: 5,
        zindex: 200,
        top: 10,
        left: 10,
        showCode: 0,
        colorData: [],
		onSelect: null
    };
})(jQuery);