(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;require.register("fs", function(exports, require, module) {
  module.exports = {};
});
require.register("child_process", function(exports, require, module) {
  module.exports = {};
});
require.register("tls", function(exports, require, module) {
  module.exports = {};
});
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("init-appshell.jsx", function(exports, require, module) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

    init-appshell.jsx
    application shell loaded and rendered in init.jsx

    These are the top-level React components ("view") that are mapped to
    routes as seen in render() function's <Switch>. There are three styles:
    (1) a loaded React 'view' that is built entirely with our modular app API
      and displayed in this application shell.
    (2) a plain .html file loaded into an IFRAME, useful for adding stand-alone
      test code with access to the modular app API system, but not other web
      apps (e.g. can use the data storage module)
    (3) a NO ROUTE FOUND component function.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

/// REACT LIBRARIES ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var React = require('react');

var _require = require('reactstrap'),
    Alert = _require.Alert,
    Collapse = _require.Collapse;

var _require2 = require('reactstrap'),
    Navbar = _require2.Navbar,
    NavbarToggler = _require2.NavbarToggler;

var _require3 = require('reactstrap'),
    NavbarBrand = _require3.NavbarBrand,
    Nav = _require3.Nav,
    NavItem = _require3.NavItem,
    NavLink = _require3.NavLink;

var _require4 = require('reactstrap'),
    UncontrolledDropdown = _require4.UncontrolledDropdown,
    DropdownToggle = _require4.DropdownToggle;

var _require5 = require('reactstrap'),
    DropdownMenu = _require5.DropdownMenu,
    DropdownItem = _require5.DropdownItem;

var _require6 = require('react-router-dom'),
    Switch = _require6.Switch,
    withRouter = _require6.withRouter;
// workaround name collision in ReactRouterNavLink with ReactStrap


var RRNavLink = require('react-router-dom').NavLink;
//

var _require7 = require('react-router-config'),
    renderRoutes = _require7.renderRoutes;
//


var UNISYS = require('unisys/client');

/** (1) ROUTED COMPONENTS ****************************************************\
  Used by render()'s <Switch> to load a React component (what we call a
  'view' in the NetCreate app). The component should return its elements
  wrapped in a div with the suggested flexbox pr

  index.html           | body          min-height: 100%
  index.html           | div#app
  init-appshell        |   div         display:flex, flex-flow:column nowrap,
                                       width:100%, height:100vh
  init-appshell        |     Navbar    position:fixed
  --- COMPONENT BELOW ---
  <RequiredComponent>  |     div       this is a child of a flexbox
\*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
var SETTINGS = require('settings');
var AppDefault = require('view/AppDefault');
var NetCreate = require('view/netcreate/NetCreate');
var DevUnisys = require('view/dev-unisys/DevUnisys');
var DevDB = require('view/dev-db/DevDB');
var DevReact = require('view/dev-react/DevReact');
var DevSession = require('view/dev-session/DevSession');
//  const Prototype         = require('view/prototype/Prototype');
//  const D3Test            = require('view/d3test/D3Test');

var Routes = [{
  path: '/',
  exact: true,
  component: NetCreate
}, {
  path: '/edit',
  component: NetCreate
}, {
  path: '/dev-unisys',
  component: DevUnisys
}, {
  path: '/dev-db',
  component: DevDB
}, {
  path: '/dev-react',
  component: DevReact
}, {
  path: '/dev-session',
  component: DevSession
}, {
  path: '/simple',
  component: function component(props) {
    return HTML(props);
  }
}, {
  path: '/vocabulary',
  component: function component(props) {
    return HTML(props);
  }
}, {
  path: '*',
  restricted: false,
  component: NoMatch
}];

// Joshua added to disable Extras
var isLocalHost = SETTINGS.EJSProp('client').ip === '127.0.0.1';

/** (2) ROUTED FUNCTIONS *****************************************************\
  Used by render()'s <Switch> to load a plain html page that is
  located at app/htmldemos/<route>/<route.html>

  index.html           | body          min-height: 100%
  index.html           | div#app
  init-appshell        |   div         display:flex, flex-flow:column nowrap,
                                       width:100%, height:100vh
  init-appshell        |     Navbar    position:fixed
  --- COMPONENT BELOW ---
  init-appshell.HTML() |     div       display:flex, flex-flow:column nowrap,
                                       width:100%
  init-appshell.HTML() |       iframe  flex:1 0 auto, border:0
\*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
function HTML(props) {
  SETTINGS.ForceReloadOnNavigation();
  var loc = props.location.pathname.substring(1);
  loc = '/htmldemos/' + loc + '/' + loc + '.html';
  return React.createElement(
    'div',
    { style: { display: 'flex', flexFlow: 'column nowrap',
        width: '100%', height: '100%' } },
    React.createElement('iframe', { style: { flex: '1 0 auto', border: '0' }, src: loc })
  );
}

/** (3) NO ROUTE *************************************************************\
  Used by render()'s <Switch> when there are no matching routes
\*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
function NoMatch(props) {
  var hash = props.location.pathname.substring(1);
  return React.createElement(
    Alert,
    { color: 'warning' },
    'No Match for route ',
    React.createElement(
      'tt',
      null,
      '#',
      hash
    )
  );
}

/** APPLICATION NAVBAR + SWITCHED ROUTER VIEW ********************************\

    The application shell consists of a navbar implemented with Reactstrap
    components and a React view associated with the current route via
    ReactRouter <Switch> and <Route>.

    The AppShell class is exported as the main module object for use with
    require() statements (thanks to brunch magic)

\*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/

var AppShell = function (_UNISYS$Component) {
  _inherits(AppShell, _UNISYS$Component);

  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  /*/ constructor
  /*/function AppShell(props) {
    _classCallCheck(this, AppShell);

    var _this = _possibleConstructorReturn(this, (AppShell.__proto__ || Object.getPrototypeOf(AppShell)).call(this, props));

    _this.toggle = _this.toggle.bind(_this);
    _this.state = {
      isOpen: false
    };
    // bind handler
    _this.redirect = _this.redirect.bind(_this);
    // add UNISYS message for redirects
    _this.HandleMessage('SHELL_REDIRECT', _this.redirect);
    return _this;
  }

  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  /*/ Handle changes in state of his toggle switch
  /*/

  _createClass(AppShell, [{
    key: 'toggle',
    value: function toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ Called by SHELL_REDIRECT unisys message
    /*/
  }, {
    key: 'redirect',
    value: function redirect(data) {
      var redirect = data.redirect;

      this.props.history.push(redirect);
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ Draw top navbar w/ menus. Add route information
      To add a new HTML, add the link to both the <Nav> and <Switch> staments.
      To add a new VIEW, load the component
    /*/
  }, {
    key: 'render',
    value: function render() {
      /// return component with matching routed view
      return React.createElement(
        'div',
        { style: { display: 'flex', flexFlow: 'column nowrap', width: '100%', height: '100vh' } },
        React.createElement(
          Navbar,
          { fixed: 'top', light: true, expand: 'md', style: { backgroundColor: '#f0f0f0', padding: '8px 10px' } },
          React.createElement(
            NavbarBrand,
            { href: '#', style: { padding: '0' } },
            React.createElement('img', { src: 'images/netcreate-logo.svg', height: '36px' })
          ),
          React.createElement(NavbarToggler, { onClick: this.toggle }),
          React.createElement(
            Collapse,
            { isOpen: this.state.isOpen, navbar: true },
            React.createElement(
              Nav,
              { className: 'ml-auto', navbar: true, hidden: !isLocalHost },
              React.createElement(
                UncontrolledDropdown,
                { direction: 'right', nav: true },
                React.createElement(
                  DropdownToggle,
                  null,
                  'Extras'
                ),
                React.createElement(
                  DropdownMenu,
                  null,
                  React.createElement(
                    DropdownItem,
                    null,
                    React.createElement(
                      NavLink,
                      { to: '/dev-react', tag: RRNavLink, replace: true },
                      'dev-react'
                    )
                  ),
                  React.createElement(
                    DropdownItem,
                    null,
                    React.createElement(
                      NavLink,
                      { to: '/dev-unisys', tag: RRNavLink, replace: true },
                      'dev-unisys'
                    )
                  ),
                  React.createElement(
                    DropdownItem,
                    null,
                    React.createElement(
                      NavLink,
                      { to: '/dev-db', tag: RRNavLink, replace: true },
                      'dev-db'
                    )
                  ),
                  React.createElement(
                    DropdownItem,
                    null,
                    React.createElement(
                      NavLink,
                      { to: '/dev-session', tag: RRNavLink, replace: true },
                      'dev-session'
                    )
                  ),
                  React.createElement(
                    DropdownItem,
                    null,
                    React.createElement(
                      NavLink,
                      { to: '/simple', tag: RRNavLink, replace: true },
                      'SimpleHTML Example'
                    )
                  ),
                  React.createElement(
                    DropdownItem,
                    null,
                    React.createElement(
                      NavLink,
                      { to: '/vocabulary', tag: RRNavLink, replace: true },
                      'Network Vocabulary'
                    )
                  )
                )
              )
            )
          )
        ),
        React.createElement('div', { style: { height: '3.5em' } }),
        React.createElement(
          Switch,
          null,
          renderRoutes(Routes)
        )
      );
    } // render()

  }]);

  return AppShell;
}(UNISYS.Component); // AppShell()

/// EXPORT ROUTE INFO /////////////////////////////////////////////////////////


AppShell.Routes = Routes;

/// EXPORT REACT CLASS ////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// see https://tylermcginnis.com/react-router-programmatically-navigate/
module.exports = withRouter(AppShell);
});

require.register("init.jsx", function(exports, require, module) {
"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

if (window.NC_DBG) console.log("inc " + module.id);
/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

    init.jsx
    system startup, loaded by app/assets/index.html at end of body.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

var DBG = true;

/// SYSTEM-WIDE LANGUAGE EXTENSIONS ///////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// These are loaded in init to make sure they are available globally!
/// You do not need to copy these extensions to your own module files
require("babel-polyfill"); // enables regenerators for async/await

/// LIBRARIES /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var React = require("react");
var ReactDOM = require("react-dom");

var _require = require("react-router-dom"),
    HashRouter = _require.HashRouter;

/// SYSTEM MODULES ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// demo: require system modules; this will likely be removed


var UNISYS = require("unisys/client");
var AppShell = require("init-appshell");

/// UNISYS LIFECYCLE LOADER ///////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ When the DOM is loaded, initialize UNISYS
/*/
document.addEventListener("DOMContentLoaded", function () {
  console.group("init.jsx bootstrap");
  console.log("%cINIT %cDOMContentLoaded. Starting UNISYS Lifecycle!", "color:blue", "color:auto");
  m_SetLifecycleScope();
  _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return UNISYS.JoinNet();

          case 2:
            _context.next = 4;
            return UNISYS.EnterApp();

          case 4:
            _context.next = 6;
            return m_RenderApp();

          case 6:
            _context.next = 8;
            return UNISYS.SetupDOM();

          case 8:
            _context.next = 10;
            return UNISYS.SetupRun();

          case 10:
            // RESET, START, APP_READY, RUN
            console.log("%cINIT %cUNISYS Lifecycle Initialization Complete", "color:blue", "color:auto");
            console.groupEnd();

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }))();
});

/// UNISYS LIFECYCLE CLOSE EVENT //////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ this custom event accesses post-run lifecycles defined for 'DOMContentLoaded'
/*/
document.addEventListener("UNISYSDisconnect", function () {
  console.log("%cDISCONNECT %cUNISYSDisconnect. Closing UNISYS Lifecycle!", "color:blue", "color:auto");
  _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return UNISYS.ServerDisconnect();

          case 2:
            // UNISYS has dropped server
            console.log("%cDISCONNECT %cUNISYSDisconnect Complete", "color:blue", "color:auto");

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }))();
});

/// LIFECYCLE HELPERS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ helper to infer view module scope before module is routed lated (!)
/*/function m_SetLifecycleScope() {
  // set scope for UNISYS execution
  var routes = AppShell.Routes;
  // check #, and remove any trailing parameters in slashes
  // we want the first one
  var hashbits = window.location.hash.split("/");
  var hash = hashbits[0];
  var loc = "/" + hash.substring(1);
  var matches = routes.filter(function (route) {
    return route.path === loc;
  });
  if (matches.length) {
    if (DBG) console.log("Lifecycle Module Scope is " + hash);
    var component = matches[0].component;
    if (component.UMOD === undefined) console.warn("WARNING: root view '" + loc + "' has no UMOD property, so can not set UNISYS scope");
    var modscope = component.UMOD || "<undefined>/init.jsx";
    UNISYS.SetScope(modscope);
  } else {
    console.warn("m_SetLifecycleScope() could not match scope " + loc);
  }
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Wraps ReactDOM.render() in a Promise. Execution continues in <AppShell>
    and the routed view in AppShell.Routes
/*/function m_RenderApp() {
  if (DBG) console.log("%cINIT %cReactDOM.render() begin", "color:blue", "color:auto");
  return new Promise(function (resolve, reject) {
    try {
      ReactDOM.render(React.createElement(
        HashRouter,
        { hashType: "slash" },
        React.createElement(AppShell, null)
      ), document.querySelector("#app-container"), function () {
        console.log("%cINIT %cReactDOM.render() complete", "color:blue", "color:auto");
        resolve();
      });
    } catch (e) {
      console.error("m_RenderApp() Lifecycle Error. Check phase execution order effect on data validity.\n", e);
      debugger;
    }
  }); // promise
}
});

;require.register("settings.js", function(exports, require, module) {
'use strict';

if (window.NC_DBG) console.log('inc ' + module.id);
/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

    LOCAL SETTINGS
    utility function for managing local

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

/// GLOBAL NETWORK INFO (INJECTED ON INDEX) ///////////////////////////////////
///	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// NOTE: server-embedded properties are not defined for simple html apps
var EJSPROPS = window.NC_UNISYS || {};

/// STORAGE ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var S = {};
var DATE = new Date();
var RELOAD_CHECK = 0;
var RELOAD_TIMER = null;

/// MAIN GETTER/SETTER FUNCTION  //////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ settings.js returns a function as its module.exports value so
    syntax like let a = SETTINGS['key'] can be used.
/*/var MOD = function MOD(a, b) {
  if (a === undefined) throw 'SETTINGS requires key or key,value parms';
  if (typeof a !== 'string') throw 'SETTINGS parm1 must be key string';

  if (b === undefined) {
    return S[a];
  } else {
    S[a] = b;
    return b;
  }
};

/// API ///////////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ alternate call to set a key value pair
/*/MOD.Set = function (key, val) {
  MOD(key, val);
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ alternate call to retrieve a key
/*/MOD.Get = function (key) {
  return MOD(key);
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Force Reload if another module was navigated to and we want to ensure the
    entire browser was refreshed so only one set of app modules is loaded
/*/MOD.ForceReloadOnNavigation = function () {
  RELOAD_CHECK++;
  if (RELOAD_CHECK > 1) {
    console.warn('SETTINGS: ForceReloadOnNavigation active. Reloading!');
    if (RELOAD_TIMER) clearTimeout(RELOAD_TIMER);
    RELOAD_TIMER = setTimeout(function () {
      location.reload();
    }, 500);
  } else {
    console.warn('SETTINGS: ForceReloadOnNavigation check OK');
  }
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ test time function
/*/MOD.CurrentTime = function () {
  return DATE.toDateString();
};

/// SERVER-PROVIDED PROPERTIES ////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ searches through the window.NC_UNISYS object that is injected by web page
    app/static/index.ejs, which contains interesting values from server
/*/MOD.EJSProp = function (propName) {
  if (propName === undefined) return EJSPROPS;
  return EJSPROPS[propName];
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
MOD.ServerHostName = function () {
  return EJSPROPS.server.hostname || 'ERROR';
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
MOD.ServerHostIP = function () {
  return EJSPROPS.server.ip || 'ERROR';
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
MOD.ServerAppURL = function (suburl) {
  var ubits = new URL(window.location);
  var hash = ubits.hash.split('/')[0];
  var serverip = MOD.ServerHostIP();
  var url = ubits.protocol + '//' + ubits.host + '/' + hash;
  if (typeof suburl === 'string') url += suburl;
  return url;
};

/// EXPORT MODULE DEFINITION //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
module.exports = MOD;
});

require.register("system/datastore.js", function(exports, require, module) {
"use strict";

/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

    DATASTORE
    stub for testing module loading
    eventually will load data from database
    data.json is { nodes: [ {} ... {} ] }

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

var DBG = { load: true };

/// SYSTEM LIBRARIES //////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var SETTINGS = require("settings");
var SESSION = require("unisys/common-session");
var UNISYS = require("unisys/client");
var PROMPTS = require("system/util/prompts");
var PR = PROMPTS.Pad("Datastore");
var NetMessage = require("unisys/common-netmessage-class");

/// CONSTANTS /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var HASH_ABET = "ABCDEFGHIJKLMNPQRSTVWXYZ23456789";
var HASH_MINLEN = 3;

/// INITIALIZE MODULE /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var DSTOR = UNISYS.NewModule(module.id);
var UDATA = UNISYS.NewDataLink(DSTOR);
var D3DATA = {};

/// LIFECYCLE /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ establish message handlers during INITIALIZE phase
/*/
DSTOR.Hook("INITIALIZE", function () {
  // DB_UPDATE is a local call originating from within the app
  UDATA.HandleMessage("DB_UPDATE", function (data) {
    DSTOR.UpdateServerDB(data);
  });

  UDATA.OnAppStateChange('SESSION', function (decodedData) {
    var isValid = decodedData.isValid,
        token = decodedData.token;

    console.log('Handling SESSION', isValid);
    if (isValid) DSTOR.SetSessionGroupID(decodedData);
  });
});

/// SESSION ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ datastore needs to set NetMessage GroupID property on behalf of SESSIONS
    because SESSION can't include NetMessage (or vice versa)
/*/
DSTOR.SetSessionGroupID = function (decodedData) {
  var token = decodedData.token,
      isValid = decodedData.isValid;

  if (isValid) {
    NetMessage.GlobalSetGroupID(token);
    console.log('setting NetMessage group id', token);
  } else {
    console.warn('will not set bad group id:', token);
  }
};

/// DB INTERFACE //////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ API: Placeholder DATA access function
/*/
DSTOR.Data = function () {
  return D3DATA;
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ API: Write update to database
/*/
DSTOR.UpdateServerDB = function (data) {
  // check that network is online
  if (UNISYS.IsStandaloneMode()) {
    console.warn(PR, "STANDALONE MODE: UpdateServerDB() suppressed!");
    return;
  }
  // it is!
  UDATA.Call("SRV_DBUPDATE", data).then(function (res) {
    if (res.OK) {
      console.log(PR, "server db transaction", data, "success");
    } else {
      console.log(PR, "error updating server db", res);
    }
  });
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ get a unique NodeID
/*/
DSTOR.PromiseNewNodeID = function () {
  return new Promise(function (resolve, reject) {
    UDATA.NetCall("SRV_DBGETNODEID").then(function (data) {
      if (data.nodeID) {
        if (DBG) console.log(PR, "server allocated node_id", data.nodeID);
        resolve(data.nodeID);
      } else {
        if (UNISYS.IsStandaloneMode()) {
          reject(new Error("STANDALONE MODE: UI should prevent PromiseNewNodeID() from running!"));
        } else {
          reject(new Error("unknown error" + JSON.stringify(data)));
        }
      }
    });
  });
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ get a unique Edge
/*/
DSTOR.PromiseNewEdgeID = function () {
  return new Promise(function (resolve, reject) {
    UDATA.NetCall("SRV_DBGETEDGEID").then(function (data) {
      if (data.edgeID) {
        if (DBG) console.log(PR, "server allocated edge_id:", data.edgeID);
        resolve(data.edgeID);
      } else {
        if (UNISYS.IsStandaloneMode()) {
          reject(new Error("STANDALONE MODE: UI should prevent PromiseNewEdgeID() from running!"));
        } else {
          reject(new Error("unknown error" + JSON.stringify(data)));
        }
      }
    });
  });
};

/// DATABASE LOADER ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ API: Load default data set from a JSON file in /assets/data
/*/
DSTOR.PromiseJSONFile = function (jsonFile) {
  if (typeof jsonFile !== "string") {
    throw new Error("pass arg <filename_in_assets/data>");
  }
  var promise = new Promise(function (resolve, reject) {
    var xobj = new XMLHttpRequest();
    xobj.addEventListener("load", function (event) {
      if (event.target.status === 404) {
        reject(new Error("file not found"));
        return;
      }
      var data = event.target.responseText;
      D3DATA = Object.assign(D3DATA, JSON.parse(data));
      resolve(D3DATA);
    });
    xobj.open("GET", "data/" + jsonFile, true);
    xobj.send();
  });
  return promise;
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ API: Load D3 Database
/*/
DSTOR.PromiseD3Data = function () {
  // UDATA.Call() returns a promise
  return UDATA.Call("SRV_DBGET", {});
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ API: (WIP) write database from d3data-formatted object
/*/
DSTOR.OverwriteDataPromise = function (d3data) {
  return new Promise(function (resolve, reject) {
    UDATA.Call("SRV_DBSET", d3data).then(function (res) {
      if (res.OK) {
        console.log(PR, "database set OK");
        resolve(res);
      } else {
        reject(new Error(JSON.stringify(res)));
      }
    });
  });
};

/// EXPORT MODULE /////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
module.exports = DSTOR;
});

require.register("system/util/jscli.js", function(exports, require, module) {
'use strict';

if (window.NC_DBG) console.log('inc ' + module.id);
/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

    JS CLI

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

var DBG = true;
var SHOW_DOM = true;

/// SYSTEM LIBRARIES //////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var SETTINGS = require('settings');
var UNISYS = require('unisys/client');
var PROMPTS = require('system/util/prompts');
var PR = PROMPTS.Pad('JSCLI');

/// INITIALIZE MODULE /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var JSCLI = UNISYS.NewModule(module.id);
var UDATA = UNISYS.NewDataLink(JSCLI);
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var CMD = [];

/// DEFINE CLI FUNCTIONS //////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
JSCLI.AddFunction = function (f) {
  if (typeof f !== 'function') throw Error('AddFunction() arg is Function object');
  CMD.push(f);
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
JSCLI.HelpString = function () {
  var out = 'The following CLI commands are available\n\n';
  CMD.forEach(function (f) {
    out += '  ' + f.name + '()\n';
  });
  out += "\n";
  out += "Mac shortcuts to open console\n";
  out += "  Chrome  : cmd-option-j\n";
  out += "  Firefox : cmd-option-k\n";
  out += "PC use ctrl-shift instead\n";
  return out;
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ initialize registered functions
/*/JSCLI.Hook('RESET', function () {
  JSCLI.AddFunction(function ncHelp() {
    return JSCLI.HelpString();
  });
  CMD.forEach(function (f) {
    window[f.name] = f;
  });
  if (SHOW_DOM) JSCLI.DOM_ShowInstructions();
});
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
JSCLI.DOM_ShowInstructions = function () {
  var E_SHELL = document.getElementById('fdshell');
  if (!E_SHELL) {
    // console.warn(PR,"DOM_ShowInstructions() found no id 'fdshell' to append instructions. Type 'ncHelp()' to list available JSCLI functions.");
    return;
  }
  var E_OUT = document.createElement('pre');
  var E_HEADER = document.createElement('h4');
  E_SHELL.appendChild(E_HEADER);
  E_SHELL.appendChild(E_OUT);
  E_HEADER.innerHTML = 'Command Information';
  E_OUT.innerHTML = JSCLI.HelpString();
};

/// EXPORT MODULE /////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
module.exports = JSCLI;
});

require.register("system/util/path.js", function(exports, require, module) {
'use strict';

/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Path Strings
  REGEX approach from https://stackoverflow.com/a/47212224

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

var PATH = {};

var rx_dir = /(.*)\/+([^/]*)$/;
var rx_file = /()(.*)$/;

/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Return the directory portion of a path
/*/PATH.Parse = function (str) {
  // [0] original string
  // [1] dirname
  // [2] filename
  return rx_dir.exec(str) || rx_file.exec(str);
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Return the directory portion of a path
/*/PATH.Dirname = function (str) {
  // return str.substring(0,str.lastIndexOf("/"));
  return (rx_dir.exec(str) || rx_file.exec(str))[1];
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Return the file portion of a path
/*/PATH.Basename = function (str) {
  // return str.substring(str.lastIndexOf("/")+1);
  return (rx_dir.exec(str) || rx_file.exec(str))[2];
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Return the string stripped of extension
/*/PATH.StripExt = function (str) {
  return str.substr(0, str.lastIndexOf('.'));
};

/// EXPORT MODULE DEFINITION //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
module.exports = PATH;
});

require.register("system/util/prompts.js", function(exports, require, module) {
'use strict';

/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  String Prompts for server

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

var REFLECT = require('./reflection');
var PROMPTS = {};

/// CONSTANTS /////////////////////////////////////////////////////////////////
/// detect node environment and set padsize accordingly
var IS_NODE = typeof process !== 'undefined' && process.release && process.release.name === 'node';
var PAD_SIZE = IS_NODE ? 9 // nodejs
: 0; // not nodejs

/// PROMPT STRING HELPERS /////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ return a string padded to work as a prompt for either browser or node
    console output
/*/PROMPTS.Pad = function () {
  var prompt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var psize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : PAD_SIZE;

  var len = prompt.length;
  if (IS_NODE) return prompt.padEnd(psize, ' ') + '-';
  // must be non-node environment, so do dynamic string adjust
  if (!psize) return prompt + ':';
  // if this far, then we're truncating
  if (len >= psize) prompt = prompt.substr(0, psize - 1);else prompt.padEnd(psize, ' ');
  return prompt + ':';
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ returns PAD_SIZE stars
/*/PROMPTS.Stars = function (count) {
  if (count !== undefined) return ''.padEnd(count, '*');
  return ''.padEnd(PAD_SIZE, '*');
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ return string of calling object's name
/*/PROMPTS.FunctionName = function () {
  return REFLECT.FunctionName(2);
};

/// EXPORT MODULE DEFINITION //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
module.exports = PROMPTS;
});

require.register("system/util/reflection.js", function(exports, require, module) {
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Reflection and other Object Inspection Utilities

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

/// LIBRARIES /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var STACKTRACE = require('stacktrace-js');
var PATH = require('./path');

/// INITIALIZE MAIN MODULE ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var REFLECT = {};

/// API METHODS ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Returns the name of the constructor for the current class
    https://stackoverflow.com/questions/22777181/typescript-get-to-get-class-name-at-runtime
/*/REFLECT.ExtractClassName = function (obj) {
  var funcNameRegex = /function (.{1,})\(/;
  var results = funcNameRegex.exec(obj.constructor.toString());
  return results && results.length > 1 ? results[1] : "";
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Returns the name of the calling function
/*/REFLECT.FunctionName = function () {
  var depth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

  var stack = STACKTRACE.getSync();
  var frame = stack[depth];
  var fn = frame.functionName;
  if (!fn) {
    fn = PATH.Basename(frame.fileName);
    fn += ':' + frame.lineNumber + ':' + frame.columnNumber;
    return fn;
  } else {
    var bits = fn.split('.');
    return 'method ' + bits[1] + '() called by module ' + bits[0];
  }
};
///	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ InspectModule() prints a list of public properties and methods for each
    require module that contains the passed string. It returns a string, so
    you will have to console.log() to see the output.
/*/REFLECT.InspectModule = function (str) {
  throw Error('REFLECT.InspectModule() needs to be rewritten for brunch-style modules.');
  var rm = require.s.contexts._.defined;
  var mlist = [];
  var base = '1401/';
  if (str === undefined) str = base;
  str = typeof str === 'string' ? str : base;

  Object.keys(rm).forEach(function (key) {
    var name = key.toString();
    if (name.indexOf(str) >= 0) {
      mlist.push(key);
    }
  });

  var out = '\n';
  for (var i = 0; i < mlist.length; i++) {
    var objName = mlist[i];
    out += objName + '\n';
    if (str !== base) {
      out += "-----\n";
      var mod = rm[objName];
      out += m_DumpObj(mod);
      out += '\n';
    }
  }
  if (mlist.length) {
    console.log(out);
    return mlist.length + ' modules listed';
  } else {
    return "module " + str.bracket() + " not found";
  }
};
///	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ InspectObject() accepts an object and a label, and prints a list of
    all the methods and properties in it. It returns a string, so you will
    have to console.log() to see the output.
/*/REFLECT.InspectObject = function (obj, depth) {
  if (!obj) return "Must pass an object or 1401 watched object key string";

  var out = "";
  // handle command line calls
  switch (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) {
    case 'object':
    case 'function':
      break;
    default:
      return "must pass object or function, not " + (typeof obj === 'undefined' ? 'undefined' : _typeof(obj));
  }

  // handle recursive scan
  depth = depth || 0;
  var label = obj.constructor.name || '(anonymous object)';
  var indent = "";
  for (var i = 0; i <= depth; i++) {
    indent += '\t';
  }out += label + '\n';
  out += "\n";
  out += m_DumpObj(obj, depth + 1);
  var proto = Reflect.getPrototypeOf(obj);
  if (proto) {
    out += "\n" + indent + "IN PROTO: ";
    out += this.InspectObject(proto, depth + 1);
    out += "\n";
  }
  if (depth === 0) out = '\n' + out;
  console.log(out);
  return obj;
};

/** SUPPORTING FUNCTIONS ****************************************************/
///	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Support function for InspectModule() and InspectObject()
    Also checks m_watching array
/*/function m_DumpObj(obj, depth) {
  var indent = "";
  for (var i = 0; i < depth; i++) {
    indent += '\t';
  }var str = "";
  Object.keys(obj).forEach(function (key) {
    var prop = obj[key];
    var type = typeof prop === 'undefined' ? 'undefined' : _typeof(prop);
    str += indent;
    str += type + '\t' + key;
    switch (type) {
      case 'function':
        var regexp = /function.*\(([^)]*)\)/;
        var args = regexp.exec(prop.toString());
        str += ' (' + args[1] + ')';
        break;
      default:
        break;
    }
    str += '\n';
  });
  return str;
}

/** GLOBAL HOOKS *************************************************************/

if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object') {
  window.InspectModule = REFLECT.InspectModule;
  window.InspectObject = REFLECT.InspectObject;
  window.DBG_Out = function (msg, selector) {
    REFLECT.Out(msg, false, selector);
  };
  window.DBG_OutClean = function (msg, selector) {
    REFLECT.Out(msg, true, selector);
  };
}

/// EXPORT MODULE DEFINITION //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
module.exports = REFLECT;
});

require.register("test.js", function(exports, require, module) {
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

if (window.NC_DBG) console.log('inc ' + module.id);
/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

    TEST

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

var DBG = false;

/// DECLARATIONS //////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ list of tests that are allowed to run
/*/var TESTS = {
  call: false, // unisys calls
  state: false, // unisys state manager
  hook: false, // unisys lifecycle hooks
  remote: false, // unisys 'remote' calls to other module
  net: false, // network connection to socket server
  server: false // unisys 'server implemented' calls
};
/*/ groups of tests to run
/*/var PASSED = {};
var TEST_GO = false;
/*/ pairs of arrays to match (array of arrays)
/*/var ARR_MATCH = [];
var PR = 'TEST:';
var m_meta_info = {};

var E_SHELL = void 0,
    E_OUT = void 0,
    E_HEADER = void 0;
var m_failed = [];
var m_skipped = [];
var m_passed = [];

/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Main TEST ENABLE
    pass the testname (as listed in TESTS) and either true or false)
/*/var TM = function TM(testname, flag) {
  if (testname === undefined) {
    console.warn(PR + ' %cConfigured and Active', 'color:red;background-color:yellow');
    TEST_GO = true;
    return true;
  }
  if (typeof testname !== 'string') throw "arg1 must be a testname";
  if (!TESTS.hasOwnProperty(testname)) throw '"' + testname + '" is not a valid testname';
  if (DBG) console.log(PR, 'TM', testname, flag || '');
  if (flag === undefined) {
    if (!TEST_GO) console.error(PR + ' Test Switch read before testing started');
    var setting = TESTS[testname];
    return setting;
  } else {
    TESTS[testname] = flag;
    m_ConfigureTestFlags(testname, flag);
    return flag;
  }
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
TM.SetTitle = function (text) {
  E_HEADER.innerText = text;
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
TM.SetMeta = function (meta, value) {
  if (typeof meta === 'string') {
    var obj = {};
    obj[meta] = value;
    meta = obj;
  }
  if ((typeof meta === 'undefined' ? 'undefined' : _typeof(meta)) === 'object') {
    Object.assign(m_meta_info, meta);
  } else {
    throw Error('SetMeta() expected either object or string,value');
  }
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
TM.MetaString = function () {
  var o = '';
  var e = Object.entries(m_meta_info).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    o += k + ':' + v + ' ';
  });
  return o;
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ API: pass the particular subtest
/*/TM.Pass = function (subtest) {
  m_InitShell();
  // initialize tests
  if (DBG) console.log(PR + ' %cPass %c' + subtest, "color:green", "color:black");
  if (PASSED.hasOwnProperty(subtest)) {
    if (PASSED[subtest]) ++PASSED[subtest];else PASSED[subtest] = 1;
  } else {
    throw Error('Unknown subtest: ' + subtest);
  }
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ API: fail the particular subtest
/*/TM.Fail = function (subtest) {
  m_InitShell();
  if (DBG) console.error(PR + ' %cFail ' + subtest, "color:red;font-weight:bold");
  if (PASSED.hasOwnProperty(subtest)) {
    // 'null' for 'condition succeed' tests
    // '0' for 'no error detected' tests
    var flag = PASSED[subtest];
    if (typeof flag === 'string') {
      // this has already failed with error
      PASSED[subtest] = flag + '+';
      return;
    }
    if (flag === null) return; // null flag are skipped
    if (flag === 0) {
      PASSED[subtest] = -1; // failed once
      return;
    }
    if (flag <= 0) {
      --PASSED[subtest]; // multiple failures
      return;
    }
    // bizarre 'succeeded but now failed'
    if (flag > 0) {
      PASSED[subtest] = 'succeeded ' + flag + ' times, then failed';
      return;
    }
  }
  throw Error('Unknown subtest: ' + subtest);
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ API: check if the particular subtests passed have indeed passed
/*/TM.Passed = function () {
  if (DBG) console.log(PR, 'Passed');
  var passed = true;

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  args.forEach(function (subtest) {
    if (!PASSED.hasOwnProperty(subtest)) throw '"' + subtest + '" is not valid subtest';
    passed = passed && PASSED[subtest];
  });
  return passed;
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ API: output test results
/*/TM.Assess = function () {
  if (DBG) console.log(PR, 'Assess');
  m_failed = [];
  m_skipped = [];
  m_passed = [];
  m_PreTest();
  m_TestResults();
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ API: assess whether passed arrays match during Assess function()
/*/TM.AssessArrayMatch = function (subtest, arr1, arr2) {
  if (DBG) console.log(PR, 'AssessArrayMatch');
  ARR_MATCH.push([subtest, arr1, arr2]);
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ API: return TRUE if there were no failing tests in the last test.
    Call TM.Assess() again to retest
/*/TM.AllPassed = function () {
  return m_failed.length !== 0;
};

/// TEST FUNCTIONS ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ sets the PASSED object keys to enable/disable tests prior to running
/*/function m_ConfigureTestFlags(testname, flag) {
  if (flag === undefined) throw "arg2 flag must be true to enable, false to disable";
  // the subtest value must be set to false first
  // to skip tests, the subtest value is set to null
  if (flag === false) flag = null;
  if (flag === true) flag = false;
  // set subtest flags
  var subtests = void 0;
  switch (testname) {
    case 'state':
      subtests = {
        stateChange: flag,
        stateMerge: flag,
        stateConcat: flag
      };
      break;
    case 'hook':
      subtests = {
        hookInit1: flag,
        hookInit2: flag,
        hookInitDeferred: flag,
        hookStart: flag
      };
      break;
    case 'call':
      subtests = {
        callHndlrReg: flag,
        callHndlrData: flag,
        callHndlrDataProp: flag,
        callDataReturn: flag,
        callDataAdd: flag,
        callDataMulti: flag
      };
      break;
    case 'remote':
      subtests = {
        remoteCall: flag,
        remoteData: flag,
        remoteData2: flag,
        remoteDataReturn: flag,
        remoteDataAdd: flag,
        remoteDataMulti: flag
      };
      break;
    case 'server':
      subtests = {
        serverCall: flag,
        serverCallOrder: flag,
        serverReturn: flag,
        serverData: flag,
        serverDataAdd: flag
      };
      break;
    case 'net':
      subtests = {
        netMessageReg: flag,
        netCallHndlr: flag,
        netSendHndlr: flag,
        netSendNoEcho: 0, // if this stays 0, then NOERR has passed
        netSignal: flag,
        netSignalEcho: flag,
        netData: flag,
        netDataReturn: flag,
        netDataAdd: flag,
        //          netDataGather     : flag,
        netDataMulti: flag
      };
      break;
    default:
      throw 'Unknown test "' + testname + '"';
  } // end switch
  Object.assign(PASSED, subtests);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function m_PreTest() {
  // test arrays
  ARR_MATCH.forEach(function (pair) {
    var pass = true;
    var subtest = pair[0];
    var arr1 = pair[1];
    var arr2 = pair[2];
    pass = pass && arr1.length === arr2.length;
    for (var i = 0; i < arr1.length; i++) {
      pass = pass && arr1[i] === arr2[i];
    }
    if (pass) TM.Pass(subtest);
  });
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ prints the test output to console
/*/function m_TestResults() {
  m_ShowShell();
  // check all test results
  var pEntries = Object.entries(PASSED);
  var padding = 0;
  // find longest string
  pEntries.forEach(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        key = _ref4[0],
        value = _ref4[1];

    if (key.length > padding) padding = key.length;
  });
  // scan test results
  pEntries.forEach(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        key = _ref6[0],
        value = _ref6[1];

    var res = '';
    if (value === null) {
      // res = `${(key).padEnd(padding)} [ ]\n`;
      m_skipped.push(res);
    } else switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
      case 'number':
        if (value >= 1) {
          if (value === 1) res = key.padEnd(padding) + ' [OK]\n';
          if (value > 1) res = key.padEnd(padding) + ' [OK] x ' + value + '\n';
          m_passed.push(res);
        } else {
          if (value === 0) {
            res = key.padEnd(padding) + ' [NP]\n';
            m_passed.push(res);
          }
          if (value === -1) {
            res = key.padEnd(padding) + ' [!!] FAIL\n';
            m_failed.push(res);
          }
          if (value < -1) {
            res = key.padEnd(padding) + ' [!!] FAIL x ' + -value + '\n';
            m_failed.push(res);
          }
        }
        break;
      case 'boolean':
        if (value) {
          res = key.padEnd(padding) + ' [OK]\n';
          m_passed.push(res);
        } else {
          res = key.padEnd(padding) + ' [!!] FAIL\n';
          m_failed.push(res);
        }
        break;
      default:
        m_passed.push(key.padEnd(padding) + ' [OK] \'' + value + '\'\n');
        break;
    } // switch typeof value
  }); // pEntries.forEach

  var testTitle = "UNISYS LOGIC TEST RESULTS";
  console.group(testTitle);
  var out = m_passed.concat(m_failed, m_skipped).join('');

  // additional help
  var tnotes = '';
  if (!TM.Passed('netCallHndlr')) tnotes += 'NOTE: \'netCallHndlr\' requires a synched remote app to call-in\n';
  if (!TM.Passed('netSendHndlr')) tnotes += 'NOTE: \'netSendHndlr\' requires a synched remote app to call-in\n';
  if (!TM.Passed('netData')) tnotes += 'NOTE: \'netData*\' requires a synched remote app to respond to call-out\n';
  if (tnotes) out += '\n' + tnotes;

  // summary
  var summary = m_passed.length + '=passed';
  if (m_failed.length) summary += ' ' + m_failed.length + '=failed';
  if (m_skipped.length) summary += ' ' + m_skipped.length + '=skipped';
  console.log(out + '\n' + summary);
  TM.SetTitle(testTitle + ' ' + TM.MetaString());
  E_OUT.innerText = summary + '\n\n';
  E_OUT.innerText += "OPEN JAVASCRIPT CONSOLE TO SEE DETAILS\n";
  E_OUT.innerText += "Mac shortcuts to open console\n";
  E_OUT.innerText += "  Chrome  : cmd-option-j\n";
  E_OUT.innerText += "  Firefox : cmd-option-k\n";
  E_OUT.innerText += "PC use ctrl-shift instead\n";
  console.groupEnd();
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ initialize the shell user interface for test results as elements, but
    don't yet link them because component may not have rendered yet
/*/function m_InitShell() {
  if (!E_OUT) {
    E_OUT = document.createElement('pre');
    E_HEADER = document.createElement('h4');
    E_HEADER.innerText = "RUNNING TESTS ";
    E_OUT.innerText = '.';
  } else {
    E_OUT.innerText += '.';
  }
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ show the shell elements by finding root div and appending them
/*/function m_ShowShell() {
  E_SHELL = document.getElementById('fdshell');
  E_SHELL.appendChild(E_HEADER);
  E_SHELL.appendChild(E_OUT);
}

/// EXPORT MODULE DEFINITION //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
module.exports = TM;
});

require.register("unisys/client-datalink-class.js", function(exports, require, module) {
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

if (window.NC_DBG) console.log("inc " + module.id);
/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

    UNISYS DATALINK CLASS

    The UNISYS DATALINK (UDATA) class represents a connection to the UNISYS
    event messaging system. Instances are created with UNISYS.NewDataLink().

    Each UNODE has a unique UNISYS_ID (the UID) which represents its
    local address. Combined with the device UADDR, this makes every UNODE
    on the network addressable.

    * UNODES can get and set global state objects
    * UNODES can subscribe to state change events
    * UNODES can register listeners for a named message
    * UNODES can send broadcast to all listeners
    * UNODES can call listeners and receive data

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

/// DEBUGGING /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var DBG = { send: false, return: false, register: false };
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var BAD_OWNER = "must pass owner object of type React.Component or UniModule with optional 'name' parameter";
var BAD_NAME = "name parameter must be a string";
var BAD_UID = "unexpected non-unique UID";
var NO_DATAOBJ = "syntax error: missing data object";
var BAD_EJSPROPS = "EJS props (window.NC_UNISYS) is undefined, so can not set datalink IP address";
var PR = "UDATA:";

/// LIBRARIES /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var SETTINGS = require('settings');
var STATE = require('unisys/client-state');
var Messager = require('unisys/client-messager-class');

/// NODE MANAGEMENT ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var UNODE = new Map(); // unisys connector node map (local)
var UNODE_COUNTER = 100; // unisys connector node id counter

/// GLOBAL MESSAGES ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var MESSAGER = new Messager();

/// UNISYS NODE CLASS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Instances of this class can register/unregister message handlers and also
    send messages. Constructor receives an owner, which is inspected for
    properties to determine how to classify the created messager for debugging
    purposes
/*/
var UnisysDataLink = function () {

  /*/ CONSTRUCTOR
      A messager creates a unique ID within the webapp instance. Since
      messagers are "owned" by an object, we want the ID to reflect
      the owner's identity too while also allowing multiple instances per
      owner.
  /*/function UnisysDataLink(owner, optName) {
    _classCallCheck(this, UnisysDataLink);

    var msgr_type = '?TYPE';
    var msgr_name = '?NAME';

    if (optName !== undefined && typeof optName !== 'string') {
      throw Error(BAD_NAME);
    }

    // require an owner that is an object of some kind
    if ((typeof owner === "undefined" ? "undefined" : _typeof(owner)) !== 'object') throw Error(BAD_OWNER);

    // react components or regular objects
    if (owner.name) {
      msgr_type = 'MOD';
      msgr_name = owner.name || optName;
    } else if (owner.constructor.name) {
      msgr_type = 'RCT';
      msgr_name = owner.constructor.name;
    } else {
      throw Error(BAD_OWNER);
    }

    // generate and save unique id
    this.uid = msgr_type + "_" + UNODE_COUNTER++;
    this.name = msgr_name;
    if (UNODE.has(this.uid)) throw Error(BAD_UID + this.uid);

    // save module in the global module list
    UNODE.set(this.uid, this);
  }

  /// UNIQUE UNISYS ID for local application
  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  /// this is used to differentiate sources of events so they don't echo


  _createClass(UnisysDataLink, [{
    key: "UID",
    value: function UID() {
      return this.uid;
    }
  }, {
    key: "Name",
    value: function Name() {
      return this.name;
    }

    /// GLOBAL STATE ACCESS
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /// global STATE module calls are wrapped by unisys node so the unique
    /// UnisysID address can be appended

  }, {
    key: "AppState",
    value: function AppState(namespace) {
      return STATE.State(namespace);
    }
  }, {
    key: "SetAppState",
    value: function SetAppState(namespace, newState) {
      // uid is "source uid" designating who is making the change
      STATE.SetState(namespace, newState, this.UID());
    }
  }, {
    key: "MergeAppState",
    value: function MergeAppState(namespace, newState) {
      // uid is "source uid" designating who is making the change
      STATE.MergeState(namespace, newState, this.UID());
    }
  }, {
    key: "ConcatAppState",
    value: function ConcatAppState(namespace, newState) {
      // uid is "source uid" designating who is making the change
      STATE.ConcatState(namespace, newState, this.UID());
    }
    // uid is "source uid" of subscribing object, to avoid reflection
    // if the subscribing object is also the originating state changer

  }, {
    key: "OnAppStateChange",
    value: function OnAppStateChange(namespace, listener) {
      STATE.OnStateChange(namespace, listener, this.UID());
    }
  }, {
    key: "AppStateChangeOff",
    value: function AppStateChangeOff(namespace, listener) {
      STATE.OffStateChange(namespace, listener);
    }

    /// MESSAGES ////////////////////////////////////////////////////////////////
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /// mesgName is a string, and is an official event that's defined by the
    /// subclasser of UnisysNode

  }, {
    key: "HandleMessage",
    value: function HandleMessage(mesgName, listener) {
      // uid is "source uid" of subscribing object, to avoid reflection
      // if the subscribing object is also the originating state changer
      if (DBG.register) console.log(this.uid + "_" + PR, this.name + " handler added [" + mesgName + "]");
      MESSAGER.HandleMessage(mesgName, listener, { receiverUID: this.UID() });
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  }, {
    key: "UnhandleMessage",
    value: function UnhandleMessage(mesgName, listener) {
      if (DBG.register) console.log(this.uid + "_" + PR, this.name + " handler removed [" + mesgName + "]");
      MESSAGER.UnhandleMessage(mesgName, listener);
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ UDATA wraps Messager.Call(), which returns an array of promises.
        The UDATA version of Call() manages the promises, and returns a
    /*/
  }, {
    key: "Call",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(mesgName) {
        var inData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var status, promises, resArray, resObj;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                options = Object.assign(options, { type: 'mcall' });
                if (DBG.send) {
                  status = '';

                  if (!options.toNet) status += 'NO_NET ';
                  if (!options.toLocal) status += 'NO_LOCAL';
                  if (!(options.toLocal || options.toNet)) status = 'ERR NO LOCAL OR NET';
                  console.log(this.uid + "_" + PR, '** DATALINK CALL ASYNC', mesgName, status);
                }
                // uid is "source uid" of subscribing object, to avoid reflection
                // if the subscribing object is also the originating state changer
                options.srcUID = this.UID();
                promises = MESSAGER.Call(mesgName, inData, options);
                /// MAGICAL ASYNC/AWAIT BLOCK ///////

                if (DBG.send) console.log(this.uid + "_" + PR, '** awaiting...', promises);
                _context.next = 7;
                return Promise.all(promises);

              case 7:
                resArray = _context.sent;

                if (DBG.send) console.log(this.uid + "_" + PR, '** promise fulfilled!', mesgName);
                /// END MAGICAL ASYNC/AWAIT BLOCK ///
                resObj = Object.assign.apply(Object, [{}].concat(_toConsumableArray(resArray)));

                if (DBG.return) console.log(this.uid + "_" + PR, "[" + mesgName + "] returned", JSON.stringify(resObj));
                return _context.abrupt("return", resObj);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function Call(_x3) {
        return _ref.apply(this, arguments);
      }

      return Call;
    }()
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ Sends the data to all message implementors UNLESS it is originating from
        the same UDATA instance (avoid echoing back to self)
    /*/
  }, {
    key: "Send",
    value: function Send(mesgName) {
      var inData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if (DBG.send) console.log(this.uid + "_" + PR, '** DATALINK SEND', mesgName);
      options = Object.assign(options, { type: 'msend' });
      // uid is "source uid" of subscribing object, to avoid reflection
      // if the subscribing object is also the originating state changer
      options.srcUID = this.UID();
      // uid is "source uid" of subscribing object, to avoid reflection
      // if the subscribing object is also the originating state changer
      MESSAGER.Send(mesgName, inData, options);
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ Sends the data to all message implementors, irregardless of origin.
    /*/
  }, {
    key: "Signal",
    value: function Signal(mesgName) {
      var inData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      options = Object.assign(options, { type: 'msig' });
      MESSAGER.Signal(mesgName, inData, options);
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ version of Call that forces local-only calls
    /*/
  }, {
    key: "LocalCall",
    value: function LocalCall(mesgName, inData) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      options = Object.assign(options, { type: 'mcall' });
      options.toLocal = true;
      options.toNet = false;
      return this.Call(mesgName, inData, options);
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ version of Send that force local-only calls
    /*/
  }, {
    key: "LocalSend",
    value: function LocalSend(mesgName, inData) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      options = Object.assign(options, { type: 'msend' });
      options.toLocal = true;
      options.toNet = false;
      this.Send(mesgName, inData, options);
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ version of Send that force local-only calls
    /*/
  }, {
    key: "LocalSignal",
    value: function LocalSignal(mesgName, inData) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      options = Object.assign(options, { type: 'msig' });
      options.toLocal = true;
      options.toNet = false;
      this.Signal(mesgName, inData, options);
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ version of Call that forces network-only calls
    /*/
  }, {
    key: "NetCall",
    value: function NetCall(mesgName, inData) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      options = Object.assign(options, { type: 'mcall' });
      options.toLocal = false;
      options.toNet = true;
      return this.Call(mesgName, inData, options);
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ version of Send that force network-only calls
    /*/
  }, {
    key: "NetSend",
    value: function NetSend(mesgName, inData) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      options = Object.assign(options, { type: 'msend' });
      options.toLocal = false;
      options.toNet = true;
      this.Send(mesgName, inData, options);
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ version of Signal that forces network-only signal
    /*/
  }, {
    key: "NetSignal",
    value: function NetSignal(mesgName, inData) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      options.toLocal = false;
      options.toNet = true;
      this.Signal(mesgName, inData, options);
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  }, {
    key: "NullCallback",
    value: function NullCallback() {
      if (DBG.send) console.log(this.uid + "_" + PR, 'null_callback', this.UID());
    }
  }]);

  return UnisysDataLink;
}(); // class UnisysNode


/// STATIC CLASS METHODS //////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ There's a single MESSAGER object that handles all registered messages for
    UNISYS.
/*/

UnisysDataLink.MessageNames = function () {
  return MESSAGER.MessageNames();
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Filter any bad messages from the passed array of strings
/*/UnisysDataLink.ValidateMessageNames = function () {
  var msgs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var valid = [];
  msgs.forEach(function (name) {
    if (MESSAGER.HasMessageName(name)) valid.push(name);else throw new Error("ValidateMessageNames() found invalid message '" + name + "'");
  });
  return valid;
};

/// EXPORT CLASS DEFINITION ///////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
module.exports = UnisysDataLink;
});

require.register("unisys/client-lifecycle.js", function(exports, require, module) {
"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

if (window.NC_DBG) console.log("inc " + module.id);
/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

    LifeCycle - A system manager for application lifecycle events.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

var DBG = window.NC_DBG && window.NC_DBG.lifecycle;
var BAD_PATH = "module_path must be a string derived from the module's module.id";

/// LIBRARIES /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var PATH = require("system/util/path");

/// DECLARATIONS //////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var PHASE_HOOKS = new Map(); // functions that might right a Promise
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var PHASES = ["TEST_CONF", // setup tests
"INITIALIZE", // module data structure init
"LOADASSETS", // load any external data, make connections
"CONFIGURE", // configure runtime data structures
"DOM_READY", // when viewsystem has completely composed
"RESET", // reset runtime data structures
"START", // start normal execution run
"APP_READY", // synchronize to UNISYS network server
"RUN", // system starts running
"UPDATE", // system is running (periodic call w/ time)
"PREPAUSE", // system wants to pause run
"PAUSE", // system has paused (periodic call w/ time)
"POSTPAUSE", // system wants to resume running
"STOP", // system wants to stop current run
"DISCONNECT", // unisys server has gone offline
"RECONNECT", // unisys server has reconnected
"UNLOADASSETS", // system releases any connections
"SHUTDOWN" // system wants to shut down
];
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var PHASE = PHASES[0] + "_PENDING"; // current phase

/// MODULE DEFINITION /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var MOD = {
  name: "LifeCycle",
  scope: "system/booting" // overwritten by UNISYS.SystemInitialize()
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ UTILITY: compare the destination scope with the acceptable scope (the
    module.id of the root JSX component in a view). Any module not in the
    system directory will not get called
/*/
function m_ExecuteScopedPhase(phase, o) {
  // check for special unisys or system directory
  if (o.scope.indexOf("system") === 0) return o.f();
  if (o.scope.indexOf("unisys") === 0) return o.f();
  // check for subdirectory
  if (o.scope.includes(MOD.scope, 0)) return o.f();
  // else do nothing
  if (DBG) console.info("LIFECYCLE: skipping [" + phase + "] for " + o.scope + " because scope is " + MOD.scope);
  return undefined;
}

/// LIFECYCLE METHODS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ API: register a Phase Handler which is invoked by MOD.Execute()
    phase is a string constant from PHASES array above
    f is a function that does work immediately, or returns a Promise
/*/
MOD.Hook = function (phase, f, scope) {
  // make sure scope is included
  if (typeof scope !== "string") throw Error("<arg3> scope is required (set to module.id)");
  // does this phase exist?
  if (typeof phase !== "string") throw Error("<arg1> must be PHASENAME (e.g. 'LOADASSETS')");
  if (!PHASES.includes(phase)) throw Error(phase, "is not a recognized lifecycle phase");
  // did we also get a promise?
  if (!(f instanceof Function)) throw Error("<arg2> must be a function optionally returning Promise");

  // get the list of promises associated with this phase
  // and add the new promise
  if (!PHASE_HOOKS.has(phase)) PHASE_HOOKS.set(phase, []);
  PHASE_HOOKS.get(phase).push({ f: f, scope: scope });
  if (DBG) console.log("[" + phase + "] added handler");
};

/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ API: Execute all Promises associated with a phase, completing when
    all the callback functions complete. If the callback function returns
    a Promise, this is added to a list of Promises to wait for before the
    function returns control to the calling code.
/*/
MOD.Execute = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(phase) {
    var hooks, icount, promises;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(MOD.scope === false)) {
              _context.next = 2;
              break;
            }

            throw Error("UNISYS.SetScope() must be set to RootJSX View's module.id. Aborting.");

          case 2:
            if (PHASES.includes(phase)) {
              _context.next = 4;
              break;
            }

            throw Error(phase + " is not a recognized lifecycle phase");

          case 4:
            hooks = PHASE_HOOKS.get(phase);

            if (!(hooks === undefined)) {
              _context.next = 8;
              break;
            }

            if (DBG) console.log("[" + phase + "] no subscribers");
            return _context.abrupt("return");

          case 8:

            // phase housekeeping
            PHASE = phase + "_PENDING";

            // now execute handlers and promises
            icount = 0;

            if (DBG) console.group(phase);
            // get an array of promises
            // o contains f, scope pushed in Hook() above
            promises = hooks.map(function (o) {
              var retval = m_ExecuteScopedPhase(phase, o);
              if (retval instanceof Promise) {
                icount++;
                return retval;
              }
              // return undefined to signal no special handling
              return undefined;
            });

            promises = promises.filter(function (e) {
              return e !== undefined;
            });
            if (DBG && hooks.length) console.log("[" + phase + "] HANDLERS PROCESSED : " + hooks.length);
            if (DBG && icount) console.log("[" + phase + "] PROMISES QUEUED    : " + icount);

            // wait for all promises to execute
            _context.next = 17;
            return Promise.all(promises).then(function (values) {
              if (DBG && values.length) console.log("[" + phase + "] PROMISES RETURNED  : " + values.length, values);
              if (DBG) console.groupEnd();
              return values;
            }).catch(function (err) {
              if (DBG) console.log("[" + phase + " EXECUTE ERROR " + err);
              throw Error("[" + phase + " EXECUTE ERROR " + err);
            });

          case 17:

            // phase housekeeping
            PHASE = phase;

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ API: The scope is used to filter lifecycle events within a particular
    application path, which are defined under the view directory.
/*/
MOD.SetScope = function (module_path) {
  if (typeof module_path !== "string") throw Error(BAD_PATH);
  if (DBG) console.log("setting lifecycle scope to " + module_path);
  // strip out filename, if one exists
  MOD.scope = PATH.Dirname(module_path);
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ API: The scope
/*/
MOD.Scope = function () {
  return MOD.scope;
};

/// STATIC METHODS ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// ...

/// EXPORT MODULE DEFINITION //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
module.exports = MOD;
});

require.register("unisys/client-messager-class.js", function(exports, require, module) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

if (window.NC_DBG) console.log('inc ' + module.id);
/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

    Messager - Handle a collection of named events and their handlers
    https://en.wikipedia.org/wiki/Event-driven_architecture#JavaScript

    NOTE: This class is often WRAPPED by other UNISYS modules that manage
    a unique ID (such as the unique unisys datalink id) that hide that
    implementation detail from local users (e.g. unisys-data-class)

    HandleMessasge('MESG_NAME',handlerFunc,options)
      Add a handlerFunc. Specify options.handlerUID to enable echo rejection
      (same udata module will not invoke own handler when sending same message)
    UnhandleMessage('MESG_NAME',handlerFunc)
      Remove a handlerFunc associated with the handlerFuncFunction
    Send('MESG_NAME',data,options)
      Trigger an message+data to all handlers from a particular UDATA id
      If options.srcUID is specified, echo suppression is enabled
    Signal('MESG_NAME',data)
      Similar to Send(), but will ALWAYS broadcast to all implementors
    Call('MESG_NAME',data,options)
      Similar to Send(), but can return a value to a callback function
      options.srcUID is the UDATA id; set for echo supression to that uid
      options.dataReturnFunc is the callback function.

    NOTE: CallerReturnFunctions receive data object AND control object.
    The control object has the "return" function that closes a transaction;
    this is useful for async operations without Promises.

    NOTE: HandlerFunctions and CallerReturnFunctions are anotated with the
    udata_id property, which can be set to avoid echoing a message back to
    the same originating udata source.

    NOTE: When providing a handlerFunc, you might want to bind it to a
    specific object context (i.e. 'this') value using bind().
    e.g. handlerFunction = handlerFunction.bind(this);

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

var TEST = require('test');
var NetMessage = require('unisys/common-netmessage-class');

/// MODULE VARS ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var MSGR_IDCOUNT = 0;
var DBG = false;

/// UNISYS MESSAGER CLASS /////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var Messager = function () {
  /*/ Instances of this class can be used to implement a UNISYS-style message
      passing scheme with shared semantics. It maintains a Map keyed by mesgName
      strings, containing a Set object filled with handlers for that mesgName.
  /*/function Messager() {
    _classCallCheck(this, Messager);

    this.handlerMap = new Map(); // message map storing sets of functions
    this.messager_id = ++MSGR_IDCOUNT;
  }

  /// FIRE ONCE EVENTS //////////////////////////////////////////////////////////
  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  /*/ API: subscribe a handlerFunc function with a particular unisys id
      to receive a particular message. The handlerFunc receives a data obj
      and should return one as well. If there is an error, return a string.
  /*/

  _createClass(Messager, [{
    key: 'HandleMessage',
    value: function HandleMessage(mesgName, handlerFunc) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var handlerUID = options.handlerUID;
      var syntax = options.syntax;

      if (typeof handlerFunc !== 'function') {
        throw "arg2 must be a function";
      }
      if (typeof handlerUID === 'string') {
        // bind the udata uid to the handlerFunc function for convenient access
        // by the message dispatcher
        handlerFunc.udata_id = handlerUID;
      }
      var handlers = this.handlerMap.get(mesgName);
      if (!handlers) {
        handlers = new Set();
        this.handlerMap.set(mesgName, handlers);
      }
      // syntax annotation
      if (syntax) handlerFunc.umesg = { syntax: syntax };
      // saved function to handler
      handlers.add(handlerFunc);
      return this;
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ API: unsubscribe a handlerFunc function from a particular event
    /*/
  }, {
    key: 'UnhandleMessage',
    value: function UnhandleMessage(mesgName, handlerFunc) {
      if (!arguments.length) {
        this.handlerMap.clear();
      } else if (arguments.length === 1) {
        this.handlerMap.delete(mesgName);
      } else {
        var handlers = this.handlerMap.get(mesgName);
        if (handlers) {
          handlers.delete(handlerFunc);
        }
      }
      return this;
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ API: trigger a message with the data object payload, sending to all handlers
        that implement that event. Includer sender's unisys id to prevent the sender
        to receiving its own message back if it happens to implement the message as
        well. dstScope is 'net' or 'local' to limit where to send, or 'all'
        for everyone on net or local
    /*/
  }, {
    key: 'Send',
    value: function Send(mesgName, inData) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var srcUID = options.srcUID,
          type = options.type;
      var _options$toLocal = options.toLocal,
          toLocal = _options$toLocal === undefined ? true : _options$toLocal,
          _options$toNet = options.toNet,
          toNet = _options$toNet === undefined ? true : _options$toNet;

      var handlers = this.handlerMap.get(mesgName);
      /// toLocal
      if (handlers && toLocal) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = handlers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var handlerFunc = _step.value;

            // handlerFunc signature: (data,dataReturn) => {}
            // handlerFunc has udata_id property to note originating UDATA object
            // skip "same origin" calls
            if (srcUID && handlerFunc.udata_id === srcUID) {
              if (DBG) console.warn('MessagerSend: [' + mesgName + '] skip call since origin = destination; use Broadcast() if intended');
              continue;
            }
            // trigger the handler (no return expected)
            handlerFunc(inData, {/*control functions go here*/});
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      } // end toLocal
      /// toNetwork
      if (toNet) {
        var pkt = new NetMessage(mesgName, inData, type);
        pkt.SocketSend();
      } // end toNetwork
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ API: wrapper for Send() used when you want every handlerFunc, including
        the sender, to receive the event even if it is the one who sent it.
    /*/
  }, {
    key: 'Signal',
    value: function Signal(mesgName, data) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if (options.srcUID) {
        console.warn('overriding srcUID ' + options.srcUID + ' with NULL because Signal() doesn\'t use it');
        options.srcUID = null;
      }
      this.Send(mesgName, data, options);
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ API: Return an array of Promises. Called by UDATA.Call().
    /*/
  }, {
    key: 'Call',
    value: function Call(mesgName, inData) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var srcUID = options.srcUID,
          type = options.type;
      var _options$toLocal2 = options.toLocal,
          toLocal = _options$toLocal2 === undefined ? true : _options$toLocal2,
          _options$toNet2 = options.toNet,
          toNet = _options$toNet2 === undefined ? true : _options$toNet2;

      var handlers = this.handlerMap.get(mesgName);
      var promises = [];
      /// toLocal
      if (handlers && toLocal) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = handlers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var handlerFunc = _step2.value;

            // handlerFunc signature: (data,dataReturn) => {}
            // handlerFunc has udata_id property to note originating UDATA object
            // skip "same origin" calls
            if (srcUID && handlerFunc.udata_id === srcUID) {
              if (DBG) console.warn('MessagerCall: [' + mesgName + '] skip call since origin = destination; use Broadcast() if intended');
              continue;
            }
            // Create a promise. if handlerFunc returns a promise, it follows
            var p = f_MakeResolverFunction(handlerFunc, inData);
            promises.push(p);
          } // end toLocal
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
      /// resolver function
      /// remember MESSAGER class is used for more than just Network Calls
      /// the state manager also uses it, so the resolved value may be of any type
      function f_MakeResolverFunction(handlerFunc) {
        return new Promise(function (resolve, reject) {
          var retval = handlerFunc(inData, {/*control functions go here*/});
          resolve(retval);
        });
      }
      /// toNetwork
      if (toNet) {
        type = type || 'mcall';
        var pkt = new NetMessage(mesgName, inData, type);
        var _p = pkt.QueueTransaction();
        promises.push(_p);
      } // end toNetwork

      /// return all queued promises
      return promises;
    }

    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ API: Return a list of messages handled by this Messager instance
    /*/
  }, {
    key: 'MessageNames',
    value: function MessageNames() {
      var handlers = [];
      this.handlerMap.forEach(function (value, key) {
        handlers.push(key);
        if (DBG) console.log('handler: ' + key);
      });
      return handlers;
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ API: Verify that message exists
    /*/
  }, {
    key: 'HasMessageName',
    value: function HasMessageName() {
      var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      return this.handlerMap.has(msg);
    }
  }]);

  return Messager;
}(); // class Messager

/// EXPORT CLASS DEFINITION ///////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


module.exports = Messager;
});

require.register("unisys/client-module-class.js", function(exports, require, module) {
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

if (window.NC_DBG) console.log("inc " + module.id);
/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

    UNISYS MODULE SHELL

    A simple shell with a unique id and unique name. Currently this is just
    a utility class for maintaining naming convention for modules, and
    serves as the interface for module management within the UNISYS universe

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

var DBG = true;
var BAD_NAME = "name parameter must be a string or unisys module";
var NOT_UNIQUE = "name must be unique";

/// LIBRARIES /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var LIFECYCLE = require('unisys/client-lifecycle');
var PATH = require('system/util/path');

/// MODULE DECLARATIONS ///////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var MODULES = new Map(); // unisys modules map
var MODULES_COUNTER = 1; // unisys modules counter

/// UNISYS MODULE CLASS ///////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Instances of this class are used to participate in the UNISYS lifecycle.
    Constructor receives the value of module.id, which is used to help scope
    what lifecycle hooks are distributed to which module
/*/
var UnisysModule = function () {

    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ initializer is the value module.id or another instance of UnisysModule,
        which is used to create a derivative name of form 'initializer name:0'
    /*/function UnisysModule(module) {
        _classCallCheck(this, UnisysModule);

        if (module === undefined) throw Error(BAD_NAME);
        // can pass another unisys modules to create derived name
        if (module instanceof UnisysModule) {
            this.module_id = module.AutoName();
        } else if (typeof module === 'string') {
            // otherwise, copy the initializer
            this.module_id = module;
        }
        if (MODULES.has(this.name)) throw Error(NOT_UNIQUE);

        // save unique information
        this.uid = "UMOD_" + MODULES_COUNTER++;

        // save derivative subname counter
        this.subnameCounter = 0;

        // save module in the global module list
        MODULES.set(this.module_id, this);
    }

    /// PROPERTIES //////////////////////////////////////////////////////////////
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ this is used for identifying the module. It must be unique across all
    /*/

    _createClass(UnisysModule, [{
        key: "ModuleID",
        value: function ModuleID() {
            return this.module_id;
        }
        /*/ utility method to return a short name
        /*/
    }, {
        key: "ModuleName",
        value: function ModuleName() {
            return PATH.Basename(this.module_id);
        }

        /// UTILITIES ///////////////////////////////////////////////////////////////
        /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        /*/ used to create a derivative name
        /*/
    }, {
        key: "AutoName",
        value: function AutoName() {
            return this.module_id + ":" + this.subnameCounter++;
        }
        /*/ check if the name already exists in the MODULES collection
        /*/
    }, {
        key: "HasModule",
        value: function HasModule(name) {
            return MODULES.has(name);
        }

        /// LIFECYCLE /////////////////////////////////////////////////////////////////
        /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        /*/ wrap Hook function to include the ModuleID
        /*/
    }, {
        key: "Hook",
        value: function Hook(phase, f) {
            LIFECYCLE.Hook(phase, f, this.ModuleID());
        }
    }]);

    return UnisysModule;
}(); // end UnisysModule


/// EXPORT CLASS DEFINITION ///////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


module.exports = UnisysModule;
});

require.register("unisys/client-network.js", function(exports, require, module) {
"use strict";

if (window.NC_DBG) console.log("inc " + module.id);
/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

    UNISYS NETWORK implements network controls and synchronization.
    It initializes a network connection on the CONNECT lifecycle.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

var DBG = { connect: true, handle: false };

/// LOAD LIBRARIES ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var SETTINGS = require("settings");
var NetMessage = require("unisys/common-netmessage-class");
var PROMPTS = require("system/util/prompts");
var PR = PROMPTS.Pad("NETWORK");
var WARN = PROMPTS.Pad("!!!");
var ERR_NM_REQ = "arg1 must be NetMessage instance";
var ERR_NO_SOCKET = "Network socket has not been established yet";
var ERR_BAD_UDATA = "An instance of 'client-datalink-class' is required";

/// GLOBAL NETWORK INFO (INJECTED ON INDEX) ///////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var NETSOCK = SETTINGS.EJSProp("socket");
var NETCLIENT = SETTINGS.EJSProp("client");
var NETSERVER = SETTINGS.EJSProp("server");

/// NETWORK ID VALUES /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var M0_INIT = 0;
var M1_CONNECTING = 1;
var M2_CONNECTED = 2;
var M3_REGISTERED = 3;
var M4_READY = 4;
var M_STANDALONE = 5;
var M_NOCONNECT = 6;
var m_status = M0_INIT;
var m_options = {};

/// API METHODS ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var NETWORK = {};
var UDATA = null; // assigned during NETWORK.Connect()

/// CONNECT ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Establish connection to UNISYS server. This is called by client.js during
    NetworkInitialize(), which itself fires after the application has rendered
    completely.
/*/
NETWORK.Connect = function (datalink, opt) {
  // special case: STANDALONE mode is set by a different set of magical
  // window.NC_UNISYS properties
  if (window.NC_UNISYS.server.ip === 'standalone') {
    m_status = M_STANDALONE;
    console.warn(PR, "STANDALONE MODE: NETWORK.Connect() suppressed!");
    NetMessage.GlobalOfflineMode();
    if (typeof opt.success === "function") opt.success();
    return;
  }

  // if multiple network connections occur, emit warning
  // warning: don't modify this unless you have a deep knowledge of how
  // the webapp system works or you might break something
  if (m_status > 0) {
    var err = "called twice...other views may be calling UNISYS outside of lifecycle";
    console.error(WARN, err);
    return;
  }
  m_status = M1_CONNECTING;

  // check and save parms
  if (datalink.constructor.name !== "UnisysDataLink") {
    throw Error(ERR_BAD_UDATA);
  }
  if (!UDATA) UDATA = datalink;
  m_options = opt || {};

  // create websocket
  // uses values that were embedded in index.ejs on load
  var wsURI = "ws://" + NETSOCK.uaddr + ":" + NETSOCK.uport;
  NETSOCK.ws = new WebSocket(wsURI);
  if (DBG.connect) console.log(PR, "OPEN SOCKET TO", wsURI);

  // create listeners
  NETWORK.AddListener("open", function (event) {
    if (DBG.connect) console.log(PR, "..OPEN", event.target.url);
    m_status = M2_CONNECTED;
    // message handling continues in 'message' handler
    // the first message is assumed to be registration data
  });
  NETWORK.AddListener("close", function (event) {
    if (DBG.connect) console.log(PR, "..CLOSE", event.target.url);
    NetMessage.GlobalOfflineMode();
    m_status = M_STANDALONE;
  });
  // handle socket errors
  NETWORK.AddListener("error", function (event) {
    /*/ DSHACK: For Spring 2019, adding manifest support to try to
        avoid rewriting the app with service workers
    /*/
    var appCache = window.applicationCache;
    switch (appCache.status) {
      case appCache.UNCACHED:
        // this occurs if there is not a cached page
        console.warn(WARN, "ERROR opening command socket", event);
        throw Error("error with command socket");
        break;
      case appCache.IDLE: /* falls-through */
      case appCache.CHECKING: /* falls-through */
      case appCache.DOWNLOADING: /* falls-through */
      case appCache.UPDATEREADY: /* falls-through */
      case appCache.OBSOLETE:
        // this occurs
        console.info(WARN, "STANDALONE MODE. USING CACHED DATA");
        m_status = M_STANDALONE;
        NetMessage.GlobalOfflineMode(); // deregister socket
        // force promise to succeed
        if (typeof m_options.success === "function") m_options.success();
        break;
      default:
        m_status = M_NOCONNECT;
        throw Error("unknown appcache status. dumping", appCache);
        break;
    }
  });
  // handle incoming messages
  NETWORK.AddListener("message", m_HandleRegistrationMessage);
}; // Connect()

/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ After 'open' event, we expect the first message on the socket to contain
    network session-related messages
/*/
function m_HandleRegistrationMessage(msgEvent) {
  var regData = JSON.parse(msgEvent.data);
  var HELLO = regData.HELLO,
      UADDR = regData.UADDR;
  // (1) after receiving the initial message, switch over to regular
  // message handler

  NETWORK.RemoveListener("message", m_HandleRegistrationMessage);
  m_status = M3_REGISTERED;
  // (2) initialize global settings for netmessage
  if (DBG.connect) console.log(PR, "connected to " + UADDR, NETSOCK);
  NETSOCK.ws.UADDR = NetMessage.DefaultServerUADDR();
  NetMessage.GlobalSetup({ uaddr: UADDR, netsocket: NETSOCK.ws });
  // (3) connect regular message handler
  NETWORK.AddListener("message", m_HandleMessage);
  m_status = M4_READY;
  // (4) network is initialized
  if (typeof m_options.success === "function") m_options.success();
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function m_HandleMessage(msgEvent) {
  var pkt = new NetMessage(msgEvent.data);
  var msg = pkt.Message();
  if (pkt.IsOwnResponse()) {
    if (DBG.handle) console.log(PR, "completing transaction", msg);
    pkt.CompleteTransaction();
    return;
  }
  var data = pkt.Data();
  var type = pkt.Type();
  var dbgout = DBG.handle && !msg.startsWith("SRV_");
  /// otherwise, incoming invocation from network
  switch (type) {
    case "state":
      if (dbgout) console.log(PR, "received state change", msg);
      break;
    case "msig":
      if (dbgout) {
        console.warn(PR, "ME_" + NetMessage.SocketUADDR() + " received msig '" + msg + "' from " + pkt.SourceAddress(), data);
      }
      UDATA.LocalSignal(msg, data);
      pkt.ReturnTransaction();
      break;
    case "msend":
      if (dbgout) {
        console.warn(PR, "ME_" + NetMessage.SocketUADDR() + " received msend '" + msg + "' from " + pkt.SourceAddress(), data);
      }
      UDATA.LocalSend(msg, data);
      pkt.ReturnTransaction();
      break;
    case "mcall":
      if (dbgout) {
        console.warn(PR, "ME_" + NetMessage.SocketUADDR() + " received mcall '" + msg + "' from " + pkt.SourceAddress());
      }
      UDATA.LocalCall(msg, data).then(function (result) {
        if (dbgout) {
          console.log("ME_" + NetMessage.SocketUADDR() + " forwarded '" + msg + "', returning " + JSON.stringify(result));
        }
        // now return the packet
        pkt.SetData(result);
        pkt.ReturnTransaction();
      });
      break;
    default:
      throw Error("unknown packet type", type);
  }
}

/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Send a packet on socket connection, assuming it is valid
/*/
NETWORK.Send = function (pkt) {
  if (!(pkt instanceof NetMessage)) throw Error(ERR_NM_REQ);
  if (NETSOCK.ws.readyState === 1) {
    var json = pkt.JSON();
    if (DBG) console.log("SENDING", pkt.Message(), pkt.Data(), pkt.SeqNum());
    NETSOCK.ws.send(json);
  } else {
    console.log("Socket not ReadyState 1, is", NETSOCK.ws.readyState);
  }
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Send a packet on socket connection, return Promise
/*/
NETWORK.Call = function (pkt) {
  if (!(pkt instanceof NetMessage)) throw Error(ERR_NM_REQ);
  if (NETSOCK.ws.readyState === 1) {
    var json = pkt.JSON();
    if (DBG) console.log("CALLING", pkt.Message(), json);
    NETSOCK.ws.send(json);
  } else {
    console.log("Socket not ReadyState 1, is", NETSOCK.ws.readyState);
  }
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Force close of connection, for example if UNISYS.AppReady() fails
/*/
NETWORK.Close = function (code, reason) {
  code = code || 1000;
  reason = reason || "unisys forced close";
  NETSOCK.ws.close(code, reason);
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
NETWORK.AddListener = function (event, handlerFunction) {
  if (NETSOCK.ws instanceof WebSocket) {
    NETSOCK.ws.addEventListener(event, handlerFunction);
  } else {
    throw Error(ERR_NO_SOCKET);
  }
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
NETWORK.RemoveListener = function (event, handlerFunction) {
  if (NETSOCK.ws instanceof WebSocket) {
    NETSOCK.ws.removeEventListener(event, handlerFunction);
  } else {
    throw Error(ERR_NO_SOCKET);
  }
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
NETWORK.LocalInfo = function () {
  return NETCLIENT;
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
NETWORK.ServerInfo = function () {
  return NETSERVER;
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
NETWORK.ServerSocketInfo = function () {
  return NETSOCK;
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
NETWORK.SocketUADDR = function () {
  return NetMessage.SocketUADDR();
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
NETWORK.IsStandaloneMode = function () {
  return m_status === M_STANDALONE;
};

/// EXPORT MODULE DEFINITION //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
module.exports = NETWORK;
});

require.register("unisys/client-react-component.jsx", function(exports, require, module) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (window.NC_DBG) console.log('inc ' + module.id);
/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Add UNISYS functions to REACT component to hide UDATA and UMODULE details
  To use, extend components from UNISYS.Component instead of REACT.Component

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

/// LIBRARIES /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var React = require('react');
var UDATA = require('unisys/client-datalink-class');
var UMODULE = require('unisys/client-module-class');
var REFLECT = require('system/util/reflection');

/// CLASS DECLARATION /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var UnisysComponent = function (_React$Component) {
  _inherits(UnisysComponent, _React$Component);

  function UnisysComponent() {
    _classCallCheck(this, UnisysComponent);

    var _this = _possibleConstructorReturn(this, (UnisysComponent.__proto__ || Object.getPrototypeOf(UnisysComponent)).call(this));

    _this.UMODULE = new UMODULE(module.id);
    _this.UDATA = new UDATA(_this.UMODULE);
    return _this;
  }

  /// MESSAGE HANDLING API METHODS


  _createClass(UnisysComponent, [{
    key: 'HandleMessage',
    value: function HandleMessage(m, lis) {
      this.UDATA.HandleMessage(m, lis);
    }
  }, {
    key: 'UnhandleMessage',
    value: function UnhandleMessage(m, lis) {
      f_deprecated('DropMessage');this.UDATA.UnhandleMessage(m, lis);
    }
  }, {
    key: 'DropMessage',
    value: function DropMessage(m, lis) {
      this.UDATA.UnhandleMessage(m, lis);
    }

    /// SPECIAL EVENTS

  }, {
    key: 'OnDOMReady',
    value: function OnDOMReady(lis) {
      this.UMODULE.Hook('DOM_READY', lis);
    }
  }, {
    key: 'OnReset',
    value: function OnReset(lis) {
      this.UMODULE.Hook('RESET', lis);
    }
  }, {
    key: 'OnStart',
    value: function OnStart(lis) {
      this.UMODULE.Hook('START', lis);
    }
  }, {
    key: 'OnAppReady',
    value: function OnAppReady(lis) {
      this.UMODULE.Hook('APP_READY', lis);
    }
  }, {
    key: 'OnRun',
    value: function OnRun(lis) {
      this.UMODULE.Hook('RUN', lis);
    }

    /// MESSAGE INVOCATION API METHODS

  }, {
    key: 'Call',
    value: function Call(m, d, o) {
      return this.UDATA.Call(m, d, o);
    }
  }, {
    key: 'Send',
    value: function Send(m, d, o) {
      this.UDATA.Send(m, d, o);
    }
  }, {
    key: 'Signal',
    value: function Signal(m, d, o) {
      this.UDATA.Signal(m, d, o);
    }
  }, {
    key: 'AppCall',
    value: function AppCall(m, d, o) {
      return this.UDATA.LocalCall(m, d, o);
    }
  }, {
    key: 'AppSend',
    value: function AppSend(m, d, o) {
      this.UDATA.LocalSend(m, d, o);
    }
  }, {
    key: 'AppSignal',
    value: function AppSignal(m, d, o) {
      this.UDATA.LocalSignal(m, d, o);
    }
  }, {
    key: 'NetSend',
    value: function NetSend(m, d, o) {
      this.UDATA.NetSend(m, d, o);
    }
  }, {
    key: 'NetCall',
    value: function NetCall(m, d, o) {
      return this.UDATA.NetCall(m, d, o);
    }
  }, {
    key: 'NetSignal',
    value: function NetSignal(m, d, o) {
      this.UDATA.NetSignal(m, d, o);
    }
  }, {
    key: 'LocalCall',
    value: function LocalCall(m, d, o) {
      f_deprecated('AppCall');return this.UDATA.LocalCall(m, d, o);
    }
  }, {
    key: 'LocalSend',
    value: function LocalSend(m, d, o) {
      f_deprecated('AppSend');this.UDATA.LocalSend(m, d, o);
    }
  }, {
    key: 'LocalSignal',
    value: function LocalSignal(m, d, o) {
      f_deprecated('AppSignal');this.UDATA.LocalSignal(m, d, o);
    }
    /// STATE API METHODS

  }, {
    key: 'State',
    value: function State(ns) {
      f_deprecated('AppState');return this.AppState(ns);
    }
  }, {
    key: 'SetState',
    value: function SetState(ns, so) {
      f_deprecated('SetAppState');this.SetAppState(ns, so);
    }
  }, {
    key: 'OnStateChange',
    value: function OnStateChange(ns, lis) {
      f_deprecated('OnAppStateChange');this.OnAppStateChange(ns, lis);
    }
  }, {
    key: 'OffStateChange',
    value: function OffStateChange(ns, lis) {
      f_deprecated('AppStateChangeOff');this.AppStateChangeOff(ns, lis);
    }
    /// NEW STATE API METHODS

  }, {
    key: 'AppState',
    value: function AppState(ns) {
      return this.UDATA.AppState(ns);
    }
  }, {
    key: 'SetAppState',
    value: function SetAppState(ns, so) {
      this.UDATA.SetAppState(ns, so);
    }
  }, {
    key: 'OnAppStateChange',
    value: function OnAppStateChange(ns, lis) {
      this.UDATA.OnAppStateChange(ns, lis);
    }
  }, {
    key: 'AppStateChangeOff',
    value: function AppStateChangeOff(ns, lis) {
      this.UDATA.AppStateChangeOff(ns, lis);
    }
  }, {
    key: 'NetState',
    value: function NetState(ns) {
      f_unimplemented();
    }
  }, {
    key: 'SetNetState',
    value: function SetNetState(ns, so) {
      f_unimplemented();
    }
  }, {
    key: 'OnNetStateChange',
    value: function OnNetStateChange(ns, lis) {
      f_unimplemented();
    }
  }, {
    key: 'NetStateChangeOff',
    value: function NetStateChangeOff(ns, lis) {
      f_unimplemented();
    }
    /// LIFECYCLE API

  }, {
    key: 'Hook',
    value: function Hook(p, f) {
      f_unsupported('is not available for UNISYS.Component');
    }
  }]);

  return UnisysComponent;
}(React.Component); // UnisysComponent

function f_deprecated(repl) {
  var out = REFLECT.FunctionName(2) + ' is deprecated.';
  if (typeof repl === 'string') out += ' Use ' + repl + '() instead.';
  console.warn(out);
}

function f_unimplemented() {
  var out = REFLECT.FunctionName(2) + ' is not yet implemented.';
  alert(out + '\n\nCrashing now! Use javascript console to debug');
  console.error(out);
  debugger;
}

function f_unsupported(reason) {
  var out = REFLECT.FunctionName(2) + ' ' + reason;
  alert(out + '\n\nCrashing now! Use javascript console to debug');
  console.error(out);
  debugger;
}

/// EXPORT REACT COMPONENT ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
module.exports = UnisysComponent;
});

require.register("unisys/client-state.js", function(exports, require, module) {
"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

if (window.NC_DBG) console.log("inc " + module.id);
/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

    UNISYS STATE CLASS

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

var DBG = false;
var BAD_NSPACE = "namespace must be string without _ chars";
var BAD_LISTENR = "listener must be function";
var NO_UID_FLTR = "UNISYS.OnStateChange: pass DST_UID parameter to enable echo cancellation";
var WARN_PROP_MISMATCH = "MergeState is changing a property type";

/// LIBRARIES /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var REACT = require('react');
var TYPEOF = require('type-detect');
var Messager = require('unisys/client-messager-class');

/// MODULE DECLARATIONS ///////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var USTATE = {};
var STATES = new Map(); // namespace str => shallow state object
var STATES_LISTEN = new Map(); // namespace str => emitter

/// STATE /////////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ UNISYS namespaces are transformed to uppercase.
    A namespace must be a string that does not contain reserved char '_'
/*/function m_ConformNamespace(namespace) {
  // must be a string
  if (typeof namespace !== 'string') return undefined;
  // disallow empty string
  if (!namespace) return undefined;
  // always uppercase
  namespace = namespace.toUpperCase();
  // expand * shortcut to _ROOT
  if (namespace === '*') return '_ROOT';
  // disallow _ reserved names
  if (namespace.indexOf('_') > -1) return undefined;
  // ok we're good
  return namespace;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Used for merging and concatenating state, when a simple copy-overwrite
    simply will not do.
/*/function m_ConformState(namespace, newState, opt) {
  opt = opt || { merge: true };
  // make a copy of the old state
  var state = Object.assign({}, STATES.get(namespace));
  if (DBG) console.log("merging state namespace '" + namespace + "' with", newState);

  // iterate over all properties in newState and merge them
  // accordingly. This is *NOT* a deep merge.
  Object.entries(newState).forEach(function (entry) {
    var k = entry[0]; // current prop name in newstate
    var v = entry[1]; // current prop value in newstate
    var prop = state[k],
        // old prop value
    nprop = v,
        // new prop value
    t_old = void 0,
        // type to be filled-in
    t_new = void 0;

    // use type-detect library to get type
    t_old = TYPEOF(prop);
    t_new = TYPEOF(nprop);

    // A BUNCH OF SPECIAL CASE CHECKS //
    if (t_old === 'undefined' || t_old === 'null') {
      // if the value doesn't exist in current state
      // just update with new prop
      prop = nprop;
    } else if (t_old === t_new) {
      // if there is a type match, then figure
      // out how to merge based on type
      switch (t_old) {
        case 'Object':
          if (DBG) console.log("merge objects");
          // merge object props
          prop = Object.assign(prop, nprop);
          break;
        case 'Array':
          // note uppercase (type-detect)
          if (DBG) console.log("merge arrays");
          // merge arrays no dupes (https://stackoverflow.com/a/36469404)
          // ES6 fanciness using destructuring (...) and Sets
          if (opt.merge) prop = [].concat(_toConsumableArray(new Set([].concat(_toConsumableArray(prop), _toConsumableArray(nprop)))));else if (opt.concat) prop = prop.concat(nprop);
          break;
        default:
          if (DBG) console.log("copy values");
          // just overwrite otherwise
          prop = nprop;
      } // end switch t_old
    } else {
      // if there is a type mismatch, write
      console.warn(WARN_PROP_MISMATCH + " key:" + k + "\n type '" + t_new + "' overwriting '" + t_old + "'");
      prop = nprop;
    }
    // update state place
    state[k] = prop;
  }); // end Object.entries

  return state;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Retrieve the emitter associated with a namespace, which contains handles
    all the listeners associated with a namespace. Always returns a valid
    emitter, creating it if the passed namespace is valid.
/*/function m_GetStateMessager(nspace) {
  nspace = m_ConformNamespace(nspace);
  if (!nspace) throw Error(BAD_NSPACE);
  var msgr = STATES_LISTEN.get(nspace);
  if (!msgr) {
    msgr = new Messager();
    STATES_LISTEN.set(nspace, msgr);
  }
  return msgr;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ API: update the selected namespace state with new state
/*/USTATE.SetState = function (namespace, newState, src_uid) {
  namespace = m_ConformNamespace(namespace);
  if (!namespace) throw Error(BAD_NSPACE);
  // update old state by partially overwrite of state
  if (!STATES.has(namespace)) STATES.set(namespace, {});
  Object.assign(STATES.get(namespace), newState);
  // forward new state to namespace listeners
  var msgr = m_GetStateMessager(namespace);
  // don't pass with source_id because state should go everywhere
  // a register exists, even if it's the originating module
  msgr.Send(namespace, newState, { type: 'state', toLocal: true, toNet: false });
  // future: forward also to network
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ API: merge objects and arrays in state
/*/USTATE.MergeState = function (namespace, newState, src_uid) {
  namespace = m_ConformNamespace(namespace);
  if (!namespace) throw Error(BAD_NSPACE);
  // update old state by partially overwrite of state
  if (!STATES.has(namespace)) STATES.set(namespace, {});

  // merge the states with no duplicates in arrays
  var state = m_ConformState(namespace, newState, { merge: true });

  // update the namespace
  STATES.set(namespace, state);

  // forward new state to namespace listeners
  var msgr = m_GetStateMessager(namespace);
  // don't pass with source_id because state should go everywhere
  // a register exists, even if it's the originating module
  msgr.Send(namespace, newState, { type: 'state', toLocal: true, toNet: false });
  // future: forward also to network
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ API: merge objects and concat arrays in state
/*/USTATE.ConcatState = function (namespace, newState, src_uid) {
  namespace = m_ConformNamespace(namespace);
  if (!namespace) throw Error(BAD_NSPACE);
  // update old state by partially overwrite of state
  if (!STATES.has(namespace)) STATES.set(namespace, {});

  // merge the states with no duplicates in arrays
  var state = m_ConformState(namespace, newState, { concat: true });

  // update the namespace
  STATES.set(namespace, state);

  // forward new state to namespace listeners
  var msgr = m_GetStateMessager(namespace);
  // don't pass with source_id because state should go everywhere
  // a register exists, even if it's the originating module
  msgr.Send(namespace, newState, { type: 'state', toLocal: true, toNet: false });
  // future: forward also to network
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ API: retrieve a COPY of state object of namespace
/*/USTATE.State = function (namespace) {
  namespace = m_ConformNamespace(namespace);
  if (!namespace) throw Error(BAD_NSPACE);
  return Object.assign({}, STATES.get(namespace));
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ API: subscribe to namestate updates
/*/USTATE.OnStateChange = function (namespace, listener, src_uid) {
  namespace = m_ConformNamespace(namespace);
  if (!namespace) throw Error(BAD_NSPACE);
  if (typeof listener !== 'function') throw Error(BAD_LISTENR);
  if (src_uid === undefined) console.warn(NO_UID_FLTR);
  var namespaceMessager = m_GetStateMessager(namespace);
  namespaceMessager.HandleMessage(namespace, listener, { handlerUID: src_uid });
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ API: unsubscribe to namestate updates
/*/USTATE.OffStateChange = function (namespace, listener) {
  namespace = m_ConformNamespace(namespace);
  if (!namespace) throw Error(BAD_NSPACE);
  if (typeof listener !== 'function') throw Error(BAD_LISTENR);
  var namespaceMessager = m_GetStateMessager(namespace);
  namespaceMessager.UnhandleMessage(namespace, listener);
};

/// EXPORT CLASS DEFINITION ///////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
module.exports = USTATE;
});

require.register("unisys/client.js", function(exports, require, module) {
"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

if (window.NC_DBG) console.log("inc " + module.id);
/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

    This is the main browser client UNISYS module, which implements:

      LIFECYCLE - a promise-based hooked run order system
      MESSAGING - a networked remote procedure call/event system
      STATE     - a networked global application state system

    UNISYS is designed to work with React or our own module system:
    for modules:
      UMOD = UNISYS.NewModule()
      UDATA = UNISYS.NewDataLink(UMOD)
    for React:
      COMPONENT = class MyComponent extends UNISYS.Component

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

var DBG = {
  hook: false
};

/// CLASSES ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var UniData = require("unisys/client-datalink-class");
var UniModule = require("unisys/client-module-class");
var UniComponent = require("unisys/client-react-component");

/// LIBRARIES /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var SETTINGS = require("settings");
var LIFECYCLE = require("unisys/client-lifecycle");
var STATE = require("unisys/client-state");
var NETWORK = require("unisys/client-network");
var PROMPTS = require("system/util/prompts");
var PR = PROMPTS.Pad("UNISYS");

/// INITIALIZE MAIN MODULE ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var UNISYS = new UniModule(module.id);
var UDATA = new UniData(UNISYS);

/// UNISYS MODULE MAKING //////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ API: Make new module with UNISYS convenience methods
/*/UNISYS.NewModule = function (uniqueName) {
  return new UniModule(uniqueName);
};

/// UNISYS CONNECTOR //////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ API: Make new module with UNISYS convenience methods
/*/UNISYS.NewDataLink = function (module, optName) {
  return new UniData(module, optName);
};

/// UNISYS MESSAGE REGISTRATION ///////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
UNISYS.RegisterMessagesPromise = function () {
  var messages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  if (NETWORK.IsStandaloneMode()) {
    console.warn(PR, "STANDALONE MODE: RegisterMessagesPromise() suppressed!");
    return Promise.resolve();
  }
  if (messages.length) {
    try {
      messages = UniData.ValidateMessageNames(messages);
    } catch (e) {
      console.error(e);
    }
  } else {
    messages = UniData.MessageNames();
  }
  return new Promise(function (resolve, reject) {
    UDATA.Call("SRV_REG_HANDLERS", { messages: messages }).then(function (data) {
      resolve(data);
    });
  });
};

/// LIFECYCLE METHODS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ API: LIFECYCLE Hook() functions
/*/
UNISYS.Hook = function (phase, f) {
  if (typeof phase !== "string") throw Error("arg1 is phase as string");
  if (typeof f !== "function") throw Error("arg2 is function callback");
  LIFECYCLE.Hook(phase, f, UNISYS.ModuleID()); // pass phase and hook function
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ API: System Initialize
/*/
UNISYS.SystemInitialize = function (module_id) {
  UNISYS.SetScope(module_id);
  SETTINGS.ForceReloadSingleApp();
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ API HELPER: LIFECYCLE Scope() functions
    The 'scope' is used by LIFECYCLE to determine what modules implementing
    various HOOKS will be called. The root_module_id is a path that will
    be considered the umbrella of "allowed to hook" modules. For REACT apps,
    this is the root directory of the root view component. Additionally,
    the unisys and system directories are allowed to run their hooks
/*/UNISYS.SetScope = function (root_module_id) {
  LIFECYCLE.SetScope(root_module_id); // pass phase and hook function
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ API HELPER: SETTINGS ForceReloadSingleApp
    checks to see if settings flag is "dirty"; if it is, then reload the
    location to ensure no linger apps are running in the background. Yes
    this is a bit of a hack.
/*/
UNISYS.ForceReloadOnNavigation = function () {
  SETTINGS.ForceReloadOnNavigation();
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ API HELPER: return TRUE if passed module.id is within the current set
    scope
/*/
UNISYS.InScope = function (module_id) {
  var currentScope = LIFECYCLE.Scope();
  return module_id.includes(currentScope);
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ API: application startup
/*/
UNISYS.EnterApp = function () {
  return new Promise(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return LIFECYCLE.Execute("TEST_CONF");

            case 3:
              _context.next = 5;
              return LIFECYCLE.Execute("INITIALIZE");

            case 5:
              _context.next = 7;
              return LIFECYCLE.Execute("LOADASSETS");

            case 7:
              _context.next = 9;
              return LIFECYCLE.Execute("CONFIGURE");

            case 9:
              // CONFIGURE support modules
              resolve();
              _context.next = 16;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](0);

              console.error("EnterApp() Lifecycle Error. Check phase execution order effect on data validity.\n", _context.t0);
              debugger;

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 12]]);
    }));

    return function (_x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }());
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ API: call this when the view system's DOM has stabilized and is ready
    for manipulation by other code
/*/
UNISYS.SetupDOM = function () {
  return new Promise(function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve, reject) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return LIFECYCLE.Execute("DOM_READY");

            case 3:
              // GUI layout has finished composing
              resolve();
              _context2.next = 10;
              break;

            case 6:
              _context2.prev = 6;
              _context2.t0 = _context2["catch"](0);

              console.error("SetupDOM() Lifecycle Error. Check phase execution order effect on data validity.\n", _context2.t0);
              debugger;

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[0, 6]]);
    }));

    return function (_x4, _x5) {
      return _ref2.apply(this, arguments);
    };
  }());
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ API: network startup
/*/
UNISYS.JoinNet = function () {
  return new Promise(function (resolve, reject) {
    try {
      NETWORK.Connect(UDATA, { success: resolve, failure: reject });
    } catch (e) {
      console.error("EnterNet() Lifecycle Error. Check phase execution order effect on data validity.\n", e);
      debugger;
    }
  });
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ API: configure system before run
/*/
UNISYS.SetupRun = function () {
  return new Promise(function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(resolve, reject) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return LIFECYCLE.Execute("RESET");

            case 3:
              _context3.next = 5;
              return LIFECYCLE.Execute("START");

            case 5:
              _context3.next = 7;
              return LIFECYCLE.Execute("APP_READY");

            case 7:
              _context3.next = 9;
              return LIFECYCLE.Execute("RUN");

            case 9:
              // tell network APP_READY
              resolve();
              _context3.next = 16;
              break;

            case 12:
              _context3.prev = 12;
              _context3.t0 = _context3["catch"](0);

              console.error("SetupRun() Lifecycle Error. Check phase execution order effect on data validity.\n", _context3.t0);
              debugger;

            case 16:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, undefined, [[0, 12]]);
    }));

    return function (_x6, _x7) {
      return _ref3.apply(this, arguments);
    };
  }());
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ API: handle periodic updates for a simulation-driven timestep
/*/
UNISYS.Run = function () {
  return new Promise(function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(resolve, reject) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return LIFECYCLE.Execute("UPDATE");

            case 3:
              resolve();
              _context4.next = 9;
              break;

            case 6:
              _context4.prev = 6;
              _context4.t0 = _context4["catch"](0);

              console.error(_context4.t0);

            case 9:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, undefined, [[0, 6]]);
    }));

    return function (_x8, _x9) {
      return _ref4.apply(this, arguments);
    };
  }());
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ API: do the Shutdown lifecycle
    NOTE ASYNC ARROW FUNCTION (necessary?)
/*/
UNISYS.BeforePause = function () {
  return new Promise(function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(resolve, reject) {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return LIFECYCLE.Execute("PREPAUSE");

            case 2:
              resolve();

            case 3:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, undefined);
    }));

    return function (_x10, _x11) {
      return _ref5.apply(this, arguments);
    };
  }());
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ API: do the Shutdown lifecycle
    NOTE ASYNC ARROW FUNCTION (necessary?)
/*/
UNISYS.Paused = function () {
  return new Promise(function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(resolve, reject) {
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return LIFECYCLE.Execute("PAUSE");

            case 2:
              resolve();

            case 3:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, undefined);
    }));

    return function (_x12, _x13) {
      return _ref6.apply(this, arguments);
    };
  }());
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ API: do the Shutdown lifecycle
    NOTE ASYNC ARROW FUNCTION (necessary?)
/*/
UNISYS.PostPause = function () {
  return new Promise(function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(resolve, reject) {
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return LIFECYCLE.Execute("POSTPAUSE");

            case 2:
              resolve();

            case 3:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, undefined);
    }));

    return function (_x14, _x15) {
      return _ref7.apply(this, arguments);
    };
  }());
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ API: do the Shutdown lifecycle
    NOTE ASYNC ARROW FUNCTION (necessary?)
/*/
UNISYS.CleanupRun = function () {
  return new Promise(function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(resolve, reject) {
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return LIFECYCLE.Execute("STOP");

            case 2:
              resolve();

            case 3:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, undefined);
    }));

    return function (_x16, _x17) {
      return _ref8.apply(this, arguments);
    };
  }());
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ API: application offline
    NOTE ASYNC ARROW FUNCTION (necessary?)
/*/
UNISYS.ServerDisconnect = function () {
  return new Promise(function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(resolve, reject) {
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return LIFECYCLE.Execute("DISCONNECT");

            case 2:
              resolve();

            case 3:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, undefined);
    }));

    return function (_x18, _x19) {
      return _ref9.apply(this, arguments);
    };
  }());
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ API: application shutdown
    NOTE ASYNC ARROW FUNCTION (necessary?)
/*/
UNISYS.ExitApp = function () {
  return new Promise(function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(resolve, reject) {
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return LIFECYCLE.Execute("UNLOADASSETS");

            case 2:
              _context10.next = 4;
              return LIFECYCLE.Execute("SHUTDOWN");

            case 4:
              resolve();

            case 5:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, undefined);
    }));

    return function (_x20, _x21) {
      return _ref10.apply(this, arguments);
    };
  }());
};

/// NETWORK INFORMATION ///////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ return the current connected Socket Address (e.g. UADDR_12)
/*/
UNISYS.SocketUADDR = function () {
  return NETWORK.SocketUADDR();
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
UNISYS.IsStandaloneMode = function () {
  return NETWORK.IsStandaloneMode();
};

/// DATA LOGGING //////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ send a logging message
/*/
UNISYS.Log = function (event) {
  for (var _len = arguments.length, items = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    items[_key - 1] = arguments[_key];
  }

  if (typeof event !== "string") {
    console.error("UNISYS.Log( 'eventString', value, value, value... )");
  }
  UDATA.NetSignal("SRV_LOG_EVENT", { event: event, items: items });
};

/// REACT INTEGRATION /////////////////////////////////////////////////////////
/*/ return the referene to the UNISYS extension of React.Component
/*/
UNISYS.Component = UniComponent;

/// EXPORT MODULE DEFINITION //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
module.exports = UNISYS;
});

require.register("unisys/common-defs.js", function(exports, require, module) {
"use strict";

/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

    Store common system definitions here between client and server modules.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

var DBG = true;

/// LIBRARIES /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var DEFS = {};

/// EXPORT MODULE DEFINITION //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
module.exports = DEFS;
});

require.register("unisys/common-netmessage-class.js", function(exports, require, module) {
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** NetMessage ****************************************************************\

  NetMessage objects are sent between the browser and server as part of the
  UNISYS messaging system. Unlike NetMessages of the previous version of STEP,
  a NetMessage does not require addressing since the SERVER distributes
  messages to UNISYS addresses that have registered for them.

  The NetMessage declaration is SHARED in both node and browser javascript
  codebases.

  NetMessages also provide the data context for "transactions" of calls.
  The netmessage_id and data packet are used by the originating webapp
  to remember a sequence of callback functions. When a NetMessage is
  received with a seq_num > 0, it's assumed to be a return transaction,
  and its callback chain can be invoked. The data is forwarded to the
  callback. For more details, see the CallSequence class that manages
  the passing of data.

////////////////////////////////////////////////////////////////////////////////
/** MODULE DECLARATIONS *******************************************************/

var DBG = { send: false, transact: false };

var m_id_counter = 0;
var m_id_prefix = "PKT";
var m_transactions = {};
var m_netsocket = null;
var m_group_id = null;

var M_INIT = "init";
var M_ONLINE = "online";
var M_STANDALONE = "offline";
var M_CLOSED = "closed";
var M_ERROR = "error";
var m_mode = M_INIT;

// constants
var PROMPTS = require("../system/util/prompts");
var PR = PROMPTS.Pad("PKT");
var ERR = ":ERR:";
var ERR_NOT_NETMESG = ERR + PR + "obj does not seem to be a NetMessage";
var ERR_BAD_PROP = ERR + PR + "property argument must be a string";
var ERR_ERR_BAD_CSTR = ERR + PR + "constructor args are string, object";
var ERR_BAD_SOCKET = ERR + PR + "sender object must implement send()";
var ERR_DUPE_TRANS = ERR + PR + "this packet transaction is already registered!";
var ERR_NO_GLOB_UADDR = ERR + PR + "packet sending attempted before UADDR is set!";
var ERR_UNKNOWN_TYPE = ERR + PR + "packet type is unknown:";
var ERR_NOT_PACKET = ERR + PR + "passed object is not a NetMessage";
var ERR_UNKNOWN_RMODE = ERR + PR + "packet routine mode is unknown:";
var KNOWN_TYPES = ["msend", "msig", "mcall", "state"];
var ROUTING_MODE = ["req", "res"];

/// UNISYS NETMESSAGE CLASS ///////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ A UNetMessage encapsulates a specific message and data payload for sending
    across the network.
/*/

var NetMessage = function () {
  function NetMessage(msg, data, type) {
    _classCallCheck(this, NetMessage);

    // OPTION 1
    // create NetMessage from (generic object)
    if ((typeof msg === "undefined" ? "undefined" : _typeof(msg)) === "object" && data === undefined) {
      // make sure it has a msg and data obj
      if (typeof msg.msg !== "string" || _typeof(msg.data) !== "object") {
        throw ERR_NOT_NETMESG;
      }
      // merge properties into this new class instance and return it
      Object.assign(this, msg);
      m_SeqIncrement(this);
      return this;
    }
    // OPTION 2
    // create NetMessage from JSON-encoded string
    if (typeof msg === "string" && data === undefined) {
      var obj = JSON.parse(msg);
      Object.assign(this, obj);
      m_SeqIncrement(this);
      return this;
    }
    // OPTION 3
    // create new NetMessage from scratch (mesg,data)
    // unique id for every NetMessage
    if (typeof type === "string") m_CheckType(type);
    if (typeof msg !== "string" || (typeof data === "undefined" ? "undefined" : _typeof(data)) !== "object") {
      throw ERR_ERR_BAD_CSTR;
    }
    // allow calls with null data by setting to empty object
    this.data = data || {};
    this.msg = msg;
    // id and debugging memo support
    this.id = this.MakeNewID();
    this.rmode = ROUTING_MODE[0]; // is default 't_req' (trans request)
    this.type = type || KNOWN_TYPES[0]; // is default 'msend' (no return)
    this.memo = "";
    // transaction support
    this.seqnum = 0; // positive when part of transaction
    this.seqlog = []; // transaction log
    // addressing support
    this.s_uaddr = NetMessage.SocketUADDR() || null; // first originating uaddr set by SocketSend()
    this.s_group = null; // session groupid is set by external module once validated
    this.s_uid = null; // first originating UDATA srcUID
    // filtering support
  } // constructor

  /// ACCESSSOR METHODS ///////////////////////////////////////////////////////
  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  /*/ returns the type
  /*/


  _createClass(NetMessage, [{
    key: "Type",
    value: function Type() {
      return this.type;
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ returns true if type matches
    /*/

  }, {
    key: "IsType",
    value: function IsType(type) {
      return this.type === type;
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ returns the type
    /*/

  }, {
    key: "SetType",
    value: function SetType(type) {
      this.type = m_CheckType(type);
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ returns the message
    /*/

  }, {
    key: "Message",
    value: function Message() {
      return this.msg;
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ sets the message field
    /*/

  }, {
    key: "SetMessage",
    value: function SetMessage(msgstr) {
      this.msg = msgstr;
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ returns the entire data payload or the property within the data payload
        (can return undefined if property doesn't exist)
    /*/

  }, {
    key: "Data",
    value: function Data(prop) {
      if (!prop) return this.data;
      if (typeof prop === "string") return this.data[prop];
      throw ERR_BAD_PROP;
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ convenience method to set data object entirely
    /*/

  }, {
    key: "SetData",
    value: function SetData(propOrVal, val) {
      if ((typeof propOrVal === "undefined" ? "undefined" : _typeof(propOrVal)) === "object") {
        this.data = propOrVal;
        return;
      }
      if (typeof propOrVal === "string") {
        this.data[propOrVal] = val;
        return;
      }
      throw ERR_BAD_PROP;
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ returns truthy value (this.data) if the passed msgstr matches the
        message associated with this NetMessage
    /*/

  }, {
    key: "Is",
    value: function Is(msgstr) {
      return msgstr === this.msg ? this.data : undefined;
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ convenience function return true if server message
    /*/

  }, {
    key: "IsServerMessage",
    value: function IsServerMessage() {
      return this.msg.startsWith("SRV_");
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ getter/setter for the memo description field
    /*/

  }, {
    key: "Memo",
    value: function Memo() {
      return this.memo;
    }
  }, {
    key: "SetMemo",
    value: function SetMemo(memo) {
      this.memo = memo;
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ convenience function to return JSON version of this object
    /*/

  }, {
    key: "JSON",
    value: function (_JSON) {
      function JSON() {
        return _JSON.apply(this, arguments);
      }

      JSON.toString = function () {
        return _JSON.toString();
      };

      return JSON;
    }(function () {
      return JSON.stringify(this);
    })
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ return the session groupid (CLASS-PROJ-HASH) that's been set globally
    /*/

  }, {
    key: "SourceGroupID",
    value: function SourceGroupID() {
      return this.s_group;
    }

    /// TRANSACTION SUPPORT /////////////////////////////////////////////////////
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ The sequence number is positive if this packet is reused
    /*/

  }, {
    key: "SeqNum",
    value: function SeqNum() {
      return this.seqnum;
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ Return the originating address of this netmessage packet. It is valid
        only after the packet has been sent at least once.
    /*/

  }, {
    key: "SourceAddress",
    value: function SourceAddress() {
      // is this packet originating from server to a remote?
      if (this.s_uaddr === NetMessage.DefaultServerUADDR() && !this.msg.startsWith("SVR_")) {
        return this.s_uaddr;
      }
      // this is a regular message forward to remote handlers
      return this.IsTransaction() ? this.seqlog[0] : this.s_uaddr;
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  }, {
    key: "CopySourceAddress",
    value: function CopySourceAddress(pkt) {
      if (pkt.constructor.name !== "NetMessage") throw Error(ERR_NOT_PACKET);
      this.s_uaddr = pkt.SourceAddress();
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ return an informational string about the packet useful for logging
    /*/

  }, {
    key: "Info",
    value: function Info(key) {
      switch (key) {
        case "src": /* falls-through */
        default:
          return this.SourceGroupID() ? this.SourceAddress() + " [" + this.SourceGroupID() + "]" : "" + this.SourceAddress();
      }
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  }, {
    key: "MakeNewID",
    value: function MakeNewID() {
      var idStr = (++m_id_counter).toString();
      this.id = m_id_prefix + idStr.padStart(5, "0");
      return this.id;
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ Send packet on either provided socket or default socket. Servers provide
        the socket because it's handling multiple sockets from different clients.
    /*/

  }, {
    key: "SocketSend",
    value: function SocketSend() {
      var socket = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : m_netsocket;

      if (m_mode === M_ONLINE || m_mode === M_INIT) {
        this.s_group = NetMessage.GlobalGroupID();
        var dst = socket.UADDR || "unregistered socket";
        if (!socket) throw Error("SocketSend(sock) requires a valid socket");
        if (DBG.send) {
          var status = "sending '" + this.Message() + "' to " + dst;
          console.log(PR, status);
        }
        // for server-side ws library, send supports a function callback
        // for WebSocket, this is ignored
        socket.send(this.JSON(), function (err) {
          if (err) console.error("\nsocket " + socket.UADDR + " reports error " + err + "\n");
        });
      } else if (m_mode !== M_STANDALONE) {
        console.log(PR, "SocketSend: Can't send because NetMessage mode is", m_mode);
      } else {
        console.warn(PR, "STANDALONE MODE: SocketSend() suppressed!");
      }
      // FYI: global m_netsocket is not defined on server, since packets arrive on multiple sockets
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ Create a promise to resolve when packet returns
    /*/

  }, {
    key: "QueueTransaction",
    value: function QueueTransaction() {
      var _this = this;

      var socket = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : m_netsocket;

      if (m_mode === M_STANDALONE) {
        console.warn(PR, "STANDALONE MODE: QueueTransaction() suppressed!");
        return Promise.resolve();
      }
      // global m_netsocket is not defined on server, since packets arrive on multiple sockets
      if (!socket) throw Error("QueueTransaction(sock) requires a valid socket");
      // save our current UADDR
      this.seqlog.push(NetMessage.UADDR);
      var dbg = DBG.transact && !this.IsServerMessage();
      var p = new Promise(function (resolve, reject) {
        var hash = m_GetHashKey(_this);
        if (m_transactions[hash]) {
          reject(Error(ERR_DUPE_TRANS + ":" + hash));
        } else {
          // save the resolve function in transactions table;
          // promise will resolve on remote invocation with data
          m_transactions[hash] = function (data) {
            if (dbg) {
              console.log(PR, "resolving promise with", JSON.stringify(data));
            }
            resolve(data);
          };
          _this.SocketSend(socket);
        }
      });
      return p;
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ return the 'routing mode':
          req/res is request/reply (message requests and optional response)
          f_req/f_res is forwarded request/reply (forwarded messages and optional return)
          the f_res is converted to res and sent back to original requester
    /*/

  }, {
    key: "RoutingMode",
    value: function RoutingMode() {
      return this.rmode;
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  }, {
    key: "IsRequest",
    value: function IsRequest() {
      return this.rmode === "req";
    }
  }, {
    key: "IsOwnResponse",
    value: function IsOwnResponse() {
      return this.rmode === "res";
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    /*/ If this packet is a returned transaction, then return true
    /*/

  }, {
    key: "IsTransaction",
    value: function IsTransaction() {
      return this.rmode !== ROUTING_MODE[0] && this.seqnum > 0 && this.seqlog[0] === NetMessage.UADDR;
    }
    ///	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/	update the sequence metadata and return on same socket
    /*/

  }, {
    key: "ReturnTransaction",
    value: function ReturnTransaction() {
      var socket = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : m_netsocket;

      // global m_netsocket is not defined on server, since packets arrive on multiple sockets
      if (!socket) throw Error("ReturnTransaction(sock) requires a valid socket");
      // note: seqnum is already incremented by the constructor if this was
      // a received packet
      // add this to the sequence log
      this.seqlog.push(NetMessage.UADDR);
      this.rmode = m_CheckRMode("res");
      this.SocketSend(socket);
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ If this is a transaction packet that is returned, then execute the stored
        resolver function from the promise stored in m_transactions, which will
        then trigger .then() following any calls
    /*/

  }, {
    key: "CompleteTransaction",
    value: function CompleteTransaction() {
      var dbg = DBG.transact && !this.IsServerMessage();
      var hash = m_GetHashKey(this);
      var resolverFunc = m_transactions[hash];
      if (dbg) console.log(PR, "CompleteTransaction", hash);
      if (typeof resolverFunc !== "function") {
        throw Error("transaction [" + hash + "] resolverFunction is type " + (typeof resolverFunc === "undefined" ? "undefined" : _typeof(resolverFunc)));
      } else {
        resolverFunc(this.data);
        Reflect.deleteProperty(m_transactions[hash]);
      }
    }
  }]);

  return NetMessage;
}(); // class NetMessage

/// STATIC CLASS METHODS //////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ set the NETWORK interface object that implements Send()
    This class operates both under the server and the client.
    This is a client feature.
/*/


NetMessage.GlobalSetup = function (config) {
  var netsocket = config.netsocket,
      uaddr = config.uaddr;

  if (uaddr) NetMessage.UADDR = uaddr;
  // NOTE: m_netsocket is set only on clients since on server, there are multiple sockets
  if (netsocket) {
    if (typeof netsocket.send !== "function") throw ERR_BAD_SOCKET;
    console.log(PR, "GlobalSetup: netsocket set, mode online");
    m_netsocket = netsocket;
    m_mode = M_ONLINE;
  }
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ cleanup any allocated storage. This class operates both under the
    server and the client. This is a client feature.
/*/
NetMessage.GlobalCleanup = function () {
  if (m_netsocket) {
    console.log(PR, "GlobalCleanup: deallocating netsocket, mode closed");
    m_netsocket = null;
    m_mode = M_CLOSED;
  }
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ cleanup any allocated storage internally. This class operates both under the
    server and the client. This is a client feature.
/*/
NetMessage.GlobalOfflineMode = function () {
  m_mode = M_STANDALONE;
  if (m_netsocket) {
    console.warn(PR, "STANDALONE MODE: NetMessage disabling network");
    m_netsocket = null;
    var event = new CustomEvent("UNISYSDisconnect", {});
    console.log("dispatching event to", document, event);
    document.dispatchEvent(event);
  }
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ return the address (socket_id) assigned to this app instance
/*/
NetMessage.SocketUADDR = function () {
  return NetMessage.UADDR;
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Return a default server UADDR
/*/
NetMessage.DefaultServerUADDR = function () {
  return "SVR_01";
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Return current SessionID string
/*/
NetMessage.GlobalGroupID = function () {
  return m_group_id;
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
NetMessage.GlobalSetGroupID = function (token) {
  m_group_id = token;
};

/// PRIVATE CLASS HELPERS /////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ when a packet is reconstructed from an existing object or json string,
    its sequence number is incremented, and the old source uaddr is pushed
    onto the seqlog stack.
/*/
function m_SeqIncrement(pkt) {
  pkt.seqnum++;
  return pkt;
}
///	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/	return the hash used for storing transaction callbacks
/*/
function m_GetHashKey(pkt) {
  var hash = pkt.SourceAddress() + ":" + pkt.id;
  return hash;
}
///	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ is this an allowed type? throw error if not
/*/
function m_CheckType(type) {
  if (type === undefined) {
    throw new Error("must pass a type string, not " + type);
  }
  if (!KNOWN_TYPES.includes(type)) throw ERR_UNKNOWN_TYPE + " '" + type + "'";
  return type;
}
///	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ is this an allowed mode? throw error if not
/*/
function m_CheckRMode(mode) {
  if (mode === undefined) {
    throw new Error("must pass a mode string, not " + mode);
  }
  if (!ROUTING_MODE.includes(mode)) throw ERR_UNKNOWN_RMODE + " '" + mode + "'";
  return mode;
}

/// EXPORT CLASS DEFINITION ///////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
module.exports = NetMessage;
});

require.register("unisys/common-session.js", function(exports, require, module) {
"use strict";

/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

    Session Utilities
    collection of session-related data structures

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

/// DEBUGGING /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var DBG = false;
//
var PROMPTS = require("../system/util/prompts");
var PR = PROMPTS.Pad("SESSUTIL");

/// SYSTEM LIBRARIES //////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var HashIds = require("hashids");

/// MODULE DEFS ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var SESUTIL = {};
var HASH_ABET = "ABCDEFGHIJKLMNPQRSTVWXYZ23456789";
var HASH_MINLEN = 3;
var m_current_groupid = null;

/// SESSION ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Given a token of form CLASS-PROJECT-HASHEDID, return an object
    containing as many decoded values as possible. Check isValid for
    complete decode succes. groupId is also set if successful
/*/
SESUTIL.DecodeToken = function (token) {
  if (token === undefined) return {};
  var tokenBits = token.split("-");
  var classId = void 0,
      projId = void 0,
      hashedId = void 0,
      groupId = void 0,
      subId = void 0,
      isValid = void 0;
  // optimistically set valid flag to be negated on failure
  isValid = true;
  // check for superficial issues
  if (token.substr(-1) === "-") {
    isValid = false;
  }
  // token is of form CLS-PRJ-HASHEDID
  // classId, etc will be partially set and returned
  if (tokenBits[0]) classId = tokenBits[0].toUpperCase();
  if (tokenBits[1]) projId = tokenBits[1].toUpperCase();
  if (tokenBits[2]) hashedId = tokenBits[2].toUpperCase();
  if (tokenBits[3]) subId = tokenBits[3].toUpperCase();
  // initialize hashid structure
  var salt = "" + classId + projId;
  var hashids = new HashIds(salt, HASH_MINLEN, HASH_ABET);
  // try to decode the groupId
  groupId = hashids.decode(hashedId)[0];
  // invalidate if groupId isn't an integer
  if (!Number.isInteger(groupId)) {
    if (DBG) console.error("invalid token");
    isValid = false;
    groupId = 0;
  }
  // invalidate if groupId isn't non-negative integer
  if (groupId < 0) {
    if (DBG) console.error("decoded token, but value out of range <0");
    isValid = false;
    groupId = 0;
  }

  // at this point groupId is valid (begins with ID, all numeric)
  // check for valid subgroupId
  if (subId) {
    if (subId.length > 2 && subId.indexOf("ID") === 0 && /^\d+$/.test(subId.substring(2))) {
      if (DBG) console.log("detected subid", subId.substring(2));
      // subId contains a string "ID<N>" where <N> is an integer
    } else {
      // subId exists but didn't match subid format
      if (DBG) console.log("invalid subId string", subId);
      isValid = false; // groupId is still valid,
      subId = 0;
    }
  }

  // if isValid is false, check groupId is 0 or subId is 0, indicating error
  var decoded = { token: token, isValid: isValid, classId: classId, projId: projId, hashedId: hashedId, groupId: groupId, subId: subId };
  return decoded;
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Return TRUE if the token decodes into an expected range of values
/*/
SESUTIL.IsValidToken = function (token) {
  var decoded = SESUTIL.DecodeToken(token);
  return decoded && Number.isInteger(decoded.groupId);
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Returns a token string of form CLASS-PROJECT-HASHEDID
    classId and projId should be short and are case-insensitive.
    groupId must be a non-negative integer
/*/
SESUTIL.MakeToken = function (classId, projId, groupId) {
  // type checking
  if (typeof classId !== "string") throw Error("classId arg1 '" + classId + "' must be string");
  if (typeof projId !== "string") throw Error("projId arg2 '" + projId + "' must be string");
  if (classId.length < 1) throw Error("classId arg1 length should be 1 or more");
  if (projId.length < 1) throw Error("projId arg2 length should be 1 or more");
  if (!Number.isInteger(groupId)) throw Error("groupId arg3 '" + groupId + "' must be integer");
  if (groupId < 0) throw Error("groupId arg3 must be non-negative integer");
  if (groupId > Number.MAX_SAFE_INTEGER) throw Error("groupId arg3 value exceeds MAX_SAFE_INTEGER");
  // initialize hashid structure
  classId = classId.toUpperCase();
  projId = projId.toUpperCase();
  var salt = "" + classId + projId;
  var hashids = new HashIds(salt, HASH_MINLEN, HASH_ABET);
  var hashedId = hashids.encode(groupId);
  return classId + "-" + projId + "-" + hashedId;
};

/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Set the global GROUPID, which is included in all NetMessage
    packets that are sent to server.
/*/
SESUTIL.SetGroupID = function (token) {
  var good = SESUTIL.DecodeToken(token).isValid;
  if (good) m_current_groupid = token;
  return good;
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
SESUTIL.GroupID = function () {
  return m_current_groupid;
};

/// EXPORT MODULE /////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
module.exports = SESUTIL;
});

require.register("unisys/component/SessionShell.jsx", function(exports, require, module) {
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (window.NC_DBG) console.log("inc " + module.id);
/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

    SessionShell handles route-based parameters in ReactRouter and updates
    the SESSION manager with pertinent information

    The component stores the credentials
      classId  : null,
      projId   : null,
      hashedId : null,
      groupId  : null,
      isValid  : false

    render() calls one of the following depending on the state of
    SESSION.DecodeToken( token ). It returns an object is isValid prop set.
    The token is read from this.props.match.params.token, which is provided
    by ReactRouter.

      renderLoggedIn( decoded ) contains an object with the decoded properties
      from the original string, and displays the login state

      renderLogin() shows the login text field.

    When text is changing in Login Field, this.handleChange() is called.
    It gets the value and runs SESSION.DecodeToken() on it.
    It then uses Unisys.SetAppState to set "SESSION" to the decoded value.
    if a groupId is detected, then it forces a redirect.

    TODO: if an invalid URL is entered, should reset

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

/// DEBUGGING /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var DBG = true;

/// LIBRARIES /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var React = require("react");
var PROMPTS = require("system/util/prompts");
var SESSION = require("unisys/common-session");
var PR = PROMPTS.Pad("SessionShell");
var ReactStrap = require("reactstrap");
var InputGroup = ReactStrap.InputGroup,
    InputGroupAddon = ReactStrap.InputGroupAddon,
    Button = ReactStrap.Button,
    Col = ReactStrap.Col,
    Row = ReactStrap.Row,
    Form = ReactStrap.Form,
    FormGroup = ReactStrap.FormGroup,
    FormFeedback = ReactStrap.FormFeedback,
    Input = ReactStrap.Input,
    Label = ReactStrap.Label;

var _require = require("react-router-dom"),
    Redirect = _require.Redirect;

var UNISYS = require("unisys/client");

/// CONSTANTS /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// these styles are copied from AutoComplete.css
var INPUT_STYLE = {
  border: "1px solid #aaa",
  fontFamily: "Helvetica, sans-serif",
  fontWeight: 300,
  fontSize: "10px",
  textAlign: "right",
  textTransform: "uppercase"
};
var GROUP_STYLE = {
  backgroundColor: "#777",
  color: "white",
  marginTop: "-10px"
};
var LABEL_STYLE = {
  verticalAlign: "top",
  marginBottom: "0.15rem",
  marginTop: "0.15rem"
};

/// REACT COMPONENT ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var SessionShell = function (_UNISYS$Component) {
  _inherits(SessionShell, _UNISYS$Component);

  function SessionShell() {
    var _this$state;

    _classCallCheck(this, SessionShell);

    var _this = _possibleConstructorReturn(this, (SessionShell.__proto__ || Object.getPrototypeOf(SessionShell)).call(this));

    _this.renderLogin = _this.renderLogin.bind(_this);
    _this.renderLoggedIn = _this.renderLoggedIn.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    _this.onSubmit = _this.onSubmit.bind(_this);
    _this.state = (_this$state = {
      token: null,
      classId: null,
      projId: null,
      hashedId: null,
      subId: null,
      groupId: null
    }, _defineProperty(_this$state, "subId", null), _defineProperty(_this$state, "isValid", false), _this$state);

    return _this;
  }

  /// ROUTE RENDER FUNCTIONS ////////////////////////////////////////////////////
  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  /*/ render successful logged-in
  /*/


  _createClass(SessionShell, [{
    key: "renderLoggedIn",
    value: function renderLoggedIn(decoded) {
      if (decoded) {
        var classproj = decoded.classId + "-" + decoded.projId;
        // prefix with unicode non-breaking space
        var gid = "\xA0" + decoded.groupId;
        var subid = decoded.subId ? "USER\xA0" + decoded.subId : "";
        return React.createElement(
          FormGroup,
          { row: true, style: GROUP_STYLE },
          React.createElement(
            Col,
            { sm: 3 },
            React.createElement(
              Label,
              { style: LABEL_STYLE, className: "small" },
              "GROUP",
              gid,
              React.createElement("br", null),
              subid
            )
          ),
          React.createElement(
            Col,
            { sm: 9, className: "text-right" },
            React.createElement(
              Label,
              { style: LABEL_STYLE, className: "small" },
              classproj,
              "-",
              React.createElement(
                "strong",
                null,
                decoded.hashedId
              )
            )
          )
        );
      } else {
        return React.createElement(
          "p",
          null,
          "ERROR:renderLoggedIn didn't get valid decoded object"
        );
      }
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ render must login (readonly)
    /*/

  }, {
    key: "renderLogin",
    value: function renderLogin() {
      var _state = this.state,
          token = _state.token,
          classId = _state.classId,
          projId = _state.projId,
          groupId = _state.groupId,
          subId = _state.subId,
          hashedId = _state.hashedId,
          isValid = _state.isValid;

      if (token) token = token.toUpperCase();
      var formFeedback = void 0,
          tip = void 0,
          input = void 0;
      tip = "type group ID";
      if (classId) tip = "scanning for valid code...";
      if (projId) tip = "waiting for valid code...";
      if (groupId) tip = "waiting for extra ID...";
      if (hashedId) {
        if (hashedId.length >= 3) {
          if (!groupId) tip = "'" + token + "' is an invalid code";else {
            if (subId) tip = "login in as GROUP " + groupId + " " + subId;else tip = "login as GROUP " + groupId + " or add -ID<num>";
          }
        }
      }
      if (groupId) {
        if (subId === 0) {
          tip = "e.g. " + classId + "-" + projId + "-" + hashedId + " followed by -ID<num>";
          input = React.createElement(Input, { invalid: true, name: "sessionToken", id: "sessionToken", bsSize: "sm", style: INPUT_STYLE, className: "text-right", placeholder: "CLASSID-PROJID-CODE", onChange: this.handleChange });
          formFeedback = React.createElement(
            FormFeedback,
            { className: "text-right" },
            React.createElement(
              "small",
              null,
              tip
            )
          );
        } else {
          input = React.createElement(Input, { valid: true, name: "sessionToken", id: "sessionToken", bsSize: "sm", style: INPUT_STYLE, className: "text-right", placeholder: "CLASSID-PROJID-CODE", onChange: this.handleChange });
          formFeedback = React.createElement(
            FormFeedback,
            { valid: true, className: "text-right" },
            React.createElement(
              "small",
              null,
              tip
            )
          );
        }
      } else {
        input = React.createElement(Input, { invalid: true, name: "sessionToken", id: "sessionToken", bsSize: "sm", style: INPUT_STYLE, className: "text-right", placeholder: "CLASSID-PROJID-CODE", onChange: this.handleChange });
        formFeedback = React.createElement(
          FormFeedback,
          { className: "text-right" },
          React.createElement(
            "small",
            null,
            tip
          )
        );
      }

      return React.createElement(
        Form,
        { onSubmit: this.onSubmit },
        React.createElement(
          FormGroup,
          { row: true },
          React.createElement(
            Col,
            null,
            React.createElement(
              InputGroup,
              null,
              React.createElement(
                InputGroupAddon,
                { addonType: "prepend" },
                React.createElement(
                  Button,
                  { style: { fontSize: '10px' }, color: "secondary", size: "sm", disabled: !isValid, onSubmit: this.onSubmit },
                  "LOGIN"
                )
              ),
              input,
              formFeedback
            )
          )
        )
      );
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      // the code below reads a pre-existing matching path, which may be set
      // to a valid token string AFTER the changeHandler() detected a valid
      // login after a ForceReload. This is a bit hacky and the app would benefit
      // from not relying on forced reloads. See handleChange().
      var token = this.props.match.params.token;
      var decoded = SESSION.DecodeToken(token) || {};
      this.SetAppState("SESSION", decoded);
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ Main Render Function
    /*/
  }, {
    key: "render",
    value: function render() {
      // FUN FACTS
      // this.state set in constructor
      // this.props.history, location, match added by withRouter(AppShell)
      // way back in init-appshell.jsx

      // if standalone mode, no login possible
      if (UNISYS.IsStandaloneMode()) {
        var _window$NC_UNISYS$sta = window.NC_UNISYS.standalone,
            prompt = _window$NC_UNISYS$sta.prompt,
            timestamp = _window$NC_UNISYS$sta.timestamp;

        return React.createElement(
          FormGroup,
          { row: true, style: GROUP_STYLE },
          React.createElement(
            Col,
            { sm: 9 },
            React.createElement(
              Label,
              { style: LABEL_STYLE, className: "small" },
              prompt
            )
          ),
          React.createElement(
            Col,
            { sm: 3, className: "text-right" },
            React.createElement(
              Label,
              { style: LABEL_STYLE, className: "small" },
              timestamp
            )
          )
        );
      }
      // no token so just render login
      var token = this.props.match.params.token;
      if (!token) return this.renderLogin();
      // try to decode token
      var decoded = SESSION.DecodeToken(token);
      if (decoded.isValid) {
        return this.renderLoggedIn(decoded);
      } else {
        return this.renderLogin(token);
      }
    }

    /// EVENT HANDLERS ////////////////////////////////////////////////////////////
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  }, {
    key: "handleChange",
    value: function handleChange(event) {
      var token = event.target.value;
      var decoded = SESSION.DecodeToken(token);
      var classId = decoded.classId,
          projId = decoded.projId,
          hashedId = decoded.hashedId,
          subId = decoded.subId,
          groupId = decoded.groupId;

      this.setState(decoded);
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  }, {
    key: "onSubmit",
    value: function onSubmit(event) {
      event.preventDefault();
      var BRUTAL_REDIRECT = true;
      if (this.state.isValid) {
        // force a page URL change
        if (BRUTAL_REDIRECT) {
          var redirect = "/#/edit/" + this.state.token;
          window.location = redirect;
        } else {
          var _redirect = "/edit/" + this.state.token;
          this.props.history.push(_redirect);
        }
      }
      /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    }
  }]);

  return SessionShell;
}(UNISYS.Component); // UNISYS.Component SessionShell

/// EXPORT REACT COMPONENT ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


module.exports = SessionShell;
});

require.register("unisys/server-database.js", function(exports, require, module) {
"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

DATABASE SERVER

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

var DBG = false;

/// LOAD LIBRARIES ////////////////////////////////////////////////////////////
/// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
var Loki = require("lokijs");
var PATH = require("path");
var FS = require("fs-extra");

/// CONSTANTS /////////////////////////////////////////////////////////////////
/// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
var SESSION = require("../unisys/common-session");
var LOGGER = require("../unisys/server-logger");
var PROMPTS = require("../system/util/prompts");
var PR = PROMPTS.Pad("ServerDB");
var DB_FILE = "./runtime/netcreate.loki";
var DB_CLONEMASTER = "blank.loki";

/// MODULE-WIDE VARS //////////////////////////////////////////////////////////
/// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
var m_options = void 0; // saved initialization options
var m_db = void 0; // loki database
var m_max_edgeID = void 0;
var m_max_nodeID = void 0;
var m_dupe_set = void 0; // set of nodeIDs for determine whether there are duplicates
var NODES = void 0; // loki "nodes" collection
var EDGES = void 0; // loki "edges" collection
var m_locked_nodes = void 0;
var m_locked_edges = void 0;

/// API METHODS ///////////////////////////////////////////////////////////////
/// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
var DB = {};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ API: Initialize the database
/*/
DB.InitializeDatabase = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  FS.ensureDirSync(PATH.dirname(DB_FILE));
  if (!FS.existsSync(DB_FILE)) {
    console.log(PR, "NO EXISTING DATABASE " + DB_FILE + ", so creating BLANK DATABASE...");
  }
  var ropt = {
    autoload: true,
    autoloadCallback: f_DatabaseInitialize,
    autosave: true,
    autosaveCallback: f_AutosaveStatus,
    autosaveInterval: 4000 // save every four seconds
  };
  ropt = Object.assign(ropt, options);
  m_db = new Loki(DB_FILE, ropt);
  m_options = ropt;

  // callback on load
  function f_DatabaseInitialize() {
    // on the first load of (non-existent database), we will have no
    // collections so we can detect the absence of our collections and
    // add (and configure) them now.
    NODES = m_db.getCollection("nodes");
    if (NODES === null) NODES = m_db.addCollection("nodes");
    m_locked_nodes = new Set();
    EDGES = m_db.getCollection("edges");
    if (EDGES === null) EDGES = m_db.addCollection("edges");
    m_locked_edges = new Set();

    // initialize unique set manager
    m_dupe_set = new Set();
    var dupeNodes = [];

    // find highest NODE ID
    if (NODES.count() > 0) {
      m_max_nodeID = NODES.mapReduce(function (obj) {
        // side-effect: make sure ids are numbers
        m_CleanObjID('node.id', obj);
        // side-effect: check for duplicate ids
        if (m_dupe_set.has(obj.id)) {
          dupeNodes.push(obj);
        } else {
          m_dupe_set.add(obj.id);
        }
        // return value
        return obj.id;
      }, function (arr) {
        return Math.max.apply(Math, _toConsumableArray(arr));
      });
    } else {
      m_max_nodeID = 0;
    }
    // remap duplicate NODE IDs
    dupeNodes.forEach(function (obj) {
      m_max_nodeID += 1;
      LOGGER.Write(PR, "# rewriting duplicate nodeID " + obj.id + " to " + m_max_nodeID);
      obj.id = m_max_nodeID;
    });

    // find highest EDGE ID
    if (EDGES.count() > 0) {
      m_max_edgeID = EDGES.mapReduce(function (obj) {
        m_CleanObjID('edge.id', obj);
        m_CleanEdgeEndpoints(obj.id, obj);
        return obj.id;
      }, function (arr) {
        return Math.max.apply(Math, _toConsumableArray(arr));
      }); // end mapReduce edge ids
    } else {
      m_max_edgeID = 0;
    }
    console.log(PR, "DATABASE LOADED! m_max_nodeID '" + m_max_nodeID + "', m_max_edgeID '" + m_max_edgeID + "'");
    m_db.saveDatabase();

    if (typeof m_options.onLoadComplete === 'function') {
      m_options.onLoadComplete();
    }
  } // end f_DatabaseInitialize

  // UTILITY FUNCTION
  function f_AutosaveStatus() {
    var nodeCount = NODES.count();
    var edgeCount = EDGES.count();
    console.log(PR, "AUTOSAVING! " + nodeCount + " NODES / " + edgeCount + " EDGES <3");
  }
}; // InitializeDatabase()
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ API: load database
    note: InitializeDatabase() was already called on system initialization
    to populate the NODES and EDGES structures.
/*/
DB.PKT_GetDatabase = function (pkt) {
  var nodes = NODES.chain().data({ removeMeta: true });
  var edges = EDGES.chain().data({ removeMeta: true });
  if (DBG) console.log(PR, "PKT_GetDatabase " + pkt.Info() + " (loaded " + nodes.length + " nodes, " + edges.length + " edges)");
  LOGGER.Write(pkt.Info(), "getdatabase");
  return { nodes: nodes, edges: edges };
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ API: reset database from scratch
/*/
DB.PKT_SetDatabase = function (pkt) {
  if (DBG) console.log(PR, "PKT_SetDatabase");

  var _pkt$Data = pkt.Data(),
      _pkt$Data$nodes = _pkt$Data.nodes,
      nodes = _pkt$Data$nodes === undefined ? [] : _pkt$Data$nodes,
      _pkt$Data$edges = _pkt$Data.edges,
      edges = _pkt$Data$edges === undefined ? [] : _pkt$Data$edges;

  if (!nodes.length) console.log(PR, "WARNING: empty nodes array");else console.log(PR, "setting " + nodes.length + " nodes...");
  if (!edges.length) console.log(PR, "WARNING: empty edges array");else console.log(PR, "setting " + edges.length + " edges...");
  NODES.clear();
  NODES.insert(nodes);
  EDGES.clear();
  EDGES.insert(edges);
  console.log(PR, "PKT_SetDatabase complete. Data available on next get.");
  m_db.close();
  DB.InitializeDatabase();
  LOGGER.Write(pkt.Info(), "setdatabase");
  return { OK: true };
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
DB.PKT_GetNewNodeID = function (pkt) {
  m_max_nodeID += 1;
  if (DBG) console.log(PR, "PKT_GetNewNodeID " + pkt.Info() + " nodeID " + m_max_nodeID);
  return { nodeID: m_max_nodeID };
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
DB.PKT_GetNewEdgeID = function (pkt) {
  m_max_edgeID += 1;
  if (DBG) console.log(PR, "PKT_GetNewEdgeID " + pkt.Info() + " edgeID " + m_max_edgeID);
  return { edgeID: m_max_edgeID };
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
DB.PKT_RequestLockNode = function (pkt) {
  var _pkt$Data2 = pkt.Data(),
      nodeID = _pkt$Data2.nodeID;

  var errcode = m_IsInvalidNode(nodeID);
  if (errcode) return errcode;
  // check if node is already locked
  if (m_locked_nodes.has(nodeID)) return m_MakeLockError("nodeID " + nodeID + " is already locked");
  // SUCCESS
  // single matching node exists and is not yet locked, so lock it
  m_locked_nodes.add(nodeID);
  return { nodeID: nodeID, locked: true };
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
DB.PKT_RequestUnlockNode = function (pkt) {
  var _pkt$Data3 = pkt.Data(),
      nodeID = _pkt$Data3.nodeID;

  var errcode = m_IsInvalidNode(nodeID);
  if (errcode) return errcode;
  // check that node is already locked
  if (m_locked_nodes.has(nodeID)) {
    m_locked_nodes.delete(nodeID);
    return { nodeID: nodeID, unlocked: true };
  }
  // this is an error because nodeID wasn't in the lock table
  return m_MakeLockError("nodeID " + nodeID + " was not locked so can't unlock");
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function m_IsInvalidNode(nodeID) {
  if (!nodeID) return m_MakeLockError("undefined nodeID");
  nodeID = Number.parseInt(nodeID, 10);
  if (isNaN(nodeID)) return m_MakeLockError("nodeID was not a number");
  if (nodeID < 0) return m_MakeLockError("nodeID " + nodeID + " must be positive integer");
  if (nodeID > m_max_nodeID) return m_MakeLockError("nodeID " + nodeID + " is out of range");
  // find if the node exists
  var matches = NODES.find({ id: nodeID });
  if (matches.length === 0) return m_MakeLockError("nodeID " + nodeID + " not found");
  if (matches.length > 1) return m_MakeLockError("nodeID " + nodeID + " matches multiple entries...critical error!");
  // no retval is no error!
  return undefined;
}
function m_MakeLockError(info) {
  return { NOP: "ERR", INFO: info };
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
DB.PKT_RequestLockEdge = function (pkt) {
  var _pkt$Data4 = pkt.Data(),
      edgeID = _pkt$Data4.edgeID;

  var errcode = m_IsInvalidEdge(edgeID);
  if (errcode) return errcode;
  // check if edge is already locked
  if (m_locked_edges.has(edgeID)) return m_MakeLockError("edgeID " + edgeID + " is already locked");
  // SUCCESS
  // single matching edge exists and is not yet locked, so lock it
  m_locked_edges.add(edgeID);
  return { edgeID: edgeID, locked: true };
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
DB.PKT_RequestUnlockEdge = function (pkt) {
  var _pkt$Data5 = pkt.Data(),
      edgeID = _pkt$Data5.edgeID;

  var errcode = m_IsInvalidEdge(edgeID);
  if (errcode) return errcode;
  // check that edge is already locked
  if (m_locked_edges.has(edgeID)) {
    m_locked_edges.delete(edgeID);
    return { edgeID: edgeID, unlocked: true };
  }
  // this is an error because nodeID wasn't in the lock table
  return m_MakeLockError("edgeID " + edgeID + " was not locked so can't unlock");
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function m_IsInvalidEdge(edgeID) {
  if (!edgeID) return m_MakeLockError("undefined edgeID");
  edgeID = Number.parseInt(edgeID, 10);
  if (isNaN(edgeID)) return m_MakeLockError("edgeID was not a number");
  if (edgeID < 0) return m_MakeLockError("edgeID " + edgeID + " must be positive integer");
  if (edgeID > m_max_edgeID) return m_MakeLockError("edgeID " + edgeID + " is out of range");
  // find if the node exists
  var matches = EDGES.find({ id: edgeID });
  if (matches.length === 0) return m_MakeLockError("edgeID " + edgeID + " not found");
  if (matches.length > 1) return m_MakeLockError("edgeID " + edgeID + " matches multiple entries...critical error!");
  // no retval is no error!
  return undefined;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
DB.PKT_RequestUnlockAllNodes = function (pkt) {
  m_locked_nodes = new Set();
  return { unlocked: true };
};
DB.PKT_RequestUnlockAllEdges = function (pkt) {
  m_locked_edges = new Set();
  return { unlocked: true };
};
DB.PKT_RequestUnlockAll = function (pkt) {
  m_locked_nodes = new Set();
  m_locked_edges = new Set();
  return { unlocked: true };
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
DB.PKT_Update = function (pkt) {
  var _pkt$Data6 = pkt.Data(),
      node = _pkt$Data6.node,
      edge = _pkt$Data6.edge,
      nodeID = _pkt$Data6.nodeID,
      replacementNodeID = _pkt$Data6.replacementNodeID,
      edgeID = _pkt$Data6.edgeID;

  var retval = {};
  // PROCESS NODE INSERT/UPDATE
  if (node) {
    m_CleanObjID(pkt.Info() + " node.id", node);
    var matches = NODES.find({ id: node.id });
    if (matches.length === 0) {
      // if there was no node, then this is an insert new operation
      if (DBG) console.log(PR, "PKT_Update " + pkt.Info() + " INSERT nodeID " + JSON.stringify(node));
      LOGGER.Write(pkt.Info(), "insert node", node.id, JSON.stringify(node));
      DB.AppendNodeLog(node, pkt); // log GroupId to node stored in database
      NODES.insert(node);
      retval = { op: "insert", node: node };
    } else if (matches.length === 1) {
      // there was one match to update
      NODES.findAndUpdate({ id: node.id }, function (n) {
        if (DBG) console.log(PR, "PKT_Update " + pkt.Info() + " UPDATE nodeID " + node.id + " " + JSON.stringify(node));
        LOGGER.Write(pkt.Info(), "update node", node.id, JSON.stringify(node));
        DB.AppendNodeLog(n, pkt); // log GroupId to node stored in database
        Object.assign(n, node);
      });
      retval = { op: "update", node: node };
    } else {
      if (DBG) console.log(PR, "WARNING: multiple nodeID " + node.id + " x" + matches.length);
      LOGGER.Write(pkt.Info(), "ERROR", node.id, "duplicate node id");
      retval = { op: "error-multinodeid" };
    }
    return retval;
  } // if node

  // PROCESS EDGE INSERT/UPDATE
  if (edge) {
    m_CleanObjID(pkt.Info() + " edge.id", edge);
    var _matches = EDGES.find({ id: edge.id });
    if (_matches.length === 0) {
      // this is a new edge
      if (DBG) console.log(PR, "PKT_Update " + pkt.Info() + " INSERT edgeID " + edge.id + " " + JSON.stringify(edge));
      LOGGER.Write(pkt.Info(), "insert edge", edge.id, JSON.stringify(edge));
      DB.AppendEdgeLog(edge, pkt); // log GroupId to edge stored in database
      EDGES.insert(edge);
      retval = { op: "insert", edge: edge };
    } else if (_matches.length === 1) {
      // update this edge
      EDGES.findAndUpdate({ id: edge.id }, function (e) {
        if (DBG) console.log(PR, "PKT_Update " + pkt.SourceGroupID() + " UPDATE edgeID " + edge.id + " " + JSON.stringify(edge));
        LOGGER.Write(pkt.Info(), "update edge", edge.id, JSON.stringify(edge));
        DB.AppendEdgeLog(e, pkt); // log GroupId to edge stored in database
        Object.assign(e, edge);
      });
      retval = { op: "update", edge: edge };
    } else {
      console.log(PR, "WARNING: multiple edgeID " + edge.id + " x" + _matches.length);
      LOGGER.Write(pkt.Info(), "ERROR", node.id, "duplicate edge id");
      retval = { op: "error-multiedgeid" };
    }
    return retval;
  } // if edge

  // DELETE NODE
  if (nodeID !== undefined) {
    nodeID = m_CleanID(pkt.Info() + " nodeID", nodeID);
    if (DBG) console.log(PR, "PKT_Update " + pkt.Info() + " DELETE nodeID " + nodeID);
    // Log first so it's apparent what is triggering the edge changes
    LOGGER.Write(pkt.Info(), "delete node", nodeID);

    // handle edges
    var edgesToProcess = EDGES.where(function (e) {
      return e.source === nodeID || e.target === nodeID;
    });

    // handle linked nodes
    replacementNodeID = m_CleanID(pkt.Info() + " replacementNodeID", replacementNodeID);
    if (replacementNodeID !== -1) {
      // re-link edges to replacementNodeID...
      EDGES.findAndUpdate({ source: nodeID }, function (e) {
        LOGGER.Write(pkt.Info(), "relinking edge", e.id, "to", replacementNodeID);
        e.source = replacementNodeID;
      });
      EDGES.findAndUpdate({ target: nodeID }, function (e) {
        LOGGER.Write(pkt.Info(), "relinking edge", e.id, "to", replacementNodeID);
        e.target = replacementNodeID;
      });
    } else {
      // ... or delete edges completely
      var sourceEdges = EDGES.find({ source: nodeID });
      EDGES.findAndRemove({ source: nodeID });
      if (sourceEdges.length) LOGGER.Write(pkt.Info(), "deleting " + sourceEdges.length + " sources matching " + nodeID);
      var targetEdges = EDGES.find({ target: nodeID });
      EDGES.findAndRemove({ target: nodeID });
      if (targetEdges.length) LOGGER.Write(pkt.Info(), "deleting " + targetEdges.length + " targets matching " + nodeID);
    }
    // ...finally remove the node itself
    NODES.findAndRemove({ id: nodeID });
    return { op: "delete", nodeID: nodeID, replacementNodeID: replacementNodeID };
  }

  // DELETE EDGES
  if (edgeID !== undefined) {
    edgeID = m_CleanID(pkt.Info() + " edgeID", edgeID);
    if (DBG) console.log(PR, "PKT_Update " + pkt.Info() + " DELETE edgeID " + edgeID);
    LOGGER.Write(pkt.Info(), "delete edge", edgeID);
    EDGES.findAndRemove({ id: edgeID });
    return { op: "delete", edgeID: edgeID };
  }

  // return update value
  return { op: "error-noaction" };
};

/// NODE ANNOTATION ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ write/remove packet SourceGroupID() information into the node before writing
    the first entry is the insert, subsequent operations are updates
/*/
DB.AppendNodeLog = function (node, pkt) {
  if (!node._nlog) node._nlog = [];
  var gid = pkt.SourceGroupID() || pkt.SourceAddress();
  node._nlog.push(gid);
  if (DBG) {
    var out = "";
    node._nlog.forEach(function (el) {
      out += "[" + el + "] ";
    });
    console.log(PR, "nodelog", out);
  }
};
DB.FilterNodeLog = function (node) {
  var newNode = Object.assign({}, node);
  Reflect.deleteProperty(newNode, "_nlog");
  return newNode;
};
/// EDGE ANNOTATION ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ write/remove packet SourceGroupID() information into the node before writing
    the first entry is the insert, subsequent operations are updates
/*/
DB.AppendEdgeLog = function (edge, pkt) {
  if (!edge._elog) edge._elog = [];
  var gid = pkt.SourceGroupID() || pkt.SourceAddress();
  edge._elog.push(gid);
  if (DBG) {
    var out = "";
    edge._elog.forEach(function (el) {
      out += "[" + el + "] ";
    });
    console.log(PR, "edgelog", out);
  }
};
DB.FilterEdgeLog = function (edge) {
  var newEdge = Object.assign({}, edge);
  Reflect.deleteProperty(newEdge, "_elog");
  return newEdge;
};

/// JSON EXPORT ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ called by brunch to generate an up-to-date JSON file to path.
    creates the path if it doesn't exist
/*/
DB.WriteJSON = function (filePath) {
  var db = new Loki(DB_FILE, {
    autoload: true,
    autoloadCallback: function autoloadCallback() {
      if (typeof filePath === 'string') {
        if (DBG) console.log(PR, "writing { nodes, edges } to '" + filePath + "'");
        var nodes = db.getCollection("nodes").chain().data({ removeMeta: true });
        var edges = db.getCollection("edges").chain().data({ removeMeta: true });
        var data = { nodes: nodes, edges: edges };
        var json = JSON.stringify(data);
        if (DBG) console.log(PR, "ensuring DIR " + PATH.dirname(filePath));
        FS.ensureDirSync(PATH.dirname(filePath));
        if (DBG) console.log(PR, "writing file " + filePath);
        FS.writeFileSync(filePath, json);
        console.log(PR, "*** WROTE JSON DATABASE");
      } else {
        console.log(PR, "ERR path " + filePath + " must be a pathname");
      }
    }
  });
};

/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// utility function for cleaning nodes with numeric id property
function m_CleanObjID(prompt, obj) {
  if (typeof obj.id === 'string') {
    var int = parseInt(obj.id, 10);
    LOGGER.Write(PR, "! " + prompt + " \"" + obj.id + "\" is string; converting to " + int);
    obj.id = int;
  }
  return obj;
}
function m_CleanEdgeEndpoints(prompt, edge) {
  if (typeof edge.source === 'string') {
    var int = parseInt(edge.source, 10);
    LOGGER.Write(PR, "  edge " + prompt + " source \"" + edge.source + "\" is string; converting to " + int);
    edge.source = int;
  }
  if (typeof edge.target === 'string') {
    var _int = parseInt(edge.target, 10);
    LOGGER.Write(PR, "  edge " + prompt + " target \"" + edge.target + "\" is string; converting to " + _int);
    edge.target = _int;
  }
  return edge;
}
function m_CleanID(prompt, id) {
  if (typeof id === 'string') {
    var int = parseInt(id, 10);
    LOGGER.Write(PR, "! " + prompt + " \"" + id + "\" is string; converting to number " + int);
    id = int;
  }
  return id;
}

/// EXPORT MODULE DEFINITION //////////////////////////////////////////////////
/// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
module.exports = DB;
});

require.register("unisys/server-logger.js", function(exports, require, module) {
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  LOGGER - WIP
  porting PLAE logger for now to get it minimally working

  SUPER UGLY PORT WILL CLEAN UP LATER AVERT YOUR EYES OMG

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

var DBG = false;

/// LOAD LIBRARIES ////////////////////////////////////////////////////////////
/// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
var Loki = require('lokijs');
var PATH = require('path');
var FSE = require('fs-extra');

/// CONSTANTS /////////////////////////////////////////////////////////////////
/// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
var PROMPTS = require('../system/util/prompts');
var PR = PROMPTS.Pad('SRV-LOG');

/// MODULE-WIDE VARS //////////////////////////////////////////////////////////
/// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

var LOG_DIR = '../../runtime/logs';
var Tracer = require('tracer');
var LOG_DELIMITER = '\t';
var LOG_CONFIG = {
  format: "{{line}}  {{message}}",
  dateformat: "HH:MM:ss.L",
  preprocess: function preprocess(data) {
    data.line = 'C ' + Number(data.line).zeroPad(4);
  }
};
var LOGGER = Tracer.colorConsole(LOG_CONFIG);
var fs_log = null;
// enums for outputing dates
var e_weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// initialize event logger
var dir = PATH.resolve(PATH.join(__dirname, LOG_DIR));
FSE.ensureDir(dir, function (err) {
  if (err) throw new Error('could not make ' + dir + ' directory');
  var logname = str_TimeDatedFilename('log') + '.txt';
  var pathname = dir + '/' + logname;
  fs_log = FSE.createWriteStream(pathname);
  LogLine('NETCREATE APPSERVER SESSION LOG for ' + str_DateStamp() + ' ' + str_TimeStamp());
  LogLine('---');
});

/**	LOGGING FUNCTIONS ******************************************************/
///	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/	Log a standard system log message
/*/function LogLine() {
  if (!fs_log) return;

  var out = str_TimeStamp() + ' ';

  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var c = args.length;
  // arguments are delimited
  if (c) {
    for (var i = 0; i < c; i++) {
      if (i > 0) out += LOG_DELIMITER;
      out += args[i];
    }
  }
  out += '\n';
  fs_log.write(out);
}

/////////////////////////////////////////////////////////////////////////////
/**	UTILITY FUNCTIONS ******************************************************/
///	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function str_TimeStamp() {
  var date = new Date();
  var hh = ("0" + date.getHours()).slice(-2);
  var mm = ("0" + date.getMinutes()).slice(-2);
  var ss = ("0" + date.getSeconds()).slice(-2);
  return hh + ':' + mm + ':' + ss;
}
///	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function str_DateStamp() {
  var date = new Date();
  var mm = ("0" + (date.getMonth() + 1)).slice(-2);
  var dd = ("0" + date.getDate()).slice(-2);
  var day = e_weekday[date.getDay()];
  var yyyy = date.getFullYear();
  return yyyy + '/' + mm + '/' + dd + ' ' + day;
}
///	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function str_TimeDatedFilename() {
  var _filename;

  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  // construct filename
  var date = new Date();
  var dd = ("0" + date.getDate()).slice(-2);
  var mm = ("0" + (date.getMonth() + 1)).slice(-2);
  var hms = ("0" + date.getHours()).slice(-2);
  hms += ("0" + date.getMinutes()).slice(-2);
  hms += ("0" + date.getSeconds()).slice(-2);
  var filename;
  filename = date.getFullYear().toString();
  filename += '-' + mm + dd;
  var c = arguments.length;
  if (c) filename += (_filename = filename).concat.apply(_filename, ['-'].concat(args));
  filename += '-' + hms;
  return filename;
}

/// API METHODS ///////////////////////////////////////////////////////////////
/// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
var LOG = {};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ API: Handle incoming log events
/*/LOG.PKT_LogEvent = function (pkt) {
  var _console;

  var _pkt$Data = pkt.Data(),
      event = _pkt$Data.event,
      items = _pkt$Data.items;

  if (DBG) (_console = console).log.apply(_console, [PR, pkt.Info(), event].concat(_toConsumableArray(items)));
  LogLine.apply(undefined, [pkt.Info(), event || '-'].concat(_toConsumableArray(items)));
  return { OK: true };
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ API: Write to log as delimited arguments
/*/LOG.Write = LogLine;

/// EXPORT MODULE DEFINITION //////////////////////////////////////////////////
/// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
module.exports = LOG;
});

require.register("unisys/server-network.js", function(exports, require, module) {
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

///	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ handle messages that are a Send(), Signal(), or Call()
/*/var m_HandleMessage = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(socket, pkt) {
    var promises, notsrv, json, pktArray, data;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!pkt.IsOwnResponse()) {
              _context2.next = 3;
              break;
            }

            // console.log(PR,`-- ${pkt.Message()} completing transaction ${pkt.seqlog.join(':')}`);
            pkt.CompleteTransaction();
            return _context2.abrupt('return');

          case 3:
            // console.log(PR,`packet source incoming ${pkt.SourceAddress()}-${pkt.Message()}`);
            // (1) first check if this is a server handler
            promises = m_PromiseServerHandlers(pkt);

            // (2) if it wasn't, then see if we have remote handlers defined

            if (promises.length === 0) promises = m_PromiseRemoteHandlers(pkt);

            // (3) FAIL if no promises were returned, because there were no eligible
            // UADDR targets, possibly because the sources are not allowed to call itself
            // except in the case of the SIGNAL type

            if (!(promises.length === 0)) {
              _context2.next = 10;
              break;
            }

            console.log(PR, 'info: \'' + pkt.Message() + '\' no eligible UADDR targets');
            // return transaction to resolve callee
            pkt.SetData({ NOP: 'no handler found for \'' + pkt.Message() + '\'' });
            if (pkt.IsType('mcall')) pkt.ReturnTransaction(socket);
            return _context2.abrupt('return');

          case 10:
            // got this far? let's skip all server messages for debugging purposes
            notsrv = !pkt.Message().startsWith('SRV_');
            json = JSON.stringify(pkt.Data());
            /* MAGICAL ASYNC/AWAIT BLOCK *****************************/

            if (DBG) console.log(PR, pkt.Info() + ' FORWARD ' + pkt.Message() + ' to ' + promises.length + ' remotes');
            // if (notsrv) console.log(PR,`>> '${pkt.Message()}' queuing ${promises.length} Promises w/ data ${json}'`);
            _context2.next = 15;
            return Promise.all(promises);

          case 15:
            pktArray = _context2.sent;

            // if (notsrv) console.log(PR,`<< '${pkt.Message()}' resolved`);
            if (DBG) console.log(PR, pkt.Info() + ' RETURN ' + pkt.Message() + ' from ' + promises.length + ' remotes');
            /* END MAGICAL ASYNC/AWAIT BLOCK *************************/

            // (4) only mcall packets need to receive the data back return

            if (pkt.IsType('mcall')) {
              _context2.next = 19;
              break;
            }

            return _context2.abrupt('return');

          case 19:

            // (5) got this far? this is a call, so gather data and return it
            data = pktArray.reduce(function (d, p) {
              var pdata = p instanceof NetMessage ? p.Data() : p;
              var retval = Object.assign(d, pdata);
              // if (notsrv) console.log(PR,`'${pkt.Message()}' reduce`,JSON.stringify(retval));
              return retval;
            }, {});
            // json = JSON.stringify(data);
            // if (notsrv) console.log(PR,`'${pkt.Message()}' returning transaction data ${json}`);

            pkt.SetData(data);
            pkt.ReturnTransaction(socket);

          case 22:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function m_HandleMessage(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); // m_HandleMessage()
///	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ m_PromiseServerHandlers() returns an array of promises, which should be used
     by Promises.all() inside an async/await function (m_SocketMessage above)
    Logic is similar to client-datalink-class.js Call()
/*/

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  WebSocketServer and Network Management for UNISYS
  WORK IN PROGRESS

  [x] - socket listener
  [ ] - socket dictionary
  [ ] - socket metadata for UNISYS defined, stored in sockets
  [ ] - message dictionary
  [ ] - message dispatching
  [ ] - system message declaration

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

var DBG = false;

///	LOAD LIBRARIES ////////////////////////////////////////////////////////////
///	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var WSS = require('ws').Server;
var FSE = require('fs-extra');
var NetMessage = require('../unisys/common-netmessage-class');
var LOGGER = require('../unisys/server-logger');
var DB = require('../unisys/server-database');

/// CONSTANTS /////////////////////////////////////////////////////////////////
///	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var PROMPTS = require('../system/util/prompts');
var PR = PROMPTS.Pad('SRV-NET');
var ERR = PROMPTS.Pad('!!!');
var ERR_SS_EXISTS = "socket server already created";
var ERR_NULL_SOCKET = "require valid socket";
var DBG_SOCK_BADCLOSE = "closing socket is not in mu_sockets";
var ERR_INVALID_DEST = "couldn't find socket with provided address";
var ERR_UNKNOWN_PKT = "unrecognized netmessage packet type";
var DEFAULT_NET_PORT = 2929;
var DEFAULT_NET_ADDR = '127.0.0.1';

/// MODULE-WIDE VARS //////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// sockets
var mu_wss; // websocket server
var mu_options; // websocket options
var mu_sockets = new Map(); // sockets mapped by socket id
var mu_sid_counter = 0; // for generating  unique socket ids
// storage
var m_server_handlers = new Map(); // message map storing sets of functions
var m_message_map = new Map(); // message map storing other handlers
var m_socket_msgs_list = new Map(); // message map by uaddr


/// API MEHTHODS //////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var UNET = {};
var SERVER_UADDR = NetMessage.DefaultServerUADDR(); // is 'SVR_01'
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Initialize() is called by brunch-server.js to define the default UNISYS
    network values, so it can embed them in the index.ejs file for webapps
/*/UNET.InitializeNetwork = function (options) {
  options = options || {};
  options.port = options.port || DEFAULT_NET_PORT;
  options.uaddr = options.uaddr || SERVER_UADDR;
  if (mu_wss !== undefined) throw Error(ERR_SS_EXISTS);
  NetMessage.GlobalSetup({ uaddr: options.uaddr });
  mu_options = options;
  return mu_options;
}; // end InitializeNetwork()
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/	CreateNetwork() is called by brunch-server after the Express webserver
    has started listening, initializing the UNISYS NETWORK socket listener.
/*/UNET.StartNetwork = function () {
  // create listener.
  if (DBG) console.log(PR, 'UNISYS NETWORK initialized on port ' + mu_options.port);
  mu_wss = new WSS(mu_options);
  mu_wss.on('listening', function () {
    if (DBG) console.log(PR, 'listening on port ' + mu_options.port);
    mu_wss.on('connection', m_NewSocketConnected);
  });
}; // end CreateNetwork()
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ HandleMessage() registers a server-implemented handler.
    The handlerFunc receives a NetMessage and should return one as well.
    It can also return a non-object if there is an error.
    Logic is similar to client-datalink-class.js equivalent
/*/UNET.HandleMessage = function (mesgName, handlerFunc) {
  if (typeof handlerFunc !== 'function') {
    throw "arg2 must be a function";
  }
  var handlers = m_server_handlers.get(mesgName);
  if (!handlers) {
    handlers = new Set();
    m_server_handlers.set(mesgName, handlers);
  }
  handlers.add(handlerFunc);
  return this;
}; // end HandleMessage()
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ UnhandleMessage() de-registers a server-implemented handler, in case you
    ever want to do that.
    Logic is similar to client-datalink-class.js equivalent
/*/UNET.UnhandleMessage = function (mesgName, handlerFunc) {
  if (!arguments.length) {
    m_server_handlers.clear();
  } else if (arguments.length === 1) {
    m_server_handlers.delete(mesgName);
  } else {
    var handlers = m_server_handlers.get(mesgName);
    if (handlers) {
      handlers.delete(handlerFunc);
    }
  }
  return this;
}; // end UnhandleMessage()
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Call remote handler, with possible return value
/*/UNET.NetCall = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(mesgName, data) {
    var pkt, promises, resArray, resObj;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            pkt = new NetMessage(mesgName, data);
            promises = m_PromiseRemoteHandlers(pkt);

            if (DBG) console.log(PR, pkt.Info() + ' NETCALL ' + pkt.Message() + ' to ' + promises.length + ' remotes');
            /// MAGICAL ASYNC/AWAIT BLOCK ///////
            _context.next = 5;
            return Promise.all(promises);

          case 5:
            resArray = _context.sent;

            /// END MAGICAL ASYNC/AWAIT BLOCK ///
            resObj = Object.assign.apply(Object, [{}].concat(_toConsumableArray(resArray)));
            return _context.abrupt('return', resObj);

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Send data to remote handler, no expected return value
/*/UNET.NetSend = function (mesgName, data) {
  var pkt = new NetMessage(mesgName, data);
  var promises = m_PromiseRemoteHandlers(pkt);
  // we don't care about waiting for the promise to complete
  if (DBG) console.log(PR, pkt.Info() + ' NETSEND ' + pkt.Message() + ' to ' + promises.length + ' remotes');
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Send signal to remote handler, no expected return value
/*/UNET.NetSignal = function (mesgName, data) {
  console.warn(PR, 'NOTE: Use NetSend(), not NetSignal() since the server doesnt care.');
  UNET.NetSend(mesgName, data);
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ RegisterRemoteHandlers() accepts a RegistrationPacket with data = { messages }
    and writes to the two main maps for handling incoming messages
/*/UNET.RegisterRemoteHandlers = function (pkt) {
  if (pkt.Message() !== 'SRV_REG_HANDLERS') throw Error('not a registration packet');
  var uaddr = pkt.SourceAddress();

  var _pkt$Data = pkt.Data(),
      _pkt$Data$messages = _pkt$Data.messages,
      messages = _pkt$Data$messages === undefined ? [] : _pkt$Data$messages;

  var regd = [];
  // save message list, for later when having to delete
  m_socket_msgs_list.set(uaddr, messages);
  // add uaddr for each message in the list
  // m_message_map[mesg] contains a Set
  messages.forEach(function (msg) {
    var entry = m_message_map.get(msg);
    if (!entry) {
      entry = new Set();
      m_message_map.set(msg, entry);
    }
    if (DBG) console.log(PR, 'adding \'' + msg + '\' reference to ' + uaddr);
    entry.add(uaddr);
    regd.push(msg);
  });
  return { registered: regd };
};

/// MODULE HELPER FUNCTIONS ///////////////////////////////////////////////////
///	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ The socket has connected, so let's save this to our connection list
/*/function m_NewSocketConnected(socket) {
  if (DBG) console.log(PR, 'socket connected');

  m_SocketAdd(socket);
  m_SocketClientAck(socket);
  // subscribe socket to handlers
  socket.on('message', function (json) {
    m_SocketMessage(socket, json);
  });
  socket.on('close', function () {
    m_SocketDelete(socket);
  });
}
///	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ When a new socket connection happens, send back the special registration
    packet (WIP)
/*/function m_SocketClientAck(socket) {
  var data = {
    HELLO: 'Welcome to UNISYS',
    UADDR: socket.UADDR
  };
  socket.send(JSON.stringify(data));
}
///	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Handle all incoming socket messages asynchronously through Promises
/*/function m_SocketMessage(socket, json) {
  var pkt = new NetMessage(json);
  // figure out what to do
  switch (pkt.Type()) {
    case 'state':
      m_HandleState(socket, pkt);
      break;
    case 'msig':
    case 'msend':
    case 'mcall':
      m_HandleMessage(socket, pkt);
      break;
    default:
      throw new Error(PR + ' unknown packet type \'' + pkt.Type() + '\'');
  } // end switch
} // end m_SocketMessage()
///	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ handle global state and rebroadcast
/*/function m_HandleState(socket, pkt) {}
//
function m_PromiseServerHandlers(pkt) {
  var mesgName = pkt.Message();
  var handlers = m_server_handlers.get(mesgName);
  /// create promises for all registered handlers
  var promises = [];
  if (handlers) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = handlers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var handlerFunc = _step.value;

        // handlerFunc signature: (data,dataReturn) => {}
        var p = f_make_resolver_func(pkt, handlerFunc);
        promises.push(p);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  } /// return all queued promises
  return promises;

  /// inline utility function /////////////////////////////////////////////
  function f_make_resolver_func(srcPkt, handlerFunc) {
    return new Promise(function (resolve, reject) {
      var retval = handlerFunc(srcPkt);
      if (retval === undefined) throw '\'' + mesgName + '\' message handler MUST return object or error string';
      if ((typeof retval === 'undefined' ? 'undefined' : _typeof(retval)) !== 'object') reject(retval);else resolve(retval);
    });
  }
}
///	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ If a handler is registered elsewhere on UNET, then dispatch to them for
    eventual reflection back through server aggregation of data.
/*/function m_PromiseRemoteHandlers(pkt) {
  // debugging values
  var s_uaddr = pkt.SourceAddress();
  // logic values
  var promises = [];
  var mesgName = pkt.Message();
  var type = pkt.Type();
  // iterate!
  var handlers = m_message_map.get(mesgName);
  if (handlers) handlers.forEach(function (d_uaddr) {
    // don't send packet to originating UADDR because it already has handled it
    // locally
    switch (type) {
      case 'msig':
        promises.push(f_make_remote_resolver_func(pkt, d_uaddr));
        break;
      case 'msend':
      case 'mcall':
        if (s_uaddr !== d_uaddr) {
          promises.push(f_make_remote_resolver_func(pkt, d_uaddr));
        } else {
          // console.log(PR,`${type} '${pkt.Message()}' -NO ECHO- ${d_uaddr}`);
        }
        break;
      default:
        throw Error('{ERR_UNKNOWN_PKT} ' + type);
    }
  });
  /// return all queued promises
  return promises;
  /// f_make_remote_resolver_function returns the promise created by QueueTransaction()
  /// made on a new netmessage.
  function f_make_remote_resolver_func(srcPkt, d_uaddr) {
    var opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var verbose = opt.verbose;
    // get the address of the destination implementor of MESSAGE

    var d_sock = mu_sockets.get(d_uaddr);
    if (d_sock === undefined) throw Error(ERR_INVALID_DEST + (' ' + d_uaddr));
    // Queue transaction from server
    // sends to destination socket d_sock
    // console.log(PR,`++ '${pkt.Message()}' FWD from ${pkt.SourceAddress()} to ${d_uaddr}`);
    var newpkt = new NetMessage(srcPkt);
    newpkt.MakeNewID();
    newpkt.CopySourceAddress(srcPkt);
    if (verbose) {
      console.log('make_resolver_func:', 'PKT: ' + srcPkt.Type() + ' \'' + srcPkt.Message() + '\' from ' + srcPkt.Info() + ' to d_uaddr:' + d_uaddr + ' dispatch to d_sock.UADDR:' + d_sock.UADDR);
    }
    return newpkt.QueueTransaction(d_sock);
  }
}
///	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/
/*/function m_SocketAdd(socket) {
  // save socket by socket_id
  var sid = m_GetNewUADDR();
  // store additional props in socket
  socket.UADDR = sid;
  // save socket
  mu_sockets.set(sid, socket);
  if (DBG) console.log(PR, 'socket ADD ' + socket.UADDR + ' to network');
  LOGGER.Write(socket.UADDR, 'joined network');
  if (DBG) m_ListSockets('add ' + sid);
}
///	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/
/*/function m_GetNewUADDR() {
  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'UADDR';

  ++mu_sid_counter;
  var cstr = mu_sid_counter.toString(10).padStart(2, '0');
  return prefix + '_' + cstr;
}
///	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/
/*/function m_SocketDelete(socket) {
  var uaddr = socket.UADDR;
  if (!mu_sockets.has(uaddr)) throw Error(DBG_SOCK_BADCLOSE);
  if (DBG) console.log(PR, 'socket DEL ' + uaddr + ' from network');
  LOGGER.Write(socket.UADDR, 'left network');
  mu_sockets.delete(uaddr);
  // delete socket reference from previously registered handlers
  var rmesgs = m_socket_msgs_list.get(uaddr);
  if (Array.isArray(rmesgs)) {
    rmesgs.forEach(function (msg) {
      var handlers = m_message_map.get(msg);
      if (DBG) console.log(PR, 'deleting \'' + msg + '\' reference to ' + uaddr);
      if (handlers) handlers.delete(uaddr);
    });
  }
  if (DBG) m_ListSockets('del ' + socket.UADDR);
}
///	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/
/*/function m_ListSockets(change) {
  console.log(PR, 'SocketList change:', change);
  // let's use iterators! for..of
  var values = mu_sockets.values();
  var count = 1;
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = values[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var socket = _step2.value;

      console.log(PR, count + ' - ' + socket.UADDR);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
}

/// EXPORT MODULE DEFINITION //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
module.exports = UNET;
});

require.register("unisys/server.js", function(exports, require, module) {
'use strict';

/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  UNISYS server loader

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

var DBG = false;

///	LOAD LIBRARIES ////////////////////////////////////////////////////////////
///	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var UNET = require('./server-network');
var UDB = require('./server-database');
var LOGGER = require('./server-logger');

/// CONSTANTS /////////////////////////////////////////////////////////////////
///	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var PROMPTS = require('../system/util/prompts');
var PR = PROMPTS.Pad('SRV');

/// MODULE VARS ///////////////////////////////////////////////////////////////
///	- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


/// API CREATE MODULE /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var UNISYS = {};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Initialize() is called by brunch-server.js to define the default UNISYS
    network values, so it can embed them in the index.ejs file for webapps
    override = { port }
/*/UNISYS.InitializeNetwork = function (override) {
  UDB.InitializeDatabase(override);
  return UNET.InitializeNetwork(override);
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ RegisterHandlers() is called before network is started, so they're
    ready to run. These are server-implemented reserved messages.
/*/UNISYS.RegisterHandlers = function () {

  UNET.HandleMessage('SRV_REFLECT', function (pkt) {
    pkt.Data().serverSays = 'REFLECTING';
    pkt.Data().stack.push('SRV_01');
    if (DBG) console.log(PR, sprint_message(pkt));
    // return the original packet
    return pkt;
  });

  UNET.HandleMessage('SRV_REG_HANDLERS', function (pkt) {
    if (DBG) console.log(PR, sprint_message(pkt));
    // now need to store the handlers somehow.
    var data = UNET.RegisterRemoteHandlers(pkt);
    // or return a new data object that will replace pkt.data
    return data;
  });

  UNET.HandleMessage('SRV_DBGET', function (pkt) {
    if (DBG) console.log(PR, sprint_message(pkt));
    return UDB.PKT_GetDatabase(pkt);
  });

  UNET.HandleMessage('SRV_DBSET', function (pkt) {
    if (DBG) console.log(PR, sprint_message(pkt));
    return UDB.PKT_SetDatabase(pkt);
  });

  // receives a packet from a client
  UNET.HandleMessage('SRV_DBUPDATE', function (pkt) {
    if (DBG) console.log(PR, sprint_message(pkt));
    var data = UDB.PKT_Update(pkt);
    // add src attribute for client SOURCE_UPDATE to know
    // this is a remote update
    data.src = 'remote';
    // fire update messages
    if (data.node) UNET.NetSend('SOURCE_UPDATE', data);
    if (data.edge) UNET.NetSend('EDGE_UPDATE', data);
    if (data.nodeID !== undefined) UNET.NetSend('NODE_DELETE', data);
    if (data.edgeID !== undefined) UNET.NetSend('EDGE_DELETE', data);
    // return SRV_DBUPDATE value (required)
    return { OK: true, info: 'SRC_DBUPDATE' };
  });

  UNET.HandleMessage('SRV_DBGETNODEID', function (pkt) {
    if (DBG) console.log(PR, sprint_message(pkt));
    return UDB.PKT_GetNewNodeID(pkt);
  });

  UNET.HandleMessage('SRV_DBLOCKNODE', function (pkt) {
    if (DBG) console.log(PR, sprint_message(pkt));
    return UDB.PKT_RequestLockNode(pkt);
  });

  UNET.HandleMessage('SRV_DBUNLOCKNODE', function (pkt) {
    if (DBG) console.log(PR, sprint_message(pkt));
    return UDB.PKT_RequestUnlockNode(pkt);
  });

  UNET.HandleMessage('SRV_DBLOCKEDGE', function (pkt) {
    if (DBG) console.log(PR, sprint_message(pkt));
    return UDB.PKT_RequestLockEdge(pkt);
  });

  UNET.HandleMessage('SRV_DBUNLOCKEDGE', function (pkt) {
    if (DBG) console.log(PR, sprint_message(pkt));
    return UDB.PKT_RequestUnlockEdge(pkt);
  });

  UNET.HandleMessage('SRV_DBUNLOCKALLNODES', function (pkt) {
    if (DBG) console.log(PR, sprint_message(pkt));
    return UDB.PKT_RequestUnlockAllNodes(pkt);
  });
  UNET.HandleMessage('SRV_DBUNLOCKALLEDGES', function (pkt) {
    if (DBG) console.log(PR, sprint_message(pkt));
    return UDB.PKT_RequestUnlockAllEdges(pkt);
  });
  UNET.HandleMessage('SRV_DBUNLOCKALL', function (pkt) {
    if (DBG) console.log(PR, sprint_message(pkt));
    return UDB.PKT_RequestUnlockAll(pkt);
  });

  UNET.HandleMessage('SRV_DBGETEDGEID', function (pkt) {
    if (DBG) console.log(PR, sprint_message(pkt));
    return UDB.PKT_GetNewEdgeID(pkt);
  });

  UNET.HandleMessage('SRV_LOG_EVENT', function (pkt) {
    if (DBG) console.log(PR, sprint_message(pkt));
    return LOGGER.PKT_LogEvent(pkt);
  });

  // utility function //
  function sprint_message(pkt) {
    return 'got \'' + pkt.Message() + '\' data=' + JSON.stringify(pkt.Data());
  }
};
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/	StartNetwork() is called by brunch-server after the Express webserver
/*/UNISYS.StartNetwork = function () {
  UNET.StartNetwork();
};

/// EXPORT MODULE DEFINITION //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
module.exports = UNISYS;
});

require.register("view/AppDefault.jsx", function(exports, require, module) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (window.NC_DBG) console.log('inc ' + module.id);
/// LIBRARIES /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var React = require('react');
var UNISYS = require('unisys/client');

/** REACT COMPONENT **********************************************************\
    Used by render()'s <Switch> to load a React component (what we call a
    'view' in the NetCreate app). The component should return its elements
    wrapped in a div with the suggested flexbox pr

    index.html           | body          min-height: 100%
    index.html           | div#app
    init-appshell        |   div         display:flex, flex-flow:column nowrap,
                                         width:100%, height:100vh
    init-appshell        |     Navbar    position:fixed
    --- COMPONENT BELOW ---
    <RequiredComponent>  |     div       this is a child of a flexbox
\* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

var AppDefault = function (_React$Component) {
  _inherits(AppDefault, _React$Component);

  function AppDefault() {
    _classCallCheck(this, AppDefault);

    /* UNISYS LIFECYCLE INITIALIZATION */
    // initialize UNISYS before declaring any hook functions
    var _this = _possibleConstructorReturn(this, (AppDefault.__proto__ || Object.getPrototypeOf(AppDefault)).call(this));

    UNISYS.SystemInitialize('assets/htmldemos/d3forcedemo');
    return _this;
  }

  _createClass(AppDefault, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { style: { display: 'flex', flexFlow: 'row nowrap',
            width: '100%', height: '100%' } },
        React.createElement('div', { id: 'left', style: { flex: '1 0 auto' } }),
        React.createElement(
          'div',
          { id: 'middle', style: { flex: '3 0 auto' } },
          React.createElement(
            'p',
            null,
            'AppDefault.jsx'
          ),
          React.createElement(
            'h4',
            null,
            'NetCreate welcomes you'
          ),
          React.createElement(
            'p',
            null,
            'This is a work in progress.'
          )
        ),
        React.createElement('div', { id: 'right', style: { flex: '1 0 auto' } })
      );
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      console.log('AppDefault mounted');
    }
  }]);

  return AppDefault;
}(React.Component);

/// EXPORT REACT COMPONENT ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


module.exports = AppDefault;
});

require.register("view/dev-db/DevDB.jsx", function(exports, require, module) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (window.NC_DBG) console.log('inc ' + module.id);
/// SYSTEM INTEGRATION ////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var UNISYS = require('unisys/client');
var REFLECT = require('system/util/reflection');
/// MAGIC: DevDBLogic will add UNISYS Lifecycle Hooks on require()
var LOGIC = require('./devdb-logic');

var _require = require('react-router-dom'),
    Switch = _require.Switch,
    Route = _require.Route,
    Redirect = _require.Redirect,
    Link = _require.Link;

var DBG = false;

/// LIBRARIES /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var React = require('react');
var ReactStrap = require('reactstrap');
var PROMPTS = require('system/util/prompts');
var PR = PROMPTS.Pad('DevDB');

/// REACT COMPONENT ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ This is the root component for the view
/*/
var DevDB = function (_UNISYS$Component) {
  _inherits(DevDB, _UNISYS$Component);

  function DevDB(props) {
    _classCallCheck(this, DevDB);

    var _this = _possibleConstructorReturn(this, (DevDB.__proto__ || Object.getPrototypeOf(DevDB)).call(this, props));

    UNISYS.ForceReloadOnNavigation();

    /* INITIALIZE COMPONENT STATE from UNISYS */
    // get any state from 'VIEW' namespace; empty object if nothing
    // UDATA.AppState() returns a copy of state obj; mutate/assign freely
    var state = _this.AppState('VIEW');
    // initialize some state variables
    state.description = state.description || 'exerciser for database server testing';
    // REACT TIP: setting state directly works ONLY in React.Component constructor!
    _this.state = state;

    /* UNISYS STATE CHANGE HANDLERS */
    // bind 'this' context to handler function
    // then use for handling UNISYS state changes
    _this.UnisysStateChange = _this.UnisysStateChange.bind(_this);
    // NOW set up handlers...
    _this.OnAppStateChange('VIEW', _this.UnisysStateChange);

    return _this;
  } // constructor

  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  /// UNISYS state change handler - registered by UNISYS.OnStateChange()
  /// state is coming from UNISYS


  _createClass(DevDB, [{
    key: 'UnisysStateChange',
    value: function UnisysStateChange(state) {
      if (DBG) console.log('.. REACT <- state', state, 'via ' + this.udata.UID() + '\'');
      // update local react state, which should force an update
      this.setState(state);
    }

    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /// COMPONENT state change handler - registered in render()
    /// state is coming FROM component, which is updating already

  }, {
    key: 'handleTextChange',
    value: function handleTextChange(event) {
      var target = event.target;
      var state = {
        description: target.value
      };
      if (DBG) console.log('REACT -> state', state, 'to ' + this.udata.UID());
      this.SetAppState('VIEW', state, this.uni_id);
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /// COMPONENT this interface has composed

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // start the application phase
      var className = REFLECT.ExtractClassName(this);
      if (DBG) console.log(className + ' componentDidMount');
    } // componentDidMount

  }, {
    key: 'StudentRender',
    value: function StudentRender(_ref) {
      var match = _ref.match;

      console.log('-- STUDENT RENDER --');
      return React.createElement(
        'p',
        { style: { color: 'red' } },
        React.createElement(
          'small',
          null,
          'matching subroute: ',
          match.params.unit,
          ' ',
          match.params.user,
          '!'
        )
      );
    }

    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ Try to route the following
        http://localhost:3000/#dev-unisys/use/student/UNIT_KEY/USER_KEY/
    /*/
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { id: 'fdshell', style: { padding: '10px' } },
        React.createElement(
          'h2',
          null,
          'DB DEVTEST SHELL'
        ),
        React.createElement(Route, { path: this.props.match.path + '/student/:unit/:user', component: this.StudentRender }),
        React.createElement(
          'p',
          null,
          this.state.description
        )
      );
    } // render

  }]);

  return DevDB;
}(UNISYS.Component); // class DevUnisys

/// EXPORT UNISYS SIGNATURE ///////////////////////////////////////////////////
/// used in init.jsx to set module scope early
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


DevDB.UMOD = module.id;

/// EXPORT REACT COMPONENT ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
module.exports = DevDB;
});

require.register("view/dev-db/devdb-logic.js", function(exports, require, module) {
'use strict';

if (window.NC_DBG) console.log('inc ' + module.id);
/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

    DevDBLogic is the companion module that implements the console CLI for
    manipulating the database on the server

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

/// SYSTEM LIBRARIES //////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var SETTINGS = require('settings');
var UNISYS = require('unisys/client');
var DATASTORE = require('system/datastore');

/// DEBUG SUPPORT /////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var DBG = { handler: false };
var PROMPTS = require('system/util/prompts');
var JSCLI = require('system/util/jscli');

/// INITIALIZE MODULE /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// module 1
var PR = PROMPTS.Pad('DevDBLogic');
var MOD = UNISYS.NewModule(module.id);
var UDATA = UNISYS.NewDataLink(MOD);

/// COMPATIBILITY MODES  //////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Provide Compatibility with DevUnisys instances
/*/MOD.Hook('INITIALIZE', function () {
  console.log('*** INITIALIZE ***');
  // without NET_SEND_TEST:
  // fail netCallHandlr, netData, netDataAdd, netDataMulti, netDataReturn
  // fail netSendHndlr

  // spy on NET_SEND_TEST
  // does not affect tests
  UDATA.HandleMessage('NET_SEND_TEST', function (data) {
    console.log(PR, 'snooping NET_SEND_TEST data', JSON.stringify(data));
  });
  // add NET_CALL_TEST handler
  // netData passes, but not specific data tests
  UDATA.HandleMessage('NET_CALL_TEST', function (data) {
    console.log(PR, 'snooping NET_CALL_TEST data', JSON.stringify(data));
    // add data.stack to pass netDataMulti, netDataReturn
    if (data.stack === undefined) data.stack = [];
    data.stack.push('DBLOGIC_SNOOP');
    data.stack.push('DBLOGIC_SNOOP');
    // add data.reply to pass netDataAdd
    data.reply = 'DBLOGIC_SNOOP';
    // must return data for promise to return data to handler
    // otherwise returns null
    return data;
  });
});

/// APP_READY MESSAGE REGISTRATION ////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ The APP_READY hook is fired after all initialization phases have finished
    and may also fire at other times with a valid info packet
/*/MOD.Hook('APP_READY', function (info) {
  console.log('*** APP_READY ***');
  return new Promise(function (resolve, reject) {
    var timeout = setTimeout(function () {
      reject(Error('UNISYS REGISTER TIMEOUT'));
    }, 5000);
    UNISYS.RegisterMessagesPromise().then(function (data) {
      clearTimeout(timeout);
      console.log('RegisterMessagesPromise() registered handlers with server', data);
      console.log('This SocketUADDR is', UNISYS.SocketUADDR());
      resolve();
    });
  });
});
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/
/*/MOD.Hook('START', function () {
  console.log('*** START ***');
});

/// COMMAND LINE UTILITIES ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
MOD.Hook('INITIALIZE', function () {
  JSCLI.AddFunction(ncPushDatabase);
});
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Command: RESET THE DATABASE from default data
/*/function ncPushDatabase(jsonFile) {
  jsonFile = jsonFile || 'data.reducedlinks.json';
  DATASTORE.PromiseJSONFile(jsonFile).then(function (data) {
    // data is { nodes, edges }
    console.log(PR, 'Sending data from ' + jsonFile + ' to Server', data);
    // UDATA.Call() returns a promise, so return it to
    // continue the asynchronous chain
    return UDATA.Call('SRV_DBSET', data);
  }).then(function (d) {
    if (d.OK) {
      console.log(PR + ' %cServer Database has been overwritten with ' + jsonFile, 'color:blue');
      console.log(PR + ' Reload apps to see new data');
    } else {
      console.error(PR, 'Server Error', d);
    }
  });
  // return syntax help
  return "FYI: ncPushDatabase(jsonFile) can load file in assets/data";
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/// EXPORT MODULE /////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
module.exports = MOD;
});

require.register("view/dev-react/DevReact.jsx", function(exports, require, module) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (window.NC_DBG) console.log('inc ' + module.id);
/// SYSTEM INTEGRATION ////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var UNISYS = require('unisys/client');
var REFLECT = require('system/util/reflection');
var LOGIC = require('./devreact-logic');

var _require = require('react-router-dom'),
    Route = _require.Route;

var DBG = true;

/// LIBRARIES /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var React = require('react');
var PROMPTS = require('system/util/prompts');
var PR = PROMPTS.Pad('DevReact');

/// REACT COMPONENT ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ This is the root component for the view
/*/
var DevReact = function (_UNISYS$Component) {
  _inherits(DevReact, _UNISYS$Component);

  function DevReact(props) {
    _classCallCheck(this, DevReact);

    var _this = _possibleConstructorReturn(this, (DevReact.__proto__ || Object.getPrototypeOf(DevReact)).call(this, props));

    UNISYS.ForceReloadOnNavigation();

    /* INITIALIZE COMPONENT STATE from UNISYS */
    // get any state from 'VIEW' namespace; empty object if nothing
    // UDATA.AppState() returns a copy of state obj; mutate/assign freely
    var state = _this.AppState('VIEW');
    // initialize some state variables
    state.description = state.description || 'exerciser for database server testing';
    // REACT TIP: setting state directly works ONLY in React.Component constructor!
    _this.state = state;

    /* UNISYS STATE CHANGE HANDLERS */
    // bind 'this' context to handler function
    // then use for handling UNISYS state changes
    _this.AppStateChange = _this.AppStateChange.bind(_this);
    // NOW set up handlers...
    _this.OnAppStateChange('VIEW', _this.AppStateChange);

    return _this;
  } // constructor
  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  /// UNISYS state change handler - registered by UNISYS.OnStateChange()
  /// state is coming from UNISYS


  _createClass(DevReact, [{
    key: 'AppStateChange',
    value: function AppStateChange(state) {
      if (DBG) console.log('.. REACT <- state', state, 'via ' + this.UDATA.UID() + '\'');
      // update local react state, which should force an update
      this.setState(state);
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /// COMPONENT this interface has composed

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // start the application phase
      var className = REFLECT.ExtractClassName(this);
      if (DBG) console.log(className + ' componentDidMount');
    } // componentDidMount

  }, {
    key: 'StudentRender',
    value: function StudentRender(_ref) {
      var match = _ref.match;

      console.log('-- STUDENT RENDER --');
      return React.createElement(
        'p',
        { style: { color: 'red' } },
        React.createElement(
          'small',
          null,
          'matching subroute: ',
          match.params.unit,
          ' ',
          match.params.user,
          '!'
        )
      );
    }

    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ Try to route the following
        http://localhost:3000/#dev-unisys/use/student/UNIT_KEY/USER_KEY/
    /*/
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { id: 'fdshell', style: { padding: '10px' } },
        React.createElement(
          'h2',
          null,
          'UNISYS-REACT INTEGRATION TEST SHELL'
        ),
        React.createElement(Route, { path: this.props.match.path + '/student/:unit/:user', component: this.StudentRender }),
        React.createElement(
          'p',
          null,
          this.state.description
        )
      );
    } // render


  }]);

  return DevReact;
}(UNISYS.Component); // class DevUnisys

/// EXPORT UNISYS SIGNATURE ///////////////////////////////////////////////////
/// used in init.jsx to set module scope early
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


DevReact.UMOD = module.id;

/// EXPORT REACT COMPONENT ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
module.exports = DevReact;
});

require.register("view/dev-react/devreact-logic.js", function(exports, require, module) {
'use strict';

if (window.NC_DBG) console.log('inc ' + module.id);
/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

var DBG = { handler: false };
var JSCLI = require('system/util/jscli');

/// SYSTEM LIBRARIES //////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var SETTINGS = require('settings');
var UNISYS = require('unisys/client');

/// DEBUG SUPPORT /////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var PROMPTS = require('system/util/prompts');
var PR = PROMPTS.Pad('DevReactLogic');

/// INITIALIZE MODULE /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// module 1
var MOD = UNISYS.NewModule(module.id);
var UDATA = UNISYS.NewDataLink(MOD);

/// COMPATIBILITY MODES  //////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Provide Compatibility with DevUnisys instances
/*/MOD.Hook('INITIALIZE', function () {
    console.log('*** INITIALIZE ***');
});

/// APP START HOOK
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/
/*/MOD.Hook('START', function () {
    console.log('*** START ***');
    /*/ call counter function 3 times 500ms apart, then check that all tests passed
        set a periodic timer update
    /*/var TESTCOUNTER = 3;
    var TESTINTERVAL = setInterval(function () {
        if (--TESTCOUNTER < 0) {
            clearInterval(TESTINTERVAL);
        }
        // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
        function u_random_string() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < 5; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        }
        var state = { random: u_random_string() };
        UDATA.SetAppState('VIEW', state, UDATA.UID());
    }, 500);
});

/// APP_READY HOOK REGISTRATION ///////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ The APP_READY hook is fired after all initialization phases have finished
    and may also fire at other times with a valid info packet
/*/MOD.Hook('APP_READY', function (info) {
    info = info || {};
    console.log('*** APP_READY ***');
});

/// COMMAND LINE UTILITIES ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var CMD = [];
MOD.Hook('INITIALIZE', function () {
    JSCLI.AddFunction(ncTest);
});
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Command: RESET THE DATABASE from default data
/*/function ncTest(jsonFile) {
    return "ncTest() exiting";
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/// EXPORT MODULE /////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
module.exports = MOD;
});

require.register("view/dev-session/DevSession.jsx", function(exports, require, module) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (window.NC_DBG) console.log('inc ' + module.id);
/// SYSTEM INTEGRATION ////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var UNISYS = require('unisys/client');
var REFLECT = require('system/util/reflection');
/// MAGIC: DevDBLogic will add UNISYS Lifecycle Hooks on require()
var LOGIC = require('./devsession-logic');

var _require = require('react-router-dom'),
    Switch = _require.Switch,
    Route = _require.Route,
    Redirect = _require.Redirect,
    Link = _require.Link;

var DBG = false;

/// LIBRARIES /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var React = require('react');
var ReactStrap = require('reactstrap');
var PROMPTS = require('system/util/prompts');
var PR = PROMPTS.Pad('DevSession');
var SESSION = require('unisys/common-session');

/// REACT COMPONENT ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ This is the root component for the view
/*/
var DevSession = function (_UNISYS$Component) {
  _inherits(DevSession, _UNISYS$Component);

  function DevSession(props) {
    _classCallCheck(this, DevSession);

    var _this = _possibleConstructorReturn(this, (DevSession.__proto__ || Object.getPrototypeOf(DevSession)).call(this, props));

    UNISYS.ForceReloadOnNavigation();

    /* INITIALIZE COMPONENT STATE from UNISYS */
    // get any state from 'VIEW' namespace; empty object if nothing
    // UDATA.AppState() returns a copy of state obj; mutate/assign freely
    var state = _this.AppState('VIEW');
    // initialize some state variables
    state.description = state.description || 'session logic testbed';
    // REACT TIP: setting state directly works ONLY in React.Component constructor!
    _this.state = state;

    /* UNISYS STATE CHANGE HANDLERS */
    // bind 'this' context to handler function
    // then use for handling UNISYS state changes
    _this.UnisysStateChange = _this.UnisysStateChange.bind(_this);
    // NOW set up handlers...
    _this.OnAppStateChange('VIEW', _this.UnisysStateChange);

    return _this;
  } // constructor

  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  /// UNISYS state change handler - registered by UNISYS.OnStateChange()
  /// state is coming from UNISYS


  _createClass(DevSession, [{
    key: 'UnisysStateChange',
    value: function UnisysStateChange(state) {
      if (DBG) console.log('.. REACT <- state', state, 'via ' + this.udata.UID() + '\'');

      // update local react state, which should force an update
      this.setState(state);
    }

    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /// COMPONENT state change handler - registered in render()
    /// state is coming FROM component, which is updating already

  }, {
    key: 'handleTextChange',
    value: function handleTextChange(event) {
      var target = event.target;
      var state = {
        description: target.value
      };
      if (DBG) console.log('REACT -> state', state, 'to ' + this.udata.UID());
      this.SetAppState('VIEW', state, this.uni_id);
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /// COMPONENT this interface has composed

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // start the application phase
      var className = REFLECT.ExtractClassName(this);
      if (DBG) console.log(className + ' componentDidMount');
    } // componentDidMount
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  }, {
    key: 'SessionEdit',
    value: function SessionEdit(_ref) {
      var match = _ref.match,
          location = _ref.location;

      console.log('SessionEdit edit/' + match.params.token);
      var token = match.params.token;
      var decoded = SESSION.DecodeToken(token);
      if (decoded) {
        console.log('DECODED', decoded);
        return React.createElement(
          'div',
          null,
          React.createElement(
            'p',
            null,
            React.createElement(
              'small',
              null,
              'matching subroute: [',
              token,
              ']'
            ),
            React.createElement('br', null),
            React.createElement(
              'span',
              { style: { color: 'green' } },
              React.createElement(
                'small',
                null,
                'valid token: groupID ',
                decoded.groupId
              )
            )
          )
        );
      } else {
        return React.createElement(
          'div',
          null,
          React.createElement(
            'p',
            null,
            React.createElement(
              'small',
              null,
              'matching subroute: [',
              token,
              ']'
            ),
            React.createElement('br', null),
            React.createElement(
              'span',
              { style: { color: 'red' } },
              React.createElement(
                'small',
                null,
                'COULD NOT DECODE TO VALID GROUP ID'
              )
            )
          )
        );
      }
    }

    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ Try to route the following
        http://localhost:3000/#dev-unisys/use/student/UNIT_KEY/USER_KEY/
    /*/
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { id: 'fdshell', style: { padding: '10px' } },
        React.createElement(
          'h2',
          null,
          'SESSIONS DEV TESTING'
        ),
        React.createElement(Route, { path: this.props.match.path + '/edit/:token', component: this.SessionEdit }),
        React.createElement(
          'p',
          null,
          this.state.description
        )
      );
    } // render

  }]);

  return DevSession;
}(UNISYS.Component); // class DevUnisys

/// EXPORT UNISYS SIGNATURE ///////////////////////////////////////////////////
/// used in init.jsx to set module scope early
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


DevSession.UMOD = module.id;

/// EXPORT REACT COMPONENT ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
module.exports = DevSession;
});

require.register("view/dev-session/devsession-logic.js", function(exports, require, module) {
'use strict';

if (window.NC_DBG) console.log('inc ' + module.id);
/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

    DevDBLogic is the companion module that implements the console CLI for
    manipulating the database on the server

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

/// SYSTEM LIBRARIES //////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var SETTINGS = require('settings');
var UNISYS = require('unisys/client');
var DATASTORE = require('system/datastore');
var SESSION = require('unisys/common-session');
var JSCLI = require('system/util/jscli');

/// DEBUG SUPPORT /////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var PROMPTS = require('system/util/prompts');
var DBG = { handler: false };

/// INITIALIZE MODULE /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// module 1
var PR = PROMPTS.Pad('DevDBLogic');
var MOD = UNISYS.NewModule(module.id);
var UDATA = UNISYS.NewDataLink(MOD);

/// COMPATIBILITY MODES  //////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/
/*/MOD.Hook('INITIALIZE', function () {
    console.log('*** INITIALIZE ***');
});

/// APP_READY MESSAGE REGISTRATION ////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ The APP_READY hook is fired after all initialization phases have finished
    and may also fire at other times with a valid info packet
/*/MOD.Hook('APP_READY', function (info) {
    console.log('*** APP_READY ***');
    return new Promise(function (resolve, reject) {
        var timeout = setTimeout(function () {
            reject(Error('UNISYS REGISTER TIMEOUT'));
        }, 5000);
        UNISYS.RegisterMessagesPromise().then(function (data) {
            clearTimeout(timeout);
            console.log('RegisterMessagesPromise() registered handlers with server', data);
            console.log('This SocketUADDR is', UNISYS.SocketUADDR());
            resolve();
        });
    });
});
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/
/*/MOD.Hook('START', function () {
    console.log('*** INITIALIZE ***');
});

/// EXPORT MODULE /////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
module.exports = MOD;
});

require.register("view/dev-unisys/DevUnisys.jsx", function(exports, require, module) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

if (window.NC_DBG) console.log('inc ' + module.id);
/// SYSTEM INTEGRATION ////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var UNISYS = require('unisys/client');
var REFLECT = require('system/util/reflection');
/// MAGIC: DevUnisysLogic will add UNISYS Lifecycle Hooks on require()
var LOGIC = require('./devunisys-logic');

var _require = require('react-router-dom'),
    Switch = _require.Switch,
    Route = _require.Route,
    Redirect = _require.Redirect,
    Link = _require.Link;

var TEST = require('test');
var DBG = false;

/// LIBRARIES /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var React = require('react');
var ReactStrap = require('reactstrap');
var InputGroup = ReactStrap.InputGroup,
    InputGroupAddon = ReactStrap.InputGroupAddon,
    InputGroupText = ReactStrap.InputGroupText,
    Input = ReactStrap.Input;
var Alert = ReactStrap.Alert;

var PROMPTS = require('system/util/prompts');
var PR = PROMPTS.Pad('DevUnisys');

/// REACT COMPONENT ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ This is the root component for the view
/*/
var DevUnisys = function (_UNISYS$Component) {
  _inherits(DevUnisys, _UNISYS$Component);

  function DevUnisys(props) {
    _classCallCheck(this, DevUnisys);

    var _this = _possibleConstructorReturn(this, (DevUnisys.__proto__ || Object.getPrototypeOf(DevUnisys)).call(this, props));

    UNISYS.ForceReloadOnNavigation();

    /* INITIALIZE COMPONENT STATE from UNISYS */
    // get any state from 'VIEW' namespace; empty object if nothing
    // UDATA.AppState() returns a copy of state obj; mutate/assign freely
    var state = _this.AppState('VIEW');
    // initialize some state variables
    state.description = state.description || 'uninitialized description';
    // REACT TIP: setting state directly works ONLY in React.Component constructor!
    _this.state = state;

    /* LOCAL INTERFACE HANDLERS */
    _this.handleTextChange = _this.handleTextChange.bind(_this);

    /* UNISYS STATE CHANGE HANDLERS */
    // bind 'this' context to handler function
    // then use for handling UNISYS state changes
    _this.UnisysStateChange = _this.UnisysStateChange.bind(_this);
    // NOW set up handlers...
    _this.OnAppStateChange('VIEW', _this.UnisysStateChange);
    _this.OnAppStateChange('LOGIC', _this.UnisysStateChange);

    /* UNISYS TEST HANDLERS */
    // note: in a UNISYS.Component, register your handlers in
    // the constructor
    if (TEST('remote')) {
      _this.HandleMessage('REMOTE_CALL_TEST', function (data) {
        data.cat = 'calico';
        data.melon += '_ack';
        return data;
      });
    }
    if (TEST('call')) {
      _this.HandleMessage('TEST_CALL', function (data) {
        if (!data.stack) data.stack = [];data.stack.push('TRI-JSX');
        return data;
      });
    }

    return _this;
  } // constructor

  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  /// UNISYS state change handler - registered by UNISYS.OnStateChange()
  /// state is coming from UNISYS


  _createClass(DevUnisys, [{
    key: 'UnisysStateChange',
    value: function UnisysStateChange(state) {
      if (DBG) console.log('.. REACT <- state', state, 'via ' + this.udata.UID() + '\'');
      // update local react state, which should force an update
      this.setState(state);
    }

    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /// COMPONENT state change handler - registered in render()
    /// state is coming FROM component, which is updating already

  }, {
    key: 'handleTextChange',
    value: function handleTextChange(event) {
      var target = event.target;
      var state = {
        description: target.value
      };
      if (DBG) console.log('REACT -> state', state, 'to ' + this.udata.UID());
      this.SetAppState('VIEW', state, this.uni_id);
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /// COMPONENT this interface has composed

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // start the application phase
      var className = REFLECT.ExtractClassName(this);
      if (DBG) console.log(className + ' componentDidMount');

      /* UNISYS TEST MESSAGE HANDLER INVOCATION */
      if (TEST('call')) {
        // INVOKE remove call
        this.AppCall('TEST_CALL', { source: 'DevUnisysJSX' })
        // test data return
        .then(function (data) {
          if (data && data.source && data.source === 'DevUnisysLogic-Return') TEST.Pass('callDataReturn');
          if (data && data.extra && data.extra === 'AddedData') TEST.Pass('callDataAdd');
          if (data && data.multi && data.stack && data.stack.length === 3 && data.multi === 'MultiData') TEST.Pass('callDataMulti');
        });
      }
    } // componentDidMount

  }, {
    key: 'StudentRender',
    value: function StudentRender(_ref) {
      var match = _ref.match;

      console.log('-- STUDENT RENDER --');
      return React.createElement(
        'p',
        { style: { color: 'red' } },
        React.createElement(
          'small',
          null,
          'matching subroute: ',
          match.params.unit,
          ' ',
          match.params.user,
          '!'
        )
      );
    }

    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ Try to route the following
        http://localhost:3000/#dev-unisys/use/student/UNIT_KEY/USER_KEY/
    /*/
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { id: 'fdshell', style: { padding: '10px' } },
        React.createElement(
          'h2',
          null,
          'Unisys Feature Development Shell'
        ),
        React.createElement(Route, { path: this.props.match.path + '/student/:unit/:user', component: this.StudentRender }),
        React.createElement(
          'h4',
          null,
          'UISTATE TESTS'
        ),
        React.createElement(
          'p',
          null,
          this.state.description
        ),
        React.createElement(Input, { type: 'text', name: 'desc', id: 'desc', placeholder: 'text to change', onChange: this.handleTextChange }),
        React.createElement(
          'p',
          null,
          'random string from LOGIC: ',
          this.state.random || 'notset'
        )
      );
    } // render


  }]);

  return DevUnisys;
}(UNISYS.Component); // class DevUnisys

/// EXPORT UNISYS SIGNATURE ///////////////////////////////////////////////////
/// used in init.jsx to set module scope early
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


DevUnisys.UMOD = module.id;

/// EXPORT REACT COMPONENT ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
module.exports = DevUnisys;
});

require.register("view/dev-unisys/devunisys-logic.js", function(exports, require, module) {
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

if (window.NC_DBG) console.log('inc ' + module.id);
/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

    TEST REACT INTEGRATION through UNISYS

    Things that UNISYS has to do:
    [x] handle startup phases
    [ ] how to handle the update cycle? need to review bencode
    [ ] how to handle loading of app settings? punt
    [ ] using subscribers

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

/// SYSTEM LIBRARIES //////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var SETTINGS = require('settings');
var UNISYS = require('unisys/client');
// master TEST enable is in DevUnisys.JSX constructor()
// but most are tested and passed in this module
var TEST = require('test');

/// DEBUG SUPPORT /////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var DBG = { handler: false };
var PROMPTS = require('system/util/prompts');
var JSCLI = require('system/util/jscli');
// these constants are used in m_StartTests()
var TEST_WAIT = 3000;
var TEST_TIMER = null;

/// INITIALIZE MODULE /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// module 1
var PR = PROMPTS.Pad('DUL');
var MOD = UNISYS.NewModule(module.id);
var UDATA = UNISYS.NewDataLink(MOD);
// module 2
var MOD2 = UNISYS.NewModule(module.id);
var UDATA2 = UNISYS.NewDataLink(MOD2, 'SimRemote');
var PR2 = PROMPTS.Pad('DUL-REM');

/// CONFIGURE TESTS ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ TEST_CONF lifecycle hook runs before anything else except for unscoped
    code in a module
/*/MOD.Hook('TEST_CONF', function () {
  /* CONFIGURE UNISYS TESTS */
  // enable debug output and tests
  // true = enabled, false = skip
  TEST('state', true); // state events and changes
  TEST('hook', true); // lifecycle hooks
  TEST('call', true); // internal instance calls
  TEST('remote', true); // instance-to-instance calls
  TEST('server', true); // server calls
  TEST('net', true); // network initialization
  TEST();
});

/// LIFECYCLE TESTS ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ First INITIALIZE Hook takes some time to resolve asynchronously
    Enable this feature by returning a Promise
/*/MOD.Hook('INITIALIZE', function () {
  if (!TEST('hook')) return Promise.resolve('immediate');
  TEST.Pass('hookInit1');
  var tms = 1000;
  var p = new Promise(function (resolve, reject) {
    setTimeout(function () {
      // if a hook returns a promise, then lifecycle waits
      // until all promises are resolved
      TEST.Pass('hookInitDeferred');
      resolve('hookInitDeferred');
    }, tms);
  }); // new Promise
  return p;
});
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Second INITIALIZE Hook just runs a normal function.
    Enable this feature by returning a Function
/*/MOD.Hook('INITIALIZE', function () {
  if (TEST('hook')) TEST.Pass('hookInit2');
}); // end INITIALIZE 2


/// OTHER TESTS ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Initialize message handlers during INITIALIZE so we can run them later
    during START
/*/MOD.Hook('INITIALIZE', function () {
  if (TEST('call')) {

    // 'TEST_CALL' is invoked from DevUnisys.jsx
    UDATA.HandleMessage('TEST_CALL', function (data) {
      if (data && data.source) TEST.Pass('callHndlrReg');
      if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') TEST.Pass('callHndlrData');
      if (typeof data.source === 'string' && data.source === 'DevUnisysJSX') TEST.Pass('callHndlrDataProp');
      data.source = 'DevUnisysLogic-Return';
      if (!data.stack) data.stack = [];data.stack.push('TRI-1');
      data.extra = 'AddedData';
      return data;
    });
    // a second 'TEST_CALL' to test aggregate data return
    UDATA.HandleMessage('TEST_CALL', function (data) {
      if (!data.stack) data.stack = [];data.stack.push('TRI-2');
      return Object.assign(data, { multi: 'MultiData' });
    });
  }

  // 'REMOTE_CALL_TEST' is invoked from MOD2
  // note that there are multiple handlers for 'REMOTE_CALL_TEST'
  // to test collecting data from all of them
  if (TEST('remote')) {
    UDATA.HandleMessage('REMOTE_CALL_TEST', function (data, ucontrol) {
      if (DBG.handler) console.log('REMOTE_CALL_TEST got data', data);
      TEST.Pass('remoteCall');
      if (data && Array.isArray(data.results)) {
        TEST.Pass('remoteData');
        data.results.push('UDATA_instance');
      }
      // caller should check remoteDataAdd and remoteDataMulti
      return data;
    });
  }
}); // end INITIALIZE 3

/// TEST STATE ////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Initialize in module 1
/*/MOD.Hook('INITIALIZE', function () {
  var state = {
    deep: { deep_a: 1 },
    arr: [1, 3, 2],
    a: 1
  };
  UDATA.MergeAppState('testmerge', state);
  state = {
    arr: [1, 2, 3]
  };
  UDATA.ConcatAppState('testconcat', state);
});
/*/ Initialize in module 2
/*/MOD2.Hook('INITIALIZE', function () {
  var state = {
    deep: { deep_b: 2 },
    arr: [10, 11, 12],
    b: 2
  };
  UDATA2.MergeAppState('testmerge', state);
  state = {
    arr: [1, 2, 3]
  };
  UDATA.ConcatAppState('testconcat', state);
});
/*/ test merging in module 2
/*/MOD2.Hook('START', function () {
  var expected = '{"deep":{"deep_a":1,"deep_b":2},"arr":[1,3,2,10,11,12],"a":1,"b":2}';
  var serialized = JSON.stringify(UDATA2.AppState('testmerge'));
  if (expected === serialized) TEST.Pass('stateMerge');
  expected = '{"arr":[1,2,3,1,2,3]}';
  serialized = JSON.stringify(UDATA.AppState('testconcat'));
  if (expected === serialized) TEST.Pass('stateConcat');
  console.log(serialized);
});

/// APP_READY MESSAGE REGISTRATION ////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ The APP_READY hook is fired after all initialization phases have finished
    and may also fire at other times with a valid info packet
/*/MOD.Hook('APP_READY', function (info) {
  info = info || {};
  if (TEST('hook')) TEST.Pass('hookStart');
  UNISYS.RegisterMessagesPromise().then(function (data) {
    // console.log('RegisterMessagesPromise() registered handlers with server',data);
    if (TEST('net')) TEST.Pass('netMessageReg');
  });
});

/// SECOND MODULE for MODULE-to-MODULE TESTS //////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ MOD2 is a completely different UNISYS MODULE declaration for ensuring that
    modules can access data in other modules. Has its own LIFECYCLE naturally.
    First declare message handlers during INITIALIZE
/*/MOD2.Hook('INITIALIZE', function () {
  if (TEST('remote')) {
    UDATA2.HandleMessage('REMOTE_CALL_TEST', function (data) {
      if (data && Array.isArray(data.results)) {
        data.results.push('UDATA2_instance');
        if (DBG.handler) console.log(PR2, 'got REMOTE_CALL_TEST message with data', data);
        TEST.Pass('remoteData2');
      }
    });
  }
});
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Now test message handlers during START
/*/MOD2.Hook('START', function () {
  if (TEST('remote')) {
    // test remote data call (local, not network)
    UDATA2.LocalCall('REMOTE_CALL_TEST', { mycat: 'kitty', results: [] }).then(function (data) {
      if (data.mycat === 'kitty') TEST.Pass('remoteDataReturn');
    });
  }
});

/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Test State is set during start
    'test' a,b were set by separate INITIALIZE methods
    in different modules
/*/MOD2.Hook('START', function () {
  if (TEST('remote')) {
    // test remote data call (local, not network)
    UDATA2.LocalCall('REMOTE_CALL_TEST', { mycat: 'kitty', results: [] }).then(function (data) {
      if (data.mycat === 'kitty') TEST.Pass('remoteDataReturn');
    });
  }
});

/// SERVER CALL TESTS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Now test message handlers during START
/*/MOD2.Hook('START', function () {
  // TEST SERVER NETWORK CALL
  if (TEST('server')) {
    (function () {
      // used for order testing
      var sendorder = [];
      var recvorder = [];
      // only test network calls
      var netOnly = { toLocal: false, toNet: true };

      var _loop = function _loop(i) {
        setTimeout(function () {
          sendorder.push(i);
          UDATA2.Call('SRV_REFLECT', {
            me: 'DevUnisysLogic:MOD2.Start',
            stack: ['DevUnisysLogic'],
            count: i
          }, netOnly).then(function (data) {
            if (DBG.handler) console.log(PR2, 'got SRV_RFLECT', data);
            TEST.Pass('serverCall');
            if (data !== undefined && Array.isArray(data.stack)) TEST.Pass('serverData');
            if (data.stack && data.stack.length === 2 && data.stack[1] === 'SRV_01') TEST.Pass('serverDataAdd');
            if (data.me && data.me === 'DevUnisysLogic:MOD2.Start') TEST.Pass('serverReturn');
            recvorder.push(data.count);
          });
        }, Math.random() * 1000);
      };

      for (var i = 0; i < 5; i++) {
        _loop(i);
      }
      TEST.AssessArrayMatch('serverCallOrder', sendorder, recvorder);
    })();
  } // end TEST('server')
});

/// UNISYS NETWORK SEND/CALL/SIGNAL TESTS /////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ define test handler
/*/MOD2.Hook('INITIALIZE', function () {
  if (TEST('net')) {
    UDATA2.HandleMessage('NET_CALL_TEST', function (data) {
      // console.log(`*** NET_CALL_TEST (1) got data called by ${JSON.stringify(data.stack)} from socket ${UNISYS.SocketUADDR()}`);
      data.reply = 'hi from ' + UNISYS.SocketUADDR();
      if (data.stack === undefined) data.stack = [];
      data.stack.push(UNISYS.SocketUADDR() + '_01');
      TEST.Pass('netCallHndlr');
      return data;
    });
    UDATA2.HandleMessage('NET_CALL_TEST', function (data) {
      // console.log(`*** NET_CALL_TEST (2) got data called by ${JSON.stringify(data.stack)} from socket ${UNISYS.SocketUADDR()}`);
      if (data.stack === undefined) data.stack = [];
      data.stack.push(UNISYS.SocketUADDR() + '_02');
      return data;
    });
    UDATA2.HandleMessage('NET_SIGNAL_TEST', function (data) {
      if (typeof data.source === 'string') TEST.Pass('netSignal');
      if (data.source === UNISYS.SocketUADDR()) TEST.Pass('netSignalEcho');
    });
    UDATA2.HandleMessage('NET_SEND_TEST', function (data) {
      // send only targets other instances, not the sending one
      // console.log(`*** NET_SEND_TEST got data called by ${data.source} from socket ${UNISYS.SocketUADDR()}`);
      if (data.source === UNISYS.SocketUADDR()) {
        TEST.Fail('netSendNoEcho');
        // console.log(`*** NET_SEND_TEST fail netSendNoEcho`);
      } else {
        // this triggers if the data source DOES NOT MATCH our own data socket
        TEST.Pass('netSendHndlr');
        // console.log(`*** NET_SEND_TEST pass netSend`);
      }
    });
  }
});
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ invoke test handler on OTHER instance
/*/MOD2.Hook('START', function () {
  setTimeout(delayed_send, 2000);
  // inline function
  function delayed_send() {
    if (!TEST('net')) return;
    var uaddr = UNISYS.SocketUADDR();
    var greeting = 'hi from ' + uaddr;
    var call = { test: 'netcall', greeting: greeting };
    // test signal
    UDATA2.NetSignal('NET_SIGNAL_TEST', { test: 'netsignal', source: uaddr });
    // test call (note this is from UDATA, not UDATA2)
    UDATA.NetCall('NET_CALL_TEST', call).then(function (d) {
      // console.log(`*** NET_CALL_TEST (REPLY) got data returned ${JSON.stringify(d.stack)} from socket ${UNISYS.SocketUADDR()}`);
      if ((typeof d === 'undefined' ? 'undefined' : _typeof(d)) === 'object' && !d.NOP) TEST.Pass('netData');
      if (typeof d.reply === 'string') TEST.Pass('netDataAdd');
      if (d.greeting === greeting) TEST.Pass('netDataReturn');
      if (Array.isArray(d.stack) && d.stack.length > 1) TEST.Pass('netDataMulti');
    });
    // test send
    UDATA2.NetSend('NET_SEND_TEST', { test: 'netsend', source: uaddr });
  }
});

/// TEST STARTUP //////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ The START phase executes after INITIALIZE has completed.
    we register handlers to the VIEW state namespace,
    and also set different namespace states on timers
/*/MOD.Hook('START', function () {
  /// ASSESS TESTS AFTER TEST_WAIT MS
  console.log('*** RUNNING UNISYS TESTS ***');
  TEST.SetTitle('RUNNING TESTS');
  TEST.SetMeta('socket', UNISYS.SocketUADDR());
  TEST_TIMER = setTimeout(TEST.Assess, TEST_WAIT);

  /// STATE CHANGE TESTING
  /*/ register state change handler for 'VIEW' namespace
  /*/if (TEST('state')) {
    UDATA.OnAppStateChange('VIEW', function (state) {
      TEST.Pass('stateChange');
    });
    // Do the state change test!
    setTimeout(function () {
      var state = { description: 'test stateChange succeeded' };
      UDATA.SetAppState('VIEW', state, UDATA.UID());
    }, 1000);
  } // if TEST state

  /// NETWORK TESTING
  /*/ remote method invocation of REMOTE_CALL_TEST is expected to return data in a callback
  /*/if (TEST('remote')) {
    UDATA.HandleMessage('REMOTE_CALL_TEST', function (data, msgcon) {
      // 'REMOTE_CALL_TEST' is also implemented in DevUnisys.jsx
      // so its return data will be merged with this
      return { dog: 'spotted' };
    });
    // Do the call test!
    UDATA.LocalCall('REMOTE_CALL_TEST', { melon: 'logicmelon' }).then(function (data) {
      if (data && data.melon && data.cat) TEST.Pass('remoteData');
      if (data.melon === 'logicmelon_ack' && data.cat === 'calico') TEST.Pass('remoteDataAdd');
      if (data.dog && data.dog === 'spotted') TEST.Pass('remoteDataMulti');
    });
  } // if TEST remote

  /*/ call counter function 3 times 500ms apart, then check that all tests passed
      set a periodic timer update
  /*/var TESTCOUNTER = 3;
  var TESTINTERVAL = setInterval(function () {
    if (--TESTCOUNTER < 0) {
      clearInterval(TESTINTERVAL);
    }
    // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
    function u_random_string() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    }
    var state = { random: u_random_string() };
    UDATA.SetAppState('LOGIC', state, UDATA.UID());
  }, 500);
}); // end START TEST HOOK


/// EXPORT MODULE /////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
module.exports = MOD;
});

require.register("view/netcreate/NetCreate.jsx", function(exports, require, module) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

    NetCreate

    The basic React Component structure of the app looks like this:

        NetCreate
        +- NodeSelector
        |  +- NodeDetail
        |  +- AutoComplete
        |  |  +- AutoSuggest
        |  +- EdgeEntry
        |     +- *AutoComplete (for Target Node)*
        +- NetGraph
           +- D3SimpleNetGraph
              +- D3

    `NetCreate` is the root element. It is a wrapper for the key app
    elements `NodeSelector` and `NetGraph`.

    It does not do any data or event handling.  Those are handled individually
    by the respective Components.

  * All state is maintained in `nc-logic.js`
  * It handles events from NodeSelector, EdgeEntry, and NetGraph components
      and passes data and upates across them.

    PROPS  ... (none)
    STATE  ... (none)
    EVENTS ... (none)

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

/// UNISYS INITIALIZE REQUIRES for REACT ROOT /////////////////////////////////
var UNISYS = require('unisys/client');
var SessionShell = require('unisys/component/SessionShell');

/// DEBUG SWITCHES ////////////////////////////////////////////////////////////
var DBG = false;
var PROMPTS = require('system/util/prompts');
var PR = PROMPTS.Pad('ACD');

/// LIBRARIES /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var React = require('react');

var _require = require('react-router-dom'),
    Route = _require.Route;

var NetGraph = require('./components/NetGraph');
var Search = require('./components/Search');
var NodeSelector = require('./components/NodeSelector');
var InfoPanel = require('./components/InfoPanel');
var NCLOGIC = require('./nc-logic'); // require to bootstrap data loading


/// REACT COMPONENT ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/
/*/
var NetCreate = function (_UNISYS$Component) {
  _inherits(NetCreate, _UNISYS$Component);

  function NetCreate() {
    _classCallCheck(this, NetCreate);

    var _this = _possibleConstructorReturn(this, (NetCreate.__proto__ || Object.getPrototypeOf(NetCreate)).call(this));

    UNISYS.ForceReloadOnNavigation();
    _this.OnDOMReady(function () {
      if (DBG) console.log(PR, 'OnDOMReady');
    });
    _this.OnReset(function () {
      if (DBG) console.log(PR, 'OnReset');
    });
    _this.OnStart(function () {
      if (DBG) console.log(PR, 'OnStart');
    });
    _this.OnAppReady(function () {
      if (DBG) console.log(PR, 'OnAppReady');
    });
    _this.OnRun(function () {
      if (DBG) console.log(PR, 'OnRun');
    });
    return _this;
  }

  /// REACT LIFECYCLE METHODS ///////////////////////////////////////////////////
  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  /*/ This is the root component, so this fires after all subcomponents have
      been fully rendered by render().
  /*/

  _createClass(NetCreate, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Init dragger
      var dragger = document.getElementById('dragger');
      dragger.onmousedown = this.handleMouseDown;
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ Define the component structure of the web application
    /*/
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { style: { display: 'flex', flexFlow: 'row nowrap',
              width: '100%', height: '100vh', overflow: 'hidden' } },
          React.createElement(
            'div',
            { id: 'left', style: { backgroundColor: '#EEE', flex: '1 1 25%', maxWidth: '400px', padding: '10px', overflow: 'scroll', marginTop: '56px' } },
            React.createElement(
              'div',
              { style: { display: 'flex', flexFlow: 'column nowrap' } },
              React.createElement(Route, { path: '/edit/:token', exact: true, component: SessionShell }),
              React.createElement(Route, { path: '/edit', exact: true, component: SessionShell }),
              React.createElement(Route, { path: '/', exact: true, component: SessionShell }),
              React.createElement(Search, null),
              React.createElement(NodeSelector, null)
            )
          ),
          React.createElement(
            'div',
            { id: 'middle', style: { backgroundColor: '#fcfcfc', flex: '3 0 60%', padding: '10px', marginTop: '56px' } },
            React.createElement(InfoPanel, null),
            React.createElement(NetGraph, null),
            React.createElement(
              'div',
              { style: { fontSize: '10px', position: 'absolute', left: '0px', bottom: '0px', zIndex: '1500', color: '#aaa', backgroundColor: '#eee', padding: '5px 10px' } },
              'Please contact Professor Kalani Craig, Institute for Digital Arts & Humanities at (812) 856-5721 (BH) or craigkl@indiana.edu with questions or concerns and/or to request information contained on this website in an accessible format.'
            )
          )
        )
      ); // end return
    } // end render()

  }]);

  return NetCreate;
}(UNISYS.Component); // end class NetCreate

/// EXPORT UNISYS SIGNATURE ///////////////////////////////////////////////////
/// used in init.jsx to set module scope early
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


NetCreate.UMOD = module.id;

/// EXPORT REACT COMPONENT ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
module.exports = NetCreate;
});

;require.register("view/netcreate/components/AutoComplete.jsx", function(exports, require, module) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

      ## OVERVIEW

      AutoComplete is the text input field for entering node labels to:
      * search for nodes,
      * edit existing nodes,
      * and add new nodes.
      * view the current selection/setting when searching for a node
      * view the current selection/setting for an edge source or target



      ## MAIN FEATURES

      * It interactively provides a list of suggestions that match the current
        input, e.g. typing "ah" will display a list of suggestions including "Ah
        Long", "Ah Seung", and "Oahu Railroad Station".

      * Users can highlight suggestions (via mouseover or with keyboard arrows)

      * Users can select a suggestion (via clicking or hitting return)

      * Only one AutoComplete component can be active at a time in an app.
        Since there can be multiple AutoComplete components on a single page
        (e.g. multiple edges along with the source), we disable the component
        when it isn't active.

      * When the AutoComplete component is disabled, it will display a
        generic INPUT component instead of the Autosuggest component.

      * When the AutoComplete component is disabled, since it will not
        receive SELECTION updates, we need to pass it the current field
        value via the this.props.disabledValue.

      AutoComplete is a wrapper class for the open source AutoSuggest component,
      which handles the actual rendering of the suggestions list.  AutoComplete
      provides an interface to NodeSelector and EdgeEntry.  AutoComplete also
      provides the handler routines for generating the suggestions list and
      handling highlights and selections.  Data is passed to AutoComplete via
      UDATA SELECTION state changes.

      This relies on the react-autosuggest component.
      See documentation: https://github.com/moroshko/react-autosuggest



      ## TO USE

          <AutoComplete
            isDisabled={this.state.canEdit}
            disabledValue={this.state.formData.label}
            inactiveMode={'disabled'}
          />



      ## TECHNICAL DESCRIPTION

      AutoComplete handles five basic functions:

      1. Show suggestions when the user types in the input search field.
      2. Mark nodes on graph when the user changes the search field.
      3. Set selection when user clicks on a suggestion.
      4. Show the label if the node is selected externally
         (via a click on the graph)
      5. Provide an edit field for the label when the user is editing a node
         (during edit, show suggestions, but don't select anything?)

      The Autosuggest input field is a controlled field.
      It is controlled via this.state.value.
      See https://reactjs.org/docs/forms.html#controlled-components

      Sequence of Events

      1. When the user types in the Autosuggest input field,
      2. AutoComplete makes a UDATA SOURCE_SEARCH call
      3. nc-logic handles the call and returns a SELECTION state update
      4. AutoComplete then sets the Autosuggest input field value via
         this.state.value.
      5. The updated SELECTION state also contains a list of
         suggestedNodeLabels that is used by Autosuggest whenever it
         requests a list of suggestions.



      ## HIGHLIGHTING vs MARKING

      "Highlighting" refers to the temporary rollover highlight of a suggested node
      in the suggestion list.  "Marking" refers to the stroked color of a node
      circle on the D3 graph.



      ## PROPS

      identifier

            A unique ID for identifying which AutoComplete component is active
            within the whole app system.

      disabledValue

            When the AutoComplete component is not active, it should display
            the currently selected node (rather than be an active input field
            for selecting a new node).  This is the label for that node.

      inactiveMode

            When the AutoComplete component is not active, it can be either
            'static' or 'disabled' depending on the parent field.  This prop
            sets which of these modes the field should default to:

            'static'   -- an unchangeable field, e.g. the Source node for an
                          edge is always going to be the Source label.  It
                          cannot be changed.
            'disabled' -- a changeable field that is not currently activated,
                          e.g. the Target node for an edge.

      shouldIgnoreSelection

            Used by NodeSelector and EdgeEditor's target node field
            to prevent user from selecting another node
            while editing a node.

      Based on example code from https://codepen.io/moroshko/pen/vpBzMr

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

var DBG = false;

/// LIBRARIES /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var React = require('react');
var ReactStrap = require('reactstrap');
var Input = ReactStrap.Input;

var Autosuggest = require('react-autosuggest');

var UNISYS = require('unisys/client');

var MODE_STATIC = 'static'; // Can't be edited ever
var MODE_DISABLED = 'disabled'; // Can be edited, but not at the moment
var MODE_ACTIVE = 'active'; // Currently able to edit

var _IsMounted = false;

/// REACT COMPONENT ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// export a class object for consumption by brunch/require

var AutoComplete = function (_UNISYS$Component) {
  _inherits(AutoComplete, _UNISYS$Component);

  function AutoComplete() {
    _classCallCheck(this, AutoComplete);

    var _this = _possibleConstructorReturn(this, (AutoComplete.__proto__ || Object.getPrototypeOf(AutoComplete)).call(this));

    _this.state = {
      value: '',
      suggestions: [],
      id: '',
      mode: MODE_DISABLED
    };

    _this.onStateChange_SEARCH = _this.onStateChange_SEARCH.bind(_this);
    _this.onStateChange_SELECTION = _this.onStateChange_SELECTION.bind(_this);
    _this.onStateChange_AUTOCOMPLETE = _this.onStateChange_AUTOCOMPLETE.bind(_this);
    _this.onInputChange = _this.onInputChange.bind(_this);
    _this.getSuggestionValue = _this.getSuggestionValue.bind(_this);
    _this.renderSuggestion = _this.renderSuggestion.bind(_this);
    _this.onSuggestionsFetchRequested = _this.onSuggestionsFetchRequested.bind(_this);
    _this.onSuggestionsClearRequested = _this.onSuggestionsClearRequested.bind(_this);
    _this.onSuggestionSelected = _this.onSuggestionSelected.bind(_this);
    _this.onSuggestionHighlighted = _this.onSuggestionHighlighted.bind(_this);
    _this.shouldRenderSuggestions = _this.shouldRenderSuggestions.bind(_this);
    _this.onBlur = _this.onBlur.bind(_this);

    // NOTE: do this AFTER you have used bind() on the class method
    // otherwise the call will fail due to missing 'this' context
    _this.OnAppStateChange('SEARCH', _this.onStateChange_SEARCH);
    _this.OnAppStateChange('SELECTION', _this.onStateChange_SELECTION);
    _this.OnAppStateChange('ACTIVEAUTOCOMPLETE', _this.onStateChange_AUTOCOMPLETE);

    return _this;
  } // constructor

  /// UNISYS STATE CHANGE HANDLERS //////////////////////////////////////////////////
  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  /*/ 'SEARCH' handler
  /*/

  _createClass(AutoComplete, [{
    key: 'onStateChange_SEARCH',
    value: function onStateChange_SEARCH(data) {
      // grab entire global state for 'SELECTION
      // REVIEW // autocompleteid probab;y should be stored elsewhere or use a
      // different mechanism
      if (DBG) console.log('AutoComplete', this.props.identifier, ': Got SEARCH', data);

      var _AppState = this.AppState('ACTIVEAUTOCOMPLETE'),
          activeAutoCompleteId = _AppState.activeAutoCompleteId;

      if (activeAutoCompleteId === this.props.identifier) {
        // This is the currently active AutoComplete field
        // Update the autosuggest input field's value with the current search data
        if (DBG) console.log('...AutoComplete', this.props.identifier, ': ACTIVE setting search value to', data.searchLabel);
        if (data.searchLabel !== undefined) {
          this.setState({
            mode: MODE_ACTIVE,
            value: data.searchLabel
          });
        }
      } else {
        // This is not the active AutoComplete field
        // Use the disabledValue prop to display
        // REVIEW: this probably is handled better in render()
        if (_IsMounted) {
          if (DBG) console.log('...AutoComplete', this.props.identifier, ': NOT ACTIVE setting search value to', this.props.disabledValue);
          this.setState({
            mode: this.props.inactiveMode,
            value: this.props.disabledValue
          });
        } else {
          if (DBG) console.log('...AutoComplete', this.props.identifier, ': NOT ACTIVE, but skipping update because component is unmounted');
        }
      }
    } // onStateChange_SEARCH

    /*/ 'SELECTION' handler
        Update this AutoComplete input value when the currently selected SELECTION has changed
        AND we are active and have the current activeAutoCompleteId.
        This is especially important for when adding a target field to a new EdgeEditor.
    /*/
  }, {
    key: 'onStateChange_SELECTION',
    value: function onStateChange_SELECTION(data) {
      if (DBG) console.log('...AutoComplete', this.props.identifier, ': Got SELECTION', data);
      if (this.props.shouldIgnoreSelection) {
        if (DBG) console.log('...AutComplete', this.props.identifier, ': Ignoring SELECTION (probably because NodeSelector is in edit mode).');
        return;
      }
      var activeAutoCompleteId = this.AppState('ACTIVEAUTOCOMPLETE').activeAutoCompleteId;
      if (this.props.identifier === activeAutoCompleteId || activeAutoCompleteId === 'search') {
        // Update the searchLabel if either this nodeSelector or the 'search' field is
        // is the current active AutoComplete field.
        // We only ignore SELECTION updates if an edge target field has the current focus.
        // This is necessary for the case when the user clicks on a node in the D3 graph
        // and the search field has the current AutoComplete focus.  Otherwise the state.value
        // is never updated.
        if (DBG) console.log('...AutoComplete', this.props.identifier, ': ACTIVE got SELECTION');
        var nodes = data.nodes;
        if (nodes !== undefined && nodes.length > 0 && nodes[0] !== undefined && nodes[0].label !== undefined) {
          var searchLabel = nodes[0].label;
          if (DBG) console.log('...AutoComplete', this.props.identifier, ': ACTIVE got SELECTION, searchLabel', searchLabel);
          // FIX: This line causes the "Can't call setState (or forceUpdate) on an unmounted component" error
          // is it because it's not actually visible (unmounted)?
          this.setState({ value: searchLabel });
        }
      }
    }

    /*/ 'AUTOCOMPLETE' handler
        Update this AutoComplete state when the currently selected AUTOCOMPLETE field has changed
    /*/
  }, {
    key: 'onStateChange_AUTOCOMPLETE',
    value: function onStateChange_AUTOCOMPLETE(data) {
      if (DBG) console.log('...AutoComplete', this.props.identifier, ': Got AUTOCOMPLETE', data);
      var mode = this.state.mode;
      if (data.activeAutoCompleteId === this.props.identifier) {
        mode = MODE_ACTIVE;
      } else {
        mode = this.props.inactiveMode;
      }
      this.setState({ mode: mode });
    }

    /// AUTOSUGGEST HANDLERS ////////////////////////////////////////////////////////
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ Handle Autosuggest's input event trigger
        User has typed something new into the field
    /*/
  }, {
    key: 'onInputChange',
    value: function onInputChange(event, _ref) {
      var newValue = _ref.newValue,
          method = _ref.method;

      // Pass the input value (node label search string) to UDATA
      // which will in turn pass the searchLabel back to the SEARCH
      // state handler in the constructor, which will in turn set the state
      // of the input value to be passed on to AutoSuggest
      this.AppCall('SOURCE_SEARCH', { searchString: newValue });
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ Handle Autosuggest's request to set the value of the input field when
        a selection is clicked.
    /*/
  }, {
    key: 'getSuggestionValue',
    value: function getSuggestionValue(suggestion) {
      return suggestion.label;
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ Handle Autosuggest's request for HTML rendering of suggestions
    /*/
  }, {
    key: 'renderSuggestion',
    value: function renderSuggestion(suggestion) {
      return suggestion.label;
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ Handle Autosuggest's request for list of suggestions
        lexicon =  string array of node labels
    
        lexicon is a one-dimensional string array that represents the complete list
        of all possible suggestions that are then filtered based on the user typing
        for suggestions.
    
        We construct the list on the fly based on the D3DATA data.  If the data model
        changes, we'll need to update this lexicon constructor.
    /*/
  }, {
    key: 'onSuggestionsFetchRequested',
    value: function onSuggestionsFetchRequested() {
      var data = this.AppState('SEARCH');
      if (data.suggestedNodes) {
        this.setState({
          suggestions: data.suggestedNodes
        });
      } else {
        if (DBG) console.log('AutoComplete.onSuggestionsFetchRequested: No suggestions.');
      }
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ Handle Autosuggest's request to clear list of suggestions
    /*/
  }, {
    key: 'onSuggestionsClearRequested',
    value: function onSuggestionsClearRequested() {
      this.setState({
        suggestions: []
      });
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ Autosuggest's callback when a selection is made
        If a new value is suggested, we call SOURCE_SELECT.
        Autocomplete-logic should handle the creation of a new data object.
    /*/
  }, {
    key: 'onSuggestionSelected',
    value: function onSuggestionSelected(event, _ref2) {
      var suggestion = _ref2.suggestion;

      // User selected an existing node in the suggestion list
      this.AppCall('SOURCE_SELECT', { nodeIDs: [suggestion.id] });
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ Autosuggest calls this whenever the user has highlighted a different suggestion
        from the suggestion list.
    /*/
  }, {
    key: 'onSuggestionHighlighted',
    value: function onSuggestionHighlighted(_ref3) {
      var suggestion = _ref3.suggestion;

      if (suggestion && suggestion.id) this.AppCall('SOURCE_HILITE', { nodeID: suggestion.id });
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ Autosuggest checks this before rendering suggestions
        Set the prop to turn off suggestions
    /*/
  }, {
    key: 'shouldRenderSuggestions',
    value: function shouldRenderSuggestions(value) {
      return this.state.mode === MODE_ACTIVE;
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ The AutoComplete field has lost focus.
        Check to see if it references a valid node, if so, select it
    /*/
  }, {
    key: 'onBlur',
    value: function onBlur(value) {
      // User selected an existing node in the suggestion list
      this.AppCall('SOURCE_SEARCH_AND_SELECT', { searchString: this.state.value });
    }

    /// REACT LIFECYCLE /////////////////////////////////////////////////////////
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ AutoComplete fields are routinely constructed and deconstructed as different
        edges and nodes are selected.  We need to keep track of whether it's
        mounted or not so that we know when it's valid to call setState.  Otherwise
        we might call setState on an unmounted component and generate a React warning.
        https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
    /*/
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      _IsMounted = true;
      this.setState({ mode: this.props.inactiveMode });
    }
    /*/
    /*/

  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _IsMounted = false;
      // deregister ACTIVEAUTOMPLETE when component unmounts
      // otherwise state updates trigger a setState on unmounted component error
      this.AppStateChangeOff('ACTIVEAUTOCOMPLETE', this.onStateChange_AUTOCOMPLETE);
    }

    /*/ Conditionally render components based on current 'mode'. The mode
        is passed
    /*/
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          value = _state.value,
          suggestions = _state.suggestions;

      var inputProps = {
        placeholder: "Type node name...",
        value: value,
        onChange: this.onInputChange,
        onBlur: this.onBlur
      };
      var jsx = void 0;

      // Show different widgets depending on mode.
      // If MODE_ACTIVE is just show the active state,
      // otherwise, use the current inactive mode in this.props.inactiveMode
      // to define the inactive state
      // because this.state.mode may not be up to date if the mode is inactive
      // due to prop changes not triggering mode updates.
      // e.g. if the parent container changed props from a disabled to
      // static state, it does not trigger a mode update in AUTOCOMPLETE.
      // This is mostly an edge case with EDGE_EDITs which will update props
      // without a corresponding UNISYS message call to trigger the mode
      // change.
      if (this.state.mode === MODE_ACTIVE) {
        jsx = React.createElement(Autosuggest, {
          suggestions: suggestions,
          shouldRenderSuggestions: this.shouldRenderSuggestions
          // Map to Local Handlers for Autosuggest event triggers (requests)
          , onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
          onSuggestionsClearRequested: this.onSuggestionsClearRequested,
          getSuggestionValue: this.getSuggestionValue,
          renderSuggestion: this.renderSuggestion
          // Receive Data from Autosuggest
          , onSuggestionHighlighted: this.onSuggestionHighlighted,
          onSuggestionSelected: this.onSuggestionSelected
          // Pass Data to Autosuggest
          , inputProps: inputProps
        });
      } else if (this.props.inactiveMode === MODE_STATIC) {
        jsx = React.createElement(
          'p',
          null,
          this.props.disabledValue
        );
      } else if (this.props.inactiveMode === MODE_DISABLED) {
        jsx = React.createElement(Input, { type: 'text', value: this.props.disabledValue, readOnly: true });
      } else {
        throw Error('AutoComplete: Unhandled mode \'' + this.state.mode + '\'');
      }

      // OLD METHOD
      // This relied on mode being updated, but a change in props does not
      // trigger a corresponding change in mode.
      // switch (this.state.mode) {
      //   case MODE_STATIC:
      //     jsx = ( <p>{this.props.disabledValue}</p> );
      //     break;
      //   case MODE_DISABLED:
      //     jsx = ( <Input type="text" value={this.props.disabledValue} readOnly={true}/> );
      //     break;
      //   case MODE_ACTIVE:
      //     jsx = (
      //       <Autosuggest
      //         suggestions={suggestions}
      //         shouldRenderSuggestions={this.shouldRenderSuggestions}
      //         // Map to Local Handlers for Autosuggest event triggers (requests)
      //         onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
      //         onSuggestionsClearRequested={this.onSuggestionsClearRequested}
      //         getSuggestionValue={this.getSuggestionValue}
      //         renderSuggestion={this.renderSuggestion}
      //         // Receive Data from Autosuggest
      //         onSuggestionHighlighted={this.onSuggestionHighlighted}
      //         onSuggestionSelected={this.onSuggestionSelected}
      //         // Pass Data to Autosuggest
      //         inputProps={inputProps}
      //       />
      //     );
      //     break;
      //   default:
      //     throw Error(`AutoComplete: Unhandled mode '${this.state.mode}'`);
      // }

      return jsx;
    } // render()

    /// END OF CLASS //////////////////////////////////////////////////////////////
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  }]);

  return AutoComplete;
}(UNISYS.Component);

/// EXPORT REACT COMPONENT ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


module.exports = AutoComplete;
});

require.register("view/netcreate/components/EdgeEditor.jsx", function(exports, require, module) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  ## OVERVIEW

    EdgeEditor is used to to view, edit, and create new edges.

    The EdgeEditor has two basic views:

    1. Minimized Summary view displays just the source and target node info.
    2. Expanded View shows the full edge information.

    You can get an expanded view by clicking on the minized view.
    The expanded view has two modes:

    1. View Mode displays the edge data but does not allow editing.
    2. Edit Mode displays an editable form.

    We assume that when you create an edge, you will have already identified
    the source node, so the source node is never editable.

    We assume that once you create an edge, the only editing you might do
    is to change the relationship, notes, and citations.  You wouldn't
    change the source or target nodes.  If you need to change them, you'd
    use DELETE.


  ## TO USE

    EdgeEditors are usually included as a repeating element, e.g.

      <FormText>EDGES</FormText>
      {this.state.edges.map( (edge,i) =>
        <EdgeEditor key={i}
          edgeID={edge.id}
          parentNodeLabel={this.state.formData.label}
        />
      )}


  ## PROPS

    edgeID            edgeID provides a unique identifier for the EdgeEditor
                      displaying the particular edge.  The edgeID is
                      used to also uniquely identify the AutoComplete
                      fields within the EdgeEditor.

    parentNodeLabel   parentNodeLabel is the label of the source node that
                      the EdgeEditor is displayed within.  This is used
                      by the EdgeEditor to determine whether it should
                      display the edge nodes as targets or sources.

  ## STATES

      dbIsLocked
                      If someone else has selected the edge for editing,
                      this flag will cause the dbIsLockedMessage
                      to be displayed.  This is only checked when
                      the user clicks "Edit".


  ## TECHNICAL DESCRIPTION


  ## TESTING


    Displaying Current Edge(s)
        0. When the app starts, no edges should be displayed in the Node Selector.
        1. Click on "Board of Health"
              * A summary view of the four nodes connected to Board of Health
                should be displayed.
        2. Click on "me -> Residents of Chinatown"
              * The form information should be displayed, including ID,
                relationship, info, and notes.
              * The form fields should be disabled (not able to be edited)
              * A "Done" button should appear.
              * A "Edit Edge" button should appear.
        3. Click "Done"
              * The "Residents of Chinatown" edge editor should collapse.
              * The other 3 Board of Health edges should still be dispalyed.
        4. Click outside of "Board of Health"
              * All edges should be removed.
        5. Click on a node without an edge, e.g. "Ah Sop"
              * No edges should be displayed
              * The "Add New Edge" button should be displayed in the EDGES area.

    Edit Existing Edge
        1. Click on "Board of Health"
        2. Click on "me -> Residents of Chinatown"
        3. Click on "Edit Edge"
              * The "NOTES" and "DATE" fields will become editable.
        4. Click "Save"
        5. Select the updated edge.
              * The changed notes and dates should appear.

    Create New Edge
        1. Click on "Board of Health"
        2. Click on "Add New Edge"
              * "Board of Health" should be automatically set as the Source field
              * A new ID "59" should be automatically inserted.
              * All fields except "Source" and "ID" should be editable.
              * A "Save" button should appear.
              * A "Done" button should NOT appear.
        3. Select a Type
              * There should be multiple type options available.
        4. Select a Target
              * The AutoComplete field should allow typing.
              * As you type you should see suggestions.
              * Each suggestion should be marked in the graph
              * You should be able to click on a suggestion from
                the suggestions list, or use the keyboard to
                select a suggestion.
        5. Type in some info.
              * The field text should update with whatever you type.
        6. Type in some notes.
              * The field text should update with whatever you type.
        7. Click "Save"
              * The selected target node should be connected to Board of Health
                in the graph.
              * The EdgeEditor form should be cleared.
              * The NodeSelector form should be cleared.
        8. Click on "Board of Health"
              * The new edge should be displayed as one of the edges.
        9. Click on the new target node summary view
              * You should see the relationship, type, and info changes.
        10. Click on the new target node in the graph
              * You should see the component along with an edge
                linked to "Board of Health"

    Delete Edge
        1. Click on "Board of Health"
        2. Click on "me -> Residents of Chinatown"
        3. Click on "DELETE"
              * The edge should be removed.
              * The graph should update with the edge remvoed.
              * The EdgeEditor for the deleted edge shoudl close.
              * The source node should remain selected.
              * The non-deleted edges should still be listed.

    Swap
        1. Select an edge where the node is the source (the edge should read "this -> OtherNode".
        2. Click "Edit Edge"
              * You should see a swap button with up/down arrows and a "Change Target" button.
        3. Click on the swap button
              * The selected node should now be the target.
        4. Click "Save" to save the change.
        5. Review the node to make sure the change took place.
        6. Reload the graph to make sure the change was saved.

    Change Target
        1. Select an edge where the node is the source (the edge should read "this -> OtherNode".
        2. Click "Edit Edge"
              * You should see a swap button with up/down arrows and a "Change Target" button.
        3. Click on the "Change Target" button
              * You should be able to search for another target node, or click on the graph to select a target node.
        4. When you've selected a target node, the Target Node field should become disabled (light blue, can't type in it).
        5. Click on "Change Target" again to pick a different target.
        6. Click "Save" to save the change.
        7. Review the node to make sure the change took place.
        8. Reload the graph to make sure the change was saved.

    Change Source
        1. Select an edge where the node is the source (the edge should read "this -> OtherNode".
        2. Click "Edit Edge"
              * You should see a "Change Source" button next to the source, and just the swap button next to the target.
        3. Click on the "Change Source" button
        4. You should be able to search for another source node, or click on the graph to select a source node.
        5. When you've selected a source node, the Source Node field should become disabled (light blue, can't type in it).
        6. Click on "Change Source" again to pick a different source.
        7. Click "Save" to save the change.
        8. Review the node to make sure the change took place.
        9. Reload the graph to make sure the change was saved.

    Save
        * The "Save" button should only be visible when the edge is being edited
        * The "Save" button should only be enabled if both the Source and Target
          fields point to valid nodes.
        * Otherwise, the "Save" button should be disabled.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

var DBG = true;
var PR = "EdgeEditor";

/// LIBRARIES /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var React = require('react');
var ReactStrap = require('reactstrap');
var Button = ReactStrap.Button,
    Col = ReactStrap.Col,
    Form = ReactStrap.Form,
    FormGroup = ReactStrap.FormGroup,
    FormText = ReactStrap.FormText,
    Input = ReactStrap.Input,
    Label = ReactStrap.Label;

var AutoComplete = require('./AutoComplete');
var NodeDetail = require('./NodeDetail');

var UNISYS = require('unisys/client');
var UDATA = null;

/// REACT COMPONENT ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// export a class object for consumption by brunch/require

var EdgeEditor = function (_UNISYS$Component) {
  _inherits(EdgeEditor, _UNISYS$Component);

  function EdgeEditor(props) {
    _classCallCheck(this, EdgeEditor);

    var _this = _possibleConstructorReturn(this, (EdgeEditor.__proto__ || Object.getPrototypeOf(EdgeEditor)).call(this, props));

    _this.state = {
      edgePrompts: _this.AppState('TEMPLATE').edgePrompts,
      formData: { // Holds the state of the form fields
        sourceId: '',
        targetId: '',
        relationship: '',
        info: '',
        notes: '',
        citation: '',
        id: '',
        isNewEdge: true
      },
      sourceNode: { // Holds the current selected source node
        label: '',
        type: '',
        info: '',
        notes: '',
        id: ''
      },
      targetNode: { // Holds the current selected target node
        label: '',
        type: '',
        info: '',
        notes: '',
        id: ''
      },
      isLocked: true, // User has not logged in, don't allow edge edit
      dbIsLocked: false, // Server Database is locked because someone else is editing
      isEditable: false, // Form is in an edtiable state
      isExpanded: false, // Show EdgeEditor Component in Summary view vs Expanded view
      sourceIsEditable: false, // Source ndoe field is only editable when source is not parent
      hasValidSource: false, // Used by SwapSourceAndTarget and the Change Source button
      targetIsEditable: false, // Target ndoe field is only editable when target is not parent
      hasValidTarget: false // Used by SwapSourceAndTarget and the Change Target button
    };

    /// Initialize UNISYS DATA LINK for REACT
    UDATA = UNISYS.NewDataLink(_this);

    _this.handleSelection = _this.handleSelection.bind(_this);
    _this.handleEdgeSelection = _this.handleEdgeSelection.bind(_this);
    _this.handleEdgeEdit = _this.handleEdgeEdit.bind(_this);
    _this.onStateChange_SESSION = _this.onStateChange_SESSION.bind(_this);
    _this.onButtonClick = _this.onButtonClick.bind(_this);
    _this.onDeleteButtonClick = _this.onDeleteButtonClick.bind(_this);
    _this.onEditButtonClick = _this.onEditButtonClick.bind(_this);
    _this.requestEdit = _this.requestEdit.bind(_this);
    _this.onSwapSourceAndTarget = _this.onSwapSourceAndTarget.bind(_this);
    _this.onChangeSource = _this.onChangeSource.bind(_this);
    _this.onChangeTarget = _this.onChangeTarget.bind(_this);
    _this.onRelationshipChange = _this.onRelationshipChange.bind(_this);
    _this.onNotesChange = _this.onNotesChange.bind(_this);
    _this.onInfoChange = _this.onInfoChange.bind(_this);
    _this.onCitationChange = _this.onCitationChange.bind(_this);
    _this.onSubmit = _this.onSubmit.bind(_this);

    // Always make sure class methods are bind()'d before using them
    // as a handler, otherwise object context is lost

    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ SESSION is called by SessionShell when the ID changes
        set system-wide. data: { classId, projId, hashedId, groupId, isValid }
    /*/_this.OnAppStateChange('SESSION', _this.onStateChange_SESSION);
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    _this.OnAppStateChange('SELECTION', function (data) {
      _this.handleSelection(data);
    });
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    UDATA.HandleMessage('EDGE_SELECT', function (data) {
      _this.handleEdgeSelection(data);
    });
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    UDATA.HandleMessage('EDGE_EDIT', function (data) {
      _this.handleEdgeEdit(data);
    });

    // Template handler
    _this.OnAppStateChange('TEMPLATE', function (data) {
      _this.setState({ edgePrompts: data.edgePrompts });
    });

    return _this;
  } // constructor


  /// UTILITIES /////////////////////////////////////////////////////////////////
  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  /*/
  /*/

  _createClass(EdgeEditor, [{
    key: 'clearForm',
    value: function clearForm() {
      this.setState({
        formData: {
          sourceId: '',
          targetId: '',
          relationship: '',
          info: '',
          notes: '',
          citation: '',
          id: '',
          isNewEdge: true
        },
        sourceNode: {
          label: '',
          type: '',
          info: '',
          notes: '',
          id: ''
        },
        targetNode: {
          label: '',
          type: '',
          info: '',
          notes: '',
          id: ''
        },
        isEditable: false,
        isExpanded: false, // Summary view vs Expanded view
        dbIsLocked: false,
        sourceIsEditable: false, // Source ndoe field is only editable when source is not parent
        hasValidSource: false, // Used by SwapSourceAndTarget and the Change Source button
        targetIsEditable: false, // Target ndoe field is only editable when target is not parent
        hasValidTarget: false // Used by SwapSourceAndTarget and the Change Target button
      });
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ populate formdata from D3DATA
    /*/
  }, {
    key: 'loadSourceAndTarget',
    value: function loadSourceAndTarget() {
      var _this2 = this;

      if (DBG) console.log('EdgeEditor.loadSourceAndTarget!');

      var edgeID = this.props.edgeID || '';
      // Clean Data
      if (isNaN(edgeID)) {
        edgeID = parseInt(edgeID);
      }

      var D3DATA = this.AppState('D3DATA');

      // parseInt in case of old bad string id
      var edges = D3DATA.edges.filter(function (edge) {
        return parseInt(edge.id) === edgeID;
      });
      if (!edges) {
        throw 'EdgeEditor: Passed edgeID' + edgeID + 'not found!';
      }
      var edge = edges[0];
      if (DBG) console.log('EdgeEditor.loadSourceAndTarget: Loading edge', edge);

      var sourceNode = void 0,
          sourceNodes = void 0,
          targetNode = void 0,
          targetNodes = void 0;

      if (edge === undefined) {

        // DEFINE NEW EDGE

        // Create a dummy empty edge object
        // This will be edited and saved
        if (DBG) console.log('...EdgeEditor.loadSourceAndTarget: New edge!  No target yet!');
        // Get a real source node, since we know the parent of this link is the currently
        // selected source node.
        sourceNodes = D3DATA.nodes.filter(function (node) {
          return node.label === _this2.props.parentNodeLabel;
        });
        // We don't know what target the user is going to pick yet, so just display a
        // placeholder for now, otherwise, the render will choke on an invalid targetNode.
        targetNodes = [{ label: 'pick one...' }];
        // set this autoComplete field as current
        this.AppCall('AUTOCOMPLETE_SELECT', { id: 'edge' + this.props.edgeID + 'target' });
        // Define `edge` so it can be loaded later during setState.
        edge = {
          id: edgeID,
          source: parseInt(sourceNodes[0].id), // REVIEW: d3data 'source' is id, rename this to 'sourceId'?
          // though after d3 processes, source does become an object.
          target: undefined,
          attributes: {
            Relationship: '',
            Info: '',
            Citations: '',
            Notes: ''
          }
          // Expand this EdgeEditor and set it to Edit mode.
        };this.setState({
          isExpanded: true,
          targetIsEditable: true,
          isEditable: true
        });

        this.AppCall('EDGEEDIT_LOCK', { edgeID: this.props.edgeID });
      } else {

        // LOAD EXISTING EDGE

        sourceNodes = D3DATA.nodes.filter(function (node) {
          return parseInt(node.id) === parseInt(edge.source.id);
        });
        targetNodes = D3DATA.nodes.filter(function (node) {
          return parseInt(node.id) === parseInt(edge.target.id);
        });

        // Assume we have a valid target node
        this.setState({
          hasValidSource: true,
          hasValidTarget: true
        });
      }

      if (!sourceNodes) {
        throw 'EdgeEditor: Source ID' + edge.source + 'not found!';
      }
      sourceNode = sourceNodes[0];
      if (!targetNodes) {
        throw 'EdgeEditor: Target ID' + edge.target + 'not found!';
      }
      targetNode = targetNodes[0];

      if (DBG) console.log('...EdgeEditor.loadSourceAndTarget: Setting formData sourceID to', edge.source, 'and sourceNode to', sourceNode, 'and targetNode to', targetNode);
      this.setState({
        formData: {
          id: parseInt(edge.id) || '',
          sourceId: edge.source,
          targetId: edge.target,
          relationship: edge.attributes["Relationship"] || '', // Make sure there's valid data
          info: edge.attributes["Info"] || '',
          citation: edge.attributes["Citations"] || '',
          notes: edge.attributes["Notes"] || '',
          isNewEdge: false
        },
        sourceNode: sourceNode,
        targetNode: targetNode,
        dbIsLocked: false
      });
    }

    /// UDATA STATE HANDLERS //////////////////////////////////////////////////////
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ When the user is creating a new node, they need to set a target node.
        The target node is set via an AutoComplete field.
        When a node is selected via the AutoComplete field, the SELECTION state is updated.
        So EdgeEditor needs to listen to the SELECTION state in order to
        know the target node has been selected.
        SELECTION is also triggered when the network updates an edge.
    /*/
  }, {
    key: 'handleSelection',
    value: function handleSelection(data) {
      var _this3 = this;

      if (DBG) console.log('EdgeEditor', this.props.edgeID, 'got SELECTION data', data);

      // If we're one of the edges that have been updated, and we're not currently being edited,
      // then update the data.
      // If we're not currently being edited, then if edges have been updated, update self
      if (data.edges !== undefined) {
        var updatedEdge = data.edges.find(function (edge) {
          return edge.id === _this3.state.formData.id;
        });
        if (!this.state.isEditable && updatedEdge !== undefined) {
          if (DBG) console.log('EdgeEditor: Updating edges with', updatedEdge);
          this.loadSourceAndTarget();
          return;
        }
      }

      // We're being edited, and the updated node is either our source or target
      // Technically we probably ought to also check to make sure we're the current
      // activeAutoCompleteId, but we wouldn't be editable if we weren't.
      if (this.state.isEditable && data.nodes && data.nodes.length > 0) {
        // A node was selected, so load it

        var node = data.nodes[0];

        // Are we editing the source or the target?
        if (this.state.sourceIsEditable) {
          // SOURCE
          if (DBG) console.log('EdgeEditor.handleSelection:', this.props.edgeID, 'setting source node to', node);

          // Set sourceNode state
          this.setState({
            sourceNode: node
          });
          // Also update the formdata
          var formData = this.state.formData;
          formData.sourceId = node.id;
          this.setState({
            formData: formData
          });
          // And let the switch button know we have a valid target
          // And exit edit mode
          this.setState({
            hasValidSource: true,
            sourceIsEditable: false
          });
        } else if (this.state.targetIsEditable) {
          // TARGET
          if (DBG) console.log('EdgeEditor.handleSelection:', this.props.edgeID, 'setting target node to', node);

          // Set targetNode state
          this.setState({
            targetNode: node
          });
          // Also update the formdata
          var _formData = this.state.formData;
          _formData.targetId = node.id;
          this.setState({
            formData: _formData
          });
          // And let the switch button know we have a valid target
          // And exit edit mode
          this.setState({
            hasValidTarget: true,
            targetIsEditable: false
          });
        }
        // pass currentAutoComplete back to search
        this.AppCall('AUTOCOMPLETE_SELECT', { id: 'search' });
        this.setState({ isExpanded: true });
      } else {
        // No node selected, so we don't need to do anything
        // AutoComplete will take care of its own search label updates
      }
    } // handleSelection
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ Someone externally has selected an edge.
        Usually someone has clicked a button in the EdgeList to view/edit an edge
    /*/
  }, {
    key: 'handleEdgeSelection',
    value: function handleEdgeSelection(data) {
      if (DBG) console.log('EdgeEditor', this.props.edgeID, ': got state EDGE_SELECT', data);

      if (this.state.formData.id === data.edgeID) {
        // pass currentAutoComplete back to search
        this.AppCall('AUTOCOMPLETE_SELECT', { id: 'search' });
        this.setState({ isExpanded: true });
      }
    } // handleEdgeSelection

    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ Someone externally has selected an edge for editing.
        Usually someone has clicked a button in the EdgeTable to edit an edge
    /*/
  }, {
    key: 'handleEdgeEdit',
    value: function handleEdgeEdit(data) {
      if (DBG) console.log('EdgeEditor', this.state.formData.id, ': got state EDGE_EDIT', data, 'formData is', this.state.formData);

      if (this.state.formData.id === data.edgeID) {
        this.requestEdit();
      }
    } // handleEdgeEdit
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ Handle change in SESSION data
        Called both by componentDidMount() and AppStateChange handler.
        The 'SESSION' state change is triggered in two places in SessionShell during
        its handleChange() when active typing is occuring, and also during
        SessionShell.componentWillMount()
    /*/
  }, {
    key: 'onStateChange_SESSION',
    value: function onStateChange_SESSION(decoded) {
      var update = { isLocked: !decoded.isValid };
      this.setState(update);
    }

    /// UI EVENT HANDLERS /////////////////////////////////////////////////////////
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ Expand if the edge is collapsed.
        Cancel editing if the edge is expanded.
    /*/
  }, {
    key: 'onButtonClick',
    value: function onButtonClick() {
      var _this4 = this;

      // REVIEW: Rename Cancel or Expand?
      // Cancel/Close
      if (this.state.isExpanded) {
        // collapse
        this.setState({ isExpanded: false });

        // If we were editing, then revert and exit
        if (this.state.isEditable) {
          this.loadSourceAndTarget();
          this.setState({ isEditable: false, targetIsEditable: false });
          this.AppCall('EDGEEDIT_UNLOCK', { edgeID: this.props.edgeID });
          this.AppCall('AUTOCOMPLETE_SELECT', { id: 'search' });
          // unlock
          this.NetCall('SRV_DBUNLOCKEDGE', { edgeID: this.state.formData.id }).then(function (data) {
            if (data.NOP) {
              if (DBG) console.log('SERVER SAYS: ' + data.NOP + ' ' + data.INFO);
            } else if (data.unlocked) {
              if (DBG) console.log('SERVER SAYS: unlock success! you have released Edge ' + data.edgeID);
              _this4.setState({ dbIsLocked: false });
            }
          });
        }
      } else {
        // expand, but don't set the autocomplete field, since we're not editing
        this.setState({ isExpanded: true });
      }
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'onDeleteButtonClick',
    value: function onDeleteButtonClick() {
      this.clearForm();
      this.AppCall('EDGEEDIT_UNLOCK', { edgeID: this.props.edgeID }); // inform NodeSelector
      this.AppCall('DB_UPDATE', { edgeID: this.props.edgeID });
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'onEditButtonClick',
    value: function onEditButtonClick() {
      this.requestEdit(this.state.formData.id);

      // Don't allow editing of the source or target fields.
      // If you want to change the edge, delete this one and create a new one.
      // if (this.props.parentNodeLabel===this.state.sourceNode.label) {
      //   // The source node is the currently selected node in NodeSelector.  Edit the target.
      //   UDATA.LocalCall('AUTOCOMPLETE_SELECT',{id:'edge'+this.props.edgeID+'target', searchString: this.state.targetNode.label});
      // } else {
      //   // The NodeSelector node is the target.  Allow editing the source.
      //   UDATA.LocalCall('AUTOCOMPLETE_SELECT',{id:'edge'+this.props.edgeID+'source', searchString: this.state.sourceNode.label});
      // }
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'requestEdit',
    value: function requestEdit() {
      var _this5 = this;

      var edgeID = this.state.formData.id;
      if (edgeID && edgeID !== '' && !isNaN(edgeID) && typeof edgeID === "number") {
        this.NetCall('SRV_DBLOCKEDGE', { edgeID: edgeID }).then(function (data) {
          if (data.NOP) {
            // Edge is locked, can't edit
            if (DBG) console.log('SERVER SAYS: ' + data.NOP + ' ' + data.INFO);
            _this5.setState({ dbIsLocked: true });
          } else if (data.locked) {
            if (DBG) console.log('SERVER SAYS: lock success! you can edit Edge ' + data.edgeID);
            if (DBG) console.log('SERVER SAYS: unlock the edge after successful DBUPDATE');
            _this5.setState({
              isEditable: true,
              isExpanded: true,
              dbIsLocked: false
            });
            _this5.AppCall('EDGEEDIT_LOCK', { edgeID: _this5.props.edgeID }); // inform NodeSelector
          }
        });
      }
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'onSwapSourceAndTarget',
    value: function onSwapSourceAndTarget() {
      var formData = this.state.formData;

      // swap formadata
      var targetId = formData.targetId;
      formData.targetId = formData.sourceId;
      formData.sourceId = targetId;

      // swap this.state.source and target
      var swap = this.state.sourceNode;
      var source = this.state.targetNode;
      var target = swap;

      // REVIEW
      // Get rid of separate this.state.source and this.state.target
      // and just use formData?!?

      this.setState({
        formData: formData,
        sourceNode: source,
        targetNode: target
      });
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'onChangeSource',
    value: function onChangeSource() {
      this.setState({
        sourceIsEditable: true,
        hasValidSource: false
      });
      this.AppCall('AUTOCOMPLETE_SELECT', { id: 'edge' + this.props.edgeID + 'source' });
      // Whenever we set the autocomplete to source, we have to update the label
      this.AppCall('SOURCE_SEARCH', { searchString: this.state.sourceNode.label });
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'onChangeTarget',
    value: function onChangeTarget() {
      this.setState({
        targetIsEditable: true,
        hasValidTarget: false
      });
      this.AppCall('AUTOCOMPLETE_SELECT', { id: 'edge' + this.props.edgeID + 'target' });
      // Whenever we set the autocomplete to target, we have to update the label
      this.AppCall('SOURCE_SEARCH', { searchString: this.state.targetNode.label });
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'onRelationshipChange',
    value: function onRelationshipChange(event) {
      var formData = this.state.formData;
      formData.relationship = event.target.value;
      this.setState({ formData: formData });
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'onInfoChange',
    value: function onInfoChange(event) {
      var formData = this.state.formData;
      formData.info = event.target.value;
      this.setState({ formData: formData });
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'onCitationChange',
    value: function onCitationChange(event) {
      var formData = this.state.formData;
      formData.citation = event.target.value;
      this.setState({ formData: formData });
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'onNotesChange',
    value: function onNotesChange(event) {
      var formData = this.state.formData;
      formData.notes = event.target.value;
      this.setState({ formData: formData });
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'onSubmit',
    value: function onSubmit(event) {
      var _this6 = this;

      event.preventDefault();
      var formData = this.state.formData;
      // Read current edge values
      // This is necessary because the SOURCE and TARGET labels
      // are bound to selectedSourceNode and selectedTargetNode, not selectedEdge
      var edge = {
        id: formData.id,
        source: this.state.sourceNode.id, // REVIEW: d3data 'source' is id, rename this to 'sourceId'?
        // though after d3 processes, source does become an object.
        target: this.state.targetNode.id, // REVIEW: d3data 'target' is id, rename this to 'targetId'?
        attributes: {
          Relationship: formData.relationship,
          Info: formData.info,
          Citations: formData.citation,
          Notes: formData.notes
        }
      };
      if (DBG) console.group('EdgeEntry.onSubmit submitting', edge);

      this.AppCall('EDGEEDIT_UNLOCK', { edgeID: this.props.edgeID }); // inform NodeSelector
      // pass currentAutoComplete back to nodeselector
      this.AppCall('AUTOCOMPLETE_SELECT', { id: 'search' });
      this.setState({ isEditable: false, sourceIsEditable: false, targetIsEditable: false });
      this.AppCall('DB_UPDATE', { edge: edge }).then(function () {
        _this6.NetCall('SRV_DBUNLOCKEDGE', { edgeID: edge.id }).then(function (data) {
          if (data.NOP) {
            if (DBG) console.log('SERVER SAYS: ' + data.NOP + ' ' + data.INFO);
          } else if (data.unlocked) {
            if (DBG) console.log('SERVER SAYS: unlock success! you have released Edge ' + data.edgeID);
            _this6.setState({ dbIsLocked: false });
          }
        });
      });
    } // onSubmit


    /// REACT LIFECYCLE METHODS ///////////////////////////////////////////////////
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ This is not yet implemented as of React 16.2.  It's implemented in 16.3.
        getDerivedStateFromProps (props, state) {
          console.error('getDerivedStateFromProps!!!');
        }
    /*/
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          edgeID = _props.edgeID,
          parentNodeLabel = _props.parentNodeLabel;
      var _state = this.state,
          formData = _state.formData,
          sourceNode = _state.sourceNode,
          targetNode = _state.targetNode,
          edgePrompts = _state.edgePrompts;

      var me = React.createElement(
        'span',
        { style: { color: "rgba(0,0,0,0.2)", fontStyle: "italic" } },
        'this node'
      );
      return React.createElement(
        'div',
        null,
        React.createElement(
          Button,
          {
            className: this.state.isExpanded ? 'd-none' : '',
            outline: true,
            size: 'sm',
            style: { backgroundColor: "#a9d3ff", borderColor: 'transparent', width: '100%', marginBottom: '3px', textAlign: "left" },
            onClick: this.onButtonClick
          },
          parentNodeLabel === sourceNode.label ? me : sourceNode.label,
          '\xA0\u2794\xA0',
          parentNodeLabel === targetNode.label ? me : targetNode.label
        ),
        React.createElement(
          'div',
          { className: this.state.isExpanded ? '' : 'd-none' },
          React.createElement(
            Form,
            { className: 'nodeEntry',
              style: { backgroundColor: "#C9E1FF", minHeight: '300px', padding: '5px', marginBottom: '10px' },
              onSubmit: this.onSubmit },
            React.createElement(
              FormText,
              null,
              React.createElement(
                'b',
                null,
                'EDGE ',
                formData.id
              )
            ),
            React.createElement(
              FormGroup,
              { row: true },
              React.createElement(
                Col,
                { sm: 3 },
                React.createElement(
                  Label,
                  { 'for': 'source', className: 'small text-muted' },
                  'Source'
                )
              ),
              React.createElement(
                Col,
                { sm: 9 },
                React.createElement(AutoComplete, {
                  identifier: 'edge' + edgeID + 'source',
                  disabledValue: sourceNode.label,
                  inactiveMode: parentNodeLabel === sourceNode.label ? 'static' : 'disabled',
                  shouldIgnoreSelection: !this.state.sourceIsEditable
                }),
                React.createElement(
                  Button,
                  { outline: true, size: 'sm', className: 'float-right',
                    hidden: !(this.state.isEditable && this.state.hasValidSource && sourceNode.label !== this.props.parentNodeLabel),
                    onClick: this.onChangeSource,
                    title: 'Select a different source node'
                  },
                  'Change Source'
                )
              )
            ),
            React.createElement(
              FormGroup,
              { row: true, hidden: edgePrompts.type.hidden },
              React.createElement(
                Col,
                { sm: 3 },
                React.createElement(
                  Label,
                  { 'for': 'relationship', className: 'small text-muted' },
                  'Type'
                )
              ),
              React.createElement(
                Col,
                { sm: 9 },
                React.createElement(
                  Input,
                  { type: 'select', name: 'relationship', id: 'relationship',
                    value: formData.relationship,
                    onChange: this.onRelationshipChange,
                    disabled: !this.state.isEditable
                  },
                  edgePrompts.type.options.map(function (option, i) {
                    return React.createElement(
                      'option',
                      { id: option.id, key: option.id },
                      option.label
                    );
                  })
                )
              )
            ),
            React.createElement(
              FormGroup,
              { row: true },
              React.createElement(
                Col,
                { sm: 3 },
                React.createElement(
                  Label,
                  { 'for': 'nodeLabel', className: 'small text-muted' },
                  'Target'
                )
              ),
              React.createElement(
                Col,
                { sm: 9 },
                React.createElement(AutoComplete, {
                  identifier: 'edge' + edgeID + 'target',
                  disabledValue: targetNode.label,
                  inactiveMode: parentNodeLabel === targetNode.label ? 'static' : 'disabled',
                  shouldIgnoreSelection: !this.state.targetIsEditable
                }),
                React.createElement(
                  Button,
                  { outline: true, size: 'sm', className: 'float-right',
                    hidden: !(this.state.isEditable && this.state.hasValidTarget && targetNode.label !== this.props.parentNodeLabel),
                    onClick: this.onChangeTarget,
                    title: 'Select a different target node'
                  },
                  'Change Target'
                ),
                React.createElement(
                  Button,
                  { outline: true, size: 'sm', className: 'float-right', style: { marginRight: '5px' },
                    hidden: !(this.state.isEditable && this.state.hasValidTarget),
                    onClick: this.onSwapSourceAndTarget,
                    title: 'Swap \'Source\' and \'Target\' nodes'
                  },
                  '\u2191\u2193'
                )
              )
            ),
            React.createElement(
              FormGroup,
              { row: true, hidden: edgePrompts.citation.hidden },
              React.createElement(
                Col,
                { sm: 3 },
                React.createElement(
                  Label,
                  { 'for': 'citation', className: 'small text-muted' },
                  edgePrompts.citation.label
                )
              ),
              React.createElement(
                Col,
                { sm: 9 },
                React.createElement(Input, { type: 'text', name: 'citation', id: 'citation',
                  value: formData.citation,
                  onChange: this.onCitationChange,
                  readOnly: !this.state.isEditable
                })
              )
            ),
            React.createElement(
              FormGroup,
              { row: true, hidden: edgePrompts.notes.hidden },
              React.createElement(
                Col,
                { sm: 3 },
                React.createElement(
                  Label,
                  { 'for': 'notes', className: 'small text-muted' },
                  edgePrompts.notes.label
                )
              ),
              React.createElement(
                Col,
                { sm: 9 },
                React.createElement(Input, { type: 'textarea', name: 'notes', id: 'notes',
                  value: formData.notes,
                  onChange: this.onNotesChange,
                  readOnly: !this.state.isEditable
                })
              )
            ),
            React.createElement(
              FormGroup,
              { row: true, hidden: edgePrompts.info.hidden },
              React.createElement(
                Col,
                { sm: 3 },
                React.createElement(
                  Label,
                  { 'for': 'info', className: 'small text-muted' },
                  edgePrompts.info.label
                )
              ),
              React.createElement(
                Col,
                { sm: 9 },
                React.createElement(Input, { type: 'text', name: 'info', id: 'info',
                  value: formData.info,
                  onChange: this.onInfoChange,
                  readOnly: !this.state.isEditable
                })
              )
            ),
            React.createElement(
              FormGroup,
              { className: 'text-right', style: { paddingRight: '5px' } },
              React.createElement(
                Button,
                { className: 'small text-muted float-left btn btn-outline-light', size: 'sm',
                  hidden: this.state.isLocked,
                  onClick: this.onDeleteButtonClick
                },
                'Delete'
              ),
              '\xA0',
              React.createElement(
                Button,
                { outline: true, size: 'sm',
                  hidden: this.state.isLocked || this.state.isEditable,
                  onClick: this.onEditButtonClick
                },
                this.state.isEditable ? "Add New Edge" : "Edit Edge"
              ),
              '\xA0',
              React.createElement(
                Button,
                { size: 'sm',
                  outline: this.state.isEditable,
                  onClick: this.onButtonClick
                },
                this.state.isEditable ? 'Cancel' : 'Close'
              ),
              '\xA0',
              React.createElement(
                Button,
                { color: 'primary', size: 'sm',
                  hidden: !this.state.isEditable,
                  disabled: !(this.state.isEditable && this.state.hasValidTarget)
                },
                'Save'
              ),
              React.createElement(
                'p',
                { hidden: !this.state.dbIsLocked, className: 'small text-danger' },
                edgePrompts.edgeIsLockedMessage
              )
            )
          )
        )
      );
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (DBG) console.log('EdgeEditor.componentDidMount!');
      this.loadSourceAndTarget();
      this.onStateChange_SESSION(this.AppState('SESSION'));
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ Release the lock if we're unmounting
    /*/
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _this7 = this;

      if (DBG) console.log('EdgeEditor.componentWillUnMount!');
      if (this.state.isEditable) {
        this.NetCall('SRV_DBUNLOCKEDGE', { edgeID: this.state.formData.id }).then(function (data) {
          if (data.NOP) {
            if (DBG) console.log('SERVER SAYS: ' + data.NOP + ' ' + data.INFO);
          } else if (data.unlocked) {
            if (DBG) console.log('SERVER SAYS: unlock success! you have released Edge ' + data.edgeID);
            _this7.setState({ dbIsLocked: false });
          }
        });
      }
    }
  }]);

  return EdgeEditor;
}(UNISYS.Component); // class EdgeEditor


/// EXPORT REACT COMPONENT ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


module.exports = EdgeEditor;
});

require.register("view/netcreate/components/EdgeTable.jsx", function(exports, require, module) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  ## OVERVIEW

    EdgeTable is used to to display a table of edges for review.


  ## TO USE

    EdgeTable is self contained and relies on global D3DATA to load.

      <EdgeTable/>


    Set `DBG` to true to show the `ID` column.

  ## 2018-12-07 Update

    Since we're not using tab navigation:
    1. The table isExpanded is now true by default.
    2. The "Show/Hide Table" button is hidden.

    Reset these to restore previous behavior.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

var DBG = false;

/// LIBRARIES /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var React = require('react');
var ReactStrap = require('reactstrap');
var Button = ReactStrap.Button,
    Table = ReactStrap.Table;


var UNISYS = require('unisys/client');
var UDATA = null;

/// REACT COMPONENT ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// export a class object for consumption by brunch/require

var EdgeTable = function (_UNISYS$Component) {
  _inherits(EdgeTable, _UNISYS$Component);

  function EdgeTable(props) {
    _classCallCheck(this, EdgeTable);

    var _this = _possibleConstructorReturn(this, (EdgeTable.__proto__ || Object.getPrototypeOf(EdgeTable)).call(this, props));

    _this.state = {
      edgePrompts: _this.AppState('TEMPLATE').edgePrompts,
      edges: [],
      isExpanded: true,
      sortkey: 'Citations'
    };

    _this.onButtonClick = _this.onButtonClick.bind(_this);
    _this.onToggleExpanded = _this.onToggleExpanded.bind(_this);
    _this.m_FindMatchingObjsByProp = _this.m_FindMatchingObjsByProp.bind(_this);
    _this.m_FindMatchingEdgeByProp = _this.m_FindMatchingEdgeByProp.bind(_this);
    _this.m_FindEdgeById = _this.m_FindEdgeById.bind(_this);
    _this.setSortKey = _this.setSortKey.bind(_this);

    /// Initialize UNISYS DATA LINK for REACT
    UDATA = UNISYS.NewDataLink(_this);

    // Always make sure class methods are bind()'d before using them
    // as a handler, otherwise object context is lost
    _this.OnAppStateChange('D3DATA', function (data) {
      _this.handleDataUpdate(data);
    });

    // Handle Template updates
    _this.OnAppStateChange('TEMPLATE', function (data) {
      _this.setState({ edgePrompts: data.edgePrompts });
    });
    return _this;
  } // constructor


  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  /*/ Handle updated SELECTION
  /*/

  _createClass(EdgeTable, [{
    key: 'handleDataUpdate',
    value: function handleDataUpdate(data) {
      if (data && data.edges) {
        this.setState({ edges: data.edges });
        this.sortTable();
      }
    }

    /// UTILITIES /////////////////////////////////////////////////////////////////
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'sortByID',
    value: function sortByID(edges) {
      if (edges) {
        return edges.sort(function (a, b) {
          var akey = a.id,
              bkey = b.id;
          if (akey < bkey) return -1;
          if (akey > bkey) return 1;
          return 0;
        });
      }
      return undefined;
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'sortBySourceLabel',
    value: function sortBySourceLabel(edges) {
      if (edges) {
        return edges.sort(function (a, b) {
          var akey = a.source.label,
              bkey = b.source.label;
          if (akey < bkey) return -1;
          if (akey > bkey) return 1;
          return 0;
        });
      }
      return undefined;
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'sortByTargetLabel',
    value: function sortByTargetLabel(edges) {
      if (edges) {
        return edges.sort(function (a, b) {
          var akey = a.target.label,
              bkey = b.target.label;
          if (akey < bkey) return -1;
          if (akey > bkey) return 1;
          return 0;
        });
      }
      return undefined;
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'sortByAttribute',
    value: function sortByAttribute(edges, key) {
      if (edges) {
        return edges.sort(function (a, b) {
          var akey = a.attributes[key],
              bkey = b.attributes[key];
          if (akey < bkey) return -1;
          if (akey > bkey) return 1;
          if (akey === bkey) {
            // Secondary sort on Source label
            var source_a = a.source.label;
            var source_b = b.source.label;
            if (source_a < source_b) return -1;
            if (source_a > source_b) return 1;
          }
          return 0;
        });
      }
      return undefined;
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ If no `sortkey` is passed, the sort will use the existing state.sortkey
    /*/
  }, {
    key: 'sortTable',
    value: function sortTable() {
      var sortkey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.sortkey;

      var edges = this.state.edges;
      switch (sortkey) {
        case 'id':
          this.sortByID(edges);
          break;
        case 'source':
          this.sortBySourceLabel(edges);
          break;
        case 'target':
          this.sortByTargetLabel(edges);
          break;
        case 'Relationship':
          this.sortByAttribute(edges, 'Relationship');
          break;
        case 'Info':
          this.sortByAttribute(edges, 'Info');
          break;
        case 'Notes':
          this.sortByAttribute(edges, 'Notes');
          break;
        case 'Citations':
        default:
          this.sortByAttribute(edges, 'Citations');
          break;
      }
      this.setState({ edges: edges });
    }

    /// UI EVENT HANDLERS /////////////////////////////////////////////////////////
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'onButtonClick',
    value: function onButtonClick(event) {
      event.preventDefault();

      var edgeID = parseInt(event.target.value);
      var edge = this.m_FindEdgeById(edgeID);

      if (DBG) console.log('EdgeTable: Edge id', edge.id, 'selected for editing');

      // Load Source then Edge
      UDATA.LocalCall('SOURCE_SELECT', { nodeIDs: [edge.source.id] }).then(function () {
        UDATA.LocalCall('EDGE_EDIT', { edgeID: edge.id });
      });
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'onToggleExpanded',
    value: function onToggleExpanded(event) {
      this.setState({
        isExpanded: !this.state.isExpanded
      });
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'setSortKey',
    value: function setSortKey(key) {
      this.setState({ sortkey: key });
      this.sortTable(key);
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'selectNode',
    value: function selectNode(id, event) {
      event.preventDefault();

      // Load Source
      if (DBG) console.log('EdgeTable: Edge id', id, 'selected for editing');
      UDATA.LocalCall('SOURCE_SELECT', { nodeIDs: [id] });
    }

    /// OBJECT HELPERS ////////////////////////////////////////////////////////////
    /// these probably should go into a utility class
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ Return array of objects that match the match_me object keys/values
        NOTE: make sure that strings are compared with strings, etc
    /*/
  }, {
    key: 'm_FindMatchingObjsByProp',
    value: function m_FindMatchingObjsByProp(obj_list) {
      var match_me = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      // operate on arrays only
      if (!Array.isArray(obj_list)) throw Error("FindMatchingObjectsByProp arg1 must be array");
      var matches = obj_list.filter(function (obj) {
        var pass = true;
        for (var key in match_me) {
          if (match_me[key] !== obj[key]) pass = false;break;
        }
        return pass;
      });
      // return array of matches (can be empty array)
      return matches;
    }

    /// EDGE HELPERS //////////////////////////////////////////////////////////////
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ Return array of nodes that match the match_me object keys/values
        NOTE: make sure that strings are compared with strings, etc
    /*/
  }, {
    key: 'm_FindMatchingEdgeByProp',
    value: function m_FindMatchingEdgeByProp() {
      var match_me = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return this.m_FindMatchingObjsByProp(this.state.edges, match_me);
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ Convenience function to retrieve edge by ID
    /*/
  }, {
    key: 'm_FindEdgeById',
    value: function m_FindEdgeById(id) {
      return this.m_FindMatchingEdgeByProp({ id: id })[0];
    }

    /// REACT LIFECYCLE METHODS ///////////////////////////////////////////////////
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ This is not yet implemented as of React 16.2.  It's implemented in 16.3.
        getDerivedStateFromProps (props, state) {
          console.error('getDerivedStateFromProps!!!');
        }
    /*/
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var edgePrompts = this.state.edgePrompts;
      var tableHeight = this.props.tableHeight;

      var styles = 'thead, tbody { display: block; }\n                    thead { position: relative; }\n                    tbody { overflow: auto; }\n                    .edgetable td:nth-child(1), .edgetable th:nth-child(1) {width: 3em; min-width: 3em;}\n                    .edgetable td:nth-child(2), .edgetable th:nth-child(2) {width: 3em; min-width: 3em;}\n                    .edgetable td:nth-child(3), .edgetable th:nth-child(3) {width: 4em; min-width: 4em;}\n                    .edgetable td:nth-child(4), .edgetable th:nth-child(4) {width: 6em; min-width: 6em;}\n                    .edgetable td:nth-child(5), .edgetable th:nth-child(5) {width: 14em; min-width: 14em;}\n                    .edgetable td:nth-child(6), .edgetable th:nth-child(6) {width: 6em; min-width: 6em;}\n                    .edgetable td:nth-child(7), .edgetable th:nth-child(7) {width: 6em; min-width: 6em;}\n                    .edgetable td:nth-child(8), .edgetable th:nth-child(8) {min-width: 6em; }';
      return React.createElement(
        'div',
        { style: { backgroundColor: '#f3f3ff' } },
        React.createElement(
          'style',
          null,
          styles
        ),
        React.createElement(
          Button,
          { size: 'sm', outline: true, hidden: true,
            onClick: this.onToggleExpanded
          },
          this.state.isExpanded ? "Hide Edge Table" : "Show Edge Table"
        ),
        React.createElement(
          Table,
          { hidden: !this.state.isExpanded, hover: true, size: 'sm',
            responsive: true, striped: true,
            className: 'edgetable'
          },
          React.createElement(
            'thead',
            null,
            React.createElement(
              'tr',
              null,
              React.createElement(
                'th',
                { hidden: !DBG },
                React.createElement(
                  Button,
                  { size: 'sm',
                    disabled: this.state.sortkey === "id",
                    onClick: function onClick() {
                      return _this2.setSortKey("id");
                    }
                  },
                  'ID'
                )
              ),
              React.createElement(
                'th',
                { hidden: !DBG },
                'Size'
              ),
              React.createElement('th', null),
              React.createElement(
                'th',
                null,
                React.createElement(
                  Button,
                  { size: 'sm',
                    disabled: this.state.sortkey === "source",
                    onClick: function onClick() {
                      return _this2.setSortKey("source");
                    }
                  },
                  edgePrompts.source.label
                )
              ),
              React.createElement(
                'th',
                null,
                React.createElement(
                  Button,
                  { size: 'sm',
                    disabled: this.state.sortkey === "Relationship",
                    onClick: function onClick() {
                      return _this2.setSortKey("Relationship");
                    }
                  },
                  edgePrompts.type.label
                )
              ),
              React.createElement(
                'th',
                null,
                React.createElement(
                  Button,
                  { size: 'sm',
                    disabled: this.state.sortkey === "target",
                    onClick: function onClick() {
                      return _this2.setSortKey("target");
                    }
                  },
                  edgePrompts.target.label
                )
              ),
              React.createElement(
                'th',
                { hidden: edgePrompts.citation.hidden },
                React.createElement(
                  Button,
                  { size: 'sm',
                    disabled: this.state.sortkey === "Citations",
                    onClick: function onClick() {
                      return _this2.setSortKey("Citations");
                    }
                  },
                  edgePrompts.citation.label
                )
              ),
              React.createElement(
                'th',
                { hidden: edgePrompts.notes.hidden },
                React.createElement(
                  Button,
                  { size: 'sm',
                    disabled: this.state.sortkey === "Notes",
                    onClick: function onClick() {
                      return _this2.setSortKey("Notes");
                    }
                  },
                  edgePrompts.notes.label
                )
              ),
              React.createElement(
                'th',
                { hidden: edgePrompts.info.hidden },
                React.createElement(
                  Button,
                  { size: 'sm',
                    disabled: this.state.sortkey === "Info",
                    onClick: function onClick() {
                      return _this2.setSortKey("Info");
                    }
                  },
                  edgePrompts.info.label
                )
              )
            )
          ),
          React.createElement(
            'tbody',
            { style: { maxHeight: tableHeight } },
            this.state.edges.map(function (edge, i) {
              return React.createElement(
                'tr',
                { key: i },
                React.createElement(
                  'td',
                  { hidden: !DBG },
                  edge.id
                ),
                React.createElement(
                  'td',
                  { hidden: !DBG },
                  edge.size
                ),
                React.createElement(
                  'td',
                  null,
                  React.createElement(
                    Button,
                    { size: 'sm', outline: true,
                      value: edge.id,
                      onClick: _this2.onButtonClick
                    },
                    'Edit'
                  )
                ),
                React.createElement(
                  'td',
                  null,
                  React.createElement(
                    'a',
                    { href: '#', onClick: function onClick(e) {
                        return _this2.selectNode(edge.source.id, e);
                      }
                    },
                    edge.source.label || edge.source
                  )
                ),
                React.createElement(
                  'td',
                  null,
                  edge.attributes["Relationship"]
                ),
                React.createElement(
                  'td',
                  null,
                  React.createElement(
                    'a',
                    { href: '#', onClick: function onClick(e) {
                        return _this2.selectNode(edge.target.id, e);
                      }
                    },
                    edge.target.label || edge.target
                  )
                ),
                React.createElement(
                  'td',
                  { hidden: edgePrompts.citation.hidden },
                  edge.attributes["Citations"]
                ),
                React.createElement(
                  'td',
                  { hidden: edgePrompts.notes.hidden },
                  edge.attributes["Notes"]
                ),
                React.createElement(
                  'td',
                  { hidden: edgePrompts.info.hidden },
                  edge.attributes["Info"]
                )
              );
            })
          )
        )
      );
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (DBG) console.log('EdgeTable.componentDidMount!');
    }
  }]);

  return EdgeTable;
}(UNISYS.Component); // class EdgeTable


/// EXPORT REACT COMPONENT ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


module.exports = EdgeTable;
});

require.register("view/netcreate/components/Help.jsx", function(exports, require, module) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  ## OVERVIEW

    Help displays a hideable generic help screen.



\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

var DBG = true;

/// LIBRARIES /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var React = require('react');
var ReactStrap = require('reactstrap');
var Button = ReactStrap.Button,
    Table = ReactStrap.Table;


var UNISYS = require('unisys/client');

/// REACT COMPONENT ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// export a class object for consumption by brunch/require

var Help = function (_UNISYS$Component) {
  _inherits(Help, _UNISYS$Component);

  function Help(props) {
    _classCallCheck(this, Help);

    var _this = _possibleConstructorReturn(this, (Help.__proto__ || Object.getPrototypeOf(Help)).call(this, props));

    _this.state = { isExpanded: true };
    _this.onToggleExpanded = _this.onToggleExpanded.bind(_this);
    return _this;
  } // constructor


  /// UI EVENT HANDLERS /////////////////////////////////////////////////////////
  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  /*/
  /*/

  _createClass(Help, [{
    key: 'onToggleExpanded',
    value: function onToggleExpanded(event) {
      this.setState({
        isExpanded: !this.state.isExpanded
      });
    }

    /// REACT LIFECYCLE METHODS ///////////////////////////////////////////////////
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ This is not yet implemented as of React 16.2.  It's implemented in 16.3.
        getDerivedStateFromProps (props, state) {
          console.error('getDerivedStateFromProps!!!');
        }
    /*/
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: 'help',
          style: { maxWidth: '50%', overflow: 'scroll',
            position: 'fixed', right: '10px', zIndex: 2000
          } },
        React.createElement(
          Button,
          { size: 'sm', outline: true, hidden: true,
            style: { float: 'right' },
            onClick: this.onToggleExpanded
          },
          this.state.isExpanded ? "Hide Help" : "Help"
        ),
        React.createElement(
          'div',
          { hidden: !this.state.isExpanded,
            style: { backgroundColor: 'rgba(240,240,240,0.95)', padding: '10px' } },
          React.createElement(
            'h1',
            null,
            'Why Net.Create'
          ),
          React.createElement(
            'p',
            null,
            'In Net.Create, users can simultaneously do data entry on nodes and the edges between them.'
          ),
          React.createElement(
            'h1',
            null,
            'Navigation'
          ),
          React.createElement(
            'ul',
            null,
            React.createElement(
              'li',
              null,
              'Recenter the graph -- press the * button'
            ),
            React.createElement(
              'li',
              null,
              'Zoom --',
              React.createElement(
                'ul',
                null,
                React.createElement(
                  'li',
                  null,
                  'on screen -- use the +/- buttons'
                ),
                React.createElement(
                  'li',
                  null,
                  'mouse -- use mousewheel'
                ),
                React.createElement(
                  'li',
                  null,
                  'trackpad -- two fingers up/down'
                ),
                React.createElement(
                  'li',
                  null,
                  'tablet -- two fingers pinch'
                )
              )
            ),
            React.createElement(
              'li',
              null,
              'Pan -- drag empty space'
            )
          ),
          React.createElement(
            'h1',
            null,
            'Nodes'
          ),
          React.createElement(
            'ul',
            null,
            React.createElement(
              'li',
              null,
              'Select -- Click on a node, or start typing the node label in the Label field and select a node from the suggestions.'
            )
          ),
          React.createElement(
            'h1',
            null,
            'Edges'
          ),
          React.createElement(
            'ul',
            null,
            React.createElement(
              'li',
              null,
              'Create -- To create an edge, first select the source node, then click "Add New Edge".'
            ),
            React.createElement(
              'li',
              null,
              'Select -- To select an edge, select either of the nodes it is attached to.'
            ),
            React.createElement(
              'li',
              null,
              'Editing -- To change the source or target of an existing edge, delete it and create a new one.'
            ),
            React.createElement(
              'li',
              null,
              'View Full List -- Click on "Show Edge Table" to view a table of all the edges.  Click on a column header to sort the table by that parameter.'
            )
          ),
          React.createElement(
            'h1',
            null,
            'About Net.Create'
          ),
          React.createElement(
            'p',
            null,
            'Net.Create is funded through the ',
            React.createElement(
              'a',
              { href: 'https://www.nsf.gov/pubs/policydocs/pappguide/nsf09_1/gpg_2.jsp#IID2', target: 'NSF' },
              'EAGER program'
            ),
            ' at ',
            React.createElement(
              'a',
              { href: 'https://www.nsf.gov/', target: 'NSF' },
              'NSF'
            ),
            ' under award #',
            React.createElement(
              'a',
              { href: 'https://www.nsf.gov/awardsearch/showAward?AWD_ID=1848655', target: 'NSF' },
              '1848655'
            ),
            '. ',
            React.createElement(
              'a',
              { href: 'http://www.kalanicraig.com', target: 'Craig' },
              'Kalani Craig'
            ),
            ' is the PI, with Co-PIs ',
            React.createElement(
              'a',
              { href: 'http://www.joshuadanish.com', target: 'Danish' },
              'Joshua Danish'
            ),
            ' and ',
            React.createElement(
              'a',
              { href: 'https://education.indiana.edu/about/directory/profiles/hmelo-silver-cindy.html', target: 'Hmelo-Silver' },
              'Cindy Hmelo-Silver'
            ),
            '. Software development provided by ',
            React.createElement(
              'a',
              { href: 'http://inquirium.net', target: 'Inquirium' },
              'Inquirium'
            ),
            '. For more information, see ',
            React.createElement(
              'a',
              { href: 'http://netcreate.org', target: 'NetCreateOrg' },
              'Net.Create.org'
            )
          )
        )
      );
    }
  }]);

  return Help;
}(UNISYS.Component); // class Help


/// EXPORT REACT COMPONENT ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


module.exports = Help;
});

require.register("view/netcreate/components/InfoPanel.jsx", function(exports, require, module) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  ## OVERVIEW

  InfoPanel shows a tab panel for selecting:
  * hiding (showing the Graph)
  * Nodes Table
  * Edges Table
  * Help

  The panel itself can be resized vertically.


\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

var DBG = true;

/// UNISYS INITIALIZE REQUIRES for REACT ROOT /////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var UNISYS = require('unisys/client');

/// LIBRARIES /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var React = require('react');
var ReactStrap = require('reactstrap');
var TabContent = ReactStrap.TabContent,
    TabPane = ReactStrap.TabPane,
    Nav = ReactStrap.Nav,
    NavItem = ReactStrap.NavItem,
    NavLink = ReactStrap.NavLink,
    Row = ReactStrap.Row,
    Col = ReactStrap.Col,
    Button = ReactStrap.Button;

var classnames = require('classnames');

var Help = require('./Help');
var Vocabulary = require('./Vocabulary');
var NodeTable = require('./NodeTable');
var EdgeTable = require('./EdgeTable');

/// REACT COMPONENT ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// export a class object for consumption by brunch/require

var InfoPanel = function (_UNISYS$Component) {
  _inherits(InfoPanel, _UNISYS$Component);

  function InfoPanel(props) {
    _classCallCheck(this, InfoPanel);

    var _this = _possibleConstructorReturn(this, (InfoPanel.__proto__ || Object.getPrototypeOf(InfoPanel)).call(this, props));

    _this.state = {
      activeTab: '1',
      tabpanelTop: '0',
      draggerMouseOffsetY: '0', // Mouse click position inside dragger
      // Allows user to grab dragger from the middle
      tabpanelHeight: '50px',
      tableHeight: '350px',
      savedTabpanelHeight: '350px',
      draggerTop: 'inherit',
      hideDragger: true
    };

    _this.toggle = _this.toggle.bind(_this);
    _this.handleMouseDown = _this.handleMouseDown.bind(_this);
    _this.endDrag = _this.endDrag.bind(_this);
    _this.handleDrag = _this.handleDrag.bind(_this);

    return _this;
  } // constructor


  /// UI EVENT HANDLERS /////////////////////////////////////////////////////////
  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  /*/
  /*/


  _createClass(InfoPanel, [{
    key: 'toggle',
    value: function toggle(tab) {
      window.event.stopPropagation();
      if (this.state.activeTab !== tab) {
        this.setState({ activeTab: tab });
        if (tab === '1' || tab === '5') {
          this.setState({
            tabpanelHeight: '50px', // show only tab buttons
            hideDragger: true
          });
        } else {
          this.setState({
            tabpanelHeight: this.state.savedTabpanelHeight,
            hideDragger: false
          });
        }
      } else {
        // Second click on currently open tab
        // so select tab 1
        this.setState({ activeTab: '1' });
        this.setState({
          tabpanelHeight: '50px', // show only tab buttons
          hideDragger: true
        });
      }
    }
  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown(e) {
      e.stopPropagation();

      var dragger = e.target;
      this.setState({ draggerMouseOffsetY: dragger.offsetTop - e.clientY });

      document.onmouseup = this.endDrag;
      document.onmousemove = this.handleDrag;
    }
  }, {
    key: 'handleDrag',
    value: function handleDrag(e) {
      e.stopPropagation();
      var top = e.clientY + this.state.draggerMouseOffsetY;
      this.setState({
        tabpanelHeight: top - this.state.tabpanelTop + 'px',
        tableHeight: top - this.state.tabpanelTop - 95 + 'px', // Hacked tab button + thead offset
        draggerTop: top + 'px',
        savedTabpanelHeight: top - this.state.tabpanelTop + 'px' // remember height when switching tabs
      });
    }
  }, {
    key: 'endDrag',
    value: function endDrag() {
      document.onmouseup = null;
      document.onmousemove = null;
    }

    /// REACT LIFECYCLE METHODS ///////////////////////////////////////////////////
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ This is not yet implemented as of React 16.2.  It's implemented in 16.3.
        getDerivedStateFromProps (props, state) {
          console.error('getDerivedStateFromProps!!!');
        }
    /*/
    /*/ This this fires after render().
    /*/

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var tabpanel = document.getElementById('tabpanel');
      this.setState({
        tabpanelTop: tabpanel.offsetTop
      });
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          tabpanelHeight = _state.tabpanelHeight,
          tableHeight = _state.tableHeight,
          hideDragger = _state.hideDragger,
          draggerTop = _state.draggerTop;

      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { id: 'tabpanel',
            style: { height: tabpanelHeight, overflow: 'hidden', backgroundColor: '#eee', padding: '5px' } },
          React.createElement(
            Nav,
            { tabs: true },
            React.createElement(
              NavItem,
              null,
              React.createElement(
                NavLink,
                {
                  className: classnames({ active: this.state.activeTab === '1' }),
                  onClick: function onClick() {
                    _this2.toggle('1');ga('send', { hitType: 'event', eventCategory: 'Tab', eventAction: 'Graph', eventLabel: '' + window.location });
                  }
                },
                'Graph'
              )
            ),
            React.createElement(
              NavItem,
              null,
              React.createElement(
                NavLink,
                {
                  className: classnames({ active: this.state.activeTab === '2' }),
                  onClick: function onClick() {
                    _this2.toggle('2');ga('send', { hitType: 'event', eventCategory: 'Tab', eventAction: 'Nodes Table', eventLabel: '' + window.location });
                  }
                },
                'Nodes Table'
              )
            ),
            React.createElement(
              NavItem,
              null,
              React.createElement(
                NavLink,
                {
                  className: classnames({ active: this.state.activeTab === '3' }),
                  onClick: function onClick() {
                    _this2.toggle('3');ga('send', { hitType: 'event', eventCategory: 'Tab', eventAction: 'Edges Table', eventLabel: '' + window.location });
                  }
                },
                'Edges Table'
              )
            ),
            React.createElement(
              NavItem,
              null,
              React.createElement(
                NavLink,
                {
                  className: classnames({ active: this.state.activeTab === '4' }),
                  onClick: function onClick() {
                    _this2.toggle('4');ga('send', { hitType: 'event', eventCategory: 'Tab', eventAction: 'Vocabulary', eventLabel: '' + window.location });
                  }
                },
                'Vocabulary'
              )
            ),
            React.createElement(
              NavItem,
              null,
              React.createElement(
                NavLink,
                {
                  className: classnames({ active: this.state.activeTab === '5' }),
                  onClick: function onClick() {
                    _this2.toggle('5');ga('send', { hitType: 'event', eventCategory: 'Tab', eventAction: 'Help', eventLabel: '' + window.location });
                  }
                },
                'Help'
              )
            )
          ),
          React.createElement(
            TabContent,
            { activeTab: this.state.activeTab },
            React.createElement(TabPane, { tabId: '1' }),
            React.createElement(
              TabPane,
              { tabId: '2' },
              React.createElement(
                Row,
                null,
                React.createElement(
                  Col,
                  { sm: '12' },
                  React.createElement(NodeTable, { tableHeight: tableHeight })
                )
              )
            ),
            React.createElement(
              TabPane,
              { tabId: '3' },
              React.createElement(
                Row,
                null,
                React.createElement(
                  Col,
                  { sm: '12' },
                  React.createElement(EdgeTable, { tableHeight: tableHeight })
                )
              )
            ),
            React.createElement(
              TabPane,
              { tabId: '4' },
              React.createElement(
                Row,
                null,
                React.createElement(
                  Col,
                  { sm: '12' },
                  React.createElement(Vocabulary, { tableHeight: tableHeight })
                )
              )
            ),
            React.createElement(
              TabPane,
              { tabId: '5' },
              React.createElement(
                Row,
                null,
                React.createElement(
                  Col,
                  { sm: '12' },
                  React.createElement(Help, null)
                )
              )
            )
          )
        ),
        React.createElement('div', { id: 'dragger', hidden: hideDragger,
          style: {
            top: draggerTop,
            position: 'absolute', width: '100%', height: '10px', backgroundColor: 'gray',
            cursor: 'ns-resize'
          },
          onMouseDown: this.handleMouseDown
        })
      );
    }
  }]);

  return InfoPanel;
}(UNISYS.Component); // class InfoPanel


/// EXPORT REACT COMPONENT ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


module.exports = InfoPanel;
});

require.register("view/netcreate/components/NetGraph.jsx", function(exports, require, module) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

    NetGraph is a React wrapper for a D3 net graph component.

    This component uses React to create the base dom element, but D3NetGraph
    handles the data updates, rendering and animation updates.

    React is explicitly prevented from updating the component (see
    shouldComponentUpdate)

    ## TO USE

            <NetGraph/>

    ## Why not use FauxDom?

    https://lab.oli.me.uk/react-faux-dom-state/
    This article suggests that maybe using force graphs with react-faux-dom
    not quite work.
        "If you want to animate things, use a React animation library (they’re
         great and work fine with faux DOM), you have to find the React way to
         do things, sadly some D3 concepts just don’t translate. If you want
         some physics based graph full of state then you’re probably better
         off keeping to the original way of embedding D3 in React, dropping
         out of React and letting D3 mutate that element."
    Indeed, in our testing, the animation updates were not optimal.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

var DBG = false;

/// LIBRARIES /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var React = require('react');
var ReactDOM = require('react-dom');
var ReactStrap = require('reactstrap');
var Button = ReactStrap.Button;

var D3NetGraph = require('./d3-simplenetgraph');
var UNISYS = require('unisys/client');

/// REACT COMPONENT ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// export a class object for consumption by brunch/require

var NetGraph = function (_UNISYS$Component) {
  _inherits(NetGraph, _UNISYS$Component);

  function NetGraph(props) {
    _classCallCheck(this, NetGraph);

    var _this = _possibleConstructorReturn(this, (NetGraph.__proto__ || Object.getPrototypeOf(NetGraph)).call(this, props));

    _this.state = {
      d3NetGraph: {}
    };

    _this.onZoomReset = _this.onZoomReset.bind(_this);
    _this.onZoomIn = _this.onZoomIn.bind(_this);
    _this.onZoomOut = _this.onZoomOut.bind(_this);

    return _this;
  } // constructor


  /// CLASS PRIVATE METHODS /////////////////////////////////////////////////////
  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  /*/
  /*/

  _createClass(NetGraph, [{
    key: 'onZoomReset',
    value: function onZoomReset() {
      this.AppCall('ZOOM_RESET', {});
    }
    /*/
    /*/
  }, {
    key: 'onZoomIn',
    value: function onZoomIn() {
      this.AppCall('ZOOM_IN', {});
    }
    /*/
    /*/
  }, {
    key: 'onZoomOut',
    value: function onZoomOut() {
      this.AppCall('ZOOM_OUT', {});
    }

    /// REACT LIFECYCLE ///////////////////////////////////////////////////////////
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // D3NetGraph Constructor
      var el = ReactDOM.findDOMNode(this);
      var d3NetGraph = new D3NetGraph(el);
      this.setState({ d3NetGraph: d3NetGraph });
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      // This prevents React from updating the component,
      // allowing D3 to handle the simulation animation updates
      // This is also necessary for D3 to handle the
      // drag events.
      return false;
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { style: { height: '100%' } },
        React.createElement(
          'div',
          null,
          React.createElement(
            'span',
            { style: { fontSize: '9px' } },
            'NETGRAPH'
          )
        ),
        React.createElement(
          'div',
          { style: { position: 'absolute', right: '10px', width: '50px', zIndex: 1001 } },
          React.createElement(
            Button,
            { outline: true, onClick: this.onZoomIn, style: { width: '35px' } },
            '+'
          ),
          '\xA0',
          React.createElement(
            Button,
            { outline: true, onClick: this.onZoomReset, style: { width: '35px' } },
            '\u2022'
          ),
          '\xA0',
          React.createElement(
            Button,
            { outline: true, onClick: this.onZoomOut, style: { width: '35px' } },
            '-'
          )
        )
      );
    }
  }]);

  return NetGraph;
}(UNISYS.Component); // class NetGraph


/// EXPORT REACT COMPONENT ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


module.exports = NetGraph;
});

require.register("view/netcreate/components/NodeDetail.jsx", function(exports, require, module) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Node Detail is a display widget that shows all of the meta information
  contained in each data node.

  If label is undefined the component will not be shown.

  Node Detail automatically shows the SELECTION.hilitedNode object.


  ## TO USE

    Add the following to the render() of the parent component:

      render() {
        return (
          ...
                <NodeDetail/>
          ...
        )
      }

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

var DBG = false;

/// LIBRARIES /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var React = require('react');
var ReactStrap = require('reactstrap');
var Table = ReactStrap.Table,
    FormText = ReactStrap.FormText;


var UNISYS = require('unisys/client');

/// REACT COMPONENT ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// export a class object for consumption by brunch/require

var NodeDetail = function (_UNISYS$Component) {
  _inherits(NodeDetail, _UNISYS$Component);

  function NodeDetail(props) {
    _classCallCheck(this, NodeDetail);

    var _this = _possibleConstructorReturn(this, (NodeDetail.__proto__ || Object.getPrototypeOf(NodeDetail)).call(this, props));

    _this.state = {
      label: undefined,
      type: '',
      info: '',
      notes: ''
    };
    _this.handleSelection = _this.handleSelection.bind(_this);

    // Always make sure that class methods are bind()'d before
    // assigning them to a handler
    _this.OnAppStateChange('SELECTION', function (stateChange) {
      _this.handleSelection(stateChange.hilitedNode);
    });
    return _this;
  } // constructor


  /// UI HANDLERS ///////////////////////////////////////////////////////////////
  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  /*/
  /*/

  _createClass(NodeDetail, [{
    key: 'handleSelection',
    value: function handleSelection(hilitedNode) {
      var node = hilitedNode || {};
      node.attributes = node.attributes || {}; // validate attributes
      this.setState({
        label: node.label,
        type: node.attributes["Node_Type"], // HACK This needs to be updated when
        info: node.attributes["Extra Info"], // the data format is updated
        notes: node.attributes["Notes"] // These were bad keys from Fusion Tables.
      });
    } // handleSelection


    /// REACT LIFECYCLE METHODS ///////////////////////////////////////////////////
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { className: this.state.label === undefined ? "d-none" : "",
          style: { minHeight: '300px', minWidth: '240px', backgroundColor: '#c7f1f1', padding: '5px', marginBottom: '10px' } },
        React.createElement(
          FormText,
          null,
          'NODE DETAIL (RF)'
        ),
        React.createElement(
          Table,
          { borderless: true, striped: true, size: 'sm' },
          React.createElement(
            'tbody',
            null,
            React.createElement(
              'tr',
              null,
              React.createElement(
                'td',
                null,
                'Label:\xA0\xA0'
              ),
              React.createElement(
                'td',
                null,
                this.state.label
              )
            ),
            React.createElement(
              'tr',
              null,
              React.createElement(
                'td',
                null,
                'Type: '
              ),
              React.createElement(
                'td',
                null,
                this.state.type
              )
            ),
            React.createElement(
              'tr',
              null,
              React.createElement(
                'td',
                null,
                'Notes:'
              ),
              React.createElement(
                'td',
                null,
                this.state.notes
              )
            ),
            React.createElement(
              'tr',
              null,
              React.createElement(
                'td',
                null,
                'Info: '
              ),
              React.createElement(
                'td',
                null,
                this.state.info
              )
            )
          )
        )
      );
    }
  }]);

  return NodeDetail;
}(UNISYS.Component); // class NodeDetail


/// EXPORT REACT COMPONENT ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


module.exports = NodeDetail;
});

require.register("view/netcreate/components/NodeSelector.jsx", function(exports, require, module) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

    ## OVERVIEW

    NodeSelector is a form for searching for, viewing, selecting, and editing
    Node information.

    NodeSelector does not modify any data.  It passes all events (text updates,
    highlights, and suggestion selections) up to nc-logic. it
    should process the events and update the data accordingly.  The
    updated data is then rendered by NodeSelector.

    ## USAGE

      <NodeSelector/>

    ## TECHNICAL DESCRIPTION

    NodeSelector handles three basic functions:

    1. Display the current SELECTION.nodes[0]
    2. Support input of node fields
    3. Send updated node field data to SOURCE_UPDATE

    As the user edits the form, we locally save the changes and send it to UNISYS
    when the user clicks "SAVE"

    The currently selected/editing node is set via SELECTION.nodes.

    Updates are sent to UNISYS via SOURCE_UPDATE.

    The AutoComplete search field is handled a little differently from the other
    input fields because it is independent of NodeSelector.  In order to keep
    NodeSelector's internal representation of form data up-to-date, we rely on
    the SELECTION updates' searchLabel field to update the label.

    There are two different levels of write-access:

      isLocked        Nodes can be selected for viewing, but editing
                      cannot be enabled.

      isEditable      The form fields are active and can be edited.


    Delete Button
    The Delete button is only displayed for an admin user.  Right now we are detecting
    this by displaying it only when the user is on `localhost`,


    ## STATES

      formData        Node data that is shown in the form

      isLocked        If true (defauilt), nodes can be displayed, but
                      "Add New Node" and "Edit Node" buttons are hidden.
                      The state is unlocked when the user logs in.

      isEditable      If true, form fields are enabled for editing
                      If false, form is readonly
                      
      dbIsLocked
                      If someone else has selected the node for editing,
                      this flag will cause the dbIsLockedMessage
                      to be displayed.  This is only checked when
                      the user clicks "Edit".


    ## TESTING

    Edit Existing Node

      1. Type 'ah'
            * Nodes on graph should hilite
            * Suggestions should be displayed
            * "Add New Node" should be shown.
      2. Highlight 'Ah Sing'
            * Ah Sing node detail should be shown
      3. Unhighlight all selections (move mouse out)
            * NodeDetail should disappear
      4. Click 'Ah Sing'
            * 'Ah Sing's details should load in form
            * "Edit Node" button should be shown.
      5. Click "Edit Node"
            * "Save" should be shown
            * All fields should be enabled
      6. Edit 'Ah Sing' to 'Ah Sing A'
            * Form should not change
            * Hilited graph node should go away
      7. Edit fields (add text)
      8. Click "Save"
            * Form should clear
      9. Check 'Ah Sing' contents to make sure changes were saved

    Create New Node

      1. Type 'ah'
            * Nodes on graph should hilite
            * Suggestions should be displayed
            * "Add New Node" should be shown.
      2. Click 'Add New Node'
            * Fields should be enabled
            * A new ID should be added
            * "Save" button should appear
      3. Edit fields
      4. Click "Save"
            * New node should appear in graph
            * The node should have the label you added 'ah'
      5. Select the node to verify the contents

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

var DBG = false;
var PR = 'NodeSelector';

/// LIBRARIES /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var React = require('react');
var ReactStrap = require('reactstrap');
var Button = ReactStrap.Button,
    Col = ReactStrap.Col,
    Form = ReactStrap.Form,
    FormGroup = ReactStrap.FormGroup,
    FormFeedback = ReactStrap.FormFeedback,
    FormText = ReactStrap.FormText,
    Label = ReactStrap.Label,
    Input = ReactStrap.Input;

var AutoComplete = require('./AutoComplete');
var NodeDetail = require('./NodeDetail');
var EdgeEditor = require('./EdgeEditor');

var UNISYS = require('unisys/client');
var DATASTORE = require('system/datastore');
var SETTINGS = require('settings');

var thisIdentifier = 'nodeSelector'; // SELECTION identifier

var isLocalHost = SETTINGS.EJSProp('client').ip === '127.0.0.1';

var UDATA = null;

/// REACT COMPONENT ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// export a class object for consumption by brunch/require

var NodeSelector = function (_UNISYS$Component) {
  _inherits(NodeSelector, _UNISYS$Component);

  function NodeSelector(props) {
    _classCallCheck(this, NodeSelector);

    var _this = _possibleConstructorReturn(this, (NodeSelector.__proto__ || Object.getPrototypeOf(NodeSelector)).call(this, props));

    _this.state = {
      nodePrompts: _this.AppState('TEMPLATE').nodePrompts,
      formData: {
        label: '',
        type: '',
        info: '',
        notes: '',
        id: '', // Always convert this to a Number
        isNewNode: true
      },
      edges: [],
      isLocked: true,
      edgesAreLocked: false,
      dbIsLocked: false,
      isEditable: false,
      isValid: false,
      isDuplicateNodeLabel: false,
      duplicateNodeID: '',
      replacementNodeID: '',
      isValidReplacementNodeID: true
    };
    // Bind functions to this component's object context
    _this.clearForm = _this.clearForm.bind(_this);
    _this.getNewNodeID = _this.getNewNodeID.bind(_this);
    _this.handleSelection = _this.handleSelection.bind(_this);
    _this.onStateChange_SEARCH = _this.onStateChange_SEARCH.bind(_this);
    _this.onStateChange_SESSION = _this.onStateChange_SESSION.bind(_this);
    _this.loadFormFromNode = _this.loadFormFromNode.bind(_this);
    _this.validateForm = _this.validateForm.bind(_this);
    _this.onLabelChange = _this.onLabelChange.bind(_this);
    _this.onTypeChange = _this.onTypeChange.bind(_this);
    _this.onNotesChange = _this.onNotesChange.bind(_this);
    _this.onInfoChange = _this.onInfoChange.bind(_this);
    _this.onReplacementNodeIDChange = _this.onReplacementNodeIDChange.bind(_this);
    _this.onNewNodeButtonClick = _this.onNewNodeButtonClick.bind(_this);
    _this.onDeleteButtonClick = _this.onDeleteButtonClick.bind(_this);
    _this.onEditButtonClick = _this.onEditButtonClick.bind(_this);
    _this.editNode = _this.editNode.bind(_this);
    _this.onAddNewEdgeButtonClick = _this.onAddNewEdgeButtonClick.bind(_this);
    _this.onCancelButtonClick = _this.onCancelButtonClick.bind(_this);
    _this.onEditOriginal = _this.onEditOriginal.bind(_this);
    _this.onCloseDuplicateDialog = _this.onCloseDuplicateDialog.bind(_this);
    _this.onSubmit = _this.onSubmit.bind(_this);

    // NOTE: assign UDATA handlers AFTER functions have been bind()'ed
    // otherwise they will lose context

    /// Initialize UNISYS DATA LINK for REACT
    UDATA = UNISYS.NewDataLink(_this);

    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ SESSION is called by SessionSHell when the ID changes
        set system-wide. data: { classId, projId, hashedId, groupId, isValid }
    /*/_this.OnAppStateChange('SESSION', _this.onStateChange_SESSION);
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    _this.OnAppStateChange('SELECTION', function (change) {
      _this.handleSelection(change);
    });
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    _this.OnAppStateChange('SEARCH', _this.onStateChange_SEARCH);
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Handle Template updates
    _this.OnAppStateChange('TEMPLATE', function (data) {
      _this.setState({ nodePrompts: data.nodePrompts });
    });
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ If someone on the network updates a node or edge, SOURCE_UPDATE is broadcast.
        We catch it here and update the selection if the node we're displaying matches
        the updated node.
        This basically handles updated Node labels in both the main node and in related
        edges.
    /*/
    UDATA.HandleMessage("SOURCE_UPDATE", function (data) {
      var needsUpdate = false;
      var currentNodeID = _this.state.formData.id;
      var updatedNodeID = data.node.id;
      if (currentNodeID === updatedNodeID) needsUpdate = true;
      _this.state.edges.forEach(function (edge) {
        if (edge.source.id === updatedNodeID || edge.target.id === updatedNodeID) needsUpdate = true;
      });
      if (needsUpdate) UDATA.LocalCall('SOURCE_SELECT', { nodeIDs: [currentNodeID] });
    });
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ This will add any new edges that have links to the currently selected node
        to the list of edges in the NodeSelector.
        IMPORTANT: We ignore edge updates if an edge is currently being edited to
        prevent edge updates from clobbering the edit.  The list of edges is
        updated after the edit is completed, so new edges are added then.
    /*/
    UDATA.HandleMessage("EDGE_UPDATE", function (data) {
      if (DBG) console.log('NodeSelector: Received EDGE_UPDATE edgesAreLocked', _this.state.edgesAreLocked, data);
      var currentNodeID = _this.state.formData.id;
      /* EDGE_UPDATES are triggered under two circumnstances:
         a. When an existing edge is updated
         b. When a new edge is created
         The call sequence is:
         1. EdgeEditor.Submit calls datastore.DB_UPDATE
         2. datastore.DB_UPDATE calls server.SRV_DBUPDATE
         3. server.SRV_DBUPDATE broadcasts EDGE_UPDATE
            At this point, edge.source and edge.target are broadcast as Numbers.
         4. EDGE_UPDATE is handled by:
            a. nc-logic.handleMessage("EDGE_UPDATE"), and
            b. NodeSelector.handlemMessage("EDGE_UPDATE") (this method)
         5. nc-logic.handleMessage("EDGE_UPDATE") processes the data and
            actually adds a new edge or updates the existing edge in D3DATA.
            *** The key is that there is a difference in how it's handled.
            For updates, the edge is simply updated.
            But for new edges, the edge object is updated and then pushed to D3DATA.
         6. When the edge object is pushed to D3DATA, D3 processes it and converts
            edge.source and edge.target into node objects.
            *** By the time NodeSelector receives the edge data, edge.source and
            edge.target are node objects, not numbers.
         So this method needs to account for the fact that edge.source and edge.target might be
         received as either numbers or objects.
      */
      var sourceID = typeof data.edge.source === "number" ? data.edge.source : data.edge.source.id;
      var targetID = typeof data.edge.target === "number" ? data.edge.target : data.edge.target.id;
      var updatedNodeIDs = [sourceID, targetID];
      if (updatedNodeIDs.includes(currentNodeID) && !_this.state.edgesAreLocked) {
        if (DBG) console.log('NodeSelector: EDGE UPDATE: Calling SOURCE_SELECT!');
        UDATA.LocalCall('SOURCE_SELECT', { nodeIDs: [currentNodeID] });
      }
    });
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // This handler is not necessary because SELECTION event clears the form
    // UDATA.HandleMessage("NODE_DELETE", (data) => {
    // });
    // This handler is not necessary because SELECTION event will update the edges
    // UDATA.HandleMessage("EDGE_DELETE", (data) => {
    // });
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ This keeps track of whether an edge is being edited to prevent network
        updates from clobbering an in-process edit.
    /*/
    UDATA.HandleMessage("EDGEEDIT_LOCK", function (data) {
      _this.setState({ edgesAreLocked: true });
    });
    UDATA.HandleMessage("EDGEEDIT_UNLOCK", function (data) {
      _this.setState({ edgesAreLocked: false });
    });

    return _this;
  } // constructor

  /// UTILITIES /////////////////////////////////////////////////////////////////
  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  /*/ Clear the form with optional label
  /*/

  _createClass(NodeSelector, [{
    key: 'clearForm',
    value: function clearForm() {
      var label = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      this.setState({
        formData: {
          label: label,
          type: '',
          info: '',
          notes: '',
          id: '', // Always convert this to a Number
          isNewNode: true
        },
        edges: [],
        dbIsLocked: false,
        isEditable: false,
        isValid: false,
        isDuplicateNodeLabel: false,
        duplicateNodeID: '',
        replacementNodeID: '',
        isValidReplacementNodeID: true
      });
    } // clearFform
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ Return a new unique ID
        REVIEW: Should this be in nc-logic?
        ANSWER: YES. There shouldn't be ANY data-synthesis code in a component!
        HACK: Replace this code with a server call
    /*/
  }, {
    key: 'getNewNodeID',
    value: function getNewNodeID() {
      throw new Error("Don't use getNewNodeID() because it is not network safe");
      /*/
      let highestID = 0;
      let ids  = this.AppState('D3DATA').nodes.map( node => { return Number(node.id) } );
      if (ids.length>0) {
        highestID = ids.reduce( (a,b) => { return Math.max(a,b) } );
      }
      // REVIEW: Should ids be strings or numbers?
      // Right now most edge ids are strings
      return (highestID+1).toString();
      /*/
    } // getNewNodeID
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ Return a new unique ID
    /*/
  }, {
    key: 'getNewEdgeID',
    value: function getNewEdgeID() {
      throw new Error("Don't use getNewEdgeID() because it is not network safe");
      /*/
      let highestID = 0;
      let ids  = this.AppState('D3DATA').edges.map( edge => { return Number(edge.id) } )
      if (ids.length>0) {
        highestID = ids.reduce( (a,b) => { return Math.max(a,b) } );
      }
      // REVIEW: Should ids be strings or numbers?
      // Right now most edge ids are strings
      return (highestID+1).toString();
      /*/
    } // getNewEdgeID
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ Handle updated SELECTION
    /*/
  }, {
    key: 'handleSelection',
    value: function handleSelection(data) {
      if (DBG) console.log('NodeSelector: got state SELECTION', data);

      // Only update if we are the currently active field
      // otherwise an Edge might be active

      var _AppState = this.AppState('ACTIVEAUTOCOMPLETE'),
          activeAutoCompleteId = _AppState.activeAutoCompleteId;

      if (activeAutoCompleteId !== thisIdentifier && activeAutoCompleteId !== 'search') return;

      if (!this.state.isEditable) {
        if (data.nodes && data.nodes.length > 0) {

          // A node was selected, so load it
          // We're not editing, so it's OK to update the form
          if (DBG) console.log('NodeSelector: updating selection', data.nodes[0]);
          // grab the first node
          var node = data.nodes[0];
          this.loadFormFromNode(node);

          // Load edges
          var thisId = this.state.formData.id;
          // -- First, sort edges by source, then target
          data.edges.sort(function (a, b) {
            if (a.source.label === b.source.label) {
              // same source label, sort on target
              if (a.target.label < b.target.label) {
                return -1;
              }
              if (a.target.label > b.target.label) {
                return 1;
              }
            }
            // Always list `this` node first
            if (a.source.id === thisId) {
              return -1;
            }
            if (b.source.id === thisId) {
              return 1;
            }
            // Otherwise sort on source
            if (a.source.label < b.source.label) {
              return -1;
            }
            if (a.source.label > b.source.label) {
              return 1;
            }
            return 0;
          });
          this.setState({
            edges: data.edges
          });
          // Exit now because we just selected a node and don't want to
          // override the form label with form updates.  Otherwise, the
          // the form label is overriden with old form data.
          return;
        } else {
          if (DBG) console.log('NodeSelector: No data.nodes, so clearing form');
          this.clearForm();
        }
      } else {
        // We're already editing, and another selection has come in.
        // What should we do?
        // * force exit?
        // * prevent load?
        // * prevent selection?
        if (DBG) console.log('NodeSelector: Already editing, ignoring SELECTION');
      }

      this.validateForm();
    } // handleSelection
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ Handle change in SESSION data
        Called both by componentWillMount() and AppStateChange handler.
        The 'SESSION' state change is triggered in two places in SessionShell during
        its handleChange() when active typing is occuring, and also during
        SessionShell.componentWillMount()
    /*/
  }, {
    key: 'onStateChange_SESSION',
    value: function onStateChange_SESSION(decoded) {
      var update = { isLocked: !decoded.isValid };
      this.setState(update);
    }

    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ Handle updated SEARCH
        AutoComplete handles its internal updates, but we do need to validate the form
        When AutoComplete's input field is updated, it sends a SOURCE_SEARCH to ACL
        which returns the updated value in SEARCH state.  AutoComplete updates
        the input field using SEARCH.  We need to update the form data here
        and validate it for NodeSelector.
    /*/
  }, {
    key: 'onStateChange_SEARCH',
    value: function onStateChange_SEARCH(data) {
      // Only update if we are the currently active field
      // otherwise an Edge might be active
      var _AppState2 = this.AppState('ACTIVEAUTOCOMPLETE'),
          activeAutoCompleteId = _AppState2.activeAutoCompleteId;

      if (activeAutoCompleteId !== thisIdentifier) return;
      var formData = this.state.formData;
      formData.label = data.searchLabel;

      // "Duplicate Node Label" is only a warning, not an error.
      // We want to allow students to enter a duplicate label if necessary
      // This is a case insensitive search
      var isDuplicateNodeLabel = false;
      var duplicateNodeID = void 0;
      if (formData.label !== '' && this.AppState('D3DATA').nodes.find(function (node) {
        if (node.id !== formData.id && node.label.localeCompare(formData.label, 'en', { usage: 'search', sensitivity: 'base' }) === 0) {
          duplicateNodeID = node.id;
          return true;
        }
        return false;
      })) {
        isDuplicateNodeLabel = true;
      }

      this.setState({
        formData: formData,
        isDuplicateNodeLabel: isDuplicateNodeLabel,
        duplicateNodeID: duplicateNodeID
      });

      this.validateForm();
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ Copy the node data passed via SELECTION in the form
    /*/
  }, {
    key: 'loadFormFromNode',
    value: function loadFormFromNode(newNode) {
      if (DBG) console.log('NodeSelector.loadFormFromNode', newNode);
      if (newNode === undefined) {
        throw "NodeSelector.loadFormFromNode called with undefined newNode!";
      }
      // Clean data
      // REVIEW: Basic data structure probably needs updating
      var node = { attributes: {} };
      if (newNode.attributes === undefined) {
        newNode.attributes = {};
      }
      // Backward Compatibility: Always convert ids to a Number or loki lookups will fail.
      if (isNaN(newNode.id)) {
        newNode.id = parseInt(newNode.id);
      }
      //
      node.label = newNode.label || '';
      node.id = newNode.id || '';
      node.attributes["Node_Type"] = newNode.attributes["Node_Type"] || '';
      node.attributes["Extra Info"] = newNode.attributes["Extra Info"] || '';
      node.attributes["Notes"] = newNode.attributes["Notes"] || '';
      // Copy to form
      this.setState({
        formData: {
          label: node.label,
          type: node.attributes["Node_Type"], // HACK This needs to be updated when
          info: node.attributes["Extra Info"], // the data format is updated
          notes: node.attributes["Notes"], // These were bad keys from Fusion Tables.
          id: node.id,
          isNewNode: false
        },
        dbIsLocked: false,
        isEditable: false,
        isDuplicateNodeLabel: false
      });

      this.validateForm();
    } // loadFormFromNode

    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'validateForm',
    value: function validateForm() {
      var isValid = false;
      var formData = this.state.formData;

      if (formData.label !== '') isValid = true;
      if (DBG) console.log('NodeSElector.validateForm: Validating', isValid, 'because label is', formData.label, '!');
      this.setState({
        isValid: isValid
      });
    }

    /// UI EVENT HANDLERS /////////////////////////////////////////////////////////
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /// REVIEW: Do we really need to manage each input field change with a state update
    /// or can we just grab the final text during the "SAVE"?
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'onLabelChange',
    value: function onLabelChange(label) {
      // REVIEW: Currently this is not being called because AutoComplete
      // doesn't have a change handler
      var node = this.state.formData;
      node.label = label;
      this.setState({ formData: node });
      this.validateForm();
    } // onLabelChange
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'onTypeChange',
    value: function onTypeChange(event) {
      var node = this.state.formData;
      node.type = event.target.value;
      this.setState({ formData: node });
    } // onTypeChange
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'onNotesChange',
    value: function onNotesChange(event) {
      var node = this.state.formData;
      node.notes = event.target.value;
      this.setState({ formData: node });
    } // onNotesChange
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'onInfoChange',
    value: function onInfoChange(event) {
      var node = this.state.formData;
      node.info = event.target.value;
      this.setState({ formData: node });
    } // onInfoChange
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/

  }, {
    key: 'onReplacementNodeIDChange',
    value: function onReplacementNodeIDChange(event) {
      var replacementNodeID = parseInt(event.target.value);
      var isValid = false;
      // Allow `` because we use a a blank field to indicate delete node without relinking edges.
      if (event.target.value === '' || this.AppState('D3DATA').nodes.find(function (node) {
        return node.id === replacementNodeID;
      })) {
        isValid = true;
      }
      this.setState({
        replacementNodeID: replacementNodeID,
        isValidReplacementNodeID: isValid
      });
    } // onReplacementNodeIDChange
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'onNewNodeButtonClick',
    value: function onNewNodeButtonClick(event) {
      var _this2 = this;

      event.preventDefault();

      // Save the search label to re-insert into the new node
      var label = this.AppState('SEARCH').searchLabel;

      // claim the AutoComplete form and populate it with the
      // current search term
      this.AppCall('AUTOCOMPLETE_SELECT', { id: thisIdentifier }).then(function () {
        _this2.AppCall('SOURCE_SEARCH', { searchString: label });
      });
      // HACK: call server to retrieve an unused node ID
      // FIXME: this kind of data manipulation should not be in a GUI component
      DATASTORE.PromiseNewNodeID().then(function (newNodeID) {
        _this2.setState({
          formData: {
            label: label,
            type: '',
            info: '',
            notes: '',
            id: newNodeID,
            isNewNode: true
          },
          edges: [],
          isEditable: true,
          isValid: false
        });

        _this2.validateForm();
      });
    } // onNewNodeButtonClick
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/

  }, {
    key: 'onDeleteButtonClick',
    value: function onDeleteButtonClick() {
      // nodeID needs to be a Number.  It should have been set in loadFormFromNode
      var nodeID = this.state.formData.id;

      // Re-link edges or delete edges?
      // `NaN` is not valid JSON, so we need to pass -1
      var replacementNodeID = this.state.replacementNodeID === '' ? -1 : parseInt(this.state.replacementNodeID); // '' = Delete edges by default

      this.clearForm();
      this.AppCall('DB_UPDATE', {
        nodeID: nodeID,
        replacementNodeID: replacementNodeID
      });
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/

  }, {
    key: 'onEditButtonClick',
    value: function onEditButtonClick(event) {
      var _this3 = this;

      event.preventDefault();

      // nodeID needs to be a Number.  It should have been set in loadFormFromNode
      var nodeID = this.state.formData.id;

      this.NetCall('SRV_DBLOCKNODE', { nodeID: nodeID }).then(function (data) {
        if (data.NOP) {
          console.log('SERVER SAYS: ' + data.NOP + ' ' + data.INFO);
          _this3.setState({ dbIsLocked: true });
        } else if (data.locked) {
          console.log('SERVER SAYS: lock success! you can edit Node ' + data.nodeID);
          console.log('SERVER SAYS: unlock the node after successful DBUPDATE');
          _this3.setState({ dbIsLocked: false });
          _this3.editNode();
        }
      });
    } // onEditButtonClick
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/

  }, {
    key: 'editNode',
    value: function editNode() {
      var _this4 = this;

      this.setState({ isEditable: true });
      // Add ID if one isn't already defined
      var formData = this.state.formData;
      if (formData.id === '') {
        throw Error('NodeSelector.onEditButtonClick trying to edit a node with no id!  This shouldn\'t happen!');
      }
      this.AppCall('AUTOCOMPLETE_SELECT', { id: thisIdentifier }).then(function () {
        // Set AutoComplete field to current data, otherwise, previously canceled label
        // might be displayed
        _this4.AppCall('SOURCE_SEARCH', { searchString: formData.label });
      });
      this.setState({ formData: formData });
      this.validateForm();
    } // editNode
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'onAddNewEdgeButtonClick',
    value: function onAddNewEdgeButtonClick(event) {
      var _this5 = this;

      event.preventDefault();
      /*
            When creating a new edge, we first
            1. Add a bare bones edge object with a new ID to the local state.edges
            2. Pass it to render, so that a new EdgeEditor will be created.
            3. In EdgeEditor, we create a dummy edge object
      */

      // HACK: call server to retrieve an unused edge ID
      // FIXME: this kind of data manipulation should not be in a GUI component
      DATASTORE.PromiseNewEdgeID().then(function (newEdgeID) {
        // Add it to local state for now
        var edge = {
          id: newEdgeID,
          source: undefined,
          target: undefined,
          attributes: {}
        };
        var edges = _this5.state.edges;
        edges.push(edge);
        _this5.setState({ edges: edges });
      });
    } // onAddNewEdgeButtonClick
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'onCancelButtonClick',
    value: function onCancelButtonClick() {
      var _this6 = this;

      // If we were editing, then revert and exit
      if (this.state.isEditable) {
        var originalNode = this.AppState('D3DATA').nodes.filter(function (node) {
          return node.id === _this6.state.formData.id;
        })[0];
        if (originalNode === undefined) {
          // user abandoned editing a new node that was never saved
          this.clearForm();
        } else {
          // restore original node
          this.loadFormFromNode(originalNode);
          this.setState({ isEditable: false });
          // unlock
          this.NetCall('SRV_DBUNLOCKNODE', { nodeID: this.state.formData.id }).then(function (data) {
            if (data.NOP) {
              console.log('SERVER SAYS: ' + data.NOP + ' ' + data.INFO);
            } else if (data.unlocked) {
              console.log('SERVER SAYS: unlock success! you have released Node ' + data.nodeID);
              _this6.setState({ dbIsLocked: false });
            }
          });
        }
        this.AppCall('AUTOCOMPLETE_SELECT', { id: 'search' });
      }
    } // onCancelButtonClick
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ Select the node for editing
    /*/

  }, {
    key: 'onEditOriginal',
    value: function onEditOriginal(event) {
      event.preventDefault();
      var duplicateNodeID = parseInt(this.state.duplicateNodeID);
      this.clearForm();
      this.setState({
        isEditable: false,
        isDuplicateNodeLabel: false
      }, function () {
        // Wait for the edit state to clear, then open up the original node
        UDATA.LocalCall('SOURCE_SELECT', { nodeIDs: [duplicateNodeID] });
      });
      this.AppCall('AUTOCOMPLETE_SELECT', { id: 'search' });
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ User confirms they want to edit the existing node.
    /*/

  }, {
    key: 'onCloseDuplicateDialog',
    value: function onCloseDuplicateDialog() {
      this.setState({ isDuplicateNodeLabel: false });
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'onSubmit',
    value: function onSubmit(event) {
      var _this7 = this;

      event.preventDefault();
      // Update the data with the selectedNode
      var formData = this.state.formData;
      var node = {
        label: formData.label,
        id: formData.id,
        attributes: {
          'Node_Type': formData.type,
          'Extra Info': formData.info,
          'Notes': formData.notes
        }
      };
      this.setState({ isEditable: false });
      // clear AutoComplete form
      this.AppCall('AUTOCOMPLETE_SELECT', { id: 'search' }).then(function () {
        // Reselect the saved node
        _this7.AppCall('SOURCE_SEARCH', { searchString: node.label });
      });
      // write data to database
      // setting dbWrite to true will distinguish this update
      // from a remote one
      this.AppCall('DB_UPDATE', { node: node }).then(function () {
        _this7.NetCall('SRV_DBUNLOCKNODE', { nodeID: formData.id }).then(function (data) {
          if (data.NOP) {
            console.log('SERVER SAYS: ' + data.NOP + ' ' + data.INFO);
          } else if (data.unlocked) {
            console.log('SERVER SAYS: unlock success! you have released Node ' + data.nodeID);
            _this7.setState({ dbIsLocked: false });
          }
        });
      });
      // probably should unlock the node:
    } // onSubmit


    /// REACT LIFECYCLE ///////////////////////////////////////////////////////////
    /*/ REACT calls this to receive the component layout and data sources
    /*/
  }, {
    key: 'render',
    value: function render() {
      var _this8 = this;

      var nodePrompts = this.state.nodePrompts;

      return React.createElement(
        'div',
        null,
        React.createElement(
          FormGroup,
          { className: 'text-right', style: { paddingRight: '5px' } },
          React.createElement(
            Button,
            { outline: true, size: 'sm',
              hidden: this.state.isLocked || this.state.isEditable,
              onClick: this.onNewNodeButtonClick
            },
            "Add New Node"
          )
        ),
        React.createElement(
          Form,
          { className: 'nodeEntry', style: { minHeight: '300px', backgroundColor: '#B8EDFF', padding: '5px', marginBottom: '0px' },
            onSubmit: this.onSubmit },
          React.createElement(
            FormText,
            null,
            React.createElement(
              'b',
              null,
              'NODE ',
              this.state.formData.id || ''
            )
          ),
          React.createElement(
            FormGroup,
            { row: true },
            React.createElement(
              Col,
              { sm: 3 },
              React.createElement(
                Label,
                { 'for': 'nodeLabel', className: 'small text-muted' },
                'Label'
              )
            ),
            React.createElement(
              Col,
              { sm: 9 },
              React.createElement(AutoComplete, {
                identifier: thisIdentifier,
                disabledValue: this.state.formData.label,
                inactiveMode: 'disabled',
                shouldIgnoreSelection: this.state.isEditable
              })
            ),
            React.createElement(
              'div',
              { hidden: !this.state.isDuplicateNodeLabel,
                style: { width: '200px', height: '150px', backgroundColor: '#B8EDFF', position: 'fixed', left: '350px', zIndex: '1000', padding: '10px' } },
              React.createElement(
                'p',
                { className: 'text-danger small' },
                nodePrompts.label.duplicateWarning
              ),
              React.createElement(
                Button,
                { size: 'sm', onClick: this.onEditOriginal },
                'View Existing'
              ),
              React.createElement(
                Button,
                { outline: true, size: 'sm', onClick: this.onCloseDuplicateDialog },
                'Continue'
              )
            )
          ),
          React.createElement(
            'div',
            { style: { position: 'absolute', left: '300px', maxWidth: '300px' } },
            React.createElement(NodeDetail, null)
          ),
          React.createElement(
            FormGroup,
            { row: true, hidden: nodePrompts.type.hidden },
            React.createElement(
              Col,
              { sm: 3 },
              React.createElement(
                Label,
                { 'for': 'type', className: 'small text-muted' },
                'Type'
              )
            ),
            React.createElement(
              Col,
              { sm: 9 },
              React.createElement(
                Input,
                { type: 'select', name: 'type', id: 'typeSelect',
                  value: this.state.formData.type || '',
                  onChange: this.onTypeChange,
                  disabled: !this.state.isEditable
                },
                nodePrompts.type.options.map(function (option, i) {
                  return React.createElement(
                    'option',
                    { id: option.id, key: option.id },
                    option.label
                  );
                })
              )
            )
          ),
          React.createElement(
            FormGroup,
            { row: true, hidden: nodePrompts.notes.hidden },
            React.createElement(
              Col,
              { sm: 3 },
              React.createElement(
                Label,
                { 'for': 'notes', className: 'small text-muted' },
                nodePrompts.notes.label
              )
            ),
            React.createElement(
              Col,
              { sm: 9 },
              React.createElement(Input, { type: 'textarea', name: 'note', id: 'notesText',
                value: this.state.formData.notes || '',
                onChange: this.onNotesChange,
                readOnly: !this.state.isEditable
              })
            )
          ),
          React.createElement(
            FormGroup,
            { row: true, hidden: nodePrompts.info.hidden },
            React.createElement(
              Col,
              { sm: 3 },
              React.createElement(
                Label,
                { 'for': 'info', className: 'small text-muted' },
                'Geocode or Date'
              )
            ),
            React.createElement(
              Col,
              { sm: 9 },
              React.createElement(Input, { type: 'text', name: 'info', id: 'info',
                value: this.state.formData.info || '',
                onChange: this.onInfoChange,
                readOnly: !this.state.isEditable
              })
            )
          ),
          React.createElement(
            FormGroup,
            { className: 'text-right', style: { paddingRight: '5px' } },
            React.createElement(
              Button,
              { outline: true, size: 'sm',
                hidden: this.state.isLocked || this.state.isEditable || this.state.formData.id === '',
                onClick: this.onEditButtonClick
              },
              'Edit Node'
            ),
            React.createElement(
              'p',
              { hidden: !this.state.dbIsLocked, className: 'small text-danger' },
              nodePrompts.label.sourceNodeIsLockedMessage
            ),
            React.createElement(
              Button,
              { outline: true, size: 'sm',
                hidden: !this.state.isEditable,
                onClick: this.onCancelButtonClick
              },
              this.state.isEditable ? 'Cancel' : 'Close'
            ),
            '\xA0',
            React.createElement(
              Button,
              { color: 'primary', size: 'sm',
                disabled: !this.state.isValid,
                hidden: !this.state.isEditable
              },
              'Save'
            )
          ),
          React.createElement(
            FormGroup,
            { row: true, className: 'text-left', style: {
                padding: '10px 5px', margin: '0 -4px', backgroundColor: '#c5e0ef' },
              hidden: !isLocalHost || this.state.isLocked || this.state.formData.id === '' || nodePrompts.delete.hidden
            },
            React.createElement(
              Col,
              { sm: 6 },
              React.createElement(
                FormText,
                null,
                'Re-link edges to this Node ID (leave blank to delete edge)'
              )
            ),
            React.createElement(
              Col,
              { sm: 6 },
              React.createElement(Input, { type: 'text', name: 'replacementNodeID', id: 'replacementNodeID',
                value: this.state.replacementNodeID || '',
                onChange: this.onReplacementNodeIDChange,
                className: '', style: { width: '4em' }, bsSize: 'sm',
                invalid: !this.state.isValidReplacementNodeID
              }),
              React.createElement(
                FormFeedback,
                null,
                'Invalid Node ID!'
              ),
              React.createElement(
                Button,
                { className: 'small text-muted btn btn-outline-light', size: 'sm',
                  onClick: this.onDeleteButtonClick
                },
                'Delete'
              )
            )
          )
        ),
        React.createElement(
          'div',
          { style: { backgroundColor: '#B9DFFF', padding: '5px', marginBottom: '10px' } },
          React.createElement(
            FormText,
            null,
            'EDGES'
          ),
          this.state.edges.map(function (edge, i) {
            return React.createElement(EdgeEditor, {
              edgeID: edge.id,
              key: edge.id,
              parentNodeLabel: _this8.state.formData.label
            });
          }),
          React.createElement(
            FormGroup,
            { className: 'text-right' },
            React.createElement(
              Button,
              { outline: true, size: 'sm',
                hidden: this.state.isLocked || this.state.formData.id === '' || this.state.isEditable,
                onClick: this.onAddNewEdgeButtonClick
              },
              'Add New Edge'
            )
          )
        )
      );
    }

    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.onStateChange_SESSION(this.AppState('SESSION'));
      this.validateForm();
    }
  }]);

  return NodeSelector;
}(UNISYS.Component); // class NodeSelector


/// EXPORT REACT COMPONENT ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


module.exports = NodeSelector;
});

require.register("view/netcreate/components/NodeTable.jsx", function(exports, require, module) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  ## OVERVIEW

    NodeTable is used to to display a table of nodes for review.


  ## TO USE

    NodeTable is self contained and relies on global D3DATA to load.

      <NodeTable/>

  ## 2018-12-07 Update

    Since we're not using tab navigation:
    1. The table isExpanded is now true by default.
    2. The "Show/Hide Table" button is hidden.

    Reset these to restore previous behavior.



\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

var DBG = false;

/// LIBRARIES /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var React = require('react');
var ReactStrap = require('reactstrap');
var Button = ReactStrap.Button,
    Table = ReactStrap.Table;


var UNISYS = require('unisys/client');
var UDATA = null;

/// REACT COMPONENT ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// export a class object for consumption by brunch/require

var NodeTable = function (_UNISYS$Component) {
  _inherits(NodeTable, _UNISYS$Component);

  function NodeTable(props) {
    _classCallCheck(this, NodeTable);

    var _this = _possibleConstructorReturn(this, (NodeTable.__proto__ || Object.getPrototypeOf(NodeTable)).call(this, props));

    _this.state = {
      nodePrompts: _this.AppState('TEMPLATE').nodePrompts,
      nodes: [],
      edgeCounts: {}, // {nodeID:count,...}
      isExpanded: true,
      sortkey: 'label'
    };

    _this.onButtonClick = _this.onButtonClick.bind(_this);
    _this.onToggleExpanded = _this.onToggleExpanded.bind(_this);
    _this.setSortKey = _this.setSortKey.bind(_this);

    /// Initialize UNISYS DATA LINK for REACT
    UDATA = UNISYS.NewDataLink(_this);

    // Always make sure class methods are bind()'d before using them
    // as a handler, otherwise object context is lost
    _this.OnAppStateChange('D3DATA', function (data) {
      _this.handleDataUpdate(data);
    });

    // Handle Template updates
    _this.OnAppStateChange('TEMPLATE', function (data) {
      _this.setState({ nodePrompts: data.nodePrompts });
    });

    return _this;
  } // constructor


  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  /*/ Handle updated SELECTION
  /*/


  _createClass(NodeTable, [{
    key: 'handleDataUpdate',
    value: function handleDataUpdate(data) {
      if (data && data.nodes) {
        this.countEdges();
        this.setState({ nodes: data.nodes });
        this.sortTable();
      }
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ Build table of counts
    /*/

  }, {
    key: 'countEdges',
    value: function countEdges() {
      var edgeCounts = this.state.edgeCounts;
      this.AppState('D3DATA').edges.forEach(function (edge) {
        edgeCounts[edge.source] = edgeCounts[edge.source] !== undefined ? edgeCounts[edge.source] + 1 : 1;
        edgeCounts[edge.target] = edgeCounts[edge.target] !== undefined ? edgeCounts[edge.target] + 1 : 1;
      });
      this.setState({ edgeCounts: edgeCounts });
    }

    /// UTILITIES /////////////////////////////////////////////////////////////////
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'sortByID',
    value: function sortByID(nodes) {
      if (nodes) {
        return nodes.sort(function (a, b) {
          var akey = a.id,
              bkey = b.id;
          if (akey < bkey) return -1;
          if (akey > bkey) return 1;
          return 0;
        });
      }
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'sortByEdgeCount',
    value: function sortByEdgeCount(nodes) {
      if (nodes) {
        var edgeCounts = this.state.edgeCounts;
        return nodes.sort(function (a, b) {
          var akey = edgeCounts[a.id] || 0,
              bkey = edgeCounts[b.id] || 0;
          // sort descending
          if (akey > bkey) return -1;
          if (akey < bkey) return 1;
          return 0;
        });
      }
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'sortByLabel',
    value: function sortByLabel(nodes) {
      if (nodes) {
        return nodes.sort(function (a, b) {
          var akey = a.label,
              bkey = b.label;
          if (akey < bkey) return -1;
          if (akey > bkey) return 1;
          return 0;
        });
      }
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'sortByAttribute',
    value: function sortByAttribute(nodes, key) {
      if (nodes) {
        return nodes.sort(function (a, b) {
          var akey = a.attributes[key],
              bkey = b.attributes[key];
          if (akey < bkey) return -1;
          if (akey > bkey) return 1;
          return 0;
        });
      }
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ If no `sortkey` is passed, the sort will use the existing state.sortkey
    /*/
  }, {
    key: 'sortTable',
    value: function sortTable() {
      var sortkey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.sortkey;

      var nodes = this.state.nodes;
      switch (sortkey) {
        case 'id':
          this.sortByID(nodes);
          break;
        case 'edgeCount':
          this.sortByEdgeCount(nodes);
          break;
        case 'type':
          this.sortByAttribute(nodes, 'Node_Type');
          break;
        case 'notes':
          this.sortByAttribute(nodes, 'Notes');
          break;
        case 'info':
          this.sortByAttribute(nodes, 'Extra Info');
          break;
        case 'label':
        default:
          this.sortByLabel(nodes);
          break;
      }
      this.setState({ nodes: nodes });
    }

    /// UI EVENT HANDLERS /////////////////////////////////////////////////////////
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'onButtonClick',
    value: function onButtonClick(event) {
      event.preventDefault();

      // REVIEW: For some reason React converts the integer IDs into string
      // values when returned in event.target.value.  So we have to convert
      // it here.
      var nodeID = parseInt(event.target.value);
      UDATA.LocalCall('SOURCE_SELECT', { nodeIDs: [nodeID] });
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'onToggleExpanded',
    value: function onToggleExpanded(event) {
      this.setState({
        isExpanded: !this.state.isExpanded
      });
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'setSortKey',
    value: function setSortKey(key) {
      this.setState({ sortkey: key });
      this.sortTable(key);
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'selectNode',
    value: function selectNode(id, event) {
      event.preventDefault();

      // REVIEW: For some reason React converts the integer IDs into string
      // values when returned in event.target.value.  So we have to convert
      // it here.
      // Load Source
      UDATA.LocalCall('SOURCE_SELECT', { nodeIDs: [parseInt(id)] });
    }

    /// REACT LIFECYCLE METHODS ///////////////////////////////////////////////////
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ This is not yet implemented as of React 16.2.  It's implemented in 16.3.
        getDerivedStateFromProps (props, state) {
          console.error('getDerivedStateFromProps!!!');
        }
    /*/
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var nodePrompts = this.state.nodePrompts;
      var tableHeight = this.props.tableHeight;

      var styles = 'thead, tbody { display: block; }\n                    thead { position: relative; }\n                    tbody { overflow: auto; }\n                    .nodetable td:nth-child(1), .nodetable th:nth-child(1) {width: 4em; min-width: 4em;}\n                    .nodetable td:nth-child(2), .nodetable th:nth-child(2) {width: 5em; min-width: 5em;}\n                    .nodetable td:nth-child(3), .nodetable th:nth-child(3) {width: 10em; min-width: 10em;}\n                    .nodetable td:nth-child(4), .nodetable th:nth-child(4) {width: 4em; min-width: 4em;}\n                    .nodetable td:nth-child(5), .nodetable th:nth-child(5) {width: 4em; min-width: 4em;}\n                    .nodetable td:nth-child(6), .nodetable th:nth-child(6) {width: 25em; min-width: 25em;}';
      return React.createElement(
        'div',
        { style: { backgroundColor: '#eafcff' } },
        React.createElement(
          'style',
          null,
          styles
        ),
        React.createElement(
          Button,
          { size: 'sm', outline: true, hidden: true,
            onClick: this.onToggleExpanded
          },
          this.state.isExpanded ? "Hide Node Table" : "Show Node Table"
        ),
        React.createElement(
          Table,
          { hidden: !this.state.isExpanded, hover: true, size: 'sm',
            responsive: true, striped: true,
            className: 'nodetable'
          },
          React.createElement(
            'thead',
            null,
            React.createElement(
              'tr',
              null,
              React.createElement('th', null),
              React.createElement(
                'th',
                null,
                React.createElement(
                  Button,
                  { size: 'sm',
                    disabled: this.state.sortkey === "edgeCount",
                    onClick: function onClick() {
                      return _this2.setSortKey("edgeCount");
                    }
                  },
                  nodePrompts.degrees.label
                )
              ),
              React.createElement(
                'th',
                null,
                React.createElement(
                  Button,
                  { size: 'sm',
                    disabled: this.state.sortkey === "label",
                    onClick: function onClick() {
                      return _this2.setSortKey("label");
                    }
                  },
                  nodePrompts.label.label
                )
              ),
              React.createElement(
                'th',
                { hidden: nodePrompts.type.hidden },
                React.createElement(
                  Button,
                  { size: 'sm',
                    disabled: this.state.sortkey === "type",
                    onClick: function onClick() {
                      return _this2.setSortKey("type");
                    }
                  },
                  nodePrompts.type.label
                )
              ),
              React.createElement(
                'th',
                { hidden: nodePrompts.info.hidden },
                React.createElement(
                  Button,
                  { size: 'sm',
                    disabled: this.state.sortkey === "info",
                    onClick: function onClick() {
                      return _this2.setSortKey("info");
                    }
                  },
                  nodePrompts.info.label
                )
              ),
              React.createElement(
                'th',
                { width: '45%', hidden: nodePrompts.notes.hidden },
                React.createElement(
                  Button,
                  { size: 'sm',
                    disabled: this.state.sortkey === "notes",
                    onClick: function onClick() {
                      return _this2.setSortKey("notes");
                    }
                  },
                  nodePrompts.notes.label
                )
              )
            )
          ),
          React.createElement(
            'tbody',
            { style: { maxHeight: tableHeight } },
            this.state.nodes.map(function (node, i) {
              return React.createElement(
                'tr',
                { key: i },
                React.createElement(
                  'td',
                  null,
                  React.createElement(
                    Button,
                    { size: 'sm', outline: true,
                      value: node.id,
                      onClick: _this2.onButtonClick
                    },
                    'Edit'
                  )
                ),
                React.createElement(
                  'td',
                  null,
                  _this2.state.edgeCounts[node.id]
                ),
                React.createElement(
                  'td',
                  null,
                  React.createElement(
                    'a',
                    { href: '#', onClick: function onClick(e) {
                        return _this2.selectNode(node.id, e);
                      }
                    },
                    node.label
                  )
                ),
                React.createElement(
                  'td',
                  { hidden: nodePrompts.type.hidden },
                  node.attributes["Node_Type"]
                ),
                React.createElement(
                  'td',
                  { hidden: nodePrompts.info.hidden },
                  node.attributes["Extra Info"]
                ),
                React.createElement(
                  'td',
                  { hidden: nodePrompts.notes.hidden },
                  node.attributes["Notes"]
                )
              );
            })
          )
        )
      );
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (DBG) console.log('NodeTable.componentDidMount!');
    }
  }]);

  return NodeTable;
}(UNISYS.Component); // class NodeTable


/// EXPORT REACT COMPONENT ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


module.exports = NodeTable;
});

require.register("view/netcreate/components/Search.jsx", function(exports, require, module) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

    ## OVERVIEW

       This provides a search field for looking up nodes.

       1. Users type in the field.
       2. The field will suggest matching nodes.
       3. User selects something from the suggestion list.
       4. The node will get loaded in NodeSelector.


    ## USAGE

      <Search/>

    ## TECHNICAL DESCRIPTION

       This provides a simple wrapper around AutoSuggest to handle
       messaging and data passing.



\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

var DBG = false;

/// LIBRARIES /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var React = require('react');
var ReactStrap = require('reactstrap');
var Col = ReactStrap.Col,
    FormGroup = ReactStrap.FormGroup,
    Label = ReactStrap.Label;

var AutoComplete = require('./AutoComplete');

var UNISYS = require('unisys/client');

var thisIdentifier = 'search'; // SELECTION identifier

/// REACT COMPONENT ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// export a class object for consumption by brunch/require

var Search = function (_UNISYS$Component) {
  _inherits(Search, _UNISYS$Component);

  function Search(props) {
    _classCallCheck(this, Search);

    var _this = _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this, props));

    _this.state = {
      searchString: ''
    };
    _this.OnStart(function () {
      // always wrap UNISYS calls in a lifescycle hook otherwise you may try to execute a call
      // before it has been declared in another module
      if (DBG) console.log('Search.OnStart: Setting active autocomplete id to', thisIdentifier);
      _this.AppCall('AUTOCOMPLETE_SELECT', { id: thisIdentifier, value: _this.state.searchString });
    });
    return _this;
  } // constructor


  /// UI EVENT HANDLERS /////////////////////////////////////////////////////////
  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  /// REACT LIFECYCLE ///////////////////////////////////////////////////////////
  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  /*/
  /*/

  _createClass(Search, [{
    key: 'componentWillMount',
    value: function componentWillMount() {}
    /*/ REACT calls this to receive the component layout and data sources
    /*/
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        FormGroup,
        { row: true },
        React.createElement(
          Col,
          { sm: 3 },
          React.createElement(
            Label,
            { className: 'small text-muted' },
            'Type to search or add a node:'
          )
        ),
        React.createElement(
          Col,
          { sm: 9 },
          React.createElement(AutoComplete, {
            identifier: thisIdentifier,
            disabledValue: this.state.searchString,
            inactiveMode: 'disabled'
          })
        )
      );
    }
  }]);

  return Search;
}(UNISYS.Component); // class Search


/// EXPORT REACT COMPONENT ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


module.exports = Search;
});

require.register("view/netcreate/components/Vocabulary.jsx", function(exports, require, module) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  ## OVERVIEW

    Vocabulary displays a list of common terms



\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

var DBG = true;

/// LIBRARIES /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var React = require('react');
var ReactStrap = require('reactstrap');
var Button = ReactStrap.Button,
    Table = ReactStrap.Table;


var UNISYS = require('unisys/client');

/// REACT COMPONENT ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// export a class object for consumption by brunch/require

var Vocabulary = function (_UNISYS$Component) {
  _inherits(Vocabulary, _UNISYS$Component);

  function Vocabulary(props) {
    _classCallCheck(this, Vocabulary);

    var _this = _possibleConstructorReturn(this, (Vocabulary.__proto__ || Object.getPrototypeOf(Vocabulary)).call(this, props));

    _this.state = { isExpanded: true };

    _this.onToggleExpanded = _this.onToggleExpanded.bind(_this);

    return _this;
  } // constructor


  /// UI EVENT HANDLERS /////////////////////////////////////////////////////////
  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  /*/
  /*/

  _createClass(Vocabulary, [{
    key: 'onToggleExpanded',
    value: function onToggleExpanded(event) {
      this.setState({
        isExpanded: !this.state.isExpanded
      });
    }

    /// REACT LIFECYCLE METHODS ///////////////////////////////////////////////////
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ This is not yet implemented as of React 16.2.  It's implemented in 16.3.
        getDerivedStateFromProps (props, state) {
          console.error('getDerivedStateFromProps!!!');
        }
    /*/
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: 'render',
    value: function render() {
      var tableHeight = this.props.tableHeight;


      return React.createElement(
        'div',
        { className: 'help',
          style: { overflow: 'auto',
            position: 'relative', display: 'block', right: '10px', maxHeight: tableHeight
          } },
        React.createElement(
          Button,
          { size: 'sm', outline: true, hidden: true,
            style: { float: 'right' },
            onClick: this.onToggleExpanded
          },
          this.state.isExpanded ? "Hide Vocabulary" : "Vocabulary"
        ),
        React.createElement(
          'div',
          { hidden: !this.state.isExpanded,
            style: { backgroundColor: 'rgba(240,240,240,0.95)', padding: '10px' } },
          React.createElement(
            'dl',
            null,
            React.createElement(
              'dt',
              null,
              'Network'
            ),
            React.createElement(
              'dd',
              null,
              'This is a collection of nodes and the edges between them. '
            ),
            React.createElement(
              'dt',
              null,
              'Graph'
            ),
            React.createElement(
              'dd',
              null,
              'a graphic representation of a network and its components. ',
              React.createElement(
                'em',
                null,
                React.createElement(
                  'strong',
                  null,
                  'Similar terms include:'
                ),
                ' sociogram, visualization'
              )
            ),
            React.createElement(
              'dt',
              null,
              'Node'
            ),
            React.createElement(
              'dd',
              null,
              'The thing or ',
              React.createElement(
                'em',
                null,
                'entity'
              ),
              ' (shown as circles) that is connected through relationships. This could be individual people, groups of people, institutions (like churches, organizations, schools). One way of thinking about this is that nodes are nouns and edges are verbs - nodes are things that are connected through edges. ',
              React.createElement(
                'em',
                null,
                React.createElement(
                  'strong',
                  null,
                  'Similar terms include:'
                ),
                ' actor, vertex'
              )
            ),
            React.createElement(
              'ul',
              null,
              React.createElement(
                'dl',
                null,
                React.createElement(
                  'dt',
                  null,
                  'Ego'
                ),
                React.createElement(
                  'dd',
                  null,
                  'This refers to the node you are focused on at the moment and the connections that they have. '
                )
              )
            ),
            React.createElement(
              'dt',
              null,
              'Edge'
            ),
            React.createElement(
              'dd',
              null,
              'The relationships between nodes you are considering (shown as lines). Relationships can take on many forms: nodes could be connected through somewhat intangible relationships, such as friendship or not liking one another. Edges can be based on interactions, such as talking to one another or being in conflict. They could also be defined by sharing resources, such as money or information. ',
              React.createElement(
                'em',
                null,
                React.createElement(
                  'strong',
                  null,
                  'Similar terms include:'
                ),
                ' line, tie, arc'
              )
            ),
            React.createElement(
              'ul',
              null,
              React.createElement(
                'dl',
                null,
                React.createElement(
                  'dt',
                  null,
                  'Edge weight'
                ),
                React.createElement(
                  'dd',
                  null,
                  'Edges can have a value attached to them. So, for instance, an node could sent $10,000 to another actor. Or, they could share three interactions of the same type with one another. This value is referred to as a weight. ',
                  React.createElement(
                    'em',
                    null,
                    React.createElement(
                      'strong',
                      null,
                      'Similar terms include:'
                    ),
                    ' value'
                  )
                ),
                React.createElement(
                  'dt',
                  null,
                  'Directed or undirected edges'
                ),
                React.createElement(
                  'dd',
                  null,
                  'Edges can either be directed or undirected. If a relationship is directed, it is being sent from (originating from) one node to another node. Node A may say they are friends with Node B, but Node B does not say Node A does this. Or Node A gives Node B something, such as resources, information, or an illness. However, in some cases, edges are defined as undirected. Two people who share a meal together or are married are both engaged share an undirected edge. ',
                  React.createElement(
                    'em',
                    null,
                    'Note: in some academic literatures, the term "edge" is reserved for an undirected relationship, while the term "arc" is used to refer to directed ties.'
                  )
                )
              )
            ),
            React.createElement(
              'dt',
              null,
              'Attributes'
            ),
            React.createElement(
              'dd',
              null,
              'Characteristics of the nodes or edges. A node could be designated by gender, for instance or the amount of wealth they possess. They could also be characteristics you find from the network itself - such as how many ties an node has (degree centrality). '
            ),
            React.createElement(
              'dt',
              null,
              'Centrality'
            ),
            React.createElement(
              'dd',
              null,
              'This is a way of ranking the importance of individuals within a network. There are many different ways to measure importance, such as degree centrality, betweenness centrality, and eigenvector centrality.  '
            ),
            React.createElement(
              'ul',
              null,
              ' ',
              React.createElement(
                'dl',
                null,
                React.createElement(
                  'dt',
                  null,
                  'Degree Centrality'
                ),
                React.createElement(
                  'dd',
                  null,
                  'Degree centrality is a measure of how many connections a node has. An node with many ties that are being sent to them has a high in-degree centrality. In a friendship network, this can be easily recognized as popularity. Nodes sending many outgoing ties (high out-degree centrality) may be thought of as expansive in their relationship.'
                ),
                React.createElement(
                  'dt',
                  null,
                  'Betweenness Centrality'
                ),
                React.createElement(
                  'dd',
                  null,
                  'Nodes with high betweenness centrality serve as connectors between other individuals who wouldn\'t otherwise be directly connected. They may not be connected to a large number of people (that would be high degree centrality), but they are unique in their connections. If an actor with high betweenness centrality was removed from a network, the network would be more fragmented and less connected. Often researchers are interested in finding actors with high betweenness centrality because they can control whatever flows in the networks. For instance, military analysts often look for nodes with high betweenness in a terrorist network.'
                ),
                React.createElement(
                  'dt',
                  null,
                  'Eigenvector Centrality'
                ),
                React.createElement(
                  'dd',
                  null,
                  'Eigenvector centrality ranks actors based on their connection to other highly central nodes. So, a nodes importance as measured by eigenvector centrality are dependent on the other nodes with whom they share connections. Google\'s PageRank algorithm was a famous application of a version of this type of centrality, and allowed them to return highly relevant results in search for users.'
                )
              )
            ),
            React.createElement(
              'dt',
              null,
              'Communities'
            ),
            React.createElement(
              'dd',
              null,
              'A community in a network is a way of thinking about grouping, often by finding densely connected sets of nodes. A community within a network that is tightly connected to one another but not to an outside group might be seen as a faction, such as rival political groups. In this case, nodes with high betweenness centrality in a network with multiple factions might be some of the only points of contact between rival groups - a potentially powerful but also difficult position to be in.'
            )
          )
        )
      );
    }
  }]);

  return Vocabulary;
}(UNISYS.Component); // class Vocabulary


/// EXPORT REACT COMPONENT ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


module.exports = Vocabulary;
});

require.register("view/netcreate/components/d3-simplenetgraph.js", function(exports, require, module) {
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

    D3 Simple NetGraph

    This is designed to work with the NetGraph React component.

    NetGraph calls SetData whenever it receives an updated data object.
    This triggers D3NetGraph to redraw itself.

    This simplified version derived from D3NetGraph.js was created to address
    a problem with links not updating properly.

    The first implementation of this removed the fancy force property settings
    that were needed to handle the realtime UI widgets in 'D3 Force Demo' app.
    Eventually these were brough back in once the link merging was debugged.
    However, this hasn't been reconciled with the `D3 Force Demo` widgets.
    It *might* work, but it *might* not.

    Zooming/panning is handled via D3's zoom() function.  Basically it
    involves creating a `g` element that wraps the node and link elements
    and applying transforms on that wrapper.

    This is based on:
    *  rdpoor's commented version of mbostock's original code
       https://gist.github.com/rdpoor/3a66b3e082ffeaeb5e6e79961192f7d8
    *  danilo's v4 update
       https://bl.ocks.org/tezzutezzu/cd04b3f1efee4186ff42aae66c87d1a7
    *  mbostock's general update pattern
       https://bl.ocks.org/mbostock/3808218
    *  Coderwall's zoom and pan method
       https://coderwall.com/p/psogia/simplest-way-to-add-zoom-pan-on-d3-js
    *  Vladyslav Babenko's zoom buttons example
       https://jsfiddle.net/vbabenko/jcsqqu6j/9/

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

var DBG = false;
var PR = 'd3-simplenetgraph';

/* eslint-disable prefer-reflect */
/* d3.call() is false-triggering the above rule */

/// SYSTEM LIBRARIES //////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var d3 = require('d3');
var UNISYS = require('unisys/client');
var UDATA = null;

/// PRIVATE VARS //////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var m_width = 800;
var m_height = 800;
var mouseoverNodeId = -1; // id of the node the mouse is currently over
var m_forceProperties = { // values for all forces
  center: {
    x: 0.5,
    y: 0.5
  },
  charge: {
    enabled: true,
    strength: -1500, //-1000, // -20,
    distanceMin: 20, //50, // 1,
    distanceMax: 1000 //2000
  },
  collide: {
    enabled: true,
    strength: 0.7,
    iterations: 1,
    radius: 4
  },
  forceX: {
    enabled: true,
    strength: 0.2, // 0.03,
    x: 0.5
  },
  forceY: {
    enabled: true,
    strength: 0.2, // 0.03,
    y: 0.5
  },
  link: {
    enabled: true,
    distance: 60, // 30,
    iterations: 2 // 1
  }
}; // m_forceProperties


/// D3NetGraph CLASS //////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var D3NetGraph = function () {
  function D3NetGraph(rootElement) {
    var _this = this;

    _classCallCheck(this, D3NetGraph);

    this.rootElement = rootElement;
    this.d3svg = {};
    this.zoom = {};
    this.zoomWrapper = {};
    this.simulation = {};
    this.data = {};

    this.clickFn = {};

    this.defaultSize = 5;

    /// Initialize UNISYS DATA LINK for REACT
    UDATA = UNISYS.NewDataLink(this);

    /// D3 CODE ///////////////////////////////////////////////////////////////////
    /// note: this is all inside the class constructor function!
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    // Set up Zoom
    this.zoom = d3.zoom().on("zoom", this._HandleZoom);

    /*/ Create svg element which will contain our D3 DOM elements.
        Add default click handler so when clicking empty space, deselect all.
        NOTE: the svg element is actualy d3.selection object, not an svg obj.
    /*/this.d3svg = d3.select(rootElement).append('svg').attr('id', 'netgraph').attr('width', "100%") // maximize width and height
    .attr('height', "100%") // then set center dynamically below
    .on("click", function (e, event) {
      // Deselect
      UDATA.LocalCall('SOURCE_SELECT', { nodeLabels: [] });
    }).on("mouseover", function (d) {
      // Deselect edges
      mouseoverNodeId = -1;
      d3.selectAll('.edge').transition().duration(1500).style('stroke-width', _this._UpdateLinkStrokeWidth);
      d3.event.stopPropagation();
    }).call(this.zoom);

    this.zoomWrapper = this.d3svg.append('g').attr("class", "zoomer");

    // Set SVG size and centering.
    var svg = document.getElementById('netgraph');
    m_width = svg.clientWidth;
    m_height = svg.clientHeight;

    this.simulation = d3.forceSimulation();

    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /// END D3 CODE ///////////////////////////////////////////////////////////////

    // bind 'this' to function objects so event handlers can access
    // contents of this class+module instance
    this._SetData = this._SetData.bind(this);
    this._Initialize = this._Initialize.bind(this);
    this._UpdateGraph = this._UpdateGraph.bind(this);
    this._UpdateForces = this._UpdateForces.bind(this);
    this._Tick = this._Tick.bind(this);
    this._HandleZoom = this._HandleZoom.bind(this);
    this._Dragstarted = this._Dragstarted.bind(this);
    this._Dragged = this._Dragged.bind(this);
    this._Dragended = this._Dragended.bind(this);

    // watch for updates to the D3DATA data object
    UDATA.OnAppStateChange('D3DATA', function (data) {
      // expect { nodes, edges } for this namespace
      if (DBG) console.log(PR, 'got state D3DATA', data);
      _this._SetData(data);
    });

    // The template may be loaded or changed after D3DATA is loaded.
    // So we need to explicitly update the colors if the color
    // definitions have changed.
    UDATA.OnAppStateChange('NODECOLORMAP', function (data) {
      if (DBG) console.log(PR, 'got state NODECOLORMAP', data);
      _this._UpdateGraph();
    });

    UDATA.HandleMessage('ZOOM_RESET', function (data) {
      if (DBG) console.log(PR, 'ZOOM_RESET got state D3DATA', data);
      _this.d3svg.transition().duration(200).call(_this.zoom.scaleTo, 1);
    });

    UDATA.HandleMessage('ZOOM_IN', function (data) {
      if (DBG) console.log(PR, 'ZOOM_IN got state D3DATA', data);
      _this._Transition(1.2);
    });

    UDATA.HandleMessage('ZOOM_OUT', function (data) {
      if (DBG) console.log(PR, 'ZOOM_OUT got state D3DATA', data);
      _this._Transition(0.8);
    });
  }

  /// CLASS PUBLIC METHODS //////////////////////////////////////////////////////
  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


  /// CLASS PRIVATE METHODS /////////////////////////////////////////////////////
  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  /*/ The parent container passes data to the d3 graph via this SetData call
      which then triggers all the internal updates
  /*/

  _createClass(D3NetGraph, [{
    key: '_SetData',
    value: function _SetData(newData) {
      this.data = newData;
      if (newData && newData.nodes) {
        this._Initialize();
        this._UpdateForces();
        this._UpdateGraph();
        // updates ignored until this is run restarts the simulation
        // (important if simulation has already slowed down)
        this.simulation.alpha(1).restart();
      }
    }
    /*/ This sets up the force properties for the simulation and tick handler.
    /*/
  }, {
    key: '_Initialize',
    value: function _Initialize() {
      // Create the force layout.  After a call to force.start(), the tick
      // method will be called repeatedly until the layout "gels" in a stable
      // configuration.
      this.simulation.force("link", d3.forceLink()).force("charge", d3.forceManyBody()).force("collide", d3.forceCollide()).force("center", d3.forceCenter()).force("forceX", d3.forceX()).force("forceY", d3.forceY()).on("tick", this._Tick);
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ Call _UpdateGraph() after new data has been loaded. This creates link and node
        svg objects and sets their forceProperties.
        The component `node` structure:
            <g class="node">  // node group object
               <circle>
               <text>         // label
               <title>        // tooltip
            </g>
    
        This method implements the unified enter/exit/update pattern described
        here: http://d3indepth.com/enterexit/#general-update-pattern
    
        By convention, selection methods that return the current selection use
        four spaces of indent, while methods that return a new selection use only two.
        This helps reveal changes of context by making them stick out of the chain.
    
        This method actually does more than just "update" an existing graph; in D3
        you can write code that initializes AND updates data.
    
    /*/
  }, {
    key: '_UpdateGraph',
    value: function _UpdateGraph() {
      var _this2 = this;

      var COLORMAP = UDATA.AppState('NODECOLORMAP');

      // DATA JOIN
      // select all elemnts with class .node in d3svg
      // bind selected elements with elements in this.data.nodes,
      // assigning each one an id using the key function.

      // nodeElements is a d3.selection object
      var nodeElements = this.zoomWrapper.selectAll(".node").data(this.data.nodes, function (d) {
        return d.id;
      }); // fn returns the calculated key for the data object

      // edges is a d3.selection object
      var linkElements = this.zoomWrapper.selectAll(".edge").data(this.data.edges, function (d) {
        return d.id;
      }); // fn returns the calculated key for the data object

      // TELL D3 HOW TO HANDLE NEW NODE DATA
      // the d3.selection.enter() method sets the operational scope for
      // subsequent calls
      var elementG = nodeElements.enter().append("g").classed('node', true);

      // enter node: append 'g' (group) element and click behavior
      elementG.call(d3.drag().on("start", function (d) {
        _this2._Dragstarted(d, _this2);
      }).on("drag", this._Dragged).on("end", function (d) {
        _this2._Dragended(d, _this2);
      })).on("click", function (d) {
        if (DBG) console.log('clicked on', d.label, d.id);
        UDATA.LocalCall('SOURCE_SELECT', { nodeIDs: [d.id] });
        d3.event.stopPropagation();
      }).on("mouseover", function (d) {
        mouseoverNodeId = d.id;
        d3.selectAll('.edge').transition().duration(500).style('stroke-width', _this2._UpdateLinkStrokeWidth);
        d3.event.stopPropagation();
      });

      // enter node: also append 'circle' element of a calculated size
      elementG.append("circle")
      // "r" has to be set here or circles don't draw.
      .attr("r", function (d) {
        var radius = _this2.data.edges.reduce(function (acc, ed) {
          return ed.source === d.id || ed.target === d.id ? acc + 1 : acc;
        }, 1);
        d.weight = radius;
        d.size = radius; // save the calculated size
        return _this2.defaultSize + _this2.defaultSize * d.weight / 2;
      })
      //        .attr("r", (d) => { return this.defaultSize }) // d.size ?  d.size/10 : this.defaultSize; })
      .attr("fill", function (d) {
        // REVIEW: Using label match.  Should we use id instead?
        // The advantage of using the label is backward compatibility with
        // Google Fusion table data as well as exportability.
        // If we save the type as an id, the data format will be
        // less human-readable.
        // The problem with this approach though is that any changes
        // to the label text will result in a failed color lookup!
        return COLORMAP[d.attributes["Node_Type"]];
      });

      // enter node: also append 'text' element
      elementG.append("text").classed('noselect', true).attr("font-size", 10).attr("dx", function (d) {
        return _this2.defaultSize + 5;
      }) // 8)
      .attr("dy", "0.35em") // ".15em")
      .text(function (d) {
        return d.label;
      });

      // enter node: also append a 'title' tag
      elementG.append("title") // node tooltip
      .text(function (d) {
        return d.label;
      });

      /*/ TRICKY D3 CODE CONCEPTS AHEAD
           CONTEXT: The author of this code has assumed that D3DATA may
          completely changed, so his update code is written with this in mind.
           At this point in the code, nodeElements is operating on the enter()
          selection set (remember: nodeElements is a REFERENCE to the
          original d3 selection object, which is being transmutted by every
          operation).
           Given the above, .merge() will combine the current active d3
          selection (enter()) with all the nodes (nodeEntry in its entirety).
           It may seem weird because:
           (1) the d3.selection() context isn't always obvious unless you
              know that d3.selections and key ops like .enter(), .update(),
              and .exit() affect certain other ops.
          (2) this code reads like it's executing immediately on nodeElements,
              but it actually is a PROGRAM being defined for a d3.selection
              event that runs later. The value of the parameter nodeElements
              will have a different value in the future than it does at the
              time of definition here.
           In effect, the merge() operation is used to use the same
          initialization code for both enter() and manual refresh.
           ASIDE: There is an d3.selection.update() operation, but that  is
          called when d3 detects that data node bound to an existing DOM
          element has changed. This code doesn't use update(), and instead
          relies on manual event detection to force a full data refresh and
          update. D3 doesn't die because it is aware of the persistent SVG
          elements  it created, and checks data binding through the id. This
          is fast, and the SVG elements do not have to be recreated.
       /*/

      // UPDATE circles in each node for all nodes
      nodeElements.merge(nodeElements).selectAll("circle").attr("stroke", function (d) {
        if (d.selected) return d.selected;
        if (d.strokeColor) return d.strokeColor;
        return undefined; // don't set stroke color
      }).attr("stroke-width", function (d) {
        if (d.selected || d.strokeColor) return '5px';
        return undefined; // don't set stroke width
      })
      // this "r" is necessary to resize after a link is added
      .attr("fill", function (d) {
        // REVIEW: Using label match.  Should we use id instead?
        return COLORMAP[d.attributes["Node_Type"]];
      }).attr("r", function (d) {
        var radius = _this2.data.edges.reduce(function (acc, ed) {
          return ed.source.id === d.id || ed.target.id === d.id ? acc + 1 : acc;
        }, 1);
        d.weight = radius;
        d.size = radius; // save the calculated size
        return _this2.defaultSize + _this2.defaultSize * d.weight / 2;
      });

      // UPDATE text in each node for all nodes
      // (technically this could have proceeded from the previous operation,
      // but this makes it a little easier to findthe text-specific code as
      // a block
      nodeElements.merge(nodeElements).selectAll("text").attr("color", function (d) {
        if (d.selected) return d.selected;
        return undefined; // don't set color
      }).attr("font-weight", function (d) {
        if (d.selected) return 'bold';
        return undefined; // don't set font weight
      }).text(function (d) {
        return d.label;
      }); // in case text is updated

      // TELL D3 what to do when a data node goes away
      nodeElements.exit().remove();

      // NOW TELL D3 HOW TO HANDLE NEW EDGE DATA
      // .insert will add an svg `line` before the objects classed `.node`
      // .enter() sets the initial state of links as they are created
      linkElements.enter().insert("line", ".node").classed('edge', true).style('stroke', '#999')
      // .style('stroke', 'rgba(0,0,0,0.1)')  // don't use alpha unless we're prepared to handle layering -- reveals unmatching links
      .style('stroke-width', this._UpdateLinkStrokeWidth);
      // old stroke setting
      // .style('stroke-width', (d) => { return d.size**2 } )    // Use **2 to make size differences more noticeable
      // Edge selection disabled.
      // .on("click",   (d) => {
      //   if (DBG) console.log('clicked on',d.label,d.id)
      //   this.edgeClickFn( d )
      // })

      // .merge() updates the visuals whenever the data is updated.
      linkElements.merge(linkElements).classed("selected", function (d) {
        return d.selected;
      }).style('stroke-width', this._UpdateLinkStrokeWidth);

      linkElements.exit().remove();

      // UPDATE ANIMATED SIMULATION
      // this is a plugin
      this.simulation.nodes(this.data.nodes);
      this.simulation.force("link").links(this.data.edges);
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ Apply new force properties
        Call this on construct and if forceProperties have changed.
    /*/
  }, {
    key: '_UpdateForces',
    value: function _UpdateForces(data) {
      this.simulation.force("link", d3.forceLink().id(function (d) {
        return d.id;
      }).distance(function (d) {
        return m_forceProperties.link.distance;
      })
      // this doesn't seem to change anything?!?  The m_forceProperties.link.distance is the only value that seems to matter?
      //            .distance( (d)=>{return m_forceProperties.link.distance+d.size*10 } )
      //            .distance( (d)=>{return m_forceProperties.link.distance * (1/d.size) } )
      //            .distance( m_forceProperties.link.distance )
      .iterations(m_forceProperties.link.iterations)).force("charge", d3.forceManyBody()
      //            .strength(m_forceProperties.charge.strength * m_forceProperties.charge.enabled)
      //            .strength( (d)=>{return d.size/6 * m_forceProperties.charge.strength * m_forceProperties.charge.enabled} )
      .strength(function (d) {
        return d.size / 4 * m_forceProperties.charge.strength * m_forceProperties.charge.enabled;
      }).distanceMin(m_forceProperties.charge.distanceMin).distanceMax(m_forceProperties.charge.distanceMax)).force("collide", d3.forceCollide().strength(m_forceProperties.collide.strength * m_forceProperties.collide.enabled).radius(function (d) {
        return d.size / m_forceProperties.collide.radius;
      }).iterations(m_forceProperties.collide.iterations)).force("center", d3.forceCenter().x(m_width * m_forceProperties.center.x).y(m_height * m_forceProperties.center.y)).force("forceX", d3.forceX().strength(m_forceProperties.forceX.strength * m_forceProperties.forceX.enabled).x(m_width * m_forceProperties.forceX.x)).force("forceY", d3.forceY().strength(m_forceProperties.forceY.strength * m_forceProperties.forceY.enabled).y(m_height * m_forceProperties.forceY.y));
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ Update the display positions after each simulation tick
    
        This tick method is called repeatedly until the layout stabilizes.
    
        NOTE: the order in which we update nodes and links does NOT determine which
        gets drawn first -- the drawing order is determined by the ordering in the
        DOM.  See the notes under link_update.enter() above for one technique for
        setting the ordering in the DOM.
    /*/
  }, {
    key: '_Tick',
    value: function _Tick() {
      // Drawing the nodes: Update the location of each node group element
      // from the x, y fields of the corresponding node object.
      this.zoomWrapper.selectAll(".node").attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      });

      // Drawing the links: Update the start and end points of each line element
      // from the x, y fields of the corresponding source and target node objects.
      this.zoomWrapper.selectAll(".edge").attr("x1", function (d) {
        return d.source.x;
      }).attr("y1", function (d) {
        return d.source.y;
      }).attr("x2", function (d) {
        return d.target.x;
      }).attr("y2", function (d) {
        return d.target.y;
      });
    }

    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ Sets the width of the links during update cycles
        Used by linElements.enter() and linkElements.merge()
        and mouseover events.
    /*/

  }, {
    key: '_UpdateLinkStrokeWidth',
    value: function _UpdateLinkStrokeWidth(edge) {
      if (edge.selected || edge.source.id === mouseoverNodeId || edge.target.id === mouseoverNodeId || mouseoverNodeId === -1) {
        return Math.pow(edge.size, 2); // Use **2 to make size differences more noticeable
      } else {
        return 0.175; // Barely visible if not selected
      }
    }

    /// UI EVENT HANDLERS /////////////////////////////////////////////////////////
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/ This primarily handles mousewheel zooms
    /*/

  }, {
    key: '_HandleZoom',
    value: function _HandleZoom() {
      d3.select('.zoomer').attr("transform", d3.event.transform);
    }
    /*/ This handles zoom button zooms.
    /*/

  }, {
    key: '_Transition',
    value: function _Transition(zoomLevel) {
      this.d3svg.transition()
      //.delay(100)
      .duration(200).call(this.zoom.scaleBy, zoomLevel);
    }

    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: '_Dragstarted',
    value: function _Dragstarted(d, self) {
      if (!d3.event.active) self.simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: '_Dragged',
    value: function _Dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }
    /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    /*/
    /*/
  }, {
    key: '_Dragended',
    value: function _Dragended(d, self) {
      if (!d3.event.active) self.simulation.alphaTarget(0.0001);
      d.fx = null;
      d.fy = null;
    }
    // update window size-related forces
    // d3.select(window).on("resize", (){ =>
    //     width = +svg.node().getBoundingClientRect().width;
    //     height = +svg.node().getBoundingClientRect().height;
    //     updateForces();
    // });

  }]);

  return D3NetGraph;
}(); // class D3NetGraph

/// EXPORT MODULE /////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


module.exports = D3NetGraph;
});

;require.register("view/netcreate/nc-logic.js", function(exports, require, module) {
"use strict";

/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  * EVENTS: D3 Graph Updates

    Mark Node/Edge          Nodes in the graph are marked via a stroke around
                            the circle.  There are two types of marks:

                            1. SEARCH -- when a node matches a search, its
                            strokeColor is set to green.

                            2. SELECTION -- when a node is selected by the
                            user and shown in the NodeSelector either by
                            directly clicking on it or by clicking on a
                            item in the search suggestion list, the node
                            data is marked `selected` and a blue strokeColor
                            is applied.

                            The two marks are orthogonal to each other: a
                            node can be both searched and selected, though
                            the selection mark will override the search
                            mark.

                            The rendering is handled by modifying the
                            node data in D3DATA.  d3-simplenetgraph will
                            then read any D3DATA updates and redraw
                            the graph based on the updated data.

    Add New Node/Edge       When the user adds a new edge or node, handlers in
                            NetCreate will update its `this.state.data`
                            with the new nodes/edges.  This is passed on to
                            `NetGraph.jsx` and in turn to `D3SimpleNetGraph.js`
                            which will display the new data during its update
                            cycle.


\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

var DBG = false;

/// LIBRARIES /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var SETTINGS = require("settings");
var UNISYS = require("unisys/client");
var JSCLI = require("system/util/jscli");
var D3 = require("d3");

/// INITIALIZE MODULE /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var MOD = UNISYS.NewModule(module.id);
var UDATA = UNISYS.NewDataLink(MOD);

/// APP STATE/DATA STRUCTURES /////////////////////////////////////////////////
/*/ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - \*\


    SELECTION

    The SELECTION state maintains the list of nodes and edges that are
    currently selected and loaded in the forms.

    Set by      AutoComplete's call to SOURCE_SELECT
                D3SimpleNetGraph's call to SOURCE_SELECT
                EdgeEditor's call to EDGE_UPDATE
    Handled by  NodeSelector to load the currently selected node
                NodeSelector also sets the edges in EdgeEditor
                EdgeEditor to select the target node when creating new edge

    * nodes     An array of current selected nodes for editing.
                This is the node the user clicked on in the graph or selected from
                the suggestions list
    * edges     An array of edge objects for editing
                *REVIEW*: Should this be renamed "selectedEdges" to distinguish from
                *D3DATA.edge



    SEARCH

    The SEARCH state keeps track of the text being searched for in the
    main AutoComplete field.  It also provides a list of the nodes that match
    the search string so that AutoComplete and D3 can display them.  (D3
    doesn't actually process the SEARCH state change.  Instead it's processed
    by nc-logic in response to SOURCE_SEARCH calls -- nc-logic
    will set the node's `selected` or `stroke-color` state if a node
    is currently selected or matches a search parameter, respectively.)

    Set by      AutoComplete's call to SOURCE_SEARCH when its input changes.
    Handled by  AutoComplete for its controlled input field
                NodeSelector for validating when editing the form.

    * searchLabel     A string that the user has typed into AutoComplete
    * suggestedNodes  An array of nodes that match the searchLabel



    ACTIVEAUTOCOMPLETE

    The ACTIVEAUTOCOMPLETE state points to the id of the AutoComplete
    field (either search, or NodeSElector, or EdgeEditor) that has the
    current focus.  Search results and d3 clicks are routed to the
    active AutComplete component.

    Set by      Search's call to AUTOCOMPLETE_SELECT on startup
                NodeSelector's call to AUTOCOMPLETE_SELECT when Edit Node is clicked
                " when changes are submitted
                EdgeEditor's call to AUTOCOMPLETE_SELECT when a new Edge is created
                " an edge is selected externally for editing
                " an edge being editted is closed (hand back to search)
                " changes are submitted

    Handled by  AutoComplete to enable/disable its mode active state,
                know when and when not to handle SEARCH and SELECTION state updates.

    Looked up   NodeSelector to check if it's the current activeAutoCompleteId

    * activeAutoCompleteId
                id of active <AutoComplete> field
                of form: 'node-xx' or 'edge-source-xx' or 'edge-target-xx'
                where xx = the id of the <AutoComplete> field that has input focus.
                This is used to keep track of the currently active
                AutoComplete field. Inactive fields and updates are determined by
                the value of this property.


    D3DATA

    * nodes: all nodes (not all may be actually changed)
    * edges: all edges (not all may be actually changed)

\*\ - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -/*/
var D3DATA = null; // see above for description
var TEMPLATE = null; // template definition for prompts
var NETWORK = require("unisys/client-network");
var DATASTORE = require("system/datastore");
var SESSION = require("unisys/common-session");
var PROMPTS = require("system/util/prompts");
var PR = PROMPTS.Pad("NCLOGIC");

/// CONSTANTS /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var DESELECTED_COLOR = "";
var SEARCH_COLOR = "#008800";
var SOURCE_COLOR = "#0000DD";
var TARGET_COLOR = "#FF0000";

var TEMPLATE_URL = "../templates/netcreate.json";

/// UNISYS LIFECYCLE HOOKS ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ LOADASSETS fires before react components are loaded
    see client-lifecycle.js for description
/*/
MOD.Hook("LOADASSETS", function () {
  if (UNISYS.IsStandaloneMode()) {

    var USE_CACHE = false;
    if (USE_CACHE) {
      console.warn(PR, "STANDALONE MODE: 'LOADASSETS' using browser cache");
      return new Promise(function (resolve, reject) {
        var lstore = window.localStorage;
        var ld3 = lstore.getItem("D3DATA");
        D3DATA = JSON.parse(ld3);
        if (!D3DATA) reject(Error("couldn't get D3DATA from Local Store"));
        UDATA.SetAppState("D3DATA", D3DATA);
        var tem = lstore.getItem("TEMPLATE");
        TEMPLATE = JSON.parse(tem);
        console.log(D3DATA, TEMPLATE);
        if (!TEMPLATE) reject(Error("couldn't get TEMPLATE from Local Store"));
        UDATA.SetAppState("TEMPLATE", TEMPLATE);
        resolve();
      });
    }
    // don't use cache, but instead try loading standalone files
    console.warn(PR, "STANDALONE MODE: 'LOADASSETS' is using files (USE_CACHE=false)");
    var _p = DATASTORE.PromiseJSONFile("../data/standalone-db.json").then(function (data) {
      m_ConvertData(data);
      m_RecalculateAllEdgeWeights(data);
      UDATA.SetAppState("D3DATA", data);
      // Save off local reference because we don't have D3DATA AppStateChange handler
      D3DATA = data;
    });
    // load template
    var _p2 = DATASTORE.PromiseJSONFile(TEMPLATE_URL).then(function (data) {
      TEMPLATE = data;
      UDATA.SetAppState("TEMPLATE", TEMPLATE);
    });
    return Promise.all([_p, _p2]);
  }
  // if got this far...
  // NOT STANDALONE MODE so load data into D3DATA
  var p1 = DATASTORE.PromiseD3Data().then(function (data) {
    if (DBG) console.log(PR, "DATASTORE returned data", data);
    m_ConvertData(data);
    m_RecalculateAllEdgeWeights(data);
    UDATA.SetAppState("D3DATA", data);
    // Save off local reference because we don't have D3DATA AppStateChange handler
    D3DATA = data;
  });
  // load Template data and return it as a promise
  // so that react render is called only after the template is loaded
  var p2 = DATASTORE.PromiseJSONFile(TEMPLATE_URL).then(function (data) {
    if (DBG) console.log(PR, "DATASTORE returned json", data);
    TEMPLATE = data;
    UDATA.SetAppState("TEMPLATE", TEMPLATE);
  });
  return Promise.all([p1, p2]);
}); // loadassets

/// UNISYS LIFECYCLE HOOKS ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ CONFIGURE fires after LOADASSETS, so this is a good place to put TEMPLATE
    validation.
/*/
MOD.Hook("CONFIGURE", function () {
  // Process Node, NodeColorMap and Edge options

  // Validate the template file
  try {
    // nodePrompts
    var nodePrompts = TEMPLATE.nodePrompts;
    if (nodePrompts === undefined) {
      throw "Missing `nodePrompts` nodePrompts=" + nodePrompts;
    }
    if (nodePrompts.label === undefined) throw "Missing `nodePrompts.label` label=" + nodePrompts.label;
    if (nodePrompts.type === undefined) throw "Missing `nodePrompts.type` type= " + nodePrompts.type;
    if (nodePrompts.type.options === undefined || !Array.isArray(nodePrompts.type.options)) {
      throw "Missing or bad `nodePrompts.type.options` options=" + nodePrompts.type.options;
    }
    if (nodePrompts.notes === undefined) throw "Missing `nodePrompts.notes` notes=" + nodePrompts.notes;
    if (nodePrompts.info === undefined) throw "Missing `nodePrompts.info` info=" + nodePrompts.info;

    // edgePrompts
    var edgePrompts = TEMPLATE.edgePrompts;
    if (edgePrompts === undefined) throw "Missing `edgePrompts` edgePrompts=" + edgePrompts;
    if (edgePrompts.source === undefined) throw "Missing `edgePrompts.source` source=" + edgePrompts.source;
    if (edgePrompts.type === undefined) throw "Missing `edgePrompts.type` type= " + edgePrompts.type;
    if (edgePrompts.type.options === undefined || !Array.isArray(edgePrompts.type.options)) {
      throw "Missing or bad `edgePrompts.type.options` options=" + edgePrompts.type.options;
    }
    if (edgePrompts.target === undefined) throw "Missing `edgePrompts.target` label=" + edgePrompts.target;
    if (edgePrompts.notes === undefined) throw "Missing `edgePrompts.notes` notes=" + edgePrompts.notes;
    if (edgePrompts.info === undefined) throw "Missing `edgePrompts.info` info=" + edgePrompts.info;
    if (edgePrompts.citation === undefined) throw "Missing `edgePrompts.citation` info=" + edgePrompts.citation;
  } catch (error) {
    console.error(PR + "Error loading template `", TEMPLATE_URL, "`::::", error);
  }

  // REVIEW: Load ColorMap in d3?  or elsewhere?  does it need its own state?
  try {
    var nodeColorMap = {};
    TEMPLATE.nodePrompts.type.options.forEach(function (o) {
      nodeColorMap[o.label] = o.color;
    });
    UDATA.SetAppState("NODECOLORMAP", nodeColorMap);
  } catch (error) {
    console.error(PR, "received bad TEMPLATE node options.  ERROR:", error, ". DATA:", TEMPLATE);
  }
}); // end CONFIGURE HOOK

/// UNISYS LIFECYCLE HOOKS ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ DISCONNECT fires when NetMessage.GlobalOfflineMode()
/*/
MOD.Hook("DISCONNECT", function () {
  console.log("DISCONNECT HOOK");
  var lstore = window.localStorage;
  lstore.setItem("D3DATA", JSON.stringify(D3DATA));
  lstore.setItem("TEMPLATE", JSON.stringify(TEMPLATE));
  console.log("saving d3data, template to localstore");
});

/// UNISYS HANDLERS ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ lifecycle INITIALIZE handler
/*/
MOD.Hook("INITIALIZE", function () {
  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - inside hook
  /*/ Handle D3-related updates based on state changes. Subcomponents are
      responsible for updating themselves.
  /*/
  UDATA.OnAppStateChange("SELECTION", function (stateChange) {
    if (DBG) console.log("nc-logic: Got SELECTION", stateChange);
    var nodes = stateChange.nodes,
        edges = stateChange.edges;
    // NODE LIST UPDATE

    if (nodes !== undefined) {
      if (nodes.length > 0) {
        var color = "#0000DD";
        nodes.forEach(function (node) {
          m_MarkNodeById(node.id, color);
          UNISYS.Log("select node", node.id, node.label);
          ga('send', {
            hitType: 'event',
            eventCategory: 'Node',
            eventAction: '' + node.label,
            eventLabel: '' + window.location
          });
        });
      } else {
        m_UnMarkAllNodes();
      }
    }
  }); // StateChange SELECTION
  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - inside hook
  /*/ Search field has been updated
  /*/
  UDATA.OnAppStateChange("SEARCH", function (stateChange) {
    if (DBG) console.log("nc-logic: Got SEARCH", stateChange);
    var nodes = stateChange.nodes,
        edges = stateChange.edges;
    var searchLabel = stateChange.searchLabel;
    var activeAutoCompleteId = stateChange.activeAutoCompleteId;
    // NODE LIST UPDATE

    if (nodes !== undefined) {
      if (nodes.length > 0) {
        var color = SEARCH_COLOR;
        nodes.forEach(function (node) {
          return m_MarkNodeById(node.id, color);
        });
      } else {
        m_UnMarkAllNodes();
      }
    }
    // SEARCH LABEL UPDATE
    if (searchLabel === "") {
      m_UnStrokeAllNodes();
    } else if (searchLabel !== undefined) {
      m_SetStrokeColorThatMatch(searchLabel, SEARCH_COLOR);
    }
  }); // StateChange SELECTION

  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - inside hook
  /*/ User has clicked on a suggestion from the AutoCopmlete suggestion list.
      The source node should be loaded in NodeSelector.
       OR, user has clicked on a node in the D3 graph.
       SOURCE_SELECT select node by LABEL. There is only one selected node
      in the app at any one time, though nodeLabels is passed as an array.
      SEE ALSO: AutoComplete.onSuggestionSelected() and
                D3SimpleNetGraph._UpdateGraph click handler
  /*/
  UDATA.HandleMessage("SOURCE_SELECT", m_sourceSelect);
  function m_sourceSelect(data) {
    if (DBG) console.log(PR, "SOURCE_SELECT got data", data);

    var _data$nodeLabels = data.nodeLabels,
        nodeLabels = _data$nodeLabels === undefined ? [] : _data$nodeLabels,
        _data$nodeIDs = data.nodeIDs,
        nodeIDs = _data$nodeIDs === undefined ? [] : _data$nodeIDs;

    var nodeLabel = nodeLabels.shift();
    var nodeID = nodeIDs.shift();
    var node = void 0,
        newState = void 0;

    if (nodeID) {
      node = m_FindNodeById(nodeID); // Node IDs should be integers, not strings
    } else if (nodeLabel) {
      node = m_FindMatchingNodesByLabel(nodeLabel).shift();
    } else {
      // No node selected, so deselect
    }

    if (DBG) console.log(PR, "SOURCE_SELECT found", node);

    if (node === undefined) {
      // Node not found, create a new node
      newState = {
        nodes: [],
        edges: []
      };
    } else {
      // Load existing node and edges
      var edges = [];
      if (nodeID) {
        edges = edges.concat(D3DATA.edges.filter(function (edge) {
          return edge.source.id === nodeID || edge.target.id === nodeID;
        }));
      } else {
        edges = edges.concat(D3DATA.edges.filter(function (edge) {
          return edge.source.label === nodeLabel || edge.target.label === nodeLabel;
        }));
      }
      // create state change object
      newState = {
        nodes: [node],
        edges: edges
      };
    }

    // Set the SELECTION state so that listeners such as NodeSelectors update themselves
    UDATA.SetAppState("SELECTION", newState);
  }

  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - inside hook
  /*/ SOURCE_SEARCH sets the current matching term as entered in an
      AutoComplete field.
  /*/
  UDATA.HandleMessage("SOURCE_SEARCH", function (data) {
    var searchString = data.searchString;

    var matches = m_FindMatchingNodesByLabel(searchString);
    var newState = {
      suggestedNodes: matches.map(function (n) {
        return { id: n.id, label: n.label };
      }),
      searchLabel: searchString
    };
    // let SELECTION state listeners handle display updates
    UDATA.SetAppState("SEARCH", newState);
  });

  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - inside hook
  /*/ SOURCE_SEARCH_AND_SELECT first searches for an exact mathcing node
      and if found, selects it.
      This is called by AutoComplete onBlur in case we need to make an
      implicit selection.
  /*/
  UDATA.HandleMessage("SOURCE_SEARCH_AND_SELECT", function (data) {
    var searchString = data.searchString;

    var node = m_FindMatchingNodesByLabel(searchString).shift();
    if (node && node.label === searchString) {
      m_sourceSelect({ nodeIDs: [node.id] });
    }
  });

  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - inside hook
  /*/ SOURCE_HILITE updates the currently rolled-over node name in a list of
      selections.  The hilite can be selected via either the label or
      the node id.
  /*/
  UDATA.HandleMessage("SOURCE_HILITE", function (data) {
    var nodeLabel = data.nodeLabel,
        nodeID = data.nodeID,
        color = data.color;

    if (nodeLabel) {
      // Only mark nodes if something is selected
      m_UnMarkAllNodes();
      m_MarkNodeByLabel(nodeLabel, SOURCE_COLOR);
    }
    if (nodeID) {
      // Only mark nodes if something is selected
      m_UnMarkAllNodes();
      m_MarkNodeById(nodeID, SOURCE_COLOR);
    }

    // NOTE: State is updated in the "MaryNodeBy*" functions above.
  });
  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - inside hook
  /*/ SOURCE_UPDATE is called when the properties of a node has changed
      Globally updates DATASTORE and working D3DATA objects with the new node data.
      NOTE: SOURCE_UPDATE can be invoked remotely by the server on a DATABASE
      update.
  /*/
  UDATA.HandleMessage("SOURCE_UPDATE", function (data) {
    var node = data.node;
    // try updating existing nodes with this id?

    var updatedNodes = m_SetMatchingNodesByProp({ id: node.id }, node);
    if (DBG) console.log("SOURCE_UPDATE: updated", updatedNodes);
    // if no nodes had matched, then add a new node!
    if (updatedNodes.length > 1) {
      console.error("SOURCE_UPDATE: duplicate ids in", updatedNodes);
      throw Error("SOURCE_UPDATE: found duplicate IDs");
    }
    if (updatedNodes.length === 0) D3DATA.nodes.push(node);
    UDATA.SetAppState("D3DATA", D3DATA);
  });
  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - inside hook
  /*/ NODE_DELETE is called by NodeSelector via datastore.js and
      Server.js when an node should be removed
  /*/
  UDATA.HandleMessage("NODE_DELETE", function (data) {
    var nodeID = data.nodeID,
        replacementNodeID = data.replacementNodeID;

    // Remove or replace edges

    var edgesToProcess = void 0;
    if (replacementNodeID !== -1) {
      // replace
      var replacementNode = m_FindNodeById(replacementNodeID);
      edgesToProcess = D3DATA.edges.map(function (edge) {
        if (edge.source.id === nodeID) edge.source = replacementNode;
        if (edge.target.id === nodeID) edge.target = replacementNode;
        return edge;
      });
    } else {
      // delete nodes
      edgesToProcess = D3DATA.edges.filter(function (edge) {
        var pass = false;
        if (edge.source.id !== nodeID && edge.target.id !== nodeID) {
          pass = true;
        }
        return pass;
      });
    }
    D3DATA.edges = edgesToProcess;

    // // Remove node
    var updatedNodes = m_DeleteMatchingNodesByProp({ id: nodeID });
    D3DATA.nodes = updatedNodes;
    UDATA.SetAppState("D3DATA", D3DATA);

    // Also update selection so nodes in EdgeEditor will update
    UDATA.SetAppState("SELECTION", {
      nodes: undefined,
      edges: undefined
    });
    // FIXME: need to also update AutoUpdate!!!
    // FIXME: Need to also trigger resize!
  });
  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - inside hook
  /*/ EDGE_UPDATE is called when the properties of an edge has changed
      NOTE: SOURCE_UPDATE can be invoked remotely by the server on a DATABASE
      update.
  /*/
  UDATA.HandleMessage("EDGE_UPDATE", function (data) {
    var edge = data.edge;

    if (DBG) console.log("nc-logic.EDGE_UPDATE: received edge", edge);
    // edge.source and edge.target are initially ids
    // replace then with node data
    edge.source = m_FindNodeById(edge.source);
    edge.target = m_FindNodeById(edge.target);
    // set matching nodes
    var updatedEdges = m_SetMatchingEdgesByProp({ id: edge.id }, edge);
    if (DBG) console.log("nc-logic.EDGE_UPDATE: updated", updatedEdges);

    // if no nodes had matched, then add a new node!
    if (updatedEdges.length === 0) {
      if (DBG) console.log("nc-logic.EDGE_UPDATE: adding new edge", edge);
      // created edges should have a default size
      edge.size = 1;
      D3DATA.edges.push(edge);
    }
    // if there was one node
    if (updatedEdges.length === 1) {
      console.log('nc-logic.EDGE_UPDATE: updating existing edge', updatedEdges);
    }
    // Edge source and target links should be stored as
    // ids rather than references to the actual source and
    // target node objects.
    //
    // d3 will map the source and target ids to the
    // node objects themsleves during the _UpdateGraph method.
    //
    // So we explicitly set and store ids rather than objects here.
    //
    // (If we don't do this, the edges become disconnected from nodes)
    edge.source = edge.source.id;
    edge.target = edge.target.id;
    // Calculate Edge Size
    edge.size = m_CalculateEdgeWeight(edge, D3DATA.edges);

    // if there were more edges than expected
    if (updatedEdges.length > 1) {
      throw Error("EdgeUpdate found duplicate IDs");
    }

    UDATA.SetAppState("D3DATA", D3DATA);
  });

  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - inside hook
  /*/ EDGE_DELETE is called when an edge should be removed from...something?
  /*/
  UDATA.HandleMessage("EDGE_DELETE", function (data) {
    var edgeID = data.edgeID;

    var edges = [];
    // remove specified edge from edge list
    D3DATA.edges = m_DeleteMatchingEdgeByProp({ id: edgeID });
    UDATA.SetAppState("D3DATA", D3DATA);
    // Also update selection so edges in EdgeEditor will update
    var selection = UDATA.AppState("SELECTION");
    if (selection.nodes === undefined || selection.nodes.length < 1 || selection.nodes[0].id === undefined) {
      if (DBG) console.log(PR, "no selection:", selection);
    } else {
      if (DBG) console.log(PR, "updating selection:", selection);
      var nodeID = selection.nodes[0].id;
      // Remove the deleted edge from the selection
      if (selection.edges !== undefined && selection.edges.length > 0) {
        edges = edges.concat(selection.edges.filter(function (edge) {
          return edge.id !== edgeID;
        }));
      }
    }
    UDATA.SetAppState("SELECTION", {
      nodes: selection.nodes,
      edges: edges
    });
  });

  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - inside hook
  /*/ AUTOCOMPLETE_SELECT is called by <AutoComplete> components to tell the
      module which one has the current focus.
  /*/
  UDATA.HandleMessage("AUTOCOMPLETE_SELECT", function (data) {
    m_HandleAutoCompleteSelect(data);
  });
}); // end UNISYS_INIT

function m_HandleAutoCompleteSelect(data) {
  if (DBG) console.log("ACL: Setting activeAutoCompleteId to", data.id);
  UDATA.SetAppState("ACTIVEAUTOCOMPLETE", {
    activeAutoCompleteId: data.id
  });
}

/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ lifecycle RESET handler
/*/
MOD.Hook("RESET", function () {
  // Force an AppState update here so that the react components will load
  // the data after they've been initialized.  The SetAppState call in
  // LOADASSETS is broadcast before react components have been loaded.
  UDATA.SetAppState("D3DATA", D3DATA);
}); // end UNISYS_RESET

/// APP_READY MESSAGE REGISTRATION ////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ The APP_READY hook is fired after all initialization phases have finished
    and may also fire at other times with a valid info packet
/*/
MOD.Hook("APP_READY", function (info) {
  /// RETURN PROMISE to prevent phase from continuing until after registration
  /// of messages is successful
  return new Promise(function (resolve, reject) {
    if (DBG) console.log(PR + "HOOK 'UNISYS_INIT' Registering Message Handlers...");
    // timeout for broken network registration
    var timeout = setTimeout(function () {
      reject(new Error("UNISYS REGISTER TIMEOUT"));
    }, 5000);

    // register ONLY messages we want to make public
    UNISYS.RegisterMessagesPromise(["SOURCE_UPDATE", "NODE_DELETE", "EDGE_UPDATE", "EDGE_DELETE"]).then(function (d) {
      clearTimeout(timeout);
      if (DBG) console.log(PR + "HOOK 'UNISYS_INIT' Registered Message Handlers " + JSON.stringify(d.registered));
      if (DBG) console.log("INFO: %cMy socket address is " + UNISYS.SocketUADDR(), "color:blue;font-weight:bold");
      resolve();
    });
  });
}); // end UNISYS_READY

/// OBJECT HELPERS ////////////////////////////////////////////////////////////
/// these probably should go into a utility class
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Return array of objects that match the match_me object keys/values
    NOTE: make sure that strings are compared with strings, etc
/*/
function m_FindMatchingObjsByProp(obj_list) {
  var match_me = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  // operate on arrays only
  if (!Array.isArray(obj_list)) throw Error("FindMatchingObjectsByProp arg1 must be array");
  var matches = obj_list.filter(function (obj) {
    var pass = true;
    for (var key in match_me) {
      if (match_me[key] !== obj[key]) pass = false;
      break;
    }
    return pass;
  });
  // return array of matches (can be empty array)
  return matches;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Set array of objects that match to key/values of yes/no respectively
    Returns array of matched objects
/*/
function m_SetMatchingObjsByProp(obj_list) {
  var match_me = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var yes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var no = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  // operate on arrays only
  if (!Array.isArray(obj_list)) throw Error("SetMatchingObjsByPropp arg1 must be array");

  var returnMatches = [];
  obj_list.forEach(function (node) {
    var matched = true;
    for (var key in match_me) {
      if (match_me[key] !== node[key]) matched = false;
      break;
    }
    if (matched) {
      for (var _key in yes) {
        node[_key] = yes[_key];
      }returnMatches.push(node);
    } else {
      for (var _key2 in no) {
        node[_key2] = no[_key2];
      }
    }
  });
  return returnMatches;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Update props of everything in obj_list
/*/
function m_SetAllObjs(obj_list) {
  var all = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  // operate on arrays only
  if (!Array.isArray(obj_list)) throw Error("SetAllNodes arg1 must be array");
  obj_list.forEach(function (obj) {
    for (var key in all) {
      obj[key] = all[key];
    }
  });
}

/// NODE HELPERS //////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Return array of nodes that DON'T match del_me object keys/values
/*/
function m_DeleteMatchingNodesByProp() {
  var del_me = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var matches = D3DATA.nodes.filter(function (node) {
    var pass = false;
    for (var key in del_me) {
      if (del_me[key] !== node[key]) {
        pass = true;
        break;
      }
    }
    return pass;
  });
  // return array of matches (can be empty array)
  return matches;
}
/*/ Return array of nodes that match the match_me object keys/values
    NOTE: make sure that strings are compared with strings, etc
/*/
function m_FindMatchingNodeByProp() {
  var match_me = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return m_FindMatchingObjsByProp(D3DATA.nodes, match_me);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Convenience function to retrieve node by ID
/*/function m_FindNodeById(id) {
  return m_FindMatchingNodeByProp({ id: id })[0];
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Return array of nodes with labels that partially match str
/*/
function m_FindMatchingNodesByLabel() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

  if (!str) return [];
  str = u_EscapeRegexChars(str.trim());
  if (str === "") return [];
  var regex = new RegExp( /*'^'+*/str, "i");
  return D3DATA.nodes.filter(function (node) {
    return regex.test(node.label);
  });
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Set nodes that PARTIALLY match 'str' to 'yes' props.
    All others nodes are set to 'no' props. Return matches
    Optionally resets all the NON matching nodes as well
/*/
function m_SetMatchingNodesByLabel() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var yes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var no = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var returnMatches = [];
  str = u_EscapeRegexChars(str.trim());
  if (str === "") return undefined;
  var regex = new RegExp( /*'^'+*/str, "i");
  D3DATA.nodes.forEach(function (node) {
    if (regex.test(node.label)) {
      for (var key in yes) {
        node[key] = yes[key];
      }returnMatches.push(node);
    } else {
      for (var _key3 in no) {
        node[_key3] = no[_key3];
      }
    }
  });
  return returnMatches;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Update props of exact matching nodes, returns matches
    Optionally resets all the NON matching nodes as well
/*/
function m_SetMatchingNodesByProp() {
  var match_me = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var yes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var no = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return m_SetMatchingObjsByProp(D3DATA.nodes, match_me, yes, no);
}

/// EDGE HELPERS //////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Return array of edges that DON'T match del_me object keys/values
/*/
function m_DeleteMatchingEdgeByProp() {
  var del_me = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var matches = D3DATA.edges.filter(function (edge) {
    var pass = false;
    for (var key in del_me) {
      if (del_me[key] !== edge[key]) {
        pass = true;
        break;
      }
    }
    return pass;
  });
  // return array of matches (can be empty array)
  return matches;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Update props of exact matching edges, returns matches
/*/
function m_SetMatchingEdgesByProp() {
  var match_me = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var yes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var no = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return m_SetMatchingObjsByProp(D3DATA.edges, match_me, yes, no);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Count number of edges with the same source/target to determine weight
      `data` is passed by reference
      This modifies `data`
      data = { nodes: [], edges: [] }
/*/
function m_RecalculateAllEdgeWeights(data) {
  data.edges.forEach(function (edge) {
    edge.size = m_CalculateEdgeWeight(edge, data.edges);
  });
  return data;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Count number of edges with the same source/target to determine weight
/*/
function m_CalculateEdgeWeight(edge, edges) {
  // REVIEW: If there's a match, BOTH edge sizes ought to be set!

  var size = edges.reduce(function (accumulator, e) {
    // Ignore self
    if (e.id === edge.id) return accumulator;
    // source and target might be ids or might be node objects depending
    // on whether D3 has processed the edge object.
    var sourceId = e.source.id || e.source;
    var targetId = e.target.id || e.target;
    var edgeSourceId = edge.source.id || edge.source;
    var edgeTargetId = edge.target.id || edge.target;
    //console.log('comparing sourceId',sourceId,'to',edgeSourceId,' / targetId',targetId,'to',edgeTargetId);
    if (sourceId === edgeSourceId && targetId === edgeTargetId || sourceId === edgeTargetId && targetId === edgeSourceId) return accumulator + 1;
    return accumulator;
  }, 1);
  return size;
}

/// UTILITIES /////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ REGEX: the chars in brackets are part of matching character set.
    Declaring this as a constant makes the RegEx run faster (I think).
/*/
var REGEX_REGEXCHARS = /[.*+?^${}()|[\]\\]/g;
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Adds a \ in front of characters that have special RegEx meaning
    From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expression
/*/
function u_EscapeRegexChars(string) {
  return string.replace(REGEX_REGEXCHARS, "\\$&"); // $& means the whole matched string
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Convert all IDs to integers
    Node and Edge IDs should be integers.
    This isn't a problem with newly created datasets as the network-generated IDs
    are integers.  However, with older data sets, the IDs may have been strings.
    e.g. exports from Gephi will have string IDs.
    This mismatch is a problem when looking up nodes by ID.
      `data` is passed by reference
      This modifies `data`
      data = { nodes: [], edges: [] }
/*/
function m_ConvertData(data) {
  data.nodes.forEach(function (node) {
    node.id = parseInt(node.id);
  });
  data.edges.forEach(function (edge) {
    edge.id = parseInt(edge.id);
    // before D3 processing, edge.source and edge.target are ids
    edge.source = parseInt(edge.source);
    edge.target = parseInt(edge.target);
  });
}

/// NODE MARKING METHODS //////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Visually change all nodes to the deselected color
/*/
function m_UnMarkAllNodes() {
  var props = { selected: DESELECTED_COLOR };
  m_SetAllObjs(D3DATA.nodes, props);
  UDATA.SetAppState("D3DATA", D3DATA);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Remove the stroke color.  Used to unmark search matches.
/*/
function m_UnStrokeAllNodes() {
  var props = { strokeColor: undefined };
  m_SetAllObjs(D3DATA.nodes, props);
  UDATA.SetAppState("D3DATA", D3DATA);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Sets the `node.selected` property to `color` so it is hilited on graph
/*/
function m_MarkNodeById(id, color) {
  var marked = { selected: SOURCE_COLOR };
  var normal = { selected: DESELECTED_COLOR };
  // NOTE: this.getSelectedNodeColor(node,color) and
  // this.getDeselectedNodeColor(node,color) are not yet implemented
  // to override the properties
  m_SetMatchingNodesByProp({ id: id }, marked, normal);
  UDATA.SetAppState("D3DATA", D3DATA);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Sets the `node.selected` property to `color` so it is hilited on graph
/*/
function m_MarkNodeByLabel(label, color) {
  var marked = { selected: color };
  var normal = { selected: DESELECTED_COLOR };
  // NOTE: this.getSelectedNodeColor(node,color) and
  // this.getDeselectedNodeColor(node,color) are not yet implemented
  // to override the properties
  m_SetMatchingNodesByLabel(label, marked, normal);
  UDATA.SetAppState("D3DATA", D3DATA);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Sets matching node labels to the passed selection color
/*/
function m_MarkNodesThatMatch(searchString, color) {
  if (searchString === "") {
    m_UnMarkAllNodes();
    return;
  }
  var select = { selected: color };
  var deselect = { selected: DESELECTED_COLOR };
  m_SetMatchingNodesByLabel(searchString, select, deselect);
  UDATA.SetAppState("D3DATA", D3DATA);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Sets matching node labels to the passed selection color
    This sets the stroke color, which is used to display
    the matching nodes during a search.  If the node is
    also selected, the selected color will override this color.
/*/
function m_SetStrokeColorThatMatch(searchString, color) {
  var matched = { strokeColor: color };
  var notmatched = { strokeColor: undefined };
  m_SetMatchingNodesByLabel(searchString, matched, notmatched);
  UDATA.SetAppState("D3DATA", D3DATA);
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Sets the 'selected' state of edges that are attached to the node
/*/
function m_MarkSelectedEdges(edges, node) {
  // Delesect all edges first
  edges.forEach(function (edge) {
    edge.selected = false;
  });
  // Find connected edges
  var id = node.id;
  D3DATA.edges.forEach(function (edge) {
    if (edge.source.id === id || edge.target.id === id) {
      edge.selected = true;
    } else {
      edge.selected = false;
    }
  });
  UDATA.SetAppState("D3DATA", D3DATA);
}

/// COMMAND LINE UTILITIES ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Command: RESET THE DATABASE from default data
/*/
JSCLI.AddFunction(function ncPushDatabase(jsonFile) {
  jsonFile = jsonFile || "data.reducedlinks.json";
  DATASTORE.PromiseJSONFile(jsonFile).then(function (data) {
    // data is { nodes, edges }
    console.log(PR, "Sending data from " + jsonFile + " to Server", data);
    // UDATA.Call() returns a promise, so return it to
    // continue the asynchronous chain
    return UDATA.Call("SRV_DBSET", data);
  }).then(function (d) {
    if (d.OK) {
      window.alert("assets/data/" + jsonFile + " was pushed to Server.\nPress OK to refresh this page and MANUALLY REFRESH other clients.\n\n(note: if data hasn't changed, try command again)");
      console.log(PR + " %cServer Database has been overwritten with " + jsonFile, "color:blue");
      console.log(PR + " Reload apps to see new data");
      setTimeout(UNISYS.ForceReloadOnNavigation, 1000);
    } else {
      console.error(PR, "Server Error", d);
      window.alert("Error " + JSON.stringify(d));
    }
  });
  // return syntax help
  return "FYI: ncPushDatabase(jsonFile) can load file in assets/data";
});
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Command: EMPTY THE DATABASE from default data
/*/JSCLI.AddFunction(function ncEmptyDatabase() {
  window.ncPushDatabase("nada.json");
  return "FYI: pushing empty database from assets/data/nada.json...reloading";
});
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Command: Unlock the database.  Used to recover from error conditions where
    a node or edge is inadvertently left locked.
/*/
JSCLI.AddFunction(function ncUnlockAll() {
  UDATA.NetCall('SRV_DBUNLOCKALL', {});
  return "Unlocking all nodes and edges in the database.";
});
JSCLI.AddFunction(function ncUnlockAllNodes() {
  UDATA.NetCall('SRV_DBUNLOCKALLNODES', {});
  return "Unlocking all nodes in the database.";
});
JSCLI.AddFunction(function ncUnlockAllEdges() {
  UDATA.NetCall('SRV_DBUNLOCKALLEDGES', {});
  return "Unlocking all edges in the database.";
});
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/*/ Command: Token Generator
/*/
JSCLI.AddFunction(function ncMakeTokens(clsId, projId, numGroups) {
  // type checking
  if (typeof clsId !== "string") return "args: str classId, str projId, int numGroups";
  if (typeof projId !== "string") return "args: str classId, str projId, int numGroups";
  if (clsId.length > 12) return "classId arg1 should be 12 chars or less";
  if (projId.length > 12) return "classId arg1 should be 12 chars or less";
  if (!Number.isInteger(numGroups)) return "numGroups arg3 must be integer";
  if (numGroups < 1) return "numGroups arg3 must be positive integer";
  // let's do this!
  var out = "\nTOKEN LIST for class '" + clsId + "' project '" + projId + "'\n\n";
  var pad = String(numGroups).length;
  for (var i = 1; i <= numGroups; i++) {
    var id = String(i);
    id = id.padStart(pad, "0");
    out += "group " + id + "\t" + SESSION.MakeToken(clsId, projId, i) + "\n";
  }
  if (window && window.location) {
    var ubits = new URL(window.location);
    var hash = ubits.hash.split("/")[0];
    var url = ubits.protocol + "//" + ubits.host + "/" + hash;
    out += "\nexample url: " + SETTINGS.ServerAppURL() + "/edit/" + SESSION.MakeToken(clsId, projId, 1) + "\n";
  }
  return out;
});

/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/// EXPORT CLASS DEFINITION ///////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
module.exports = MOD;
});

require.alias("assert/assert.js", "assert");
require.alias("buffer/index.js", "buffer");
require.alias("crypto-browserify/index.js", "crypto");
require.alias("events/events.js", "events");
require.alias("stream-http/index.js", "http");
require.alias("https-browserify/index.js", "https");
require.alias("os-browserify/browser.js", "os");
require.alias("path-browserify/index.js", "path");
require.alias("process/browser.js", "process");
require.alias("punycode/punycode.js", "punycode");
require.alias("querystring-es3/index.js", "querystring");
require.alias("stream-browserify/index.js", "stream");
require.alias("node-browser-modules/node_modules/string_decoder/index.js", "string_decoder");
require.alias("util/util.js", "sys");
require.alias("url/url.js", "url");
require.alias("vm-browserify/index.js", "vm");process = require('process');require.register("___globals___", function(exports, require, module) {
  

// Auto-loaded modules from config.npm.globals.
window.jquery = require("jquery");


});})();require('___globals___');


//# sourceMappingURL=netc-app.js.map