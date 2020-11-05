import { Request } from "express";
import { Participation, IParticipation } from "models/Participations";
import {
  IParticipationSocket,
  ParticipationSocket
} from "models/ParticpationsSockets";
import AttendanceController from "../AttendanceController";
import { EventFactory } from "../../test/factories/EventFactory";
import { ParticipationFactory } from "../../test/factories/ParticipationFactory";
import { ParticipationSocketFactory } from "../../test/factories/ParticipationSocketFactory";
import { mockResponse } from "../../test/helpers";

describe("remove", () => {
  const res = mockResponse();
  const mNext = jest.fn();

  it("does not allow unauthorized accesses", async (done: any) => {
    const event = EventFactory();
    await event.save();
    const host = ParticipationFactory.Host({ event });
    const participant = ParticipationFactory.Attendee({ event });
    await host.save();

    const req = ({
      body: {
        anonymousName: participant.anonymousName,
        eventId: event._id
      },
      user: { _id: host.id, email: participant.email }
    } as any) as Request;

    await new AttendanceController().remove(req, res, mNext);
    expect(res.status).toBeCalledWith(403);
    done();
  });

  it("removes participantSession", async (done: any) => {
    const event = EventFactory();
    await event.save();

    const host = ParticipationFactory.Host({ event });
    await host.save();

    const participant = ParticipationFactory.Attendee({ event });
    participant.save();

    const participantSocket = ParticipationSocketFactory({
      participantId: participant._id
    });

    const req = ({
      body: {
        anonymousName: participant.anonymousName,
        eventId: event._id
      },
      user: { _id: host.id, email: host.email }
    } as any) as Request;

    await new AttendanceController().remove(req, res, mNext);
    done();
  });
});
