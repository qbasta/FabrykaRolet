import { HouseViewer } from "./houseViewer";
import type { HouseViewerData } from "./types";

function init(): void {
  const root = document.getElementById("house-viewer");
  const dataScript = document.getElementById("house-viewer-data");
  if (!root || !dataScript?.textContent) return;
  if (root.dataset.houseViewerInitialized === "true") return;

  let data: HouseViewerData;
  try {
    data = JSON.parse(dataScript.textContent) as HouseViewerData;
  } catch {
    console.error("HouseViewer: nie udało się sparsować danych widoku.");
    return;
  }

  if (!data.views?.length) return;

  root.dataset.houseViewerInitialized = "true";
  new HouseViewer(root, data);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
