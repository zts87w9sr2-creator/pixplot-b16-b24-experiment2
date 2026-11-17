# PixPlot Website 2 – Visual Clustering Comparison (69 Images)

This is an independent, genuine second PixPlot run using the 65 B16/B24 field-study images from Website 1 plus four deliberately unrelated test images: a cat, Doraemon, a Formula 1 car, and a tank.

**Website 1:** https://zts87w9sr2-creator.github.io/pixplot-b16-b24-reviewed/

**Website 2:** https://zts87w9sr2-creator.github.io/pixplot-b16-b24-experiment2/

The source PixPlot UMAP layouts, image atlases and KMeans hotspot JSON from the second run remain unchanged. The HTML and sidebar scripts add a separate human-reviewed subject layer, using the previously student-approved assignments for the 65 common images. The four additional images are marked as a test-image group: this is an experiment flag, not a claim that the images have a common anthropological theme.

## Observations from the actual PixPlot results

- Website 1: 65 images; seven automatic KMeans clusters.
- Website 2: 69 images; seven automatic KMeans clusters.
- All four extra test images were placed in **Website 2 Cluster 3**, along with seven B16 images: B16P07, P09, P15, P17, P18, P28 and P32.
- The four images do not occupy a single point in the UMAP projection; Doraemon is notably separated from the cluster of cat/F1/tank in the projected coordinates.
- The seven original groups cannot be compared by number alone, since cluster numbers do not have fixed meanings between runs. After an optimal matching of group IDs, 35 of the original 65 images retained a matched group and 30 were assigned differently; the adjusted Rand index across common photographs was approximately 0.381.
- As UMAP and KMeans can be sensitive to reruns and initialization, observed changes are **not controlled evidence** that the added photos alone caused all shifts. The useful finding is that an automatic grouping does not match a human semantic or ethnographic classification.

## Technical checks

- The complete 69-image list, zero-based indices and both hotspot layers are validated (each image appears exactly once per layer).
- The original four UMAP/gridded layout JSON files and all image atlas files were preserved from the second PixPlot output.
- The point-size values for the displayed viewer were increased to match the enlarged Website 1 view; no image pixels or atlas-cell settings were altered.
- The unmodified original KMeans hotspot JSON remains at `data/hotspots/hotspot-*.json`. The reviewed list is separately stored at `data/hotspots/reviewed_subject_groups.json`.

## Publishing

Website 2 is hosted in its **own** repository, `pixplot-b16-b24-experiment2`. Its `index.html`, `assets/`, and `data/` are located directly at the repository root. GitHub Pages is published from the `main` branch, `/(root)`, and serves the independent Website 2 URL above. Website 1 remains in its separate `pixplot-b16-b24-reviewed` repository.
