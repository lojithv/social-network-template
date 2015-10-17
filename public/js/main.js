$(document).ready(function () {
	$('.center-page').vAlign();
	//$('.menu').scrollFadeIn({offset:50});
	var btnDelete = $('.delete');
	btnDelete.click(function (e){
		var id = btnDelete.attr('data-id');
		var destroy = confirm('Delete profile for ' + id + '?');
		if (destroy) {
			$.ajax({
				type: 'DELETE',
				url: '/' + id
			});
		}
		else {
			e.preventDefault();
		}	
		
	});

	var btnSave = $('.save');
/*
	btnSave.click(function (e) {
		//e.preventDefault();
		console.log('save clicked');
		$.ajax({
			type: 'PUT',
			url: $('form').attr('action')
		});
	});
*/
});
