// The eight services, as listed on the homepage and offered in the contact form.
export const SERVICES = [
  {
    title: "Inspections & load tests",
    description: "In house or on site, across England, Scotland and Wales.",
  },
  {
    title: "Supply of lifting & safety equipment",
    description: "Quality equipment for a safer workplace.",
  },
  {
    title: "Repairs",
    description: "Fast, reliable repairs for lifting and safety equipment.",
  },
  {
    title: "Fabrication",
    description: "Runways, swing arms and lifting apparatus, all installed by our team.",
  },
  {
    title: "On-site maintenance",
    description: "Keeping your site safe and operational.",
  },
  {
    title: "Partition doors",
    description: "Inspection and assessment of partition doors.",
  },
  {
    title: "Vehicle ramps & tail lifts",
    description:
      "Inspection and repairs on vehicle ramps, scissor tables and tail lifts.",
  },
  {
    title: "24 hour assistance",
    description: "Always here when you need us.",
  },
] as const;

export const SERVICE_TITLES: readonly string[] = SERVICES.map((s) => s.title);
