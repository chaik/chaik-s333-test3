var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero.js
  function parse(element, { document: document2 }) {
    const cells = [];
    const teaser = element.querySelector(".cmp-teaser");
    if (teaser) {
      const img = teaser.querySelector(".cmp-teaser__image img, .cmp-image__image");
      if (img) {
        const imgEl = document2.createElement("img");
        imgEl.src = img.src;
        imgEl.alt = img.alt || "";
        cells.push([imgEl]);
      }
      const contentCell = [];
      const pretitle = teaser.querySelector(".cmp-teaser__pretitle");
      if (pretitle) contentCell.push(pretitle);
      const title = teaser.querySelector(".cmp-teaser__title");
      if (title) contentCell.push(title);
      const ctas = teaser.querySelectorAll(".cmp-teaser__action-link");
      ctas.forEach((cta) => contentCell.push(cta));
      if (contentCell.length > 0) cells.push([contentCell]);
    }
    const cf = element.querySelector(".cmp-contentfragment");
    if (cf && !teaser) {
      const elementsContainer = cf.querySelector(".cmp-contentfragment__elements");
      const bgStyle = elementsContainer ? elementsContainer.style.backgroundImage : "";
      const bgMatch = bgStyle.match(/url\(["']?([^"')]+)["']?\)/);
      if (bgMatch) {
        const imgEl = document2.createElement("img");
        imgEl.src = bgMatch[1];
        imgEl.alt = "Offer background";
        cells.push([imgEl]);
      }
      const contentCell = [];
      const pretitleEl = cf.querySelector(".cmp-contentfragment__element--pretitle .cmp-contentfragment__element-value");
      const detailEl = cf.querySelector(".cmp-contentfragment__element--detail .cmp-contentfragment__element-value");
      if (pretitleEl || detailEl) {
        const subEl = document2.createElement("p");
        const parts = [];
        if (pretitleEl) parts.push(pretitleEl.textContent.trim());
        if (detailEl) parts.push(detailEl.textContent.trim());
        subEl.textContent = parts.join(" ");
        contentCell.push(subEl);
      }
      const headlineEl = cf.querySelector(".cmp-contentfragment__element--headline .cmp-contentfragment__element-value");
      if (headlineEl) {
        const h2 = document2.createElement("h2");
        h2.textContent = headlineEl.textContent.trim();
        contentCell.push(h2);
      }
      const ctaEl = cf.querySelector(".cmp-contentfragment__element--callToAction .cmp-contentfragment__element-value");
      const ctaUrlEl = cf.querySelector(".cmp-contentfragment__element--ctaUrl .cmp-contentfragment__element-value");
      if (ctaEl) {
        const link = document2.createElement("a");
        link.href = ctaUrlEl ? ctaUrlEl.textContent.trim() : "#";
        link.textContent = ctaEl.textContent.trim();
        const p = document2.createElement("p");
        p.appendChild(link);
        contentCell.push(p);
      }
      if (contentCell.length > 0) cells.push([contentCell]);
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "hero", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/banner.js
  function parse2(element, { document: document2 }) {
    const cells = [];
    const img = element.querySelector(".cmp-frescopa-banner__image img");
    const contentCell = [];
    const title = element.querySelector(".cmp-frescopa-banner__title");
    if (title) contentCell.push(title);
    const desc = element.querySelector(".cmp-frescopa-banner__description");
    if (desc) {
      const p = desc.querySelector("p");
      if (p) contentCell.push(p);
      else contentCell.push(desc);
    }
    const cta = element.querySelector(".cmp-frescopa-banner__cta");
    if (cta) {
      const link = document2.createElement("a");
      link.href = cta.href || "#";
      link.textContent = cta.textContent.trim();
      const p = document2.createElement("p");
      p.appendChild(link);
      contentCell.push(p);
    }
    if (img) {
      cells.push([img, contentCell]);
    } else {
      cells.push([contentCell]);
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "banner", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/location-finder.js
  function parse3(element, { document: document2 }) {
    const cells = [];
    const title = element.querySelector(".cmp-location-finder__title");
    if (title) {
      cells.push([title]);
    }
    const label = element.querySelector(".cmp-location-finder__label");
    if (label) {
      cells.push([label]);
    }
    const input = element.querySelector(".cmp-location-finder__input");
    if (input) {
      const p = document2.createElement("p");
      p.textContent = input.placeholder || "Zip code";
      cells.push([p]);
    }
    const block = WebImporter.Blocks.createBlock(document2, { name: "location-finder", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards.js
  function parse4(element, { document: document2 }) {
    const cells = [];
    const teasers = element.querySelectorAll(".teaser");
    teasers.forEach((teaser) => {
      const cmpTeaser = teaser.querySelector(".cmp-teaser");
      if (!cmpTeaser) return;
      const img = cmpTeaser.querySelector(".cmp-teaser__image img, .cmp-image__image");
      const contentCell = [];
      const title = cmpTeaser.querySelector(".cmp-teaser__title");
      if (title) contentCell.push(title);
      const desc = cmpTeaser.querySelector(".cmp-teaser__description");
      if (desc) {
        const p = document2.createElement("p");
        p.textContent = desc.textContent.trim();
        contentCell.push(p);
      }
      const ctas = cmpTeaser.querySelectorAll(".cmp-teaser__action-link");
      ctas.forEach((cta) => {
        const link = document2.createElement("a");
        link.href = cta.href || "#";
        link.textContent = cta.textContent.trim();
        const p = document2.createElement("p");
        p.appendChild(link);
        contentCell.push(p);
      });
      if (img) {
        cells.push([img, contentCell]);
      } else if (contentCell.length > 0) {
        cells.push([contentCell]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document2, { name: "cards", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/frescopa-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      element.querySelectorAll("[data-cmp-data-layer]").forEach((el) => el.removeAttribute("data-cmp-data-layer"));
      element.querySelectorAll("[data-cmp-is]").forEach((el) => el.removeAttribute("data-cmp-is"));
      WebImporter.DOMUtils.remove(element, [
        ".cmp-location-finder__overlay",
        ".cmp-location-finder__confirmation"
      ]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        ".experiencefragment.header",
        ".experiencefragment.footer",
        ".cmp-page__toastmessagehide",
        "noscript",
        "link",
        ".separator"
      ]);
      element.querySelectorAll(".aem-Grid, .aem-GridColumn").forEach((el) => {
        el.classList.remove(
          ...Array.from(el.classList).filter((c) => c.startsWith("aem-Grid") || c.startsWith("aem-GridColumn"))
        );
      });
    }
  }

  // tools/importer/transformers/frescopa-sections.js
  function transform2(hookName, element, payload) {
    if (hookName !== "afterTransform") return;
    const { template } = payload;
    if (!template || !template.sections || template.sections.length < 2) return;
    const doc = element.ownerDocument || document;
    function normalizeName(name) {
      return name.toLowerCase().replace(/[-\s]+/g, " ").trim();
    }
    const allTables = [...element.querySelectorAll("table")];
    const blockTables = allTables.filter((table) => {
      const th = table.querySelector("tr:first-child th");
      return th && th.textContent.trim().length > 0;
    });
    function findBySelector(section) {
      const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
      for (const sel of selectors) {
        const el = element.querySelector(sel);
        if (el) return el;
      }
      return null;
    }
    const matches = [];
    if (blockTables.length > 0) {
      let tableIdx = 0;
      template.sections.forEach((section) => {
        if (!section.blocks || section.blocks.length === 0) return;
        const expectedName = normalizeName(section.blocks[0]);
        for (let i = tableIdx; i < blockTables.length; i += 1) {
          const th = blockTables[i].querySelector("tr:first-child th");
          const tableName = normalizeName(th.textContent);
          if (tableName === expectedName) {
            matches.push({ el: blockTables[i], section });
            tableIdx = i + 1;
            break;
          }
        }
      });
    }
    if (matches.length < template.sections.length) {
      matches.length = 0;
      template.sections.forEach((section) => {
        const el = findBySelector(section);
        if (el) {
          matches.push({ el, section });
        }
      });
    }
    for (let i = matches.length - 1; i >= 0; i -= 1) {
      const { el, section } = matches[i];
      if (section.style) {
        const sectionMetadata = WebImporter.Blocks.createBlock(doc, {
          name: "Section Metadata",
          cells: [["style", section.style]]
        });
        el.after(sectionMetadata);
      }
      if (i > 0) {
        const hr = doc.createElement("hr");
        el.before(hr);
      }
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero": parse,
    "banner": parse2,
    "location-finder": parse3,
    "cards": parse4
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Frescopa homepage with hero, product highlights, and coffee bean tasting experience section",
    urls: [
      "https://publish-p45403-e1547974.adobeaemcloud.com/us/en.html"
    ],
    blocks: [
      {
        name: "hero",
        instances: [
          ".teaser:has(.cmp-teaser__pretitle)",
          ".contentfragment.cfoffer"
        ]
      },
      {
        name: "banner",
        instances: [
          ".frescopa-banner"
        ]
      },
      {
        name: "location-finder",
        instances: [
          ".location-finder"
        ]
      },
      {
        name: "cards",
        instances: [
          ".container.flexcolummns"
        ]
      }
    ],
    sections: [
      {
        id: "section-1-hero",
        name: "Hero Section",
        selector: ".teaser:has(.cmp-teaser__pretitle)",
        style: null,
        blocks: ["hero"],
        defaultContent: []
      },
      {
        id: "section-2-banner",
        name: "Banner Section",
        selector: ".frescopa-banner",
        style: "warm-beige",
        blocks: ["banner"],
        defaultContent: []
      },
      {
        id: "section-3-location",
        name: "Location Finder Section",
        selector: ".location-finder",
        style: null,
        blocks: ["location-finder"],
        defaultContent: []
      },
      {
        id: "section-4-cards",
        name: "Two-Column Cards Section",
        selector: ".container.flexcolummns",
        style: null,
        blocks: ["cards"],
        defaultContent: []
      },
      {
        id: "section-5-offer",
        name: "Offer Section",
        selector: ".contentfragment.cfoffer",
        style: null,
        blocks: ["hero"],
        defaultContent: []
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document2, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document2.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document: document2, url, html, params } = payload;
      const main = document2.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document2, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document: document2, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document2.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document2);
      WebImporter.rules.transformBackgroundImages(main, document2);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path,
        report: {
          title: document2.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
