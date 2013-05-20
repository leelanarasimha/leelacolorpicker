$(function(){
	
	$.fn.colorPicker = function(options) {
		var colorDefault = {
			rows: 4,
			cols: 4,
			top: 0,
			left: 0,
			zindex: 1,
			cellWidth: 10,
			cellHeight: 10,
			cellspacing: 5,
			mouseOverAction: false,
			showCode: 0,
			colorData: [
			'#ffffff',
			'#cceeff',
			'#ccccff',
			'#e5ccff',
			'#ffcccc',
			'#ffe5cc',
			'#e5ccff',
			'#ffffcc',
			'#ccffcc',
			'#99ccff',
			'#cc99ff',
			'#ff99ff','#99ff99','#c0c0c0','#6666ff','#ff66fe','#ffb266','#66ff66', '#999999','#399cfd','#9933ff','#ff3333','#feff33','#666666','#feff00','#444444'],
			selectColor: function(colorCode) {},
		}
		$.extend(colorDefault,options);
		
		$('.colorpickerClass').remove();
		
		this.each(function(){
			var $this = $(this);
			var htmlData = '<div style="z-index: '+colorDefault.zindex+';position: absolute;display: none; background-color: white; border: 1px solid #CCC;" class="colorpickerClass">';
			var count = 0;
			for (i=colorDefault.rows; i>0; i--) {
				for (j=colorDefault.cols; j>0; j--) {
					htmlData += '<div  class="color_cell" title="'+colorDefault.colorData[count]+'"  style="background-color:'+colorDefault.colorData[count]+';float: left;"></div>';
					if (count == colorDefault.colorData.length) count = 0;
					count++;
				}
				htmlData += '<div class="no-space" style="clear: both;"></div>';
			}
			if (colorDefault.showCode) {
				htmlData += '<div class="show_code"></div>'
			}
			htmlData += '</div>';
			
			$this.css('position', 'relative');
			$this.append(htmlData);
			$('.colorpickerClass').css('top',colorDefault.top).css('left',colorDefault.left);
			$this.find('.colorpickerClass div.color_cell').css('width', colorDefault.cellWidth).css('height',colorDefault.cellHeight).css('margin',colorDefault.cellspacing).css('outline','1px solid #CCC');
			$this.find('.colorpickerClass div.no-space').css('width','0px').css('height','0px').css('border','none');
			$this.on('click', function(e){
				e.preventDefault();
				e.stopPropagation();
				$('.colorpickerClass').hide();
				$('.show_code').hide();
				$(this).find('.colorpickerClass').show();
			});
		});
		
		$('.colorpickerClass div.color_cell').on('click', function(e){
			e.stopPropagation();
			var colorCode = $(this).attr('title');
			$('.colorpickerClass').hide();
			colorDefault.selectColor.call( this, colorCode );
			
		});
		
		$('.colorpickerClass div.color_cell').on('mouseover', function(e){
			$('.show_code').show();
			$(this).css('outline','1px solid #AAA').css('cursor','pointer');
			var colorCode = $(this).attr('title');
			$('.show_code').html(colorCode).css('font-size','12px').css('border-top','1px solid #CCC').css('text-align','center').css('background-color',colorCode);
		});
		
		$('.colorpickerClass div.color_cell').on('mouseleave', function(e){
			$(this).css('outline','1px solid #CCC').css('padding','0px');
		});
		
	}
	$('body').bind('click', function(e) {
		$('.colorpickerClass').hide();
	});
});
