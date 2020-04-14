/* CustomResumeContainer.js */
import React, { Component } from "react";
import CustomResume from "./CustomResume";
import { buildCustomResumeJson } from "./buildCustomResumeJson";
import { writeWpResumeFiles } from "./writeWpResumeFiles";
import {
	candidateInfo,
	defaultLayout,
	defaultMaxEntries,
	includeOnlySkillsOn,
	includeOnlySkillsOff,
} from "./defaultData";
import dataFetch from "assets/js/dataFetch";
import { objCopy } from "assets/js/library";

const API_CANDIDATES = "candidates";
const API_CANDIDATE_SKILLS = "candidate_skills/candidate_id";

class CustomResumeContainer extends Component {
	constructor(props) {
		super(props);

		// check for candidate id being passed in as url parm
		// if no such parm, then must be add mode
		const candId =
			window.tsdData && window.tsdData.candId ? window.tsdData.candId : 7;

		this.wpUserId =
			window.tsdData && window.tsdData.userId ? window.tsdData.userId : 22;

		this.state = {
			candidate: candidateInfo,
			techtagSkills: [],
			wpResumes: false,
			candId,
			wpFileName: "",
			skills: "",
			skillList: [],
			maxEntries: defaultMaxEntries,
			includeOnlySkills: includeOnlySkillsOff,
			includeObjective: true,
			includeProfSummary: true,
			resList: [],
		};
	}

	componentDidMount() {
		// if candId exists, then pull from the api
		this.state.candId !== "undefined" &&
			this.loadCandidateInfo(this.state.candId) &&
			this.loadCandidateSkills(this.state.candId);
	}

	loadCandidateInfo = async (candId) => {
		const endpoint = `${API_CANDIDATES}/${candId}`;
		const candidateApiInfo = await dataFetch(endpoint);
		if (candidateApiInfo.error) {
			console.log(candidateApiInfo);
			/**
			 *
			 *  TODO: add error message
			 *
			 */

			return false;
		} else {
			const candidate = candidateApiInfo ? candidateApiInfo : candidateInfo;
			candidate.userId && this.loadWpResumes(candidate.userId);
			// if userId exists, then pull from wp api
			this.setState({
				candidate,
			});
		}
		return true;
	};

	buildTechSkils = (candidateSkillInfo) => {
		const techSkills = candidateSkillInfo.reduce((techArray, skill) => {
			if (!skill.resumeTechtagId) return techArray;
			const tagId = skill.resumeTechtagId;
			if (!techArray[tagId])
				techArray[tagId] = { name: skill.resumeTechtagName, skills: [] };
			techArray[tagId].skills.push(skill.skillName);
			return techArray;
		}, {});
		return techSkills;
	};

	loadCandidateSkills = async (candId) => {
		const endpoint = `${API_CANDIDATE_SKILLS}/${candId}`;
		const candidateSkillInfo = await dataFetch(endpoint);
		if (candidateSkillInfo.error) {
			console.log(candidateSkillInfo);
			/**
			 *
			 *  TODO: add error message
			 *
			 */
		} else {
			const techtagSkills = this.buildTechSkils(candidateSkillInfo.skills);
			this.setState({
				techtagSkills,
			});
		}
	};

	loadWpResumes = async (userId) => {
		const urlBase = window.wpApi.root;
		const endpoint = "wp/v2/resumes";
		const queryStr = "author=" + userId;
		const wpResumes = await dataFetch(
			endpoint,
			queryStr,
			"GET",
			null,
			false,
			urlBase,
			true
		);
		if (wpResumes.code) {
			console.log("Error accessing Wordpress ATS resumes: ", wpResumes);
		} else {
			console.log("Wordpress ATS resumes: ", wpResumes);
			const resList = Array(wpResumes.length).fill(false);
			this.setState({
				wpResumes,
				resList,
			});
		}
	};

	buildResumeSettings = () => {
		const {
			skills,
			skillList,
			maxEntries,
			includeOnlySkills,
			includeObjective,
			includeProfSummary,
		} = this.state;

		return {
			skills,
			skillList,
			maxEntries,
			includeOnlySkills,
			includeObjective,
			includeProfSummary,
		};
	};

	setAllSkillSwitches = (onOff) => {
		onOff
			? this.setState({ includeOnlySkills: includeOnlySkillsOn })
			: this.setState({ includeOnlySkills: includeOnlySkillsOff });
	};

	handleInputChanges = (field, value) => {
		if (field === "includeOnlySkillsAll") {
			this.setAllSkillSwitches(value);
			return;
		}
		this.setState({
			[field]: value,
		});
	};

	handleCustomize = () => {
		let resumeSettings = this.buildResumeSettings();

		// convert skillList into comma-delimited string, like original code
		// easier, although not as efficient as rewriting a the code to
		// compare id's instead of strings

		const skills = this.convertSkillList(resumeSettings.skillList);
		console.log("skills converted: ", skills);

		resumeSettings = { ...resumeSettings, skills };

		let wpFileName = `${this.wpUserId}-${Date.now()}`;
		const resumeJson = buildCustomResumeJson(
			defaultLayout,
			this.state.candidate,
			this.state.techtagSkills,
			resumeSettings,
			this.state.resList,
			wpFileName
		);
		console.log("resumeJson: ", resumeJson);
		const layoutUri = encodeURIComponent(JSON.stringify(resumeJson));
		window.open(
			`${window.resumeUrl}?id=${this.state.candidate.id}&layout=${layoutUri}`,
			"_blank"
		);
		// if resList contains true write to wp api to update _resume_file
		if (this.state.resList.includes(true)) {
			const wpUpdateResult = writeWpResumeFiles(
				wpFileName,
				this.state.wpResumes,
				this.state.resList
			);
			if (!wpUpdateResult.code) {
				// code property is how wp sends error info
				// so this must be success
				this.updateWpResumes(wpFileName);
			}
		}
	};

	convertSkillList = (skillList) => {
		return skillList.map((s) => s.name).join();
	};

	updateWpResumes = (wpFileName) => {
		const wpResumes = objCopy(this.state.wpResumes);
		const { resList } = this.state;
		resList.forEach((checked, ndx) => {
			if (checked) {
				wpResumes[ndx]._resume_file = wpFileName + ".pdf";
			}
		});
		this.setState({ wpResumes });
	};

	render() {
		return (
			<CustomResume
				candidate={this.state.candidate}
				techtagSkills={this.state.techtagSkills}
				wpResumes={this.state.wpResumes}
				handleCustomize={this.handleCustomize}
				resumeSettings={this.buildResumeSettings()}
				handleInputChanges={this.handleInputChanges}
				resList={this.state.resList}
			/>
		);
	}
}

export default CustomResumeContainer;
