# vue-authservice
VueJS components for authservice.io






# Installation


    yarn add vue-authservice debounce
    

### Adding to your project

When used with a module system, you must explicitly install Vuex via Vue.use():

    import Vue from 'vue'
    import Authservice from 'vue-authservice'
    
    Vue.use(Authservice, options)


### Nuxt

Authservice is added to a Nuxt project by creating a plugin.

~/plugins/vue-authservice:

    import Vue from 'vue'
    import Authservice from 'vue-authservice'

    // Load the configuration. This directory should be included in .gitignore.
    import Config from '../protected-config/websiteConfig'

    // Make authservice available as $authservice
    let resumeURL = 'http://localhost:8080/'

    const options = {
      protocol: Config.authservice.protocol,
      host: Config.authservice.host,
      port: Config.authservice.port,
      version: Config.authservice.version,
      apikey: Config.authservice.apikey,

      hints: {
        sitename: 'MySite',
        login: { },
        register: { resumeURL: resumeURL, },
        forgot: { resumeURL: resumeURL }
      }
    }
    Vue.use(Authservice, options)

nuxt.config.js:

    module.exports = {
      ...
      plugins: [
        ...
        { src: '~plugins/vue-authservice.js', ssr: false },
      ],
    }
    
    
## Options

vue-authservice requires that an `options` object is passed to Vue.use().

### Mandatory Options
These options relate to how your client application connects to the remote Authservice.io server.

Some of these values may change during the different stages of your development, so the endpoint
details are best saved in a configuration file, that can be overwritten during deployment. The
convention we use is to place such a file in a directory named `protected-config/authservice-config.js`.

protected-config/websiteConfig.js:

    /*
     *  This file gets overwritten during production deployments.
     */
    module.exports = {
      authservice: {
        host: 'authservice.io',
        version: 'v2',
        apikey: 'API10O0X1NS8FWUTO3FXKN15ZOR09'
      }
    }

We then reference this file when setting our endpoints. Note that not all the values need to be defined.


    // Load the configuration. This directory should be included in .gitignore.
    import Config from '../protected-config/websiteConfig'

    const options = {
      protocol: Config.authservice.protocol,
      host: Config.authservice.host,
      port: Config.authservice.port,
      version: Config.authservice.version,
      apikey: Config.authservice.apikey,
    
      ...
    }

Most of these endpoint values are provided when you get the APIKEY from the ToolTwist website.


Option | Description | Default
------ | ----------- | -------
protocol | http or https | https
host     |               | api.authservice.io 
port     |               | 80
version  |               | v2
apikey   |               | Mandatory



## Hints

  hints: {
    usernames: true,
    sitename: 'ToolTwist',
    login: {
      // email: false,
      // facebook: true,
      // google: true,
      // github: true,
      // linkedin: true,
      // twitter: true,
      //registerMessage: 'Don\'t have an account yet?'
    },
    registerz: true,
    register: {
      password: true,
      // firstname: true,
      // middlename: true,
      // lastname: true,
      resumeURL: resumeURL,
      //termsMessage: 'Agree to our terms?',
      //termsRoute: '/terms-and-conditions'
    },
    forgotz: true,
    forgot: {
      // username: true,
      // email: true,
      resumeURL: resumeURL
    }
  },
