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

    // User-list for admin panel
    var table = $('#user-list-table');

    if (table) {
        table.delegate('.delegate-assigne-role', 'click', function(e) {
            var userId = $(this).attr('data-user-id');

            $.ajax({
                url : "/user/roleDialogTpl/" + userId,
                cache : false,
                context : $('#assigne-role-modal')
            }).done(function(template) {
                var el = this;

                el.html(template);
                el.find('#assigne-role-modal-save').click(function(e) {
                    var newRole = el.find('#assigne-role-modal-role').val();

                    $.ajax({
                        url : "/user/setRole",
                        data : {
                            role : newRole,
                            userId : userId
                        },
                        dataType : 'json',
                        type : 'GET'
                    }).done(function(data) {
                        if (!data.error) {
                            table.find('[data-user-role="' + data.user.id + '"]').html(data.user.role);
                        }
                        el.modal('hide');
                    });
                });
                el.modal('show');
            });
        });
    }

}($)