
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


$(function () {
    $('.anchor_link').on('click', function(e){
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        },500);
    });

    $('input.phone_input').on('blur', function(){
        let phoneWrapper = $(this).parents('.field'),
            thisNumber = $(this).val().split(''),
            lastIndex = thisNumber.length-1,
            lastItem = thisNumber[lastIndex];
        if (isNaN(lastItem)){
            phoneWrapper.addClass('incorrect-phone');
            if (!phoneWrapper.find('.empty_number').length) {
                phoneWrapper.append('<div class="error_text empty_number">Введите номер телефона полностью </div>');
            }
            //$(this).val('');
        } else {
            phoneWrapper.removeClass('incorrect-phone');
            phoneWrapper.removeClass('error');
            phoneWrapper.find('.empty_number').remove();
        }
    });

    $('input').on('blur', function(){
    	if ($(this).parents('.field').hasClass('error')){
    		$(this).parents('.field').removeClass('error');
    		$(this).parents('.field').find('.error_text').remove();
    	}
    })

    $('.phone_input').inputmask("+7 (999) 999-99-99");

    $('input[type="checkbox"]').on('change', function (event) {

        if (!$(this).closest('.field.required').hasClass('no_checked') && !$(this).is(":checked")) {
            $(this).closest('.field.required').addClass('no_checked');
        } else {
            $(this).closest('.field.required').removeClass('no_checked');
        }
    })

    $('.email_input').on('blur', function () {
        let phoneWrapper = $(this).parents('.field');
        let email = $(this).val();

        if (email.length > 0
            && (email.match(/.+?\@.+/g) || []).length !== 1) {
            phoneWrapper.addClass('incorrect-phone');
            if (!phoneWrapper.find('.empty_number').length) {
                phoneWrapper.append('<div class="error_text empty_number">Вы ввели некорректный e-mail</div>');
            }
        } else {
            phoneWrapper.removeClass('incorrect-phone');
            phoneWrapper.remove('empty_number');
        }
    });

    $('.form_button').on('click', function(e){
        $(this).parents('form').find('.field').each(function(){

            var valueInput = $(this).find('input').val();
            if ($(this).hasClass('required') && valueInput == ''){
                $(this).addClass('error');
                if (!$(this).find('.error_text').length) {
                    $(this).append('<div class="error_text">это поле обязательно для заполнения</div>');
                }
            }

            var valueTextarea = $(this).find('textarea').val();
            if ($(this).hasClass('required') && valueTextarea == ''){
                $(this).addClass('error');
                if (!$(this).find('.error_text').length) {
                    $(this).append('<div class="error_text">это поле обязательно для заполнения</div>');
                }
            }

            if ($(this).hasClass('no_checked')) {
                $(this).addClass('error');
                if (!$(this).find('.error_text').length) {
                    $(this).append('<div class="error_text">это поле обязательно для заполнения</div>');
                }
            }

            var value = $(this).find('select').val();
            var selectedOptionText = $(this).find('select option:selected').text();
            var check = value  != selectedOptionText;

            $(this).find('select option').each(function() {

                if (check == false) {
                    $(this).parents('.field').addClass('error');
                    if (!$(this).parents('.field').find('.error_text').length) {
                        $(this).parents('.field').append('<div class="error_text">это поле обязательно для заполнения</div>');
                    }
                } else {
                    if ($(this).parents('.field').find('.error_text').length) {
                        $(this).parents('.field').removeClass('error');
                        $(this).parents('.field').find('.error_text').remove();
                    }
                }
            });
        })

        if ($(this).closest('form').find('.field').hasClass('incorrect-phone') || $(this).closest('form').find('.field').hasClass('error')){
            e.preventDefault();
        } else {
        	e.preventDefault();
        	$(this).closest('.form_modal').addClass('send_done');
        }
    });
});