sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "com/sap/ui5tutorial/utils/filterUtils",
    "com/sap/ui5tutorial/utils/odataUtils",
    "sap/ui/model/json/JSONModel",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, filterUtils, odataUtils, JSONModel) {
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
        this._northwindModel =
          this.getOwnerComponent().getModel("northwindModel");
        this._filterArray = filterUtils.getFilterArray(this);
      },

      /***********************************************************************************************/
      /*		FILTER BAR EVENT HANDLERS
      /***********************************************************************************************/

      onFilterBarChange: function () {
        this._filterArray = filterUtils.getFilterArray(this);
      },

      onBeforeRebindTable: async function (oEvent) {
        let bindingParams = oEvent.getParameter("bindingParams");
        bindingParams.filters = filterUtils.getFilterArray(this);

        let data = await odataUtils.read(
          "Products",
          bindingParams.filters,
          this._viewModel,
          this._mainModel
        );
        this._northwindModel.setData({ Products: data?.results });
      },

      /***********************************************************************************************/
      /*		TABLE EVENT HANDLERS
      /***********************************************************************************************/

      onSubmit: function () {
        let products = this._northwindModel.getData();
        products.Products.forEach(async (product) => {
          if (product.dirty) {
            await odataUtils.updateBackend(
              `/Products(${product.ProductID})`,
              { Discontinued: product.Discontinued },
              this._viewModel,
              this._mainModel
            );
          }
        });
      },

      onDiscontinuedSelected: function (oEvent) {
        let bindingContext = oEvent
          .getSource()
          .getBindingContext("northwindModel");
        let sPath = bindingContext.sPath;

        this._northwindModel.setProperty(sPath + "/dirty", true);
      },
    });
  }
);
