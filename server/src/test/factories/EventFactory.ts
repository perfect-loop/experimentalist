import { define } from "cooky-cutter";
import faker from "faker";
import { IEvent, Event } from "models/Events";

const event: IEvent = new Event({
  title: faker.lorem.words(2),
  instructions: `{"blocks":[{"key":"dosve","text":"how about this simple link","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":22,"length":4,"key":0}],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"http://google.com","className":"MUIRichTextEditor-anchorLink-12"}}}}`,
  startAt: faker.date.future(),
  endAt: "",
  active: true,
  state: "active",
  createdAt: faker.date.past(),
  updatedAt: faker.date.past()
});

export function EventFactory(): IEvent {
  return event;
}
