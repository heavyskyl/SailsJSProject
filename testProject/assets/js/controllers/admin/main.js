!function($) {

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