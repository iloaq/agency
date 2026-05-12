// Source: https://www.chatwoot.com/docs/product/channels/live-chat/sdk-setup

const CHATWOOT_BASE_URL = "https://chatwootskybric.capaadmin.skybric.com";
const CHATWOOT_WEBSITE_TOKEN = "9N2pEkUuBTP286y6VQqNfmzz";

/** Серверный компонент: один inline-скрипт, без use client / useEffect. */
export function ChatwootWidget() {
  const baseUrl = CHATWOOT_BASE_URL.replace(/\/+$/, "");
  const websiteToken = CHATWOOT_WEBSITE_TOKEN;
  const __html = `
(function(){
  var BASE_URL=${JSON.stringify(baseUrl)};
  var WEBSITE_TOKEN=${JSON.stringify(websiteToken)};
  var SDK_SRC=BASE_URL+"/packs/js/sdk.js";
  for(var i=0;i<document.scripts.length;i++){if(document.scripts[i].src===SDK_SRC)return;}
  window.chatwootSettings={position:"right",type:"standard",launcherTitle:"Обсудить проект"};
  var g=document.createElement("script"),s=document.getElementsByTagName("script")[0];
  g.src=SDK_SRC;g.async=true;
  g.onload=function(){window.chatwootSDK&&window.chatwootSDK.run({websiteToken:WEBSITE_TOKEN,baseUrl:BASE_URL});};
  s.parentNode.insertBefore(g,s);
})();`;

  return <script dangerouslySetInnerHTML={{ __html }} />;
}
