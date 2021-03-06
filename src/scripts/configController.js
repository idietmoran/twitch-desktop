/**
 * @license twitch-desktop-app
 * (c) 2016 idietmoran <idietmoran@gmail.com>
 * License: MIT
 */
/**
 * @description
 * controls all actions involved in updating the config
*/
require('../app/error');
const fs = require('fs');
const os = require('os');
const Promise = require("bluebird");
const Stream = require("stream");

// NOTE: Point to our config here so we don't have to set it in every line
const configPath = `${process.cwd()}/data/config.json`;


/*
// check current OS for save location
function saveLoc(callback) {
    let curOS = os.platform();
    let sys = {
        win32: `${os.homedir()}/appdata/local/twitch/config.json`,
        linux: `${os.homedir()}/.local/twitch/config.json`
    };
    switch(curOS) {
        case "win32":
            callback(null, sys.win32);
            break;
        case "linux":
            callback(null, sys.linux);
            break;
        default:
            callback(`${curOS} is not a currently supported OS`);
            break;
    }
}
*/
// NOTE: CREATE READ / WRITE STREAM
function Config() {
    this.config = options.configPath;
    this._defaults = {
        "options": {
            "chat" : {
                "enabled": true,
                "popoutChat": false
            },
            "player" : {
                "vlc": false,
                "html5": false,
                "twitchPlayer": true
            },
            "quality": "source",
            "notifications": false,
            "defaultWindow": "following"
        },
        "vlcPath": "C:/Program Files/VideoLAN/VLC/vlc.exe"
    };
}

// set VLC options
Config.setPlayer = function(options) {
        if(typeof options === "object") {
            // pull in our config
            let config = fs.createReadStream(configPath);
            for(let i in options) {
                switch(i) {
                   case "vlc":
                       return `${i} : ${options[i]}`;
                   case "html5":
                       return `${i} : ${options[i]}`;
                   case "twitchPlayer":
                       return `${i} : ${options[i]}`;
                   default:
                       return 'something went wrong'
                }
            }
        } else {
            return 'INVALID_TYPE';
        }
}

/**
 * @description :
 * allows user to set local path for VLC player so stream can be launched
 * directly to VLC player
 * @param {string} path link to users local path
 * @param {function} callback callback to check for error or success
 * @returns {function(err, success)};
*/
Config.vlcPath = function(path) {
    // check if argument is a string
    if(typeof path === 'string') {
        // check if path exists
        fs.stat(path, err => {
            if(err) {
                return callback("INVALID_PATH" + err, null);
            }
            try {
                // import our config
                let rs = fs.createReadStream(configPath);
                let data = "";
                let config = {};
                rs.on("data", chunk => {
                    data += chunk;
                });

                if(typeof data === 'string') {
                    config = JSON.parse(data);
                }

                // update our config
                config.vlcPath = path;
                // write to config
                let ws = fs.createWriteStream(configPath);
                ws.write(JSON.stringify(config, null, 4));
                ws.end();
                

                fs.writeFile(configPath, JSON.stringify(config, null, 4), function(err) {
                    if(err) throw err;
                });
                return;
            } catch(e) {
                // reset our config to defaults
                this.default();
                return e;
            }
        });
    }
}

// set the quality
/**
 * @description
 * allows the user to choose a preferred quality and save it to config.json
 * @param {string} quality : user input for preferred quality
 * @param {function} callback : checks for success or error
 * @returns
*/

Config.setQuality = function(quality) {
    try {
        // import our config
        let config = require(configPath);
        /*
         * NOTE:  add logic to ensure correct quality input
        */
        // update our config
        config.options.quality = quality;
        // write to config
        fs.writeFile(configPath, JSON.stringify(config, null, 4), err => {
            if(err) throw err;
        });
    } catch(e) {
        console.log('error', e);
        // reset config to defaults
        this.default();
    }
}

/**
 * @description : sets the user defined default window
 * @param {String} str:
 * @returns
*/
Config.setDefaultWindow = function(str) {
    // pull in our config
    let config = require(configPath);
    // set our valid settings
    let settings = ['featured', 'channels', 'games', 'following'];
    // check type
    if(typeof str === 'string') {
        for(let i of settings) {
            if(str === i) {
                config.options.defaultWindow = str;
                fs.writeFile(configPath, JSON.stringify(config, null, 4), err => {
                    if (err) throw err;
                });
            }
        }
    } else {
        return 'INVLAD_TYPE';
    }
}

// set chat option
/**
 * @description
 * allows a user to save chat prefrences to config.json
 * @param {boolean} bool : user input for chat prefrences
 * @param {function} callback : checks for success / error
 * @returns
*/

/**
 * NOTE: USE AN OBJECT AND TYPE CHECK FOR BOOLEANS INSTEAD OF HAVING MULTIPLE ARGS
 */

Config.setChat = function(options) {
    // check for optional inputs
    // NOTE: this may be unneeded
    // check if argument is a boolean
    let boolCheck = true;
    // check type on our settings
    for(let i of options) {
        if(typeof options[i] !== 'boolean' && typeof options !== 'object') {
            boolCheck = false;
        }
    }
    if(boolCheck) {
        try {
            // import our config
            let config = require(configPath);
            // update our config
            config.options.chat.enabled = options.chat.enabled;
            config.options.chat.popoutChat = options.chat.popoutChat;
            // write to config
            fs.writeFile(configPath, JSON.stringify(config, null, 4), err => {
                if(err) throw err;
            });
        } catch(e) {
            console.log('error', e);
            // reset our config to defaults
            this.default();
        }
    } else if(!boolCheck) {
        return callback(`INVALID_TYPE`);
    }
}

/**
 * @description: blanket function for writing to config
 * @param {Object} options : the full config with added changes to be written
 * @param {Function} callback: takes the argument (err).
 */

Config.writeConfig = function(options) {
    return new Promise((resolve, reject) => {
        fs.writeFile(configPath, options, err => {
            if(err) reject(err);
            resolve();
        })
    });
}

// sets config to default
/**
 * @description
 * resets config.json to default values
*/
Config.default = function() {
    // set our defaults

    // write to config
    // NOTE: config is written to the users home directory. EX: c:\users\<username>\appdata\local\twitch\config.json
    // TODO: set correct directory for writing files after test is done
    // NOTE: use createPath.js to handle this logic
    fs.stat(`${process.cwd()}/data/`, err => {
        if(err) {
            fs.mkdir(`${process.cwd()}/data/`, err => {
                if(err) console.error(err);
            });
        } else {
            fs.writeFile(configPath, JSON.stringify(this._defaults, null, 4), err => {
                if(err) console.error(err);
            });
        }
    });

    fs.writeFile(configPath, JSON.stringify(this._defaults, null, 4), err => {
        if(err) console.error(err);
    });
}


module.exports = Config;
