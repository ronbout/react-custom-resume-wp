import React, { useState } from "react";
import Checkbox from "styledComponents/Checkbox";

const WpResumes = ({ resumes, handleInputChanges }) => {
	const [checkList, setCheckList] = useState(
		resumes && resumes.length ? resumes.map(() => false) : []
	);

	const handleCheckbox = (checked, ndx) => {
		let tmpList = [...checkList];
		tmpList[ndx] = checked;
		setCheckList(tmpList);
		handleInputChanges("resList", tmpList);
	};
	return (
		<div className="wp-resume-list">
			{resumes && resumes.length ? (
				<React.Fragment>
					<h2>Job App Resumes</h2>
					<div className="wp-resume-header md-grid">
						<div className="md-cell--2"> </div>
						<div className="md-cell--5">Title</div>
						<div className="md-cell--5">FileName</div>
					</div>
					{resumes.map((resume, ndx) => {
						const {
							id: resId,
							_resume_file: resFileUrl,
							_candidate_title: resTitle,
						} = resume;
						let resFile = resFileUrl.substring(resFileUrl.lastIndexOf("/") + 1);
						return (
							<div className="md-grid" key={resId}>
								<div className="md-cell--2">
									<Checkbox
										id={`res-check-${resId}`}
										name="res-select"
										checked={checkList[ndx]}
										onChange={(checked) => handleCheckbox(checked, ndx)}
										label=""
									/>
								</div>
								<div className="md-cell--5">{resTitle}</div>
								<div className="md-cell--5">
									{resFile ? resFile : "no uploaded file"}
								</div>
							</div>
						);
					})}
					<div style={{ paddingLeft: 10 }}>
						<p>Check Job App Resumes to update with Custom Resume</p>
					</div>
				</React.Fragment>
			) : (
				<React.Fragment>
					{resumes ? (
						<h2>No Job Resumes Found</h2>
					) : (
						<h2>...Loading Resumes</h2>
					)}
				</React.Fragment>
			)}
		</div>
	);
};

export default WpResumes;
