import { useEffect, useRef } from "react";
import AOS from "aos";

import recipes from "../../assets/recipes.json";

import Recipe from "../recipe/recipe.component";
import NavDots from "../nav-dots/nav-dots.component";

import { ReactComponent as Logo } from "../../assets/svg/logo_b&w.svg";
import { ReactComponent as LetterA } from "../../assets/svg/a.svg";
import { ReactComponent as LetterB } from "../../assets/svg/b.svg";
import { ReactComponent as LetterE } from "../../assets/svg/e.svg";
import { ReactComponent as LetterI } from "../../assets/svg/i.svg";
import { ReactComponent as LetterJ } from "../../assets/svg/j.svg";
import { ReactComponent as LetterL } from "../../assets/svg/l.svg";
import { ReactComponent as LetterR } from "../../assets/svg/r.svg";
import { ReactComponent as LetterS } from "../../assets/svg/s.svg";

import "aos/dist/aos.css";
import "./home.styles.scss";

const Home = () => {
	const mainRef = useRef(null);
	const sectionsRef = useRef([]);

	useEffect(() => {
		AOS.init();
	});

	return (
		<main ref={mainRef} style={{ overflowY: "scroll", height: "100dvh" }}>
			<NavDots sectionsRef={sectionsRef} mainRef={mainRef} />
			<section ref={(el) => (sectionsRef.current[0] = el)} className="intro">
				<Logo className="logo" />
				<div className="site-title">
					<div className="inline">
						<LetterB className="b-letter" data-aos="fade-right" data-aos-delay="1000" />
						<LetterE className="small-letter ml7" data-aos="fade-right" data-aos-delay="1800" />
						<LetterJ className="big-letter ml4 mb-14" data-aos="fade-right" data-aos-delay="2000" />
					</div>
					<div className="inline">
						<LetterB className="b-letter" data-aos="fade-right" data-aos-delay="1100" />
						<LetterA className="small-letter ml7 mb-14" data-aos="fade-right" data-aos-delay="2200" />
						<LetterR className="small-letter ml4" data-aos="fade-right" data-aos-delay="2400" />
					</div>
					<div className="inline">
						<LetterB className="b-letter" data-aos="fade-right" data-aos-delay="1200" />
						<LetterL className="big-letter ml4" data-aos="fade-right" data-aos-delay="2600" />
						<LetterI className="small-letter ml7" data-aos="fade-right" data-aos-delay="2800" />
						<LetterS className="small-letter ml7" data-aos="fade-right" data-aos-delay="2900" />
						<LetterS className="small-letter ml7" data-aos="fade-right" data-aos-delay="3000" />
					</div>
				</div>
			</section>

			{recipes.map((recipe, index) => (
				<section
					key={recipe.id}
					ref={(el) => (sectionsRef.current[index + 1] = el)}
					style={{
						backgroundImage: recipe.background,
					}}>
					<Recipe recipe={recipe} />
				</section>
			))}
		</main>
	);
};

export default Home;
