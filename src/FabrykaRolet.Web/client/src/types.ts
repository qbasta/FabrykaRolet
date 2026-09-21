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

export interface HouseViewerData {
  views: HouseViewData[];
}
