# FullPage.js v0.1

## Requirements
Include GSAP and Observer:

```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/Observer.min.js"></script>
<script type="module" src="js/app.js"></script>
```

## HTML

```html
<div id="fp">
 <section class="fp-section">Hero</section>
 <section class="fp-section">About</section>
 <section class="fp-section">Services</section>
</div>
```

## app.js

```js
import FullPage from "./FullPage.js";

const fp=new FullPage({
 container:"#fp",
 section:".fp-section",
 duration:0.9,
 ease:"power4.inOut",
 onChange:(i)=>console.log(i)
});

fp.init();
```

Public methods:
- next()
- prev()
- goto(index)

Current limitations:
- Horizontal only
- No nested scrolling
- No URL hash/history
- No plugins yet

This is a minimal foundation for the planned framework.
