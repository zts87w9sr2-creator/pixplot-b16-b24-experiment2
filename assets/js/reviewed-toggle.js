/* Student-reviewed subject groups displayed alongside unchanged PixPlot KMeans groups.
   GitHub Pages-compatible: both tiny hotspot lists are embedded so an intermittent
   HTTP 503 for auxiliary JSON cannot disable the review/automatic toggle.
   Original PixPlot image positions, atlases and source JSON files are unchanged. */
(function () {
  'use strict';
  const AUTOMATIC_GROUPS = [{"images":[10,11,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,63],"img":"B24P30.jpg","layout":"inception_vectors","label":"Cluster 1"},{"images":[0,3,4,5,13,19,23,24,25,26,28,34,36,37,38],"img":"B24P05.jpg","layout":"inception_vectors","label":"Cluster 2"},{"images":[6,8,14,16,17,27,31,65,66,67,68],"img":"EXTRA_Tank.jpg","layout":"inception_vectors","label":"Cluster 3"},{"images":[1,2,12,29,30,32,33],"img":"B16P34.jpg","layout":"inception_vectors","label":"Cluster 4"},{"images":[7,9,15,18,20,21,22],"img":"B16P23.jpg","layout":"inception_vectors","label":"Cluster 5"},{"images":[57,58,59,60,61,62,64],"img":"B24P31.jpg","layout":"inception_vectors","label":"Cluster 6"},{"images":[35],"img":"B16P36.jpg","layout":"inception_vectors","label":"Cluster 7"}];
  const REVIEWED_GROUPS = [{"images":[34,36,38],"img":"B16P35.jpg","layout":"student_human_review","label":"01｜村落景觀與鄉郊舊建築"},{"images":[0,1,2,3,4,5,14],"img":"B16P01.jpg","layout":"student_human_review","label":"02｜中國傳統宗教建築"},{"images":[6,7,8,9,16,17,18,20,21,22],"img":"B16P07.jpg","layout":"student_human_review","label":"03｜中國宗教室內、神像與祭壇"},{"images":[12,15,19,28,29,30,31,32,33,37],"img":"B16P13.jpg","layout":"student_human_review","label":"04｜民間信仰、風水與鎮護設施"},{"images":[23,24,25,26,27],"img":"B16P24.jpg","layout":"student_human_review","label":"05｜西方宗教建築與設施"},{"images":[10,11,13],"img":"B16P11.jpg","layout":"student_human_review","label":"06｜人物活動與田野留影"},{"images":[39,40],"img":"B24P06.jpg","layout":"student_human_review","label":"07｜鄉郊草地與小徑"},{"images":[41,42,43,44,45,46,47,48,49],"img":"B24P08.jpg","layout":"student_human_review","label":"08｜泥灘、淺水與岩岸"},{"images":[50,51,52,53,54,55,56,63],"img":"B24P17.jpg","layout":"student_human_review","label":"09｜山水、水灣與水岸基建"},{"images":[57,58,59,60,61,62,64],"img":"B24P24.jpg","layout":"student_human_review","label":"10｜高樓、山坡與城市發展"},{"images":[35],"img":"B16P36.jpg","layout":"student_human_review","label":"—｜未分類／待核對"},{"images":[65,66,67,68],"img":"EXTRA_Cat.jpg","layout":"student_experiment_images","label":"EXTRA｜異質測試圖片（貓、卡通、F1、坦克）"}];
  const autoButton = document.getElementById('review-auto');
  const reviewedButton = document.getElementById('review-manual');
  const description = document.getElementById('review-desc');
  const status = document.getElementById('review-status');
  let requested = 'reviewed';
  function clone(obj) { return JSON.parse(JSON.stringify(obj)); }
  function setActive(mode) {
    autoButton.classList.toggle('active', mode === 'automatic');
    reviewedButton.classList.toggle('active', mode === 'reviewed');
    autoButton.setAttribute('aria-pressed', String(mode === 'automatic'));
    reviewedButton.setAttribute('aria-pressed', String(mode === 'reviewed'));
    description.innerHTML = mode === 'automatic'
      ? '<strong>Automatic KMeans — 7 clusters</strong><div>視覺特徵分組，由 PixPlot 原始模型產生。</div>'
      : '<strong>Human-reviewed — 10 groups + 1 uncertain + 4 test images</strong><div>保留 Website 1 已核對的主題分類；四張異質測試圖另外標記，與機器自動分組不同。</div>';
  }
  function update() {
    if (!window.data || !data.hotspots || !Array.isArray(data.hotspots.json) ||
        !data.cells || data.cells.length !== 69) {
      status.textContent = '正在載入 PixPlot…';
      return false;
    }
    try {
      data.hotspots.setEdited(false);
      data.hotspots.handleJson(clone(requested === 'automatic' ? AUTOMATIC_GROUPS : REVIEWED_GROUPS));
      setActive(requested);
      status.textContent = '';
      return true;
    } catch (err) {
      status.textContent = '分類顯示發生錯誤：' + err.message;
      console.error(err);
      return false;
    }
  }
  function select(mode) { requested = mode; update(); }
  autoButton.addEventListener('click', function () { select('automatic'); });
  reviewedButton.addEventListener('click', function () { select('reviewed'); });
  setActive('reviewed');
  let attempts = 0;
  const poll = setInterval(function () {
    attempts++;
    if (update() || attempts > 240) clearInterval(poll);
    if (attempts > 240) status.textContent = 'PixPlot 未能完成載入，請重新整理頁面。';
  }, 250);
})();
