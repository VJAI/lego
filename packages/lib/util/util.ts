export class Util {

  static id(): string {
    return Math.round(Date.now() * Math.random()).toString();
  }

  static camelToKebab(str: string): string {
    const result = str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    return result;
  }

  static kebabToCamel(str: string): string {
    const result = str.replace(/-([a-z])/g, g => g[1].toUpperCase());
    return result;
  }

  static isNumeric(num: number | string): boolean {
    return !isNaN(num as number);
  }

  static getValueForBreakpoint(breakpoint: string, arr: Array<any>): any {
    const result = arr.splice(['xl', 'lg', 'md', 'sm', 'xs'].indexOf(breakpoint)).find(val => val);
    return result;
  }
}
