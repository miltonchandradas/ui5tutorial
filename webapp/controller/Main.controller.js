sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "com/sap/ui5tutorial/utils/filterUtils",
    "sap/ui/model/json/JSONModel",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, filterUtils, JSONModel) {
    "use strict";

    return Controller.extend("com.sap.ui5tutorial.controller.Main", {
      onInit: function () {
        // Setting the view model for busy indicators
        let viewModel = new JSONModel({
          busy: false,
          delay: 0,
          currency: "USD",
        });

        this.getView().setModel(viewModel, "viewModel");
        this._viewModel = this.getView().getModel("viewModel");

        this._mainModel = this.getOwnerComponent().getModel();
        this._filterArray = filterUtils.getFilterArray(this);
      },

      /***********************************************************************************************/
      /*		FILTER BAR EVENT HANDLERS
      /***********************************************************************************************/

      onFilterBarChange: function () {
        this._filterArray = filterUtils.getFilterArray(this);
      },

      onBeforeRebindTable: function (oEvent) {
        let bindingParams = oEvent.getParameter("bindingParams");
        bindingParams.filters = filterUtils.getFilterArray(this);

        this._mainModel.refresh();
      },

      /***********************************************************************************************/
      /*		FOOTER EVENT HANDLERS
      /***********************************************************************************************/

      onSubmit: function () {
          this._mainModel.submitChanges();
      },
    });
  }
);
