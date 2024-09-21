import { useState, useEffect, useRef } from "react";

import "./nav-dots.styles.scss";

const NavDots = ({ sectionsRef, mainRef }) => {
	const [scrollDirection, setScrollDirection] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(0);

	const observer = useRef(null); // Ref to store the observer

	const scrollToSection = (index) => {
		const mainElement = mainRef.current;
		const targetSection = sectionsRef.current[index];

		if (targetSection) {
			mainElement.scrollTo({
				top: targetSection.offsetTop,
				behavior: "smooth",
			});
			setCurrentIndex(index);
		}
	};

	useEffect(() => {
		// Create the IntersectionObserver to watch section visibility
		observer.current = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const currentSectionIndex = sectionsRef.current.indexOf(entry.target);
						const previousSectionIndex = sectionsRef.current.findIndex((section) => section.classList.contains("current-section"));

						// Determine scroll direction
						if (currentSectionIndex > previousSectionIndex) {
							setScrollDirection("down");
						} else if (currentSectionIndex < previousSectionIndex) {
							setScrollDirection("up");
						}

						setCurrentIndex(currentSectionIndex);

						// Update the class for the current section
						sectionsRef.current.forEach((section) => section.classList.remove("current-section"));
						entry.target.classList.add("current-section");
						setTimeout(() => {
							setScrollDirection(null); // Remove the class to reset the animation
						}, 600); // Animation duration (500ms + buffer)
					}
				});
			},
			{ threshold: 0.7 } // Trigger when 70% of the section is visible
		);
		// Observe all sections
		sectionsRef.current.forEach((section) => observer.current.observe(section));

		// Cleanup observer on component unmount
		return () => {
			if (observer.current) {
				observer.current.disconnect();
			}
		};
	}, [sectionsRef, currentIndex]);

	return (
		<div className={`dots-container ${scrollDirection}`}>
			<div className={`dot hidden ${currentIndex === 0 ? "" : "dot--zer"}`}></div>
			<div className={`dot dot--top ${currentIndex === 0 ? "hidden" : ""}`} onClick={() => scrollToSection(currentIndex - 1)}></div>
			<div className="dot dot--mid"></div>
			<div
				className={`dot dot--bot ${currentIndex === sectionsRef.current.length - 1 ? "hidden" : ""}`}
				onClick={() => scrollToSection(currentIndex + 1)}></div>
			<div className={`dot hidden ${currentIndex === sectionsRef.current.length - 1 ? "" : "dot--for"}`}></div>
		</div>
	);
};

export default NavDots;
