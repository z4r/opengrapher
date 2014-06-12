"use strict";
var jsdom = require('jsdom');
var pattern = /[\xC2-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF4][\x80-\xBF]{3}/g;

exports.parse = function (url, callback) {
    jsdom.env({
        url: url,
        encoding: 'binary',
        done: function (error, window) {
            if (error) return callback(error);
            var result = {};
            var metaTags = window.document.getElementsByTagName('meta');
            for (var i = 0; i < metaTags.length; ++i) {
                var tag = metaTags[i];
                var splitted = (tag.getAttribute('property') || '').split(/^og:/);
                if (splitted.length < 2) continue;
                result[splitted[1]] = tag.getAttribute('content').replace(pattern, function(s) {
                    return decodeURIComponent(escape(s));
                });
            }
            window.close();
            callback(null, result);
        }
    })
};
