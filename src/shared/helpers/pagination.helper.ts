interface Request {
  query: {
    [key: string]: string | undefined;
  };
}

export class Pagination {
  static getPage(request: Request, total: number) {
    const page = parseInt(request.query.page ?? '1', 10);
    const perPage = parseInt(request.query.limit ?? '10', 10);

    return {
      totalData: total,
      page: page,
      limit: perPage,
      totalPage: Math.ceil(total / perPage),
    };
  }

  static getOffset(request: Request) {
    const page = parseInt(request.query.page ?? '1', 10);
    const perPage = parseInt(request.query.limit ?? '10', 10);
    return page === 1 ? 0 : (page - 1) * perPage;
  }

  static getLimit(request: Request) {
    return parseInt(request.query.limit ?? '10', 10);
  }
}
