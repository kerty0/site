let prefetchedUrls = new Set([window.location.href]);

document.querySelectorAll('a').forEach((link) => {
    link.addEventListener('mouseover', () => {
        if (!prefetchedUrls.has(link.href)) {
            let prefetchLink = document.createElement('link');
            prefetchLink.href = link.href;
            prefetchLink.rel = 'prefetch';
            document.head.append(prefetchLink);
            prefetchedUrls.add(link.href);
        }
    }, {once: true});
});