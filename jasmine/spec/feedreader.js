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


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('each feed has a URL', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('each feed has a name', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });
    });


    /* Write a new test suite named "The menu" */
    describe('The Menu', function() {

        /* Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            var menuHidden = $('body').hasClass('menu-hidden');
            expect(menuHidden).toBe(true);
        });

        /* Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('changes visibility when menu icon is clicked', function() {
            var menuHidden;

            $('.menu-icon-link').click();
            menuHidden = $('body').hasClass('menu-hidden');
            expect(menuHidden).toBe(false);

            $('.menu-icon-link').click();
            menuHidden = $('body').hasClass('menu-hidden');
            expect(menuHidden).toBe(true);
        });
    });


    /* Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            if (allFeeds && (allFeeds.length > 0)) {
                // call loadFeed on first feed with async callback done()
                loadFeed(0, function() {
                    done();
                });
            } else {
                // Oops! Error: no feed
                throw new Error('No feed');
                done();
            }
        });

        it('should return at least one entry to the feed container', function(done) {
            // select all .feed containers that contain a .entry element
            // passes, if selector length is > 0
            var result = $('.feed').has('.entry');
            expect(result.length).toBeGreaterThan(0);
            done();
        });
    });

    /* Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        var oldContents, newContents;
        var oldTitle, newTitle = '';

        /* Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        beforeAll(function(done) {
            // capture initial contents of .feed container and title
            oldContents = $('.feed').contents();
            oldTitle = $('.header-title').text();
            if (allFeeds && (allFeeds.length > 0)) {
                // call loadfeed on last feed
                var lastIndex = allFeeds.length - 1;
                loadFeed(lastIndex, function() {
                    newContents = $('.feed').contents();
                    newTitle = $('.header-title').text();
                    done();
                });
            } else {
                // Oops! Error: no feed
                newContents = oldContents;
                newTitle = oldTitle;
                throw new Error('No feed');
                done();
            }
        });

        it('title should change', function(done) {
            // check that title actually loaded
            expect(newTitle).not.toBe('');
            // check that title changed
            expect(newTitle).not.toBe(oldTitle);
            done();
        });

        it('feed content should change', function(done) {
            // check that some .feed content actually loaded
            expect(newContents.length).not.toBe(0);
            // check that feed contents changed
            expect(newContents).not.toBe(oldContents);
            done();
        });

        afterAll(function() {
            if (allFeeds && (allFeeds.length > 0)) {
                // reload first feed
                loadFeed(0);
            } else {
                // Error: no feed
                throw new Error('No feed');
            }
        });
    });

}());
