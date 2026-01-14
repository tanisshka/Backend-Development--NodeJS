class APIFeatures {
  constructor(query, ReqQuery) {
    this.query = query;
    this.ReqQuery = ReqQuery;
  }

  filter() {
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const QueryObj = { ...this.ReqQuery };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete QueryObj[el]);
    console.log('Req.query: ', this.ReqQuery);
    console.log('Filtered Query: ', QueryObj);

    let queryStr = JSON.stringify(QueryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.ReqQuery.sort) {
      const sortBy = this.ReqQuery.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.ReqQuery.fields) {
      const fields = this.ReqQuery.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const limit = this.ReqQuery.limit * 1 || 100;
    const page = this.ReqQuery.page * 1 || 1;
    const skip = (page - 1) * 10;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports=APIFeatures;