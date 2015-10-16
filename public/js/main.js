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
				url: '/api/users/' + id
			});
		}
		else {
			e.preventDefault();
		}	
		
	});

});
