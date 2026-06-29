import { events } from "../data/eventsData.js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let eventsData = [...events];

export const getEvents = async () => {
  await delay(500);
  return eventsData;
};

export const createEvent = async (event) => {
  await delay(500);
  const newEvent = {
    ...event,
    id: `EVT-${Math.floor(Math.random() * 10000)}`,
  };
  eventsData = [newEvent, ...eventsData];
  return newEvent;
};

export const deleteEvent = async (id) => {
  await delay(500);
  eventsData = eventsData.filter(e => e.id !== id);
  return true;
};
