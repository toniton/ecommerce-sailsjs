/**
 * Created by Toni on 11/9/2016.
 */


var Hashids = require('hashids');

module.exports = {

    generate(number, callback) {
        var hashids = new Hashids("Can y0u imagin3?", number, "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");
        var reference = hashids.encode(Math.floor(Date.now() / 1000));
        return callback(reference);
    }

};

