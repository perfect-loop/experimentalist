import { Response, Request } from "express";
import { mockResponse } from "../../test/helpers";
import { Compensation, ICompensation } from "models/Compensations";
import { Participation, IParticipation } from "models/Participations";
import CompensationsController from "../CompensationsControllers";
import { EventFactory } from "../../test/factories/EventFactory";
import { ParticipationFactory } from "../../test/factories/ParticipationFactory";
import { EventSettingsFactory } from "../../test/factories/EventSettingsFactory";

describe("Admin Compensation", () => {
  const status = { send: jest.fn() };
  const res = ({
    send: jest.fn(),
    status: jest.fn(httpStatus => status)
  } as any) as Response;
  const mNext = jest.fn();

  it("returns unauthorized if event is not found", async (done: any) => {
    const mReq = ({
      params: {
        id: "5eeaad1d96c9409bc72465c7"
      },
      user: { _id: "5eeaad1d96c9409bc72465c7" }
    } as any) as Request;
    await new CompensationsController().adminCompensation(mReq, res, mNext);
    expect(res.status).toBeCalledWith(403);
    done();
  });
});

describe("Create Compensation", () => {
  const res = mockResponse();
  const mNext = jest.fn();

  describe("valid params", () => {
    it("saves the compensations", async (done: any) => {
      const host = ParticipationFactory.Host({
        email: "test@test.com",
        event: EventFactory()
      });

      await host.save();

      const attendeeOne = ParticipationFactory.Attendee({
        event: host.event,
        email: "attendee.one@testing.com"
      });

      const getAttendeeOne = await Participation.findOne({
        $and: [{ email: attendeeOne.email }, { event: host.event }]
      });

      if (!getAttendeeOne) {
        await attendeeOne.save();
      }

      const attendeeTwo = ParticipationFactory.Attendee({
        event: host.event,
        email: "attendee.two@testing.com"
      });

      const getAttendeeTwo = await Participation.findOne({
        $and: [{ email: attendeeTwo.email }, { event: host.event }]
      });

      if (!getAttendeeTwo) {
        await attendeeTwo.save();
      }

      const participations = await Participation.find({ event: host.event });

      const insertCompensations = participations.map((p: any) => ({
        amount: 0,
        receiver: p.id
      }));

      await Compensation.insertMany(insertCompensations);

      const req = ({
        params: {
          eventId: host.event._id
        },
        body: {
          "attendee.one@testing.com": {
            amount: 20
          },
          [attendeeTwo.anonymousName]: {
            amount: 30,
            currency: "USD"
          }
        },
        user: { _id: "5eeaad1d96c9409bc72465c7", email: host.email }
      } as any) as Request;

      await new CompensationsController().createCompensation(req, res, mNext);

      expect(res.json).toHaveBeenCalled;
      done();
    });
  });
});
