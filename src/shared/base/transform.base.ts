export abstract class TransformBase {
  abstract transform(item: any): any;

  static array<T extends TransformBase>(this: new () => T, items: any[]): any[] {
    const instance = new this();
    return items.map(item => instance.transform(item));
  }

  static object<T extends TransformBase>(this: new () => T, item: any): any {
    const instance = new this();
    return instance.transform(item);
  }
}
