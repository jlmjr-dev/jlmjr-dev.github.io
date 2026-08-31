export const paneIds = ["about", "work", "projects", "stack"] as const;

export type PaneId = (typeof paneIds)[number];

export const defaultPane: PaneId = "about";
