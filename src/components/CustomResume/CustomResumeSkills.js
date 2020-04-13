/* CustomResumeSkills.js */
import React from "react";
// import SwitchBase from "styledComponents/SwitchBase";
import Button from "styledComponents/Button";
import TextField from "styledComponents/TextField";

const CustomResumeSkills = ({ skills, handleInputChanges }) => {
	return (
		<React.Fragment>
			<div className="tsd-form-row">
				<TextField
					id="skills"
					name="skills"
					label="Skills (comma-separated list)"
					value={skills}
					onChange={(s) => handleInputChanges("skills", s)}
					autoFocus
				/>
			</div>
			<div
				style={{
					marginTop: "16px",
					display: "flex",
					justifyContent: "space-around",
				}}
			>
				<Button
					type="button"
					variant="flat"
					onClick={() => handleInputChanges("includeOnlySkillsAll", true)}
				>
					Filter All by Skill
				</Button>
				<Button
					type="button"
					variant="flat"
					onClick={() => handleInputChanges("includeOnlySkillsAll", false)}
				>
					Include All (no skill filter)
				</Button>
			</div>
		</React.Fragment>
	);
};

export default CustomResumeSkills;
