import { Request } from "express";
import EventSettingsController from "../EventSettingsController";
import { EventFactory } from "../../test/factories/EventFactory";
import { EventSettingsFactory } from "../../test/factories/EventSettingsFactory";
import { ParticipationFactory } from "../../test/factories/ParticipationFactory";
import { mockResponse } from "../../test/helpers";
import { IEvent } from "models/Events";

describe("put", () => {
  const res = mockResponse();
  const mNext = jest.fn();

  it("returns unauthorized user is not signed in", async (done: any) => {
    const mReq = ({
      params: {
        id: "5eeaad1d96c9409bc72465c7"
      }
    } as any) as Request;
    new EventSettingsController().put(mReq, res, mNext).then(() => {
      expect(res.status).toBeCalledWith(403);
      done();
    });
  });

  it("returns not found if event is not present", async (done: any) => {
    const req = ({
      params: {
        eventId: "6eeaad1d96c9409bc72465c7"
      },
      user: { _id: "5eeaad1d96c9409bc72465c7" }
    } as any) as Request;
    new EventSettingsController().put(req, res, mNext).then(() => {
      expect(res.status).toBeCalledWith(404);
      done();
    });
  });

  it("returns not found if eventSettings is not present", async (done: any) => {
    const event = EventFactory();
    event
      .save()
      .then((event: IEvent) => {
        const host = ParticipationFactory.Host({
          email: "test@test.com",
          event
        });
        return host.save();
      })
      .then(host => {
        const req = ({
          params: {
            eventId: event._id
          },
          user: { _id: "5eeaad1d96c9409bc72465c7", email: "test@test.com" }
        } as any) as Request;
        return new EventSettingsController().put(req, res, mNext);
      })
      .then(e => {
        expect(res.send).toHaveBeenCalledWith("Event Settings not found");
        expect(res.status).toBeCalledWith(404);
        done();
      });
  });

  it("returns unauthorized if current user is not a host", async (done: any) => {
    const event = EventFactory();
    event
      .save()
      .then(event => {
        const req = ({
          params: {
            eventId: event._id
          },
          user: { _id: "5eeaad1d96c9409bc72465c7" }
        } as any) as Request;
        return new EventSettingsController().put(req, res, mNext);
      })
      .then(() => {
        expect(res.status).toBeCalledWith(403);
        expect(res.send).toHaveBeenCalledWith("Unauthorized Host");
        done();
      });
  });

  it("returns unauthorized if event settings not found", async (done: any) => {
    const event = EventFactory();
    event
      .save()
      .then(event => {
        const host = ParticipationFactory.Host({
          email: "test@test.com",
          event
        });
        return host.save();
      })
      .then(host => {
        const req = ({
          params: {
            eventId: host.event._id,
            id: "2eeaad1d96c9409bc72465c7"
          },
          user: { _id: "5eeaad1d96c9409bc72465c7", email: "test@test.com" }
        } as any) as Request;
        return new EventSettingsController().put(req, res, mNext);
      })
      .then(() => {
        expect(res.status).toBeCalledWith(404);
        expect(res.send).toHaveBeenCalledWith("Event Settings not found");
        done();
      });
  });

  describe("valid params", () => {
    it("saves the event setting ", async (done: any) => {
      const event = EventFactory();
      await event.save();

      const host = ParticipationFactory.Host({
        email: "test@test.com",
        event
      });

      await host.save();

      const eventSettings = EventSettingsFactory();
      eventSettings.event = event;

      await eventSettings.save();

      const req = ({
        params: {
          eventId: host.event._id,
          id: eventSettings._id
        },
        user: { _id: "5eeaad1d96c9409bc72465c7", email: "test@test.com" },
        body: {
          requireId: false,
          paymentMethod: "none"
        }
      } as any) as Request;
      await new EventSettingsController().put(req, res, mNext);

      expect(res.json).toHaveBeenCalled;
      done();
    });
  });
});
