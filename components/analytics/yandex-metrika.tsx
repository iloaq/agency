import { YandexMetrikaRouteTracker } from "./yandex-metrika-route-tracker";

// Source: https://yandex.ru/support/metrica/code/counter-initialize.html
const SKYBRIC_YANDEX_METRIKA_ID = "109136066";

export function YandexMetrika() {
  const id = SKYBRIC_YANDEX_METRIKA_ID;

  const tagSrc = `https://mc.yandex.ru/metrika/tag.js?id=${id}`;

  const inline = `
(function(m,e,t,r,i,k,a){
  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
  m[i].l=1*new Date();
  for (var j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) { return; } }
  k=e.createElement(t),a=e.getElementsByTagName(t)[0];k.async=1;k.src=r;a.parentNode.insertBefore(k,a);
})(window, document, "script", ${JSON.stringify(tagSrc)}, "ym");

ym(${id}, "init", { ssr: true, webvisor: true, clickmap: true, ecommerce: "dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce: true, trackLinks: true });
console.info("[Skybric] Yandex Metrika initialized:", ${JSON.stringify(id)});
`;

  return (
    <>
      <script id="yandex-metrika" type="text/javascript" dangerouslySetInnerHTML={{ __html: inline }} />
      <YandexMetrikaRouteTracker counterId={id} />
      <noscript>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element -- Yandex Metrika noscript beacon cannot use next/image. */}
          <img
            src={`https://mc.yandex.ru/watch/${id}`}
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
            width={1}
            height={1}
          />
        </div>
      </noscript>
    </>
  );
}
