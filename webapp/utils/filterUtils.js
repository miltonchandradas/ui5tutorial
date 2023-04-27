sap.ui.define(
    ["sap/ui/model/Filter", "sap/ui/model/FilterOperator"],
    function (Filter, FilterOperator) {
      "use strict";
  
      return {
        getFilterArray: function (controller) {
          let filterArray = [];
  
          let cbProducts = controller.byId("cbProducts");
          let selectedProduct = cbProducts.getSelectedKey();
          if (selectedProduct)
            filterArray.push(new Filter("ProductID", FilterOperator.EQ, selectedProduct));
  
          let cbDiscontinued = controller.byId("cbDiscontinued");
          let selectedDiscontinued = cbDiscontinued.getSelectedKey();
          if (selectedDiscontinued)
            filterArray.push(new Filter("Discontinued", FilterOperator.EQ, selectedDiscontinued));
  
          return filterArray;
        },
      };
    }
  );
  