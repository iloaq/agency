import Script from "next/script";

// Source: https://nextjs.org/docs/app/api-reference/components/script
// Source: https://yandex.ru/support/metrica/code/counter-initialize.html

function counterId(): string | null {
  const raw = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID?.trim();
  return raw && /^\d+$/.test(raw) ? raw : null;
}

export function YandexMetrika() {
  const id = counterId();
  if (!id) return null;

  const tagSrc = `https://mc.yandex.ru/metrika/tag.js?id=${id}`;

  const inline = `
(function(m,e,t,r,i,k,a){
  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
  m[i].l=1*new Date();
  for (var j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) { return; } }
  k=e.createElement(t),a=e.getElementsByTagName(t)[0];k.async=1;k.src=r;a.parentNode.insertBefore(k,a);
})(window, document, "script", ${JSON.stringify(tagSrc)}, "ym");

ym(${id}, "init", { ssr: true, webvisor: true, clickmap: true, ecommerce: "dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce: true, trackLinks: true });
`;

  return (
    <>
      <Script id="yandex-metrika" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: inline }} />
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
