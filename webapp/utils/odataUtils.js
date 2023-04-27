sap.ui.define([], function () {
  "use strict";

  return {
    read: function (entity, filters, viewModel, dataModel) {
      viewModel.setProperty("/busy", true);

      return new Promise(function (resolve, reject) {
        dataModel.read("/" + entity, {
          filters: filters,
          success: function (data) {
            viewModel.setProperty("/busy", false);
            resolve(data);
          },
          error: function (err) {
            viewModel.setProperty("/busy", false);
            reject(err);
          },
        });
      });
    },

    updateBackend: function(sPath, payload, viewModel, dataModel) {
        viewModel.setProperty("/busy", true);

      return new Promise(function (resolve, reject) {
        dataModel.update(sPath, payload, {
          success: function (data) {
            viewModel.setProperty("/busy", false);
            resolve(data);
          },
          error: function (err) {
            viewModel.setProperty("/busy", false);
            reject(err);
          },
        });
      });
    },

    writeToBackend: function (entity, payload, viewModel, dataModel) {
      viewModel.setProperty("/busy", true);

      return new Promise(function (resolve, reject) {
        dataModel.create("/" + entity, payload, {
          success: function (data) {
            viewModel.setProperty("/busy", false);
            resolve(data);
          },
          error: function (err) {
            viewModel.setProperty("/busy", false);
            reject(err);
          },
        });
      });
    },
  };
});
