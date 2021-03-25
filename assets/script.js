console.log('welcome');

function wiggle() {
    const duration = 3000;
    const delay = 4000;
    document
        .querySelectorAll('.wiggle')
        .forEach((e, i, a) => {
            const nodeDelay = delay + i * (duration / a.length / 4);
            e.style.animationDuration = `${duration}ms`;
            e.style.animationDelay = `${nodeDelay}ms`;
        })
}

wiggle();