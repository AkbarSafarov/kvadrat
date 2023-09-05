
var body = document.body;
var html = document.documentElement;

function formPopup(btnSelector, wrapSelector) {
	var closeForm = document.querySelector('.formExtraWrapper .close-form');
	var formWrap = document.querySelector(wrapSelector);
	var formBtn = document.querySelectorAll(btnSelector);
	var formOpened = 'opened';
	var overflowHidden = 'overflowHidden';

	closeForm.addEventListener('click', function() {
		formWrap.classList.remove(formOpened);
		html.classList.remove(overflowHidden);
	});

	formBtn.forEach(function(btn){
		btn.addEventListener('click', function(event) {
			formWrap.classList.add(formOpened);
			html.classList.toggle(overflowHidden);
			event.preventDefault();
		});
	})

	html.addEventListener('keyup', function(event) {
		if (formWrap.classList.contains(formOpened) && event.keyCode == 27) {
		  	formWrap.classList.remove(formOpened);
		  	html.classList.remove(overflowHidden);
		}
	});

  	body.addEventListener('click', function(a) {
	  if (
	    a.target.closest('.formExtraWrapper') ||
	    Array.from(formBtn).includes(a.target)
	  ) return;
	  if (formWrap.classList.contains(formOpened)) {
	    formWrap.classList.remove(formOpened);
	    html.classList.remove(overflowHidden);
	  }
	});

}

formPopup('.form_btn_link', '.form_modal');


