import { define, random } from "cooky-cutter";
import faker from "faker";
import { IEvent } from "api/Events";

export const EventFactory = define<IEvent>({
  _id: "",
  title: faker.lorem.words(2),
  instructions: `{"blocks":[{"key":"dosve","text":"how about this simple link","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":22,"length":4,"key":0}],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"http://google.com","className":"MUIRichTextEditor-anchorLink-12"}}}}`,
  startAt: new Date(),
  endAt: "",
  active: true,
  state: "active",
});
