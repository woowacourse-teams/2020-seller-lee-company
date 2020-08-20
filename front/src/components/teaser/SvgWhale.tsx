import React from "react";
import { SvgXml } from "react-native-svg";

const xml = `<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="96" height="96"
\t viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
<path style="fill:#08B7FC;" d="M155.637,197.543l-0.167-38.272c45.642-6.975,80.606-46.401,80.606-93.993v-23.3l-66.584,5.936
\tc-21.284,1.897-40.39,13.822-51.445,32.108l-0.008,0.014l-0.005-0.009c-11.058-18.289-30.168-30.216-51.456-32.114L0,41.978v23.3
\tc0,47.598,34.972,87.027,80.622,93.995l-0.167,38.269c0,105.64,75.916,193.549,176.17,212.146l80.795-0.301
\tC436.884,390.161,512,302.624,512,197.543H155.637z"/>
<path style="fill:#F1F1F2;" d="M337.42,409.388C436.884,390.161,512,302.624,512,197.543h-61.465l-8.064,24.081
\tc-22.713,67.826-86.237,113.545-157.765,113.545l0,0v74.416L337.42,409.388z"/>
<path style="fill:#E6E6E6;" d="M337.42,409.388C436.884,390.161,512,302.624,512,197.543c0,0-16.334,0-29.534,0
\tc0,75.696-70.224,173.481-197.761,173.481v38.561L337.42,409.388z"/>
<circle style="fill:#333333;" cx="365.24" cy="253.06" r="15.934"/>
<path style="fill:#82D2FF;" d="M264.929,324.926c0,0-29.621,77.737,1.269,145.096c88.073-30.98,76.002-145.096,76.002-145.096
\tL264.929,324.926L264.929,324.926z"/>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>`;

export default function SvgWhale() {
  return <SvgXml xml={xml} />;
}
