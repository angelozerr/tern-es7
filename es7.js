(function(mod) {
    if (typeof exports == "object" && typeof module == "object") // CommonJS
        return mod(require("tern/lib/infer"), require("tern/lib/tern"), require("acorn/dist/acorn"), require("acorn/dist/walk"), require("acorn-es7"));
    if (typeof define == "function" && define.amd) // AMD
        return define([ "tern/lib/infer", "tern/lib/tern", "acorn/dist/acorn", "acorn/dist/walk", "acorn-es7" ], mod);
    mod(tern, tern, acorn, acorn.walk, acornES7); // Plain browser env
})(function(infer, tern, acorn, walk, acornES7) {
  "use strict";
  
  tern.registerPlugin("es7", function(server, options) {
    acornES7(acorn);
//    extendsTernScopeGatherer();
//    extendsTernInferWrapper();
//    extendsTernTypeFinder();
    extendsTernSearchVisitor();
    server.on("preParse", preParse);
  });
  
  function preParse(text, options) {
    var plugins = options.plugins;
    if (!plugins) plugins = options.plugins = {};	
    plugins["es7"] = true;
    var pluginsLoose = options.pluginsLoose;
    if (!pluginsLoose) pluginsLoose = options.pluginsLoose = {};   
    pluginsLoose["es7"] = true;
  }

//  function extendsTernScopeGatherer() {
//    var scopeGatherer = infer.scopeGatherer;
//    scopeGatherer["Decorator"] = function(node, scopes, c) {
//      console.log(node)
//    };
//  }
//  
//  function extendsTernInferWrapper() {
//    var inferWrapper = infer.inferWrapper;
//    inferWrapper["Decorator"] = function(node, scopes, c) {
//       console.log(node)
//    };       
//  }
//  
//  function extendsTernTypeFinder() {
//    var typeFinder = infer.typeFinder;
//    typeFinder["Decorator"] = function(node, scope) {
//      console.log(node)
//      return scope;
//    };
//  }
  
  function extendsTernSearchVisitor() {
    var searchVisitor = infer.searchVisitor;
    searchVisitor.Decorator = function(node, scopes, c) {
      walk.base.Decorator(node, scopes, c);
    };
    searchVisitor.Class = function(node, scopes, c) {
      walk.base.Class(node, scopes, c);
    };
  }
  
})