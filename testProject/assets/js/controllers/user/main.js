!function($) {

    // Registration
    $("#userRegistrationForm").validate({
        rules: {
            firstName : {
                required : true
            },
            lastName : {
                required : true
            },
            password : {
                required : true,
                minlength : 5
            },
            displayName : {
                required : true,
                minlength : 5
            },
            email : {
                email : true,
                required : true
            },
            passwordConfirmation: {
                equalTo: "#password",
                minlength : 5
            }
        },

        errorPlacement: function (error, element) {
            var $errorEl = $(error);

            $errorEl.addClass('control-label');
            $errorEl.insertAfter(element);
            $errorEl.parent().removeClass('has-success').addClass('has-error');
        },

        success: function (label, element) {
            var $labelEl = $(label),
                $parent = $labelEl.parent();

            $parent.find('label').remove();
            $labelEl.attr('class', 'control-label');
            $labelEl.text('OK');
            $labelEl.insertAfter(element);
            $parent.removeClass('has-error').addClass('has-success');
        }
    });

}($)