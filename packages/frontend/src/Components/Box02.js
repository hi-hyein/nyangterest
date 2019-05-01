import React from "react";
import PropTypes from "prop-types";

const Box02 = ({ kindCd, popfile, happenDt }) => {
	return (
		<div className="Box02">
			<div>
				<h1>{kindCd}</h1>
				<p>{happenDt}</p>
				<CatImage popfile={popfile} alt={kindCd} />
			</div>
		</div>
	);
};

const CatImage = ({ popfile, alt }) => {
	return <img src={popfile} alt={alt} className="CatImage" />;
};

Box02.propTypes = {
	kindCd: PropTypes.string,
	popfifle: PropTypes.string,
	happenDt: PropTypes.string
};

CatImage.propTypes = {
	popfifle: PropTypes.string,
	alt: PropTypes.string
};

export default Box02;
