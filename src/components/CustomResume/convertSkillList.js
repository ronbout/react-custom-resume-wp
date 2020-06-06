/* convertSkillList.js */
import dataFetch from "assets/js/dataFetch";
import getSkillNamesFromTree from "./getSkillNamesFromTree";

const API_RELATED_SKILLS = "skill/relatedtree";

export const convertSkillList = async (skillList) => {
	// need to convert id's in comma list and send to
	// skill tree api so that all child skills are included
	if (!skillList.length) return "";
	const getRelatedSkills = async (idList) => {
		const endpoint = `${API_RELATED_SKILLS}/${idList}`;
		const queryStr = "&ttype=child";
		const childSkillList = await dataFetch(endpoint, queryStr);
		if (childSkillList.error) {
			console.log("Error retrieving child skills: ", childSkillList);
			return false;
		} else {
			return childSkillList;
		}
	};

	const idList = skillList.map((s) => s.id).join();
	const childSkillList = await getRelatedSkills(idList);
	if (childSkillList) {
		// child list can be multiple levels and have repeats
		// so need to flatten and get only unique skills
		let newSkillList = childSkillList.reduce((sArray, s, ndx) => {
			sArray.push(skillList[ndx].name);
			if (s.childTree.length) {
				const tmpList = getSkillNamesFromTree(s.childTree, "children");
				sArray = sArray.concat(tmpList);
			}
			return sArray;
		}, []);
		newSkillList = [...new Set(newSkillList)];
		return newSkillList.join();
	} else {
		// error retrieving child skills so just return original
		return skillList.map((s) => s.name).join();
	}
};
