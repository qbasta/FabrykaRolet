export interface HotspotData {
  systemId: string;
  name: string;
  description: string;
  advantages: string[];
  polygon: [number, number][];
}

export interface HouseViewData {
  id: string;
  title: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  hotspots: HotspotData[];
}

export interface SystemSummary {
  systemId: string;
  name: string;
  description: string;
  advantages: string[];
}

export interface HouseViewerData {
  views: HouseViewData[];
  systems: SystemSummary[];
}
