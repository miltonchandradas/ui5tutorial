sap.ui.define(
  [],

  function () {
    "use strict";

    return {
      isRowIgnored: function (ignoreSubmitFlag) {
        if (ignoreSubmitFlag) return "Error";
      },
    };
  }
);
