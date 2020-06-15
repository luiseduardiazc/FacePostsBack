'use strict';

const Posts = require('../../models/post.model');

class PostPagination {
  constructor (page = 1, pagination = 10) {
    this.page = page;
    this.pagination = pagination;
  }

  getAll (query = {}) {
    return Posts.find(query)
      .populate({
        path: 'user',
        select: 'username email -_id'
      })
      .skip((this.page - 1) * this.pagination)
      .limit(this.pagination);
  }
}

module.exports = PostPagination;
