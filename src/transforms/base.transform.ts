export abstract class BaseTransform {
  abstract transform(item: any): any;

  static transformArray<T extends BaseTransform>(this: new () => T, items: any[]): any[] {
    const instance = new this();
    return items.map(item => instance.transform(item));
  }
}
