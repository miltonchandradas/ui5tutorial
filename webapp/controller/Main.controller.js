sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "com/sap/ui5tutorial/utils/filterUtils",
    "com/sap/ui5tutorial/utils/odataUtils",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (
    Controller,
    filterUtils,
    odataUtils,
    JSONModel,
    Filter,
    FilterOperator
  ) {
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
        console.log("onBeforeRebind is fired...");

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

      onSearch: function () {
        console.log("onSearch is fired...");
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

      onFilterProducts: function (oEvent) {
        let src = oEvent.getSource();
        let selectedKey = src.getSelectedKey();

        let filters = [];
        let masterTable = this.byId("masterTable");
        let binding = masterTable.getBinding("items");

        if (selectedKey === "1") {
          filters.push(new Filter("ProductID", FilterOperator.LE, 10));
        } else if (selectedKey === "2") {
          filters.push(new Filter("ProductID", FilterOperator.GT, 10));
        }

        binding.filter(filters);
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
