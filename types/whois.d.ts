declare module 'whois' {
  function whois(domain: string, options?: any): Promise<any>;
  export = whois;
}