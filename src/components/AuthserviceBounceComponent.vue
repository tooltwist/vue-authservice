<template lang="pug">

  p
    br
    | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    a(:href="url")
      | {{url}}

</template>

<script>
  import QueryString from 'query-string'

  const JWT_COOKIE_NAME = 'authservice-jwt'
  const LOGIN_TIMEOUT_DAYS = 3

  export default {
    name: 'authservice-bounce-component',
    props: ['debug'],
    data () {
      return {
        url: ''
      }
    },
    computed: {
      bounceURL () {
        return this.$route.params.url
      }
    },
    created: function () {
      if (this.$route && this.$route.params && typeof(window) != 'undefined') {
        bounce(this, false)
      }
    }
  }

  // When this is called from a page, two things happen.
  //  1. If there is a 'AUTHSERVICE_JWT' parameter to the page it gets stored as a cookie.
  //  2. If there is a 'next' parameter, we jump to that URL.
  function bounce (me, debug) {
    // See what parameters we've been passed
    console.log('bounce()', window.location)
    const parsed = QueryString.parse(window.location.search)
    console.log(parsed)
    // - const parsedHash = QueryString.parse(location.hash)
    // - console.log(parsedHash)
    const jwt = parsed['AUTHSERVICE_JWT']
    const next64 = parsed['next']
    //const debug |= parsed['debug']
    if (parsed['debug']) {
      debug = true
    }

    // - var jwt = getURLParameterByName("AUTHSERVICE_JWT")
    if (jwt && !Date) {
      console.log(`*** setting JWT cookie ${JWT_COOKIE_NAME}`)
      setCookie(JWT_COOKIE_NAME, jwt, LOGIN_TIMEOUT_DAYS)
    }

    const next = new Buffer(next64, 'base64').toString('ascii')
    console.log(`next=${next}`)
    if (debug) {
      // Debugging, so don't actually redirect.
      setTimeout(function () {
        window.location = next
      }, 5000)
    } else {
      window.location = next
    }
  }

  function setCookie (cname, cvalue, exdays) {
    // console.log('setCookie(' + cname + ', ' + cvalue + ')')
    console.log('setCookie(' + cname + ')')
    var d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    var expires = 'expires=' + d.toUTCString()
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
  }// setCookie()

</script>
