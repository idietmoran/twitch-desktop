/**
 * @license twitch-desktop-app
 * (c) 2016 idietmoran <idietmoran@gmail.com>
 * License: MIT
 */
const request = require("./request");
const config = require('../../data/config.json');
const childProcess = require("child_process");

// TODO: LINUX / APPLE combatibility

class VLC {
    /**
    * @description : gets stream URL and formats for cmd.exe
    * @param {String} user : username we want to get stream url from
    * @returns {Promise.<string, Error>} : resolves our link or rejects error from request
    */
    static getStreamUrl(user) {
        return new Promise((resolve, reject) => {
            // link for requesting from API
            let link = `http://idietmoran.com/twitch/api/streamurl/${user}`
            // make our request
            request.get(link)
                .then(link => {
                    // format link for windows CMD.exe
                    link = link.replace(/"/g, '"""');
                    link = link.replace(/&/g, '^&');
                    resolve(link);
                })
                .catch(reject);
        });
    }
    /**
    * @description : passes stream URL to cmd.exe to launch with VLC
    * @param {String} user : username we want to launch stream on VLC
    * @returns {Promise.<string, Error>} : resolves our link or rejects error from request
    */
    static start(user) {
        return new Promise((resolve, reject) => {
            // get our link to use with CMD.exe
            this.getStreamUrl(user)
                .then(link => {
                    // pass information to CMD.exe
                    childProcess.exec(`start "" "${config.vlcPath}" ${link}`, (err, stdout, stderr) => {
                        if(err) throw err;
                    })
                    .catch(err => {throw err});
                })
        });
    }
}

module.exports = VLC;
