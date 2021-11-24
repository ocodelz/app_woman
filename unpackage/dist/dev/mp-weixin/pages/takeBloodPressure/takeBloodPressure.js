(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/takeBloodPressure/takeBloodPressure"],{

/***/ 130:
/*!****************************************************************************************************!*\
  !*** E:/SK.PwGuard.App/app_woman/main.js?{"page":"pages%2FtakeBloodPressure%2FtakeBloodPressure"} ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);__webpack_require__(/*! @dcloudio/uni-stat */ 5);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _takeBloodPressure = _interopRequireDefault(__webpack_require__(/*! ./pages/takeBloodPressure/takeBloodPressure.vue */ 131));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_takeBloodPressure.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 131:
/*!*********************************************************************************!*\
  !*** E:/SK.PwGuard.App/app_woman/pages/takeBloodPressure/takeBloodPressure.vue ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _takeBloodPressure_vue_vue_type_template_id_30c7b278_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./takeBloodPressure.vue?vue&type=template&id=30c7b278&scoped=true& */ 132);
/* harmony import */ var _takeBloodPressure_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./takeBloodPressure.vue?vue&type=script&lang=js& */ 134);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _takeBloodPressure_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _takeBloodPressure_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _takeBloodPressure_vue_vue_type_style_index_0_id_30c7b278_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./takeBloodPressure.vue?vue&type=style&index=0&id=30c7b278&scoped=true&lang=css& */ 139);
/* harmony import */ var _D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 17);

var renderjs





/* normalize component */

var component = Object(_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _takeBloodPressure_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _takeBloodPressure_vue_vue_type_template_id_30c7b278_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _takeBloodPressure_vue_vue_type_template_id_30c7b278_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "30c7b278",
  null,
  false,
  _takeBloodPressure_vue_vue_type_template_id_30c7b278_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/takeBloodPressure/takeBloodPressure.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 132:
/*!****************************************************************************************************************************!*\
  !*** E:/SK.PwGuard.App/app_woman/pages/takeBloodPressure/takeBloodPressure.vue?vue&type=template&id=30c7b278&scoped=true& ***!
  \****************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_takeBloodPressure_vue_vue_type_template_id_30c7b278_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./takeBloodPressure.vue?vue&type=template&id=30c7b278&scoped=true& */ 133);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_takeBloodPressure_vue_vue_type_template_id_30c7b278_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_takeBloodPressure_vue_vue_type_template_id_30c7b278_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_takeBloodPressure_vue_vue_type_template_id_30c7b278_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_takeBloodPressure_vue_vue_type_template_id_30c7b278_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 133:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/SK.PwGuard.App/app_woman/pages/takeBloodPressure/takeBloodPressure.vue?vue&type=template&id=30c7b278&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
try {
  components = {
    uNavbar: function() {
      return __webpack_require__.e(/*! import() | node-modules/uview-ui/components/u-navbar/u-navbar */ "node-modules/uview-ui/components/u-navbar/u-navbar").then(__webpack_require__.bind(null, /*! uview-ui/components/u-navbar/u-navbar.vue */ 287))
    },
    uImage: function() {
      return __webpack_require__.e(/*! import() | node-modules/uview-ui/components/u-image/u-image */ "node-modules/uview-ui/components/u-image/u-image").then(__webpack_require__.bind(null, /*! uview-ui/components/u-image/u-image.vue */ 347))
    },
    uLine: function() {
      return __webpack_require__.e(/*! import() | node-modules/uview-ui/components/u-line/u-line */ "node-modules/uview-ui/components/u-line/u-line").then(__webpack_require__.bind(null, /*! uview-ui/components/u-line/u-line.vue */ 466))
    },
    uTopTips: function() {
      return __webpack_require__.e(/*! import() | node-modules/uview-ui/components/u-top-tips/u-top-tips */ "node-modules/uview-ui/components/u-top-tips/u-top-tips").then(__webpack_require__.bind(null, /*! uview-ui/components/u-top-tips/u-top-tips.vue */ 473))
    },
    uPopup: function() {
      return __webpack_require__.e(/*! import() | node-modules/uview-ui/components/u-popup/u-popup */ "node-modules/uview-ui/components/u-popup/u-popup").then(__webpack_require__.bind(null, /*! uview-ui/components/u-popup/u-popup.vue */ 326))
    },
    uButton: function() {
      return __webpack_require__.e(/*! import() | node-modules/uview-ui/components/u-button/u-button */ "node-modules/uview-ui/components/u-button/u-button").then(__webpack_require__.bind(null, /*! uview-ui/components/u-button/u-button.vue */ 319))
    }
  }
} catch (e) {
  if (
    e.message.indexOf("Cannot find module") !== -1 &&
    e.message.indexOf(".vue") !== -1
  ) {
    console.error(e.message)
    console.error("1. 排查组件名称拼写是否正确")
    console.error(
      "2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"
    )
    console.error(
      "3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件"
    )
  } else {
    throw e
  }
}
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  if (!_vm._isMounted) {
    _vm.e0 = function($event) {
      _vm.tapState == 0 ? _vm.handleOperationStartButton() : ""
    }

    _vm.e1 = function($event) {
      _vm.show = false
    }
  }
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 134:
/*!**********************************************************************************************************!*\
  !*** E:/SK.PwGuard.App/app_woman/pages/takeBloodPressure/takeBloodPressure.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_takeBloodPressure_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./takeBloodPressure.vue?vue&type=script&lang=js& */ 135);
/* harmony import */ var _D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_takeBloodPressure_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_takeBloodPressure_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_takeBloodPressure_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_takeBloodPressure_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_takeBloodPressure_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 135:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/SK.PwGuard.App/app_woman/pages/takeBloodPressure/takeBloodPressure.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;














































































































































var _storage = __webpack_require__(/*! @/common/storage.js */ 127);





var _util = _interopRequireDefault(__webpack_require__(/*! @/utils/util.js */ 118));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _createForOfIteratorHelper(o, allowArrayLike) {var it;if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = o[Symbol.iterator]();}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}var bldprs = null;var bldPressDevice = __webpack_require__(/*! @/utils/BTDevice/BldPressBTDevice.js */ 136);var _default =
{
  data: function data() {
    return {
      background: {
        background: '#fc979f' },

      testdata: '',
      // 底部操作按钮
      operationButton: true,
      // 舒张压显示状态
      isDiastolicPressureValue: true,
      // 心率显示状态
      isHeartValue: true,
      purchaseState: 0,
      // 血压
      info: {
        // 设备ID
        e_id: '',
        e_name: '',
        notice_id: '',
        service_id: '',
        write_in_id: '',
        // 孕妇ID
        p_id: '',
        // 测量时间
        c_time: '',
        // 收缩压
        systolicPressure: '',
        // 舒张压
        diastolicPressure: '',
        // 脉搏
        heartRate: '',
        // 血压结果
        bloodPressureResult: '',
        // 心率结果
        heartRateResult: '',
        // 测量结果
        t_result: '',
        // 设备建议
        sbcljy: '',
        // 审核时间
        exam_time: '',
        // 审核结果
        exam_result: '',
        // 医生建议
        yishengjianyi: '' },

      btnBox: true, // 开始 暂停 按钮
      audit: false, // 审核结果
      isShowXy: false,
      isShowXl: false,
      xydata: {},
      tapState: 0,
      pageHeight: 0,
      szyList: [],
      ssyList: [],
      xlList: [],
      updateList: [],
      show: false };

  },
  onLoad: function onLoad(e) {var _this = this;
    var _self = this;
    try {
      var pageHeight = uni.getSystemInfoSync();
      _self.pageHeight = pageHeight.windowHeight - 30;




      if (e.purchaseState) {
        this.purchaseState = e.purchaseState;
      }

      var result = uni.getStorageSync('result_storage');
      console.log(result);var _iterator = _createForOfIteratorHelper(
      result),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var item = _step.value;
          if (item.classify_name === '收缩压') {
            this.ssyList.push(item);
          } else if (item.classify_name === '舒张压') {
            this.szyList.push(item);
          } else if (item.classify_name === '心率') {
            this.xlList.push(item);
          }
        }} catch (err) {_iterator.e(err);} finally {_iterator.f();}
      console.log(this.ssyList);
      console.log(this.szyList);
      console.log(this.xlList);
      if (e.detail) {
        setTimeout(function () {
          _this.btnBox = false;
          var xy = _this.info;
          var _xyobj = JSON.parse(e.detail);
          // console.log(JSON.stringify(_xyobj));
          _this.isDiastolicPressureValue = false;
          _this.isHeartValue = false;
          _this.audit = true;
          xy.c_time = _xyobj.t_time;
          xy.exam_result = _xyobj.exam_result;
          xy.exam_time = _xyobj.exam_time;
          xy.yishengjianyi = _xyobj.yishengjianyi;
          xy.systolicPressure = _xyobj.high_pressure;
          xy.diastolicPressure = _xyobj.low_pressure;
          xy.heartRate = _xyobj.pulse;
          _this.tapState = 1;
          _this.info.t_result = _xyobj.test_result;
          _this.$forceUpdate();
        }, 500);
      } else {
        var that = this;
        uni.getStorage({
          key: 'user_login',
          success: function success(res) {
            _this.info.p_id = res.data.PregnantID;
            _this.handleDeviceInformation(res.data.PregnantID);
          } });

        bldprs = new bldPressDevice.BldPressBTDevice();
        bldprs.close();
        bldprs.init();
        setTimeout(function () {
          uni.getStorage({
            key: 'equipment_ids',
            success: function success(res) {
              var arr = res.data,
              _arr = [];var _iterator2 = _createForOfIteratorHelper(
              arr),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var _item2 = _step2.value;
                  if (_item2.status === "已领用" && _item2.e_type === "血压仪") {
                    _arr.push(_item2);
                  }
                }} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}
              if (_arr.length > 1) {
                uni.showModal({
                  title: '提示',
                  content: '设备绑定过多，请联系管理员',
                  showCancel: false });

                that.tapState = 1;
                return;
              }
              var item = _arr.find(function (element) {
                return element.e_type == '血压仪';
              });
              if (item == null) {
                uni.showModal({
                  title: '提示',
                  content: '请联系医院管理员进行设备购买/租用~',
                  showCancel: false });

                that.tapState = 1;
                return;
              }
              if (!item.notice_id || !item.write_in_id || !item.service_id || !item.e_name) {
                uni.showModal({
                  title: '提示',
                  content: '请先领用/购买设备哦~',
                  showCancel: false });

                that.tapState = 1;
                return;
              }
              that.info.e_name = item.e_name;
              that.info.notice_id = item.notice_id;
              that.info.write_in_id = item.write_in_id;
              that.info.service_id = item.service_id;
              that.info.e_id = item.equipment_id;
            } });

        }, 1000);
      }
    } catch (e) {
      console.log(e.message);
      this.testdata = e.message;
    }
  },
  destroyed: function destroyed() {
    try {



      bldprs.close();
    } catch (e) {
      console.log(e.message);
      this.testdata = e.message;
    }
    //bldprs.stop();
  },
  onShow: function onShow() {
    this.handleUpdateEquipStatus();
  },
  onReady: function onReady() {
    var that = this;
    try {
      if (that.tapState == 0) {
        //this.$refs.uToast.show
        that.$refs.uTips.show({
          title: "请把绑带绑扎到上肢,打开电源开关,\r\n点按底部的'三角形按钮',开始血压测量!",
          // 如果不传此type参数，默认为default，也可以手动写上 type: 'default'
          type: 'info',
          position: 'center',
          duration: 10000,
          // 如果不需要图标，请设置为false
          icon: true });

      }
    } catch (e) {
      console.log(e.message);
      this.testdata = e.message;
    }
  },
  computed: {
    // 动态显示血压测试结果样式
    bloodPressureResultBgStyle: function bloodPressureResultBgStyle() {
      var ssyVal = Number(this.info.systolicPressure);
      var szyVal = Number(this.info.diastolicPressure);
      var _result = '',
      _bg = '';var _iterator3 = _createForOfIteratorHelper(
      this.ssyList),_step3;try {for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {var item = _step3.value;var _iterator4 = _createForOfIteratorHelper(
          this.szyList),_step4;try {for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {var _item = _step4.value;
              if (item.jieguopanding === '低血压（收缩压）' && _item.jieguopanding === '低血压（舒张压）') {
                if (ssyVal >= item.jieguozhifanwei1 && ssyVal < item.jieguozhifanwei2 && szyVal >= _item.jieguozhifanwei1 &&
                szyVal < _item.jieguozhifanwei2) {
                  _result = '低压';
                  _bg = '#ccc';
                }
              } else if (item.jieguopanding === '理想（收缩压）' && _item.jieguopanding === '理想（舒张压）') {
                if (ssyVal >= item.jieguozhifanwei1 && ssyVal < item.jieguozhifanwei2 && szyVal >= _item.jieguozhifanwei1 &&
                szyVal < _item.jieguozhifanwei2) {
                  _result = '理想';
                  _bg = '#399561';
                }
              } else if (item.jieguopanding === '正常（收缩压）' && _item.jieguopanding === '正常（舒张压）') {
                if (ssyVal >= item.jieguozhifanwei1 && ssyVal < item.jieguozhifanwei2 && szyVal >= _item.jieguozhifanwei1 &&
                szyVal < _item.jieguozhifanwei2) {
                  _result = '正常';
                  _bg = '#71d5a1';
                }
              } else if (item.jieguopanding === '高限（收缩压）' && _item.jieguopanding === '高限（舒张压）') {
                if (ssyVal >= item.jieguozhifanwei1 && ssyVal <= item.jieguozhifanwei2 && szyVal >= _item.jieguozhifanwei1 &&
                szyVal <= _item.jieguozhifanwei2) {
                  _result = '高限';
                  _bg = '#dea234';
                }
              } else if (item.jieguopanding === '高血压（收缩压）' && _item.jieguopanding === '高血压（舒张压）') {
                if (ssyVal >= item.jieguozhifanwei1 && szyVal >= _item.jieguozhifanwei1) {
                  _result = '高压';
                  _bg = '#f00';
                }
              } else if (item.jieguopanding === '高限（收缩压）' && _item.jieguopanding === '低血压（舒张压）') {
                if (ssyVal >= item.jieguozhifanwei1 && ssyVal <= item.jieguozhifanwei2 && szyVal >= _item.jieguozhifanwei1 &&
                szyVal < _item.jieguozhifanwei2) {
                  _result = '低压';
                  _bg = '#ccc';
                }
              } else if (item.jieguopanding === '低血压（收缩压）' && _item.jieguopanding === '高限（舒张压）') {
                if (ssyVal >= item.jieguozhifanwei1 && ssyVal < item.jieguozhifanwei2 && szyVal >= _item.jieguozhifanwei1 &&
                szyVal <= _item.jieguozhifanwei2) {
                  _result = '低压';
                  _bg = '#ccc';
                }
              } else if (item.jieguopanding === '高限（收缩压）' && _item.jieguopanding === '理想（舒张压）') {
                if (ssyVal >= item.jieguozhifanwei1 && ssyVal <= item.jieguozhifanwei2 && szyVal >= _item.jieguozhifanwei1 &&
                szyVal < _item.jieguozhifanwei2) {
                  _result = '高限';
                  _bg = '#dea234';
                }
              } else if (item.jieguopanding === '理想（收缩压）' && _item.jieguopanding === '高限（舒张压）') {
                if (ssyVal >= item.jieguozhifanwei1 && ssyVal < item.jieguozhifanwei2 && szyVal >= _item.jieguozhifanwei1 &&
                szyVal <= _item.jieguozhifanwei2) {
                  _result = '高限';
                  _bg = '#dea234';
                }
              } else if (item.jieguopanding === '高限（收缩压）' && _item.jieguopanding === '高血压（舒张压）') {
                if (ssyVal >= item.jieguozhifanwei1 && ssyVal <= item.jieguozhifanwei2 && szyVal >= _item.jieguozhifanwei1) {
                  _result = '高压';
                  _bg = '#f00';
                }
              } else if (item.jieguopanding === '高血压（收缩压）' && _item.jieguopanding === '高限（舒张压）') {
                if (ssyVal >= item.jieguozhifanwei1 && szyVal >= _item.jieguozhifanwei1 && szyVal <= _item.jieguozhifanwei2) {
                  _result = '高压';
                  _bg = '#f00';
                }
              } else if (item.jieguopanding === '低血压（收缩压）' && _item.jieguopanding === '理想（舒张压）') {
                if (ssyVal >= item.jieguozhifanwei1 && ssyVal < item.jieguozhifanwei2 && szyVal >= _item.jieguozhifanwei1 &&
                szyVal < _item.jieguozhifanwei2) {
                  _result = '低压';
                  _bg = '#ccc';
                }
              } else if (item.jieguopanding === '理想（收缩压）' && _item.jieguopanding === '低血压（舒张压）') {
                if (ssyVal >= item.jieguozhifanwei1 && ssyVal < item.jieguozhifanwei2 && szyVal >= _item.jieguozhifanwei1 &&
                szyVal < _item.jieguozhifanwei2) {
                  _result = '低压';
                  _bg = '#ccc';
                }
              } else if (item.jieguopanding === '低血压（收缩压）' && _item.jieguopanding === '高血压（舒张压）') {
                if (ssyVal >= item.jieguozhifanwei1 && ssyVal < item.jieguozhifanwei2 && szyVal >= _item.jieguozhifanwei1) {
                  _result = '异常';
                  _bg = '#f00';
                }
              } else if (item.jieguopanding === '高血压（收缩压）' && _item.jieguopanding === '低血压（舒张压）') {
                if (ssyVal >= item.jieguozhifanwei1 && szyVal >= _item.jieguozhifanwei1 && szyVal < _item.jieguozhifanwei2) {
                  _result = '异常';
                  _bg = '#f00';
                }
              } else if (item.jieguopanding === '理想（收缩压）' && _item.jieguopanding === '正常（舒张压）') {
                if (ssyVal >= item.jieguozhifanwei1 && ssyVal < item.jieguozhifanwei2 && szyVal >= _item.jieguozhifanwei1 &&
                szyVal < _item.jieguozhifanwei2) {
                  _result = '正常';
                  _bg = '#71d5a1';
                }
              } else if (item.jieguopanding === '正常（收缩压）' && _item.jieguopanding === '理想（舒张压）') {
                if (ssyVal >= item.jieguozhifanwei1 && ssyVal < item.jieguozhifanwei2 && szyVal >= _item.jieguozhifanwei1 &&
                szyVal < _item.jieguozhifanwei2) {
                  _result = '正常';
                  _bg = '#71d5a1';
                }
              } else if (item.jieguopanding === '理想（收缩压）' && _item.jieguopanding === '高血压（舒张压）') {
                if (ssyVal >= item.jieguozhifanwei1 && ssyVal < item.jieguozhifanwei2 && szyVal >= _item.jieguozhifanwei1) {
                  _result = '高压';
                  _bg = '#f00';
                }
              } else if (item.jieguopanding === '正常（收缩压）' && _item.jieguopanding === '低血压（舒张压）') {
                if (ssyVal >= item.jieguozhifanwei1 && ssyVal < item.jieguozhifanwei2 && szyVal >= _item.jieguozhifanwei1 &&
                szyVal < _item.jieguozhifanwei2) {
                  _result = '低压';
                  _bg = '#ccc';
                }
              } else if (item.jieguopanding === '低血压（收缩压）' && _item.jieguopanding === '正常（舒张压）') {
                if (ssyVal >= item.jieguozhifanwei1 && ssyVal < item.jieguozhifanwei2 && szyVal >= _item.jieguozhifanwei1 &&
                szyVal < _item.jieguozhifanwei2) {
                  _result = '低压';
                  _bg = '#ccc';
                }
              } else if (item.jieguopanding === '正常（收缩压）' && _item.jieguopanding === '高限（舒张压）') {
                if (ssyVal >= item.jieguozhifanwei1 && ssyVal < item.jieguozhifanwei2 && szyVal >= _item.jieguozhifanwei1 &&
                szyVal <= _item.jieguozhifanwei2) {
                  _result = '高限';
                  _bg = '#dea234';
                }
              } else if (item.jieguopanding === '高限（收缩压）' && _item.jieguopanding === '正常（舒张压）') {
                if (ssyVal >= item.jieguozhifanwei1 && ssyVal <= item.jieguozhifanwei2 && szyVal >= _item.jieguozhifanwei1 &&
                szyVal < _item.jieguozhifanwei2) {
                  _result = '高限';
                  _bg = '#dea234';
                }
              } else if (item.jieguopanding === '正常（收缩压）' && _item.jieguopanding === '高血压（舒张压）') {
                if (ssyVal >= item.jieguozhifanwei1 && ssyVal < item.jieguozhifanwei2 && szyVal >= _item.jieguozhifanwei1) {
                  _result = '高压';
                  _bg = '#f00';
                }
              } else if (item.jieguopanding === '高血压（收缩压）' && _item.jieguopanding === '正常（舒张压）') {
                if (ssyVal >= item.jieguozhifanwei1 && szyVal >= _item.jieguozhifanwei1 && szyVal < _item.jieguozhifanwei2) {
                  _result = '高压';
                  _bg = '#f00';
                }
              } else if (item.jieguopanding === '高血压（收缩压）' && _item.jieguopanding === '理想（舒张压）') {
                if (ssyVal >= item.jieguozhifanwei1 && szyVal >= _item.jieguozhifanwei1 && szyVal < _item.jieguozhifanwei2) {
                  _result = '高压';
                  _bg = '#f00';
                }
              } else {
                _result = '正常';
                _bg = '#71d5a1';
                console.log('---------------else');
              }
            }} catch (err) {_iterator4.e(err);} finally {_iterator4.f();}
        }} catch (err) {_iterator3.e(err);} finally {_iterator3.f();}
      this.info.bloodPressureResult = _result;
      this.measurementResult();
      return "backgroundColor:" + _bg;
    },
    // 动态显示心率样式
    heartRateBgStyle: function heartRateBgStyle() {
      try {
        var heartVal = this.info.heartRate;var _iterator5 = _createForOfIteratorHelper(
        this.xlList),_step5;try {for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {var item = _step5.value;
            if (item.jieguopanding === '正常') {
              if (heartVal >= item.jieguozhifanwei1 && heartVal <= item.jieguozhifanwei2) {
                this.info.heartRateResult = '正常';
                return "background:#399561";
              }
            } else if (item.jieguopanding === '心率快') {
              if (heartVal > item.jieguozhifanwei1) {
                this.info.heartRateResult = '快';
                return "background:#f00";
              }
            } else if (item.jieguopanding === '心率慢') {
              if (heartVal >= item.jieguozhifanwei1 && heartVal < item.jieguozhifanwei2) {
                this.info.heartRateResult = '慢';
                return "background:#e1a12f";
              }
            }
          }} catch (err) {_iterator5.e(err);} finally {_iterator5.f();}
      } catch (e) {
        console.log(e.message);
        this.testdata = e.message;
      }
    },
    // 收缩压
    systolicPressureFontStyle: function systolicPressureFontStyle() {
      try {
        var ssyVal = Number(this.info.systolicPressure);var _iterator6 = _createForOfIteratorHelper(
        this.ssyList),_step6;try {for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {var item = _step6.value;
            if (item.jieguopanding === '低血压（收缩压）') {
              if (ssyVal >= item.jieguozhifanwei1 && ssyVal < item.jieguozhifanwei2) {
                return "color:#ccc"; // 低
              }
            } else if (item.jieguopanding === '正常（收缩压）') {
              if (ssyVal >= item.jieguozhifanwei1 && ssyVal < item.jieguozhifanwei2) {
                return "color:#71d5a1"; // 正常
              }
            } else if (item.jieguopanding === '理想（收缩压）') {
              if (ssyVal >= item.jieguozhifanwei1 && ssyVal < item.jieguozhifanwei2) {
                return "color:#399561"; // 理想
              }
            } else if (item.jieguopanding === '高限（收缩压）') {
              if (ssyVal >= item.jieguozhifanwei1 && ssyVal <= item.jieguozhifanwei2) {
                return "color:#dea234"; // 高限
              }
            } else if (item.jieguopanding === '高血压（收缩压）') {
              if (ssyVal >= item.jieguozhifanwei1) {
                return "color:#f00"; // 高
              }
            }
          }} catch (err) {_iterator6.e(err);} finally {_iterator6.f();}
      } catch (e) {
        console.log(e.message);
        this.testdata = e.message;
      }
    },
    // 舒张压
    diastolicPressureFontStyle: function diastolicPressureFontStyle() {
      try {
        var szyVal = this.info.diastolicPressure;var _iterator7 = _createForOfIteratorHelper(
        this.szyList),_step7;try {for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {var item = _step7.value;
            if (item.jieguopanding === '低血压（舒张压）') {
              if (szyVal >= item.jieguozhifanwei1 && szyVal < item.jieguozhifanwei2) {
                return "color:#ccc"; //低
              }
            } else if (item.jieguopanding === '理想（舒张压）') {
              if (szyVal >= item.jieguozhifanwei1 && szyVal < item.jieguozhifanwei2) {
                return "color:#399561"; //理想
              }
            } else if (item.jieguopanding === '正常（舒张压）') {
              if (szyVal >= item.jieguozhifanwei1 && szyVal < item.jieguozhifanwei2) {
                return "color:#71d5a1"; //正常
              }
            } else if (item.jieguopanding === '高限（舒张压）') {
              if (szyVal >= item.jieguozhifanwei1 && szyVal <= item.jieguozhifanwei2) {
                return "color:#dea234"; //高限
              }
            } else if (item.jieguopanding === '高血压（舒张压）') {
              if (szyVal >= item.jieguozhifanwei1) {
                return "color:#f00"; //高
              }
            }
          }} catch (err) {_iterator7.e(err);} finally {_iterator7.f();}
      } catch (e) {
        console.log(e.message);
        this.testdata = e.message;
      }
    } },

  methods: {
    handleUpdateEquipStatus: function handleUpdateEquipStatus() {var _this2 = this;
      uni.getStorage({
        key: 'equipment_ids',
        success: function success(res) {
          console.log(res);
          var arr = res.data,
          _arr = [];var _iterator8 = _createForOfIteratorHelper(
          arr),_step8;try {for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {var item = _step8.value;
              var str = item.return_time;
              console.log(str);
              var date = new Date();
              if (uni.getSystemInfoSync().platform == "ios") {
                date = new Date(str.replace(/-/g, '/'));
              } else {
                date = new Date(str);
              }
              var time = new Date();

              if ((date.getTime() - time.getTime()) / (24 * 3600 * 1000) <= 3 &&
              item.status == '已领用' && item.e_type == "血压仪") {
                _arr.push(item);
                _this2.updateList = _arr;
                _this2.show = true;
              }
              if (date.getTime() <= time.getTime() &&
              item.status == '已领用' && item.e_type == "血压仪") {

                // uni.hideTabBar();
                var obj = {
                  e_id: item.equipment_id,
                  lease_id: item.id,
                  status: '已过期',
                  r_time: item.return_time,
                  r_days: item.rent_times,
                  r_price: item.rent_price,
                  r_deposit: item.rent_deposit,
                  r_sum: item.rent_accountprice };

                console.log(obj);
                _this2.$u.post('/UpdateEquipStatus', obj).then(function (res) {
                  console.log(JSON.stringify(res));
                }).catch(function (err) {
                  console.log(err);
                });
              }
            }} catch (err) {_iterator8.e(err);} finally {_iterator8.f();}
        } });

    },
    handleDeviceInformation: function handleDeviceInformation(y_id) {
      this.$u.
      post('/GetAllEquipmentsByPid', {
        pregnant_id: y_id }).

      then(function (res) {
        var _list = res.data;
        // 	Arr = [];
        // for (let i in _list) {
        // 	Arr.push({
        // 		e_type: res.data[i].e_type,
        // 		equipment_id: res.data[i].equipment_id,
        // 		notice_id: res.data[i].notice_id,
        // 		service_id: res.data[i].service_id,
        // 		write_in_id: res.data[i].write_in_id,
        // 		e_name: res.data[i].e_name,
        // 		status: res.data[i].status
        // 	});
        // }
        uni.setStorage({
          key: 'equipment_ids',
          data: _list });

      });
    },
    // 血压测量结果显示状态
    measurementResult: function measurementResult() {
      try {
        var xyResult = this.info.bloodPressureResult;
        var xlResult = this.info.heartRateResult;
        var _result = '';
        if (xyResult == '正常' && xlResult == '正常') {
          _result = '正常';
        } else if (xyResult == '正常' && xlResult == '快') {
          _result = '血压正常,心率过快!';
        } else if (xyResult == '正常' && xlResult == '慢') {
          _result = '血压正常，心率过慢!';
        } else if (xyResult == '理想' && xlResult == '正常') {
          _result = '正常';
        } else if (xyResult == '理想' && xlResult == '慢') {
          _result = '理想血压,心率过慢!';
        } else if (xyResult == '理想' && xlResult == '快') {
          _result = '理想血压,心率过快!';
        } else if (xyResult == '高限' && xlResult == '正常') {
          _result = '正常';
        } else if (xyResult == '高限' && xlResult == '慢') {
          _result = '正常高限,心率过慢!';
        } else if (xyResult == '高限' && xlResult == '快') {
          _result = '正常高限,心率过快!';
        } else if (xyResult == '低压' && xlResult == '正常') {
          _result = '心率正常,低血压了！';
        } else if (xyResult == '低压' && xlResult == '慢') {
          _result = '低血压了,心率过慢！';
        } else if (xyResult == '低压' && xlResult == '快') {
          _result = '低血压了,心率过快！';
        } else if (xyResult == '高压' && xlResult == '正常') {
          _result = '心率正常,高血压了！!';
        } else if (xyResult == '高压' && xlResult == '快') {
          _result = '心率过快,高血压了！!';
        } else if (xyResult == '高压' && xlResult == '慢') {
          _result = '心率过慢,高血压了！!';
        } else if (xyResult == '异常' && xlResult == '正常') {
          _result = '心率正常,血压异常！!';
        } else if (xyResult == '异常' && xlResult == '快') {
          _result = '心率过快,血压异常！!';
        } else if (xyResult == '异常' && xlResult == '慢') {
          _result = '心率过慢,血压异常！!';
        }
        this.info.t_result = _result;
        return _result;
      } catch (e) {
        console.log(e.message);
        this.testdata = e.message;
      }
    },
    // 点击底部开始按钮
    handleOperationStartButton: function handleOperationStartButton() {
      var that = this;
      try {
        uni.showLoading({
          title: '正在加载...' });

        that.isShowXy = false;
        that.isShowXl = false;
        that.isHeartValue = true;
        that.isDiastolicPressureValue = true;
        that.info.t_result = '---';
        that.info.diastolicPressure = '---';
        var param = {
          //deviceId: 'D26252C3-8210-DE2B-9561-550B992836D1',
          deviceName: that.info.e_name,
          notifyId: that.info.notice_id,
          writeId: that.info.write_in_id,
          serviceId: that.info.service_id
          //callback: this.blcallback
        };
        //bldprs.initBlue(param);
        //that.operationButton = false;
        bldprs.start(
        param,
        function (d) {
          that.testdata = JSON.stringify(d);
          if (d.success == true) {
            that.tapState = 1;
            that.info.c_time = _util.default.getFtSystemTime();
            var xy_obj = d.data;
            that.xydata = d.data;
            if (xy_obj.sysVal) {
              that.isShowXy = true;
              that.isShowXl = true;
              that.isDiastolicPressureValue = true;
              that.isHeartValue = true;
            }
            if (xy_obj.diaVal) {
              that.isDiastolicPressureValue = false;
              that.isHeartValue = false;
            }
            that.info.systolicPressure = xy_obj.sysVal ? xy_obj.sysVal : xy_obj.replace(/mmHg/g, '');
            that.info.diastolicPressure = xy_obj.diaVal;
            that.info.heartRate = xy_obj.pulVal;

            if (that.operationButton) {
              that.operationButton = false;
              uni.hideLoading();
            }

            if (d.msg == '最终血压值') {
              setTimeout(function () {
                var obj = that.info;
                var _arr = [{
                  t_time: obj.c_time,
                  value: '',
                  flag: '',
                  result: '',
                  type: '血压',
                  state: 1,
                  duration: '',
                  expert_opinion: '',
                  low_pressure: obj.diastolicPressure,
                  high_pressure: obj.systolicPressure,
                  pulse: obj.heartRate,
                  test_result: obj.t_result,
                  e_id: that.info.e_id,
                  p_id: that.info.p_id,
                  sbcljy: that.info.sbcljy }];

                (0, _storage.setStorageList)(_arr);
                that.handleBtnUploadData();
                that.operationButton = true;
              }, 200);
            }
          } else {
            if (d.type && d.type == 'initBlue') {
              uni.showModal({
                showCancel: false,
                title: '注意',
                content: d.msg });

              that.operationButton = true;
            }
            if (d.type == '_getDevInfo') {
              uni.showModal({
                showCancel: false,
                title: '注意',
                content: "请把绑带按说明书要求绑扎到胳膊上,打开血压计电源开关后,再按'开始测量'按钮!" });

              that.operationButton = true;
            }

            if (d.type && d.type !== '_getDevInfo') {
              uni.showModal({
                showCancel: false,
                title: '注意',
                content: d.msg });

              that.operationButton = true;
            }
            if (d.type && d.type == 'err') {
              uni.showModal({
                showCancel: false,
                title: '发生错误',
                content: d.msg });

              that.operationButton = true;
            }
            if (d.type && d.type == 'startReceive') {
              uni.showModal({
                showCancel: false,
                title: '发生错误',
                content: d.msg });

              that.operationButton = true;
            }

            uni.hideLoading();
          }
        },
        2000);

      } catch (e) {
        console.log(e.message);
        that.testdata = e.message;
        that.operationButton = true;
        uni.hideLoading();
        uni.showModal({
          title: 'err',
          content: e.message,
          showCancel: false });

      }
      //that.operationButton = false;
    },
    // 上传数据
    handleBtnUploadData: function handleBtnUploadData() {
      var obj = this.info;
      try {
        var xy_data = {
          e_id: obj.e_id,
          p_id: obj.p_id,
          c_time: obj.c_time,
          lp: obj.diastolicPressure,
          hp: obj.systolicPressure,
          pulse: obj.heartRate,
          t_result: obj.t_result,
          sbcljy: obj.sbcljy };

        console.log(xy_data);
        this.operationButton = true;
        this.$u.post('/UploadXYInfo', xy_data).then(function (res) {
          if (res.code == 200 && res.data == true) {
            (0, _storage.clearStorageList)('血压');
            uni.showToast({
              title: '提交成功',
              icon: 'none',
              duration: 5000 });

            setTimeout(function () {
              uni.navigateBack();
            }, 5000);
          }
        });
      } catch (e) {
        console.log(e.message);
        this.testdata = e.message;
      }
    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 139:
/*!******************************************************************************************************************************************!*\
  !*** E:/SK.PwGuard.App/app_woman/pages/takeBloodPressure/takeBloodPressure.vue?vue&type=style&index=0&id=30c7b278&scoped=true&lang=css& ***!
  \******************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_takeBloodPressure_vue_vue_type_style_index_0_id_30c7b278_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./takeBloodPressure.vue?vue&type=style&index=0&id=30c7b278&scoped=true&lang=css& */ 140);
/* harmony import */ var _D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_takeBloodPressure_vue_vue_type_style_index_0_id_30c7b278_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_takeBloodPressure_vue_vue_type_style_index_0_id_30c7b278_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_takeBloodPressure_vue_vue_type_style_index_0_id_30c7b278_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_takeBloodPressure_vue_vue_type_style_index_0_id_30c7b278_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_InstallCatalog_HBuilderX_HBuilderX_3_1_18_20210609_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_takeBloodPressure_vue_vue_type_style_index_0_id_30c7b278_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 140:
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/SK.PwGuard.App/app_woman/pages/takeBloodPressure/takeBloodPressure.vue?vue&type=style&index=0&id=30c7b278&scoped=true&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[130,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/takeBloodPressure/takeBloodPressure.js.map