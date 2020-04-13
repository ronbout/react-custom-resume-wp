/* CustomResume.js */
import React from "react";
import WpResumes from "./WpResumes";
import CustomResumeSkills from "./CustomResumeSkills";
import CustomResumeAdvancedSettings from "./CustomResumeAdvancedSettings";
import Button from "styledComponents/Button";
import { isEmptyObject } from "assets/js/library";

import "./css/customResume.css";

const CustomResume = ({
	candidate,
	techtagSkills,
	wpResumes,
	handleCustomize,
	resumeSettings,
	handleInputChanges,
	resList,
}) => {
	return (
		<div className="cust-res-container">
			{isEmptyObject(techtagSkills) && !candidate.id ? (
				<p className="center">...loading Candidate Info</p>
			) : (
				<React.Fragment>
					<div className="center">
						<h1>{candidate.person.formattedName} Resume Creation</h1>
					</div>
					<div>
						<WpResumes
							resumes={wpResumes}
							handleInputChanges={handleInputChanges}
							resList={resList}
						/>
						<div className="parameters">
							<CustomResumeSkills
								skills={resumeSettings.skills}
								handleInputChanges={handleInputChanges}
							/>
							<div className="vdiv"></div>
							<CustomResumeAdvancedSettings
								handleInputChanges={handleInputChanges}
								resumeSettings={resumeSettings}
							/>
							<div className="vdiv"></div>
							<div style={{ textAlign: "center" }}>
								<Button
									type="button"
									variant="raised"
									className="btn btn-info"
									onClick={handleCustomize}
								>
									Create Resume
								</Button>
							</div>
						</div>
					</div>
				</React.Fragment>
			)}
		</div>
	);
};

export default CustomResume;
