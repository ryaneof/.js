(function() {

    var modifier = {

    	expandAllAnswers: function () {
    		// expand all answers if user is not logged in.
    		$('.fixed-summary').removeClass('fixed-summary');
    	},

        init: function () {
            this.expandAllAnswers();
        }
    };

    modifier.init();


})();