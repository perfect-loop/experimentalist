import { activeParticipants, handleDisconnect, handleJoinRoomEvent } from "..";
import SocketMock from "socket.io-mock";
import { ParticipationSocketFactory } from "../../test/factories/ParticipationSocketFactory";
import { ParticipationSocket } from "models/ParticpationsSockets";
import { EventFactory } from "../../test/factories/EventFactory";
import { ParticipationFactory } from "../../test/factories/ParticipationFactory";

describe("handleDisconnect", () => {
  it("remove existing record", async (done: any) => {
    const ps = ParticipationSocketFactory();
    const p = await ps.save();
    const count = await ParticipationSocket.count({});
    expect(count).toBe(1);

    const socket = new SocketMock();
    socket.id = ps.socketId;
    const r = handleDisconnect(socket);
    r.then(() => {
      ParticipationSocket.count({}).then(c => {
        expect(c).toBe(0);
        done();
      });
    });
  });
});

describe("activeParticipants", () => {
  it("return number of socket objects", async (done: any) => {
    const event = await EventFactory().save();
    const p1 = await ParticipationFactory.Attendee({
      event
    }).save();
    const p2 = await ParticipationFactory.Attendee({
      event
    }).save();

    await ParticipationSocketFactory({
      participationId: p1._id
    }).save();

    await ParticipationSocketFactory({
      participationId: p2._id
    }).save();

    activeParticipants(event.id).then((res: any[]) => {
      expect(res.length).toBe(2);
      done();
    });
  });

  it("do not count participants from different events", async (done: any) => {
    const event = await EventFactory().save();
    const event1 = await EventFactory().save();

    const p1 = await ParticipationFactory.Attendee({
      event
    }).save();
    const p2 = await ParticipationFactory.Attendee({
      event1
    }).save();

    await ParticipationSocketFactory({
      participationId: p1._id
    }).save();

    await ParticipationSocketFactory({
      participationId: p2._id
    }).save();

    activeParticipants(event.id).then((res: any[]) => {
      expect(res.length).toBe(1);
      done();
    });
  });

  it("do not count host participants", async (done: any) => {
    const event = await EventFactory().save();

    const p1 = await ParticipationFactory.Attendee({
      event
    }).save();
    const p2 = await ParticipationFactory.Host({
      event
    }).save();

    await ParticipationSocketFactory({
      participationId: p1._id
    }).save();

    await ParticipationSocketFactory({
      participationId: p2._id
    }).save();

    activeParticipants(event.id).then((res: any[]) => {
      expect(res.length).toBe(1);
      done();
    });
  });

  it("do not count assistant participants", async (done: any) => {
    const event = await EventFactory().save();

    const p1 = await ParticipationFactory.Attendee({
      event
    }).save();
    const p2 = await ParticipationFactory.Assistant({
      event
    }).save();

    await ParticipationSocketFactory({
      participationId: p1._id
    }).save();

    await ParticipationSocketFactory({
      participationId: p2._id
    }).save();

    activeParticipants(event.id).then((res: any[]) => {
      expect(res.length).toBe(1);
      done();
    });
  });
});
