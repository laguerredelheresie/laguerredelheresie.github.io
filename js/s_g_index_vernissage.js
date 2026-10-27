/* Animation d'entree du Vernissage au defilement. */
document.addEventListener("DOMContentLoaded", function ()
{
    const vernissage = document.getElementById("vernissage");
    if (!vernissage || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(function (entries)
    {
        entries.forEach(function (entry)
        {
            if (entry.isIntersecting)
            {
                requestAnimationFrame(function ()
                {
                    vernissage.classList.add("vernissage-is-visible");
                });
                observer.unobserve(vernissage);
            }
        });
    }, { threshold: 0.12 });

    // Ne pas masquer le panneau si l'utilisateur arrive directement dessus.
    const bounds = vernissage.getBoundingClientRect();
    if (bounds.top < window.innerHeight && bounds.bottom > 0) return;

    vernissage.classList.add("vernissage-reveal-ready");
    observer.observe(vernissage);
});

/* Animation du premier chapitre, independante de celle du Vernissage. */
document.addEventListener("DOMContentLoaded", function ()
{
    const chapter = document.querySelector("body.grimoire-index > article > .core:first-of-type > .cor_tab_right");
    if (!chapter || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const bounds = chapter.getBoundingClientRect();
    if (bounds.top < window.innerHeight && bounds.bottom > 0) return;

    chapter.classList.add("chapter-one-reveal-ready");
    const observer = new IntersectionObserver(function (entries)
    {
        entries.forEach(function (entry)
        {
            if (entry.isIntersecting)
            {
                requestAnimationFrame(function ()
                {
                    chapter.classList.add("chapter-one-is-visible");
                });
                observer.unobserve(chapter);
            }
        });
    }, { threshold: 0.12 });
    observer.observe(chapter);
});
