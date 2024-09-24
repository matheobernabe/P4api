const versioning = (req, res, next) => {
    const version = req.headers['accept-version'] || '1';
    req.apiVersion = version;
    next();
  };
  
  module.exports = versioning;
  