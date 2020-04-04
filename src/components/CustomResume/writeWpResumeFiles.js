/* writeWpResumeFiles.js */
import dataFetch from "assets/js/dataFetch";

export const writeWpResumeFiles = async (fname, resumes, resChecked) => {
	const urlBase = window.wpApi.root;
	const body = {
		_resume_file: window.resumeFileDir + fname + ".pdf"
	};

	resChecked.forEach((checked, ndx) => {
		if (checked) {
			const resId = resumes[ndx].id;
			const endpoint = `wp/v2/resumes/${resId}`;
			postWpFile(urlBase, endpoint, body);
		}
	});
};

const postWpFile = async (urlBase, endpoint, body) => {
	const result = await dataFetch(
		endpoint,
		"",
		"POST",
		body,
		false,
		urlBase,
		true,
		window.wpApi.nonce
	);
	if (result.code) {
		/**
		 *  TODO:  create error to user with toast!
		 */
		console.log(
			"Error updating wp resume file  endpoint / result: ",
			" / ",
			result
		);
	} else {
		console.log("Success updating wp resume file endpoint");
	}
	return result;
};
