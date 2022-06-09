$(document).ready(function () {
	$('.header__boorger').click(function (event) {
		$('.header__boorger,.header__menu').toggleClass('active');
		$('body').toggleClass('lock');
	});
	$('.header__login').click(function () {
		localStorage.removeItem('isLogin');
		if($('#vote-form-container')) {
			$('#vote-form-container').remove();
		}
	});
});