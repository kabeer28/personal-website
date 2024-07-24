document.addEventListener('DOMContentLoaded', () => {
    // Carousel dragging setup
    Draggable.create("#wrapperBoxes", {
        type: "x",
        bounds: "#dragSpace",
        edgeResistance: 0.9,
        throwProps: true,
        onDrag: function() {
            // Sync the scroll position with the draggable position
            const pixels = this.x * -1; // Convert draggable x position to scroll position
            document.documentElement.scrollLeft = pixels * 0.5; // Adjust scroll speed
        }
    });

    // Setup the scroll effect
    const scrollHeight = 10000; // Define the total scroll height
    TweenMax.set("body", { height: scrollHeight, overflowY: 'scroll' });

    // Sync the carousel with the page scroll
    $(document).on("scroll", function () {
        const pixels = $(document).scrollLeft();
        TweenMax.to('#wrapperBoxes', 1, { x: -0.5 * pixels }); // Adjust the speed
        console.log(pixels);
    });
});
