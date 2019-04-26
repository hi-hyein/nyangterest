import React from "react";
import PropTypes from "prop-types";

const Box02 = ({ kindCd, popfile }) => {
	return (
		<div className="Box02">
			<div>
				<h1>{kindCd}</h1>
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
	popfifle: PropTypes.string
};

CatImage.propTypes = {
	popfifle: PropTypes.string,
	alt: PropTypes.string
};

export default Box02;
