/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        //Test for url difined and not empty
        verifyArrayFieldDefinedNotEmpty(allFeeds, 'url');

        //Test for name difined and not empty
        verifyArrayFieldDefinedNotEmpty(allFeeds, 'name');

        /*
         * This function gets an array and a field as
         * a parameter and checks if each entry of the array
         * has that field difined and not empty
         */
        function verifyArrayFieldDefinedNotEmpty(array, field) {
            it('has every ' + field + ' defined and not empty', function() {
                for (var i = 0; i < array.length; i++) {
                    expect(allFeeds[i][field]).toBeDefined();
                    expect(allFeeds[i][field].length).not.toBe(0);
                }
            });
        }

    });


    /*
     * This suite is all about testing The menu
     */
    describe('The menu', function() {
        //Get the body as a Jquery object
        var body = $('body');

        it('ensures the menu element is hidden by defaults (thus having menu-hidden class)', function() {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

        /* Click two times to change menu visibility and check if
         * the body class is updated accordingly
         */
        it('ensures that the menu changes visibility', function() {
            var menuLink = $('.menu-icon-link');
            $(menuLink).click();
            expect(body.hasClass('menu-hidden')).toBeFalsy();
            $(menuLink).click();
            expect(body.hasClass('menu-hidden')).toBeTruthy();
        });
    });

    /*
     * This suite is all about testing The Initial Entries
     */
    describe('Initial Entries', function() {

        beforeEach(function(done) {
            loadFeed(0, done);
        });


        /* Ensures when the loadFeed function is called
         * and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('ensures that there is at least a sigle .entry element', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });

    });

    /*
     * This suite is all about testing the New feed selection
     */
    describe('New Feed Selection', function() {

        var previousContent;

        //wait for async calls to finish
        beforeEach(function(done) {
            //load second content
            loadFeed(1, function() {
                previousContent = $('.feed').html();
                //load third content
                loadFeed(2, function() {
                    done();
                });
            });
        });

        //load first feed after each test
        afterEach(function() {
            loadFeed(0);
        });


        /* Ensures when a new feed is loaded by the loadFeed
         *function that the content actually changes.
         */
        it('ensures the content changes', function() {
            var newContent = $('.feed').html();
            //Check if contnet are different
            expect(previousContent).not.toBe(newContent);
        });

    });

}());
