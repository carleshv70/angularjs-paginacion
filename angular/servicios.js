var app = angular.module('paginacionApp.servicios', []);

app.factory('Paises', ['$http', '$q', function ($http, $q ) {
	
	var self = {
		load: false,
		data: {
			numberPage: 1,
			totalPages: 0,
			countries: []
		},
		loadLastPage: loadLastPage,
		loadFirstPage: loadFirstPage,
		loadPage: loadPage,
		loadData: loadData,
	}

	function loadLastPage() { 
		loadData({ numberPage: self.data.totalPages }); 
	}

	function loadFirstPage() {
		loadData({ numberPage: 1 });
	}

	function loadPage(numPage) {
		loadData({ numberPage: numPage });
	}

	function loadData(options) {

		self.load = true;
		var q = $q.defer();
		var url = "http://localhost:8080/universidad/api/countries/?pageNumber=" + options.numberPage.toString() +
			"&sizeOfPage=5&orderBy=name";
		$http({
			method: "GET",
			url: url,
		})
			.then((response) => {

				self.load = false;
				self.data.numberPage = response.data.numberPage;
				self.data.totalPages = response.data.totalPages;
				self.data.countries = response.data.data;
				q.resolve(self);

			})
			.catch((err) => {
				self.load = false;
				console.error(err);
				q.reject(err);
			});
		return q;
	}

	var defaultOptions = { numberPage: 1 }
	self.loadData(defaultOptions);
	return self;

}])