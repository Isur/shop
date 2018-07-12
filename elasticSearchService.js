function indexItem(type, item) {
  return Q.promise(function(resolve, reject){
    elasticSearchClient
      .index({
        index: elasticSearchConfig.index,
        type: type,
        body: item
      })
      .then(function (response) {
        sails.log.info("ElasticSearchService#indexItem :: Response :: ", response);
        return resolve(response);
      })
      .catch(function(err) {
        sails.log.error("ElasticSearchService#indexItem :: Error :: ", err);
        return reject(err);
      });
  });
}