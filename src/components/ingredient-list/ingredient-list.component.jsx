import "./ingredient-list.styles.scss";

const IngredientList = ({ items, className }) => (
	<ul className="ingredients-container">
		{items.map((item) => (
			<li key={item.name || item} className={className} data-quantity={item.quantity}>
				<span className="chip">{item.name || item}</span>
			</li>
		))}
	</ul>
);

export default IngredientList;
