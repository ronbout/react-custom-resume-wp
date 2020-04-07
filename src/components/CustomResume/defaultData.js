// default data
export const candidateInfo = {
	id: "",
	person: {
		id: "",
		formattedName: "",
		givenName: "",
		middleName: "",
		familyName: "",
		affix: "",
		email1: "",
		email2: "",
		mobilePhone: "",
		workPhone: "",
		addressLine1: "",
		addressLine2: "",
		municipality: "",
		region: "",
		postalCode: "",
		countryCode: "",
		website: "",
	},
	objective: "",
	executiveSummary: "",
	candidateHighlights: [],
	experience: "",
	education: "",
	certifications: "",
	socialMedia: [
		{
			socialType: "LinkedIn",
			socialLink: "",
		},
		{
			socialType: "Github",
			socialLink: "",
		},
	],
};

export const defaultLayout = {
	sections: [
		{ name: "hd" }, // header info
		{ name: "ob" }, // Objective,
		{ name: "ps" }, // Professional Summary
		{ name: "ts" }, // Tech skills
		{ name: "hi" }, // Highlights
		{ name: "ex" }, // Experience
		{ name: "ed" }, // Education
		{ name: "ct" }, // Certifications
		{ name: "dl" }, // Resumes to download to wp site
	],
};

export const defaultMaxEntries = {
	highlights: 99,
	jobs: 99,
	jobHighlights: 99,
	education: 99,
	certifications: 99,
};

export const includeOnlySkillsOff = {
	highlights: false,
	jobs: false,
	jobHighlights: false,
	education: false,
	certifications: false,
	techtags: false,
};

export const includeOnlySkillsOn = {
	highlights: true,
	jobs: true,
	jobHighlights: true,
	education: true,
	certifications: true,
	techtags: true,
};
