// Small devices (landscape phones, 576px and up)
// @media (min-width: 576px) { ... }

// Medium devices (tablets, 768px and up)
// @media (min-width: 768px) { ... }

// Large devices (desktops, 992px and up)
// @media (min-width: 992px) { ... }

// Extra large devices (large desktops, 1200px and up)
// @media (min-width: 1200px) { ... }

const sizes = {
    up() { },
    down(size) {
        const breakpoints = {
            xs: "576px",
            sm: "768px",
            md: "992px",
            lg: "1200px"
        }
        return `@media (max-width: ${breakpoints[size]})`;
    }
};

export default sizes;