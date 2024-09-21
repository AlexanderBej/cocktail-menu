import "./recipe-image.styles.scss";

const RecipeImage = ({ imageUrl, altText, showInstructions, onImageAction }) => {
	// Double-click handler for desktop
	const handleDoubleClick = () => {
		onImageAction();
	};

	// Long-tap handler for mobile
	const handleTouchStart = () => {
		const longTapThreshold = 1000; // threshold for a long tap

		const startTime = new Date().getTime();

		const longTapTimeout = setTimeout(() => {
			onImageAction();
		}, longTapThreshold);

		const handleTouchEnd = () => {
			const touchEndTime = new Date().getTime();
			const tapDuration = touchEndTime - startTime;

			if (tapDuration < longTapThreshold) {
				clearTimeout(longTapTimeout); // Cancel the long tap action if the tap was too short
			}

			// Clean up event listener after touch ends
			document.removeEventListener("touchend", handleTouchEnd);
		};

		document.addEventListener("touchend", handleTouchEnd);
	};

	return (
		<div
			className={showInstructions ? "image-container image-container--small" : "image-container image-container--big"}
			onDoubleClick={handleDoubleClick}
			onTouchStart={handleTouchStart}>
			<img src={imageUrl} className="recipe-img" alt={altText} />
		</div>
	);
};

export default RecipeImage;
