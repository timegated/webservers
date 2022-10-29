module.exports = {
  isMultiPartRequest: () => {
    let contentTypeHeader = req.headers['content-type'];
    return contentTypeHeader && contentTypeHeader.indexOf('multipart') > -1;
  }
}