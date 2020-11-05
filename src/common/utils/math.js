const lerp = (start, end, weight=0.1) => {
    return (1 - weight)*start + weight*end;
}

export {
    lerp,
};
