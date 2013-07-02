$(document).ready(function() {
	var sizeArray, currentSize;

	// Default settings when page loads
	(function() {
		$('#resizable').html('<iframe width="100%" height="100%" frameBorder="0"  id="myiframe" src="about:blank" sandbox="allow-same-origin allow-scripts allow-popups allow-forms"></iframe>').hide().resizable({
	        helper: "ui-resizable-helper"
	    });
		$('#bigUrl').val('www.getskeleton.com');
		$('#loadedUrl').val('');
		$('#sizeList')[0].selectedIndex = 0;
		$('nav').hide();
		currentSize = $('#resizable').width() + 'x768';
		$('#customOption').val(currentSize).text(currentSize + ' (custom)');
	})();
	
	function checkFooterSettings() {
		if ($('body').height() > $(window).height() - $('#disclaimer').height()) {
			$('#disclaimer').css({
				position: 'static'
			});
		} else {
			$('#disclaimer').css({
				position: 'fixed'
			});
		}
	}

	$('#sizeList').change(function() {
		currentSize = $(this).val();
		sizeArray = currentSize.split('x');
		$('#resizable').css({
			'width': sizeArray[0],
			'height': sizeArray[1]
		});
		checkFooterSettings();
	});
	
	$('#resizable').on("resizestop", function() {
		currentSize = $('#resizable').width() + 'x' + $('#resizable').height();
		$('#customOption').val(currentSize).text(currentSize + ' (custom)');
		$('#sizeList')[0].selectedIndex = 0;
		checkFooterSettings();
	});

	$('#urlForm').submit(function() {
		$('#openingWindow').hide();
		$('#myiframe').attr('src', 'http://' + $('#bigUrl').val());
		$('nav').show();
		$('#resizable').show();
		checkFooterSettings();
		return false;
	});

	$('#loadedForm').submit(function() {
		if ($('#loadedUrl').val() !== '') {
			$('#myiframe').attr('src', 'http://' + $('#loadedUrl').val());
			$('#loadedUrl').val('');
		}
		return false;
	});

	$('#rotateBtn').click(function() {
		$('#resizable').css({
			'width': $('#resizable').height(),
			'height': $('#resizable').width()
		});
		checkFooterSettings();
	});
});