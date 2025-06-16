// Google Analytics 4 snippet
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-XXXXXXXXXX'); // Replace with your GA4 Measurement ID

// Plausible Analytics snippet (replace with your site URL)
(function(){
  var d=document, s=d.createElement('script');
  s.src='https://plausible.io/js/plausible.js';
  s.defer=true;
  s.setAttribute('data-domain','yourdomain.com'); // Replace yourdomain.com
  d.head.appendChild(s);
})();
