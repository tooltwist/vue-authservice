'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var jwtDecode = _interopDefault(require('jwt-decode'));
var axios = _interopDefault(require('axios'));
var QueryString = _interopDefault(require('query-string'));
var debounce = _interopDefault(require('debounce'));
require('vue-awesome/icons/refresh');
var Icon = _interopDefault(require('vue-awesome/components/Icon.vue'));
var URL = _interopDefault(require('url'));
var axiosError = _interopDefault(require('~/lib/axiosError.js'));

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

/* @ f low */
function assert(condition, message) {
  // export function assert (condition, message) {
  if (!condition) {
    throw new Error("[vue-router] ".concat(message));
  }
}
var inBrowser = typeof window !== 'undefined';

/* @flZZow */

/*
 *  Client API for Authservice.io
 *  See https://authservice.io
 */
// import Vue from 'vue'
// import Vuex from 'vuex'
// Vue.use(Vuex)
console.log('(index.js) 1'); //import { install } from './install'

console.log('(index.js) 2');
var JWT_COOKIE_NAME = 'authservice-jwt';
var LOGIN_TIMEOUT_DAYS = 3;
var NETWORK_ERROR_MSG = 'Could not contact authentication server';

var Authservice =
/*#__PURE__*/
function () {
  // static install: (Vue) => void;
  // static version: string;
  // static install (Vue) {
  //   alert('Install 2...')
  //   // Vue.prototype.$auth = new Authservice()
  //   Vue.prototype.$auth = 123
  //
  //   Object.defineProperty(Vue.prototype, '$authservice', {
  //     get () { return 987 }
  //   })
  // }
  function Authservice(options) {
    _classCallCheck(this, Authservice);

    console.log('&&& Authservice constructor', options);
    this.host = options.host ? options.host : 'api.authservice.io';
    this.port = options.port ? options.port : 80;
    this.version = options.version ? options.version : 'v2';
    this.apikey = options.apikey; // See if we are supporting email login (default to yes)

    if (options.login && typeof options.login.email !== 'undefined' && !options.login.email) {
      console.log("Authservice(): Email is NOT supported");
      this.emailSupported = false;
    } else {
      console.log("Authservice(): Email IS supported");
      this.emailSupported = true;
    } // See if registration is allowed


    if (!this.emailSupported) {
      // login.email: false
      console.log("Authservice(): Registration is NOT supported");
      this.registrationSupported = false;
    } else if (options.hints && typeof options.hints.register !== 'undefined' && !options.hints.register) {
      // Check for hints.register: false
      console.log("Authservice(): Registration is NOT supported");
      this.registrationSupported = false;
    } else {
      // We WILL allow registration. Check we have what we need.
      if (_typeof(options.hints.register) !== 'object') {
        this.registrationSupported = false;
        console.error('options.hints.register must be false, or an object');
      } else if (!options.hints.register.resumeURL) {
        this.registrationSupported = false;
        console.log("Authservice(): Registration is NOT supported");
        console.error('options.hints.register.resumeURL must be provided');
      } else if (typeof options.hints.register.resumeURL !== 'string') {
        this.registrationSupported = false;
        console.log("Authservice(): Registration is NOT supported");
        console.error('options.hints.register.resumeURL must be a string');
      } else {
        // All good for registration
        this.registrationSupported = true; //this.registerResume = options.hints.register.resumeURL

        console.log("Authservice(): Registration IS supported");
      }
    } // See if forgotten password is allowed


    if (!this.emailSupported) {
      // Email is not used (options.login.email is false)
      console.log("Authservice(): Forgotten password is NOT supported");
      console.log("(because email is not supported)");
      this.forgottenPasswordSupported = false;
    } else if (options.hints && typeof options.hints.forgot !== 'undefined' && !options.hints.forgot) {
      // Forgot password is specifically disallowed (options.hints.register is false)
      this.forgottenPasswordSupported = false;
    } else {
      // We WILL allow forgot password. Check we have what we need.
      if (_typeof(options.hints.forgot) !== 'object') {
        this.forgottenPasswordSupported = false;
        console.log("Authservice(): Forgotten password is NOT supported");
        console.error('options.hints.forgot must be false, or an object');
      } else if (!options.hints.forgot || !options.hints.forgot.resumeURL) {
        this.forgottenPasswordSupported = false;
        console.log("Authservice(): Forgotten password is NOT supported");
        console.error('options.hints.forgot.resumeURL must be provided');
      } else if (typeof options.hints.forgot.resumeURL !== 'string') {
        this.forgottenPasswordSupported = false;
        console.log("Authservice(): Forgotten password is NOT supported");
        console.error('options.hints.forgot.resumeURL must be a string');
      } else {
        // All good for forgotten password
        this.forgottenPasswordSupported = true;
        this.forgotResume = options.hints.forgot.resumeURL;
      }
    } // Remember the options


    this.options = options; // Current user details

    this.user = null;
    this.jwt = null;
    this.fromCache = false;
  } // init (app: any /* Vue component instance */) {


  _createClass(Authservice, [{
    key: "init",
    value: function init(app
    /* Vue component instance */
    ) {
      console.log('&&& MyComponent init'); // VVVVV This does not seem to be called
      // alert('za init()')

      process.env.NODE_ENV !== 'production' && assert(install.installed, "not installed. Make sure to call `Vue.use(Authservice)` " + "before creating root instance.");
    }
  }, {
    key: "endpoint",
    value: function endpoint() {
      // console.log('endpoint():', this)
      var protocol = this.protocol ? this.protocol : 'http';
      var endpoint = protocol + '://' + this.host + ':' + this.port + '/' + this.version + '/' + this.apikey;
      return endpoint;
    } //
    //  We've just arrived at a page.
    //  See if a JWT for the current user is provided in the URL parameters
    //  or in a cookie for this site.
    //

  }, {
    key: "checkInitialLoginStatus",
    value: function checkInitialLoginStatus(debug) {
      debug = true;
      console.log('+++++ checkInitialLoginStatus ++++++'); // If this is the browser, look for the JWT as a URL parameter

      if (window) {
        // See if we have AUTHSERVICE_JWT in the URL to this page
        var _jwt = this.getURLParameterByName("AUTHSERVICE_JWT");

        if (_jwt) {
          if (debug) {
            console.log("***");
            console.log("***");
            console.log("*** AUTHSERVICE_JWT IN URL");
            console.log("***");
            console.log("***");
          }

          var _isFromCookie = false;

          if (this.setCurrentUserFromJWT(_jwt, _isFromCookie)) {
            // Remember this JWT in a cookie for the next page.
            this.setCookie(JWT_COOKIE_NAME, _jwt, LOGIN_TIMEOUT_DAYS);
            return true;
          } else {
            // Invalid JWT
            this.removeCookie(JWT_COOKIE_NAME);
            return false;
          }
        }
      } // See if we have a cookie containing the current JWT


      var jwt = this.getCookie(JWT_COOKIE_NAME);

      if (jwt) {
        if (debug) {
          console.log("***");
          console.log("***");
          console.log("*** AUTHSERVICE_JWT IN A COOKIE");
          console.log("***");
          console.log("***");
        } // var isFromCookie = true;


        var _isFromCookie2 = false; // Check if it is stale ZZZZ

        if (this.setCurrentUserFromJWT(jwt, _isFromCookie2)) {
          // Good login from cookie
          return true;
        } else {
          // Dud cookie
          this.removeCookie(JWT_COOKIE_NAME);
          return false;
        }
      } // not a good cookie


      if (debug) {
        console.log("***");
        console.log("***");
        console.log("*** AUTHSERVICE_JWT NOT IN URL OR COOKIE");
        console.log("***");
        console.log("***");
      }

      var isFromCookie = false;
      this.setCurrentUserFromJWT(null, isFromCookie);
      return false;
    }
    /*
     *  Log in using username / password.
     */

  }, {
    key: "login",
    value: function login(email, password) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        console.log('login(email=' + email + ')'); // console.log('++++++++++ email=' + email + ', password=' + password)

        /*
         *  Call the server to authenticate the username/password.
         */

        axios({
          method: 'post',
          url: _this.endpoint() + '/email/login',
          headers: {
            // 'Authorization': 'Bearer ' + jwt
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          data: {
            email: email,
            password: password
          }
        }).then(function (response) {
          // JSON responses are automatically parsed.
          // this.posts = response.data
          // console.log('axios reply (response.data)=', response.data)
          // return callback(null, response.data.data[0])
          if (response.data.status === 'ok') {
            // Logged in.
            // console.log('Back from login:', response.data)
            var jwt = response.data.jwt;
            var isFromCookie = false;

            if (_this.setCurrentUserFromJWT(jwt, isFromCookie)) {
              // Good JWT login
              _this.setCookie(JWT_COOKIE_NAME, jwt, LOGIN_TIMEOUT_DAYS);

              resolve(_this.user.id);
              return;
            } else {
              console.log('ok 4'); // Bad JWT

              _this.removeCookie(JWT_COOKIE_NAME);

              console.log('ok 5');
              reject('Invalid credentials');
              return;
            }
          } else {
            // We did not sucessfully login
            // -> No current user
            var isFromCache = false;

            _this.setCurrentUserFromJWT(null, isFromCache);

            _this.removeCookie(JWT_COOKIE_NAME);

            reject(response.data.message);
            return;
          }
        }).catch(function (e) {
          // We did not sucessfully login
          // => No current user
          var isFromCache = false;

          _this.setCurrentUserFromJWT(null, isFromCache);

          _this.removeCookie(JWT_COOKIE_NAME);

          console.log("e=", e);
          console.log("e.response:", e.response);
          console.log("e.status:", e.status);

          if (!e.response) {
            // Network error from browser
            // See https://github.com/axios/axios/issues/383#issuecomment-234079506
            reject(NETWORK_ERROR_MSG);
            return;
          } else {
            console.log("e:", e);
            console.log("e.response:", e.response);
            console.log("e.data:", e.data);
            reject(e.response.data.message);
            return;
          }
        });
      }); // promise
    } // - login()

    /*
     *  Kick off the OAuth2 login process.
     */

  }, {
    key: "initiateOAuth",
    value: function initiateOAuth(me, authority, relativeResumeURL, relativeFailURL) {
      console.log("initiateOAuth(me, ".concat(authority, ")")); // See which URL we should use for errors in OAuth2 logins.
      // let errorURL = '/bower_components/pastac-login/test/test-error.html' // VVVVV
      // if (me.error) {
      //   errorURL = me.error
      // }
      // console.log('errorURL=' + errorURL)
      // Decide where we want to end up.
      // If a 'resume' URL has not been provided, we'll come back to this exact
      // same URL, however with any JWT or error parameters removed.

      var l = window.location;
      var baseURL = "".concat(l.protocol, "//").concat(l.hostname);

      if (l.port) {
        baseURL += ":".concat(l.port);
      }

      console.log('\n\nbaseURL=', baseURL); // Where to go if the login suceeds?

      var resumeURL;

      if (relativeResumeURL) {
        // Use the specified resume URL (which is a relative path)
        resumeURL = baseURL + relativeResumeURL;
      } else {
        // Use the current page, but with any JWT or error parameter removed.
        console.log('resume to current page after oauth login', l);
        var parsed = QueryString.parse(l.search);
        console.log(parsed);
        delete parsed['AUTHSERVICE_JWT'];
        delete parsed['AUTHSERVICE_ERROR'];

        var _params = QueryString.stringify(parsed);

        resumeURL = l.protocol + "//" + l.host + l.pathname;

        if (_params) {
          resumeURL += '?' + _params;
        }

        resumeURL += l.hash;
        console.log('\n\nresumeURL=', resumeURL);
        console.log(new Buffer(resumeURL).toString('base64'));
      } // Get the URL to a "bounce page". This is a page that sets the JWT
      // cookie from a URL parameter, and then redirects to the 'resume' page.


      var resume64 = new Buffer(resumeURL).toString('base64');
      var params = QueryString.stringify({
        next: resume64
      }); // let hash = `#/authservice-bounce/${encodeURIComponent(resumeURL)}/true`
      // const hash = `/authservice-bounce`

      var hash = ""; // const bounceURL = `${l.protocol}//${l.host}/authservice-bounce?${params}#${hash}`

      var bounceURL = "".concat(baseURL, "/authservice-bounce?").concat(params, "#").concat(hash);
      console.log('\n\nbounceURL=', bounceURL);
      var successURL = bounceURL; // Where to go if the login fails?

      var failURL;

      if (relativeFailURL) {
        // Use the specified error URL (which is a relative path)
        failURL = baseURL + relativeFailURL;
      } else {
        failURL = bounceURL;
      }

      console.log('successURL=' + successURL);
      console.log('successURL=' + encodeURIComponent(successURL));
      console.log('failURL=' + failURL);
      var url = "http://".concat(this.host, ":").concat(this.port, "/").concat(this.version, "/oauth2/initiate/").concat(this.apikey, "/").concat(authority);
      url += '?success=' + encodeURIComponent(successURL);
      url += '&fail=' + encodeURIComponent(failURL); // alert('Initiate URL:' + url)

      window.location = url;
    } // initiateOAuth2

    /*
     *  Log out
     */

  }, {
    key: "logout",
    value: function logout() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        // VVVVV Call the server
        var isFromCache = false;

        _this2.setCurrentUserFromJWT(null, isFromCache);

        _this2.removeCookie(JWT_COOKIE_NAME);

        resolve(0);
        return;
      }); // new Promise
    }
  }, {
    key: "register",
    value: function register(options) {
      var _this3 = this;

      console.log('$authservice.register()', options);
      console.log('ok 0');
      return new Promise(function (resolve, reject) {
        // let email = options.email
        // let username = options.username
        // let password = options.password
        // let firstName = options.firstName
        // let middleName = options.middleName
        // let lastName = options.lastName
        // let resume = options.resume
        console.log('ok 0a'); // Check email and password is valid

        switch (_typeof(options.email)) {
          case 'string':
            if (options.email.indexOf('@') < 1) {
              reject('Please enter a valid email address');
            }

            break;

          case 'undefined':
            return reject('options.email must be provided');

          default:
            return reject('options.email must be a string');
        } // Check we have a URL to go to after email verification.


        var registerOpts = _this3.options.hints && _this3.options.hints.register ? _this3.options.hints.register : {};

        switch (_typeof(registerOpts.resumeURL)) {
          case 'string':
            break;

          case 'undefined':
            return reject('options.hints.register.resumeURL must be provided');

          default:
            return reject('options.hints.register.resumeURL must be a string');
        }

        var params = {
          email: options.email,
          resume: registerOpts.resumeURL // Maybe check username is valid

        };
        console.log('username is ' + options.username);

        switch (_typeof(options.username)) {
          case 'string':
            var username = options.username.trim().toLowerCase();

            if (username.indexOf(' ') >= 0) {
              reject('Username may not contain spaces');
              return;
            }

            if (username.indexOf('@') >= 0) {
              reject('Username may not contain @');
              return;
            }

            params.username = username;
            break;

          case 'undefined':
            // alert('using email for username')
            params.username = params.email;
            break;

          default:
            return reject('If provided, options.username must be a string');
        } // if (me.registerRequiresUsername) {
        //   username = username.trim().toLowerCase()
        //   if (username.indexOf(' ') >= 0) {
        //     return failCallback('Username may not contain spaces')
        //   } else if (username.indexOf('@') >= 0) {
        //     return failCallback('Username may not contain @')
        //   }
        //   params.username = username
        // } else {
        //   params.username = email
        // }


        console.log('ok 1'); // Maybe check password is valid

        switch (_typeof(options.password)) {
          case 'string':
            if (options.password.length < 5) {
              return reject('Please enter a longer password');
            }

            params.password = options.password;
            break;

          case 'undefined':
            break;

          default:
            return reject('If provided, options.password must be a string');
        }

        console.log('ok 2'); // Maybe check first name is valid

        switch (_typeof(options.firstName)) {
          case 'string':
            if (options.firstName.length < 1) {
              return reject('Please enter a first name');
            }

            params.firstName = options.firstName;
            break;

          case 'undefined':
            break;

          default:
            return reject('If provided, options.firstName must be a string');
        }

        console.log('ok 3'); // Maybe check middle name is valid

        switch (_typeof(options.middleName)) {
          case 'string':
            if (options.middleName.length < 1) {
              return reject('Please enter a middle name');
            }

            params.middleName = options.middleName;
            break;

          case 'undefined':
            break;

          default:
            return reject('If provided, options.middleName must be a string');
        }

        console.log('ok 4'); // Maybe check last name is valid

        switch (_typeof(options.lastName)) {
          case 'string':
            if (options.lastName.length < 1) {
              return reject('Please enter a last name');
            }

            params.lastName = options.lastName;
            break;

          case 'undefined':
            break;

          default:
            return reject('If provided, options.lastName must be a string');
        } // Call the server


        console.log('params=', params);
        axios({
          method: 'put',
          url: _this3.endpoint() + '/email/register',
          headers: {
            // 'Authorization': 'Bearer ' + jwt
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          data: params
        }).then(function (response) {
          // JSON responses are automatically parsed.
          console.log('response is ', response);

          if (response.data && response.data.status === 'ok') {
            // If we have a new JWT, re-set the current user
            if (response.jwt) {
              var jwt = response.jwt;
              var isFromCookie = false;

              if (_this3.setCurrentUserFromJWT(jwt, isFromCookie)) {
                // Good registration
                _this3.setCookie(JWT_COOKIE_NAME, jwt, LOGIN_TIMEOUT_DAYS);
              } else {
                // All okay, but no auto-login in from registration
                _this3.removeCookie(JWT_COOKIE_NAME);
              }
            }

            resolve(jwt);
            return;
          } else {
            // Display an error message
            var error = response.data && response.data.message ? response.data.message : 'Error while registering';
            reject(error);
            return;
          }
        }).catch(function (e) {
          if (!e.response) {
            // Network error from browser
            // See https://github.com/axios/axios/issues/383#issuecomment-234079506
            reject(NETWORK_ERROR_MSG);
            return;
          } else {
            // Error registering
            var error = e.response.data && e.response.data.Error ? e.response.data.Error : 'Error while registering';
            reject(error);
            return;
          }
        });
      }); // new Promise
    } // register()

  }, {
    key: "forgot",
    value: function forgot(email, options) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        if (!_this4.forgottenPasswordSupported) {
          var error = 'Password retrieval is not available.';
          reject(error);
          return;
        } // Check email and password is valid


        if (email === null || email.indexOf('@') < 1) {
          var _error = 'Please enter a valid email address';
          reject(_error);
          return;
        } // Decide where we want to end up.
        // If a 'resume' URL has not been provided, we'll come back to this exact
        // same URL, however with any JWT or error parameters removed.


        var l = window.location;
        var baseURL = "".concat(l.protocol, "//").concat(l.hostname);

        if (l.port) {
          baseURL += ":".concat(l.port);
        }

        console.log("this.forgotResume=".concat(_this4.forgotResume)); // Where to go when they click on the email link?

        var resumeURL = _this4.forgotResume;

        if (resumeURL.startsWith('/')) {
          resumeURL = baseURL + resumeURL;
        }

        console.log("resumeURL is ".concat(resumeURL)); // Get the URL to a "bounce page". This is a page that sets the JWT
        // cookie from a URL parameter, and then redirects to the 'resume' page.

        var resume64 = new Buffer(resumeURL).toString('base64');
        var params = QueryString.stringify({
          next: resume64
        });
        var bounceURL = "".concat(l.protocol, "//").concat(l.host, "/authservice-bounce?").concat(params);
        console.log('bounceURL=', bounceURL); // Call the server

        console.log('params=', params);
        axios({
          method: 'post',
          url: _this4.endpoint() + '/email/forgot',
          headers: {
            // 'Authorization': 'Bearer ' + jwt
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          data: {
            email: email,
            resume: bounceURL
          }
        }).then(function (response) {
          // JSON responses are automatically parsed.
          if (response.data.status === 'ok') {
            // Email sent successfully
            resolve(response.data);
            return;
          } else {
            // Error sending the email
            var _error2 = response.data && response.data.message ? response.data.message : 'Error while sending email';

            reject(_error2);
            return;
          }
        }).catch(function (e) {
          if (!e.response) {
            // Network error from browser
            // See https://github.com/axios/axios/issues/383#issuecomment-234079506
            reject(NETWORK_ERROR_MSG);
            return;
          } else {
            // Error sending the email
            var _error3 = e.response.data && e.response.data.message ? e.response.data.message : 'Error while sending email';

            reject(_error3);
            return;
          }
        });
      });
    } // - forgot()
    //
    //  Get a URL parameter.
    //

  }, {
    key: "getURLParameterByName",
    value: function getURLParameterByName(name) {
      var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
      return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    } // Set the current user from a JWT.
    // Does not change cookies.
    // Returns true on success.

  }, {
    key: "setCurrentUserFromJWT",
    value: function setCurrentUserFromJWT(jwt, fromCookie) {
      // console.log()
      // console.log('++++++++>  setCurrentUserFromJWT(): jwt=' + jwt)
      var haveUser = false;
      var ident = null;

      if (jwt) {
        // See https://github.com/auth0/jwt-decode
        try {
          var decoded = jwtDecode(jwt);
          console.log('decoded=', decoded);
          ident = decoded.identity;
          haveUser = true;
        } catch (e) {
          console.log('Error decoding JWT: ', e); // alert('Error decoding invalid JWT')

          haveUser = false;
        }
      } // Change the current user.
      // let oldCurrentUser = user


      if (haveUser) {
        var user = {
          tenant: ident.tenant,
          authority: ident.authority,
          avatar: ident.avatar,
          email: ident.email,
          emailStatus: ident.email_status,
          entityType: ident.entity_type,
          firstname: ident.first_name,
          fullname: ident.full_name,
          gender: ident.gender,
          id: ident.id,
          isAdmin: ident.is_admin,
          languages: ident.languages,
          lastname: ident.last_name,
          locale: ident.locale,
          location: ident.location,
          mediaPage: ident.media_page,
          middlename: ident.middle_name,
          privileges: ident.privileges,
          status: ident.status,
          timezone: ident.timezone,
          username: ident.username,
          rights: [] // type: ident.type,

        };

        if (ident.rights) {
          ident.rights.forEach(function (r) {
            var right = {
              realm: r.realm,
              name: r.name,
              sequence: r.sequence,
              value: r.value
            };
            user.rights.push(right);
          });
        } else {
          console.error("JWT does not contain field {rights}.");
        } // console.log('Setting user to ', user)


        this.user = user;
        this.jwt = jwt;
        this.fromCache = fromCookie;
        return true;
      } else {
        // No longer logged in
        this.user = null;
        this.jwt = null;
        this.fromCache = false;
        return false;
      }
    } // setCurrentUserFromJWT
    // See if a username is available

  }, {
    key: "usernameAvailability",
    value: function usernameAvailability(username) {
      var _this5 = this;

      // console.log('usernameAvailability()', username)
      return new Promise(function (resolve, reject) {
        // Check the length of the username
        username = username.trim().toLowerCase();

        if (username.length < 3) {
          reject('Username must be 3 or more characters');
          return;
        } // Ask the server if the username is in use


        var url = _this5.endpoint() + '/username-availability/' + encodeURIComponent(username); // console.log('url=', url)

        axios({
          method: 'get',
          url: url,
          headers: {
            // 'Authorization': 'Bearer ' + jwt
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }).then(function (response) {
          // JSON responses are automatically parsed.
          if (response.data.status === 'available') {
            // Name is available
            resolve(null);
            return;
          } else {
            // Name not available
            resolve(response.data.error);
            return;
          }
        }).catch(function (e) {
          if (!e.response) {
            // Network error from browser
            // See https://github.com/axios/axios/issues/383#issuecomment-234079506
            reject(NETWORK_ERROR_MSG);
            return;
          } else {
            // alert('Communications error: unable to determine if this username is available')
            var error = e.response.data.Error ? e.response.data.Error : 'Could not check availability';
            reject(error);
            return;
          }
        });
      }); // new Promise
    }
    /*
     *  Cookie handling
     */

  }, {
    key: "setCookie",
    value: function setCookie(cname, cvalue, exdays) {
      // console.log('setCookie(' + cname + ', ' + cvalue + ')')
      if (cvalue) {
        console.log('setting cookie (' + cname + ')');
      } else {
        console.log('clearing cookie (' + cname + ')');
      }

      var d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      var expires = 'expires=' + d.toUTCString();
      document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
    } // setCookie()

  }, {
    key: "getCookie",
    value: function getCookie(cname) {
      // console.log('getCookie(' + cname + ')')
      var name = cname + "=";
      var ca = document.cookie.split(';');

      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];

        while (c.charAt(0) === ' ') {
          c = c.substring(1);
        }

        if (c.indexOf(name) === 0) {
          // console.log('- found cookie')
          return c.substring(name.length, c.length);
        }
      } // console.log('- no cookie with this name')


      return "";
    } // getCookie()

  }, {
    key: "removeCookie",
    value: function removeCookie(cname) {
      // console.log('removeCookie(' + cname + ')')
      this.setCookie(cname, null, 0);
    } // removeCookie()

  }, {
    key: "isEmailSupported",
    value: function isEmailSupported() {
      return this.emailSupported;
    }
  }, {
    key: "isRegistrationSupported",
    value: function isRegistrationSupported() {
      return this.registrationSupported;
    }
  }, {
    key: "isForgottenPasswordSupported",
    value: function isForgottenPasswordSupported() {
      return this.forgottenPasswordSupported;
    }
  }]);

  return Authservice;
}(); //Authservice.install = install // The imported install()


Authservice.version = '__VERSION__';

if (inBrowser && window.Vue) {
  window.Vue.use(Authservice);
}

// VVVVV Remove these
// const JWT_COOKIE_NAME = 'authservice-jwt'
// const LOGIN_TIMEOUT_DAYS = 3
// const AUTHORIZED = true
// const NOT_AUTHORIZED = false

/**
 *  This component provides a login menu on the navbar of a page.
 *
 *  @author Philip Callender
 */

var AuthserviceLogin = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "authservice-login"
    }, [_vm.mode === 'login' ? _c('div', {
      staticClass: "card",
      attrs: {
        "href": ""
      }
    }, [_vm._m(0), _c('div', {
      staticClass: "card-content"
    }, [_c('div', {
      staticClass: "content"
    }, [_c('div', {
      staticClass: "has-text-centered"
    }, [_vm.allowFacebookLogin ? _c('div', [_c('a', {
      staticClass: "button social-button is-primary",
      on: {
        "click": function click($event) {
          _vm.facebookLogin();
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-facebook-f has-text-white"
    }), _vm._v("  Login with Facebook")]), _c('br')]) : _vm._e(), _vm.allowGoogleLogin ? _c('div', [_c('a', {
      staticClass: "button social-button is-primary",
      on: {
        "click": function click($event) {
          _vm.googleLogin();
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-google has-text-white"
    }), _vm._v("  Login with Google")]), _c('br')]) : _vm._e(), _vm.allowGithubLogin ? _c('div', [_c('a', {
      staticClass: "button social-button is-primary",
      attrs: {
        "variant": 'secondary',
        "tabindex": "38"
      },
      on: {
        "click": function click($event) {
          _vm.githubLogin();
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-github has-text-white"
    }), _vm._v("  Login with Github")]), _c('br')]) : _vm._e(), _vm.allowLinkedinLogin ? _c('div', [_c('a', {
      staticClass: "button social-button is-primary",
      attrs: {
        "variant": 'secondary',
        "tabindex": "38"
      },
      on: {
        "click": function click($event) {
          _vm.linkedinLogin();
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-linkedin has-text-white"
    }), _vm._v("  Login with LinkedIn")]), _c('br')]) : _vm._e(), _vm.allowTwitterLogin ? _c('div', [_c('a', {
      staticClass: "button social-button is-primary",
      attrs: {
        "variant": 'secondary',
        "tabindex": "38"
      },
      on: {
        "click": function click($event) {
          _vm.twitterLogin();
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-twitter has-text-white"
    }), _vm._v("  Login with Twitter")]), _c('br')]) : _vm._e()]), _vm.allowSocialLogin && _vm.loginWithEmail ? _c('div', {
      staticClass: "has-text-centered"
    }, [_c('br'), _c('b', [_vm._v("- or -   ")]), _c('br'), _c('br')]) : _vm._e(), _vm.loginWithEmail ? _c('div', [_vm.loginWithUsername ? _c('div', {
      staticClass: "field"
    }, [_c('label', {
      staticClass: "label"
    }, [_vm._v("User Name")]), _c('div', {
      staticClass: "control has-icons-left"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model.trim",
        value: _vm.email,
        expression: "email",
        modifiers: {
          "trim": true
        }
      }],
      staticClass: "input",
      attrs: {
        "type": "text",
        "placeholder": "Enter your User Name"
      },
      domProps: {
        "value": _vm.email
      },
      on: {
        "input": function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.email = $event.target.value.trim();
        },
        "blur": function blur($event) {
          _vm.$forceUpdate();
        }
      },
      nativeOn: {
        "keydown": function keydown($event) {
          return _vm.keyhandler($event);
        }
      }
    }), _vm._m(1)])]) : _c('div', {
      staticClass: "field"
    }, [_c('label', {
      staticClass: "label"
    }, [_vm._v("Email")]), _c('div', {
      staticClass: "control has-icons-left"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model.trim",
        value: _vm.email,
        expression: "email",
        modifiers: {
          "trim": true
        }
      }],
      staticClass: "input",
      attrs: {
        "type": "text",
        "placeholder": "Enter an Account Email"
      },
      domProps: {
        "value": _vm.email
      },
      on: {
        "input": function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.email = $event.target.value.trim();
        },
        "blur": function blur($event) {
          _vm.$forceUpdate();
        }
      },
      nativeOn: {
        "keydown": function keydown($event) {
          return _vm.keyhandler($event);
        }
      }
    }), _vm._m(2)])]), _c('div', {
      staticClass: "field"
    }, [_c('label', {
      staticClass: "label"
    }, [_vm._v("Password")]), _c('div', {
      staticClass: "control has-icons-left"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model.trim",
        value: _vm.password,
        expression: "password",
        modifiers: {
          "trim": true
        }
      }],
      staticClass: "input",
      attrs: {
        "type": "password",
        "autocomplete": "current-password",
        "placeholder": "Enter your Password"
      },
      domProps: {
        "value": _vm.password
      },
      on: {
        "input": function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.password = $event.target.value.trim();
        },
        "blur": function blur($event) {
          _vm.$forceUpdate();
        }
      },
      nativeOn: {
        "keydown": function keydown($event) {
          return _vm.keyhandler($event);
        }
      }
    }), _vm._m(3)])]), _c('br'), _vm.loginError ? _c('div', {
      staticClass: "notification is-danger"
    }, [_vm._v(_vm._s(_vm.loginError)), _c('br')]) : _vm._e(), _c('a', {
      staticClass: "button is-primary is-pulled-right",
      class: {
        'is-loading': _vm.loginInProgress
      },
      attrs: {
        "tabindex": "33"
      },
      on: {
        "click": _vm.doLogin
      }
    }, [_vm._v("Login")]), _vm.provideForgottenPassword ? _c('a', {
      attrs: {
        "href": "#"
      },
      on: {
        "click": function click($event) {
          _vm.setMode('forgot');
        }
      }
    }, [_vm._v("Forgot Login Info?")]) : _vm._e()]) : _vm._e(), _c('br')])]), _vm.loginWithEmail && _vm.provideRegistration ? _c('div', {
      staticClass: "card-footer"
    }, [_c('div', {
      staticClass: "card-footer-item"
    }, [_vm._v(_vm._s(_vm.loginSignupMessage) + "   "), _c('a', {
      attrs: {
        "href": "#"
      },
      on: {
        "click": function click($event) {
          _vm.setMode('register');
        }
      }
    }, [_vm._v("Sign up")])])]) : _vm._e()]) : _vm._e(), _vm.mode === 'loggedIn' ? _c('div', {
      staticClass: "card"
    }, [_c('div', {
      staticClass: "card-content"
    }, [_vm._v("You are logged in as "), _c('strong', [_vm._v(_vm._s(_vm.$authservice.user.fullname))]), _vm._v(" (" + _vm._s(_vm.$authservice.user.authority) + ")"), _c('br'), _c('br'), _vm.$authservice.user.avatar ? _c('img', {
      attrs: {
        "src": _vm.$authservice.user.avatar,
        "alt": ""
      }
    }) : _vm._e(), _c('br'), _c('br'), _c('router-link', {
      attrs: {
        "to": "/app-settings/applications"
      }
    }, [_vm._v("Settings")]), _c('br'), _c('a', {
      on: {
        "click": function click($event) {
          _vm.doSignout();
        }
      }
    }, [_vm._v(_vm._s(_vm.signin ? 'Sign out' : 'Logout'))])], 1)]) : _vm._e(), _vm.mode === 'register' ? _c('div', {
      staticClass: "card"
    }, [_vm._m(4), _c('div', {
      staticClass: "card-content"
    }, [_vm.registerRequiresUsername ? _c('div', {
      staticClass: "field"
    }, [_c('label', {
      staticClass: "label"
    }, [_vm._v("User Name")]), _c('div', {
      staticClass: "control has-icons-left"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model.trim",
        value: _vm.registerUsername,
        expression: "registerUsername",
        modifiers: {
          "trim": true
        }
      }],
      staticClass: "input",
      attrs: {
        "type": "text",
        "state": _vm.registerUsernameState,
        "autocomplete": "off",
        "placeholder": "Choose a user name"
      },
      domProps: {
        "value": _vm.registerUsername
      },
      on: {
        "input": [function ($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.registerUsername = $event.target.value.trim();
        }, _vm.validateUsername],
        "blur": function blur($event) {
          _vm.$forceUpdate();
        }
      },
      nativeOn: {
        "keydown": function keydown($event) {
          return _vm.keyhandler($event);
        }
      }
    }), _vm._m(5)]), _vm.registerUsernameError ? _c('div', {
      staticClass: "notification is-danger"
    }, [_vm._v(_vm._s(_vm.registerUsernameError)), _c('br')]) : _vm._e()]) : _vm._e(), _c('div', {
      staticClass: "field"
    }, [_c('label', {
      staticClass: "label"
    }, [_vm._v("Email")]), _c('div', {
      staticClass: "control has-icons-left"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model.trim",
        value: _vm.registerEmail,
        expression: "registerEmail",
        modifiers: {
          "trim": true
        }
      }],
      staticClass: "input",
      attrs: {
        "type": "text",
        "placeholder": "Enter your email address"
      },
      domProps: {
        "value": _vm.registerEmail
      },
      on: {
        "input": function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.registerEmail = $event.target.value.trim();
        },
        "blur": function blur($event) {
          _vm.$forceUpdate();
        }
      },
      nativeOn: {
        "keydown": function keydown($event) {
          return _vm.keyhandler($event);
        }
      }
    }), _vm._m(6)])]), _vm.registerRequiresPassword ? _c('div', {
      staticClass: "field"
    }, [_c('label', {
      staticClass: "label"
    }, [_vm._v("Password")]), _c('div', {
      staticClass: "control has-icons-left"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model.trim",
        value: _vm.registerPassword,
        expression: "registerPassword",
        modifiers: {
          "trim": true
        }
      }],
      staticClass: "input",
      attrs: {
        "type": "password",
        "autocomplete": "off",
        "placeholder": "Choose a password"
      },
      domProps: {
        "value": _vm.registerPassword
      },
      on: {
        "input": function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.registerPassword = $event.target.value.trim();
        },
        "blur": function blur($event) {
          _vm.$forceUpdate();
        }
      },
      nativeOn: {
        "keydown": function keydown($event) {
          return _vm.keyhandler($event);
        }
      }
    }), _vm._m(7)])]) : _vm._e(), _vm.registerRequiresFirstName ? _c('div', {
      staticClass: "field"
    }, [_c('label', {
      staticClass: "label"
    }, [_vm._v("First name")]), _c('div', {
      staticClass: "control"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model.trim",
        value: _vm.registerFirstName,
        expression: "registerFirstName",
        modifiers: {
          "trim": true
        }
      }],
      staticClass: "input",
      domProps: {
        "value": _vm.registerFirstName
      },
      on: {
        "input": function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.registerFirstName = $event.target.value.trim();
        },
        "blur": function blur($event) {
          _vm.$forceUpdate();
        }
      },
      nativeOn: {
        "keydown": function keydown($event) {
          return _vm.keyhandler($event);
        }
      }
    })])]) : _vm._e(), _vm.registerRequiresMiddleName ? _c('div', {
      staticClass: "field"
    }, [_c('label', {
      staticClass: "label"
    }, [_vm._v("Middle name")]), _c('div', {
      staticClass: "control"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model.trim",
        value: _vm.registerMiddleName,
        expression: "registerMiddleName",
        modifiers: {
          "trim": true
        }
      }],
      staticClass: "input",
      domProps: {
        "value": _vm.registerMiddleName
      },
      on: {
        "input": function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.registerMiddleName = $event.target.value.trim();
        },
        "blur": function blur($event) {
          _vm.$forceUpdate();
        }
      },
      nativeOn: {
        "keydown": function keydown($event) {
          return _vm.keyhandler($event);
        }
      }
    })])]) : _vm._e(), _vm.registerRequiresLastName ? _c('div', {
      staticClass: "field"
    }, [_c('label', {
      staticClass: "label"
    }, [_vm._v("Last name")]), _c('div', {
      staticClass: "control"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model.trim",
        value: _vm.registerLastName,
        expression: "registerLastName",
        modifiers: {
          "trim": true
        }
      }],
      staticClass: "input",
      domProps: {
        "value": _vm.registerLastName
      },
      on: {
        "input": function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.registerLastName = $event.target.value.trim();
        },
        "blur": function blur($event) {
          _vm.$forceUpdate();
        }
      },
      nativeOn: {
        "keydown": function keydown($event) {
          return _vm.keyhandler($event);
        }
      }
    })])]) : _vm._e(), _c('br'), _vm.registerError ? _c('div', {
      staticClass: "notification is-danger"
    }, [_vm._v(_vm._s(_vm.registerError)), _c('br')]) : _vm._e(), _c('a', {
      staticClass: "button is-primary is-pulled-right",
      class: {
        'is-loading': _vm.registerInProgress
      },
      on: {
        "click": _vm.register
      }
    }, [_vm._v("SIGN UP")]), _c('span', {
      staticClass: "is-pulled-left"
    }, [_vm._v("Already have an account?  "), _c('a', {
      attrs: {
        "href": "#"
      },
      on: {
        "click": function click($event) {
          _vm.setMode('login');
        }
      }
    }, [_vm._v("Log in")])]), _c('br')]), _vm.termsMessage ? _c('div', {
      staticClass: "card-footer"
    }, [_c('div', {
      staticClass: "card-footer-item has-text-centered"
    }, [_vm._v(_vm._s(_vm.termsMessage)), _vm.termsRoute ? _c('div', {
      staticClass: "is-small"
    }, [_vm._v("  ("), _c('a', {
      staticClass: "is-small",
      attrs: {
        "href": _vm.termsRoute
      }
    }, [_vm._v("link")]), _vm._v(")")]) : _vm._e()])]) : _vm._e()]) : _vm._e(), _vm.mode === 'registerAfter' ? _c('div', {
      staticClass: "card"
    }, [_vm._m(8), _c('div', {
      staticClass: "card-content"
    }, [_c('p', [_vm._v("Congratulations, you now have a user account. We have sent you an email to verify your email address.")]), _c('p', [_vm._v("Please take a moment to check your email and complete the registration process.")]), _c('br'), _c('button', {
      staticClass: "button is-pulled-right is-primary",
      attrs: {
        "type": "submit"
      },
      on: {
        "click": function click($event) {
          _vm.setMode('login');
        }
      }
    }, [_vm._v("OK")]), _c('br'), _c('br')])]) : _vm._e(), _vm.mode === 'forgot' ? _c('div', [_c('br'), _c('br'), _c('div', {
      staticClass: "card"
    }, [_vm._m(9), _c('div', {
      staticClass: "card-content"
    }, [_vm._v("No problem. Enter your email address  and we'll well send an email with recovery instructions."), _c('br'), _c('br'), _c('div', {
      staticClass: "field"
    }, [_c('label', {
      staticClass: "label"
    }, [_vm._v("Email Address")]), _c('div', {
      staticClass: "control has-icons-left"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model.trim",
        value: _vm.forgotEmail,
        expression: "forgotEmail",
        modifiers: {
          "trim": true
        }
      }],
      staticClass: "input",
      attrs: {
        "type": "text",
        "placeholder": "Enter your Email Address"
      },
      domProps: {
        "value": _vm.forgotEmail
      },
      on: {
        "input": function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.forgotEmail = $event.target.value.trim();
        },
        "blur": function blur($event) {
          _vm.$forceUpdate();
        }
      },
      nativeOn: {
        "keydown": function keydown($event) {
          return _vm.keyhandler($event);
        }
      }
    }), _vm._m(10)])]), _vm.forgotError ? _c('div', {
      staticClass: "notification is-danger",
      attrs: {
        "show": ""
      }
    }, [_vm._v(_vm._s(_vm.forgotError))]) : _vm._e(), _c('br'), _c('a', {
      staticClass: "button is-primary is-pulled-right",
      class: {
        'is-loading': _vm.forgotInProgress
      },
      on: {
        "click": _vm.forgot
      }
    }, [_vm._v("Send the Email")]), _c('div', {
      staticClass: "is-pulled-right"
    }, [_vm._v("  ")]), _c('a', {
      staticClass: "button is-pulled-right",
      on: {
        "click": function click($event) {
          _vm.setMode('login');
        }
      }
    }, [_vm._v("Cancel")]), _c('br')])]), _c('br'), _c('br')]) : _vm._e(), _vm.mode === 'forgotAfter' ? _c('div', {
      staticClass: "card"
    }, [_vm._m(11), _c('div', {
      staticClass: "card-content"
    }, [_vm._v("We have sent an email to " + _vm._s(_vm.forgotEmail) + " with instructions to reset your password."), _c('br'), _c('br'), _c('a', {
      staticClass: "button is-primary is-pulled-right",
      on: {
        "click": function click($event) {
          _vm.setMode('login');
        }
      }
    }, [_vm._v("Ok")]), _c('br')])]) : _vm._e()]);
  },
  staticRenderFns: [function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('header', {
      staticClass: "card-header"
    }, [_c('p', {
      staticClass: "card-header-title"
    }, [_vm._v("Login / Sign In")])]);
  }, function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('span', {
      staticClass: "icon is-small is-left"
    }, [_c('i', {
      staticClass: "fa fa-user"
    })]);
  }, function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('span', {
      staticClass: "icon is-small is-left"
    }, [_c('i', {
      staticClass: "fa fa-envelope-o"
    })]);
  }, function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('span', {
      staticClass: "icon is-small is-left"
    }, [_c('i', {
      staticClass: "fa fa-lock"
    })]);
  }, function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('header', {
      staticClass: "card-header"
    }, [_c('p', {
      staticClass: "card-header-title"
    }, [_vm._v("SIGN UP")])]);
  }, function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('span', {
      staticClass: "icon is-small is-left"
    }, [_c('i', {
      staticClass: "fa fa-user"
    })]);
  }, function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('span', {
      staticClass: "icon is-small is-left"
    }, [_c('i', {
      staticClass: "fa fa-envelope-o"
    })]);
  }, function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('span', {
      staticClass: "icon is-small is-left"
    }, [_c('i', {
      staticClass: "fa fa-lock"
    })]);
  }, function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('header', {
      staticClass: "card-header"
    }, [_c('p', {
      staticClass: "card-header-title"
    }, [_vm._v("Congratulations")])]);
  }, function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('header', {
      staticClass: "card-header"
    }, [_c('p', {
      staticClass: "card-header-title"
    }, [_vm._v("Forgot your Login Information?")])]);
  }, function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('span', {
      staticClass: "icon is-small is-left"
    }, [_c('i', {
      staticClass: "fa fa-envelope-o"
    })]);
  }, function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('header', {
      staticClass: "card-header"
    }, [_c('p', {
      staticClass: "card-header-title"
    }, [_vm._v("Forgotten Password")])]);
  }],
  _scopeId: 'data-v-0efa84e8',
  name: 'authservice-login',
  components: {
    Icon: Icon
  },
  props: {
    // /**
    // *  Allow login with username (rather than email)
    // */
    // loginWithUsername: {
    //   type: Boolean,
    //   default: false
    // },

    /**
     *  Say "sign in" rather than "log in"
     */
    signin: {
      type: Boolean,
      default: false
    },
    hideRegister: {
      type: Boolean,
      default: false
    },
    hideForgot: {
      type: Boolean,
      default: false
    },
    hideAvatar: {
      type: Boolean,
      default: false
    },
    hideLogout: {
      type: Boolean,
      default: false
    },
    // extraMenuItems: '<', // string ([+-]tag:label, ...) + = logged in, - = logged out.

    /*
     *  Registration-related
     */
    // Which fields required for registration
    registerFields: String,
    registerResume: String,
    // URL - where to go after email verification
    // Forgotten password related
    forgotResume: String,
    // URL - where to go after email verification
    // Initial mode (e.g. 'register' or 'signup')
    initialMode: String,
    nocomma: String
  },
  data: function data() {
    // console.log('data(): this=', this)
    return {
      username: '',
      email: '',
      password: '',
      loggedIn: false,
      mode: this.$authservice && this.$authservice.user ? 'loggedIn' : 'login',
      // loginWithUsername: true,
      loginError: '',
      loginInProgress: '',
      // Forgotten password
      forgotEmail: '',
      forgotError: '',
      forgotInProgress: false,
      // Registration-related
      registerEmail: '',
      registerUsername: '',
      registerFirstName: '',
      registerMiddleName: '',
      registerLastName: '',
      registerPassword: '',
      registerError: '',
      registerInProgress: false,
      // registerRequiresUsername: registerWithField(this, 'username'),
      // registerRequiresPassword: registerWithField(this, 'password'),
      // registerRequiresFirstName: registerWithField(this, 'first_name'),
      // registerRequiresMiddleName: registerWithField(this, 'middle_name'),
      // registerRequiresLastName: registerWithField(this, 'last_name'),
      // freshCredentials: '<', // boolean, don't use JWT from cookie
      // // UI-related
      // signin: '<', // boolean
      // hideRegister: '<', // boolean
      // hideForgot: '<', // boolean
      // hideAvatar: '<', // boolean
      // hideLogout: '<', // boolean
      // bindToDom: '<', // boolean
      // extraMenuItems: '<', // string ([+-]tag:label, ...) + = logged in, - = logged out.
      //
      // // Registration-related
      // registerFields: '<', // string (password,first_name,middle_name,last_name)
      // registerResume: '<', // URL - where to go after email verification
      // forgotResume: '<', // URL - where to go after email verification
      //
      // // OAuth2-related
      // facebook: '<', // boolean
      // google: '<', // boolean
      // github: '<', // boolean
      // resume: '<', // URL, where to go after OAuth2 login
      // fail: '<' // URL, where to go after OAuth2 error
      user: null,
      jwt: null,
      fromCache: false,
      // The data is provided by $store.state.appList
      // How to display the fields in the table
      registerUsernameState: false,
      registerUsernameError: ''
    };
  },
  computed: {
    headerName: function headerName() {
      if (!this.$authservice.user) {
        return '-';
      }

      if (this.$authservice.user.username) {
        return this.$authservice.user.username;
      }

      if (this.$authservice.user.firstname) {
        return this.$authservice.user.firstname;
      } // Need to use the email address


      return this.$authservice.user.email;
    },
    // headerName
    //   usernameState () {
    //     return new Promise((resolve, reject) => {
    //       // return this.registerUsername.length > 2 ? null : false
    //       if (this.registerUsername.length > 2) {
    //         return resolve(null)
    //       } else {
    //         return reject()
    //       }
    //     })// new promise
    //   }
    loginWithEmail: function loginWithEmail() {
      return !!this.optionValue('hints.login.email', true);
    },
    loginWithUsername: function loginWithUsername() {
      var val = this.optionValue('hints.usernames', false);
      console.log("loginWithUsername: ".concat(val));
      return !!this.optionValue('hints.usernames', false);
    },
    allowFacebookLogin: function allowFacebookLogin() {
      return !!this.optionValue('hints.login.facebook', false);
    },
    allowGithubLogin: function allowGithubLogin() {
      return !!this.optionValue('hints.login.github', false);
    },
    allowGoogleLogin: function allowGoogleLogin() {
      return !!this.optionValue('hints.login.google', false);
    },
    allowLinkedinLogin: function allowLinkedinLogin() {
      return !!this.optionValue('hints.login.linkedin', false);
    },
    allowTwitterLogin: function allowTwitterLogin() {
      return !!this.optionValue('hints.login.twitter', false);
    },
    allowSocialLogin: function allowSocialLogin() {
      return this.allowFacebookLogin || this.allowGithubLogin || this.allowGoogleLogin || this.allowLinkedinLogin || this.allowTwitterLogin;
    },
    loginSignupMessage: function loginSignupMessage() {
      var site = this.optionValue('hints.sitename', 'this site');
      var msg = "New to ".concat(site, "?"); // let msg = 'Don\'t have an account yet?'

      return this.optionValue('hints.login.registerMessage', msg);
    },
    termsMessage: function termsMessage() {
      var site = this.optionValue('hints.sitename', 'this site');
      var msg = "By signing up to ".concat(site, " you agree to our EULA.");
      return this.optionValue('hints.register.termsMessage', msg);
    },
    termsRoute: function termsRoute() {
      return this.optionValue('hints.register.termsRoute', null);
    },
    registerRequiresUsername: function registerRequiresUsername() {
      return !!this.optionValue('hints.usernames', false);
    },
    registerRequiresPassword: function registerRequiresPassword() {
      return !!this.optionValue('hints.register.password', true);
    },
    registerRequiresFirstName: function registerRequiresFirstName() {
      return !!this.optionValue('hints.register.firstname', false);
    },
    registerRequiresMiddleName: function registerRequiresMiddleName() {
      return !!this.optionValue('hints.register.middlename', false);
    },
    registerRequiresLastName: function registerRequiresLastName() {
      return !!this.optionValue('hints.register.lastname', false);
    },
    provideEmailLogin: function provideEmailLogin() {
      return this.$authservice && this.$authservice.isEmailSupported();
    },
    provideRegistration: function provideRegistration() {
      return this.$authservice && this.$authservice.isRegistrationSupported();
    },
    provideForgottenPassword: function provideForgottenPassword() {
      return this.$authservice && this.$authservice.isForgottenPasswordSupported();
    }
  },
  // Once the componented has been created, see if we are already
  // logged in (as shown by having a valid JWT in a cookie)
  created: function created() {
    // See if the user wants to start in a particular mode
    if (this.$authservice && this.$authservice.user) {
      this.mode = 'loggedIn';
    } else if (this.initialMode === 'login' || this.initialMode === 'forgot' || this.initialMode === 'register') {
      this.mode = this.initialMode;
    } // console.log('============= NEW COMPONENT ================')
    // console.log('\n\n\n1 ====>', this.$authservice)
    // console.log('\n\n\n2 ====>', this.$authservice.user)
    // registerRequiresUsername: registerWithField(this, 'username'),
    // registerRequiresPassword: registerWithField(this, 'password'),
    // registerRequiresFirstName: registerWithField(this, 'first_name'),
    // registerRequiresMiddleName: registerWithField(this, 'middle_name'),
    // registerRequiresLastName: registerWithField(this, 'last_name'),

  },
  methods: {
    // Prevent the default key bindings from closing the
    // login dropdown when TAB is pressed to move between fields.
    keyhandler: function keyhandler(event) {
      event.stopPropagation();
    },
    optionValue: function optionValue(name, _default) {
      //console.log(`optionValue(${name}, ${_default})`);
      if (!this.$authservice) {
        console.log("this.$authservice not found");
        return _default; // Should not happen
      }

      if (!this.$authservice.options) {
        console.log("this.$authservice.options not found");
        return _default;
      } //console.log(`options=`, this.$authservice.options);


      var names = name.split('.');
      var obj = this.$authservice.options;

      for (var i = 0; i < names.length; i++) {
        var _name = names[i]; //console.log(`Looking for ${name}`);
        //console.log(`got ${typeof obj[name]}`);

        if (typeof obj[_name] === 'undefined') {
          // Not found
          //console.log(`- not found`);
          return _default;
        }

        obj = obj[_name];
      } //console.log(`found it`);


      return obj;
    },
    // Sign in using email/password or username/password
    doLogin: function doLogin(event) {
      var _this = this;

      console.log('doLogin(' + this.email + ', ' + this.password + ')');
      var password = this.password;
      this.password = '';
      this.loginError = '';
      this.loginInProgress = true;
      this.$authservice.login(this.email, password).then(function (userDetails) {
        _this.loginError = '';
        _this.loginInProgress = false;
        _this.mode = 'loggedIn';

        _this.$emit('userchange', _this.$authservice.user.id);
      }).catch(function (errmsg) {
        _this.loginError = errmsg;
        _this.loginInProgress = false;
        _this.mode = 'login';

        _this.$emit('userchange', 0);
      }); // event.stopPropagation()

      return false;
    },
    // doLogin
    // Sign out from the menu
    doSignout: function doSignout() {
      this.mode = 'login';
      this.email = '';
      this.password = '';
      this.$authservice.logout();
    },
    facebookLogin: function facebookLogin() {
      // alert('facebook login, ' + this.username + ', ' + this.password)
      this.$authservice.initiateOAuth(this, 'facebook');
    },
    githubLogin: function githubLogin() {
      //alert('github login, ' + this.username + ', ' + this.password)
      this.$authservice.initiateOAuth(this, 'github');
    },
    googleLogin: function googleLogin() {
      //alert('google login, ' + this.username + ', ' + this.password)
      this.$authservice.initiateOAuth(this, 'google');
    },
    linkedinLogin: function linkedinLogin() {
      //alert('linkedin login, ' + this.username + ', ' + this.password)
      this.$authservice.initiateOAuth(this, 'linkedin');
    },
    twitterLogin: function twitterLogin() {
      //alert('twitter login, ' + this.username + ', ' + this.password)
      this.$authservice.initiateOAuth(this, 'twitter');
    },
    // See if a username is used
    validateUsername: function validateUsername() {
      // console.log('validateUsername(' + this.registerUsername + ')')
      // Nothing to check if no username has been entered
      // Don't worry, the submit button will not be enabled
      if (this.registerUsername === '') {
        this.registerUsernameError = '';
        return;
      }

      if (this.registerUsername.length < 3) {
        this.registerUsernameState = false;
        this.registerUsernameError = 'Username must be 3 or more characters';
        return;
      }

      return this.validateUsernameRemoteBit();
    },
    validateUsernameRemoteBit: debounce(function () {
      var _this2 = this;

      // console.log('validateUsernameRemoteBit (after debounce)')
      // See if the name is available
      this.validatingUsername = true;
      this.registerUsernameError = '';
      this.$authservice.usernameAvailability(this.registerUsername).then(function (error) {
        _this2.registerUsernameError = error; // May be null

        _this2.validatingUsername = false;
        _this2.registerUsernameState = error === null;
      }).catch(function (error) {
        _this2.registerUsernameError = error;
        _this2.validatingUsername = false;
        _this2.registerUsernameState = false;
      }); // usernameAvailability()
    }, 500),
    // debounce (i.e. don't check every individual character)
    // Register a new user
    register: function register() {
      var _this3 = this;

      // alert('register, ' + this.username + ', ' + this.password)
      var options = {
        email: this.registerEmail
      };

      if (this.registerRequiresUsername) {
        options.username = this.registerUsername;
      }

      if (this.registerRequiresPassword) {
        options.password = this.registerPassword;
      }

      if (this.registerRequiresFirstName) {
        options.firstName = this.registerFirstName;
      }

      if (this.registerRequiresMiddleName) {
        options.middleName = this.registerMiddleName;
      }

      if (this.registerRequiresLastName) {
        options.lastName = this.registerLastName;
      }

      this.registerError = '';
      this.registerInProgress = true;
      this.$authservice.register(options).then(function (reply) {
        console.log('all is okay', reply); // Register password mail has been sent

        _this3.registerError = '';
        _this3.registerInProgress = false;
        _this3.mode = 'registerAfter';
      }).catch(function (error) {
        // Not registered
        console.log('have error', error);
        _this3.registerError = error;
        _this3.registerInProgress = false;
      }); // return true

      return false;
    },
    // Handle forgotten password
    forgot: function forgot() {
      var _this4 = this;

      this.forgotInProgress = true;
      this.$authservice.forgot(this.forgotEmail, {
        forgotResume: this.forgotResume
      }).then(function (reply) {
        // Forgotten password mail has been sent
        _this4.forgotError = '';
        _this4.forgotInProgress = false;
        _this4.mode = 'forgotAfter';
      }).catch(function (error) {
        // Email was not sent
        _this4.forgotError = error;
        _this4.forgotInProgress = false;
      });
      return true;
    },
    // Set the current component mode (loggedIn, login, register, forgot, etc)
    setMode: function setMode(mode) {
      this.mode = mode;
      return false;
    }
  } // VVVVV Obsolete, no longer used
  // function setCurrentUser (me, user, jwt, fromCookie) {
  //   // console.log();
  //   // console.log('++++++++>  setCurrentUser(): ttuat=' + ttuat + ', user=', user)
  //
  //   // Change the current user.
  //   // var oldCurrentUser = user
  //   if (user) {
  //     // console.log('Setting user to ', user);
  //
  //     // // If relationships are loaded, sort the summey
  //     // if (user.relationshipSummary) {
  //     //   var arrayOfFriends = user.relationshipSummary.hasFriend
  //     //   arrayOfFriends.sort(sortRelationshipSummaryByFullname)
  //     //
  //     //   // Short those who have friended me
  //     //   var arrayOfFriendedBy = user.relationshipSummary.isFriendedBy;
  //     //   arrayOfFriendedBy.sort(sortRelationshipSummaryByFullname)
  //     // }
  //     me.user = user
  //     me.entityId = user.id
  //     if (jwt) {
  //       me.jwt = jwt
  //     }
  //     setCookieFromCurrentUser(me)
  //
  //     // VVVVV need event
  //     // if (_onUserChange) { // && oldCurrentUser==null) {
  //     //
  //     //   var newUser = getCurrentUser() // may be a clone
  //     //   var newTtuat = _ttuat
  //     //   (_onUserChange)(newUser, newTtuat, fromCookie)
  //     // }
  //   } else {
  //     // No longer logged in
  //     me.user = null
  //     me.entityId = -1
  //     me.jwt = null
  //     setCookieFromCurrentUser(me)
  //
  //     // if (_onUserChange) { // && oldCurrentUser != null) {
  //     //   var fromCookie = false
  //     //   _onUserChange(null, null, fromCookie)
  //     // }
  //   }
  // }

  /*
   *  Place the current user details and access token in a cookie,
   *  so the next page we go to knows who are logged in as.
   */
  // VVVVV Obsolete, no longer used
  // function setCookieFromCurrentUser (me) {
  //   if (me.user) {
  //     // Create a new object here, but not with all the details
  //     let cookieObj = {
  //       user: {
  //         id: me.user.id,
  //         fullname: me.user.fullname,
  //         avatar: me.user.avatar,
  //         firstname: me.user.firstname,
  //         lastname: me.user.lastname
  //       },
  //       jwt: me.jwt
  //     }
  //     console.log('Setting ' + LOGIN_DETAILS_COOKIE_NAME + ' (not sure why)')
  //     setCookie(LOGIN_DETAILS_COOKIE_NAME, JSON.stringify(cookieObj), LOGIN_TIMEOUT_DAYS)
  //   } else {
  //     // Remove the cookie
  //     console.log('Removing ' + LOGIN_DETAILS_COOKIE_NAME + ' (no current user)')
  //     setCookie(LOGIN_DETAILS_COOKIE_NAME, null, 0)
  //   }
  // }

  /*
   *    Get the current URL, and remove any Authservice parameters.
   */
  // function currentPageURL () {
  //   let l = window.location
  //   let s = l.search // ?....&....&....
  //   if (s !== '') {
  //     s = '&' + s.substring(1) // Replace initial ? with &
  //     s = s
  //       .replace(/&AUTHSERVICE_JWT=[^&]*/, '')
  //       .replace(/&AUTHSERVICE_ERROR=[^&]*/, '')
  //     if (s !== '') {
  //       s = '?' + s.substring(1) // Replace initial & with ?
  //     }
  //   }
  //   let thisPageURL = l.protocol + "//" + l.host + l.pathname + s + l.hash
  //   return thisPageURL
  // }
  // Return the URL to jump to the bounce page.
  // function getBounceURL (me, bouncePageRelativePath, resumeURL) {
  //   console.log('getBounceURL(' + bouncePageRelativePath + ',' + resumeURL + ')')
  //   if (!resumeURL) {
  //     resumeURL = currentPageURL()
  //   }
  //   let l = window.location
  //   let thisPageURL = l.protocol + "//" + l.host // + l.pathname + s + l.hash;
  //   let url = thisPageURL + bouncePageRelativePath + '?resume=' + encodeURIComponent(resumeURL)
  //   return url
  // }

};
//   let endpoint = '//' + me.host + ':' + me.port + '/' + me.version + '/' + me.apikey
//   console.log('endpoint is ' + endpoint)
//   return endpoint
// }

var JWT_COOKIE_NAME$1 = 'authservice-jwt';
var LOGIN_TIMEOUT_DAYS$1 = 3;
var AuthserviceBounceComponent = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('p', [_c('br'), _vm._v("      "), _c('a', {
      attrs: {
        "href": _vm.url
      }
    }, [_vm._v(_vm._s(_vm.url))])]);
  },
  staticRenderFns: [],
  name: 'authservice-bounce-component',
  props: ['debug'],
  data: function data() {
    return {
      url: ''
    };
  },
  computed: {
    bounceURL: function bounceURL() {
      return this.$route.params.url;
    }
  },
  created: function created() {
    if (this.$route && this.$route.params && typeof window != 'undefined') {
      bounce(this, false);
    }
  } // When this is called from a page, two things happen.
  //  1. If there is a 'AUTHSERVICE_JWT' parameter to the page it gets stored as a cookie.
  //  2. If there is a 'next' parameter, we jump to that URL.
  //  3. If there is a 'AUTHSERVICE_EMAIL_TOKEN' parameter, we add it to the 'next' URL.

};

function bounce(me, debug) {
  // See what parameters we've been passed
  var parsed = QueryString.parse(window.location.search);
  var jwt = parsed['AUTHSERVICE_JWT'];
  var next64 = parsed['next']; //const debug |= parsed['debug']

  if (parsed['debug']) {
    debug = true;
  }

  if (jwt && !Date) {
    console.log("*** setting JWT cookie ".concat(JWT_COOKIE_NAME$1));
    setCookie(JWT_COOKIE_NAME$1, jwt, LOGIN_TIMEOUT_DAYS$1);
  } // See where we are going to next


  var next = new Buffer(next64, 'base64').toString('ascii'); //- console.log(`next=${next}`)
  // If we have an email token, add it the the new URL

  var emailToken = parsed['AUTHSERVICE_EMAIL_TOKEN'];

  if (emailToken) {
    var nextParsed = URL.parse(next, true); //- console.log(`next:`, nextParsed)

    nextParsed.query['AUTHSERVICE_EMAIL_TOKEN'] = emailToken;
    next = URL.format(nextParsed); //- console.log(`Revised next=`, next)
  } //debug = true


  if (debug) {// Debugging, so don't actually redirect.
    //- setTimeout(function () {
    //-   window.location = next
    //- }, 5000)
  } else {
    window.location = next;
  }
}

function setCookie(cname, cvalue, exdays) {
  // console.log('setCookie(' + cname + ', ' + cvalue + ')')
  console.log('setCookie(' + cname + ')');
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
} // setCookie()

var AuthserviceUserList = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.selectStatus == 'loaded',
        expression: "selectStatus == 'loaded'"
      }],
      staticClass: "list"
    }, [_c('div', {
      staticClass: "columns"
    }, [_c('div', {
      staticClass: "column is-2 is-offset-10"
    }, [_c('div', {
      staticClass: "field"
    }, [_c('div', {
      staticClass: "control has-icons-right"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.filterKey,
        expression: "filterKey"
      }],
      staticClass: "input is-small is-rounded",
      attrs: {
        "type": "text",
        "placeholder": "filter users",
        "autocomplete": "off"
      },
      domProps: {
        "value": _vm.filterKey
      },
      on: {
        "input": function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.filterKey = $event.target.value;
        }
      }
    }), _vm._m(0)])])])]), _c('table', {
      staticClass: "table is-fullwidth is-bordered is-narrow",
      class: {
        'is-hoverable': typeof _vm.pathForDetails === 'string'
      }
    }, [_c('thead', [_c('tr', _vm._l(_vm.ourColumns, function (key) {
      return _c('th', {
        class: {
          active: _vm.sortKey == key
        },
        on: {
          "click": function click($event) {
            _vm.sortBy(key);
          }
        }
      }, [_vm._v(_vm._s(_vm._f("capitalize")(key))), _c('span', {
        staticClass: "arrow",
        class: _vm.sortOrders[key] > 0 ? 'asc' : 'dsc'
      })]);
    }))]), _c('tbody', _vm._l(_vm.filteredData, function (entry) {
      return _c('tr', {
        on: {
          "click": function click($event) {
            _vm.selectUser(entry);
          }
        }
      }, _vm._l(_vm.ourColumns, function (key) {
        return _c('td', {
          class: _vm.classForStatus(entry, key)
        }, [key === 'icon' ? _c('div', {
          staticClass: "has-text-centered"
        }, [_c('i', {
          staticClass: "fa type-icon",
          class: _vm.iconClass(entry)
        })]) : _c('span', [_vm._v(_vm._s(entry[key]))])]);
      }));
    }))])]);
  },
  staticRenderFns: [function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "icon is-small is-right"
    }, [_c('i', {
      staticClass: "fa fa-search"
    })]);
  }],
  _scopeId: 'data-v-861b7d94',
  name: 'userList',
  props: {
    pathForDetails: String,
    data: Array,
    columns: Array,
    tenant: String
  },
  data: function data() {
    // Has the user provided a list of columns?
    var ourColumns = this.columns;

    if (typeof this.columns === 'undefined') {
      ourColumns = [// Default only - may be replaced with 'columns' prop
      'icon', 'authority', 'first_name', 'last_name', 'username', 'email', 'id', 'status'];
    } // Order for sorting fields


    var sortOrders = {};
    ourColumns.forEach(function (key) {
      sortOrders[key] = 1;
    }); // Return the data fields

    return {
      sortKey: '',
      sortOrders: sortOrders,
      filterKey: '',
      ourColumns: ourColumns,
      locallySelectedUsers: [],
      selectStatus: 'init'
    };
  },
  computed: {
    // userList: {
    //   return (this.data) ? (this.data) : (this.locallySelectedUsers)
    // },
    filteredData: function filteredData() {
      var sortKey = this.sortKey;
      var filterKey = this.filterKey && this.filterKey.toLowerCase();
      var order = this.sortOrders[sortKey] || 1; //var data = this.data

      var data = this.data ? this.data : this.locallySelectedUsers;

      if (filterKey) {
        data = data.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1;
          });
        });
      }

      if (sortKey) {
        data = data.slice().sort(function (a, b) {
          a = a[sortKey];
          b = b[sortKey];
          return (a === b ? 0 : a > b ? 1 : -1) * order;
        });
      }

      return data;
    }
  },
  filters: {
    capitalize: function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  },
  methods: {
    sortBy: function sortBy(key) {
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1;
    },
    selectUser: function selectUser(user) {
      console.log("Selected user:", user);
      console.log('pathForDetails:', _typeof(this.pathForDetails));

      if (this.pathForDetails) {
        // Check that we have places in the path where we insert tenant and userId.
        // For example '/myapp/{TENANT}/user/{USERID}'
        var tenantMarker = '{TENANT}';
        var userIdMarker = '{USERID}';
        var replaceTenant = this.pathForDetails.includes(tenantMarker);
        var replaceUserId = this.pathForDetails.includes(userIdMarker);

        if (replaceTenant && replaceUserId) {
          // Work out where are jumping to
          var path = this.pathForDetails;
          path = path.replace(tenantMarker, user.tenant);
          path = path.replace(userIdMarker, user.id);
          alert("Jumping to ".concat(path)); // Jump to the user details page
          // See http://router.vuejs.org/en/essentials/navigation.html
          // this.$router.push({ path: `/user-details/${user.tenant}/${user.id}` })

          this.$router.push({
            path: path
          });
        } else {
          console.error("path-for-details must include ".concat(tenantMarker, " and ").concat(userIdMarker, ". e.g. /user-details/{TENANT}/{USERID}"));
        }
      }
    },
    classForStatus: function classForStatus(user, key) {
      if (key === 'status') {
        return "status-".concat(user.status, " status-field");
      } else {
        return "status-".concat(user.status);
      }
    },
    iconClass: function iconClass(user, key) {
      var cls;

      if (user.is_admin) {
        cls = 'fa-bolt';
      } else {
        switch (user.entity_type) {
          case 'user':
            cls = 'fa-user';
            break;

          case 'organisation':
            cls = 'fa-users';
            break;
          // case 'club': cls = 'fa-users'; break
          // case 'company': cls = 'fa-users'; break
          // case 'group': cls = 'fa-users'; break
          // case 'role': cls = 'fa-users'; break

          default:
            cls = 'fa-question';
        }
      }

      return cls;
    }
  },
  created: function created() {
    var _this = this;

    if (this.data) {
      // Might be empty now, but they will arrive (hopefully) once the parent has them
      console.log('authservice-user-list has data:', this.data.length);
    } else if (this.tenant) {
      // Select the users for this username/app (i.e. tenant).
      console.log('authservice-user-list is selecting users');
      var url = "".concat(this.$authservice.endpoint(), "/").concat(this.tenant, "/users");
      var params = {
        method: 'get',
        url: url,
        headers: {
          'Authorization': 'Bearer ' + this.$authservice.jwt,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };
      console.log('params:', params);
      axios(params).then(function (response) {
        // JSON responses are automatically parsed.
        _this.locallySelectedUsers = response.data;
        _this.selectStatus = 'loaded';
        return;
      }).catch(function (e) {
        console.log('Error selecting users:', e);
        axiosError(_this, url, params, e);
        _this.selectStatus = 'error';
      });
    } else {
      //${this.$route.params.username}/${this.$route.params.appname}
      console.error('authservice-user-list requires either data or tenant prop');
    }
  }
};

var AuthserviceUserDetails = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "authservice-profile"
    }, [_vm.selectError ? _c('div', [_vm._m(0)]) : _c('div', [_c('div', {
      staticClass: "columns"
    }, [_c('div', {
      staticClass: "column is-3 has-text-centered"
    }, [_c('div', {
      staticClass: "a3-logo"
    }, [_vm.user.authority === 'email' ? _c('i', {
      staticClass: "fa fa-envelope-o"
    }) : _vm.user.authority === 'facebook' ? _c('i', {
      staticClass: "fa fa-facebook-official"
    }) : _vm.user.authority === 'github' ? _c('i', {
      staticClass: "fa fa-github"
    }) : _vm.user.authority === 'google' ? _c('i', {
      staticClass: "fa fa-google"
    }) : _vm.user.authority === 'linkedin' ? _c('i', {
      staticClass: "fa fa-linkedin-square"
    }) : _vm.user.authority === 'twitter' ? _c('i', {
      staticClass: "fa fa-twitter"
    }) : _vm._e()]), _c('h3', {
      staticClass: "is-5"
    }, [_vm._v(_vm._s(_vm.loginDescription))]), _c('span', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.user.is_admin,
        expression: "user.is_admin"
      }]
    }, [_vm._v("[administrator]")]), _c('br'), _c('br'), _c('br'), _c('br'), _c('br'), _c('br'), _vm.mayUpdateUser ? _c('button', {
      staticClass: "button is-info",
      on: {
        "click": _vm.onSubmit
      }
    }, [_vm._v("Update")]) : _vm._e(), _vm.mayChangePassword ? _c('div', [_c('br'), _c('br'), _vm.mayChangePassword ? _c('authservice-change-password', {
      attrs: {
        "user": _vm.user,
        "demo": _vm.demo,
        "email-token": _vm.emailToken
      }
    }) : _vm._e()], 1) : _vm._e()]), _c('div', {
      staticClass: "column is-8"
    }, [_c('form', [_vm.user.authority === 'email' ? _c('div', {
      staticClass: "field"
    }, [_c('div', {
      staticClass: "label"
    }, [_vm._v("Username")]), _c('div', {
      staticClass: "control"
    }, [_c('b', [_vm._v(_vm._s(_vm.user.username))])])]) : _vm._e(), _c('div', {
      staticClass: "field"
    }, [_c('div', {
      staticClass: "columns"
    }, [_c('div', {
      staticClass: "column is-6"
    }, [_c('div', {
      staticClass: "label"
    }, [_vm._v("Tenant")]), _c('div', {
      staticClass: "control"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.user.tenant,
        expression: "user.tenant"
      }],
      staticClass: "input",
      attrs: {
        "type": "text",
        "placeholder": "First name",
        "autocomplete": "off",
        "disabled": "disabled"
      },
      domProps: {
        "value": _vm.user.tenant
      },
      on: {
        "input": function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.$set(_vm.user, "tenant", $event.target.value);
        }
      }
    })])]), _c('div', {
      staticClass: "column is-6"
    }, [_c('div', {
      staticClass: "label"
    }, [_vm._v("Email")]), _c('div', {
      staticClass: "control"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.user.email,
        expression: "user.email"
      }],
      staticClass: "input",
      attrs: {
        "type": "text",
        "placeholder": "First name",
        "autocomplete": "off",
        "disabled": "disabled"
      },
      domProps: {
        "value": _vm.user.email
      },
      on: {
        "input": function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.$set(_vm.user, "email", $event.target.value);
        }
      }
    })])])])]), _c('div', {
      staticClass: "field"
    }, [_c('div', {
      staticClass: "label"
    }, [_vm._v("Name")]), _c('div', {
      staticClass: "columns"
    }, [_c('div', {
      staticClass: "column is-4"
    }, [_c('div', {
      staticClass: "control"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.user.first_name,
        expression: "user.first_name"
      }],
      staticClass: "input",
      attrs: {
        "type": "text",
        "placeholder": "First name",
        "autocomplete": "off",
        "disabled": !_vm.mayUpdateName
      },
      domProps: {
        "value": _vm.user.first_name
      },
      on: {
        "input": function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.$set(_vm.user, "first_name", $event.target.value);
        }
      }
    })])]), _c('div', {
      staticClass: "column is-4"
    }, [_c('div', {
      staticClass: "control"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.user.middle_name,
        expression: "user.middle_name"
      }],
      staticClass: "input",
      attrs: {
        "type": "text",
        "placeholder": "Middle name",
        "autocomplete": "off",
        "disabled": !_vm.mayUpdateName
      },
      domProps: {
        "value": _vm.user.middle_name
      },
      on: {
        "input": function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.$set(_vm.user, "middle_name", $event.target.value);
        }
      }
    })])]), _c('div', {
      staticClass: "column is-4"
    }, [_c('div', {
      staticClass: "control"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.user.last_name,
        expression: "user.last_name"
      }],
      staticClass: "input",
      attrs: {
        "type": "text",
        "placeholder": "Last name",
        "autocomplete": "off",
        "disabled": !_vm.mayUpdateName
      },
      domProps: {
        "value": _vm.user.last_name
      },
      on: {
        "input": function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.$set(_vm.user, "last_name", $event.target.value);
        }
      }
    })])])])]), _c('div', {
      staticClass: "field"
    }, [_c('div', {
      staticClass: "label"
    }, [_vm._v("Full Name")]), _c('div', {
      staticClass: "control"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.user.full_name,
        expression: "user.full_name"
      }],
      staticClass: "input",
      attrs: {
        "type": "text",
        "placeholder": "Fullname",
        "autocomplete": "off",
        "disabled": !_vm.mayUpdateName
      },
      domProps: {
        "value": _vm.user.full_name
      },
      on: {
        "input": function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.$set(_vm.user, "full_name", $event.target.value);
        }
      }
    })])]), _vm.showStatusFields ? _c('div', [_c('br'), _c('hr'), _c('br'), _vm._m(1), _vm.mayUpdateStatus && _vm.editingOwnDetails ? _c('div', {
      staticClass: "notification is-warning"
    }, [_vm._m(2)]) : _vm._e(), _c('div', {
      staticClass: "columns"
    }, [_c('div', {
      staticClass: "column is-1"
    }), _c('div', {
      staticClass: "column is-4"
    }, [_c('div', {
      staticClass: "field"
    }, [_c('div', {
      staticClass: "label"
    }, [_vm._v("User Status")]), _c('div', {
      staticClass: "control"
    }, [_c('div', {
      staticClass: "select"
    }, [_c('select', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.user.status,
        expression: "user.status"
      }],
      staticClass: "input",
      attrs: {
        "disabled": !_vm.mayUpdateStatus
      },
      on: {
        "change": function change($event) {
          var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
            return o.selected;
          }).map(function (o) {
            var val = "_value" in o ? o._value : o.value;
            return val;
          });

          _vm.$set(_vm.user, "status", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
        }
      }
    }, [_c('option', {
      attrs: {
        "value": "active"
      }
    }, [_vm._v("Active")]), _c('option', {
      attrs: {
        "value": "blacklisted"
      }
    }, [_vm._v("Blacklisted")]), _c('option', {
      attrs: {
        "value": "closed"
      }
    }, [_vm._v("Closed")]), _c('option', {
      attrs: {
        "value": "pending"
      }
    }, [_vm._v("Waiting for Verification")]), _c('option', {
      attrs: {
        "value": "suspended"
      }
    }, [_vm._v("Suspended")])])])])])]), _vm.user.authority === 'email' ? _c('div', {
      staticClass: "column is-4"
    }, [_c('div', {
      staticClass: "field"
    }, [_c('div', {
      staticClass: "label"
    }, [_vm._v("Email Address Status")]), _c('div', {
      staticClass: "control"
    }, [_c('div', {
      staticClass: "select"
    }, [_c('select', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.user.email_status,
        expression: "user.email_status"
      }],
      staticClass: "input",
      attrs: {
        "disabled": !_vm.mayUpdateStatus
      },
      on: {
        "change": function change($event) {
          var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
            return o.selected;
          }).map(function (o) {
            var val = "_value" in o ? o._value : o.value;
            return val;
          });

          _vm.$set(_vm.user, "email_status", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
        }
      }
    }, [_c('option', {
      attrs: {
        "value": "blacklisted"
      }
    }, [_vm._v("Blacklisted")]), _c('option', {
      attrs: {
        "value": "disabled"
      }
    }, [_vm._v("Disabled")]), _c('option', {
      attrs: {
        "value": "unverified"
      }
    }, [_vm._v("Unverified")]), _c('option', {
      attrs: {
        "value": "verified"
      }
    }, [_vm._v("Verified")])])])])])]) : _vm._e(), _c('div', {
      staticClass: "column is-4"
    }, [_c('div', {
      staticClass: "field"
    }, [_c('div', {
      staticClass: "label"
    }, [_vm._v("Is Administrator")]), _c('div', {
      staticClass: "control"
    }, [_c('div', {
      staticClass: "select"
    }, [_c('select', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.user.is_admin,
        expression: "user.is_admin"
      }],
      staticClass: "input",
      attrs: {
        "disabled": !_vm.mayUpdateStatus
      },
      on: {
        "change": function change($event) {
          var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
            return o.selected;
          }).map(function (o) {
            var val = "_value" in o ? o._value : o.value;
            return val;
          });

          _vm.$set(_vm.user, "is_admin", $event.target.multiple ? $$selectedVal : $$selectedVal[0]);
        }
      }
    }, [_c('option', {
      domProps: {
        "value": false
      }
    }, [_vm._v("No")]), _c('option', {
      domProps: {
        "value": true
      }
    }, [_vm._v("Yes")])])])])])])])]) : _vm._e(), _vm.showSocialMediaFields ? _c('div', [_c('br'), _c('br'), _c('hr'), _vm._m(3), _c('figure', {
      staticClass: "image is-64x64 is-pulled-right"
    }, [_c('img', {
      attrs: {
        "src": _vm.user.avatar
      }
    })]), _c('div', {
      staticClass: "field"
    }, [_c('div', {
      staticClass: "label"
    }, [_vm._v("Media Page")]), _c('div', {
      staticClass: "control"
    }, [_c('a', {
      attrs: {
        "href": _vm.user.media_page,
        "target": "_blank"
      }
    }, [_vm._v(_vm._s(_vm.user.media_page))])])]), _c('div', {
      staticClass: "field"
    }, [_c('div', {
      staticClass: "label"
    }, [_vm._v("Languages")]), _c('div', {
      staticClass: "control"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.user.languages,
        expression: "user.languages"
      }],
      staticClass: "input",
      attrs: {
        "type": "text",
        "autocomplete": "off",
        "disabled": "disabled"
      },
      domProps: {
        "value": _vm.user.languages
      },
      on: {
        "input": function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.$set(_vm.user, "languages", $event.target.value);
        }
      }
    })])]), _c('div', {
      staticClass: "field"
    }, [_c('div', {
      staticClass: "label"
    }, [_vm._v("Locale")]), _c('div', {
      staticClass: "control"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.user.locale,
        expression: "user.locale"
      }],
      staticClass: "input",
      attrs: {
        "type": "text",
        "autocomplete": "off",
        "disabled": "disabled"
      },
      domProps: {
        "value": _vm.user.locale
      },
      on: {
        "input": function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.$set(_vm.user, "locale", $event.target.value);
        }
      }
    })])]), _c('div', {
      staticClass: "field"
    }, [_c('div', {
      staticClass: "label"
    }, [_vm._v("Location")]), _c('div', {
      staticClass: "control"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.user.location,
        expression: "user.location"
      }],
      staticClass: "input",
      attrs: {
        "type": "text",
        "autocomplete": "off",
        "disabled": "disabled"
      },
      domProps: {
        "value": _vm.user.location
      },
      on: {
        "input": function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.$set(_vm.user, "location", $event.target.value);
        }
      }
    })])]), _c('div', {
      staticClass: "field"
    }, [_c('div', {
      staticClass: "label"
    }, [_vm._v("Timezone")]), _c('div', {
      staticClass: "control"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.user.timezone,
        expression: "user.timezone"
      }],
      staticClass: "input",
      attrs: {
        "type": "text",
        "autocomplete": "off",
        "disabled": "disabled"
      },
      domProps: {
        "value": _vm.user.timezone
      },
      on: {
        "input": function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.$set(_vm.user, "timezone", $event.target.value);
        }
      }
    })])])]) : _vm._e(), _vm.showPermissionFields ? _c('div', [_c('br'), _c('br'), _c('hr'), _vm._m(4), _c('div', {
      staticClass: "field"
    }, [_c('div', {
      staticClass: "label"
    }, [_vm._v("Rights")]), _c('div', {
      staticClass: "control"
    }, [_vm._v("    " + _vm._s(_vm.user.rights))])]), _c('div', {
      staticClass: "field"
    }, [_c('div', {
      staticClass: "label"
    }, [_vm._v("Privileges")]), _c('div', {
      staticClass: "control"
    }, [_vm._v("    " + _vm._s(_vm.user.privileges))])])]) : _vm._e()]), _c('br'), _c('br'), _c('br'), _c('br'), _c('div', {
      staticClass: "has-text-right is-size-7"
    }, [_vm._v("[ID=" + _vm._s(_vm.user.id) + "]")])])])])]);
  },
  staticRenderFns: [function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "notification is-danger"
    }, [_c('p', [_vm._v("Error: We were unable to select the user details.")]), _c('p', [_vm._v("This may mean that you do not have permission, or it could be a network or server error.")])]);
  }, function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "has-text-centered"
    }, [_c('h2', {
      staticClass: "title is-3"
    }, [_vm._v("Account Status")])]);
  }, function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('p', [_vm._v("WARNING!"), _c('br'), _vm._v("Updating these fields may remove your ability to log in or act as administrator.")]);
  }, function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "has-text-centered"
    }, [_c('h2', {
      staticClass: "title is-3"
    }, [_vm._v("Social Media Login")])]);
  }, function () {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "has-text-centered"
    }, [_c('h2', {
      staticClass: "title is-3"
    }, [_vm._v("Permissions")])]);
  }],
  _scopeId: 'data-v-698136da',
  name: 'authservice-profile',
  components: {
    AuthserviceChangePassword: AuthserviceChangePassword
  },
  props: {
    // Key of user
    tenant: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    // Display options
    demo: {
      type: Boolean | String,
      default: false
    },
    showStatus: {
      type: Boolean | String,
      default: false
    },
    showPermissions: {
      type: Boolean | String,
      default: false
    },
    changePassword: {
      type: Boolean | String,
      default: false
    }
  },
  data: function data() {
    return {
      user: {},
      selectError: false // Error calling the API to get user details

    };
  },
  computed: {
    loginDescription: function loginDescription() {
      if (this.user && this.user.authority) {
        if (this.user.authority === 'email') {
          // Regular login
          if (this.user.Username) {
            return "Username / Password";
          } else {
            return "Email / Password";
          }
        } else {
          // Social media login
          var part1 = this.user.authority.substring(0, 1).toUpperCase();
          var part2 = this.user.authority.substring(1);
          return "Login using ".concat(part1).concat(part2);
        }
      }

      return null;
    },
    // Are we using 'username' to login?
    useUsername: function useUsername() {
      return false;
    },
    // Can we change the name fields
    mayUpdateName: function mayUpdateName() {
      return (this.editingOwnDetails || this.haveAdminPrivileges) && this.user && this.user.authority === 'email';
    },
    mayUpdateUser: function mayUpdateUser() {
      return this.editingOwnDetails || this.haveAdminPrivileges;
    },
    mayUpdateStatus: function mayUpdateStatus() {
      return this.haveAdminPrivileges;
    },
    // Are we in demo mode?
    isDemo: function isDemo() {
      return typeof this.demo == 'boolean' && this.demo || typeof this.demo == 'string' && this.demo !== '';
    },
    // Show the status fields?
    showStatusFields: function showStatusFields() {
      console.log('this.showStatus', this.showStatus);
      console.log('this.showStatus', _typeof(this.showStatus));
      return typeof this.showStatus == 'boolean' && this.showStatus || typeof this.showStatus == 'string' && this.showStatus !== 'false';
    },
    showSocialMediaFields: function showSocialMediaFields() {
      return this.user && this.user.authority !== 'email';
    },
    // Show Permission fields
    showPermissionFields: function showPermissionFields() {
      console.log('this.showPermissions', this.showPermissions);
      console.log('this.showPermissions', _typeof(this.showPermissions));
      return typeof this.showPermissions == 'boolean' && this.showPermissions || typeof this.showPermissions == 'string' && this.showPermissions !== 'false';
    },
    // See if the current user is editing their own record
    editingOwnDetails: function editingOwnDetails() {
      if (this.$authservice.user.tenant === this.user.tenant && this.$authservice.user.id === this.user.id) {
        console.log("- User updating themself");
        return true;
      }

      return false;
    },
    // Return true if this user has some sort of admin privileges
    // for the user record being edited.
    // Note: these rules only effect the UI - the real check is on
    // the server in ApplicationAccess.go
    haveAdminPrivileges: function haveAdminPrivileges() {
      console.log("haveAdminPrivileges()");
      console.log("$authservice.user=", this.$authservice.user);
      console.log("this.user=", this.user);
      console.log("$route.params.username=", this.$route.params.username);
      console.log("$route.params.appname=", this.$route.params.appname); //return false
      // See if this is some sort of admin user

      if (this.$authservice.user.tenant === 'genesis/a3') {
        //  1. An genesis/a3 admin user may access anything.
        if (this.$authservice.user.isAdmin) {
          console.log("- A3 admin");
          return true;
        } //  2. A user has full access to users in their own applications.


        if (this.$route.params.username === this.$authservice.user.username) {
          console.log("- Owner of the application");
          return true;
        }
      } //  3. An admin user has full access to users in the application
      //    they are logged into.


      if (this.$authservice.user.isAdmin && this.$authservice.user.tenant === "".concat(this.$route.params.username, "/").concat(this.$route.params.appname)) {
        console.log("- Current application's admin");
        return true;
      } //  4. A user who is a member of an organisation has access to all
      //    the organisations application, and admin permissions according
      //    to their member record.
      //  5. A user granted access to an application has access according
      //     to the grant definition.


      return false;
    },
    // Can we change the user's password?
    mayChangePassword: function mayChangePassword() {
      console.log('this.changePassword', this.changePassword);
      console.log('this.changePassword', _typeof(this.changePassword)); // Do we even want to change password?

      if (typeof this.changePassword == 'boolean' && !this.changePassword || typeof this.changePassword == 'string' && this.changePassword === 'false') {
        return false;
      } // Are we allowed to change the password?


      if (this.user && this.user.authority === 'email') {
        return this.editingOwnDetails || this.haveAdminPrivileges;
      }

      return false;
    },
    emailToken: function emailToken() {
      if (this.editingOwnDetails) {
        // If we came into the page with a AUTHSERVICE_EMAIL_TOKEN parameter in
        // the URL, then jump straight into the change password screen.
        var token = this.$route.query['AUTHSERVICE_EMAIL_TOKEN'];
        return token;
      }

      return null;
    }
  },
  methods: {
    // Load details of the specified user from the server.
    loadUserDetails: function loadUserDetails() {
      var _this = this;

      var url = "".concat(this.$authservice.endpoint(), "/").concat(this.tenant, "/user/").concat(this.userId); // console.log(`url is ${url}`)

      var params = {
        method: 'get',
        url: url,
        headers: {
          'Authorization': 'Bearer ' + this.$authservice.jwt,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };
      axios(params).then(function (response) {
        // JSON responses are automatically parsed.
        console.log("RESPONSE IS", response.data);
        _this.user = response.data[0];
      }).catch(function (e) {
        axiosError(_this, url, params, e);
        _this.selectError = true;
      });
    },
    onSubmit: function onSubmit(evt) {
      var _this2 = this;

      if (this.isDemo) {
        this.modalIsActive = false;
        this.$toast.open({
          message: "Password not updated (demo mode)",
          type: 'is-info',
          duration: 4000
        });
        return;
      } // Save our copy of the application, and reclone it again.


      evt.preventDefault();
      var data = {
        tenant: this.tenant,
        id: this.userId
      };

      if (this.mayUpdateName) {
        data.first_name = this.user.first_name;
        data.middle_name = this.user.middle_name;
        data.last_name = this.user.last_name;
        data.full_name = this.user.full_name;
      }

      if (this.mayUpdateStatus) {
        data.status = this.user.status;
        data.email_status = this.user.email_status;
        data.is_admin = this.user.is_admin;
      } // Save the user record


      console.log('Saving:', this.user); // console.log(`email status is ${this.user.email_status}`)

      var url = "".concat(this.$authservice.endpoint(), "/user");
      var params = {
        method: 'post',
        url: url,
        headers: {
          'Authorization': 'Bearer ' + this.$authservice.jwt,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        data: data
      };
      axios(params).then(function (response) {
        // JSON responses are automatically parsed.
        console.log('ok. response=', response);

        if (response.data && response.data.status === 'ok') {
          // All okay
          _this2.$toast.open({
            message: "Changes saved",
            type: 'is-success',
            duration: 4000
          });

          _this2.loadUserDetails();
        } else {
          // Not the expected result
          console.log('Unexpected result while updating user record. response=', response);

          _this2.$toast.open({
            message: "Error: User details might not have been updated",
            type: 'is-danger'
          });
        }
      }).catch(function (e) {
        console.log('error. e=', e);
        axiosError(_this2, url, params, e);
      });
    }
  },
  created: function created() {
    this.loadUserDetails();
  }
};

var AuthserviceChangePassword$1 = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "authservice-change-password"
    }, [_c('button', {
      staticClass: "button is-small",
      class: {
        'is-disabled': !_vm.mayChangePassword
      },
      on: {
        "click": _vm.togglePasswordModal
      }
    }, [_vm._v("Change password ")]), _c('div', {
      staticClass: "modal has-text-left",
      class: {
        'is-active': _vm.showPasswordModal
      }
    }, [_c('div', {
      staticClass: "modal-background"
    }), _c('div', {
      staticClass: "modal-card"
    }, [_c('header', {
      staticClass: "modal-card-head"
    }, [_c('p', {
      staticClass: "modal-card-title"
    }, [_vm._v("Change password for user  "), _c('b', [_vm._v(_vm._s(_vm.userLabel))])]), _c('button', {
      staticClass: "delete",
      attrs: {
        "aria-label": "close"
      },
      on: {
        "click": _vm.togglePasswordModal
      }
    })]), _c('section', {
      staticClass: "modal-card-body"
    }, [_vm.warningMsg ? _c('div', {
      staticClass: "notification is-danger"
    }, [_vm._v(_vm._s(_vm.warningMsg))]) : _vm._e(), _c('form', [_vm.requireOldPassword ? _c('div', {
      staticClass: "field"
    }, [_c('div', {
      staticClass: "label"
    }, [_vm._v("Existing password")]), _c('div', {
      staticClass: "control"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.oldPassword,
        expression: "oldPassword"
      }],
      staticClass: "input",
      attrs: {
        "type": "password",
        "placeholder": "Existing password",
        "autocomplete": "off"
      },
      domProps: {
        "value": _vm.oldPassword
      },
      on: {
        "input": function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.oldPassword = $event.target.value;
        }
      }
    })])]) : _vm._e(), _c('div', {
      staticClass: "field"
    }, [_c('div', {
      staticClass: "label"
    }, [_vm._v("New password")]), _c('div', {
      staticClass: "control"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.newPassword,
        expression: "newPassword"
      }],
      staticClass: "input",
      attrs: {
        "type": "password",
        "placeholder": "Please enter a password",
        "autocomplete": "off"
      },
      domProps: {
        "value": _vm.newPassword
      },
      on: {
        "input": function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.newPassword = $event.target.value;
        }
      }
    })])]), _c('div', {
      staticClass: "field"
    }, [_c('div', {
      staticClass: "label"
    }, [_vm._v("Confirm")]), _c('div', {
      staticClass: "control"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.newPasswordConfirm,
        expression: "newPasswordConfirm"
      }],
      staticClass: "input",
      attrs: {
        "type": "password",
        "placeholder": "Enter the same password again",
        "autocomplete": "off"
      },
      domProps: {
        "value": _vm.newPasswordConfirm
      },
      on: {
        "input": function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.newPasswordConfirm = $event.target.value;
        }
      }
    })])]), _c('div', {
      staticClass: "field"
    }, [_c('div', {
      staticClass: "label passwordError"
    }, [_vm._v(_vm._s(_vm.newPasswordError))])])])]), _c('footer', {
      staticClass: "modal-card-foot"
    }, [_c('button', {
      staticClass: "button is-success",
      attrs: {
        "disabled": _vm.newPasswordError !== null
      },
      on: {
        "click": _vm.updatePassword
      }
    }, [_vm._v("Update password")]), _c('button', {
      staticClass: "button",
      on: {
        "click": _vm.togglePasswordModal
      }
    }, [_vm._v("Cancel")])])])])]);
  },
  staticRenderFns: [],
  _scopeId: 'data-v-30822850',
  name: 'authservice-change-password',
  props: {
    // The user to have the password updated
    user: Object,
    // An email token received from a 'forgotten password' email.
    // If this is provided, we will immediately display the modal.
    emailToken: {
      type: String,
      required: false
    },
    // In demo mode we can't actually do the update
    demo: {
      type: String | Boolean,
      default: null
    }
  },
  data: function data() {
    return {
      // Is this modal displayed at the moment?
      modalIsActive: false,
      // Automatically open the modal if we have an email token,
      // but reset this once the user closes the modal.
      autoOpen: true,
      // Field values
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: ''
    };
  },
  computed: {
    // Are we in demo mode?
    isDemo: function isDemo() {
      return typeof this.demo == 'boolean' && this.demo || typeof this.demo == 'string' && this.demo !== '';
    },
    // Should the modal be displayed?
    showPasswordModal: function showPasswordModal() {
      return this.modalIsActive || this.autoOpen && this.emailToken != null;
    },
    // Display a message before changing for superuser passwords.
    warningMsg: function warningMsg() {
      if (this.user && this.user.tenant === 'genesis/a3') {
        if (this.user.username === 'genesis' || this.user.isAdmin) {
          return "\n            WARNING!!!\n            Password retrieval is disabled for A3 administrators.\n            If you lose the password, you will not be able to reset it\n            via email.\n          ";
        }
      }

      return null;
    },
    // Name of user shown in the heading
    userLabel: function userLabel() {
      if (this.user) {
        if (this.user.username) {
          return this.user.username;
        } else {
          return this.user.id;
        }
      }

      return '?';
    },
    // Validate the password fields
    newPasswordError: function newPasswordError() {
      if (this.requireOldPassword && !this.oldPassword) {
        return 'Please enter your existing password';
      }

      if (!this.newPassword) {
        return 'Please enter your new password';
      }

      if (!this.newPassword || this.newPassword.length < 8) {
        return 'Passwords must be eight or more character';
      } // Other rules might be placed here
      //zzz


      if (!this.newPasswordConfirm) {
        return 'Need confirmation password';
      }

      if (this.newPassword !== this.newPasswordConfirm) {
        //console.log(`${this.newPassword} vs ${this.newPasswordConfirm}`)
        return 'Passwords do not match';
      }

      return null;
    },
    // Is the currently logged in user allowed to change the password?
    mayChangePassword: function mayChangePassword() {
      console.log("* mayChangePassword");
      return (this.isCurrentUser || this.haveOverridePermission) && !this.newPasswordError;
    },
    // Is the user the currently logged in user?
    // (A user is allowed to change their own password)
    isCurrentUser: function isCurrentUser() {
      console.log("*** isCurrentUser()");

      if (this.$authservice && this.$authservice.user && this.user) {
        //console.log(`${this.$authservice.user.tenant}/${this.$authservice.user.id} VERSUS ${this.user.tenant}/${this.user.id}`)
        if (this.$authservice.user.tenant === this.user.tenant && this.$authservice.user.id === this.user.id) {
          console.log("- Is current user");
          return true;
        } else {
          console.log("- Not current user");
        }
      }

      return false;
    },
    // Return true if the currently logged in user can override the password.
    // These rules only effect the UI. The real check is on
    // the server in ApplicationAccess.go
    haveOverridePermission: function haveOverridePermission() {
      console.log("*** haveOverridePermission()");
      console.log("".concat(this.$authservice.user.tenant, ":").concat(this.$authservice.user.username).concat(this.$authservice.user.isAdmin ? '(admin)' : ''));

      if (this.$authservice && this.$authservice.user && this.user) {
        // Is the current user an A3 user?
        if (this.$authservice.user.tenant === 'genesis/a3') {
          //  1. Admins for genesis/a3 can update anything.
          if (this.$authservice.user.isAdmin) {
            console.log("- A3 admin");
            return true;
          } //  2. A user has full access to users in their own applications.


          if (this.$authservice.user.username) {
            var tenantPrefix = "".concat(this.user.username, "/");

            if (this.user.tenant.startsWith(tenantPrefix)) {
              console.log("- Owner of the application");
              return true;
            }
          }
        } //  3. The currently logged in user is admin for the same tenant as
        //  the user being updated.


        if (this.$authservice.user.tenant === this.user.tenant && this.$authservice.user.isAdmin) {
          console.log("- Current application's admin");
          return true;
        } //  4. A user who is a member of an organisation has access to all
        //    the organisation's applications, and admin permissions according
        //    to their member record.
        //  5. A user granted access to an application has access according
        //     to the grant definition.

      }

      return false;
    },
    // Return true if we need to ask the current password.
    //
    //  We won't need the old password if we have any of the following are true:
    //
    //    1.  An 'email_token' that was received from a forgot-password email.
    //    2.  Have 'Change password without entering old password' set in the
    //        configuration for this tenant/application.
    //    3.  We have override permission (i.e. an administrator)
    //
    requireOldPassword: function requireOldPassword() {
      // 1. emailToken
      if (this.emailToken) {
        return false;
      } // 2. Cannot check the 'Change password without entering old password' option at this time
      //ZZZ
      // 3. Administrator


      if (this.haveOverridePermission) {
        return false;
      } // Seems we need the old password


      return true;
    }
  },
  methods: {
    // Show or hide this modal
    togglePasswordModal: function togglePasswordModal(evt) {
      console.log('togglePasswordModal()');

      if (this.showPasswordModal) {
        this.modalIsActive = false;
        this.autoOpen = false;
      } else {
        this.modalIsActive = true;
      }
    },
    // Do the actual update on the server
    updatePassword: function updatePassword() {
      var _this = this;

      if (this.isDemo) {
        this.modalIsActive = false;
        this.$toast.open({
          message: "Password not updated (demo mode)",
          type: 'is-info',
          duration: 4000
        });
        return;
      } // Update the password


      var url = "".concat(this.$authservice.endpoint(), "/user");
      var params = {
        method: 'post',
        url: url,
        headers: {
          'Authorization': 'Bearer ' + this.$authservice.jwt,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        data: {
          tenant: this.user.tenant,
          id: this.user.id,
          password: this.newPassword
        }
      };

      if (this.emailToken) {
        params.data.email_token = this.emailToken;
      }

      if (this.requireOldPassword) {
        params.data.old_password = this.oldPassword;
      }

      console.log("params = ", params);
      axios(params).then(function (response) {
        // JSON responses are automatically parsed.
        console.log('ok. response=', response);

        if (response.data && response.data.status === 'ok') {
          // All okay
          _this.$toast.open({
            message: "Password updated",
            type: 'is-success',
            duration: 4000
          });

          _this.oldPassword = '';
          _this.newPassword = '';
          _this.newPasswordConfirm = '';
          _this.modalIsActive = false;
          _this.autoOpen = false;
        } else {
          // Not the expected result
          console.log('Unexpected result while updating password. response=', response);

          _this.$toast.open({
            message: "Error: Password might not have been updated",
            type: 'is-danger',
            duration: 4000
          });
        }
      }).catch(function (e) {
        console.log("response is", e.response);

        if (e.response.status === 404 && e.response.data && e.response.data.Error) {
          // Display the error message the server provided
          _this.$toast.open({
            message: "The password could not be updated: \"".concat(e.response.data.Error, "\""),
            type: 'is-danger',
            duration: 4000
          });
        } else {
          axiosError(_this, url, params, e);
        }
      });
    }
  },
  created: function created() {
    if (this.isDemo) {
      console.error('DEMO MODE: authservice-change-password');
      return;
    }
  }
};

//import Vue from 'vue'
var _authservice = null;

function install$1(Vue, options) {
  console.log('my-component.install()', options);

  if (_authservice) {
    console.error("Vue.use(Authservice) has already been called.");
    return;
  } // Create ourselves an Authservice Object


  console.log('Getting our _authservice');
  _authservice = new Authservice(options);
  console.log('Have our _authservice', _authservice);

  _authservice.checkInitialLoginStatus(false);

  console.log('Finished checking status');
  exports._Vue = Vue;
  // list of functions to be called when new Vue is created. We'll
  // use it to look for new Vue({ authservice }). If found, we'll
  // consider this to be the root. If it is not found, then we will
  // assume this is a child of the root, and create pointers back
  // to the root.
  //Vue.mixin({


  Vue.mixin({
    beforeCreate: function beforeCreate() {
      // console.log('vue-authservice: index.js - beforeCreate()')
      if (!this.$parent) {
        //if (isDef(this.$options.authservice)) {
        // console.error('Initializing ROOT *********')
        // This must be the root, since we found authservice in it's options.
        this._authserviceRoot = this;
        this._authservice = _authservice; // this._authservice.init(this)

        Vue.util.defineReactive(this, '_authservice', this.$authservice); // Vue.util.defineReactive(this, '_authservice', this._authservice.jwt)
        // Vue.util.defineReactive(this, '_authservice', this._authservice.fromCache)
      } else {
        //console.log('Initialise new child')
        this._authserviceRoot = this.$parent && this.$parent._authserviceRoot || this;
      }
      /*
      // this.$options is the options passed to new Vue({ })
      if (isDef(this.$options.authservice)) {
        console.log('Initialise the root')
        // This must be the root, since we found authservice in it's options.
        this._authserviceRoot = this
        this._authservice = this.$options.authservice
        // this._authservice.init(this)
        Vue.util.defineReactive(this, '_authservice', this.$authservice)
        // Vue.util.defineReactive(this, '_authservice', this._authservice.jwt)
        // Vue.util.defineReactive(this, '_authservice', this._authservice.fromCache)
         console.log('Checking login status from beforeCreate()')
        this._authservice.checkInitialLoginStatus(false)
      } else {
        console.log('Initialise new child')
        this._authserviceRoot = (this.$parent && this.$parent._authserviceRoot) || this
      }
      // registerInstance(this, this)
      */

    },
    destroyed: function destroyed() {// registerInstance(this)
    }
  }); // As described above, the Vue instances form a hierachy. The mixin
  // above ensures that each instance has an '_authserviceRoot' field
  // that points to the instance where 'authservice' was passed to new Vue({  }).
  // Note that it's _authserviceRoot might actually point to itself.

  Object.defineProperty(Vue.prototype, '$authservice', {
    get: function get() {
      return this._authserviceRoot._authservice;
    }
  }); // Define the components

  Vue.component('authservice-login', AuthserviceLogin);
  Vue.component('authservice-bounce-component', AuthserviceBounceComponent);
  Vue.component('authservice-change-password', AuthserviceChangePassword$1);
  Vue.component('authservice-user-list', AuthserviceUserList);
  Vue.component('authservice-user-details', AuthserviceUserDetails); // Vue.component('authservice-navbar', AuthserviceNavbar)
  // Vue.component('authservice-navbar-blu', AuthserviceNavbarBlu)
  // Vue.component('authservice-bulma', AuthserviceBulma)
  // Vue.component('my-component', MyComponent)
  // Vue.component('authservice-firstname', AuthserviceFirstname)
  // Vue.component('authservice-fullname', AuthserviceFullName)

  return _authservice;
}

var obj = {
  install: install$1
};
Object.defineProperty(obj, '_authservice', {
  get: function get() {
    return _authservice;
  }
});

exports.default = obj;
