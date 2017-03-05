var ldap = require('ldapjs');
var request = require('request');

// LDAP connection information
var config = {

    ldap_config: {
        scheme: "ldaps",
        ldapHost: "bluepages.ibm.com",
        ldapPort: 636,
        base: "ou=bluepages,o=ibm.com"
    },

    user_config: {
        isCheckUser: true,
        isCheckPassword: true
    }
};


var authenticate = function(username, password, callback) {

    var ldapConf = config.ldap_config;

    if (!config.user_config.isCheckUser) {
        return callback({ success: true, username: username })
    } else {
        var opts = {
            filter: '(mail=' + username + ')',
            scope:  'sub'
        };
        var client = ldap.createClient({
            url: ldapConf.scheme + '://' + ldapConf.ldapHost + ':' + ldapConf.ldapPort
        });
        var isFoundEntry = false;
        client.search(ldapConf.base, opts, function(err, res) {
            res.on('searchEntry', function(entry) {
                // found the user entry
                isFoundEntry = true;
                // check password with bind function
                if (config.user_config.isCheckPassword) {
                    client.bind(entry.dn, password, function(err) {
                        // bind successfully
                        if (err) {
                            return callback({ error: 'Invalid login credentials.' })
                        } else {
                            return callback({ success: true, username: username })
                        }
                    })
                } else {
                    return callback({ success: true, username: username })
                }
            });
            // do action if err happened when search run
            res.on('error', function(err) {
                return callback({ error: err.toString() }, username)
            });
            // do action if end such as release client
            res.on('end', function() {
                client.unbind(function(err) {
                    if (err !== null) return callback({ error: err.toString() }, username)
                });
                if (!isFoundEntry) {
                    return callback({ error: 'Invalid login credentials.' })
                }
            })
        })
    }
};

module.exports = {
    authenticate: authenticate
}