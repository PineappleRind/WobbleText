function WobbleText(...args) {
    let tick = 0;
    initialize(...args);

    function initialize(element, options) {
        // Save what we need to wobble
        let content = element.textContent;
        if (!content) throw new Error('no text content on selected element');

        // Set default values if not set by user
        options ??= {},
            options.resolution ??= 20,
            options.speed ??= 30,
            options.intensity ??= 10,
            options.wobbliness ??= 1,
            options.direction ??= 'x',
            options.overlapProtection ??= 0;

        if (options.direction.toUpperCase() !== 'X' && options.direction.toUpperCase() !== 'Y') throw new Error('invalid direction');

        // Divide overlap protection by 10 and invert it
        options.overlapProtection = (1 - options.overlapProtection) / 10;

        // Create a container so we can have 3 text elements
        // in the same container
        let container = document.createElement(element.tagName);
        container.style.position = "relative";

        // Make the container's height the same as what 
        // the element is currently
        container.style.height = element.getBoundingClientRect().height + 'px';
        container.style.width = element.getBoundingClientRect().width + 'px';

        // replace
        element.replaceWith(container);

        append(content, options, container);
    }

    function append(content, options, cont) {
        // For each skew element
        for (let i = 1; i <= options.resolution; i++) {
            let el = document.createElement("span");
            el.style.position = "absolute";
            //  el.style.bottom = '-100%';
            el.style.width = "100%";
            el.style.height = cont.style.height;

            // Helper functions
            const perc = (n) => (n / options.resolution),
                lerp = (a, b, t) => (1 - t) * a + t * b;

            let cp = `inset(${
          /* Top edge */ Math.round(perc(i - 1) * 100)
                }% 0% ${/* Bottom Edge */ Math.round(((0.9 + options.overlapProtection) - perc(i)) * 100)}% 0%)`;

            el.style.clipPath = cp;

            if (options.gradient) {
                let t = perc(i), { from: f, to } = options.gradient;
                el.style.color = `hsl(${lerp(f[0], to[0], t)}, ${lerp(f[1], to[1], t)}%, ${lerp(f[2], to[2], t)}%)`;
            }

            el.innerHTML = content;

            setAnimation(el, i, options);
            cont.append(el);
        }
    }

    function setAnimation(el, i, o) {
        let delay = i * 100;
        tick++;
        el.style.transform =
            `skew${o.direction.toUpperCase()}(` +
            Math.sin((tick + delay * o.wobbliness) / (o.speed * o.resolution)) * o.intensity +
            "deg)";

        window.requestAnimationFrame(
            setAnimation.bind(
                this,
                el,
                i,
                o
            )
        );
    }
}
