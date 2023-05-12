export const DAY = ["sat", "sun", "mon", "tue", "wed", "thu", "fri"] as const;

export type DayTye = (typeof DAY)[number];
