'use strict';

module.exports = function (Topics) {
	Topics.searchByKeyword = async function (query) {
		const keyword = query.keyword || '';
		const initTopics = query.initTopics || null;

<<<<<<< HEAD
        if (initTopics) {
            const topicsByKeyword = initTopics.filter((topic) => {
                const title = topic.title.toLowerCase();
                return title.includes(keyword);
            });
=======
		if (initTopics) {
			const topicsByKeyword = initTopics.filter((topic) => {
				const title = topic.title.toLowerCase();
				return title.includes(keyword);
			});
>>>>>>> 81b4196 (fix: resolved all test issues)

			const searchResult = { topics: topicsByKeyword };
			return searchResult;
		}

<<<<<<< HEAD
        return { topics: initTopics };
=======
		return { topics: initTopics };
>>>>>>> 81b4196 (fix: resolved all test issues)
	};
};
