(function(){
    angular.module('angularytics').factory('AngularyticsGoogleHandler', function($log) {
        var service = {};

        service.trackPageView = function(url) {
            _gaq.push(['_set', 'page', url]);
            _gaq.push(['_trackPageview', url]);
        }

        service.trackEvent = function(category, action, opt_label, opt_value, opt_noninteraction) {
            _gaq.push(['_trackEvent', category, action, opt_label, opt_value, opt_noninteraction]);
        }

        return service;
    }).factory('AngularyticsGoogleUniversalHandler', function () {
        var service = {};
        var trackers = ga.getAll() || []

        service.trackPageView = function (url) {
            angular.forEach(trackers, function(tracker) {
                tracker.set('page', url);
                tracker.send('pageview', url);
            });
        };

        service.trackEvent = function (category, action, opt_label, opt_value, opt_noninteraction) {
            angular.forEach(trackers, function(tracker) {
                tracker.send('event', category, action, opt_label, opt_value, {'nonInteraction': opt_noninteraction});
            });
        };

        return service;
    });
})();
