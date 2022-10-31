const Wobbler = {
    wobble(...args) {
        initialize(...args);

        function initialize(element, options) {
            // Save what we need to wobble
            let content = element.textContent;
            if (!content) throw new Error('no text content on selected element');

            // Set default values if not set by user
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
            let cont = document.createElement(element.tagName);
            cont.style.position = "relative";
            element.replaceWith(cont);

            // For each skew element
            for (let i = 1; i <= options.resolution; i++) {
                let el = document.createElement("p");
                el.style.position = "absolute";
                el.style.width = "100%";



                let cp = `inset(${
          /* Top edge */ Math.round(((i - 1) / options.resolution) * 100)
                    }% 0% ${/* Bottom Edge */ Math.round(((0.9 + options.overlapProtection) - i / options.resolution) * 100)}% 0%)`;

                el.style.clipPath = cp;
                el.innerHTML = content;

                setAnimation(el, i, options);
                cont.append(el);
            }
        }

        Wobbler.tick = 0;
        function setAnimation(el, i, o) {
            let delay = i * 100;
            Wobbler.tick++;
            el.style.transform =
                `skew${o.direction.toUpperCase()}(` +
                Math.sin((Wobbler.tick + delay * o.wobbliness) / (o.speed * o.resolution)) * o.intensity +
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
    },
    tick: 0,
};
