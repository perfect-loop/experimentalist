import { define, random } from "cooky-cutter";
import faker from "faker";
import { IEvent } from "models/Events";

export const EventFactory = define<IEvent>({
  _id: "",
  title: faker.lorem.words(2),
  instructions: `{"blocks":[{"key":"dosve","text":"How about this simple link","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":22,"length":4,"key":0}],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"http://google.com","className":"MUIRichTextEditor-anchorLink-12"}}}}`,
  startAt: faker.date.future(),
  endAt: "",
  active: true,
  state: "active",
  createdAt: faker.date.past(),
  updatedAt: faker.date.past(),
});
