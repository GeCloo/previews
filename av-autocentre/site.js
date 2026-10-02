// local-business template · shared scripts (gallery viewer, contact form). The deploy copies this into a site that has none.
// Gallery: click a photo to see it large; arrows / ← → to move, Esc or click outside to close. Without JS the link opens the photo.
(function () {
  var g = document.querySelector('.gallery'), d = document.getElementById('lb');
  if (!g || !d || !d.showModal) return;
  var items = [].slice.call(g.querySelectorAll('a')), i = 0, img = d.querySelector('img'), cap = d.querySelector('p');
  var show = function (n) { i = (n + items.length) % items.length; var t = items[i].querySelector('img'); img.src = items[i].getAttribute('href'); img.alt = cap.textContent = t.alt; };
  g.addEventListener('click', function (e) { var a = e.target.closest('a'); if (!a) return; e.preventDefault(); show(items.indexOf(a)); d.showModal(); });
  d.addEventListener('click', function (e) { var b = e.target.closest('[data-go]'); if (b) return show(i + +b.dataset.go); if (e.target === d || e.target.closest('[data-x]')) d.close(); });
  d.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') show(i + 1); if (e.key === 'ArrowLeft') show(i - 1); });
})();

(function () {
  var f = document.getElementById('enquiry'); if (!f) return;
  var msg = f.querySelector('.msg'), btn = f.querySelector('button');
  var say = function (t, cls) { msg.textContent = t; msg.className = 'msg ' + cls; };
  var call = 'please call us' + (f.dataset.phone ? ' on ' + f.dataset.phone : '') + '.';
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    if (/^__/.test(f.access_key.value)) return say('Online messages aren\'t switched on yet – ' + call, 'err');
    btn.disabled = true; say('Sending…', '');
    fetch(f.action, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(f))) })
      .then(function (r) { return r.json(); })
      .then(function (j) { if (!j.success) throw 0; f.reset(); say('Thanks – your message has been sent. We\'ll get back to you soon.', 'ok'); })
      .catch(function () { say('Sorry, that didn\'t send – ' + call, 'err'); })
      .then(function () { btn.disabled = false; });
  });
})();
