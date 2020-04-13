/* CustomResumeAdvancedSettings.js */
import React from "react";
import TextField from "styledComponents/TextField";
import SwitchBase from "styledComponents/SwitchBase";

const numWidthStyle = {
	maxWidth: "240px",
	minWidth: "240px",
	marginRight: "100px",
};

const CustomResumeAdvancedSettings = ({
	handleInputChanges,
	resumeSettings,
}) => {
	const {
		maxEntries,
		includeOnlySkills,
		includeObjective,
		includeProfSummary,
	} = resumeSettings;

	return (
		<React.Fragment>
			<div className="tsd-form-row">
				<SwitchBase
					id="includeObjective"
					name="includeObjective"
					checked={includeObjective}
					label="Include Objective"
					onChange={(obj) => handleInputChanges("includeObjective", obj)}
				/>
				<SwitchBase
					id="includeProfSummary"
					name="includeProfSummary"
					checked={includeProfSummary}
					label="Include Professional Summary"
					onChange={(summ) => handleInputChanges("includeProfSummary", summ)}
				/>
			</div>
			<div className="vdiv"></div>
			<div className="tsd-form-row">
				<TextField
					id="maxHighlights"
					type="number"
					style={{ ...numWidthStyle }}
					name="maxHighlights"
					label="Max # of Highlights"
					value={maxEntries.highlights}
					onChange={(highlights) => {
						const newMaxEntries = {
							...maxEntries,
							highlights,
						};
						return handleInputChanges("maxEntries", newMaxEntries);
					}}
				/>
				<SwitchBase
					id="includeOnlySkillsHighlights"
					name="includeOnlySkillsHighlights"
					checked={includeOnlySkills.highlights}
					label="Only Highlights with Listed Skills"
					onChange={(highlights) => {
						const newIncludeOnlySkills = {
							...includeOnlySkills,
							highlights,
						};
						console.log("newInclude highlights: ", newIncludeOnlySkills);
						return handleInputChanges(
							"includeOnlySkills",
							newIncludeOnlySkills
						);
					}}
				/>
			</div>
			<div className="tsd-form-row">
				<TextField
					id="maxJobs"
					type="number"
					style={{ ...numWidthStyle }}
					name="maxJobs"
					label="Max # of Jobs"
					value={maxEntries.jobs}
					onChange={(jobs) => {
						const newMaxEntries = {
							...maxEntries,
							jobs,
						};
						return handleInputChanges("maxEntries", newMaxEntries);
					}}
				/>
				<SwitchBase
					id="includeOnlySkillsJobs"
					name="includeOnlySkillsJobs"
					checked={includeOnlySkills.jobs}
					label="Only Jobs with Listed Skills"
					onChange={(jobs) => {
						const newIncludeOnlySkills = {
							...includeOnlySkills,
							jobs,
						};
						return handleInputChanges(
							"includeOnlySkills",
							newIncludeOnlySkills
						);
					}}
				/>
			</div>
			<div className="tsd-form-row">
				<TextField
					id="maxJobHi"
					type="number"
					style={{ ...numWidthStyle }}
					name="maxJobHi"
					label="Max # of Job Highlights"
					value={maxEntries.jobHighlights}
					onChange={(jobHighlights) => {
						const newMaxEntries = {
							...maxEntries,
							jobHighlights,
						};
						return handleInputChanges("maxEntries", newMaxEntries);
					}}
				/>
				<SwitchBase
					id="includeOnlySkillsJobHighlights"
					name="includeOnlySkillsJobHighlights"
					checked={includeOnlySkills.jobHighlights}
					label="Only Job Highlights with Listed Skills"
					onChange={(jobHighlights) => {
						const newIncludeOnlySkills = {
							...includeOnlySkills,
							jobHighlights,
						};
						return handleInputChanges(
							"includeOnlySkills",
							newIncludeOnlySkills
						);
					}}
				/>
			</div>
			<div className="tsd-form-row">
				<TextField
					id="maxEds"
					type="number"
					style={{ ...numWidthStyle }}
					name="maxEds"
					label="Max # of Education Items"
					value={maxEntries.education}
					onChange={(education) => {
						const newMaxEntries = {
							...maxEntries,
							education,
						};
						return handleInputChanges("maxEntries", newMaxEntries);
					}}
				/>
				<SwitchBase
					id="includeOnlySkillsEds"
					name="includeOnlySkillsEds"
					checked={includeOnlySkills.education}
					label="Only Education with Listed Skills"
					onChange={(education) => {
						const newIncludeOnlySkills = {
							...includeOnlySkills,
							education,
						};
						return handleInputChanges(
							"includeOnlySkills",
							newIncludeOnlySkills
						);
					}}
				/>
			</div>
			<div className="tsd-form-row">
				<TextField
					id="maxCerts"
					type="number"
					style={{ ...numWidthStyle }}
					name="maxCerts"
					label="Max # of Certifications"
					value={maxEntries.certifications}
					onChange={(certifications) => {
						const newMaxEntries = {
							...maxEntries,
							certifications,
						};
						return handleInputChanges("maxEntries", newMaxEntries);
					}}
				/>
				<SwitchBase
					id="includeOnlySkillsCerts"
					name="includeOnlySkillsCerts"
					checked={includeOnlySkills.certifications}
					label="Only Certifications with Listed Skills"
					onChange={(certifications) => {
						const newIncludeOnlySkills = {
							...includeOnlySkills,
							certifications,
						};
						return handleInputChanges(
							"includeOnlySkills",
							newIncludeOnlySkills
						);
					}}
				/>
			</div>
			<div className="tsd-form-row">
				<SwitchBase
					id="includeListedSkills"
					name="includeOnlySkills"
					checked={includeOnlySkills.techtags}
					label="Only Technical Skills (techtags) with Listed Skills"
					onChange={(techtags) => {
						const newIncludeOnlySkills = {
							...includeOnlySkills,
							techtags,
						};
						return handleInputChanges(
							"includeOnlySkills",
							newIncludeOnlySkills
						);
					}}
				/>
			</div>
		</React.Fragment>
	);
};

export default CustomResumeAdvancedSettings;
