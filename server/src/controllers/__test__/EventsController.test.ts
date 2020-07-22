import { Request } from "express";
import EventsController from "../EventsController";
import { EventFactory } from "../../test/factories/EventFactory";
import { ParticipationFactory } from "../../test/factories/ParticipationFactory";
import { mockResponse } from "../../test/helpers";

describe("insert", () => {
  const res = mockResponse();
  const mNext = jest.fn();

  it("returns unauthorized user is not signed in", async (done: any) => {
    const mReq = ({
      params: {
        id: "5eeaad1d96c9409bc72465c7"
      }
      //   user: { _id: "5eeaad1d96c9409bc72465c7" }
    } as any) as Request;
    await new EventsController().uploadParticipants(mReq, res, mNext);
    expect(res.status).toBeCalledWith(403);
    done();
  });

  it("returns not found if event is invalid", async (done: any) => {
    const event = EventFactory();
    await event.save();

    const req = ({
      params: {
        id: event._id
      },
      user: { _id: "5eeaad1d96c9409bc72465c7" }
    } as any) as Request;
    await new EventsController().uploadParticipants(req, res, mNext);
    expect(res.status).toBeCalledWith(404);
    done();
  });

  it("returns unauthorized if current user is not a host", async (done: any) => {
    const event = EventFactory();
    await event.save();

    const host = ParticipationFactory.Attendee({});
    await host.save();

    const req = ({
      params: {
        id: event._id
      },
      user: { _id: "5eeaad1d96c9409bc72465c7" }
    } as any) as Request;
    await new EventsController().uploadParticipants(req, res, mNext);
    expect(res.status).toBeCalledWith(404);
    expect(res.send).toHaveBeenCalledWith("Participation not found!");
    done();
  });
});
