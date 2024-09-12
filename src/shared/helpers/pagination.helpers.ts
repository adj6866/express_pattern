interface Request {
  query: {
      [key: string]: string | undefined;
  };
}

export class Pagination {
  static getPage(request: Request, total: number) {
      const page = parseInt(request.query.page ?? '1', 10);
      const perPage = parseInt(request.query.per_page ?? '10', 10);
      const from = page === 1 ? 1 : (page - 1) * perPage + 1;
      const to = perPage * page > total ? total : perPage * page;
      const returnFrom = from > total ? 0 : from;
      const returnTo = returnFrom === 0 ? 0 : to;

      return {
          total,
          from: returnFrom,
          to: returnTo,
          per_page: perPage,
          total_page: Math.ceil(total / perPage),
          current_page: page,
          last_page: Math.ceil(total / perPage),
      };
  }

  static getOffset(request: Request) {
      const page = parseInt(request.query.page ?? '1', 10);
      const perPage = parseInt(request.query.per_page ?? '10', 10);
      return page === 1 ? 0 : (page - 1) * perPage;
  }

  static getLimit(request: Request) {
      return parseInt(request.query.per_page ?? '10', 10);
  }
}
