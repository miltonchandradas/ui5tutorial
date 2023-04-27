/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"comsap/ui5tutorial/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
