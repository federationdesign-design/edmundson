export type WorkPhoto = {
  /** Stable key: the Drive file ID, or the local path. */
  id: string;
  src: string;
  alt: string;
};

// Local crops of the supplied photos. Used by the Our Work gallery whenever
// the Google Drive feed is unavailable.
export const LOCAL_WORK_PHOTOS: WorkPhoto[] = [
  {
    src: "/images/site/work-gantry-hoist-stair.jpg",
    alt: "Yellow gantry crane with an electric chain hoist above a staircase to a mezzanine in a warehouse",
  },
  {
    src: "/images/site/work-staircase-platform.jpg",
    alt: "Yellow steel staircase with handrails leading up to a guarded platform",
  },
  {
    src: "/images/site/work-walkway-handrail.jpg",
    alt: "Galvanised grating walkway with yellow handrails on both sides over water",
  },
  {
    src: "/images/site/work-lifting-beam.jpg",
    alt: "Yellow lifting beam marked SWL 3 ton with red lifting hooks, on a workshop floor",
  },
  {
    src: "/images/site/work-mesh-gate.jpg",
    alt: "Yellow steel mesh safety gate with a bolt latch installed beneath a riveted steel structure",
  },
  {
    src: "/images/site/work-gantry-platform.jpg",
    alt: "Yellow A-frame gantry with a hoist beside a raised platform and staircase in an industrial unit",
  },
  {
    src: "/images/site/work-access-ladder.jpg",
    alt: "Yellow access ladder and handrail at a waterside edge, secured with a red chain and inspection tag",
  },
  {
    src: "/images/site/work-steel-frame-lift.jpg",
    alt: "Fabricated yellow steel frame being lifted by a lorry-mounted crane in a yard",
  },
  {
    src: "/images/site/work-workbench-frames.jpg",
    alt: "Blue steel workbench frames with timber shelves, fabricated for a workshop",
  },
].map((photo) => ({ id: photo.src, ...photo }));
