/* getSkillNamesFromTree.js */

const getSkillNamesFromTree = (
	skillList,
	relationType = "parents",
	fullList = []
) => {
	let objectName = relationType === "parents" ? "parents" : "children";

	return skillList
		.reduce((sArray, skill) => {
			!fullList.includes(skill.name) &&
				sArray.push(skill.name) &&
				fullList.push(skill.name);
			if (skill[objectName] && skill[objectName].length) {
				sArray.push(
					getSkillNamesFromTree(skill[objectName], relationType, fullList)
				);
			}
			return sArray;
		}, [])
		.flat(Infinity);
};

export default getSkillNamesFromTree;
