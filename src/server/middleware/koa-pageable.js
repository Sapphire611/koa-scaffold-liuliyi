/**
 * 轻量化的下拉分页
 * 分页插件会在查询结果中添加一个count字段，用于统计总数, 性能十足差差差差
 * @param model 模型
 * @param searchQuery 查询条件
 * @param page 页码
 * @param size 每页大小
 * @returns {Promise<{docs: *[], hasNextPage: boolean, limit: number}>}
 */

exports.liteScrollPagination = async (model, searchQuery, page = 1, size = 10) => {
    let result = {
        docs: [], // 当前页数据
        limit: 0, // 当前页大小
        hasNextPage: false, // 是否有下一页
    };
    let aggregate = [
        ...searchQuery,
        // skip
        { $skip: (page - 1) * size },
        // limit
        { $limit: size + 1 }, // 多取一个用于判断是否有下一页
    ];

    // 分页查询
    let searchList = await model.aggregate(aggregate);
    if (searchList.length === 0) {
        return result;
    }
    result.hasNextPage = (searchList?.length || 0) > size;
    if (result.hasNextPage) {
        searchList.pop();
    }
    // _id => id
    searchList.map(item => {
        item.id = item._id;
        delete item._id;
        delete item.__v;
    });
    result.docs = searchList;
    result.limit = searchList.length || 0;

    return result;
};

/**
 * 轻量化的左右分页
 * @param model 模型
 * @param searchQuery 查询条件 [{},{},...]
 * @param page 页码
 * @param size 每页大小
 * @param nextPageSize 预览计算几页(默认5) 例如: 当前是第5页, 就会计算后面最多到第九页
 * @returns {Promise<{total: number, docs: array, hasNextPage: boolean, limit: (*|number)}>}
 */
exports.liteCarouselPagination = async (model, searchQuery, page = 1, size = 10, nextPageSize = 5) => {
    let result = {
        docs: [], // 当前页数据
        limit: 0, // 当前页大小
        total: 0, // 总数
        hasNextPage: false, // 是否有下一页
    };
    let aggregate = [
        ...searchQuery,
        // skip
        { $skip: (page - 1) * size },
        // limit
        { $limit: size * (nextPageSize + 1) },
        // facet
        {
            $facet: {
                // count
                count: [{ $count: 'count' }],
                // limit size
                doc: [{ $limit: size }],
            },
        },
    ];

    // 分页查询
    let searchList = await model.aggregate(aggregate);
    if (searchList.length === 0) {
        return result;
    }
    searchList = searchList[0];

    // _id => id
    searchList.doc.map(item => {
        item.id = item._id;
        delete item._id;
        delete item.__v;
    });

    result.docs = searchList.doc;
    result.limit = searchList.doc?.length || 0;
    result.total = page + parseInt((searchList.count[0]?.count - 1 || 0) / size);
    result.hasNextPage = (searchList.count[0]?.count || 0) > size;

    return result;
};
