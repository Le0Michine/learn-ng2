interface Window { __env__: any; }
window.__env__ = window.__env__ || {};

if (window.__env__["FULL_COVERAGE"]) {
    require("./course-edit");
    require("./breadcrumb");
    require("./courses");
    require("./directives");
    require("./login");
    require("./modal");
    require("./pipes");
    require("./services");
    require("./validators");
}