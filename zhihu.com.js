(function() {

    var modifier = {

    	expandAllAnswers: function () {
    		// expand all answers if user is not logged in.
    		$('.fixed-summary').removeClass('fixed-summary');
    	},

        unbindUselessEvents: function () {
            $('.zm-editable-content').unbind('click');
        },

        init: function () {
            this.expandAllAnswers();
            this.unbindUselessEvents();
        }
    };

    modifier.init();


})();