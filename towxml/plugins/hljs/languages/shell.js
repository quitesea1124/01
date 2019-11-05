module.exports = function(s) {
    return {
        aliases: [ "console" ],
        contains: [ {
            className: "meta",
            begin: "^\\s{0,3}[\\w\\d\\[\\]()@-]*[>%$#]",
            starts: {
                end: "$",
                subLanguage: "bash"
            }
        } ]
    };
};