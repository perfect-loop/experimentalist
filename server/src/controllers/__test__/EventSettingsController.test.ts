import { Request } from "express";
import EventSettingsController from "../EventSettingsController";
import { EventFactory } from "../../test/factories/EventFactory";
import { EventSettingsFactory } from "../../test/factories/EventSettingsFactory";
import { ParticipationFactory } from "../../test/factories/ParticipationFactory";
import { mockResponse } from "../../test/helpers";

describe("put", () => {
  const res = mockResponse();
  const mNext = jest.fn();

  it("returns unauthorized user is not signed in", async (done: any) => {
    const mReq = ({
      params: {
        id: "5eeaad1d96c9409bc72465c7"
      }
    } as any) as Request;
    await new EventSettingsController().put(mReq, res, mNext);
    expect(res.status).toBeCalledWith(403);
    done();
  });

  it("returns not found if event is not present", async (done: any) => {
    const req = ({
      params: {
        eventId: "6eeaad1d96c9409bc72465c7"
      },
      user: { _id: "5eeaad1d96c9409bc72465c7" }
    } as any) as Request;
    await new EventSettingsController().put(req, res, mNext);
    expect(res.status).toBeCalledWith(404);
    done();
  });

  it("returns not found if eventSettings is not present", async (done: any) => {
    const event = EventFactory();
    await event.save();

    const req = ({
      params: {
        eventId: event._id
      },
      user: { _id: "5eeaad1d96c9409bc72465c7" }
    } as any) as Request;
    await new EventSettingsController().put(req, res, mNext);
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
        eventId: event._id
      },
      user: { _id: "5eeaad1d96c9409bc72465c7" }
    } as any) as Request;
    await new EventSettingsController().put(req, res, mNext);
    expect(res.status).toBeCalledWith(404);
    expect(res.send).toHaveBeenCalledWith("Unauthorized");
    done();
  });

  it("returns unauthorized if event settings not found", async (done: any) => {
    const event = EventFactory();
    await event.save();

    const host = ParticipationFactory.Host({
      email: "test@test.com",
      event
    });

    await host.save();

    const req = ({
      params: {
        eventId: host.event._id,
        id: "2eeaad1d96c9409bc72465c7"
      },
      user: { _id: "5eeaad1d96c9409bc72465c7", email: "test@test.com" }
    } as any) as Request;
    await new EventSettingsController().put(req, res, mNext);
    expect(res.status).toBeCalledWith(404);
    expect(res.send).toHaveBeenCalledWith("Event Settings not found");
    done();
  });
});
