export const DAY = ["sat", "sun", "mon", "tue", "wed", "thu", "fri"] as const;

export type DayType = (typeof DAY)[number];
