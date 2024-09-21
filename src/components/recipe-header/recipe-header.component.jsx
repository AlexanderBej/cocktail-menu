import { useState, useEffect } from "react";

import "./recipe-header.styles.scss";

const RecipeHeader = ({ showInstructions, color, recipeTitle }) => {
	const [shouldRenderHeader, setShouldRenderHeader] = useState(!showInstructions);

	useEffect(() => {
		if (!showInstructions) {
			setShouldRenderHeader(true); // Show the header if showInstructions is false
		}
	}, [showInstructions]);

	const onAnimationEnd = () => {
		if (showInstructions) {
			setShouldRenderHeader(false); // Remove the header once fade-out completes
		}
	};

	return (
		<div>
			{shouldRenderHeader && (
				<h2
					className={showInstructions ? "top-header fade-header-out" : "top-header fade-header-in"}
					onAnimationEnd={onAnimationEnd}
					style={{ backgroundColor: color }}>
					{recipeTitle}
				</h2>
			)}
		</div>
	);
};

export default RecipeHeader;
