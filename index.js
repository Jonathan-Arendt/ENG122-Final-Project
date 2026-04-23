document.addEventListener("DOMContentLoaded", () => {
    const citationLinks = document.querySelectorAll(".citation");
    const backLinks = document.querySelectorAll(".ref-backlink");

    citationLinks.forEach((link) => {
        link.addEventListener("click", () => {
            const citeId = link.dataset.citeId;
            const refId = link.dataset.refId;

            if (citeId && refId) {
                sessionStorage.setItem(`lastCitationFor_${refId}`, citeId);
            }
        });
    });

    backLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const refId = link.dataset.refId;

            if (!refId) {
                return;
            }

            const citeId = sessionStorage.getItem(`lastCitationFor_${refId}`);

            if (!citeId) {
                return;
            }

            const target = document.getElementById(citeId);

            if (!target) {
                return;
            }

            event.preventDefault();
            target.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
            history.replaceState(null, "", `#${citeId}`);
        });
    });
});