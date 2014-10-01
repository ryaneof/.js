(function () {
    $(document).on('ready', function () {
        // remove left, right ad
        $('.couplet').remove();

        // bottom right corner ad
        $('.cs_right_bottom').remove();
        $('#__QY_RM_Div').remove();

        // remove full page click ad.
        // might not working, because it uses cookie.
        $('#__udbpp_a').remove();

    });
})();