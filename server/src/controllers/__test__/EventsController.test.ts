import { Request } from "express";
import { Participation, IParticipation } from "models/Participations";
import EventsController from "../EventsController";
import { EventFactory } from "../../test/factories/EventFactory";
import { ParticipationFactory } from "../../test/factories/ParticipationFactory";
import { mockResponse } from "../../test/helpers";
import { io } from "../../";

describe("insert", () => {
  const res = mockResponse();
  const mNext = jest.fn();
  describe("activate", () => {
    it("does not allow unauthorized accesses", async (done: any) => {
      const event = EventFactory();
      await event.save();
      const host = ParticipationFactory.Host({ event });
      const participant = ParticipationFactory.Attendee({ event });
      await host.save();

      const req = ({
        params: {
          id: event._id
        },
        user: { _id: host.id, email: participant.email }
      } as any) as Request;

      await new EventsController().activate(req, res, mNext);
      expect(res.status).toBeCalledWith(403);
      done();
    });

    it("send a broadcast", async (done: any) => {
      const event = EventFactory();
      await event.save();
      const host = ParticipationFactory.Host({ event });
      await host.save();

      const req = ({
        params: {
          id: event._id
        },
        user: { _id: host.id, email: host.email }
      } as any) as Request;

      const spyIo = jest.spyOn(io, "to");

      await new EventsController().activate(req, res, mNext);
      expect(res.status).toBeCalledWith(200);
      expect(spyIo).toBeCalledWith(`event-${event._id}`);
      done();
    });
  });

  describe("uploadParticipants", () => {
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

    describe("valid params", () => {
      it("saves the participants", async (done: any) => {
        const event = EventFactory();

        await event.save();

        const host = ParticipationFactory.Host({
          email: "test@test.com",
          event
        });

        await host.save();

        const req = ({
          params: {
            id: host.event._id
          },
          body: [
            {
              email: "testing@faker.com",
              instructions: "http://link.to/experiment",
              anonymousName: "672917"
            }
          ],
          user: { _id: "5eeaad1d96c9409bc72465c7", email: "test@test.com" }
        } as any) as Request;
        await new EventsController().uploadParticipants(req, res, mNext);

        expect(res.json).toHaveBeenCalled;
        const p: IParticipation = (await Participation.findOne({
          email: "testing@faker.com"
        })) as IParticipation;

        expect(p.anonymousName).toBe("672917");

        done();
      });
    });
  });

  describe("Duplicate anonymousName", () => {
    it("does not save the participant", async (done: any) => {
      const host = ParticipationFactory.Host({
        email: "testhost2@test.com",
        event: EventFactory()
      });

      const attendee = ParticipationFactory.Attendee({
        event: host.event
      });

      await host.save();
      await attendee.save();

      const req = ({
        params: {
          id: host.event._id
        },
        body: [
          {
            email: "testing23@faker.com",
            instructions: "http://link.to/experiment",
            anonymousName: attendee.anonymousName
          }
        ],
        user: { _id: "5eeaad1d96c9409bc72465c7", email: "testhost2@test.com" }
      } as any) as Request;

      expect(res.json).toHaveBeenCalled;

      const p: IParticipation = (await Participation.findOne({
        email: "testing23@faker.com"
      })) as IParticipation;

      expect(p?.anonymousName).toBeUndefined;

      done();
    });
  });
});

describe("AutoAdmit", () => {
  const res = mockResponse();
  const mNext = jest.fn();
  const controller = new EventsController();
  const req = ({
    params: {},
    user: { _id: "5eeaad1d96c9409bc72465c7" }
  } as any) as Request;
  it("admit", async () => {
    await controller.admitParticipant(req, res, mNext);
  });
});
