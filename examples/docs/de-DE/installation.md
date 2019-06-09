## Installation

### npm

Es wird empfohlen, mit npm zu installieren，Dies funktioniert besser mit dem Paketierungstool [webpack] (https://webpack.js.org/).

```shell
npm i vui-pc -S
```

### CDN

Derzeit können Sie die neueste Version der Ressource über [unpkg.com/vui-pc/] (https://unpkg.com/vui-pc/) herunterladen und die Dateien js und css auf der Seite eingeben, um loszulegen.

```html
<!-- import CSS -->
<link rel="stylesheet" href="https://unpkg.com/vui-pc/lib/theme-chalk/index.css">
<!-- import JavaScript  -->
<script src="https://unpkg.com/vui-pc/lib/index.js"></script>
```

:::tip
Wir empfehlen Benutzern, die Vui-pc mit CDN einführen, die Version an der Linkadresse zu sperren, um zukünftige Inversionen aufgrund von Inkompatibilitätsaktualisierungen beim Upgrade von Vui-pc zu vermeiden. Informationen zum Sperren der Version finden Sie unter [unpkg.com] (https://unpkg.com).
:::

### Hello world

Mit CDN können wir mit Element leicht eine Hello World-Seite schreiben. [Online Demo](https://codepen.io/connorbill/pen/OYWgEM)

<iframe height="265" style="width: 100%;" scrolling="no" title="Vui demo" src="//codepen.io/connorbill/embed/OYWgEM?height=265&theme-id=light&default-tab=html" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/connorbill/pen/OYWgEM'>Vui demo</a> by hetech
  (<a href='https://codepen.io/connorbill'>@connorbill</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Wenn Sie über npm installieren und mit dem Webpack arbeiten möchten, lesen Sie den nächsten Abschnitt: [Erste Schritte](/#/zh-CN/component/quickstart)。
