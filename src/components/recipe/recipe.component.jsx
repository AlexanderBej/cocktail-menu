import { Fragment, useCallback, useState } from "react";

import RecipeHeader from "../recipe-header/recipe-header.component";
import ExpansionPanel from "../expansion-panel/expansion-panel.component";
import RecipeImage from "../recipe-image/recipe-image.component";
import IngredientList from "../ingredient-list/ingredient-list.component";

import "./recipe.styles.scss";

const Recipe = ({ recipe }) => {
	const [showInstructions, setShowInstructions] = useState(false);
	const [panelState, setPanelState] = useState({
		ingredients: false,
		garnish: false,
		instructions: false,
	});

	const handlePanelExpansion = useCallback((isExpanded, panelType) => {
		setPanelState((prevState) => ({
			...prevState,
			[panelType]: isExpanded,
		}));
	}, []);

	const arePanelsExpanded = Object.values(panelState).some(Boolean);

	const panelClass = arePanelsExpanded ? "panel-expanded" : "panel-collapsed";

	const onDoubleClickAction = () => {
		setShowInstructions((prev) => !prev);
	};

	// Memoize the panel handlers
	const handleIngredientsExpansion = useCallback(
		(isExpanded) => {
			handlePanelExpansion(isExpanded, "ingredients");
		},
		[handlePanelExpansion]
	);

	const handleGarnishExpansion = useCallback(
		(isExpanded) => {
			handlePanelExpansion(isExpanded, "garnish");
		},
		[handlePanelExpansion]
	);

	const handleInstructionsExpansion = useCallback(
		(isExpanded) => {
			handlePanelExpansion(isExpanded, "instructions");
		},
		[handlePanelExpansion]
	);

	return (
		<div className={showInstructions ? "recipe-container p0" : "recipe-container"}>
			<RecipeHeader recipeTitle={recipe.title} color={recipe.background} showInstructions={showInstructions} />

			<RecipeImage
				imageUrl={require(`../../assets/images/${recipe.title.toLowerCase()}.png`)}
				altText={recipe.title}
				showInstructions={showInstructions}
				onImageAction={onDoubleClickAction}
			/>

			{!showInstructions && (
				<div className="ingredient-list">
					{recipe.ingredients.map((ingredient, index) => (
						<span key={index}>
							{ingredient.name}
							{index < recipe.ingredients.length - 1 && ", "}
						</span>
					))}
				</div>
			)}

			{showInstructions && (
				<Fragment>
					<h2
						className="bottom-header"
						style={{ background: recipe.background, backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
						{recipe.title}
					</h2>

					{/* Rendered Panels */}
					<ExpansionPanel className={panelClass} title="Ingredients" isThisPanelExpanded={handleIngredientsExpansion}>
						<IngredientList items={recipe.ingredients} className="ingredient-line" />
					</ExpansionPanel>

					<ExpansionPanel className={panelClass} title="Garnish" isThisPanelExpanded={handleGarnishExpansion}>
						<IngredientList items={recipe.garnish} className="garnish-line" />
					</ExpansionPanel>

					<ExpansionPanel className={panelClass} title="Instructions" isThisPanelExpanded={handleInstructionsExpansion}>
						<div className="instructions-container">
							<p>{recipe.instructions}</p>
						</div>
					</ExpansionPanel>
				</Fragment>
			)}
		</div>
	);
};

export default Recipe;
