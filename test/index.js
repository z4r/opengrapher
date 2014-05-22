var assert = require('chai').assert;
var opengrapher = require('../lib');
var nock = require('nock');


describe('Parsing', function() {
    it('utf8', function(done){
        var scope = nock('http://edition.cnn.com')
            .get('/2014/05/21/travel/10-things-mexico/index.html')
            .replyWithFile(200, __dirname + '/resources/index.html');
        var expected = {
            description: 'Icy beers and empty beaches capture a feeble percentage of the country. Here\'s where Mexico really excels.',
            title: '10 things Mexico does better than anywhere else',
            type: 'article',
            url: 'http://www.cnn.com/2014/05/21/travel/10-things-mexico/index.html',
            site_name: '☃',
            image: 'http://i2.cdn.turner.com/cnn/dam/assets/140519164438-mexico-10-things-day-of-dead-celebrants-story-top.jpg'
        };
        opengrapher.parse('http://edition.cnn.com/2014/05/21/travel/10-things-mexico/index.html', function(err, og){
            assert.deepEqual(expected, og);
            scope.done();
            done();
        })
    });

    it('latin1', function(done){
        var scope = nock('http://www.gazzetta.it')
            .get('/Calciomercato/22-05-2014/milan-agazzi-ha-firmato-sara-portiere-rossonero-sino-2017-80731427975.shtml')
            .replyWithFile(200, __dirname + '/resources/latin1.html');
        var expected = {
            description: "L'ex Cagliari affiancherà Abbiati e Gabriel tra i pali.  Quest'anno ha giocato la seconda metà di campionato al Chievo",
            image: "http://images2.gazzettaobjects.it/methode_image/2014/05/22/Calcio/Foto%20Calcio%20-%20Trattate/8a54c82ddb7de66754330977dde9a3e9_169_l.JPG",
            site_name: "La Gazzetta dello Sport - Tutto il rosa della vita",
            title: "Milan, Agazzi ha firmato: sarà il portiere rossonero sino al 2017",
            type: "article",
            url: "http://www.gazzetta.it/Calciomercato/22-05-2014/milan-agazzi-ha-firmato-sara-portiere-rossonero-sino-2017-80731427975.shtml"
        };
        opengrapher.parse('http://www.gazzetta.it/Calciomercato/22-05-2014/milan-agazzi-ha-firmato-sara-portiere-rossonero-sino-2017-80731427975.shtml', function(err, og){
            assert.deepEqual(expected, og);
            scope.done();
            done();
        })
    })
});
