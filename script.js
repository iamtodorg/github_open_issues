$(function () {
    $(".my-form").on('submit', function (e) {
        var repo = $('.repo').val();
        var endpoint = 'https://api.github.com/repos/' + repo + '/issues';

        $.get(endpoint, function (data) {

            if (!data.length) {
                $('.message').html('No issues for: ' + repo);
                return;
            }
            $('.issue-wrap').empty();
            $('.message').empty();
            $('.repo-name').html(repo);
            var details = data;

            for (var i = 0; i < details.length; i++) {
                var formatted_body = details[i].body.split('\n').join('<br>');
                console.log(formatted_body);
                $('.issue-wrap').append(' <div class="issue-info"><div>' +
                    '<h3><a href=' + details[i].html_url + ' target="_blank">' + details[i].title + '</a></h3>' +
                    '<p><small>reported by - <a href=' + details[i].user.html_url + ' target="_blank">' + details[i].user.login + '</a></small></p>' +
                    formatted_body+
                    '</div></div>'
                )
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown, jqXHR.status, textStatus);
            $('.message').html(errorThrown + " " + jqXHR.status + " " + textStatus)
        })
        e.preventDefault();
    });
});