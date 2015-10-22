$(document).ready(function () {
	$('.center-page').vAlign();
	//$('.menu').scrollFadeIn({offset:50});
	var btnDelete = $('.delete');
	btnDelete.click(function (e){
		var id = btnDelete.attr('data-id');
		$.ajax({
			type: 'DELETE',
			url: '/' + id
		});
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
