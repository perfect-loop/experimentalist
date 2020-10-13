import { Request } from "express";
import { Participation, IParticipation } from "models/Participations";
import EventsController from "../EventsController";
import { EventFactory } from "../../test/factories/EventFactory";
import { ParticipationFactory } from "../../test/factories/ParticipationFactory";
import { EventSettingsFactory } from "../../test/factories/EventSettingsFactory";
import { mockResponse } from "../../test/helpers";
import { io } from "../../";
import { Api } from "models/Socket";
import { IEvent } from "models/Events";

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

  it("allow auto-admit", async (done: any) => {
    const event = await EventFactory();
    await event.save();

    const participant = ParticipationFactory.Attendee({
      event,
      admittedAt: new Date()
    });

    await participant.save();

    const req = ({
      params: {
        id: event.id,
        participantId: participant.id
      },
      body: {
        here: "you"
      }
    } as any) as Request;

    const spyIo = jest.spyOn(io, "emit");

    const r = controller.admitParticipant(req, res, mNext);
    r?.then(async result => {
      expect(spyIo).toBeCalledWith(Api.Socket.EVENT_ADMIT_PARTICIPANT, {
        here: "you"
      });
      done();
    });
  });

  it("do not allow auto-admit", async (done: any) => {
    const event = await EventFactory();
    await event.save();

    const participant = ParticipationFactory.Attendee({
      event
    });

    await participant.save();

    const req = ({
      params: {
        id: event.id,
        participantId: participant.id
      }
    } as any) as Request;

    const spyIo = jest.spyOn(io, "emit");

    const r = controller.admitParticipant(req, res, mNext);
    r?.then(async result => {
      expect(spyIo).not.toBeCalled();
      done();
    });
  });

  describe("intelligent auto admit", () => {
    let event: IEvent;
    let participant: IParticipation;
    let req: Request;
    const spyIo = jest.spyOn(io, "emit");

    beforeEach(async () => {
      event = await EventFactory({
        state: "not_started"
      });
      event.state = "not_started";
      await event.save();
    });

    describe("participant previously not admitted", () => {
      beforeEach(async () => {
        participant = ParticipationFactory.Attendee({
          event,
          admittedAt: null
        });

        await participant.save();

        req = ({
          params: {
            id: event.id,
            participantId: participant.id
          }
        } as any) as Request;
      });
      it("disallow if settings is not present", async (done: any) => {
        const r = controller.admitParticipant(req, res, mNext);
        r?.then(async result => {
          expect(spyIo).not.toBeCalled();
          done();
        });
      });
      it("disallow if intelligent readmit is turned off", async (done: any) => {
        const eventSettings = EventSettingsFactory({
          event,
          intelligentReadmit: false
        });
        await eventSettings.save();

        const r = controller.admitParticipant(req, res, mNext);
        r?.then(async result => {
          expect(spyIo).not.toBeCalled();
          done();
        });
      });
    });

    describe("participant previously admitted", () => {
      beforeEach(async () => {
        participant = ParticipationFactory.Attendee({
          event,
          admittedAt: new Date()
        });

        await participant.save();

        req = ({
          params: {
            id: event.id,
            participantId: participant.id
          }
        } as any) as Request;
      });

      describe("intelligent readmit is off", () => {
        beforeEach(async () => {
          const eventSettings = EventSettingsFactory({
            event,
            intelligentReadmit: false
          });
          await eventSettings.save();
        });
        it("allow", async (done: any) => {
          const r = controller.admitParticipant(req, res, mNext);
          r?.then(async result => {
            expect(spyIo).toBeCalled();
            done();
          });
        });
        it("disallow if event is locked", async (done: any) => {
          event.state = "locked";
          await event.save();
          const r = controller.admitParticipant(req, res, mNext);
          r?.then(async result => {
            expect(spyIo).not.toBeCalled();
            done();
          });
        });
        it("disallow if event is started", async (done: any) => {
          event.state = "started";
          await event.save();
          const r = controller.admitParticipant(req, res, mNext);
          r?.then(async result => {
            expect(spyIo).not.toBeCalled();
            done();
          });
        });
      });

      it("disallow if intelligent readmit is turned on", async (done: any) => {
        const eventSettings = EventSettingsFactory({
          event,
          intelligentAutoAdmit: true
        });
        await eventSettings.save();
        participant.admittedAt = undefined;
        await participant.save();

        const r = controller.admitParticipant(req, res, mNext);
        r?.then(async result => {
          expect(spyIo).not.toBeCalled();
          done();
        });
      });

      it("allow if settings is not present", async (done: any) => {
        const r = controller.admitParticipant(req, res, mNext);
        r?.then(async result => {
          expect(spyIo).toBeCalled();
          done();
        });
      });
    });
  });
});
