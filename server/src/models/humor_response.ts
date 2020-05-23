import { Response } from "humor-api";

export default class HumorResponse implements Response {
  message: string;
  keywords: string[];
  links: string[];

  constructor(message: string, keywords: string[], links: string[]) {
    this.message = message;
    this.keywords = keywords;
    this.links = links;
  }
}
