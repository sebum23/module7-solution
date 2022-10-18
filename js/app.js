(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)
.filter('totalPrice', TotalPriceFilterFactory);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;

  toBuy.items = ShoppingListCheckOffService.getToBuyItems();

  toBuy.buyItem = function (name, quantity) {
    ShoppingListCheckOffService.buyItem(name, quantity);
  }
}

function AlreadyBoughtController(ShoppingListCheckOffService) {
  var alreadyBought = this;

  alreadyBought.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
}

function ShoppingListCheckOffService() {
  var shoppingService = this;

  var toBuyItems = [
    {
      name: "Milk",
      quantity: 5,
      pricePerItem: 1.29 
    },
    {
      name: "Cookies",
      quantity: 10,
      pricePerItem: 3.99 
    },
    {
      name: "Eggs",
      quantity: 2,
      pricePerItem: 4.29 
    },
    {
      name: "Cheese",
      quantity: 3,
      pricePerItem: 1.5 
    },
    {
      name: "Yogurt",
      quantity: 10,
      pricePerItem: 1 
    }
  ];

  var alreadyBoughtItems = [];

  shoppingService.getToBuyItems = function () {
    return toBuyItems;
  };

  shoppingService.getAlreadyBoughtItems = function () {
    return alreadyBoughtItems;
  };

  shoppingService.buyItem = function (name, quantity) {
    var matchingItem = toBuyItems.find(x => x.name === name);
    var matchingItemIndex = toBuyItems.findIndex(x => x.name === name);

    matchingItem.quantity = quantity;

    toBuyItems.splice(matchingItemIndex, 1);
    alreadyBoughtItems.push(matchingItem);
  };

}

function TotalPriceFilterFactory() {
  return function (input) {
    var totalPrice = input.quantity * input.pricePerItem
    return `$$$${totalPrice.toFixed(2)}`;
  };
}

})();