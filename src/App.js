import React, { Component } from "react";

import "./css/styles.css";
import "./css/app.css";

import CustomResumeContainer from "components/CustomResume/";

// setup global api url
// will be coming from wp react page
// through window.apiLoc

// window.apiLoc = "local";
const API_HOST = window.apiLoc === "local" ? "localhost" : "13.90.143.153";
const WP_HOST = window.wpHost ? window.wpHost : "http://jimbo.local";

window.imgLoc = `http://${API_HOST}/3sixd/imgs/`;
window.apiUrl = `http://${API_HOST}/3sixd/api/`;
window.resumeUrl = `${WP_HOST}/3sixd/resume-build/resume-pdf.php`;
window.resumeFileDir = `${WP_HOST}/wp-content/uploads/resumes/resume_files/3sixd/`;
window.wpApi = {};
window.wpApi.root = `${WP_HOST}/wp-json/`;
window.wpApi.nonce = window.apiNonce;

class App extends Component {
	render() {
		return <CustomResumeContainer />;
	}
}

export default App;
