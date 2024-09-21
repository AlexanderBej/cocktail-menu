import { useState, useEffect } from "react";

import "./expansion-panel.styles.scss";

const ExpansionPanel = ({ className, title, children, isThisPanelExpanded }) => {
	const [isPanelExpanded, setIsPanelExpanded] = useState(false);

	useEffect(() => {
		isThisPanelExpanded(isPanelExpanded);
	}, [isPanelExpanded, isThisPanelExpanded]);

	const handlePanelExpansion = () => {
		setIsPanelExpanded((prev) => !prev);
	};

	return (
		<div className={`${className} expansion-panel`}>
			<div
				className={isPanelExpanded ? "panel-header panel-header--expanded" : "panel-header"}
				onClick={handlePanelExpansion}
				role="button"
				aria-expanded={isPanelExpanded}
				tabIndex={0}
				onKeyPress={(e) => {
					if (e.key === "Enter") {
						handlePanelExpansion();
					}
				}}
				style={{
					transitionDelay: isPanelExpanded ? "0s" : "0.5s",
				}}>
				<h3>{title}</h3>
			</div>

			<div
				className="panel-body-wrapper"
				style={{
					maxHeight: isPanelExpanded ? "400px" : "0px",
					transition: isPanelExpanded
						? "max-height 0.5s ease 0.3s" // Delayed expansion
						: "max-height 0.5s ease 0s", // Immediate collapse
				}}>
				<div className="panel-body">{children}</div>
			</div>
		</div>
	);
};

export default ExpansionPanel;
