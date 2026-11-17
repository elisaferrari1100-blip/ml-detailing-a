/* Вариант A — «Editorial noir». Разметка страницы; логика — в js/core.js. */
window.ML_VIEW = (() => {
  const n2 = (i) => String(i + 1).padStart(2, "0");

  function eyebrow(c, num, text) {
    return `<p class="eyebrow"><span class="eyebrow-num">${num}</span><span class="eyebrow-line" aria-hidden="true"></span>${c.esc(text)}</p>`;
  }

  function brandMark(c, cls = "brand-mark") {
    const b = c.site.brand;
    return `<picture><source type="image/webp" srcset="${c.esc(b.logoMark)}"><img class="${cls}" src="${c.esc(b.logoMarkPng)}" width="320" height="223" alt="${c.esc(b.name)} — детейлинг"></picture>`;
  }

  function header(c) {
    const s = c.site;
    const links = s.nav.map((i) => `<li><a href="${c.esc(i.href)}">${c.esc(i.label)}</a></li>`).join("");
    const mlinks = s.nav.map((i, k) => `<li><a href="${c.esc(i.href)}" data-nav-link><span>${n2(k)}</span>${c.esc(i.label)}</a></li>`).join("");
    const vk = s.social?.vk;
    return `<header class="site-header" id="site-header">
      <div class="wrap header-row">
        <a href="#hero" class="brand" aria-label="${c.esc(s.brand.name)} — на главную">${brandMark(c)}</a>
        <nav class="nav" aria-label="Разделы"><ul>${links}</ul></nav>
        <div class="header-actions">
          ${vk ? `<a class="icon-btn" href="${c.esc(vk.url)}" target="_blank" rel="noopener noreferrer me" aria-label="Мы ВКонтакте">${c.vkIcon()}</a>` : ""}
          <a class="btn btn-gold btn-sm" href="#request">Записаться</a>
          <button type="button" class="menu-btn" data-menu aria-expanded="false" aria-controls="mobile-menu" aria-label="Открыть меню"><span></span><span></span></button>
        </div>
      </div>
      <div class="mobile-menu" id="mobile-menu" hidden>
        <nav aria-label="Разделы (мобильное меню)"><ul>${mlinks}</ul></nav>
        <div class="mobile-menu-foot">
          <a class="btn btn-gold" href="#request" data-nav-link>Записаться</a>
          <a class="mm-phone" href="tel:${c.tel(s.contacts.phone)}">${c.esc(s.contacts.phone)}</a>
        </div>
      </div>
    </header>`;
  }

  function hero(c) {
    const s = c.site;
    const { narrow: n, wide: w } = s.hero;
    const wideBg = "(min-width: 2000px), (min-width: 1300px) and (min-resolution: 1.5dppx)";
    return `<section id="hero" class="hero" aria-labelledby="hero-title">
      <div class="hero-media" aria-hidden="false">
        <picture><source media="${wideBg}" srcset="${c.esc(w.bg4k)}"><source media="(min-width: 768px)" srcset="${c.esc(w.bg)}"><img class="hero-layer hero-bg" src="${c.esc(n.bg)}" alt="" width="${n.width}" height="${n.height}" fetchpriority="high"></picture>
        <picture class="hero-logo-pic" aria-hidden="true"><source type="image/webp" srcset="${c.esc(s.brand.logoHero)}"><img class="hero-logo" src="${c.esc(s.brand.logoHeroPng)}" alt="" width="806" height="562"></picture>
        <picture><source media="${wideBg}" srcset="${c.esc(w.car4k)}"><source media="(min-width: 768px)" srcset="${c.esc(w.car)}"><img class="hero-layer hero-car" src="${c.esc(n.car)}" alt="${c.esc(n.alt)}" width="${n.width}" height="${n.height}" fetchpriority="high"></picture>
        <div class="hero-shade" aria-hidden="true"></div>
      </div>
      <div class="wrap hero-copy">
        <h1 id="hero-title" class="sr-only">ML Detailing — детейлинг в Нижнем Новгороде</h1>
        <p class="kicker">${c.esc(s.brand.kicker)}</p>
        ${s.brand.slogan ? `<p class="hero-slogan">${c.esc(s.brand.slogan)}</p>` : ""}
        <div class="hero-foot">
          <div class="hero-meta">
            <span>${c.esc(s.contacts.address)}</span>
            <span>${c.esc(s.contacts.schedule)}</span>
          </div>
          <div class="hero-cta">
            <a class="btn btn-gold" href="#request">Записаться ${c.icon("arrow-right")}</a>
            <a class="btn btn-line" href="#works">Наши работы</a>
          </div>
        </div>
      </div>
    </section>`;
  }

  function works(c) {
    const s = c.site;
    const all = [...s.worksRow1, ...s.worksRow2];
    if (!all.length) return "";
    const spans = ["w7", "w5", "w4", "w4", "w4", "w12", "w5", "w7", "w6", "w6"];
    const cards = all
      .map(
        (w, i) => `<li class="work ${spans[i % spans.length]}" data-reveal>
          <figure>
            <div class="work-img">${c.picture({ src: w.src, srcSmall: w.srcSmall, alt: w.alt, width: w.width, height: w.height })}</div>
            <figcaption><span class="work-n">${n2(i)}</span>${c.esc(w.badge)}</figcaption>
          </figure>
        </li>`
      )
      .join("");
    const d = s.sections.works;
    return `<section id="works" class="section" aria-labelledby="works-title">
      <div class="wrap">
        <div class="sec-head sec-head--split" data-reveal>
          <div>${eyebrow(c, "01", d.eyebrow)}<h2 id="works-title" class="h2">${c.esc(d.title)}</h2></div>
          <p class="lead">${c.esc(d.lead)}</p>
        </div>
        <ul class="works-grid">${cards}</ul>
      </div>
    </section>`;
  }

  function strip(c) {
    const words = c.site.strips.services;
    const track = words.map((w) => `<span>${c.esc(w)}</span><i aria-hidden="true">✦</i>`).join("");
    return `<div class="strip" aria-label="Направления студии">
      <p class="sr-only">${c.esc(words.join(", "))}</p>
      <div class="strip-track" aria-hidden="true"><div>${track}</div><div>${track}</div></div>
    </div>`;
  }

  function about(c) {
    const s = c.site;
    const stats = s.stats
      .map((st) => {
        const suffix = st.suffix ?? "";
        const star = suffix.includes("★");
        return `<li>
          <p class="stat-num"><span class="sr-only">${st.value.toFixed(st.decimals ?? 0)}${c.esc(suffix)}</span><span aria-hidden="true"><span data-count="${st.value}" data-decimals="${st.decimals ?? 0}">${(0).toFixed(st.decimals ?? 0)}</span>${star ? `<em>★</em>` : c.esc(suffix)}</span></p>
          <p class="stat-label">${c.esc(st.label)}</p>
          <p class="stat-desc">${c.esc(st.description)}</p>
        </li>`;
      })
      .join("");
    return `<section id="about" class="section about" aria-labelledby="about-title">
      <div class="about-bg" aria-hidden="true" style="background-image:url('./images/backdrops/hex-ceiling.webp')"></div>
      <div class="wrap about-grid">
        <div class="about-copy" data-reveal>
          ${eyebrow(c, "02", s.about.eyebrow)}
          <h2 id="about-title" class="about-title">${c.esc(s.about.title)}</h2>
          <p class="about-text">${c.esc(s.about.text)}</p>
          <p class="about-sub">${c.esc(s.social?.vk?.description || "")}</p>
        </div>
        <ul class="stats" data-reveal>${stats}</ul>
      </div>
    </section>`;
  }

  function services(c) {
    const s = c.site;
    const d = s.sections.services;
    const rows = s.services
      .map((svc, i) => {
        const item = c.priceMap.get(svc.priceItem);
        const price = svc.price || (item && item.price !== undefined ? `от\u00a0${c.formatPrice(item.price)}` : "по запросу");
        return `<article class="svc ${i % 2 ? "svc--rev" : ""}" data-reveal>
          <div class="svc-img">${c.picture({ src: svc.image.src, srcSmall: svc.image.srcSmall, alt: svc.image.alt, width: svc.image.width, height: svc.image.height })}</div>
          <div class="svc-body">
            <span class="svc-n">${n2(i)}</span>
            <h3 class="svc-title">${c.esc(svc.title)}</h3>
            <p class="svc-desc">${c.esc(svc.description)}</p>
            <div class="svc-foot">
              <span class="svc-price ${svc.price || (item && item.price !== undefined) ? "" : "is-muted"}">${c.esc(price)}</span>
              <button type="button" class="toggle" data-toggle-item="${c.esc(svc.priceItem)}" aria-pressed="false">
                <span class="toggle-ico">${c.icon("plus")}${c.icon("check")}</span>
                <span class="t-off">Добавить в заявку</span><span class="t-on">В заявке</span>
              </button>
            </div>
          </div>
        </article>`;
      })
      .join("");
    return `<section id="services" class="section" aria-labelledby="services-title">
      <div class="wrap">
        <div class="sec-head sec-head--split" data-reveal>
          <div>${eyebrow(c, "03", d.eyebrow)}<h2 id="services-title" class="h2">${c.esc(d.title)}</h2></div>
          <p class="lead">${c.esc(d.lead)} Добавляйте услуги в заявку — смета соберётся в калькуляторе.</p>
        </div>
        <div class="svc-list">${rows}</div>
      </div>
    </section>`;
  }

  function beforeAfter(c) {
    const s = c.site;
    if (!s.beforeAfter.length) return "";
    const d = s.sections.beforeAfter;
    const pairs = s.beforeAfter
      .map(
        (p) => `<figure class="ba">
          <div class="ba-frame" data-ba style="aspect-ratio:${p.before.width}/${p.before.height};--pos:50%">
            <img class="ba-img" src="${c.esc(p.before.src)}" alt="${c.esc(p.before.alt)}" width="${p.before.width}" height="${p.before.height}" loading="lazy" draggable="false">
            <img class="ba-img ba-after" src="${c.esc(p.after.src)}" alt="${c.esc(p.after.alt)}" width="${p.after.width}" height="${p.after.height}" loading="lazy" draggable="false">
            <span class="ba-tag ba-tag-b" aria-hidden="true">До</span><span class="ba-tag ba-tag-a" aria-hidden="true">После</span>
            <span class="ba-line" aria-hidden="true"></span>
            <span class="ba-handle" data-ba-handle role="slider" tabindex="0" aria-label="Сравнение до и после: ${c.esc(p.title)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" aria-valuetext="После: 50%">${c.icon("chevrons-left-right")}</span>
          </div>
          <figcaption class="sr-only">${c.esc(p.title)}: ${c.esc(p.caption)}</figcaption>
        </figure>`
      )
      .join("");
    const p0 = s.beforeAfter[0];
    return `<section id="before-after" class="section" aria-labelledby="ba-title">
      <div class="wrap ba-grid">
        <div class="ba-copy" data-reveal>
          ${eyebrow(c, "04", d.eyebrow)}
          <h2 id="ba-title" class="h2">${c.esc(d.title)}</h2>
          <p class="lead">${c.esc(d.lead)}</p>
          <div class="ba-caption"><p class="ba-cap-title">${c.esc(p0.title)}</p><p>${c.esc(p0.caption)}</p></div>
          <p class="ba-hint">${c.icon("chevrons-left-right")} Потяните разделитель, чтобы сравнить</p>
        </div>
        <div class="ba-media" data-reveal>${pairs}</div>
      </div>
    </section>`;
  }

  function stars(c, n, label) {
    return `<span class="stars" role="img" aria-label="${c.esc(label)}">${Array.from({ length: n }, () => c.icon("star", "ico", true)).join("")}</span>`;
  }

  function reviews(c) {
    const s = c.site;
    if (!s.reviews.length) return "";
    const d = s.sections.reviews;
    const slides = s.reviews
      .map(
        (r, i) => `<li class="rv" data-review-slide ${i === 0 ? "data-active" : ""} aria-hidden="${i !== 0}">
          <blockquote>${c.esc(r.text).replace(/\n/g, "<br>")}</blockquote>
          <div class="rv-meta">
            <span class="rv-av" aria-hidden="true">${c.esc(r.initials)}</span>
            <span><span class="rv-name">${c.esc(r.author)}</span><span class="rv-src">${c.esc(r.source)}</span></span>
            ${stars(c, r.rating, `Оценка ${r.rating} из 5`)}
          </div>
        </li>`
      )
      .join("");
    return `<section id="reviews" class="section reviews" aria-labelledby="reviews-title">
      <div class="reviews-bg" aria-hidden="true" style="background-image:url('./images/backdrops/box-corridor.webp')"></div>
      <div class="wrap">
        <div class="sec-head sec-head--split" data-reveal>
          <div>${eyebrow(c, "05", d.eyebrow)}<h2 id="reviews-title" class="h2">${c.esc(d.title)}</h2></div>
          <div class="rating">
            <span class="rating-num">${c.esc(s.reviewSummary.rating)}</span>
            <span>${stars(c, Math.round(Number(s.reviewSummary.rating)), `Оценка ${s.reviewSummary.rating} из 5`)}<span class="rating-text">${c.esc(s.reviewSummary.text)}</span></span>
          </div>
        </div>
        <div class="rv-wrap" data-reveal>
          <span class="rv-mark" aria-hidden="true">“</span>
          <ul class="rv-list" aria-live="polite">${slides}</ul>
          <div class="rv-nav">
            <span class="rv-count"><b data-review-counter>01</b> / ${String(s.reviews.length).padStart(2, "0")}</span>
            <span class="rv-progress" data-review-progress aria-hidden="true"></span>
            <button type="button" class="icon-btn icon-btn--lg" data-review-dir="-1" aria-label="Предыдущий отзыв">${c.icon("arrow-left")}</button>
            <button type="button" class="icon-btn icon-btn--lg" data-review-dir="1" aria-label="Следующий отзыв">${c.icon("arrow-right")}</button>
          </div>
        </div>
      </div>
    </section>`;
  }

  function contacts(c) {
    const s = c.site;
    const ct = s.contacts;
    const vk = s.social?.vk;
    return `<section id="contacts" class="section" aria-labelledby="contacts-title">
      <div class="wrap contacts-grid">
        <div class="contacts-copy" data-reveal>
          ${eyebrow(c, "06", s.sections.location.eyebrow)}
          <h2 id="contacts-title" class="h2">${c.esc(s.sections.location.title)}</h2>
          <dl class="info">
            <div><dt>Адрес</dt><dd>${c.esc(ct.address)}</dd></div>
            <div><dt>Режим работы</dt><dd>${c.esc(ct.schedule)}${c.esc(ct.scheduleNote)}</dd></div>
            <div><dt>Телефон</dt><dd><a href="tel:${c.tel(ct.phone)}">${c.esc(ct.phone)}</a></dd></div>
            ${vk ? `<div><dt>${c.esc(vk.title)}</dt><dd><a href="${c.esc(vk.url)}" target="_blank" rel="noopener noreferrer me">${c.esc(vk.name)} ${c.icon("arrow-up-right")}</a></dd></div>` : ""}
          </dl>
          <div class="btn-row">
            <a class="btn btn-gold" href="#request">Записаться ${c.icon("arrow-right")}</a>
            <a class="btn btn-line" href="${c.esc(ct.yandexOrgUrl)}" target="_blank" rel="noopener noreferrer">Открыть в Яндекс Картах</a>
          </div>
          ${vk ? `<p class="vk-note">${c.vkIcon()} <span>${c.esc(vk.description)} <a href="${c.esc(vk.url)}" target="_blank" rel="noopener noreferrer me">${c.esc(vk.cta)}</a></span></p>` : ""}
        </div>
        <div class="map" data-reveal>
          <iframe src="${c.esc(ct.yandexWidgetUrl)}" title="${c.esc(ct.studioName)} на картах" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
          <span class="map-label" aria-hidden="true"><i></i>${c.esc(ct.studioName)} · ${c.esc(ct.address.replace(/^Нижний Новгород,\s*/, ""))}</span>
          ${c.isTouch() ? `<button type="button" class="map-lock" data-unlock-map><span>Нажмите, чтобы двигать карту</span></button>` : ""}
        </div>
      </div>
    </section>`;
  }

  function request(c) {
    const s = c.site;
    const d = s.sections.request;
    const pills = [c.ALL, ...c.groups]
      .map((g) => `<button type="button" class="pill" data-category="${c.esc(g)}" aria-pressed="${g === c.state.category}">${c.esc(g)}</button>`)
      .join("");
    return `<section id="request" class="section request" aria-labelledby="request-title">
      <div class="band" aria-hidden="true" style="background-image:url('./images/backdrops/studio-car.webp')"></div>
      <div class="wrap">
        <div class="sec-head sec-head--split" data-reveal>
          <div>${eyebrow(c, "07", d.eyebrow)}<h2 id="request-title" class="h2">${c.esc(d.title)}</h2></div>
          <p class="lead">${c.esc(d.lead)}</p>
        </div>
        <div class="req" data-reveal>
          <div class="req-main">
            <div class="pills" role="group" aria-label="Категории услуг">${pills}</div>
            <div class="req-list" data-region="reqList"></div>
          </div>
          <aside class="req-panel" aria-label="Смета работ">
            <div class="panel-head"><h3>Смета работ</h3><span class="count" data-region="reqCount"></span></div>
            <div data-region="reqSelected"></div>
            <div class="panel-note">
              <p class="pn-title">${c.esc(d.standard.title)}</p>
              <p>${c.esc(d.standard.text)}</p>
            </div>
            <div data-region="reqTotal"></div>
            <div id="lead-form-anchor" data-region="reqForm"></div>
          </aside>
        </div>
      </div>
      <div class="req-dock" data-region="reqDock"></div>
    </section>`;
  }

  function footer(c) {
    const s = c.site;
    const lg = s.legal || {};
    const vk = s.social?.vk;
    const docs = [
      ["./legal/privacy.html", "Политика обработки персональных данных"],
      ["./legal/consent.html", "Согласие на обработку ПДн"],
      ["./legal/terms.html", "Пользовательское соглашение"],
      ["./legal/cookies.html", "Политика cookie"],
      ["./legal/offer.html", "Публичная оферта"],
    ];
    return `<footer class="footer">
      <div class="wrap">
        <div class="footer-top">
          <a href="#hero" class="footer-logo" aria-label="${c.esc(s.brand.name)} — на главную">${brandMark(c, "footer-mark")}</a>
          <p class="footer-lead">Детейлинг в Нижнем Новгороде: тонировка, бронирование плёнкой, химчистка салона.</p>
          <a class="btn btn-gold" href="#request">Записаться ${c.icon("arrow-right")}</a>
        </div>
        <div class="footer-grid">
          <div><p class="f-h">Разделы</p><ul>${s.nav.map((i) => `<li><a href="${c.esc(i.href)}">${c.esc(i.label)}</a></li>`).join("")}</ul></div>
          <div><p class="f-h">Контакты</p><ul>
            <li>${c.esc(s.contacts.address)}</li>
            <li>${c.esc(s.contacts.schedule)}</li>
            <li><a href="tel:${c.tel(s.contacts.phone)}">${c.esc(s.contacts.phone)}</a></li>
            ${vk ? `<li><a href="${c.esc(vk.url)}" target="_blank" rel="noopener noreferrer me">Мы ВКонтакте</a></li>` : ""}
          </ul></div>
          <div><p class="f-h">Документы</p><ul>${docs.map(([h, l]) => `<li><a href="${h}">${c.esc(l)}</a></li>`).join("")}</ul></div>
          <div><p class="f-h">Реквизиты</p><ul class="req-data">
            <li class="ph">${c.esc(lg.legalName || "[ИП ФИО]")}</li>
            <li>ИНН: <span class="ph">${c.esc(lg.inn || "[ИНН]")}</span></li>
            <li>ОГРН/ОГРНИП: <span class="ph">${c.esc(lg.ogrn || "[ОГРН/ОГРНИП]")}</span></li>
            <li>E-mail: <span class="ph">${c.esc(lg.email || "[email]")}</span></li>
            <li>Телефон: <span class="ph">${c.esc(lg.phone || "[телефон]")}</span></li>
          </ul></div>
        </div>
        <div class="footer-bottom">
          <span>© ${new Date().getFullYear()} ${c.esc(s.contacts.studioName)} · ${c.esc(s.brand.city)}</span>
          <span><a href="./legal/cookies.html">Cookie</a> · <a href="./legal/offer.html">Цены не являются публичной офертой</a></span>
        </div>
      </div>
    </footer>`;
  }

  function cookie() {
    return `<div id="cookie-banner" class="cookie" hidden role="dialog" aria-label="Уведомление об использовании cookie">
      <p>Мы используем cookie, чтобы сайт работал стабильно и было удобнее пользоваться формой заявки. Подробности — в <a href="./legal/cookies.html">политике cookie</a>.</p>
      <button type="button" class="btn btn-gold btn-sm" data-cookie-accept>Понятно</button>
    </div>`;
  }

  /* ——— Динамические зоны калькулятора ——— */
  const regions = {
    reqList(c) {
      const items = c.state.category === c.ALL ? c.site.priceList : c.site.priceList.filter((i) => i.group === c.state.category);
      return items
        .map(
          (i) => `<button type="button" class="row" data-toggle-item="${c.esc(i.key)}" aria-pressed="false">
            <span class="row-check" aria-hidden="true">${c.icon("check")}</span>
            <span class="row-text"><span class="row-title">${c.esc(i.title)}</span><span class="row-group">${c.esc(i.group)}</span>${i.note && i.note !== i.title ? `<span class="row-note">${c.esc(i.note)}</span>` : ""}</span>
            <span class="row-price">${i.price === undefined ? `<span class="is-muted">по запросу</span>` : `<small>от</small> ${c.formatPrice(i.price)}`}</span>
          </button>`
        )
        .join("");
    },
    reqCount(c) {
      const n = c.booking().items.length;
      return `${n} ${n % 10 === 1 && n % 100 !== 11 ? "позиция" : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? "позиции" : "позиций"}`;
    },
    reqDock(c) {
      const b = c.booking();
      if (!b.items.length) return "";
      return `<div class="dock-in"><span class="dock-n">Смета · ${b.items.length}</span><span class="dock-sum">${b.total > 0 ? `от ${c.formatPrice(b.total)}` : "по запросу"}</span><button type="button" class="dock-btn" data-go-form>К заявке ${c.icon("arrow-right")}</button></div>`;
    },
    reqSelected(c) {
      const b = c.booking();
      if (!b.items.length) return `<p class="sel-empty">Отметьте услуги в списке — смета соберётся здесь.</p>`;
      return `<ul class="sel">${b.items
        .map(
          (i) => `<li><span class="sel-t">${c.esc(i.title)}<small>${c.esc(i.group)}</small></span><span class="sel-p">${i.price === undefined ? "по запросу" : c.formatPrice(i.price)}</span><button type="button" class="sel-x" data-remove-item="${c.esc(i.key)}" aria-label="Убрать: ${c.esc(i.title)}">${c.icon("x")}</button></li>`
        )
        .join("")}</ul><button type="button" class="link-btn" data-clear>Очистить</button>`;
    },
    reqTotal(c) {
      const b = c.booking();
      return `<div class="total">
        <p class="total-label">Расчётная стоимость</p>
        <p class="total-sum" aria-live="polite">${b.total > 0 ? `<small>от</small> ${c.formatPrice(b.total)}` : "—"}</p>
        <p class="total-note">* ${c.esc(c.site.sections.request.totalNote)}${b.hasOnRequest ? "; позиции «по запросу» мастер оценит на осмотре" : ""}</p>
      </div>`;
    },
    reqForm(c) {
      const st = c.state;
      if (st.formDone) {
        return `<div class="done" role="status">${c.icon("circle-check", "ico done-ico")}<h3>Заявка принята</h3><p>Мы перезвоним, чтобы подтвердить время.</p><p class="small">Данные пока никуда не отправляются: форма работает в демонстрационном режиме.</p><button type="button" class="btn btn-line btn-sm" data-reset-form>Отправить ещё одну</button></div>`;
      }
      const e = c.errors();
      const f = (id, key, label, opt, attrs) => `<div class="field ${e[key] ? "has-err" : ""}">
        <label for="${id}">${c.esc(label)}${opt ? " <span>(необязательно)</span>" : ""}</label>
        <input id="${id}" value="${c.esc(st.form[key])}" ${e[key] ? `aria-invalid="true" aria-describedby="${id}-err"` : ""} ${attrs}>
        ${e[key] ? `<p class="err" id="${id}-err">${c.esc(e[key])}</p>` : ""}
      </div>`;
      return `<form id="lead-form" class="form" novalidate>
        ${f("lead-name", "name", "Ваше имя", false, 'type="text" autocomplete="name" data-field="name"')}
        ${f("lead-phone", "phone", "Телефон", false, 'type="tel" inputmode="tel" autocomplete="tel" placeholder="+7 (___) ___-__-__" data-field="phone"')}
        ${f("lead-car", "car", "Марка и модель авто", true, 'type="text" placeholder="Например, Mazda 6" data-field="car"')}
        <label class="consent ${e.consent ? "has-err" : ""}"><input type="checkbox" id="lead-consent" data-field="consent" ${st.form.consent ? "checked" : ""} ${e.consent ? 'aria-invalid="true"' : ""}><span class="cbox" aria-hidden="true">${c.icon("check")}</span><span>Я даю <a href="./legal/consent.html" target="_blank" rel="noopener">согласие на обработку персональных данных</a> и принимаю <a href="./legal/privacy.html" target="_blank" rel="noopener">политику конфиденциальности</a>.</span></label>
        ${e.consent ? `<p class="err">${c.esc(e.consent)}</p>` : ""}
        <button type="submit" class="btn btn-gold btn-block" ${st.formSending ? "disabled" : ""}>${st.formSending ? "Отправляем…" : `Отправить заявку ${c.icon("arrow-right")}`}</button>
      </form>`;
    },
  };

  function page(c) {
    return `<a class="skip" href="#works">Перейти к содержанию</a>
      ${header(c)}
      <main>
        ${hero(c)}
        ${works(c)}
        ${strip(c)}
        ${about(c)}
        ${services(c)}
        ${beforeAfter(c)}
        ${reviews(c)}
        ${contacts(c)}
        ${request(c)}
      </main>
      ${footer(c)}
      ${cookie()}`;
  }

  /* Логотип «за машиной»: позиция считается от кадра фото так же, как в исходном сайте. */
  function afterRender(c) {
    const heroEl = document.getElementById("hero");
    if (!heroEl) return;
    const place = () => {
      const narrow = window.innerWidth < 768;
      const p = narrow ? c.site.hero.narrow : c.site.hero.wide;
      const W = heroEl.clientWidth;
      const H = heroEl.clientHeight;
      const sc = Math.max(W / p.width, H / p.height);
      const dh = p.height * sc;
      const dw = p.width * sc;
      const oy = (H - dh) * p.focusY;
      const ox = (W - dw) * p.focusX;
      const fs = p.textSize * dh;
      if (narrow) {
        heroEl.style.setProperty("--logo-h", `${Math.min(H * 0.15, W * 0.3)}px`);
        heroEl.style.setProperty("--logo-top", `${Math.max(96, H * 0.17)}px`);
      } else {
        heroEl.style.setProperty("--logo-h", `${fs * 1.3}px`);
        heroEl.style.setProperty("--logo-top", `${oy + p.textTop * dh + fs * 0.3}px`);
      }
      heroEl.style.setProperty("--logo-x", `${ox + dw * 0.5}px`);
      heroEl.style.setProperty("--obj", `${p.focusX * 100}% ${p.focusY * 100}%`);
    };
    place();
    window.addEventListener("resize", place, { passive: true });
  }

  return { page, regions, afterRender };
})();
