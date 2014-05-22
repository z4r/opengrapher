opengrapher
===========

A Node module to parse opengraphs of a webpage

[![Build Status](https://travis-ci.org/z4r/opengrapher.svg?branch=master)](https://travis-ci.org/z4r/opengrapher)


How To Install
--------------

    npm install opengrapher
    
How To Use
----------

```javascript
var opengrapher = require('opengrapher');

opengrapher.parse('http://ogp.me/', function(err, og) {
    if (err) throw err;
    console.log(og);
});
```

__output__:
```javascript
{ 
  title: 'Open Graph protocol',
  type: 'website',
  url: 'http://ogp.me/',
  image: 'http://ogp.me/logo.png',
  'image:type': 'image/png',
  'image:width': '300',
  'image:height': '300',
  description: 'The Open Graph protocol enables any web page to become a rich object in a social graph.'
}
```
