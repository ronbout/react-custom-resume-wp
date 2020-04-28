/* CustomResumeSkills.js */
import React from "react";
import SkillList from "components/SkillSetup/SkillList";
// import SwitchBase from "styledComponents/SwitchBase";
import Button from "styledComponents/Button";

const CustomResumeSkills = ({ skills, skillList, handleInputChanges }) => {
	const handleOnSkillsChange = (s) => {
		handleInputChanges("skillList", s);
	};

	return (
		<React.Fragment>
			<SkillList
				skills={skillList}
				editFlag={true}
				handleSkillsChange={handleOnSkillsChange}
			/>
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
