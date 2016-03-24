var db = {
    save : function(key, value) {
        localStorage.setItem(key,JSON.stringify(value));
    },
    get : function(key) {
        return JSON.parse(localStorage.getItem(key));
    }
  
};

var guid = (function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
  }
  return function() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
  };
})();

(function() {
    var app = angular.module('hesapModule', []);

    app.controller('productController', function($scope) {
        
        $scope.products = db.get('products');
        console.log($scope.products);
        if($scope.products == null){
            $scope.products = [];
        }

        this.add = function() {
            if (this.product._state == 'new') {
                $scope.products.push(this.product);
            }
            
            db.save('products', $scope.products);
            this.product = this.newProduct();
        };

        this.newProduct = function() {
            return {
                id: guid(),
                title: null,
                date: null,
                text: null,
                _state: 'new'

            };
        };
        this.delete = function(productIndex) {
            $scope.products.splice(productIndex, 1);
            db.save('products', $scope.products);
        };

        this.edit = function(product) {
            this.product = product;
            this.product._state = 'edit';
            this.tempProduct = angular.copy(product);
            
            
        };
        
        this.cancelUpdate= function(){
            console.log( this.tempProduct);
            this.product.id = this.tempProduct.id;
            this.product.title = this.tempProduct.title;
            this.product.date = this.tempProduct.date;
            this.product.text = this.tempProduct.text;
            this.product._state = 'saved';
            
            this.product = this.newProduct();
            
        };


        this.product = this.newProduct();
        this.tempProduct = this.newProduct();
        
        console.log(this.product._state);


    });
})();

