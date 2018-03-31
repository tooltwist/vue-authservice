'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var jwtDecode = _interopDefault(require('jwt-decode'));
var axios = _interopDefault(require('axios'));
var QueryString = _interopDefault(require('query-string'));
var debounce = _interopDefault(require('debounce'));
require('vue-awesome/icons/refresh');
var Icon = _interopDefault(require('vue-awesome/components/Icon.vue'));

var Component = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', [_c('h1', [_vm.location ? _c('div', {
      staticClass: "a"
    }, [_vm._v(_vm._s(_vm.stuff) + " on your " + _vm._s(_vm.location))]) : _c('div', {
      staticClass: "a"
    }, [_vm._v(_vm._s(_vm.stuff))])]), _vm._v("Here is some more stuff")]);
  },
  staticRenderFns: [],
  _scopeId: 'data-v-795a1849',
  name: 'dribble',
  props: {
    location: String
  },
  data: function data() {
    return {
      stuff: 'Dribble a little bit more'
    };
  }
};

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
        this.registrationSupported = true;
        this.registerResume = options.hints.register.resumeURL;
        console.log("Authservice(): Registration IS supported");
      }
    } // See if forgotten password is allowed


    if (!this.emailSupported) {
      // Email is not used (options.login.email is false)
      this.forgottenPasswordSupported = false;
    } else if (options.hints && typeof options.hints.forgot !== 'undefined' && !options.hints.forgot) {
      // Forgot password is specifically disallowed (options.hints.register is false)
      this.forgottenPasswordSupported = false;
    } else {
      // We WILL allow forgot password. Check we have what we need.
      if (_typeof(options.hints.forgot) !== 'object') {
        this.forgottenPasswordSupported = false;
        console.error('options.hints.forgot must be false, or an object');
      } else if (!options.hints.forgot || !options.hints.forgot.resumeURL) {
        this.forgottenPasswordSupported = false;
        console.error('options.hints.forgot.resumeURL must be provided');
      } else if (typeof options.hints.forgot.resumeURL !== 'string') {
        this.forgottenPasswordSupported = false;
        console.error('options.hints.forgot.resumeURL must be a string');
      } else {
        // All good for forgotten password
        this.forgottenPasswordSupported = true;
        this.forgetResume = options.hints.forgot.resumeURL;
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
      console.log('+++++ checkInitialLoginStatus ++++++'); // See if we have a AUTHSERVICE_JWT in the URL to this page

      var jwt = this.getURLParameterByName("AUTHSERVICE_JWT");

      if (jwt) {
        if (debug) {
          console.log("***");
          console.log("***");
          console.log("*** AUTHSERVICE_JWT IN URL");
          console.log("***");
          console.log("***");
        }

        var _isFromCookie = false;

        if (this.setCurrentUserFromJWT(jwt, _isFromCookie)) {
          // Remember this JWT in a cookie for the next page.
          this.setCookie(JWT_COOKIE_NAME, jwt, LOGIN_TIMEOUT_DAYS);
          return true;
        } else {
          // Invalid JWT
          this.removeCookie(JWT_COOKIE_NAME);
          return false;
        }
      } // See if we have a cookie containing the current JWT


      jwt = this.getCookie(JWT_COOKIE_NAME);

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

          reject(e.response.data.message);
          return;
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
        console.log('resume to current page', l);
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


        var registerOpts = _this3.register ? _this3.register : {};

        switch (_typeof(registerOpts.resumeURL)) {
          case 'string':
            break;

          case 'undefined':
            return reject('options.register.resumeURL must be provided');

          default:
            return reject('options.register.resumeURL must be a string');
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
          // Error registering
          var error = e.response.data && e.response.data.Error ? e.response.data.Error : 'Error while registering';
          reject(error);
          return;
        });
      }); // new Promise
    } // register()

  }, {
    key: "forgot",
    value: function forgot(email, options) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        // Check email and password is valid
        if (email === null || email.indexOf('@') < 1) {
          var error = 'Please enter a valid email address';
          reject(error);
          return;
        } // Decide where we want to end up.
        // If a 'resume' URL has not been provided, we'll come back to this exact
        // same URL, however with any JWT or error parameters removed.


        var l = window.location;
        var baseURL = "".concat(l.protocol, "//").concat(l.hostname);

        if (l.port) {
          baseURL += ":".concat(l.port);
        }

        console.log('\n\nbaseURL=', baseURL); // Where to go when they click on the emai link?

        var resumeURL;

        if (options && options.forgotResume) {
          // Use the specified resume URL (which is a relative path)
          resumeURL = baseURL + options.forgotResume;
        } else {
          // Use the current page, but with any JWT or error parameter removed.
          console.log('resume to current page', l);
          var parsed = QueryString.parse(l.search);
          console.log(parsed);
          delete parsed['AUTHSERVICE_JWT'];
          delete parsed['AUTHSERVICE_ERROR'];

          var _params2 = QueryString.stringify(parsed);

          resumeURL = l.protocol + "//" + l.host + l.pathname;

          if (_params2) {
            resumeURL += '?' + _params2;
          }

          resumeURL += l.hash;
          console.log('\n\nresumeURL=', resumeURL);
          console.log(new Buffer(resumeURL).toString('base64'));
        } // Get the URL to a "bounce page". This is a page that sets the JWT
        // cookie from a URL parameter, and then redirects to the 'resume' page.


        var resume64 = new Buffer(resumeURL).toString('base64');
        var params = QueryString.stringify({
          next: resume64
        });
        var hash = "/authservice-bounce";
        var bounceURL = "".concat(l.protocol, "//").concat(l.host, "?").concat(params, "#").concat(hash);
        console.log('\n\nbounceURL=', bounceURL); // Call the server

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
            var _error = response.data && response.data.message ? response.data.message : 'Error while sending email';

            reject(_error);
            return;
          }
        }).catch(function (e) {
          // Error sending the email
          var error = e.response.data && e.response.data.message ? e.response.data.message : 'Error while sending email';
          reject(error);
          return;
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
          username: ident.username // type: ident.type,
          // console.log('Setting user to ', user)

        };
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
          // alert('Communications error: unable to determine if this username is available')
          var error = e.response.data.Error ? e.response.data.Error : 'Could not check availability';
          reject(error);
          return;
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
          _vm.githubLogin();
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
          _vm.githubLogin();
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
    }, [_vm._v("User Name or Email Address")]), _c('div', {
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
        "placeholder": "Enter your User Name or Email Address"
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
    }, [_vm._v("You are logged in as"), _c('strong', [_vm._v(_vm._s(_vm.$authservice.user.firstname) + " " + _vm._s(_vm.$authservice.user.lastname))]), _vm.$authservice.user.avatar ? _c('img', {
      attrs: {
        "src": _vm.$authservice.user.avatar,
        "alt": ""
      }
    }) : _vm._e(), _c('br'), _c('router-link', {
      attrs: {
        "to": "/applications"
      }
    }, [_vm._v("Settings")]), _c('br'), _vm._v("(v-on:click=\"doSignout()\") " + _vm._s(_vm.signin ? 'Sign out' : 'Logout'))], 1)]) : _vm._e(), _vm.mode === 'register' ? _c('div', {
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
    })])]) : _vm._e(), _c('br'), _c('a', {
      staticClass: "button is-primary is-pulled-right",
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
      staticClass: "b-dropdown-divider"
    }), _c('div', {
      staticClass: "b-dropdown-header"
    }, [_c('a', {
      staticClass: "button btn btn-default",
      attrs: {
        "type": "submit",
        "size": 'sm',
        "variant": 'primary'
      },
      on: {
        "click": function click($event) {
          _vm.setMode('login');
        }
      }
    }, [_vm._v("ok")])])]) : _vm._e(), _vm.mode === 'forgot' ? _c('div', [_c('br'), _c('br'), _c('div', {
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

    return _c('div', {
      staticClass: "b-dropdown-header"
    }, [_c('p', [_vm._v("Congratulations, you now have a user account. We have sent you an email to verify your email address.")]), _c('p', [_vm._v("Please take a moment to check your email and complete the registration process.")])]);
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
  _scopeId: 'data-v-47658ab7',
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
  created: function created() {// console.log('============= NEW COMPONENT ================')
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
      this.$authservice.login(this.email, password).then(function (userDetails) {
        _this.loginError = '';
        _this.mode = 'loggedIn';

        _this.$emit('userchange', _this.$authservice.user.id);
      }).catch(function (errmsg) {
        _this.loginError = errmsg;
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
    googleLogin: function googleLogin() {
      alert('google login, ' + this.username + ', ' + this.password);
      this.$authservice.initiateOAuth(this, 'google');
    },
    githubLogin: function githubLogin() {
      alert('github login, ' + this.username + ', ' + this.password);
      this.$authservice.initiateOAuth(this, 'github');
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
        options.pasword = this.registerPassword;
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

//import Vue from 'vue'

console.log("Before Authservice");
console.log("After Authservice", Authservice); // import AuthserviceNavbar from './components/AuthserviceNavbar'
var _authservice = null;

function install$1(Vue, options) {
  console.log('my-component.install()', options);
  Vue.component(Component.name, Component);
  Vue.component('authservice-navbar', Component);
  console.log('done dummies');

  if (_authservice) {
    console.error("Vue.use(Authservice) has already been called.");
    return;
  } // Create ourselves an Authservice Object


  console.log('Getting our _authservice');
  _authservice = new Authservice(options);
  console.log('Have our _authservice', _authservice);

  _authservice.checkInitialLoginStatus(false);

  console.log('Finished checking status'); // if (install.installed) return
  // install.installed = true

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
  // Vue.component('authservice-navbar', AuthserviceNavbar)

  Vue.component('authservice-login', AuthserviceLogin); // Vue.component('authservice-navbar-blu', AuthserviceNavbarBlu)
  // Vue.component('authservice-bulma', AuthserviceBulma)
  // Vue.component('my-component', MyComponent)
  // Vue.component('authservice-firstname', AuthserviceFirstname)
  // Vue.component('authservice-fullname', AuthserviceFullName)
}

var obj = {
  install: install$1
};

exports.default = obj;
