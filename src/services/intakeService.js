import { initialIntakes } from "../data/intakeData.js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let intakes = [...initialIntakes];

export const getIntakes = async () => {
  await delay(500);
  return intakes;
};

export const createIntake = async (intakeData) => {
  await delay(500);
  const newIntake = {
    ...intakeData,
    id: `REQ-${Math.floor(Math.random() * 10000)}`,
    date: new Date().toISOString(),
  };
  intakes = [newIntake, ...intakes];
  return newIntake;
};
