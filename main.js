$('.telegram-form').on('submit', function (event)  {

    event.stopPropagation();
    event.preventDefault();

    let form = this,
        submit = $('.submit', form),
        data = new FormData(),
        files = $('input[type=file]')


    $('.submit', form).val('Отправка...');
    $('input, textarea', form).attr('disabled','');

    data.append( 'ФИО', 		    $('[name="name"]', form).val() );
    data.append( 'Телефон', 	    $('[name="phone"]', form).val() );
    data.append( 'Город', 		$('[name="sity"]', form).val() );
    data.append( 'Область', 		$('[name="oblast"]', form).val() );
    data.append( 'Вид_спирта', 	$('[name="spirtname"]', form).val() );
    data.append( 'Доставка', 	    $('[name="delivery"]', form).val() );
    data.append( 'Отделение№', 	$('[name="postnumber"]', form).val() );
    data.append( 'Оплата', 		$('[name="payment"]', form).val() );
    data.append( 'Литраж', 		$('[name="litrs"]', form).val() );
    data.append( 'Сообщение', 	$('[name="message"]', form).val() );








    files.each(function (key, file) {
        let cont = file.files;
        if ( cont ) {
            $.each( cont, function( key, value ) {
                data.append( key, value );
            });
        }
    });

    $.ajax({
        url: 'ajax.php',
        type: 'POST',
        data: data,
        cache: false,
        dataType: 'json',
        processData: false,
        contentType: false,
        xhr: function() {
            let myXhr = $.ajaxSettings.xhr();

            if ( myXhr.upload ) {
                myXhr.upload.addEventListener( 'progress', function(e) {
                    if ( e.lengthComputable ) {
                        let percentage = ( e.loaded / e.total ) * 100;
                            percentage = percentage.toFixed(0);
                        $('.submit', form)
                            .html( percentage + '%' );
                    }
                }, false );
            }

            return myXhr;
        },
        error: function( jqXHR, textStatus ) {
            // Тут выводим ошибку
        },
        complete: function() {
            // Тут можем что-то делать ПОСЛЕ успешной отправки формы
            console.log('Complete')
            form.reset()
            success: swal({
                title: "Дякуємо за замовлення!",
                type: "success",
                showConfirmButton: false,
                timer: 2000
            })
            setTimeout(() => {
                $('.content').hide();
                $('.overlay').hide();
            }, 2000);
        }
    });

    return false;
});