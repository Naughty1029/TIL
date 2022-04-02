Scrollmagicの公式サイト<br>
https://scrollmagic.io/

jQueryで実装する時の基本的なテンプレート

```javascript
var controller = new ScrollMagic.Controller();
var $targets = $('.scrollmagic');
$targets.each(function() {
    var $target = $(this);
    var scene = new ScrollMagic.Scene({
        triggerElement : $target.get(0),
        triggerHook : 'onEnter',
        offset : 200
    });
    scene.on('enter', function() {
        $target.addClass('magic')
    });
    scene.addTo(controller);
});
```
